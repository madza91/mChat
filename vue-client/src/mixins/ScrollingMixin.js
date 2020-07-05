export default {
  methods: {
    scrollMessagesDown () {
      const container = document.getElementById('container-fluid')

      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }
  }
}
