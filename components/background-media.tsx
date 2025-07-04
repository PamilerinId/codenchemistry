'use client'

interface BackgroundMediaProps {
  type?: 'video' | 'image' | 'gradient'
  src?: string
  poster?: string // For video poster image
}


export default function BackgroundMedia({ 
  type = 'gradient', 
  src = '/wedding-bg.mp4',
  poster = '/trad1.jpeg' 
}: BackgroundMediaProps) {
  
  if (type === 'video') {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => {
            // Fallback to gradient if video fails to load
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
          }}
        >
          <source src={src} type="video/mp4" />
          {/* Fallback to image if video fails */}
          <img 
            src={poster} 
            alt="Wedding background" 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Hide image if it also fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </video>
        
        {/* Lighter white overlay for better image visibility */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-5"></div>
      </div>
    )
  }
  
  if (type === 'image') {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img 
          src={src} 
          alt="Wedding background" 
          className="absolute inset-0 w-full h-full object-cover md:object-contain z-0"
          onError={(e) => {
            // Hide image if it fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        {/* Lighter white overlay for better image visibility */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-5"></div>
      </div>
    )
  }
  
  // Gradient background (fallback)
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-champagne-50 to-gold-50"></div>
      
      {/* Subtle overlay for consistency */}
      <div className="absolute inset-0 bg-white/20"></div>
    </div>
  )
} 