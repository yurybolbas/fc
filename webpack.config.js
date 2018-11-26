const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/js/index',
		'./src/sass/styles.scss'
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader",
						options: {
							sourceMap: true,
							minimize: true
						}
					},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node-modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './css/styles.css',
			allChunks: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};
