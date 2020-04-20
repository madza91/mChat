<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <div class="container-fluid" id="container-fluid">
      <ul class="list">
        <SystemMessage message="Welcome" />
        <UserMessage
          v-for="(message, index) in messages"
          :key="index"
          :nick="message.nick"
          :message="message.text"
        />
      </ul>
    </div>
    <MessagingInput />
  </div>
</template>

<script>
import MessagingInput from '@/components/Main/MessagingInput'
import MainHeader from '@/components/Main/MainHeader'
import UserMessage from './Message/UserMessage'
import SystemMessage from './Message/SystemMessage'

export default {
  name: 'ContentWrapper',
  data: function () {
    return {
      messages: []
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
  sockets: {
    user: function (data) {
      this.messages.push({
        nick: data.nick,
        text: data.message
      })
    }
  }
}
</script>

<style scoped>
  .content-wrapper {
    height: 100%;
    min-height: 100%;
    transform: translate(var(--sidebar-width), 0);
    transition: transform .3s ease-in-out, margin .3s ease-in-out;
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
