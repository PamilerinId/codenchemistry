'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RSVPForm from '@/components/rsvp-form'
import BackgroundMedia from '@/components/background-media'
import { Invitation } from '@/lib/supabase'

interface InvitationData {
  invitation: Invitation
  existingRSVPs: number
  remainingSlots: number
  canRSVP: boolean
}

export default function ProtectedRSVPPage() {
  const params = useParams()
  const router = useRouter()
  const invitationCode = params.code as string

  const [invitationData, setInvitationData] = useState<InvitationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const validateInvitation = useCallback(async () => {
    try {
      const response = await fetch(`/api/invitations/${invitationCode}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Invalid invitation code')
      }

      setInvitationData(result)
    } catch (error) {
      console.error('Error validating invitation:', error)
      setError(error instanceof Error ? error.message : 'Failed to validate invitation')
    } finally {
      setLoading(false)
    }
  }, [invitationCode])

  useEffect(() => {
    if (invitationCode) {
      validateInvitation()
    }
  }, [invitationCode, validateInvitation])

  const handleRSVPSubmit = (data: any) => {
    // Store the data for redirection
    const guestName = encodeURIComponent(data.fullName)
    router.push(`/thank-you?name=${guestName}`)
  }

  const handleSuccess = () => {
    // This will be called after successful submission
    // The actual redirection happens in handleRSVPSubmit
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        <BackgroundMedia type="image" src="/trad1.jpeg" />
        <div className="relative z-20 py-8 px-8 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full text-center">
          {/* Wedding Header */}
          <div className="text-center mb-6">
            <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase mb-2">
              Wedding of
            </h1>
            <div className="space-y-1 mb-4">
              <h2 className="text-3xl md:text-4xl font-cursive font-normal tracking-wide text-black">
                Fatima Oyawoye
              </h2>
              <div className="text-xs tracking-[0.3em] font-medium text-gray-700 uppercase">
                #CodeAndChemistry
              </div>
              <h3 className="text-2xl md:text-3xl font-mono font-light tracking-wider text-black uppercase">
                Pamilerin Idowu
              </h3>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-champagne-200">
            <div className="w-8 h-8 border-4 border-champagne-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Validating invitation...</p>
          </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        <BackgroundMedia type="image" src="/trad1.jpeg" />
        <div className="relative z-20 py-8 px-8 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full text-center">
          {/* Wedding Header */}
          <div className="text-center mb-6">
            <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase mb-2">
              Wedding of
            </h1>
            <div className="space-y-1 mb-4">
              <h2 className="text-3xl md:text-4xl font-cursive font-normal tracking-wide text-black">
                Fatima Oyawoye
              </h2>
              <div className="text-xs tracking-[0.3em] font-medium text-gray-700 uppercase">
                #CodeAndChemistry
              </div>
              <h3 className="text-2xl md:text-3xl font-mono font-light tracking-wider text-black uppercase">
                Pamilerin Idowu
              </h3>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-red-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-cursive text-gray-800 mb-2">Invalid Invitation</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-gray-600">
              Please check your invitation code and try again, or contact the couple for assistance.
            </p>
          </div>
          </div>
        </div>
      </div>
    )
  }

  if (invitationData && !invitationData.canRSVP) {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        <BackgroundMedia type="image" src="/trad1.jpeg" />
        <div className="relative z-20 py-8 px-8 min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full text-center">
          {/* Wedding Header */}
          <div className="text-center mb-6">
            <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase mb-2">
              Wedding of
            </h1>
            <div className="space-y-1 mb-4">
              <h2 className="text-3xl md:text-4xl font-cursive font-normal tracking-wide text-black">
                Fatima Oyawoye
              </h2>
              <div className="text-xs tracking-[0.3em] font-medium text-gray-700 uppercase">
                #CodeAndChemistry
              </div>
              <h3 className="text-2xl md:text-3xl font-mono font-light tracking-wider text-black uppercase">
                Pamilerin Idowu
              </h3>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-yellow-200">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-cursive text-gray-800 mb-2">Invitation Full</h2>
            <p className="text-yellow-600 mb-4">
              This invitation has reached its maximum capacity of {invitationData.invitation.max_guests} guest(s).
            </p>
            <p className="text-sm text-gray-600">
              {invitationData.existingRSVPs} guest(s) have already RSVP&apos;d using this invitation.
            </p>
          </div>
          </div>
        </div>
      </div>
    )
  }

  if (!invitationData) {
    return null // This shouldn't happen, but TypeScript needs this check
  }

  return (
    <div className="bg-gray-100 relative overflow-auto">
      <div className="fixed inset-0">
        <BackgroundMedia type="image" src="/trad1.jpeg" />
      </div>
      
      <div className="relative z-20 min-h-screen py-8 px-8">
        <div className="max-w-md w-full mx-auto">
        {/* Wedding Header */}
        <div className="text-center mb-6">
          <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase mb-2">
            Wedding of
          </h1>
          <div className="space-y-1 mb-4">
            <h2 className="text-3xl md:text-4xl font-cursive font-normal tracking-wide text-black">
              Fatima Oyawoye
            </h2>
            <div className="text-xs tracking-[0.3em] font-medium text-gray-700 uppercase">
              #CodeAndChemistry
            </div>
            <h3 className="text-2xl md:text-3xl font-mono font-light tracking-wider text-black uppercase">
              Pamilerin Idowu
            </h3>
          </div>
        </div>

        {/* Registration Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cursive text-gray-800 mb-2">Join Our Celebration</h1>
          <p className="text-sm text-gray-600 mb-2">
            You&apos;re invited by: <span className="font-medium">{invitationData.invitation.inviter_name}</span>
          </p>
          {invitationData.invitation.notes && (
            <p className="text-xs text-gray-500 italic">
              {invitationData.invitation.notes}
            </p>
          )}
          {/* <div className="mt-2 text-xs text-gray-500">
            Invitation Code: <span className="font-mono font-medium">{invitationCode}</span>
          </div> */}
          {invitationData.remainingSlots > 0 && (
            <div className="text-xs text-green-600 mt-1">
              {invitationData.remainingSlots} of {invitationData.invitation.max_guests} slot(s) remaining
            </div>
          )}
        </div>

        {/* RSVP Form */}
        <RSVPForm onSubmit={handleRSVPSubmit} invitationCode={invitationCode} onSuccess={handleSuccess} />

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-champagne-600 hover:text-champagne-700 transition-colors"
          >
            ← Back to Save the Date
          </a>
        </div>
        </div>
      </div>
    </div>
  )
} 