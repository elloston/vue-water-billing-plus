const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack"); // Добавьте эту строку для импорта webpack

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  configureWebpack: {
    // Настройки для Webpack
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(
          process.env.NODE_ENV !== "production"
        ),
      }),
    ],
  },
});
