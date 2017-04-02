const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const WebpackChunkHash = require("webpack-chunk-hash");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: "main.[contenthash].css"
});

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        entry: {
            main: "./index.js" // application code
        },

        output: {
            filename: "[name].[chunkhash].js",
            chunkFilename: "[name].[chunkhash].js",

            path: resolve(__dirname, '../dist/assets'),

            publicPath: '/assets'
        },

        devtool: 'source-map',

        module: {
            rules: [{
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader?modules"
                    }, {
                        loader: "less-loader"
                    }]
                })
            }]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: resolve(__dirname, '../dist/index.html'),
                template: resolve(__dirname, '../public/index.html'),
                chunksSortMode: 'dependency'
            }),

            extractLess,

            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),

            /*new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),*/

            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // this assumes your vendor imports exist in the node_modules directory
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),

            new webpack.HashedModuleIdsPlugin(),

            new WebpackChunkHash(),
        ]
    })
}