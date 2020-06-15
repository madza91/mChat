import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import './assets/styles/index.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPaperPlane,
  faPaperclip,
  faMicrophone,
  faHashtag,
  faCircle,
  faTimes,
  faRobot
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue2TouchEvents from 'vue2-touch-events'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vue2TouchEvents)

/* FA Icons */
library.add(faPaperPlane)
library.add(faPaperclip)
library.add(faMicrophone)
library.add(faHashtag)
library.add(faCircle)
library.add(faTimes)
library.add(faRobot)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const socket = io(`${process.env.VUE_APP_SOCKET_HOST}:${process.env.VUE_APP_SOCKET_PORT}`, {
  path: process.env.VUE_APP_SOCKET_PATH,
  autoConnect: false
})

Vue.use(VueSocketIOExt, socket, { store })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
