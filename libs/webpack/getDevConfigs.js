// @ts-check

const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const tsImportPluginFactory = require("ts-import-plugin");

const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const makeDefinitions = require("./utils/makeDefinitions");

/**
 * @param {{
 *  entry: string,
 *  port: number;
 *  host: string;
 *  devtool: string;
 *  defines: object;
 *  htmlOptions: object
 * }} options
 */
module.exports = (options) => {
  const { entry, port, host, devtool, defines, htmlOptions, plugins } = options;

  const baseConfigOptions = {
    htmlOptions: htmlOptions,
  };

  const baseConfigs = require("./base/baseConfigs")(baseConfigOptions);

  return {
    mode: "development",
    devtool: devtool || "inline-source-map",
    entry: [
      `webpack-dev-server/client?http://${host}:${port}`,
      "webpack/hot/only-dev-server",
      "react-hot-loader/patch",
      entry,
    ],
    output: {
      publicPath: "/",
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
    },
    optimization: {
      moduleIds: "named",
      chunkIds: "named",
    },
    plugins: [
      new webpack.DefinePlugin(makeDefinitions(defines)),
      new ErrorOverlayPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin(),
      new HappyPack({
        id: "typescript-dev",
        threads: 2,
        loaders: [
          {
            path: "ts-loader",
            query: { happyPackMode: true },
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory.createTransformer(/** options */),
                ],
              }),
            },
          },
          {
            path: "ts-nameof-loader",
          },
        ],
      }),
      ...baseConfigs.plugins,
      ...(plugins || []) 
    ],
    module: {
      rules: [
        baseConfigs.modules.rules.stylesDev,
        baseConfigs.modules.rules.typescriptDev,
      ],
    },
    resolve: {
      ...baseConfigs.resolve,
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
  };
};
