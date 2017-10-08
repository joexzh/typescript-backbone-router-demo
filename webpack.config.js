const path = require('path');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const envConfig = require("./env.config.json")

const prod = process.argv.indexOf('-p') !== -1;
const envObj = (function () {
    switch (process.env.NODE_ENV) {
        case "test":
            return envConfig.test;
        case "production":
            return envConfig.production
        case "dev":
        default:
            return envConfig.dev;
    }
})();

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
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'commonModules', 'manifest']
        }),
        new HTMLWebpackPlugin({
            template: "index.ejs",
            env: envObj
        }),
        new ClearWebpackPlugin(['./dist']),
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            __EnvConfig__: JSON.stringify(envObj)
        })
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