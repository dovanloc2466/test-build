module.exports = {
  entry: "./index",
  definitions: {
    JTW_COOKIE_KEY: '_dev_tk',
    SUB_ENV: "production",
    API_URL: "https://api-dev.easysalon.vn",
  },
  sourceMap: true,
  htmlOptions: {
    template: "./src/index.html",
  },
};
