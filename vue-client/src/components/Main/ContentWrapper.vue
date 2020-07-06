<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <div
      class="container-fluid"
      id="container-fluid"
      ref="container"
      v-touch:tap="touchHandler"
    >
      <ul class="messages">
        <li v-for="data in currentMessages" :key="data.messageId">
          <UserMessage
            v-if="isUserMessage(data.type) || isBotMessage(data.type)"
            :nick="data.nick"
            :right="isMyMessage(data.from)"
            :message="data.message"
            :attachment="data.attachment"
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
      <ScrollDownButton
        v-if="displayDownButton"
        @click="handleScrollButton"
      />
    </div>
    <MessagingInput :enabled="connected && !isCurrentUserOffline" />
  </div>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import MessagingInput from './Footer/MessagingInput'
import MainHeader from './Header/MainHeader'
import UserMessage from './Message/UserMessage'
import SystemMessage from './Message/SystemMessage'
import ButtonMessage from './Message/ButtonMessage'
import ScrollingMixin from '../../mixins/ScrollingMixin'
import ScrollDownButton from './ScrollDownButton'
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

        // Scroll to the bottom only if user is not scrolling or he received somebodies message
        if (!nextItem) {
          this.isScrollNeeded = this.isDown() || this.isMyMessage(item.from)
        }

        if (['bot', 'user'].includes(item.type)) {
          return {
            ...item,
            shape: {
              isFirst: !prevItem || item.from !== prevItem.from || !moment(prevItem.date).isSame(item.date, 'minute'),
              isLast: !nextItem || item.from !== nextItem.from || !moment(item.date).isSame(nextItem.date, 'minute')
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
  data () {
    return {
      displayDownButton: false,
      isScrollNeeded: false
    }
  },
  mixins: [ScrollingMixin],
  components: {
    ScrollDownButton,
    ButtonMessage,
    UserMessage,
    SystemMessage,
    MessagingInput,
    MainHeader
  },
  mounted () {
    this.$refs.container.addEventListener('scroll', () => {
      this.displayDownButton = !this.isDown()
    })
  },
  updated () {
    if (this.isScrollNeeded) {
      this.scrollMessagesDown()
      this.isScrollNeeded = false
    }
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
    },
    handleScrollButton () {
      this.scrollMessagesDown()
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
    min-width: 320px;
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
  .messages {
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
