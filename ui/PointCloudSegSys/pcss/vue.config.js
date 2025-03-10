const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7070, //端口号
    proxy: { //配置代理
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
