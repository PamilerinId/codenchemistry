'use client'

import { useState } from 'react'

interface RSVPFormData {
  fullName: string
  nickname: string
  phoneNumber: string
  isWhatsApp: boolean
  email: string
  invitationCode?: string
}

interface RSVPFormProps {
  onSubmit?: (data: RSVPFormData) => void
  className?: string
  invitationCode?: string
  onSuccess?: () => void
}

export default function RSVPForm({ onSubmit, className = '', invitationCode, onSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    nickname: '',
    phoneNumber: '',
    isWhatsApp: false,
    email: '',
    invitationCode: invitationCode || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof RSVPFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that at least one contact method is provided
    if (!formData.phoneNumber && !formData.email) {
      alert('Please provide either a phone number or email address')
      return
    }

    // Validate that full name is provided
    if (!formData.fullName.trim()) {
      alert('Please provide your full name')
      return
    }

    setIsSubmitting(true)

    try {
      // Send data to our API
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit RSVP')
      }
      
      if (onSubmit) {
        onSubmit(formData)
      }
      
      // Call success callback for redirection
      if (onSuccess) {
        onSuccess()
      } else {
        // Fallback to showing success message
        setIsSubmitted(true)
        setFormData({
          fullName: '',
          nickname: '',
          phoneNumber: '',
          isWhatsApp: false,
          email: '',
          invitationCode: invitationCode || ''
        })
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert(error instanceof Error ? error.message : 'There was an error submitting your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-champagne-200 ${className}`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-champagne-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-cursive text-gray-800">Thank You!</h3>
          <p className="text-sm text-gray-600">
            Your response has been received. We look forward to celebrating with you!
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2 bg-champagne-500 text-white rounded-md hover:bg-champagne-600 transition-colors text-sm"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    )
  }

  return (
          <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-champagne-200 ${className}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-cursive text-gray-800 mb-2">Join Our Celebration</h3>
          <p className="text-sm text-gray-600">
            Please let us know if you&apos;ll be joining us on our special day
          </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Nickname */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
            Nickname (Optional)
          </label>
          <input
            type="text"
            id="nickname"
            value={formData.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors"
            placeholder="What the couple may know you by"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-gray-500 font-normal">(Optional if email provided)</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors"
            placeholder="Enter your phone number"
          />
          {/* <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="isWhatsApp"
              checked={formData.isWhatsApp}
              onChange={(e) => handleInputChange('isWhatsApp', e.target.checked)}
              className="h-4 w-4 text-champagne-600 focus:ring-champagne-500 border-gray-300 rounded"
            />
            <label htmlFor="isWhatsApp" className="ml-2 text-sm text-gray-600">
              This is my WhatsApp number
            </label>
          </div> */}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-gray-500 font-normal">(Optional if phone provided)</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors"
            placeholder="Enter your email address"
          />
        </div>

        <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-md border">
          <strong>Contact Information:</strong> Please provide at least one contact method. You can supply both phone and email, but at least one is required.
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-champagne-500 text-white py-3 px-6 rounded-md hover:bg-champagne-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Response'
          )}
        </button>
      </form>
    </div>
  )
} 