<template>
  <div :class="[right ? 'right-message' : 'left-message']">
    <div class="message" :class="formattedShape">
      <div class="message-data-top" :class="{'d-none': !shape.isFirst}">
        <span class="message-data-name">{{ nick }}</span>
        <span class="message-data-time">{{ formattedTime }}</span>
      </div>
      <span v-if="!enableHtml" class="message-data-text">{{ message }}</span>
      <span v-else class="message-data-text" v-html="message"></span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

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
  display: inline-block;
  color: white;
  padding: 3px 10px;
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
}
.message-data-time {
  padding-left: 20px;
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
