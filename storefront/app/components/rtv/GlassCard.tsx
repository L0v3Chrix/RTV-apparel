/**
 * GlassCard Component
 * Single source of truth for glassmorphism styling across the site
 *
 * Usage:
 *   <GlassCard>Content</GlassCard>
 *   <GlassCard variant="glow">Content with subtle glow</GlassCard>
 *   <GlassCard variant="hover" as="button">Interactive card</GlassCard>
 */

import {type ReactNode, type ElementType} from 'react';

type GlassVariant = 'default' | 'glow' | 'hover' | 'solid' | 'subtle';

interface GlassCardProps {
  children: ReactNode;
  variant?: GlassVariant;
  className?: string;
  as?: ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  [key: string]: any;
}

const variantStyles: Record<GlassVariant, string> = {
  default: `
    bg-white/[0.08]
    backdrop-blur-[20px]
    border border-white/15
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
  `,
  glow: `
    bg-white/[0.08]
    backdrop-blur-[20px]
    border border-white/15
    shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(99,179,237,0.15)]
  `,
  hover: `
    bg-white/[0.08]
    backdrop-blur-[20px]
    border border-white/15
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    transition-all duration-300 ease-out
    hover:bg-white/[0.12]
    hover:border-white/25
    hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(99,179,237,0.2)]
    hover:-translate-y-0.5
  `,
  solid: `
    bg-rtv-obsidian/80
    backdrop-blur-[20px]
    border border-white/10
    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
  `,
  subtle: `
    bg-white/[0.03]
    backdrop-blur-[12px]
    border border-white/5
  `,
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10 lg:p-12',
};

const roundedStyles: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export function GlassCard({
  children,
  variant = 'default',
  className = '',
  as: Component = 'div',
  padding = 'md',
  rounded = 'xl',
  ...props
}: GlassCardProps) {
  const baseStyles = variantStyles[variant];
  const padStyles = paddingStyles[padding];
  const roundStyles = roundedStyles[rounded];

  return (
    <Component
      className={`${baseStyles} ${padStyles} ${roundStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * GlassOverlay - For hero sections and image overlays
 */
interface GlassOverlayProps {
  children?: ReactNode;
  direction?: 'bottom' | 'top' | 'left' | 'right' | 'center';
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
}

const overlayGradients: Record<string, Record<string, string>> = {
  light: {
    bottom: 'bg-gradient-to-t from-rtv-obsidian/60 via-rtv-obsidian/30 to-transparent',
    top: 'bg-gradient-to-b from-rtv-obsidian/60 via-rtv-obsidian/30 to-transparent',
    left: 'bg-gradient-to-r from-rtv-obsidian/60 via-rtv-obsidian/30 to-transparent',
    right: 'bg-gradient-to-l from-rtv-obsidian/60 via-rtv-obsidian/30 to-transparent',
    center: 'bg-rtv-obsidian/40',
  },
  medium: {
    bottom: 'bg-gradient-to-t from-rtv-obsidian/80 via-rtv-obsidian/50 to-transparent',
    top: 'bg-gradient-to-b from-rtv-obsidian/80 via-rtv-obsidian/50 to-transparent',
    left: 'bg-gradient-to-r from-rtv-obsidian/80 via-rtv-obsidian/50 to-transparent',
    right: 'bg-gradient-to-l from-rtv-obsidian/80 via-rtv-obsidian/50 to-transparent',
    center: 'bg-rtv-obsidian/60',
  },
  heavy: {
    bottom: 'bg-gradient-to-t from-rtv-obsidian via-rtv-obsidian/70 to-rtv-obsidian/20',
    top: 'bg-gradient-to-b from-rtv-obsidian via-rtv-obsidian/70 to-rtv-obsidian/20',
    left: 'bg-gradient-to-r from-rtv-obsidian via-rtv-obsidian/70 to-rtv-obsidian/20',
    right: 'bg-gradient-to-l from-rtv-obsidian via-rtv-obsidian/70 to-rtv-obsidian/20',
    center: 'bg-rtv-obsidian/80',
  },
};

export function GlassOverlay({
  children,
  direction = 'bottom',
  className = '',
  intensity = 'medium',
}: GlassOverlayProps) {
  const gradientClass = overlayGradients[intensity][direction];

  return (
    <div className={`absolute inset-0 ${gradientClass} ${className}`}>
      {children}
    </div>
  );
}

/**
 * GlassDivider - Subtle divider line with glass effect
 */
interface GlassDividerProps {
  className?: string;
  glow?: boolean;
}

export function GlassDivider({className = '', glow = false}: GlassDividerProps) {
  return (
    <div
      className={`
        h-px w-full
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        ${glow ? 'shadow-glow-sm' : ''}
        ${className}
      `}
    />
  );
}

export default GlassCard;
