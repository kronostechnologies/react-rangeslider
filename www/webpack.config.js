module.exports = {
	entry: {
		kitchensink: "./index.js"
	},
	output: {
		path: 'app',
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	}
};
