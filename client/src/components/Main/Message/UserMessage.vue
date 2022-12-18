<template>
  <div :class="[right ? 'right-message' : 'left-message']">
    <div class="message-content" :class="formattedShape">
      <div class="message-top" :class="{'d-none': !shape.isFirst}">
        <span class="message-name">{{ nick }}</span>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
      <div
        v-if="attachment"
        class="message-attachment"
        :style="imageStyle"
      >
        <img
          v-if="attachment && !attachmentError"
          :src="attachment.thumbnail.url"
          class="animation-fadein"
          :class="{'cursor-pointer': attachment.image}"
          @error="attachmentError = true"
          @click="openImage(attachment)"
          alt="attachment"
        />
        <div v-if="attachmentError" class="attachment-error">
          <b-icon icon="card-image"></b-icon>
          <span>Broken image</span>
        </div>
      </div>
      <div v-if="message" :class="{'text-center': centeredText}">
        <span class="message-text" v-html="emojiMessage"></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import EmojiMixin from '../../../mixins/EmojiMixin'
const { mapActions: mapUiActions } = createNamespacedHelpers('ui')

export default {
  name: 'UserMessage',
  mixins: [EmojiMixin],
  mounted () {
    const emojifiedMessage = this.emojifyMessage(this.message)
    this.emojiMessage = emojifiedMessage.message
    this.centeredText = emojifiedMessage.onlyEmoji
  },
  computed: {
    formattedTime () {
      return moment(this.date).format('H:mm')
    },
    formattedShape () {
      const prefix = this.right ? 'right' : 'left'
      const shape = !this.shape.isLast ? 'first' : 'last'

      return `${prefix}-message-shape-${shape}`
    },
    imageStyle () {
      return this.attachment
        ? `height: ${this.attachment.thumbnail.dimensions.h}px; width: ${this.attachment.thumbnail.dimensions.w}px`
        : ''
    }
  },
  data () {
    return {
      emojiMessage: '',
      centeredText: false,
      attachmentError: false
    }
  },
  methods: {
    ...mapUiActions(['imageToggle']),
    openImage (attachment) {
      if (attachment.image) {
        this.imageToggle(attachment.image.url)
      }
    },
    setCentered (value) {
      this.centeredText = value
    }
  },
  props: {
    nick: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    attachment: {
      type: Object
    },
    right: {
      type: Boolean,
      default: false
    },
    shape: {
      type: Object,
      required: true
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    date: {
      type: Number,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles';
.message-content {
  display: table;
  color: var(--color-default-dark);
  padding: 2px;
  line-height: 26px;
  font-size: 14px;
  margin-bottom: 5px;
  min-width: 100px;
  max-width: 50%;
  -webkit-box-shadow: 5px 5px 6px -5px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 6px -5px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 6px -5px rgba(0, 0, 0, 0.3);

  @media screen and (prefers-color-scheme: dark) {
    color: var(--color-default);
  }

  @include media-breakpoint-down(xs) {
    max-width: 90%;
  }

  .message-top {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    line-height: 16px;
    padding: 0 5px;
    opacity: .6;

    .message-name {
      padding-bottom: 5px;
    }

    .message-time {
      padding-left: 20px;
    }
  }

  .message-attachment {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 10px;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .attachment-error {
      display: flex;
      flex-direction: column;
      align-items: center;

      .b-icon {
        font-size: 22px;
      }
    }
  }

  .message-text {
    padding: 0 5px;
    word-break: break-word;
  }
}

.left-message {
  .message-content {
    background: var(--color-message-left);

    @media screen and (prefers-color-scheme: dark) {
      background: var(--color-message-left-dark);
    }
  }
}

.right-message {
  display: flex;
  justify-content: flex-end;

  .message-content {
    background: var(--color-message-right);

    @media screen and (prefers-color-scheme: dark) {
      background: var(--color-message-right-dark);
    }
  }
}

.left-message-shape-full, .left-message-shape-last {
  border-radius: 0 10px 10px;
}

.left-message-shape-first, .left-message-shape-mid {
  border-radius: 0 10px 10px 0;
  margin-bottom: 2px;
}

.right-message-shape-full, .right-message-shape-last {
  border-radius: 10px 0 10px 10px;
}

.right-message-shape-first, .right-message-shape-mid {
  border-radius: 10px 0 0 10px;
  margin-bottom: 2px;
}
</style>
