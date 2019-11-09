const merge = require('webpack-merge')
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
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img'
						}
					}
				]
			}
		]
	},
	mode: 'development',
	devtool: false
})
