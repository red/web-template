// https://github.com/tailwindcss/webpack-starter
module.exports = {
	plugins: [require('postcss-import'), require('tailwindcss')('./tailwind.js')]
};
