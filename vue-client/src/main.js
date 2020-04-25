import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/variables.css'
import './assets/styles/global.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
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
