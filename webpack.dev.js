const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				],
				include: /src/
			}
		]
	},
	mode: 'development',
	devServer: {
		proxy: {
			'/games': 'http://localhost:3010'
		}
	}
})
