
var webpack = require("webpack")
var path = require("path")
var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

//导出webpack配置项
module.exports = {
    entry: {
        index: "./src/index.js",
        vendor: ["react", "react-dom", "react-router"]
    },
    output: {
        path: path.resolve("./build"),
        filename: "[name].[chunkHash:8].js",
        publicPath: "",
        chunkFilename: "[name].[chunkHash:8].js"
    },
    devServer: {
        host: "192.168.1.155",
        port: 9090,
        inline: true,
        contentBase: './build'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015"]
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new ExtractTextPlugin("styles.css"),
    ]
}