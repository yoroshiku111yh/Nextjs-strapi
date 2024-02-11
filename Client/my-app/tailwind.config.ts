import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily : {
        poppins : ["Poppins", "sans-serif"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      light : {
        "black-0" : "#000",
        "gray-3" : "#333333",
        "yellow-b8" : "#B88E2F",
        "yellow-ff" : "#FFF3E3",
        "white-f" : "#fff",
        "gray-6" : "#666666",
        "gray-3a" : "#3A3A3A",
        "gray-89" : "#898989",
        "gray-b0" : "#B0B0B0",
        "red-e9" : "#E97171",
        "green-2e" : "#2EC1AC",
        "gray-9f" : "#9F9F9F",
        "gray-f4" : "#F4F5F7"
      },
      dark : {

      }
    }
  },
  plugins: [],
}
export default config
