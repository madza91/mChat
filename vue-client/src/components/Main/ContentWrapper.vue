<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <div
      class="container-fluid"
      id="container-fluid"
      v-touch:tap="touchHandler"
    >
      <ul class="list">
        <li v-for="(data, index) in currentMessages" :key="index">
          <UserMessage
            v-if="isUserMessage(data.type) || isBotMessage(data.type)"
            :nick="data.nick"
            :right="isMyMessage(data.from)"
            :message="data.message"
            :shape="data.shape"
            :enable-html="isBotMessage(data.type)"
            :date="data.date"
          />
          <SystemMessage
            v-else
            :message="data.message"
            :date="data.date"
          />
        </li>
        <li v-if="isCurrentUserOffline">
          <ButtonMessage
            message="This user is offline, click to close window"
            @click="closeWindow"
          />
        </li>
      </ul>
    </div>
    <MessagingInput :enabled="connected && !isCurrentUserOffline" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MessagingInput from './Footer/MessagingInput'
import MainHeader from './Header/MainHeader'
import UserMessage from './Message/UserMessage'
import SystemMessage from './Message/SystemMessage'
import ButtonMessage from './Message/ButtonMessage'
const { mapActions: mapChatActions, mapState: mapChatState, mapGetters: mapChatGetters } = createNamespacedHelpers('chat')
const { mapActions: mapUiActions, mapGetters: mapUiGetters, mapState: mapUiState } = createNamespacedHelpers('ui')

export default {
  name: 'ContentWrapper',
  computed: {
    ...mapChatState(['connected', 'loggedInUser', 'selectedChat']),
    ...mapUiState(['server']),
    currentMessages () {
      const currentMessages = this.getCurrentMessages()

      // Calculating position of every message for choosing the right shape of balloon
      return currentMessages.map((item, i) => {
        const prevItem = currentMessages[i - 1]
        const nextItem = currentMessages[i + 1]

        if (['bot', 'user'].includes(item.type)) {
          return {
            ...item,
            shape: {
              isFirst: !prevItem || item.from !== prevItem.from,
              isLast: !nextItem || item.from !== nextItem.from
            }
          }
        }

        return item
      })
    },
    isCurrentUserOffline () {
      return this.selectedChat.data && this.selectedChat.data._status === 'offline'
    }
  },
  components: {
    ButtonMessage,
    UserMessage,
    SystemMessage,
    MessagingInput,
    MainHeader
  },
  updated () {
    const container = this.$el.querySelector('#container-fluid')
    container.scrollTop = container.scrollHeight
  },
  methods: {
    ...mapUiActions(['sidebarToggle', 'sidebarState']),
    ...mapUiGetters(['getSidebar']),
    ...mapChatActions(['userRemove']),
    ...mapChatGetters(['getCurrentMessages']),
    isMyMessage (fromUserId) {
      return this.server.prevIds.includes(fromUserId)
    },
    isBotMessage (messageType) {
      return messageType === 'bot'
    },
    isUserMessage (messageType) {
      return messageType === 'user'
    },
    swipeHandler (direction) {
      const sideBar = this.getSidebar()
      if (
        (direction === 'right' && !sideBar) ||
        (direction === 'left' && sideBar)
      ) {
        this.sidebarToggle()
      }
    },
    touchHandler () {
      if (this.getSidebar()) {
        this.sidebarState(false)
      }
    },
    closeWindow () {
      this.userRemove(this.selectedChat.data._id)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/styles';

  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    transform: translate(var(--sidebar-width), 0);
    transition: transform .2s ease-in-out, margin .2s ease-in-out;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      transform: translate(250px, 0);
    }
  }
  @include media-breakpoint-up(sm) {
    .content-wrapper {
      width: calc(100% - var(--sidebar-width));

      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        width: calc(100% - 250px);
      }
    }
  }
  .list {
    list-style: none;
    padding-bottom: 10px;
    margin: auto;
    max-width: 900px;
  }
  .sidebar-open .content-wrapper {
    transform: translate(var(--sidebar-width), 0);
    z-index: 800;
  }
  @include media-breakpoint-down(xs) {
    .content-wrapper {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
  .container-fluid {
    flex-grow: 1;
    overflow-y: scroll;
    padding-top: 15px;
    background-image: url('../../assets/images/sports.png');

    @media screen and (prefers-color-scheme: dark) {
      background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../../assets/images/sports.png')
    }
  }
</style>
