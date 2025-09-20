'use client'

import { useSearchParams } from 'next/navigation'
import BackgroundMedia from '@/components/background-media'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('name') || 'Guest'
  const showPayment = searchParams.get('buy') === '1'
  const encodedName = typeof window !== 'undefined' ? encodeURIComponent(guestName) : ''

  return (
    <div className="bg-gray-100 relative overflow-auto">
      <div className="fixed inset-0">
        <BackgroundMedia type="image" src="/trad1.jpeg" />
      </div>
      
      <div className="relative z-20 min-h-screen py-8 px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          {/* Wedding Header */}
          <div className="text-center mb-8">
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

          {/* Thank You Message */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-champagne-200">
            <div className="w-16 h-16 bg-champagne-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-champagne-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-cursive text-gray-800 mb-4">Thank You!</h1>
            
            <p className="text-lg text-gray-700 mb-4">
              Hi {guestName}!
            </p>
            
            <p className="text-gray-600 mb-6">
              Your response has been received successfully. We&apos;re so excited to celebrate with you on our special day!
            </p>
            
            <div className="bg-champagne-50 border border-champagne-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-champagne-800">
                <strong>What&apos;s Next?</strong><br />
                Keep an eye out for more details about the wedding as we get closer to the date. We&apos;ll be in touch with additional information and updates.
              </p>
            </div>

            {/* Payment Information */}
            {showPayment && (
            <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Payment Information</h4>
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-800 mb-2">Aso‑ebi Price List</div>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Gele & Ipele – ₦30,000</li>
                  <li>Gele only – ₦15,000</li>
                  <li>Fila – ₦8,000</li>
                </ul>
              </div>
              <p className="text-xs text-gray-600 mb-3">Please make payment before <span className="font-medium">November 1, 2025</span>.</p>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white border rounded-md p-3 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Account Number</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText('0109352153')}
                      className="text-xs text-champagne-600 hover:text-champagne-700"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="font-mono text-gray-900">0109352153</div>
                  <div className="text-gray-600 mt-1">GTBank • Kola‑Seriki Aishat Jolade</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2">Payment Reference: <span className="font-medium">Your Name</span></p>
              <p className="text-xs text-gray-600 mt-3">If you are buying for someone, please write the person&apos;s name on the reference or the receipt.</p>
              <div className="flex items-center justify-between flex-wrap gap-2 mt-3">
                <span className="text-xs text-gray-700">Send receipt to WhatsApp only: <span className="font-medium">09057509095</span></span>
                <a
                  href={`https://wa.me/2349057509095?text=${encodedName ? encodedName + '%20' : ''}Payment%20receipt%20for%20RSVP`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
            )}

            <div className="space-y-4">
              <a
                href="/"
                className="block bg-champagne-500 text-white py-3 px-6 rounded-md hover:bg-champagne-600 transition-colors font-medium"
              >
                Back to Save the Date
              </a>
              
              <p className="text-xs text-gray-500">
                Can&apos;t wait to see you there! 💍✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 