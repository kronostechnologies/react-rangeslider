module.exports = {
	entry: {
		slider: "./src/slider.js"
	},
	output: {
		path: 'bundle',
		filename: "[name].js",
		library: "ReactRangeslider",
		libraryTarget: "umd"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	},
	externals: [
		{
			'react': {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			}
		}
	]
};
