// @ts-check

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const checkPortTaken = require('./checkPortTaken')

/**
 * @param {object} config
 * @param {string} host
 * @param {number} port
 */
function run(config, host, port) {
  // @ts-ignore
  const compiler = webpack(config);
  /** @type {WebpackDevServer.Configuration} */
  const devServerConfig = {
    host: host,
    port: port,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    hot: true,
    liveReload: false,
    disableHostCheck: true,
    stats: {
      colors: true,
      hash: false, 
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false,
      entrypoints: false
    },
    overlay: true
  }

  const devServer = new WebpackDevServer(compiler, devServerConfig);

  /**
   * @param {Error} err
   */
  function onload(err) {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at http://${host}:${port}/`);

    if(process.env.NODE_ENV === 'TEST') {
      process.exit();
    }
  }

  devServer.listen(port, host, onload);
}

/**
 * @param {object} config
 * @param {number} port
 */
function runDev(config, host, port) {
  const useHost = host || config.host;
  const usePort = port || config.port;

  checkPortTaken(
    port,
    (isTaken) => {
      if (isTaken) {
        console.warn(`Port ${port} ready taken!`);
        return void runDev(config, useHost, usePort + 1);
      }

      run(config, useHost, usePort);
    }
  );
}

module.exports = runDev;
