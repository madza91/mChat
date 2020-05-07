import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import './assets/styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue2TouchEvents from 'vue2-touch-events'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vue2TouchEvents)

/* FA Icons */
library.add(faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

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
    path: process.env.VUE_APP_SOCKET_PATH,
    autoConnect: false
  } // Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
