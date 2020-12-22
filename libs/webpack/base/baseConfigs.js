// @ts-check
const path = require('path')

const { IgnorePlugin } = require('webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const staticDirName = 'static';
const outputDirName = 'dist';

const staticDir = path.join('/', staticDirName, '/');
const outputPath = path.join(process.cwd(), outputDirName);

module.exports = (options) => {
  const { htmlOptions } = options;

  return {
    staticDirName,
    output: {
      publicPath: '/',
      path: outputPath
    },
    modules: {
      rules: {
        /** BUILD */
        stylesBuild: {
          test: /\.(css|sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=styles']
        },
        typescriptBuild: {
          test: /\.tsx?$/,
          use: 'happypack/loader?id=typescript-build',
          exclude: /node_modules/
        },
        /** DEV */
        stylesDev: {
          test: /\.(css|sass|scss)$/,
          use: ["style-loader", 'happypack/loader?id=styles']
        },
        typescriptDev: {
          test: /\.tsx?$/,
          use: 'happypack/loader?id=typescript-dev',
          exclude: /node_modules/
        }
      }
    },
    plugins: [
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      new WebpackBar(),
      new HtmlWebpackPlugin({
        inject: 'body',
        ...htmlOptions
      }),
      new HappyPack({
        id: 'styles',
        threads: 2,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts', '.tsx', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
  };  
}