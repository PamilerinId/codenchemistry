'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Moment {
    id: string
    image_path: string
    caption: string | null
    guest_name: string | null
    created_at: string
}

export default function WeddingMoments() {
    const [moments, setMoments] = useState<Moment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMoments()

        // Real-time subscription
        const channel = supabase
            .channel('moments-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'moments' },
                (payload) => {
                    const newMoment = payload.new as Moment
                    setMoments((prev) => [newMoment, ...prev])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const fetchMoments = async () => {
        try {
            const { data, error } = await supabase
                .from('moments')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setMoments(data || [])
        } catch (error) {
            console.error('Error fetching moments:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-champagne-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-champagne-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-cursive text-champagne-800">Wedding Moments</h1>
                        <p className="text-xs text-gray-500">Captured by you, cherished by us.</p>
                    </div>
                    <Link
                        href="/moments/upload"
                        className="bg-champagne-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-champagne-700 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Photo
                    </Link>
                </div>
            </header>

            {/* Gallery Grid */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-champagne-600"></div>
                    </div>
                ) : moments.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-champagne-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-champagne-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No moments yet</h3>
                        <p className="text-gray-500 mt-1">Be the first to share a memory!</p>
                        <Link
                            href="/moments/upload"
                            className="mt-4 inline-block text-champagne-600 font-medium hover:underline"
                        >
                            Upload a photo &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {moments.map((moment) => (
                            <div key={moment.id} className="break-inside-avoid bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <img
                                    src={moment.image_path}
                                    alt={moment.caption || 'Wedding moment'}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                                {(moment.caption || moment.guest_name) && (
                                    <div className="p-3">
                                        {moment.caption && (
                                            <p className="text-sm text-gray-800 mb-1">{moment.caption}</p>
                                        )}
                                        {moment.guest_name && (
                                            <p className="text-xs text-gray-500 font-medium">— {moment.guest_name}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
