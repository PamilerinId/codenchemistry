'use client'

import { useSearchParams } from 'next/navigation'
import BackgroundMedia from '@/components/background-media'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('name') || 'Guest'

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