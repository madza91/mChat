<template>
  <footer class="main-footer" ref="footerWrapper">
    <b-row v-if="attachment || attachmentProgress || attachmentError" class="pb-2 d-flex flex-nowrap">
      <font-awesome-icon
        icon="times"
        class="icon invisible"
      />
      <div class="preview-wrapper flex-grow-1 ml-2 mr-2">
        <b-img v-if="attachmentPreview" :src="attachmentPreview" class="attachment-preview rounded" :class="{'attachment-transparent': !attachmentUploaded}" alt="Attachment image"></b-img>
        <span v-if="attachmentError">{{ attachmentError }}</span>
        <b-progress v-if="attachmentProgress" :value="attachmentProgress" variant="success" :max="100" animated></b-progress>
      </div>
      <font-awesome-icon
        icon="times"
        class="icon"
        v-touch:start="removeAttachment"
      />
    </b-row>
    <b-row>
      <div class="attachment-wrapper">
          <input
            type="file"
            class="d-none"
            ref="file"
            accept="image/*"
            @change="handleFileUpload"
          />
          <font-awesome-icon
            icon="paperclip"
            class="icon"
            :class="{'disabled': attachment }"
            @click="$refs.file.click()"
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
        autocomplete="off"
      >
      <font-awesome-icon
        icon="paper-plane"
        class="icon"
        :class="{'disabled': !enabled || (!message && !attachmentUploaded) }"
        v-touch:start="sendMessage"
        v-touch:end="(e) => e.preventDefault()"
        :disabled="!enabled"
      />
      <font-awesome-icon
        icon="microphone"
        class="icon"
        :class="{'d-none': !enabled || !settings.voice }"
      />
    </b-row>
  </footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import apiMixin from '../../../mixins/ApiMixin'
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
  mixins: [apiMixin],
  watch: {
    message: function (value) {
      this.selectedChat.data._input = value
    },
    selectedChat: function (value) {
      this.message = value.data._input
    }
  },
  computed: {
    ...mapChatState(['selectedChat'])
  },
  data () {
    return {
      message: null,
      attachment: null,
      attachmentError: null,
      attachmentProgress: null,
      attachmentPreview: null,
      attachmentUploaded: null,
      settings: {
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
      if (this.enabled && (this.message || this.attachment)) {
        this.checkFocus()

        this.$socket.client.emit('message', {
          to: this.selectedChat.id,
          isChannel: this.selectedChat.isChannel,
          message: this.message,
          attachment: this.attachment
        })
        this.message = ''
        this.removeAttachment()
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
      this.attachmentError = null
      this.attachmentProgress = null
      this.attachmentPreview = null
      this.attachmentUploaded = null
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
      background-color: #272729;
      border: 1px solid var(--color-border-dark)
    }

    @include media-breakpoint-down(xs) {
      padding: 0 15px;
      height: $icon-size-mobile;
    }
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

  .preview-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    margin-top: auto;
    margin-bottom: auto;

    span {
      margin: auto 20px;
      font-size: 12px;
    }
  }

  .progress {
    flex-grow: 1;
    margin: auto auto auto 20px;
    max-width: 200px;
  }

  .attachment-preview {
    max-height: 50px;
  }

  .attachment-transparent {
    opacity: 0.6;
  }

  .row {
    padding: 0 10px;
  }
</style>
