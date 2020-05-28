<template>
  <div class="message-data text-center">
    <div class="message-info">
      <span class="message-data-name" v-html="message"></span>
      <span class="message-data-time">{{ formattedTime }}</span>
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
    date: {
      type: Number,
      required: false
    }
  }
}
</script>

<style scoped>
  .message-data {
    margin-top: 15px;
    font-size: 12px;
  }

  .message-info {
    display: inline-block;
    background-color: #fdf2c0;
    padding: 5px 25px;
    border-radius: 5px;
    box-shadow: 2px 2px 7px 0px rgba(0,0,0,0.2);
  }

  .message-info a {
    color: black;
    border-radius: 5px;
    background-color: #cfd0c9;
    padding: 1px 5px;
  }

  .message-info i {
    position: relative;
    top: -2px;
  }

  .message-data-time {
    color: #a8aab1;
    padding-left: 6px;
    font-size: 10px;
  }
</style>
