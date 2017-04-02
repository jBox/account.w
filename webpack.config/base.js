const { resolve } = require('path');
const webpack = require('webpack');

module.exports = function () {
    return {
        context: resolve(__dirname, '../src'),

        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
            ]
        },

        plugins: [],
    };
}