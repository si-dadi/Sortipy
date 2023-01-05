/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xxx': '-405px 0 0 400px #605E5C'
      },
      bg:{
      'login-button-bg': 'background-image: linear-gradient(#7EE249, #F2F047)'}
    },
  },
  plugins: [],
}