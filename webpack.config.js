const path = require('path');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
    entry: {
        index: './src/index.ts',
        vendor: './src/vendor.ts',
        commonModules: './src/commonModules.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'commonModules', 'manifest']
        }),
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        }),
        new ClearWebpackPlugin(['./dist']),
        new CheckerPlugin()
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension. 
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsConfigPathsPlugin(/* { configFileName, compiler } */)
        ]
    },
    output: {
        filename: prod ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: prod ? '[name].[chunkhash].js' : '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: prod ? false : 'inline-source-map'
};

if (prod) {
    module.exports.plugins.push(new UglifyJSPlugin());
}