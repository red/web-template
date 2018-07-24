const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const isProd = process.env.NODE_ENV === 'production';

const ifProd = (val, alt) => {
	if (typeof val === 'undefined') {
		return isProd;
	}
	return isProd ? val : alt;
};
const ifDev = (val, alt) => {
	if (typeof val === 'undefined') {
		return !isProd;
	}
	return !isProd ? val : alt;
};

const paths = {
	CWD: path.resolve(__dirname),
	DIST: path.resolve(__dirname, 'static'),
	SRC: path.resolve(__dirname, 'src'),
	SITE: path.resolve(__dirname, '../..')
};

// Custom PurgeCSS extractor for Tailwind that allows special characters in class names.
class TailwindExtractor {
	static extract(content) {
		// eslint-disable-next-line no-useless-escape
		return content.match(/[A-z0-9-:\/]+/g) || [];
	}
}

module.exports = {
	// If a string or array of strings is passed, the chunk is named `main`.
	entry: [
		...glob.sync([
			path.join(paths.SRC, 'js', '/**/*.{js,ts}'),
			path.join(paths.SITE, 'src', 'js', '/**/*.{js,ts}')
		]),
		path.join(paths.SRC, 'styles', 'main.css')
		// This is imported directly from main.css for now. Revisit when Tailwind can use `@apply` for
		// classes that aren't in the same CSS tree.
		// path.join(paths.SITE, 'styles', 'main.css')
	],
	output: {
		path: paths.DIST,
		filename: 'js/[name].[chunkhash:10].js'
	},
	devtool: isProd ? 'source-map' : 'cheap-eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.s?css$/,
				// Loader chaining works from right to left
				use: [
					// Use inline style loader for dev since MiniCss isn't writing things to disk properly
					isProd ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							minimize: ifProd(),
							sourceMap: ifDev()
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: ifDev()
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		// https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[hash:10].css'
		}),
		// https://tailwindcss.com/docs/controlling-file-size
		// https://www.purgecss.com/with-webpack
		ifProd(
			new PurgeCssPlugin({
				paths: glob.sync([
					path.join(paths.CWD, 'layouts/**/*.html'),
					path.join(paths.CWD, 'content/**/*.{md,html}'),
					path.join(paths.SRC, 'js', '/**/*.{js,ts}'),

					path.join(paths.SITE, 'layouts/**/*.html'),
					// path.join(paths.SITE, 'content/**/*.{md,html}'), TODO: This causes error! Why!
					path.join(paths.SITE, 'src', 'js', '/**/*.{js,ts}')
				]),
				extractors: [
					{
						extractor: TailwindExtractor,
						extensions: ['html', 'js', 'ts']
					}
				],
				// Target all classes here that are dynamically assembled somewhere in a template,
				// e.g. with `grid-columns-{{ .Params.num_cols }}`
				// TODO: Revisit this!
				whitelistPatterns: () => [/grid-columns/]
			})
		),
		new WebpackAssetsManifest({
			output: '../data/assetMap.json'
		}),
		ifDev(new webpack.NamedModulesPlugin())
	].filter(el => el)
};
