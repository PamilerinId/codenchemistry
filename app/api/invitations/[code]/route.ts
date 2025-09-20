import { NextRequest, NextResponse } from 'next/server'
import { supabase, INVITATIONS_TABLE, Invitation } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code

    if (!code) {
      return NextResponse.json(
        { error: 'Invitation code is required' },
        { status: 400 }
      )
    }

    // Get invitation details
    const { data: invitation, error } = await supabase
      .from(INVITATIONS_TABLE)
      .select('*')
      .eq('invitation_code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !invitation) {
      return NextResponse.json(
        { error: 'Invalid or expired invitation code' },
        { status: 404 }
      )
    }

    // Get count of existing responses for this invitation (attending only), with fallback if column doesn't exist
    let attendingResponses = 0
    const { count: attendingCount, error: countError } = await supabase
      .from('rsvp_responses')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_code', code.toUpperCase())
      .eq('attending', true)

    if (countError) {
      console.error('Error counting RSVPs:', countError)
      // Fallback: count all responses (older schema without attending)
      const { count: allCount, error: fallbackError } = await supabase
        .from('rsvp_responses')
        .select('*', { count: 'exact', head: true })
        .eq('invitation_code', code.toUpperCase())

      if (fallbackError) {
        console.error('Fallback RSVP count error:', fallbackError)
        return NextResponse.json(
          { error: 'Failed to validate invitation' },
          { status: 500 }
        )
      }
      attendingResponses = allCount || 0
    } else {
      attendingResponses = attendingCount || 0
    }

    // Check if invitation has reached max guests
    const remainingSlots = invitation.max_guests - attendingResponses

    return NextResponse.json({
      invitation,
      existingRSVPs: attendingResponses,
      remainingSlots,
      canRSVP: remainingSlots > 0
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 