<template>
  <div :class="[right ? 'right-message' : 'left-message']">
    <div class="message" :class="formattedShape">
      <div class="message-data-top" :class="{'d-none': !shape.isFirst}">
        <span class="message-data-name">{{ nick }}</span>
        <span class="message-data-time">{{ formattedTime }}</span>
      </div>
      <div
        v-if="attachment"
        class="message-data-image"
        :style="imageStyle"
      >
        <img
          v-if="attachment && !attachmentError"
          :src="attachment.thumbnail.url"
          class="animation-fadein"
          @error="attachmentError = true"
          @click="imageToggle(attachment.image.url)"
          alt="attachment"
        />
        <div v-if="attachmentError" class="attachment-error">
          <b-icon icon="card-image"></b-icon>
          <span>Broken image</span>
        </div>
      </div>
      <div v-if="message">
        <span v-if="!enableHtml" class="message-data-text">{{ message }}</span>
        <span v-else class="message-data-text" v-html="message"></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapUiActions } = createNamespacedHelpers('ui')

export default {
  name: 'UserMessage',
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
      attachmentError: false
    }
  },
  methods: {
    ...mapUiActions(['imageToggle'])
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

.message {
  display: table;
  color: white;
  padding: 3px;
  line-height: 26px;
  font-size: 14px;
  margin-bottom: 5px;
  min-width: 100px;
  max-width: 50%;

  @include media-breakpoint-down(xs) {
    max-width: 90%;
  }
}
.message-data-top {
  display: flex;
  justify-content: space-between;
  color: #ccc;
  font-size: 10px;
  line-height: 16px;
  padding: 0 5px;
}
.message-data-image {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 10px;
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
.message-data-name {
  padding-bottom: 5px;
}
.message-data-time {
  padding-left: 20px;
}
.message-data-text {
  padding: 0 5px;
}
.left-message .message {
  background: #86BB71;
}
.right-message {
  display: flex;
  justify-content: flex-end;
}
.right-message .message {
  background: #94C2ED;
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
