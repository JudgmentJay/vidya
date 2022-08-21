const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const postCSSLoader = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				[
					'autoprefixer'
				]
			]
		}
	}
}

const cssModuleLoader = {
	loader: 'css-loader',
	options: {
		modules: {
			localIdentName: '[local]__[hash:base64:5]',
		}
	}
}

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
			new CssMinimizerPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					postCSSLoader,
					'sass-loader'
				],
				include: /src/,
				exclude: /\.module\.scss$/
			},
			{
				test: /\.module\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					cssModuleLoader,
					postCSSLoader,
					'sass-loader'
				],
				include: /src/
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[fullhash].css',
			chunkFilename: 'css/[id].[fullhash].css'
		})
	]
})
