const state = {
  sidebar: false,
  settingsBar: false,
  selectedChat: null
}

const getters = {
  getSidebar (state) {
    return state.sidebar
  },
  getSettingsBar (state) {
    return state.settingsBar
  },
  getSelectedChat (state) {
    return state.selectedChat
  }
}

const actions = {
  sidebarToggle ({ commit }, data) {
    commit('setSidebarState', data)
  },
  settingsToggle ({ commit }, data) {
    commit('setSettingsState', data)
  },
  setSelectedChat ({ commit }, data) {
    console.log('setSelectedChat', data)
    commit('setSelectedChat', data)
  }
}

const mutations = {
  setSidebarState (state) {
    state.sidebar = !state.sidebar
  },
  setSettingsState (state) {
    state.settingsBar = !state.settingsBar
  },
  setSelectedChat (state, data) {
    state.selectedChat = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
