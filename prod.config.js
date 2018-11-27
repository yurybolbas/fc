const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/js/index',
		'./src/sass/styles.scss'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: "/dist/",
		filename: 'main.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
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
		new CleanWebpackPlugin('dist', {} ),
		new MiniCssExtractPlugin({
			filename: './css/styles.css',
		}),
	]
};
