import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const width = parseInt(searchParams.get('width') || '1200')
    const height = parseInt(searchParams.get('height') || '630')

    // Fetch the background image
    const imageUrl = new URL('/trad1.jpeg', request.url).href
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')
    const imageSrc = `data:image/jpeg;base64,${imageBase64}`

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#f3f4f6',
          }}
        >
          {/* Background Image */}
          <img
            src={imageSrc}
            alt="Wedding background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(8px)',
            }}
          />
          
          {/* White Overlay for blur effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10,
              maxWidth: '800px',
              padding: '60px',
            }}
          >
            {/* Save the Date */}
            <div
              style={{
                fontSize: '28px',
                fontWeight: '300',
                color: '#374151',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Save the Date
            </div>
            
            {/* Names */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: '400',
                  color: '#000000',
                  fontFamily: 'serif',
                  marginBottom: '10px',
                }}
              >
                Fatima & Pamilerin
              </div>
            </div>
            
            {/* Theme */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: '500',
                color: '#374151',
                letterSpacing: '0.2em',
                marginBottom: '30px',
              }}
            >
              #CodeAndChemistry
            </div>
            
            {/* Date */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: '300',
                color: '#000000',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              December 6, 2025
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new NextResponse('Failed to generate image', { status: 500 })
  }
} 