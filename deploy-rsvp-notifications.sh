#!/bin/bash

# RSVP Notifications Edge Function Deployment Script
# This script helps deploy the Supabase Edge Function for RSVP email notifications

set -e

echo "🚀 Deploying RSVP Notifications Edge Function..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   npm install -g supabase"
    echo "   Or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if user is logged in
if ! supabase status &> /dev/null; then
    echo "⚠️  Please link your Supabase project first:"
    echo "   supabase link --project-ref YOUR_PROJECT_REF"
    exit 1
fi

# Check if environment variables are set
echo "📋 Checking environment variables..."

if [ -z "$POSTMARK_API_KEY" ]; then
    echo "⚠️  POSTMARK_API_KEY not set. You'll need to set it manually:"
    echo "   supabase secrets set POSTMARK_API_KEY=your_api_key"
    echo ""
fi

if [ -z "$NOTIFICATION_EMAILS" ]; then
    echo "⚠️  NOTIFICATION_EMAILS not set. You'll need to set it manually:"
    echo "   supabase secrets set NOTIFICATION_EMAILS=email1@example.com,email2@example.com"
    echo ""
fi

# Deploy the function
echo "🔧 Deploying edge function..."
supabase functions deploy rsvp-notifications

echo ""
echo "✅ Edge function deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Set your environment variables if not already done:"
echo "   supabase secrets set POSTMARK_API_KEY=your_postmark_api_key"
echo "   supabase secrets set NOTIFICATION_EMAILS=your@email.com,another@email.com"
echo ""
echo "2. Set up the database webhook or trigger (see SUPABASE_EDGE_FUNCTION_SETUP.md)"
echo ""
echo "3. Test by submitting an RSVP!"
echo ""
echo "🔍 To view logs:"
echo "   supabase functions logs rsvp-notifications --follow"
echo ""
echo "📚 For detailed setup instructions, see SUPABASE_EDGE_FUNCTION_SETUP.md" 