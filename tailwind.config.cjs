/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito', 'sans-serif']
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'night']
	}
}
