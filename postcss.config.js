module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      // Remove unused CSS in production
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}',
          './src/app/**/*.{js,ts,jsx,tsx}',
          './src/design-system/**/*.{js,ts,jsx,tsx}',
        ],
        defaultExtractor: (content) => {
          // Extract all possible class names, including Tailwind's dynamic classes
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
        safelist: {
          standard: [
            /^bg-/,
            /^text-/,
            /^border-/,
            /^hover:/,
            /^focus:/,
            /^active:/,
            /^group-/,
            /^animate-/,
            /^transition/,
            /^duration/,
            /^ease/,
            /^placeholder/,
            /^disabled:/,
            /^dark:/,
            /^sm:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            /^2xl:/,
            // Safelist dynamic classes
            'font-inter',
            'font-playfair',
            'font-loading',
            'fonts-loaded',
            'skeleton',
            // Safelist animation classes
            'animate-pulse',
            'animate-spin',
            'animate-bounce',
            'animate-ping',
            // Safelist form classes
            'form-input',
            'form-textarea',
            'form-select',
            'form-checkbox',
            'form-radio',
          ],
          deep: [
            /^bg-(primary|secondary|burgundy|gold|success|error|warning|info)/,
            /^text-(primary|secondary|burgundy|gold|success|error|warning|info)/,
            /^border-(primary|secondary|burgundy|gold|success|error|warning|info)/,
          ],
          greedy: [
            /tooltip/,
            /modal/,
            /dropdown/,
            /popover/,
            /toast/,
          ],
        },
        // Don't remove CSS from these files
        blocklist: [
          'globals.css',
          'modern-ui.css',
        ],
        // Specific keyframes to keep
        keyframes: true,
        fontFace: true,
        variables: true,
      },
      // CSS optimization
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardEmpty: true,
          discardDuplicates: true,
          discardOverridden: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: true,
          uniqueSelectors: true,
          calc: {
            precision: 10,
          },
        }],
      },
    } : {}),
  },
};
