'use strict';
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = "./www/src/";

module.exports = function (ops){
    var config = {
        // debug: true,
        entry: {
            app:[
                'webpack-dev-server/client?http://127.0.0.1:3000', 
                'webpack/hot/only-dev-server',
                srcPath + 'view/home/index.jsx',
            ],
            admin: [
                'webpack-dev-server/client?http://127.0.0.1:3000', 
                'webpack/hot/only-dev-server',
                srcPath + 'view/admin/admin.jsx'
            ]
        },
        output: {
            path: path.join(__dirname, "../www/static/view"),
            publicPath: "http://127.0.0.1:3000/www/static/view/",
            filename: '[name].bundle.js',
            chunkFilename: '[hash].[name].bundle.js'
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.sass']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'react-hot!babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    loader: 'react-hot!babel',
                    exclude: /node_modules/
                },
                {
                    test:/\.sass$/, 
                    loader: "style!css!sass"
                }
            ]
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin( 'common.js'),
            new HtmlWebpackPlugin({
                template: srcPath + "view/template/index.html",
                filename: "../../../view/home/index_index.html",
                inject: true,
                // chunks: ['app1', "common.js"],
                excludeChunks: ['admin'],
                minify: {
                    removeComments: false,
                    collapseWhitespace:false,
                    keepClosingSlash: true,
                    removeEmptyElements: true
                }
            }),
            new HtmlWebpackPlugin({
                template: srcPath + "view/template/admin.html",
                filename: "../../../view/admin/index_index.html",
                inject: true,
                // chunks: ['app1', "common.js"],
                excludeChunks: ['app'],
                minify: {
                    removeComments: false,
                    collapseWhitespace:false,
                    keepClosingSlash: true,
                    removeEmptyElements: true
                }
            })
        ],
        devtool: 'source-map'
    };

    return config;
}();