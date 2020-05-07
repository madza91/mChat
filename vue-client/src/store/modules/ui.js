const state = {
  sidebar: false,
  settingsBar: false,
  selectedChat: {
    id: null,
    isChannel: true
  }
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
    commit('setSidebarToggle', data)
  },
  sidebarState ({ commit }, data) {
    commit('setSidebarState', data)
  },
  settingsToggle ({ commit }, data) {
    commit('setSettingsState', data)
  },
  setSelectedChat ({ commit }, data) {
    commit('setSelectedChat', data)
  }
}

const mutations = {
  setSidebarToggle (state) {
    state.sidebar = !state.sidebar
  },
  setSidebarState (state, data) {
    state.sidebar = data
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
