const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以 '/api'开头的请求路径
        target: "http://ws.webxml.com.cn/", // 代理目标的基础路径
        pathRewrite: { "^/api": "" }, //正则匹配所有以api1开头的路径，把api1替换为''空

        // changeOrigin设置为true时，服务器收到的请求头中的host为要代理的host：localhost:3000
        //changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
        changeOrigin: true, //默认值为true,可省略不写
        ws: true, //用于支持websocket 默认值为true,可省略不写
      },
    },
  },
});
