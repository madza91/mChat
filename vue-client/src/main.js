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
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '/' } // Optional options
}))

new Vue({
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
  methods: {
    clickButton: function (data) {
      // $socket is socket.io-client instance
      this.$socket.emit('cMessage', data)
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
