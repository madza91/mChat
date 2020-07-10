const path = require('path')

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'mChat',
    themeColor: '#4DBA87',
    msTileColor: '#00a300',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/index.scss";'
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  }
}
