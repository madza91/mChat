export default {
  methods: {
    scrollMessagesDown () {
      const container = document.getElementById('container-fluid')

      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    isDown () {
      const container = document.getElementById('container-fluid')

      return container.scrollHeight - container.clientHeight - 100 <= container.scrollTop + 1
    }
  }
}
