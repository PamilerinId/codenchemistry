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
export function WaterMolecule({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="8" r="2" fill="currentColor" />
      <circle cx="6" cy="16" r="1.5" fill="currentColor" />
      <circle cx="18" cy="16" r="1.5" fill="currentColor" />
      <path d="M10.5 9.5L7.5 14.5" />
      <path d="M13.5 9.5L16.5 14.5" />
      <text x="12" y="6" textAnchor="middle" fontSize="6" fill="currentColor">O</text>
      <text x="6" y="20" textAnchor="middle" fontSize="4" fill="currentColor">H</text>
      <text x="18" y="20" textAnchor="middle" fontSize="4" fill="currentColor">H</text>
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

export function Atom({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="8" ry="3" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function TestTube({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M8 2L16 10V20C16 21.1 15.1 22 14 22H10C8.9 22 8 21.1 8 20V2Z" />
      <path d="M8 2H16" />
      <path d="M10 16H14" />
      <path d="M10 18H14" />
    </svg>
  )
}

export function Flask({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M10 2V8L4 16C3.5 17 4.2 18 5.3 18H18.7C19.8 18 20.5 17 20 16L14 8V2" />
      <path d="M8 2H16" />
      <path d="M6 14H18" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
    </svg>
  )
}

export function BenzeneRing({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
      <polygon points="12,6 16,8.5 16,15.5 12,18 8,15.5 8,8.5" />
    </svg>
  )
}

export function ChemicalBond({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="4" cy="12" r="3" />
      <circle cx="20" cy="12" r="3" />
      <path d="M7 10L17 10" />
      <path d="M7 12L17 12" />
      <path d="M7 14L17 14" />
    </svg>
  )
}

export function Microscope({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M6 18H18" />
      <path d="M12 2V18" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="12" cy="14" r="3" />
      <path d="M8 8L16 8" />
      <path d="M10 20L14 20" />
    </svg>
  )
}

export function PeriodicElement({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <text x="12" y="10" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">H</text>
      <text x="12" y="18" textAnchor="middle" fontSize="6" fill="currentColor">1</text>
    </svg>
  )
}

export function ChemicalFormula({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <text x="2" y="12" fontSize="10" fill="currentColor" fontWeight="bold">H₂O</text>
      <text x="2" y="20" fontSize="8" fill="currentColor">C₆H₁₂O₆</text>
    </svg>
  )
}

export function Syringe({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="4" y="8" width="14" height="8" rx="1" />
      <path d="M18 10L22 6" />
      <path d="M18 14L22 18" />
      <path d="M2 12L4 12" />
      <circle cx="3" cy="12" r="1" fill="currentColor" />
      <path d="M6 12L16 12" />
      <rect x="8" y="10" width="2" height="4" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function Pipette({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 2V18" />
      <path d="M10 2L14 2" />
      <path d="M8 18L16 18" />
      <path d="M9 18L15 20" />
      <path d="M10 20L14 22" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <path d="M11 14L13 14" />
      <path d="M11.5 16L12.5 16" />
    </svg>
  )
}

export function DNASequence({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M6 2C8 4 8 8 6 10C8 12 8 16 6 18C8 20 8 24 6 26" />
      <path d="M18 2C16 4 16 8 18 10C16 12 16 16 18 18C16 20 16 24 18 26" />
      <path d="M6 6L18 6" />
      <path d="M6 10L18 10" />
      <path d="M6 14L18 14" />
      <path d="M6 18L18 18" />
      <text x="9" y="8" fontSize="4" fill="currentColor">A-T</text>
      <text x="9" y="12" fontSize="4" fill="currentColor">G-C</text>
      <text x="9" y="16" fontSize="4" fill="currentColor">C-G</text>
    </svg>
  )
}

export function CaffeineMolecule({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <polygon points="12,4 8,8 8,16 12,20 16,16 16,8" />
      <circle cx="12" cy="6" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
      <circle cx="14" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="10" cy="18" r="1" fill="currentColor" />
      <circle cx="14" cy="18" r="1" fill="currentColor" />
      <path d="M12 6L10 10L12 14L14 10L12 6" />
      <path d="M10 10L10 18L14 18L14 10" />
    </svg>
  )
}

export function LabBurner({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="8" y="16" width="8" height="6" rx="1" />
      <path d="M10 16V12" />
      <path d="M14 16V12" />
      <path d="M12 16V10" />
      <path d="M9 10L15 10" />
      <path d="M10 6L14 6" />
      <path d="M11 2L13 2" />
      <circle cx="12" cy="8" r="1" fill="orange" opacity="0.7" />
      <path d="M11 6C11 5 12 4 13 5" stroke="orange" opacity="0.5" />
    </svg>
  )
}

export function PHIndicator({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <rect x="6" y="8" width="2" height="8" fill="red" opacity="0.6" />
      <rect x="8" y="8" width="2" height="8" fill="orange" opacity="0.6" />
      <rect x="10" y="8" width="2" height="8" fill="yellow" opacity="0.6" />
      <rect x="12" y="8" width="2" height="8" fill="green" opacity="0.6" />
      <rect x="14" y="8" width="2" height="8" fill="blue" opacity="0.6" />
      <rect x="16" y="8" width="2" height="8" fill="purple" opacity="0.6" />
      <text x="12" y="4" textAnchor="middle" fontSize="6" fill="currentColor">pH</text>
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
    // Coding elements (neutral tones that work on both gradient and video) - increased sizes and opacity
    { Component: CodeBrackets, x: '10%', y: '15%', size: 24, rotation: 15, color: 'text-gray-600', opacity: 'opacity-30' },
    { Component: Terminal, x: '85%', y: '20%', size: 28, rotation: -10, color: 'text-gray-700', opacity: 'opacity-25' },
    { Component: CodeFunction, x: '15%', y: '70%', size: 22, rotation: 25, color: 'text-gray-600', opacity: 'opacity-35' },
    { Component: CodeBrackets, x: '80%', y: '75%', size: 20, rotation: -20, color: 'text-gray-600', opacity: 'opacity-30' },
    { Component: Terminal, x: '20%', y: '40%', size: 26, rotation: 45, color: 'text-gray-700', opacity: 'opacity-25' },
    
    // Chemistry elements (gold tones) - authentic chemistry doodles
    { Component: WaterMolecule, x: '75%', y: '35%', size: 26, rotation: -15, color: 'text-champagne-600', opacity: 'opacity-40' },
    { Component: Beaker, x: '90%', y: '60%', size: 28, rotation: 10, color: 'text-gold-600', opacity: 'opacity-35' },
    { Component: DNASequence, x: '5%', y: '55%', size: 32, rotation: -30, color: 'text-champagne-500', opacity: 'opacity-45' },
    { Component: CaffeineMolecule, x: '25%', y: '85%', size: 24, rotation: 35, color: 'text-gold-500', opacity: 'opacity-40' },
    { Component: Syringe, x: '70%', y: '10%', size: 26, rotation: -25, color: 'text-champagne-600', opacity: 'opacity-35' },
    { Component: Atom, x: '35%', y: '15%', size: 30, rotation: 0, color: 'text-gold-600', opacity: 'opacity-45' },
    { Component: TestTube, x: '60%', y: '80%', size: 24, rotation: 20, color: 'text-champagne-500', opacity: 'opacity-35' },
    { Component: Flask, x: '8%', y: '35%', size: 28, rotation: -10, color: 'text-gold-500', opacity: 'opacity-40' },
    { Component: BenzeneRing, x: '45%', y: '25%', size: 26, rotation: 30, color: 'text-champagne-600', opacity: 'opacity-38' },
    { Component: Pipette, x: '88%', y: '45%', size: 24, rotation: -20, color: 'text-gold-600', opacity: 'opacity-32' },
    { Component: Microscope, x: '12%', y: '80%', size: 30, rotation: 15, color: 'text-champagne-500', opacity: 'opacity-40' },
    { Component: PeriodicElement, x: '52%', y: '65%', size: 22, rotation: -5, color: 'text-gold-500', opacity: 'opacity-38' },
    { Component: ChemicalFormula, x: '78%', y: '25%', size: 24, rotation: 25, color: 'text-champagne-600', opacity: 'opacity-35' },
    { Component: LabBurner, x: '65%', y: '5%', size: 28, rotation: 45, color: 'text-gold-600', opacity: 'opacity-42' },
    { Component: PHIndicator, x: '30%', y: '60%', size: 26, rotation: -35, color: 'text-champagne-500', opacity: 'opacity-38' },
    { Component: Syringe, x: '95%', y: '30%', size: 24, rotation: 40, color: 'text-gold-500', opacity: 'opacity-32' },
    { Component: BenzeneRing, x: '18%', y: '95%', size: 22, rotation: -15, color: 'text-champagne-600', opacity: 'opacity-40' },
    { Component: DNASequence, x: '42%', y: '5%', size: 30, rotation: 60, color: 'text-champagne-500', opacity: 'opacity-42' },
    { Component: CaffeineMolecule, x: '85%', y: '85%', size: 26, rotation: -30, color: 'text-gold-600', opacity: 'opacity-38' },
    { Component: Pipette, x: '3%', y: '25%', size: 24, rotation: 15, color: 'text-champagne-600', opacity: 'opacity-35' },
    
    // Blood cells (mix of gray and subtle gold) - increased sizes and opacity
    { Component: SickleCell, x: '30%', y: '25%', size: 20, rotation: 20, color: 'text-gray-700', opacity: 'opacity-40' },
    { Component: NormalCell, x: '65%', y: '50%', size: 18, rotation: 0, color: 'text-gray-600', opacity: 'opacity-35' },
    { Component: SickleCell, x: '85%', y: '40%', size: 22, rotation: -40, color: 'text-champagne-500', opacity: 'opacity-30' },
    { Component: BloodDrop, x: '40%', y: '80%', size: 24, rotation: 15, color: 'text-gray-700', opacity: 'opacity-40' },
    { Component: NormalCell, x: '15%', y: '30%', size: 16, rotation: 0, color: 'text-gray-600', opacity: 'opacity-30' },
    { Component: SickleCell, x: '50%', y: '90%', size: 20, rotation: -15, color: 'text-gold-500', opacity: 'opacity-35' },
    { Component: BloodDrop, x: '90%', y: '85%', size: 22, rotation: 30, color: 'text-champagne-600', opacity: 'opacity-40' },
    { Component: NormalCell, x: '60%', y: '25%', size: 17, rotation: 0, color: 'text-gray-600', opacity: 'opacity-30' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {doodles.map((doodle, index) => {
        const { Component, x, y, size, rotation, color, opacity } = doodle
        return (
          <div
            key={index}
            className={`absolute ${opacity} ${color}`}
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