'use client'

import { useState, useEffect } from 'react'
import { RSVPResponse, Invitation } from '@/lib/supabase'

interface RSVPWithInvitation extends RSVPResponse {
  invitations?: Invitation
}

export default function AdminRSVPPage() {
  const [rsvpResponses, setRsvpResponses] = useState<RSVPWithInvitation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRSVPResponses()
  }, [])

  const fetchRSVPResponses = async () => {
    try {
      const response = await fetch('/api/rsvp')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch RSVP responses')
      }

      setRsvpResponses(result.data || [])
    } catch (error) {
      console.error('Error fetching RSVP responses:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch celebration responses')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-champagne-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading celebration responses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRSVPResponses}
            className="px-4 py-2 bg-champagne-500 text-white rounded-md hover:bg-champagne-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-cursive text-gray-800">Celebration Responses</h1>
            <div className="text-sm text-gray-600">
              Total Responses: {rsvpResponses.length}
            </div>
          </div>

          {rsvpResponses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No celebration responses yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Nickname</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Invited By</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Code</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvpResponses.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{rsvp.full_name}</td>
                      <td className="py-3 px-4 text-gray-600">{rsvp.nickname || '-'}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {rsvp.phone_number && (
                          <div className="flex items-center">
                            <span>{rsvp.phone_number}</span>
                            {/* {rsvp.is_whatsapp && (
                              <span className="ml-2 text-green-600 text-xs font-medium">WhatsApp</span>
                            )} */}
                          </div>
                        )}
                        {rsvp.email && <div>{rsvp.email}</div>}
                        {!rsvp.phone_number && !rsvp.email && '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {rsvp.invitations?.inviter_name || '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                        {rsvp.invitation_code}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {rsvp.created_at ? formatDate(rsvp.created_at) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={fetchRSVPResponses}
              className="px-6 py-2 bg-champagne-500 text-white rounded-md hover:bg-champagne-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 