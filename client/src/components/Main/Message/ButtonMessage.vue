<template>
  <div class="message-data text-center">
    <b-button @click="emitClick">{{ message }}</b-button>
  </div>
</template>

<script>
export default {
  name: 'ButtonMessage',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    emitClick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
  .message-data {
    margin: 4px 0 9px;
  }
</style>
