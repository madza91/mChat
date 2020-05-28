const state = {
  sidebar: false,
  settingsBar: false
}

const getters = {
  getSidebar (state) {
    return state.sidebar
  },
  getSettingsBar (state) {
    return state.settingsBar
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
