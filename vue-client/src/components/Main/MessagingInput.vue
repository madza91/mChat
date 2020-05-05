<template>
  <footer class="main-footer" ref="nicknameInput">
    <b-row>
      <input
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        @keyup.enter="sendMessage"
        v-model="message"
        :disabled="enabled !== true"
        @focus="onFocus"
        @blur="onBlur"
      >
      <font-awesome-icon
        icon="paper-plane"
        class="icon"
        :class="{'disabled': !enabled || !message}"
        v-touch:start="sendMessage"
        v-touch:end="(e) => e.preventDefault()"
      />
    </b-row>
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
  mounted () {
    this.$refs.nicknameInput.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    sendMessage () {
      if (this.enabled && this.message) {
        this.$el.querySelector('#message-to-send').focus()
        const data = {
          type: 'message',
          message: this.message
        }
        this.$socket.emit('cMessage', data)
        this.message = ''
      }
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
  $bottom-padding: 10px;

  .main-footer {
    background-color: var(--color-default);
    transition: transform .2s ease-in-out, width .2s ease-in-out;
    padding: $bottom-padding 15px calc(env(safe-area-inset-bottom) - #{$bottom-padding});
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
    flex-grow: 1;
    padding: 8px 20px;
    font: 16px/22px "Lato", Arial, sans-serif;
    border-radius: 15px;
    border: 1px solid #e3e3e3;
    resize: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-bottom: $bottom-padding;

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      background-color: #272729;
      border: 1px solid var(--color-border-dark)
    }
  }

  input:focus {
    outline: none;
  }

  .icon {
    height: 100%;
    padding: 10px;
    width: 40px;
    cursor: pointer;
  }

  .icon.disabled {
    color: grey;
    cursor: auto;
  }

  .row {
    padding: 0 10px;
  }
</style>
