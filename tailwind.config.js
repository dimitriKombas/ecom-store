/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem,1fr))",
      },
      fontFamily: {
        lobster: ["var(--font-lobster)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },

  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },

  plugins: [
    require("daisyui"),

    // Insert the function here
    function ({ addUtilities }) {
      const newUtilities = {
        '.shadow-white': {
          boxShadow: '0 4px 6px rgba(255, 255, 255, 0.05), 0 1px 3px rgba(255, 255, 255, 0.04) !important',
        },
        '.hover\\:shadow-white-2xl:hover': {
          boxShadow: '0 10px 15px rgba(255, 255, 255, 0.1), 0 4px 6px rgba(255, 255, 255, 0.07) !important',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],

  daisyui: {
    themes: [
      {
        'dark': {
          "primary": "#793ef9",
          "primary-focus": "#570df8",
          "primary-content": "#ffffff",
          "secondary": "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",
          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",
          "neutral": "#2a2e37",
          "neutral-focus": "#16181d",
          "neutral-content": "#ffffff",
          "base-100": "#000000",
          "base-200": "#1a1a1a",
          "base-300": "#2a2a2a",
          "base-content": "#ebecf0",
          "info": "#66c6ff",
          "success": "#87d039",
          "warning": "#e2d562",
          "error": "#ff6f6f"
        },
      },
      'light',
    ]
  }
}
