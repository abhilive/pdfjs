const path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'pdf.combined.min.js',
	},
	plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
};
