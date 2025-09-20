import { NextRequest, NextResponse } from 'next/server'
import { supabase, RSVP_TABLE, RSVPResponse } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, nickname, phoneNumber, isWhatsApp, email, invitationCode, attending, buyingAsoEbi, deliveryRequested, deliveryAddress } = body

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
    // Count attending responses; fallback to counting all if attending column not present yet
    let attendingResponses = 0
    const { count: attendingCount, error: countError } = await supabase
      .from('rsvp_responses')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_code', invitationCode.toUpperCase())
      .eq('attending', true)

    if (countError) {
      console.error('Error counting RSVPs:', countError)
      const { count: allCount, error: fallbackError } = await supabase
        .from('rsvp_responses')
        .select('*', { count: 'exact', head: true })
        .eq('invitation_code', invitationCode.toUpperCase())

      if (fallbackError) {
        console.error('Fallback RSVP count error:', fallbackError)
        return NextResponse.json(
          { error: 'Failed to validate invitation capacity' },
          { status: 500 }
        )
      }
      attendingResponses = allCount || 0
    } else {
      attendingResponses = attendingCount || 0
    }

    if (attendingResponses >= invitation.max_guests) {
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
      attending: Boolean(attending),
      buying_aso_ebi: Boolean(buyingAsoEbi),
      delivery_requested: Boolean(deliveryRequested),
      delivery_address: deliveryRequested && deliveryAddress ? String(deliveryAddress).trim() : null
    }

    // Insert into Supabase
    let insertError = null
    let insertData = null
    const { data, error } = await supabase
      .from(RSVP_TABLE)
      .insert([rsvpData])
      .select()
      .single()

    insertError = error
    insertData = data

    // Fallback: if insert fails due to missing new columns, retry with minimal fields
    if (insertError) {
      console.warn('Insert with extended fields failed, retrying with minimal fields')
      const minimalData = {
        invitation_id: invitation.id,
        invitation_code: invitationCode.toUpperCase(),
        full_name: fullName.trim(),
        nickname: nickname?.trim() || null,
        phone_number: phoneNumber?.trim() || null,
        email: email?.trim() || null,
        attending: Boolean(attending)
      }
      const fallback = await supabase
        .from(RSVP_TABLE)
        .insert([minimalData])
        .select()
        .single()
      insertError = fallback.error
      insertData = fallback.data
    }

    if (insertError) {
      console.error('Supabase error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save response' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Response submitted successfully',
        data: insertData 
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