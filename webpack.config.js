const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');


module.exports = {
    mode: 'production',
    watch: false,
    entry: [
        'jquery',
        path.join(__dirname, 'webpack', 'main'),
    ],
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'assets/js')
    },
    module: {
        rules: [{
            test: /.js$/,
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'bower_components'),
                path.resolve(__dirname, '.idea')
            ],
            loader: 'babel-loader',
            query: {
                presets: [ "@babel/preset-env"]
            }
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        new Dotenv(),
    ],
};

