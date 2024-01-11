module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/todo-vue-app/" : "/",
  devServer: {
    port: 3001
  }
};
