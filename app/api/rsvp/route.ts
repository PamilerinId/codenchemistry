import { NextRequest, NextResponse } from 'next/server'
import { supabase, RSVP_TABLE, RSVPResponse } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, nickname, phoneNumber, isWhatsApp, email, invitationCode } = body

    // Validate required fields
    if (!fullName?.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    if (!invitationCode?.trim()) {
      return NextResponse.json(
        { error: 'Invitation code is required' },
        { status: 400 }
      )
    }

    if (!phoneNumber?.trim() && !email?.trim()) {
      return NextResponse.json(
        { error: 'At least one contact method (phone or email) is required' },
        { status: 400 }
      )
    }

    // Validate invitation code and get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('invitations')
      .select('*')
      .eq('invitation_code', invitationCode.toUpperCase())
      .eq('is_active', true)
      .single()

    if (invitationError || !invitation) {
      return NextResponse.json(
        { error: 'Invalid or expired invitation code' },
        { status: 400 }
      )
    }

    // Check if invitation has reached max guests
    const { count: existingResponses, error: countError } = await supabase
      .from('rsvp_responses')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_code', invitationCode.toUpperCase())

    if (countError) {
      console.error('Error counting RSVPs:', countError)
      return NextResponse.json(
        { error: 'Failed to validate invitation capacity' },
        { status: 500 }
      )
    }

    if ((existingResponses || 0) >= invitation.max_guests) {
      return NextResponse.json(
        { error: 'This invitation has reached its maximum number of guests' },
        { status: 400 }
      )
    }

    // Prepare data for Supabase
    const rsvpData: Omit<RSVPResponse, 'id' | 'created_at' | 'updated_at'> = {
      invitation_id: invitation.id,
      invitation_code: invitationCode.toUpperCase(),
      full_name: fullName.trim(),
      nickname: nickname?.trim() || null,
      phone_number: phoneNumber?.trim() || null,
      // is_whatsapp: isWhatsApp || false,
      email: email?.trim() || null,
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from(RSVP_TABLE)
      .insert([rsvpData])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save response' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Response submitted successfully',
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get all RSVP responses with invitation details
    const { data, error } = await supabase
      .from(RSVP_TABLE)
      .select(`
        *,
        invitations:invitation_id (
          invitation_code,
          inviter_name,
          inviter_email,
          max_guests,
          notes
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch responses' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 