'use client'

import { useState } from 'react'

interface RSVPFormData {
  fullName: string
  phoneNumber: string
  isWhatsApp: boolean
  email: string
  invitationCode?: string
  buyingAsoEbi?: boolean
  plusOne?: boolean
  deliveryRequested?: boolean
  deliveryAddress?: string
  attending?: boolean
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
    phoneNumber: '',
    isWhatsApp: false,
    email: '',
    invitationCode: invitationCode || '',
    buyingAsoEbi: false,
    plusOne: false,
    deliveryRequested: false,
    deliveryAddress: '',
    attending: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copied, setCopied] = useState<{ account?: boolean; reference?: boolean }>({})

  const handleInputChange = (field: keyof RSVPFormData, value: string | boolean | number) => {
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
          phoneNumber: '',
          isWhatsApp: false,
          email: '',
          invitationCode: invitationCode || '',
          buyingAsoEbi: false,
          plusOne: false
        })
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert(error instanceof Error ? error.message : 'There was an error submitting your RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = async (text: string, key: 'account' | 'reference') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(prev => ({ ...prev, [key]: true }))
      setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 1500)
    } catch (e) {
      console.error('Copy failed', e)
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
        {/* Attending Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Will you be attending?</label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleInputChange('attending', true)}
              className={`px-4 py-2 rounded-md text-sm border ${formData.attending ? 'bg-champagne-500 text-white border-champagne-500' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Yes, I&apos;ll attend
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('attending', false)}
              className={`px-4 py-2 rounded-md text-sm border ${!formData.attending ? 'bg-champagne-500 text-white border-champagne-500' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              No, I can&apos;t attend
            </button>
          </div>
        </div>
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

        {/* Nickname removed */}

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

        {/* Plus One */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Will you bring a plus one? <span className="text-gray-500 font-normal">(Optional)</span></label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleInputChange('plusOne', false)}
              className={`px-4 py-2 rounded-md text-sm border ${formData.plusOne ? 'bg-white text-gray-700 border-gray-300' : 'bg-champagne-500 text-white border-champagne-500'}`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('plusOne', true)}
              className={`px-4 py-2 rounded-md text-sm border ${formData.plusOne ? 'bg-champagne-500 text-white border-champagne-500' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Yes
            </button>
          </div>
        </div>

        {/* Aso-ebi Purchase */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Will you be purchasing Aso‑ebi? <span className="text-gray-500 font-normal">(Optional)</span></label>
          <div className="flex items-center space-x-3 mb-4">
            <button
              type="button"
              onClick={() => handleInputChange('buyingAsoEbi', false)}
              className={`px-4 py-2 rounded-md text-sm border ${formData.buyingAsoEbi ? 'bg-white text-gray-700 border-gray-300' : 'bg-champagne-500 text-white border-champagne-500'}`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('buyingAsoEbi', true)}
              className={`px-4 py-2 rounded-md text-sm border ${formData.buyingAsoEbi ? 'bg-champagne-500 text-white border-champagne-500' : 'bg-white text-gray-700 border-gray-300'}`}
            >
              Yes
            </button>
          </div>

          {/* Delivery preference (only if buying Aso-ebi) */}
          {formData.buyingAsoEbi && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Delivery preference</label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryRequested', false)}
                  className={`px-4 py-2 rounded-md text-sm border ${formData.deliveryRequested ? 'bg-white text-gray-700 border-gray-300' : 'bg-champagne-500 text-white border-champagne-500'}`}
                >
                  Arrange collection
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('deliveryRequested', true)}
                  className={`px-4 py-2 rounded-md text-sm border ${formData.deliveryRequested ? 'bg-champagne-500 text-white border-champagne-500' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  Deliver (extra fee)
                </button>
              </div>

              {formData.deliveryRequested && (
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">Delivery address</label>
                  <textarea
                    id="deliveryAddress"
                    value={formData.deliveryAddress || ''}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent transition-colors"
                    placeholder="Enter the delivery address"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">A delivery fee applies and will be communicated.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Aso-ebi & Payment Information (show only if buying) */}
        {formData.buyingAsoEbi && (
        <div className="bg-gray-50 border rounded-md p-4 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-2">Aso‑ebi Price List</h4>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Gele & Ipele – ₦30,000</li>
              <li>Gele only – ₦15,000</li>
              <li>Fila – ₦8,000</li>
            </ul>
          </div>
          <p className="text-xs text-gray-600">Please make payment before <span className="font-medium">November 1, 2025</span>.</p>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white border rounded-md p-3 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Account Number</span>
                <button type="button" onClick={() => copyToClipboard('0109352153', 'account')} className="text-xs text-champagne-600 hover:text-champagne-700">{copied.account ? 'Copied' : 'Copy'}</button>
              </div>
              <div className="font-mono text-gray-900">0109352153</div>
              <div className="text-gray-600 mt-1">GTBank • Kola‑Seriki Aishat Jolade</div>
            </div>
          </div>
          <p className="text-sm text-gray-700">Payment Reference: <span className="font-medium">Your Name</span></p>
          <p className="text-xs text-gray-600">If you are buying for someone, please write the person&apos;s name on the reference or the receipt.</p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-gray-700">Send receipt to WhatsApp only: <span className="font-medium">09057509095</span></span>
            <a href="https://wa.me/2349057509095" target="_blank" rel="noopener noreferrer" className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700">Message on WhatsApp</a>
          </div>
        </div>
        )}

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