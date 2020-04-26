<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <div class="container-fluid" id="container-fluid">
      <ul class="list">
        <li v-for="(data, index) in messages" :key="index">
          <UserMessage
            v-if="data.type === 'user'"
            :nick="data.nick"
            :message="data.text"
            :date="data.date"
          />
          <SystemMessage
            v-else
            :message="data.text"
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
const { mapState } = createNamespacedHelpers('chat')

export default {
  name: 'ContentWrapper',
  computed: {
    ...mapState(['messages', 'connected'])
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
  }
}
</script>

<style scoped lang="scss">
  .content-wrapper {
    height: 100%;
    min-height: 100%;
    transform: translate(var(--sidebar-width), 0);
    transition: transform .2s ease-in-out, margin .2s ease-in-out;
    background-image: url('./../../assets/sports.png');

    @media screen and (prefers-color-scheme: dark) {
      background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('./../../assets/sports.png')
    }
  }
  @media only screen and (min-width: 600px) {
    .content-wrapper {
      width: calc(100% - var(--sidebar-width));
    }
  }
  .list {
    list-style: none;
    padding: 0 10px;
  }
  .sidebar-open .content-wrapper {
    transform: translate(var(--sidebar-width), 0);
    z-index: 800;
  }
  @media only screen and (max-width: 600px) {
    .content-wrapper {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
  .container-fluid {
    position: absolute;
    top: var(--main-header-height-mobile);
    bottom: calc(var(--footer-height) + env(safe-area-inset-bottom)); /* +22 (safe-bottom) */
    overflow-y: scroll;
    padding-top: 15px;
  }

  @media only screen and (min-width: 600px) {
    .container-fluid {
      top: var(--main-header-height);
    }
  }
</style>
