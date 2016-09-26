module.exports = {
	entry: {
		kitchensink: "./index.js",
		slider: ["./src/slider.js"]
	},
	output: {
		path: 'bundle',
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
