<template>
  <footer class="main-footer">
    <div class="input-group">
      <input
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        v-on:keyup.enter="sendMessage"
        v-model="message"
        :disabled="enabled !== true"
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MessagingInput',
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      message: null
    }
  },
  methods: {
    sendMessage () {
      const data = {
        type: 'message',
        message: this.message,
        name: 'Neki_lik'
      }
      this.$socket.emit('cMessage', data)
      this.message = ''
    }
  }
}
</script>

<style>
  .main-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: var(--footer-height);
    backdrop-filter: blur(10px);
    background-color: rgba(144, 144, 144, 0.3);
    transition: transform .3s ease-in-out, width .3s ease-in-out;
    padding: 10px 15px env(safe-area-inset-bottom);
  }

  input {
    width: 100%;
    border: none;
    padding: 8px 20px;
    font: 16px/22px "Lato", Arial, sans-serif;
    border-radius: 5px;
    resize: none;
  }

  input:focus {
    outline: none;
  }
</style>
