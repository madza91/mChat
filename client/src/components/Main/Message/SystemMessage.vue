<template>
  <div class="message-wrapper">
    <div class="message-info">
      <span class="message-name" v-html="message"></span>
      <span v-if="showTime" class="message-time">{{ formattedTime }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SystemMessage',
  computed: {
    formattedTime () {
      return moment(this.date).format('H:mm')
    }
  },
  props: {
    message: {
      type: String,
      required: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    date: {
      type: Number,
      required: false
    }
  }
}
</script>

<style scoped>
  .message-wrapper {
    text-align: center;
    margin: 4px 0 9px;
    font-size: 12px;
  }

  .message-info {
    display: inline-block;
    background-color: #fdf2c0;
    padding: 3px 25px;
    border-radius: 5px;
    box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.2);
  }

  .message-info a {
    color: black;
    border-radius: 5px;
    background-color: #cfd0c9;
    padding: 1px 5px;
  }

  .message-time {
    color: #a8aab1;
    padding-left: 6px;
    font-size: 10px;
  }
</style>
