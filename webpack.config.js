const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './js/main.js',
    output:{
        filename: './js/main.js',
        path: path.resolve(__dirname, 'build')
    },

    devServer:{
        contentBase: path.join(__dirname, 'templates'),
        compress: true,
        port: 3500
    },

    module:{
        rules:[
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath: '/style/'
                    }
                }, 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath: '/style/'
                    }
                }, 'css-loader', 'sass-loader']
            },{
                test: /\.js$/,
                use: 'babel-loader'
            },{
                test:/\.(gif|png|jpg|jpeg|svg)$/,
                use:['file-loader',{
                    loader:'image-webpack-loader',
                    options:{
                        pngquant:{
                            quality: [0.65, 0.90],
                            progressive: true,
                        }
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./templates/index.html"
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns:[
                {
                    from: "img",
                    to: "img"
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "main.min.css"
        })
    ]
}