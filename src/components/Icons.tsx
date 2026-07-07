interface IconProps {
  size?: number
  strokeWidth?: number
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const SearchIcon = ({ size = 19, strokeWidth = 1.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

export const AccountIcon = ({ size = 19, strokeWidth = 1.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </svg>
)

export const HeartIcon = ({ size = 19, strokeWidth = 1.4, filled = false }: IconProps & { filled?: boolean }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.6-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7-2.5C19 10.4 12 20 12 20z" />
  </svg>
)

export const BagIcon = ({ size = 19, strokeWidth = 1.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M6 8h12l-1 13H7L6 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)

export const LockIcon = ({ size = 14, strokeWidth = 1.5 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <rect x="5" y="11" width="14" height="9" rx="1.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export const CloseIcon = ({ size = 18, strokeWidth = 1.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const ArrowIcon = ({ size = 16, strokeWidth = 1.4, dir = 'right' }: IconProps & { dir?: 'left' | 'right' }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} style={dir === 'left' ? { transform: 'rotate(180deg)' } : undefined}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
)

export const CheckIcon = ({ size = 10, strokeWidth = 3 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
)

export const PlusIcon = ({ size = 14, strokeWidth = 1.4 }: IconProps) => (
  <svg {...base(size)} strokeWidth={strokeWidth}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
