const state = {
  chosenNick: null,
  prevIds: [],
  sidebar: false,
  settingsBar: false,
  aboutModal: false
}

const getters = {
  getChosenNick (state) {
    return state.chosenNick
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
  insertUserID ({ commit }, data) {
    commit('pushUserID', data)
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
  pushUserID (state, userId) {
    state.prevIds.push(userId)
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
