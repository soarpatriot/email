var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var autoprefixer = require('autoprefixer');
module.exports = {
    entry: {
      index: ROOT_PATH + "/src/index.html"
    },
    output: {
        path: ROOT_PATH + "/dist/",
        filename: "index.html",
    },    
    module: {
      rules: [
        { test: /\.html/, use: [ "html-loader" ]  }
      ]
    },
    plugins: [        
        new MiniCssExtractPlugin({
          filename: './src/style.css'}), // 实例化提取css插件
        new HtmlWebpackPlugin({ // 实例化生成html插件
            title: 'title',
            template: './src/index.html', 
            filename: './index.html', 
            inlineSource:  '.(js|css)$',  // 插入到html的css、js文件都要内联
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ["index"]
        }),        
        new HtmlWebpackInlineSourcePlugin() // 实例化内联资源插件
    ]
};
