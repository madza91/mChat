<template>
  <footer class="main-footer" ref="nicknameInput">
    <div class="input-group">
      <input
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        v-on:keyup.enter="sendMessage"
        v-model="message"
        :disabled="enabled !== true"
        @focus="onFocus"
        @blur="onBlur"
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
        time: Date.now()
      }
      this.$socket.emit('cMessage', data)
      this.message = ''
    },
    onFocus () {
      this.$refs.nicknameInput.classList.add('focused')
    },
    onBlur () {
      this.$refs.nicknameInput.classList.remove('focused')
    }
  }
}
</script>

<style scoped lang="scss">
  .main-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: var(--footer-height);
    background-color: var(--color-default);
    transition: transform .2s ease-in-out, width .2s ease-in-out;
    padding: 10px 15px env(safe-area-inset-bottom);
    border-top: 1px solid var(--color-border);

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      border-top: 1px solid var(--color-border-dark);
      background-color: var(--color-default-dark)
    }
  }

  .main-footer.focused {
    padding: 10px 15px 0;
  }

  input {
    width: 100%;
    padding: 8px 20px;
    font: 16px/22px "Lato", Arial, sans-serif;
    border-radius: 15px;
    border: 1px solid #e3e3e3;
    resize: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      background-color: #272729;
      border: 1px solid var(--color-border-dark)
    }
  }

  input:focus {
    outline: none;

  }
</style>
