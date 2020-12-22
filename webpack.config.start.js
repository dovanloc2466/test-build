// @ts-check
const defaultHost = '0.0.0.0';
const defaultPort = 3000;

module.exports = {
  entry: './index',
  host: defaultHost,
  port: defaultPort,
  devTool: 'eval-source-map',
  defines: {
    API_URL: 'https://api.easysalon.vn',
    JTW_COOKIE_KEY: '_dev_tk',
    SUB_ENV: 'dev'
  },
  htmlOptions: {
    template: './src/index.html'
  }
};