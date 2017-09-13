const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

// const javascript = {
// 	test: /\.js$/,
// 	use: [
// 		{
// 			loader: 'babel-loader',
// 			options: { presets: ['es2015'] },
// 		},
// 	],
// };

const typescript = {
	test: /.ts$/,
	use: [
		{
			loader: 'babel-loader',
			options: { presets: ['es2015'] },
		},
		{
			loader: 'ts-loader',
		},
	],
};

const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins() {
			return [autoprefixer({ browsers: 'last 3 versions' })];
		},
	},
};

const styles = {
	test: /\.(scss)$/,
	use: ExtractTextWebpackPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap']),
};

const uglify = new webpack.optimize.UglifyJsPlugin({
	compress: { warnings: false },
});

const config = {
	entry: {
		app: './public/javascripts/main.ts',
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'public', 'dist'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [typescript, styles],
	},
	plugins: [
		new ExtractTextWebpackPlugin('style.css'),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'index.html'),
		}),
	],
};

process.noDeprecation = true;

module.exports = config;
