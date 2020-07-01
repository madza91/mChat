export default {
  methods: {
    uploadImage (file) {
      const formData = new FormData()
      formData.append('image', file)

      return this.axios.post(process.env.VUE_APP_API_HOST + '/mchat/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
