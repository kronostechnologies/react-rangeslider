const path = require('path');

module.exports = {
	entry: {
		kitchensink: "./index.js"
	},
	mode: 'development',
	output: {
		path: path.join(__dirname, '/app'),
		filename: "[name].js"
	},
	resolve: {
		modules: [path.resolve(__dirname, './node_modules')]
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	}
};
