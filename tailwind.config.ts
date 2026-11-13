import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FBF7EF',
        ink: '#1C1A17',
        muted: '#6E675E',
        accent: '#B3402A',
        'accent-deep': '#9C3521',
        line: '#E3DCCF',
        card: '#F3EEE3',
        foreground: '#1C1A17',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.08em',
        widest: '0.12em',
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px',
      },
      animation: {
        'scroll-pulse': 'scrollPulse 2.4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        'progress-fill': 'progressFill 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        scrollPulse: {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '1' },
          '50%': { transform: 'scaleY(0.3)', opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
