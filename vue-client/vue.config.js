const path = require('path')

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'mChat',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent'
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/styles/index.scss";'
      }
    },
    sourceMap: true
  }
}
