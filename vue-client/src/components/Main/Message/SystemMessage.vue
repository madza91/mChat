<template>
  <li>
    <div class="message-data text-center">
      <div class="message-info">
        <span class="message-data-name">{{ message }}</span>
        <span class="message-data-time">vreme, Today</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SystemMessage',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
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
  }
</style>
