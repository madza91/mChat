<template>
  <footer class="main-footer" ref="footerWrapper">
    <b-row v-if="attachment" class="pb-2">
      <font-awesome-icon
        icon="times"
        class="icon invisible"
      />
      <div class="flex-grow-1 ml-2 mr-2">
        <b-img :src="attachmentPreview" rounded class="attachment-preview" alt="Attachment image"></b-img>
      </div>
      <font-awesome-icon
        icon="times"
        class="icon"
        v-touch:start="removeAttachment"
      />
    </b-row>
    <b-row>
      <div class="attachment-wrapper">
        <input type="file" class="attachment-file" ref="file" accept="image/*" v-on:change="handleFileUpload()" />
        <font-awesome-icon
          icon="paperclip"
          class="icon"
          :class="{'disabled': !enabled || attachment || !settings.attachments }"
        />
      </div>
      <input
        name="message-to-send"
        id="message-to-send"
        class="ml-2 mr-2"
        placeholder="Type your message"
        ref="footerInput"
        @keyup.enter="sendMessage"
        v-model="message"
        @focus="onFocus"
        @blur="onBlur"
      >
      <font-awesome-icon
        v-if="message || attachment"
        icon="paper-plane"
        class="icon"
        :class="{'disabled': !enabled }"
        v-touch:start="sendMessage"
        v-touch:end="(e) => e.preventDefault()"
      />
      <font-awesome-icon
        v-else
        icon="microphone"
        class="icon"
        :class="{'disabled': !enabled || !settings.voice }"
      />
    </b-row>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUiActions } = createNamespacedHelpers('ui')
const { mapState: mapChatState } = createNamespacedHelpers('chat')

export default {
  name: 'MessagingInput',
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapChatState(['selectedChat'])
  },
  data () {
    return {
      message: null,
      attachment: null,
      attachmentPreview: null,
      settings: {
        attachments: false, // Disabled feature
        voice: false // Disabled feature
      }
    }
  },
  mounted () {
    this.$refs.footerWrapper.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    ...mapUiActions(['sidebarState']),
    sendMessage () {
      if (this.message || this.attachment) {
        this.checkFocus()

        this.$socket.emit('message', {
          to: this.selectedChat.id,
          isChannel: this.selectedChat.isChannel,
          message: this.message,
          attachment: this.attachment
        })
        this.message = ''
        this.attachment = null
        this.attachmentPreview = null
      }
    },
    handleFileUpload () {
      const files = this.$refs.file.files

      if (files.length === 1) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
          this.attachmentPreview = e.target.result
          this.attachment = files[0]
        }
      }
    },
    checkFocus () {
      if (this.$refs.footerWrapper.classList.contains('focused')) {
        this.$refs.footerInput.focus()
      }
    },
    onFocus () {
      this.sidebarState(false)
      this.$refs.footerWrapper.classList.add('focused')
    },
    onBlur () {
      this.$refs.footerWrapper.classList.remove('focused')
      const container = document.getElementById('container-fluid')
      container.scrollTop = container.scrollHeight
    },
    removeAttachment () {
      this.attachment = null
      this.attachmentPreview = null
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
    padding: $padding 15px;
    border-top: 1px solid var(--color-border);

    @media screen and (prefers-color-scheme: dark) {
      color: white;
      border-top: 1px solid var(--color-border-dark);
      background-color: var(--color-default-dark)
    }

    @include media-breakpoint-down(xs) {
      padding-bottom: 0;
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
    margin: auto;
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

  .attachment-wrapper {
    position: relative;
    cursor: pointer;
  }

  .attachment-file {
    position: absolute;
    overflow: hidden;
    opacity: 0;
    top: 0;
    bottom: 0;
    width: 10px;
    cursor: inherit;
    display: block;
  }

  .attachment-preview {
    max-height: 50px;
  }

  .row {
    padding: 0 10px;
  }
</style>
