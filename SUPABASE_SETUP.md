# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be set up

## 2. Create the Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the invitations table
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_code TEXT UNIQUE NOT NULL,
  inviter_name TEXT NOT NULL,
  inviter_email TEXT,
  max_guests INTEGER DEFAULT 1,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the RSVP responses table (updated with invitation tracking)
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  invitation_code TEXT NOT NULL,
  full_name TEXT NOT NULL,
  nickname TEXT,
  phone_number TEXT,
  is_whatsapp BOOLEAN DEFAULT false,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for invitations
CREATE POLICY "Allow public read for active invitations" ON invitations
  FOR SELECT USING (is_active = true);

-- Create policies for RSVP responses
CREATE POLICY "Allow public insert with valid invitation" ON rsvp_responses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM invitations 
      WHERE invitations.invitation_code = rsvp_responses.invitation_code 
      AND invitations.is_active = true
    )
  );

CREATE POLICY "Allow public read" ON rsvp_responses
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_invitations_code ON invitations(invitation_code);
CREATE INDEX idx_invitations_active ON invitations(is_active);
CREATE INDEX idx_rsvp_responses_invitation_id ON rsvp_responses(invitation_id);
CREATE INDEX idx_rsvp_responses_invitation_code ON rsvp_responses(invitation_code);
CREATE INDEX idx_rsvp_responses_created_at ON rsvp_responses(created_at DESC);

-- Create a function to generate unique invitation codes
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER := 0;
  code_length INTEGER := 8;
BEGIN
  FOR i IN 1..code_length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  
  -- Check if code already exists, if so, generate a new one
  WHILE EXISTS (SELECT 1 FROM invitations WHERE invitation_code = result) LOOP
    result := '';
    FOR i IN 1..code_length LOOP
      result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
  END LOOP;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample invitation codes for testing
INSERT INTO invitations (invitation_code, inviter_name, inviter_email, max_guests, notes) VALUES
  ('FAMILY01', 'Bride & Groom', 'couple@example.com', 4, 'Family members'),
  ('FRIENDS1', 'Bride & Groom', 'couple@example.com', 2, 'College friends'),
  ('WORK001', 'Bride & Groom', 'couple@example.com', 1, 'Work colleagues');
```

## 3. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key

## 4. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase credentials.

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/rsvp` and submit a test RSVP
3. Check your Supabase dashboard to see the data in the `rsvp_responses` table

## 6. Optional: Set Up Email Notifications

You can set up Supabase Edge Functions to send email notifications when new RSVPs are submitted. This would require additional setup with a service like Resend or SendGrid.

## 7. Security Considerations

- The current setup allows public read access to RSVP responses
- For production, consider adding authentication to the GET endpoint
- You might want to add rate limiting to prevent spam
- Consider adding CAPTCHA for additional spam protection 