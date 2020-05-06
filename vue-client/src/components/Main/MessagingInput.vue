<template>
  <footer class="main-footer" ref="nicknameInput">
    <b-row>
      <input
        name="message-to-send"
        id="message-to-send"
        class="mr-2"
        placeholder="Type your message"
        @keyup.enter="sendMessage"
        v-model="message"
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
      const container = document.getElementById('container-fluid')
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/styles';
  $padding: 10px;
  $icon-size: 40px;
  $icon-size-mobile: 28px;

  .main-footer {
    background-color: var(--color-default);
    padding: $padding 15px 0;
    border-top: 1px solid var(--color-border);

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      border-top: 1px solid var(--color-border-dark);
      background-color: var(--color-default-dark)
    }

    @include media-breakpoint-down(xs) {
      margin-bottom: max(env(safe-area-inset-bottom), #{$padding});
    }
  }

  .main-footer.focused {
    @include media-breakpoint-down(xs) {
      margin-bottom: $padding;
    }
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

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      background-color: #272729;
      border: 1px solid var(--color-border-dark)
    }

    @include media-breakpoint-down(xs) {
      padding: 0 15px;
      height: $icon-size-mobile;
    }
  }

  input:focus {
    outline: none;
  }

  .icon {
    width: $icon-size;
    height: $icon-size;
    padding: 8px;
    cursor: pointer;

    @include media-breakpoint-down(xs) {
      width: $icon-size-mobile;
      height: $icon-size-mobile;
      padding: 4px;
    }
  }

  .icon.disabled {
    color: grey;
    cursor: auto;
  }

  .row {
    padding: 0 10px;
  }
</style>
