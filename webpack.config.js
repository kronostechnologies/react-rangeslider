const webpack = require('webpack');

module.exports = {
	entry: {
		slider: "./src/slider.js"
	},
	output: {
		path: 'bundle',
		filename: "[name].js",
		library: "ReactRangeslider",
		libraryTarget: "umd",
		publicPath: '/bundle/',
        umdNamedDefine: true
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
			},
			"react-dom": {
				commonjs: "react-dom",
				commonjs2: "react-dom",
				amd: "ReactDOM",
				root: "ReactDOM"
			}
		}
	],
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	]
};
