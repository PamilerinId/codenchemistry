# Supabase Edge Function Setup for RSVP Notifications

This guide will help you set up a Supabase Edge Function that automatically sends email notifications via Postmark when new RSVPs are submitted.

## Prerequisites

1. **Supabase CLI installed**: [Installation Guide](https://supabase.com/docs/guides/cli)
2. **Postmark Account**: [Sign up at Postmark](https://postmarkapp.com/)
3. **Domain configured in Postmark**: You need to verify `codeandchemistry.com` domain in Postmark
4. **Postmark Server Token**: Create a server and get the API token

## Step 1: Postmark Setup

### 1.1 Create a Postmark Server
1. Log into your Postmark account
2. Create a new Server (or use existing one)
3. Go to the Server settings and copy your **Server API Token**

### 1.2 Verify Your Domain
1. In Postmark, go to "Sender Signatures" or "Domains"
2. Add and verify `codeandchemistry.com`
3. Follow the DNS verification process
4. Ensure `rsvp@codeandchemistry.com` is set up as a verified sender

## Step 2: Deploy the Edge Function

### 2.1 Initialize Supabase (if not already done)
```bash
# In your project root
supabase init
```

### 2.2 Link to your Supabase project
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 2.3 Set Environment Variables
Set these secrets in your Supabase project:

```bash
# Set your Postmark API key
supabase secrets set POSTMARK_API_KEY=your_postmark_server_api_token

# Set notification email addresses (comma-separated)
supabase secrets set NOTIFICATION_EMAILS=email1@example.com,email2@example.com
```

Replace the email addresses with the actual emails where you want to receive RSVP notifications.

### 2.4 Deploy the Edge Function
```bash
# Deploy the function
supabase functions deploy rsvp-notifications
```

## Step 3: Set Up Database Webhook

### 3.1 Create the Database Webhook
Run this SQL in your Supabase SQL Editor:

```sql
-- Create a webhook that triggers the edge function when new RSVPs are inserted
CREATE OR REPLACE FUNCTION notify_new_rsvp()
RETURNS trigger AS $$
BEGIN
  -- Make HTTP request to our edge function
  PERFORM
    net.http_post(
      url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/rsvp-notifications',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'type', 'INSERT',
        'table', 'rsvp_responses',
        'record', to_jsonb(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS rsvp_notification_trigger ON rsvp_responses;
CREATE TRIGGER rsvp_notification_trigger
  AFTER INSERT ON rsvp_responses
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_rsvp();
```

**Important**: Replace `YOUR_PROJECT_REF` with your actual Supabase project reference.

### 3.2 Alternative: Use Supabase Webhooks (Recommended)

Instead of database triggers, you can use Supabase's built-in webhook feature:

1. Go to your Supabase Dashboard
2. Navigate to "Database" → "Webhooks"
3. Click "Create a new hook"
4. Configure:
   - **Name**: `rsvp-notifications`
   - **Table**: `rsvp_responses`
   - **Events**: Check "Insert"
   - **Type**: `HTTP Request`
   - **HTTP URL**: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/rsvp-notifications`
   - **HTTP Method**: `POST`
   - **HTTP Headers**: 
     ```json
     {
       "Content-Type": "application/json",
       "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"
     }
     ```

## Step 4: Test the Setup

### 4.1 Submit a Test RSVP
1. Go to your RSVP form
2. Submit a test RSVP with valid invitation code
3. Check that the RSVP appears in your database

### 4.2 Verify Email Delivery
1. Check your notification email addresses for the RSVP notification
2. Check Postmark dashboard for email delivery status
3. Check Supabase Edge Function logs:
   ```bash
   supabase functions logs rsvp-notifications
   ```

## Step 5: Monitor and Debug

### 5.1 View Edge Function Logs
```bash
# View real-time logs
supabase functions logs rsvp-notifications --follow

# View recent logs
supabase functions logs rsvp-notifications
```

### 5.2 Common Issues and Solutions

**Issue**: Emails not being sent
- Check that `POSTMARK_API_KEY` is set correctly
- Verify domain is authenticated in Postmark
- Check Postmark activity dashboard for bounces/blocks

**Issue**: Function not triggering
- Verify webhook is configured correctly
- Check that trigger exists in database
- Ensure function is deployed successfully

**Issue**: Permission errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check RLS policies on tables

### 5.3 Environment Variables Check
Verify your environment variables are set:
```bash
supabase secrets list
```

## Email Template Customization

The edge function includes both HTML and plain text email templates. To customize the email format, edit the `htmlBody` and `textBody` variables in `supabase/functions/rsvp-notifications/index.ts`.

## Security Considerations

1. **Service Role Key**: The edge function uses the service role key to bypass RLS and read invitation details
2. **Webhook Authentication**: Ensure webhook requests are authenticated
3. **Rate Limiting**: Consider adding rate limiting if needed
4. **Email Validation**: The function validates required environment variables

## Production Deployment

Before going live:
1. Test with real email addresses
2. Verify Postmark sending reputation
3. Set up monitoring/alerting for failed email deliveries
4. Consider adding email templates with your branding
5. Test with high volume if expecting many RSVPs

## File Structure

```
supabase/
├── functions/
│   ├── rsvp-notifications/
│   │   └── index.ts
│   ├── deno.json
│   ├── import_map.json
│   └── environment.example
```

## Support

If you encounter issues:
1. Check the Edge Function logs
2. Verify Postmark configuration
3. Test the webhook manually
4. Review this setup guide for missed steps 