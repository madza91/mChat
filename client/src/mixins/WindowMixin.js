export default {
  methods: {
    setTitle (title) {
      const appTitle = process.env.VUE_APP_TITLE
      document.title = `${title} | ${appTitle}`
    }
  }
}
