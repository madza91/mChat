import emojiRegex from 'emoji-regex'
import gemoji from 'gemoji'

export default {
  methods: {
    emojifyMessage (message) {
      const isPossibleOnlyEmoji = message.length === 2
      const data = {
        totalEmoji: 0,
        onlyEmoji: false,
        message
      }

      data.message = this.message.replace(emojiRegex(), match => {
        data.onlyEmoji = isPossibleOnlyEmoji

        const bigEmojiClass = isPossibleOnlyEmoji ? ' big' : ''
        return `<span role="img" class="emoji${bigEmojiClass}">${match}</span>`
      })

      return data
    },
    searchEmojis (query) {
      return gemoji.filter(emoji => {
        return emoji.tags.includes(query)
      })
    }
  }
}
