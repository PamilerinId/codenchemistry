'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BackgroundMedia from '@/components/background-media'

export default function RSVPPage() {
  const [invitationCode, setInvitationCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!invitationCode.trim()) {
      alert('Please enter your invitation code')
      return
    }

    setIsValidating(true)

    try {
      // Validate the invitation code
      const response = await fetch(`/api/invitations/${invitationCode.toUpperCase()}`)
      
      if (response.ok) {
        // Redirect to the protected RSVP page
        router.push(`/rsvp/${invitationCode.toUpperCase()}`)
      } else {
        const result = await response.json()
        alert(result.error || 'Invalid invitation code')
      }
    } catch (error) {
      console.error('Error validating invitation:', error)
      alert('Failed to validate invitation code. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Media */}
      <BackgroundMedia type="image" src="/trad1.jpeg" />
      
      {/* Main Content */}
      <div className="max-w-md w-full relative z-20">
        {/* Wedding Header */}
        <div className="text-center mb-6">
          <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase mb-2">
            Wedding of
          </h1>
          <div className="space-y-1 mb-2">
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
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-cursive text-gray-800 mb-2">Join Our Celebration</h1>
            <p className="text-sm text-gray-600 mb-4">
              Please enter your invitation code to register your interest
            </p>
          </div>

          {/* Invitation Code Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Code
              </label>
              <input
                type="text"
                id="invitationCode"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors font-mono text-center text-lg tracking-wider"
                placeholder="Enter your code"
                maxLength={15}
                required
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Check your invitation for the unique code
              </p>
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full bg-champagne-500 text-white py-3 px-6 rounded-md hover:bg-champagne-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isValidating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Validating...</span>
                </div>
              ) : (
                'RSVP'
              )}
            </button>
          </form>

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