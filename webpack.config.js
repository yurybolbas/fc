const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/js/index'],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node-modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};
