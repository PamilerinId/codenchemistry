import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Invitation {
  id?: string
  invitation_code: string
  inviter_name: string
  inviter_email?: string
  max_guests: number
  notes?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface RSVPResponse {
  id?: string
  invitation_id?: string
  invitation_code: string
  full_name: string
  nickname?: string
  phone_number?: string
  // is_whatsapp?: boolean
  email?: string
  attending?: boolean
  buying_aso_ebi?: boolean
  delivery_requested?: boolean
  delivery_address?: string | null
  plus_one?: boolean
  created_at?: string
  updated_at?: string
}

// Database table names
export const INVITATIONS_TABLE = 'invitations'
export const RSVP_TABLE = 'rsvp_responses' 