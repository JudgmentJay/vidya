const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		assetModuleFilename: 'img/[name][ext]',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.(jsx?)$/,
				loader: 'babel-loader',
				include: /src/
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html')
		})
	]
}
