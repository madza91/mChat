<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <ConnectionStatus v-show="connected === false" />
    <div class="container-fluid" id="container-fluid">
      <ul class="list">
        <SystemMessage message="Welcome" />
        <UserMessage
          v-for="(message, index) in messages"
          :key="index"
          :nick="message.nick"
          :message="message.text"
          :date="message.date"
        />
      </ul>
    </div>
    <MessagingInput :enabled="connected" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MessagingInput from './MessagingInput'
import MainHeader from './MainHeader'
import ConnectionStatus from './ConnectionStatus'
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
    MainHeader,
    ConnectionStatus
  },
  updated () {
    const container = this.$el.querySelector('#container-fluid')
    container.scrollTop = container.scrollHeight
  }
}
</script>

<style scoped>
  .content-wrapper {
    height: 100%;
    min-height: 100%;
    transform: translate(var(--sidebar-width), 0);
    transition: transform .3s ease-in-out, margin .3s ease-in-out;
    background-image: url('./../../assets/sports.webp');
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
    top: 0;
    bottom: var(--footer-height);
    overflow-y: scroll;
    padding-top: 80px;
  }
</style>
