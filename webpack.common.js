const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: 'babel-loader',
				include: /src/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	resolve: {
		symlinks: false
	}
}
