const state = {
  nick: null,
  messages: [],
  users: []
}

const getters = {
  getUserNick (state) {
    return state.nick
  },
  getMessagesByRoom: (state) => (roomName) => {
    return state.messages
  },
  getUsers (state) {
    return state.users
  }
}

const actions = {
  setUserNick ({ commit }, data) {
    commit('setNick', data)
  },
  insertMessage ({ commit }, data) {
    commit('insertMessage', data)
  },
  resetMessages ({ commit }, data) {
    commit('resetMessages', data)
  },
  addUser ({ commit }, data) {
    commit('insertUser', data)
  },
  removeUser ({ commit }, data) {
    commit('removeUser', data)
  },
  setUsers ({ commit }, data) {
    commit('setUsers', data)
  },
  resetUsers ({ commit }, data) {
    commit('resetUsers', data)
  }
}

const mutations = {
  setNick (state, data) {
    state.nick = data
  },
  insertMessage (state, data) {
    state.messages.push(data)
  },
  resetMessages (state, data) {
    state.messages = []
  },
  insertUser (state, data) {
    state.users.push(data)
  },
  removeUser (state, data) {
    state.users = state.users.filter(user => user.nick !== data)
  },
  setUsers (state, data) {
    state.users = data
  },
  resetUsers (state) {
    state.users = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
