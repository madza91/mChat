import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import './assets/styles/index.scss'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const isProduction = process.env.NODE_ENV === 'production'
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: !isProduction,
  connection: `${process.env.VUE_APP_SOCKET_HOST}:${process.env.VUE_APP_SOCKET_PORT}`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  },
  options: {
    path: process.env.VUE_APP_SOCKET_PATH
  } // Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
