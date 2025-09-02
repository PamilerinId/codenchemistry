import Countdown from '@/components/countdown'
import BackgroundDoodles from '@/components/background-doodles'
import BackgroundMedia from '@/components/background-media'

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Media - Now showing your wedding image */}
      <BackgroundMedia type="image" src="/trad1.jpeg" />
      {/* For video: <BackgroundMedia type="video" src="/wedding-bg.mp4" poster="/trad1.jpeg" /> */}
      {/* For gradient: <BackgroundMedia type="gradient" /> */}
      
      {/* Background Doodles (positioned above the overlay) */}
      {/* <div className="absolute inset-0 z-10">
        <BackgroundDoodles />
      </div> */}
      
      {/* Main Content */}
      <div className="max-w-lg w-full text-center space-y-6 relative z-20">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-base tracking-[0.3em] font-light text-gray-800 uppercase">
            Save the Date
          </h1>
          <p className="text-sm tracking-[0.2em] font-light text-gray-600 uppercase">
            For the Wedding of
          </p>
        </div>

        {/* Bride's Name - Elegant Cursive */}
        <div className="space-y-1">
          <h2 className="text-5xl md:text-6xl font-cursive font-normal tracking-wide text-black leading-tight">
            Fatima
          </h2>
          <h2 className="text-5xl md:text-6xl font-cursive font-normal tracking-wide text-black leading-tight">
            Oyawoye
          </h2>
        </div>

        {/* Theme */}
        <div className="py-2">
          <p className="text-sm tracking-[0.3em] font-medium text-gray-700 uppercase">
            #CodeAndChemistry
          </p>
        </div>

        {/* Groom's Name - Code Font */}
        <div className="space-y-1">
          <h3 className="text-4xl md:text-5xl font-mono font-light tracking-wider text-black uppercase leading-tight">
            Pamilerin
          </h3>
          <h3 className="text-4xl md:text-5xl font-mono font-light tracking-wider text-black uppercase leading-tight">
            Idowu
          </h3>
        </div>

        {/* Date */}
        <div className="space-y-2 pt-4">
          <p className="text-xl tracking-[0.2em] font-light text-black uppercase">
            6 December, 2025
          </p>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <p className="text-base tracking-[0.1em] font-light text-gray-700 uppercase">
            Kwara State
          </p>
          <p className="text-sm tracking-[0.1em] font-light text-gray-600 italic">
            Exact location to be sent to confirmed guests
          </p>
        </div>

        {/* Dress Code */}
        <div className="pt-4">
          <div className="flex items-center justify-center space-x-4">
            <p className="text-sm tracking-[0.3em] font-light text-gray-600 uppercase">
              Dress Color
            </p>
            
            {/* Actual magenta fabric swatch */}
            <div className="relative">
              <div className="w-10 h-10 rounded-lg shadow-lg border border-white/50 relative overflow-hidden">
                <img 
                  src="/WhatsApp Image 2025-09-02 at 9.22.29 PM.jpeg"
                  alt="Magenta fabric swatch"
                  className="w-full h-full object-cover"
                />
                {/* Subtle overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5"></div>
              </div>
              {/* Soft fabric shadow */}
              <div 
                className="absolute inset-0 w-10 h-10 rounded-lg blur-sm opacity-20 -z-10"
                style={{backgroundColor: '#CC00CC'}}
              ></div>
            </div>
            
            <p className="text-lg tracking-[0.2em] font-light text-gray-800 uppercase" style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              background: 'linear-gradient(135deg, #FF00FF, #CC00CC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Magenta
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="pt-6">
          <Countdown />
        </div>

        {/* Footer */}
        <div className="pt-6">
          <p className="text-sm tracking-[0.2em] font-light text-gray-600 uppercase">
            Formal Invitation to Follow
          </p>
        </div>

      </div>
    </div>
  )
} 