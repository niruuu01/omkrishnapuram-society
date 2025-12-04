/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/**/*.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0f172a',
                secondary: '#3b82f6',
                accent: '#0ea5e9',
                surface: '#ffffff',
                background: '#f8fafc',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
