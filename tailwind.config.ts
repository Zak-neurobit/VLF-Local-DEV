import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
} from './src/styles/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    // Use design tokens for base theme
    screens: breakpoints,
    spacing: spacing,
    extend: {
      colors: {
        // CSS Variables for dynamic theming
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand colors from design tokens
        burgundy: colors.brand.burgundy,
        gold: colors.brand.gold,

        // Primary and secondary aliases
        primary: {
          DEFAULT: colors.brand.gold[500],
          foreground: colors.neutral[0],
          ...colors.brand.gold,
        },
        primaryDark: colors.brand.gold[600],
        secondary: {
          DEFAULT: colors.brand.burgundy[700],
          foreground: colors.neutral[0],
          ...colors.brand.burgundy,
        },
        secondaryDark: colors.brand.burgundy[800],

        // Semantic colors
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,

        // Neutral colors
        neutral: colors.neutral,
        gray: colors.neutral, // Alias for compatibility

        // UI element colors
        destructive: {
          DEFAULT: colors.semantic.error.DEFAULT,
          foreground: colors.neutral[0],
        },
        muted: {
          DEFAULT: colors.neutral[100],
          foreground: colors.neutral[700],
        },
        accent: {
          DEFAULT: colors.brand.gold[500],
          foreground: colors.neutral[900],
        },
        popover: {
          DEFAULT: colors.neutral[0],
          foreground: colors.neutral[900],
        },
        card: {
          DEFAULT: colors.neutral[0],
          foreground: colors.neutral[900],
        },
      },
      borderRadius: borderRadius,
      fontFamily: {
        sans: typography.fonts.sans.split(',').map(f => f.trim()),
        serif: typography.fonts.serif.split(',').map(f => f.trim()),
        display: typography.fonts.display.split(',').map(f => f.trim()),
        mono: typography.fonts.mono.split(',').map(f => f.trim()),
      },
      fontSize: typography.sizes,
      fontWeight: Object.fromEntries(
        Object.entries(typography.weights).map(([k, v]) => [k, String(v)])
      ),
      lineHeight: Object.fromEntries(
        Object.entries(typography.lineHeights).map(([k, v]) => [k, String(v)])
      ),
      letterSpacing: typography.letterSpacing,
      boxShadow: {
        ...Object.fromEntries(Object.entries(shadows).filter(([_, v]) => typeof v === 'string')),
        'glow-gold': shadows.glow.gold,
        'glow-burgundy': shadows.glow.burgundy,
      },
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          from: { transform: 'translateX(10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        scale: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        scale: 'scale 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
