const Emojis = require('../data/emojis.json');

/**
 * @type {{isMessageValid: (function(*=): boolean|boolean), isNickValid: isNickValid, validate(*=): ({reason: null, isValid: boolean})}}
 */
module.exports = {
  isNickValid: (nick) => {
    if (typeof nick === 'string') {
      return /^[0-9A-Za-z.-/-_!@#$%^&*()|<>?{}'"/[\]]{3,30}$/.test(nick);
    }

    return false;
  },
  validate (nick) {
    const isValid = this.isNickValid(nick);
    const User = userList.findByNick(nick);
    const reason = isValid ? 'Nickname is already taken' : 'Please use minimum 3 letters and only letters and numbers';
    if (isValid && !User) {
      return {
        isValid: true,
        reason: null
      };
    }

    return {
      isValid: false,
      reason: reason
    };
  },
  isMessageValid: (message) => {
    return (typeof message === 'object' && message !== null);
  },
  emojiconify: (message) => {
    Emojis.forEach(element => {
      message = message.replace(element.shortcut, element.emoji);
    })

    return message;
  }
};
