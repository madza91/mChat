import { createNamespacedHelpers } from 'vuex'
const { mapState: mapChatState } = createNamespacedHelpers('chat')

export default {
  computed: {
    ...mapChatState(['loggedInUser'])
  },
  methods: {
    uploadImage (file, onUploadProgress) {
      const formData = new FormData()
      formData.append('image', file)

      return this.axios.post(process.env.VUE_APP_API_HOST + '/mchat/image', formData, {
        headers: {
          Authorization: this.loggedInUser.socket,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      })
    },
    giphySearch (query) {
      return this.axios.get(process.env.VUE_APP_GIPHY_HOST + '/v1/gifs/search', {
        params: {
          api_key: process.env.VUE_APP_GIPHY_KEY,
          q: query
        }
      })
    }
  }
}
