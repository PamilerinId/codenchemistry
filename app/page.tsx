import Countdown from '@/components/countdown'
import BackgroundDoodles from '@/components/background-doodles'
import BackgroundMedia from '@/components/background-media'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Media - Now showing your wedding image */}
      <BackgroundMedia type="image" src="/trad1.jpeg" />
      {/* For video: <BackgroundMedia type="video" src="/wedding-bg.mp4" poster="/trad1.jpeg" /> */}
      {/* For gradient: <BackgroundMedia type="gradient" /> */}
      
      {/* Background Doodles (positioned above the overlay) */}
      {/* <div className="absolute inset-0 z-10">
        <BackgroundDoodles />
      </div> */}
      
      {/* Main Content */}
      <div className="max-w-md w-full text-center space-y-8 relative z-20">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-sm tracking-[0.3em] font-light text-gray-800 uppercase">
            Save the Date
          </h1>
          <p className="text-xs tracking-[0.2em] font-light text-gray-600 uppercase">
            For the Wedding of
          </p>
        </div>

        {/* Bride's Name - Elegant Cursive */}
        <div className="space-y-1">
          <h2 className="text-5xl md:text-6xl font-cursive font-normal tracking-wide text-black">
            Fatima
          </h2>
          <h2 className="text-5xl md:text-6xl font-cursive font-normal tracking-wide text-black">
            Oyawoye
          </h2>
        </div>

        {/* Theme */}
        <div className="py-4">
          <p className="text-xs tracking-[0.3em] font-medium text-gray-700 uppercase">
            #CodeAndChemistry
          </p>
        </div>

        {/* Groom's Name - Code Font */}
        <div className="space-y-1">
          <h3 className="text-4xl md:text-5xl font-mono font-light tracking-wider text-black uppercase">
            Pamilerin
          </h3>
          <h3 className="text-4xl md:text-5xl font-mono font-light tracking-wider text-black uppercase">
            Idowu
          </h3>
        </div>

        {/* Date */}
        <div className="space-y-2 pt-8">
          <p className="text-lg tracking-[0.2em] font-light text-black uppercase">
            6 December
          </p>
        </div>

        {/* Countdown */}
        <div className="pt-4">
          <Countdown />
        </div>

        {/* RSVP Info */}
        <div className="pt-6">
          <p className="text-sm text-gray-600 text-center">
            RSVP with your personal invitation code
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4">
          <p className="text-xs tracking-[0.2em] font-light text-gray-600 uppercase">
            Formal Invitation to Follow
          </p>
        </div>

      </div>
    </div>
  )
} 