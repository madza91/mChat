<template>
  <div>
    <div class="message-data">
      <span class="message-data-name">{{ nick }}</span>
      <span class="message-data-time">{{ formattedTime }}</span>
    </div>
    <div class="message messageArrow my-message">
      {{ message }}
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
    date: {
      type: Date,
      required: false
    }
  }
}
</script>

<style scoped>
.message {
  color: white;
  padding: 4px 10px;
  line-height: 26px;
  font-size: 14px;
  border-radius: 7px;
  margin-bottom: 5px;
  width: 90%;
  position: relative;
  word-wrap: break-word;
}
.messageArrow:after {
  bottom: 100%;
  left: 25px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #86BB71;
  border-width: 10px;
  margin-left: -10px;
}
.message-data {
  color: black;
  font-size: smaller;
  margin-bottom: 10px;
  margin-top: 15px;
  width: 100%;
}
.message-data-time {
  color: #a8aab1;
  padding-left: 6px;
  font-size: 10px;
}
.my-message {
  background: #86BB71;
  border-bottom-color: #86BB71;
}
.other-message {
  background: #94C2ED;
}
.other-message:after {
  border-bottom-color: #94C2ED;
  left: 93%;
}
</style>
