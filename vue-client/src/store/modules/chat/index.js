import { chatMutations } from './mutations/chatMutations'
import { channelMutations } from './mutations/channelMutations'
import { userMutations } from './mutations/userMutations'
import { chatActions } from './actions/chatActions'
import { socketActions } from './actions/socketActions'
import { channelActions } from './actions/channelActions'
import { userActions } from './actions/userActions'
import { commandActions } from './actions/commandActions'
import { getters } from './getters/getters'

const state = {
  nick: '',
  socketId: null,
  connected: null,
  authenticated: false,
  channels: [],
  users: [],
  selectedChat: {
    id: 'general',
    name: '#general',
    isChannel: true
  }
}

export default {
  state,
  getters,
  actions: {
    ...chatActions,
    ...socketActions,
    ...channelActions,
    ...userActions,
    ...commandActions
  },
  mutations: {
    ...chatMutations,
    ...channelMutations,
    ...userMutations
  },
  namespaced: true
}
