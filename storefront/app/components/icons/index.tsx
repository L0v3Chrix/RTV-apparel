/**
 * Custom RTV Icon System
 * 8 custom SVG icons with consistent style: 24x24, stroke-width 1.5, rounded caps
 * No generic icon sets - each icon is unique to our brand story
 */

import type {SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const defaultProps: IconProps = {
  size: 24,
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
  stroke: 'currentColor',
};

// 01 - Torch/Flame: The light we carry
export function IconTorch({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M12 2C12 2 8 6 8 10c0 2.21 1.79 4 4 4s4-1.79 4-4c0-4-4-8-4-8z" />
      <path d="M12 14v8" />
      <path d="M9 22h6" />
    </svg>
  );
}

// 02 - Heart Shield: Protection + love
export function IconHeartShield({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8c-1 0-2 .5-2 1.5S10.5 11 12 12.5c1.5-1.5 2-2 2-3S13 8 12 8z" />
    </svg>
  );
}

// 03 - Hands Together: Community/tribe
export function IconHandsTogether({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M7 11c-1.5 0-3 1-3 3v4c0 1 1 2 2 2h2" />
      <path d="M17 11c1.5 0 3 1 3 3v4c0 1-1 2-2 2h-2" />
      <path d="M12 4v6" />
      <path d="M8 7l4-3 4 3" />
      <path d="M8 20h8" />
    </svg>
  );
}

// 04 - Sunrise Path: New beginning / restoration
export function IconSunrisePath({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M12 2v3" />
      <path d="M4.22 7.22l2.12 2.12" />
      <path d="M19.78 7.22l-2.12 2.12" />
      <path d="M2 15h20" />
      <path d="M6 15a6 6 0 0 1 12 0" />
      <path d="M12 15v7" />
    </svg>
  );
}

// 05 - Chain Break: Breaking generational cycles
export function IconChainBreak({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M9 15l-2 2" />
      <path d="M15 9l2-2" />
      <path d="M11 13l2-2" />
      <rect x="3" y="13" width="6" height="6" rx="2" transform="rotate(-45 6 16)" />
      <rect x="15" y="5" width="6" height="6" rx="2" transform="rotate(-45 18 8)" />
      <path d="M2 2l20 20" strokeDasharray="2 2" />
    </svg>
  );
}

// 06 - Flag Raised: Our mission marker
export function IconFlagRaised({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M4 22V2" />
      <path d="M4 2l12 4-12 4" />
      <path d="M4 10l12 4" />
    </svg>
  );
}

// 07 - Cross Heart: Faith + love unified
export function IconCrossHeart({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M12 2v7" />
      <path d="M8 6h8" />
      <path d="M12 9c-4 0-7 3-7 6 0 4 7 7 7 7s7-3 7-7c0-3-3-6-7-6z" />
    </svg>
  );
}

// 08 - Sound Wave: Worship / raising the vibe
export function IconSoundWave({size = 24, ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...defaultProps} {...props}>
      <path d="M12 4v16" />
      <path d="M8 7v10" />
      <path d="M16 7v10" />
      <path d="M4 10v4" />
      <path d="M20 10v4" />
    </svg>
  );
}

/**
 * IconBadge - Wrapper for icons with subtle pill/badge background
 */
interface IconBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeSizes = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};

const badgeVariants = {
  default: 'bg-white/5 border border-white/10',
  glow: 'bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(99,179,237,0.15)]',
  outline: 'bg-transparent border border-rtv-cyan/30',
};

export function IconBadge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: IconBadgeProps) {
  return (
    <div
      className={`
        ${badgeSizes[size]}
        ${badgeVariants[variant]}
        rounded-xl flex items-center justify-center
        text-white/70
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Export all icons as a collection for mapping
export const RTVIcons = {
  torch: IconTorch,
  heartShield: IconHeartShield,
  handsTogether: IconHandsTogether,
  sunrisePath: IconSunrisePath,
  chainBreak: IconChainBreak,
  flagRaised: IconFlagRaised,
  crossHeart: IconCrossHeart,
  soundWave: IconSoundWave,
} as const;

export type RTVIconName = keyof typeof RTVIcons;
