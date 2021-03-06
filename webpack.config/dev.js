const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        entry: [
            'react-hot-loader/patch',
            // activate HMR for React

            'webpack-dev-server/client?http://localhost:8080',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            "./index.js"
        ],

        output: {
            filename: "main.js",

            path: resolve(__dirname, '../dev'),

            publicPath: '/'
        },

        devtool: 'inline-source-map',

        devServer: {
            hot: true,
            // enable HMR on the server

            contentBase: resolve(__dirname, '../dev'),
            // match the output path

            publicPath: '/',
            // match the output `publicPath`

            historyApiFallback: true,
            // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
        },

        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader?modules',
                        'less-loader',
                    ]
                }
            ]
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // enable HMR globally

            new webpack.NamedModulesPlugin(),
            // prints more readable module names in the browser console on HMR updates
        ]
    });
}