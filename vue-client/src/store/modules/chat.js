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
      date: new Date(data.date)
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
  },
  SOCKET_command ({ commit }, data) {
    commit('renameUser', data)
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
  renameUser (state, data) {
    const user = state.users.find(user => user.socket === data.socket)
    user.nick = data.newNick

    state.users = state.users.map(currentUser => {
      return [user].find(o => o.socket === currentUser.socket) || currentUser
    })
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
