import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import ui from './modules/ui'
import chat from './modules/chat'

const vuexPersist = new VuexPersist({
  key: 'm-chat',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    ui,
    chat
  }
})
