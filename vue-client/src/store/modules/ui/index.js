const state = {
  chosenNick: null,
  sidebar: false,
  settingsBar: false,
  aboutModal: false,
  server: {
    build: null,
    prevIds: []
  }
}

const getters = {
  getChosenNick (state) {
    return state.chosenNick || ''
  },
  getSidebar (state) {
    return state.sidebar
  },
  getSettingsBar (state) {
    return state.settingsBar
  }
}

const actions = {
  setChosenNick ({ commit }, data) {
    commit('setChosenNick', data)
  },
  insertHistoryUserID ({ state, commit }, data) {
    if (state.server.build !== data.server.build) {
      commit('setServerBuildNumber', data.server.build)
      commit('clearHistoryUserID')
    }
    commit('pushHistoryUserID', data.user.id)
  },
  sidebarToggle ({ commit }, data) {
    commit('setSidebarToggle', data)
  },
  sidebarState ({ commit }, data) {
    commit('setSidebarState', data)
  },
  settingsToggle ({ commit }, data) {
    commit('setSettingsState', data)
  },
  aboutToggle ({ commit }, data) {
    commit('setAboutModalState', data)
  }
}

const mutations = {
  setChosenNick (state, nick) {
    state.chosenNick = nick
  },
  setServerBuildNumber (state, version) {
    state.server.build = version
  },
  pushHistoryUserID (state, userId) {
    state.server.prevIds.push(userId)
  },
  clearHistoryUserID (state) {
    state.server.prevIds = []
  },
  setSidebarToggle (state) {
    state.sidebar = !state.sidebar
  },
  setSidebarState (state, data) {
    state.sidebar = data
  },
  setSettingsState (state) {
    state.settingsBar = !state.settingsBar
  },
  setAboutModalState (state) {
    state.aboutModal = !state.aboutModal
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
