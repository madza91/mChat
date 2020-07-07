<template>
  <footer class="main-footer" ref="footerWrapper">
    <AttachmentPreview
      v-if="attachmentPreview"
      :image-preview="attachmentPreview"
      :upload-progress="attachmentProgress"
      :uploaded="attachmentUploaded"
      :error="attachmentError"
      @close="resetAttachment"
    />
    <GifPreview
      v-if="gifs.length > 0"
      :data="gifs"
      @close="resetGifs"
      @send="sendGif"
    />
    <b-row ref="footerInputWrapper">
      <div class="attachment-wrapper">
        <input
          type="file"
          class="d-none"
          ref="file"
          accept="image/*"
          @change="handleFileUpload"
        />
        <FooterIcon
          icon="paperclip"
          @click="$refs.file.click()"
        />
      </div>
      <input
        id="message-to-send"
        class="ml-2 mr-2"
        placeholder="Type your message"
        ref="footerInput"
        @keyup.enter="sendMessage"
        @keyup.esc="resetAllHints"
        v-model="message"
        @focus="onFocus"
        @blur="onBlur"
        v-debounce="getHints"
        type="text"
        autocomplete="off"
      >
      <FooterIcon
        icon="paper-plane"
        :disabled="isSendUnavailable"
        v-touch:start="sendMessage"
        v-touch:end="(e) => e.preventDefault()"
      />
    </b-row>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import apiMixin from '../../../mixins/ApiMixin'
import detectMobileMixin from '../../../mixins/DetectMobileMixin'
import AttachmentPreview from './components/AttachmentPreview'
import GifPreview from './components/GifPreview'
import FooterIcon from './components/FooterIcon'
import ScrollingMixin from '../../../mixins/ScrollingMixin'
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
  mixins: [apiMixin, detectMobileMixin, ScrollingMixin],
  watch: {
    message: function (value) {
      this.selectedChat.data._input = value
    },
    selectedChat: function (value) {
      this.message = value.data._input
    }
  },
  computed: {
    ...mapChatState(['selectedChat']),
    isSendUnavailable () {
      return !this.enabled || this.gifs.length > 0 || (!this.message && !this.attachment)
    }
  },
  data () {
    return {
      message: null,
      gifs: [],
      attachment: null,
      attachmentError: null,
      attachmentProgress: null,
      attachmentPreview: null,
      attachmentUploaded: null
    }
  },
  components: {
    FooterIcon,
    AttachmentPreview,
    GifPreview
  },
  mounted () {
    this.$refs.footerInputWrapper.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    ...mapUiActions(['sidebarState']),
    sendMessage () {
      if (!this.isSendUnavailable) {
        this.checkFocus()

        this.$socket.client.emit('message', {
          to: this.selectedChat.id,
          isChannel: this.selectedChat.isChannel,
          message: this.message,
          attachment: this.attachment
        })
        this.message = ''
        this.resetAttachment()
      }
    },
    handleFileUpload () {
      const files = this.$refs.file.files

      if (files.length === 1) {
        const file = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          this.attachmentPreview = e.target.result
          this.resetGifs()

          if (!this.isMobile()) {
            this.$refs.footerInput.focus()
          }
        }

        const onUploadProgress = progressEvent => {
          this.attachmentProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }

        this.uploadImage(file, onUploadProgress).then(response => {
          this.attachment = response.data
          this.attachmentUploaded = true
          this.attachmentProgress = null
        }).catch(() => {
          this.attachmentProgress = null
          this.attachmentUploaded = null
          this.attachmentError = 'This image can not be uploaded, please try with another one.'
        })
      }
    },
    sendGif (value) {
      this.attachment = value
      this.message = ''
      this.resetGifs()
      this.sendMessage()

      if (!this.isMobile()) {
        this.$refs.footerInput.focus()
      }
    },
    getHints (value) {
      const isCommand = value.charAt(0) === '/'

      if (isCommand) {
        const command = value.substr(1).split(' ')[0]
        const params = value.substr(2).substr(command.length)

        switch (command) {
          case 'giphy':
            this.resetAttachment()
            this.giphySearch(params).then(results => {
              this.gifs = results.data.data
            })
        }
      }

      if (value === '') {
        this.resetGifs()
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
      this.scrollMessagesDown()
    },
    resetAttachment () {
      this.attachment = null
      this.attachmentError = null
      this.attachmentProgress = null
      this.attachmentPreview = null
      this.attachmentUploaded = null
      this.$refs.file.value = ''
    },
    resetGifs () {
      if (this.gifs.length > 0) {
        this.gifs = []
        this.message = ''
      }
    },
    resetAllHints () {
      this.resetAttachment()
      this.resetGifs()
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../../assets/styles';
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

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      background-color: #F4F4F4;
    }
  }

  .main-footer.focused {
    @include media-breakpoint-down(xs) {
      margin-bottom: $padding;
    }
  }

  #message-to-send {
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
      background-color: var(--color-sidebar-background-dark);
      border: 1px solid var(--color-border-dark);
    }

    @include media-breakpoint-down(xs) {
      padding: 0 15px;
      height: $icon-size-mobile;
    }
  }

  .row {
    padding: 0 10px;
  }
</style>
