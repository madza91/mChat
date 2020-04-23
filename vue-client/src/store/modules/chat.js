const state = {
  nick: null,
  connected: null,
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
  SOCKET_connect ({ commit }, data) {
    commit('setConnected', true)
  },
  SOCKET_disconnect ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_error ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_connect_error ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_connect_timeout ({ commit }, data) {
    commit('setConnected', false)
  },
  SOCKET_user ({ commit }, data) {
    commit('insertMessage', {
      type: 'user',
      nick: data.nick,
      text: data.message,
      date: data.date
    })
  },
  SOCKET_users_list ({ commit }, data) {
    commit('setUsers', data.users)
  },
  SOCKET_join ({ commit }, data) {
    commit('insertUser', data)
  },
  SOCKET_leave ({ commit }, data) {
    commit('removeUser', data.nick)
  }
}

const mutations = {
  setNick (state, data) {
    state.nick = data
  },
  setConnected (state, data) {
    state.connected = data
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
