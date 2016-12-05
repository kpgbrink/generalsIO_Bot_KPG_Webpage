var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        __dirname + '/app/scripts/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/bundle.js',
    },
    externals: {
        gapi: "gapi",
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
    postcss: [],
    plugins: [
        new HtmlWebpackPlugin({template: __dirname + "/app/index.tmpl.html"}),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3001,
        proxy: { '/api/*': 'http://localhost:3000' },
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
