/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './pages/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        whitesmoke: {
          DEFAULT: '#f5f5f5'
        },
        teaGreen: {
          DEFAULT: '#dcf8c6' 
        },
        pictonBlue: {
          DEFAULT: '#34b7f1'
        },
        whiteChocolate: {
          DEFAULT: '#ece5dd'
        },
        whatsapp: {
          DEFAULT: '#e5ded3'
        }
      }
    },
  },
  plugins: [],
}

