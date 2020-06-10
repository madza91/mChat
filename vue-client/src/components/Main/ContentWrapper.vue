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
            v-if="data.type === 'user'"
            :nick="data.nick"
            :right="data.from === loggedInUser.id"
            :message="data.message"
            :shape="data.shape"
            :date="data.date"
          />
          <SystemMessage
            v-else
            :message="data.message"
            :date="data.date"
          />
        </li>
      </ul>
    </div>
    <MessagingInput :enabled="connected" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MessagingInput from './MessagingInput'
import MainHeader from './MainHeader'
import UserMessage from './Message/UserMessage'
import SystemMessage from './Message/SystemMessage'
const { mapState, mapGetters: mapChatGetters } = createNamespacedHelpers('chat')
const { mapActions: mapUiActions, mapGetters: mapUiGetters } = createNamespacedHelpers('ui')

export default {
  name: 'ContentWrapper',
  computed: {
    ...mapState(['connected', 'loggedInUser']),
    currentMessages () {
      const currentMessages = this.getCurrentMessages()

      // Calculating position of every message for choosing the right shape of balloon
      return currentMessages.map((item, i) => {
        const prevItem = currentMessages[i - 1]
        const nextItem = currentMessages[i + 1]

        if (item.type === 'user') {
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
    }
  },
  components: {
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
    ...mapChatGetters(['getCurrentMessages']),
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
  }
  @include media-breakpoint-up(sm) {
    .content-wrapper {
      width: calc(100% - var(--sidebar-width));
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
