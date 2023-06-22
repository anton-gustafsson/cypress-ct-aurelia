const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');

// primary config:
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const baseUrl = '/';

const cssRules = [
    {
        loader: 'css-loader'
    }
];

const production = true;

module.exports = ({} = {}) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [srcDir, 'node_modules'],

        alias: {
            'aurelia-binding': path.resolve(__dirname, 'node_modules/aurelia-binding')
        }
    },
    entry: {
        app: ['aurelia-bootstrapper']
    },
    mode: production ? 'production' : 'development',
    output: {
        path: outDir,
        publicPath: baseUrl,
        filename: production ? '[name].[chunkhash].bundle.js' : '[name].[fullhash].bundle.js',
        chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[fullhash].chunk.js'
    },
    optimization: {
        runtimeChunk: true,
        moduleIds: 'deterministic',
        splitChunks: {
            hidePathInfo: true,
            chunks: 'initial',
            maxSize: 200000,

            cacheGroups: {
                default: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 19,
                    enforce: true,
                    minSize: 30000
                },
                vendorsAsync: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors.async',
                    chunks: 'async',
                    priority: 9,
                    reuseExistingChunk: true,
                    minSize: 10000
                },
                commonsAsync: {
                    name: 'commons.async',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 0,
                    reuseExistingChunk: true,
                    minSize: 10000
                }
            }
        }
    },
    performance: { hints: false },
    devServer: {
        historyApiFallback: true,
        open: false,
        hot: true,
        port: 8080,
        host: 'localhost'
    },
    devtool: production ? undefined : 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                issuer: { not: [/\.html$/i] },
                use: [{ loader: MiniCssExtractPlugin.loader }, ...cssRules]
            },
            {
                test: /\.css$/i,
                issuer: /\.html$/i,

                use: cssRules
            },

            { test: /\.html$/i, loader: 'html-loader', options: { minimize: false } },
            { test: /\.ts$/, loader: 'ts-loader' },

            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset' },
            { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, type: 'asset' }
        ]
    },
    plugins: [
        new AureliaPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            metadata: {
                baseUrl
            }
        }),
        new MiniCssExtractPlugin({
            filename: production ? '[name].[contenthash].bundle.css' : '[name].[fullhash].bundle.css',
            chunkFilename: production ? '[name].[contenthash].chunk.css' : '[name].[fullhash].chunk.css'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: production ?? false
        })
    ]
});
