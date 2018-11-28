const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/js/index',
		'./src/sass/styles.scss'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: "/dist/",
		filename: '[name].js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
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
		new MiniCssExtractPlugin({
			filename: './css/styles.css',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: './',
		hot: true,
		inline: true,
		port: 9000
	}
};
