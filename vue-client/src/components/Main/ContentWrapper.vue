<template>
  <div class="content-wrapper" id="content-wrapper">
    <MainHeader />
    <div class="container-fluid">
      <ul class="list">
        <SystemMessage message="Welcome" />
        <UserMessage
          v-for="message in messages"
          :key="message.nick"
          :nick="message.nick"
          :message="message.text"
        />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
        <UserMessage nick="Nickola" message="Test poruka" />
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
      width: calc(100% - 230px);
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
    height: 100%;
    padding-top: 80px;
    padding-bottom: 62px;
    overflow: scroll;
  }
</style>
