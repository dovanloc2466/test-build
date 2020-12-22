// @ts-check

const webpack = require("webpack");

const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tsNameof = require("ts-nameof");

const makeDefinitions = require("./utils/makeDefinitions");

module.exports = function getBuildConfig(options) {
  const { htmlOptions } = options;

  const baseConfigOptions = {
    htmlOptions: htmlOptions,
  };

  const baseConfigs = require("./base/baseConfigs")(baseConfigOptions);

  const plugins = [
    new HappyPack({
      id: "typescript-build",
      threads: 2,
      loaders: [
        {
          path: "ts-loader",
          query: { happyPackMode: true }
        },
        {
          path: "ts-nameof-loader",
        },
      ],
    }),
    new CleanWebpackPlugin(),
    ...baseConfigs.plugins,
  ];

  const definitions =
    options.definitions && makeDefinitions(options.definitions);
  if (definitions) {
    plugins.push(new webpack.DefinePlugin(definitions));
  }

  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    })
  );

  plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css",
    })
  );

  if (options.sourceMap) {
    plugins.push(
      new webpack.SourceMapDevToolPlugin({
        filename: "[name].[chunkhash].js.map",
        exclude: [/vendor/, /runtime/],
      })
    );
  }

  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: baseConfigs.staticDirName,
          to: baseConfigs.staticDirName,
        }
      ]
    })
  );

  plugins.push(
    new WorkboxPlugin.GenerateSW({
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|gif|jpg|svg|tff|otf|woff|woff2|eot)$/g,
          handler: "CacheFirst",
          options: {
            cacheName: "runtimeCachingAssets",
            expiration: {
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /\.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "runtimeCaching",
            expiration: {
              maxAgeSeconds: 24 * 60 * 60,
            },
          },
        },
      ],
      exclude: [/runtime\.(.*)\.js$/],
      clientsClaim: true,
      skipWaiting: true,
    })
  );

  return {
    mode: "production",
    stats: {
      colors: true,
      chunks: true,
    },
    entry: {
      app: options.entry || "./src/index",
    },
    output: {
      ...baseConfigs.output,
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
    },
    optimization: {
      moduleIds: "named",
      chunkIds: "named",
      noEmitOnErrors: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          sourceMap: options.sourceMap,
          parallel: true,
        }),
        new OptimizeCssAssetsPlugin({}),
      ],
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "all",
            maxSize: 2440000,
            enforce: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: plugins,
    module: {
      rules: [
        baseConfigs.modules.rules.stylesBuild,
        baseConfigs.modules.rules.typescriptBuild,
      ],
    },
    resolve: {
      ...baseConfigs.resolve,
      alias: options.alias,
    },
  };
};
