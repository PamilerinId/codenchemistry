'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UploadMoment() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [caption, setCaption] = useState('')
    const [guestName, setGuestName] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('wedding-moments')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('wedding-moments')
                .getPublicUrl(filePath)

            // 3. Save Metadata to Database
            const { error: dbError } = await supabase
                .from('moments')
                .insert({
                    image_path: publicUrl,
                    caption: caption.trim() || null,
                    guest_name: guestName.trim() || null
                })

            if (dbError) throw dbError

            // Success! Redirect to gallery
            router.push('/moments')

        } catch (error) {
            console.error('Error uploading moment:', error)
            alert('Failed to upload photo. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-champagne-50 p-6 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-cursive text-champagne-800">Share a Moment</h1>
                    <p className="text-sm text-gray-600 mt-1">Snap a photo or pick from your gallery!</p>
                </div>

                {/* Image Preview / Selection Area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`
            relative w-full aspect-[4/5] rounded-lg border-2 border-dashed 
            flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors
            ${preview ? 'border-champagne-500 bg-black' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
          `}
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center p-4">
                            <div className="w-12 h-12 bg-champagne-100 text-champagne-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-500 font-medium">Tap to select photo</span>
                            <p className="text-xs text-gray-400 mt-2">Works with Snapchat saves!</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Your Name (Optional)</label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Who took this?"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Caption / Wish (Optional)</label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a sweet note..."
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-champagne-500 focus:border-transparent text-sm resize-none"
                        />
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className={`
            w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all
            ${!file || isUploading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-champagne-600 hover:bg-champagne-700 active:scale-95'}
          `}
                >
                    {isUploading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </span>
                    ) : (
                        'Share Moment'
                    )}
                </button>
            </div>
        </div>
    )
}
