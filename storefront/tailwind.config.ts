import type { Config } from 'tailwindcss';
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RTV Brand Colors - 2025 Warm & Bold Refresh
        rtv: {
          // Warm light backgrounds (Pantone 2025 inspired)
          cream: '#FAF8F5',
          paper: '#F5F1EB',
          sand: '#EDE8E0',
          latte: '#E5DFD5',

          // Rich dark tones (for contrast sections)
          ink: '#1C1917',
          charcoal: '#292524',
          stone: '#44403C',

          // Primary accent - warm teal with gold undertone
          teal: '#2D8A8C',
          tealLight: '#3AA3A5',
          tealDark: '#1F6B6D',

          // Secondary accent - warm terracotta/rust
          rust: '#C45D3E',
          rustLight: '#D4714F',
          rustDark: '#A34D32',

          // Gold accent for premium feel
          gold: '#B8860B',
          goldLight: '#DAA520',

          // Legacy dark (keep for some sections)
          obsidian: '#1a1a24',
          obsidianDark: '#121218',
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        nav: 'var(--height-nav)',
        screen: 'var(--screen-height, 100vh)',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      height: {
        screen: 'var(--screen-height, 100vh)',
        'screen-no-nav': 'calc(var(--screen-height, 100vh) - var(--height-nav))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'warm': '0 10px 40px -10px rgba(196, 93, 62, 0.15)',
        'teal': '0 10px 40px -10px rgba(45, 138, 140, 0.2)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 40px -20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 1px 3px rgba(0, 0, 0, 0.05), 0 30px 60px -20px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow-teal': '0 0 40px rgba(45, 138, 140, 0.25)',
        'glow-rust': '0 0 40px rgba(196, 93, 62, 0.2)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

export default config;
