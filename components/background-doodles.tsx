interface DoodleProps {
  className?: string
  size?: number
}

// Coding Doodles
export function CodeBrackets({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M16 18L22 12L16 6" />
      <path d="M8 6L2 12L8 18" />
    </svg>
  )
}

export function CodeFunction({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M8 2V8L4 12L8 16V22" />
      <path d="M16 2V8L20 12L16 16V22" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function Terminal({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8L10 12L6 16" />
      <path d="M14 16H18" />
    </svg>
  )
}

// Chemistry Doodles
export function Molecule({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M9 6L15 6" />
      <path d="M9 9L15 15" />
      <path d="M15 9L9 15" />
    </svg>
  )
}

export function Beaker({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M9 2V8L5 14.5C4.5 15.5 5.2 16.8 6.3 16.8H17.7C18.8 16.8 19.5 15.5 19 14.5L15 8V2" />
      <path d="M9 2H15" />
      <path d="M7 14H17" />
    </svg>
  )
}

export function DNAHelix({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M4 4C6 2 10 6 12 8C14 10 18 6 20 8" />
      <path d="M4 12C6 10 10 14 12 16C14 18 18 14 20 16" />
      <path d="M4 20C6 18 10 22 12 24C14 26 18 22 20 24" />
      <path d="M6 6L18 18" />
      <path d="M6 18L18 6" />
    </svg>
  )
}

// Sickle Cell Doodles
export function SickleCell({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 12C4 8 8 4 12 4C14 4 16 5 17 7C18 9 17 11 15 12C17 13 18 15 17 17C16 19 14 20 12 20C8 20 4 16 4 12Z" />
    </svg>
  )
}

export function NormalCell({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  )
}

export function BloodDrop({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C12 2 20 10 20 16C20 20 16.4 22 12 22C7.6 22 4 20 4 16C4 10 12 2 12 2Z" />
    </svg>
  )
}

// Background Component
export default function BackgroundDoodles() {
  const doodles = [
    // Coding elements
    { Component: CodeBrackets, x: '10%', y: '15%', size: 16, rotation: 15 },
    { Component: Terminal, x: '85%', y: '20%', size: 18, rotation: -10 },
    { Component: CodeFunction, x: '15%', y: '70%', size: 14, rotation: 25 },
    { Component: CodeBrackets, x: '80%', y: '75%', size: 12, rotation: -20 },
    { Component: Terminal, x: '20%', y: '40%', size: 15, rotation: 45 },
    
    // Chemistry elements
    { Component: Molecule, x: '75%', y: '35%', size: 16, rotation: -15 },
    { Component: Beaker, x: '90%', y: '60%', size: 18, rotation: 10 },
    { Component: DNAHelix, x: '5%', y: '55%', size: 20, rotation: -30 },
    { Component: Molecule, x: '25%', y: '85%', size: 14, rotation: 35 },
    { Component: Beaker, x: '70%', y: '10%', size: 16, rotation: -25 },
    
    // Blood cells
    { Component: SickleCell, x: '30%', y: '25%', size: 12, rotation: 20 },
    { Component: NormalCell, x: '65%', y: '50%', size: 10, rotation: 0 },
    { Component: SickleCell, x: '85%', y: '40%', size: 14, rotation: -40 },
    { Component: BloodDrop, x: '40%', y: '80%', size: 16, rotation: 15 },
    { Component: NormalCell, x: '15%', y: '30%', size: 8, rotation: 0 },
    { Component: SickleCell, x: '50%', y: '90%', size: 12, rotation: -15 },
    { Component: BloodDrop, x: '90%', y: '85%', size: 14, rotation: 30 },
    { Component: NormalCell, x: '60%', y: '25%', size: 9, rotation: 0 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {doodles.map((doodle, index) => {
        const { Component, x, y, size, rotation } = doodle
        return (
          <div
            key={index}
            className="absolute opacity-5 text-gray-400"
            style={{
              left: x,
              top: y,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Component size={size} />
          </div>
        )
      })}
    </div>
  )
} 