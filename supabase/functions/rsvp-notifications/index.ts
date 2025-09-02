import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RSVPWebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record?: {
    id: string
    invitation_id: string
    invitation_code: string
    full_name: string
    nickname?: string
    phone_number?: string
    email?: string
    created_at: string
  }
  old_record?: any
}

interface PostmarkEmailPayload {
  From: string
  To: string
  Subject: string
  HtmlBody: string
  TextBody: string
  MessageStream: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the request is from Supabase webhook
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Parse the webhook payload
    const payload: RSVPWebhookPayload = await req.json()

    // Only process INSERT events
    if (payload.type !== 'INSERT' || payload.table !== 'rsvp_responses' || !payload.record) {
      return new Response('OK', { status: 200, headers: corsHeaders })
    }

    const rsvpData = payload.record

    // Initialize Supabase client to get invitation details
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', rsvpData.invitation_id)
      .single()

    if (invitationError || !invitation) {
      console.error('Failed to fetch invitation:', invitationError)
      return new Response('Failed to fetch invitation', { status: 500, headers: corsHeaders })
    }

    // Get all RSVPs for this invitation to show total count
    const { count: totalRsvps, error: countError } = await supabase
      .from('rsvp_responses')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_code', rsvpData.invitation_code)

    if (countError) {
      console.error('Failed to count RSVPs:', countError)
    }

    // Prepare email content
    const guestContact = rsvpData.email ? `Email: ${rsvpData.email}` : 
                        rsvpData.phone_number ? `Phone: ${rsvpData.phone_number}` : 'No contact provided'
    
    const subject = `New RSVP Received: ${rsvpData.full_name}`
    
    const htmlBody = `
      <h2>New RSVP Submission</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h3>Guest Details</h3>
        <p><strong>Full Name:</strong> ${rsvpData.full_name}</p>
        ${rsvpData.nickname ? `<p><strong>Nickname:</strong> ${rsvpData.nickname}</p>` : ''}
        <p><strong>Contact:</strong> ${guestContact}</p>
        
        <h3>Invitation Details</h3>
        <p><strong>Invitation Code:</strong> ${rsvpData.invitation_code}</p>
        <p><strong>Inviter:</strong> ${invitation.inviter_name}</p>
        ${invitation.inviter_email ? `<p><strong>Inviter Email:</strong> ${invitation.inviter_email}</p>` : ''}
        <p><strong>Max Guests Allowed:</strong> ${invitation.max_guests}</p>
        ${invitation.notes ? `<p><strong>Notes:</strong> ${invitation.notes}</p>` : ''}
        
        <h3>RSVP Summary</h3>
        <p><strong>Total RSVPs for this invitation:</strong> ${totalRsvps || 'Unknown'} / ${invitation.max_guests}</p>
        <p><strong>Submitted at:</strong> ${new Date(rsvpData.created_at).toLocaleString()}</p>
      </div>
    `

    const textBody = `
New RSVP Submission

Guest Details:
- Full Name: ${rsvpData.full_name}
${rsvpData.nickname ? `- Nickname: ${rsvpData.nickname}` : ''}
- Contact: ${guestContact}

Invitation Details:
- Invitation Code: ${rsvpData.invitation_code}
- Inviter: ${invitation.inviter_name}
${invitation.inviter_email ? `- Inviter Email: ${invitation.inviter_email}` : ''}
- Max Guests Allowed: ${invitation.max_guests}
${invitation.notes ? `- Notes: ${invitation.notes}` : ''}

RSVP Summary:
- Total RSVPs for this invitation: ${totalRsvps || 'Unknown'} / ${invitation.max_guests}
- Submitted at: ${new Date(rsvpData.created_at).toLocaleString()}
    `

    // Get notification email addresses from environment
    const notificationEmails = Deno.env.get('NOTIFICATION_EMAILS')?.split(',') || []
    const postmarkApiKey = Deno.env.get('POSTMARK_API_KEY')

    if (!postmarkApiKey) {
      console.error('POSTMARK_API_KEY not configured')
      return new Response('Email service not configured', { status: 500, headers: corsHeaders })
    }

    if (notificationEmails.length === 0) {
      console.error('NOTIFICATION_EMAILS not configured')
      return new Response('Notification emails not configured', { status: 500, headers: corsHeaders })
    }

    // Send emails to all notification addresses
    const emailPromises = notificationEmails.map(async (email) => {
      const emailPayload: PostmarkEmailPayload = {
        From: 'rsvp@codeandchemistry.com',
        To: email.trim(),
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: 'outbound'
      }

      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': postmarkApiKey
        },
        body: JSON.stringify(emailPayload)
      })

      if (!response.ok) {
        const error = await response.text()
        console.error(`Failed to send email to ${email}:`, error)
        throw new Error(`Failed to send email to ${email}: ${response.status}`)
      }

      return await response.json()
    })

    // Wait for all emails to be sent
    await Promise.all(emailPromises)

    console.log(`Successfully sent RSVP notifications for ${rsvpData.full_name} to ${notificationEmails.length} recipients`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notifications sent successfully',
        emailsSent: notificationEmails.length
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing RSVP notification:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
}) 