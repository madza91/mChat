const ogs       = require('open-graph-scraper');
const config    = require('../modules/config');
const debugging = require('../modules/debugging');

module.exports = {
  emailSend: (nick, message) => {
    if (config.EMAIL_ENABLED === true && config.EMAIL_SERVICE) {
      let token = Math.random().toString(36).substring(2);
      request.post(
        config.settings.emailService,
        {
          form: {
            name: nick,
            message: message,
            token: token
          }
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            debugging.log(body)
          }
        }
      );
    }
  },
  getRandomNick: () => {
    return 'guest' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
  },
  isNickValid: (nick) => {
    if (typeof nick === 'string') {
      return /^[0-9A-Za-z.-/-_!@#$%^&*()|<>?{}'"/[\]]{3,30}$/.test(nick);
    }
    return false;
  },
  validate: function (nick) {
    const isValid = this.isNickValid(nick);
    const User = userList.findByNick(nick);
    const reason = isValid ? 'Nickname is already taken' : 'Please use minimum 3 letters and only letters and numbers';
    if (isValid && !User) {
      return {
        nick: nick,
        isValid: true,
        reason: null
      };
    }

    return {
      nick: this.getRandomNick(),
      isValid: false,
      reason: reason
    };
  },
  isMessageValid: (message) => {
    return (typeof message === 'object' && message !== null);
  },
  getUrlInfo: (url) => {
    // ToDo: Make it useful
    let options = {'url': url};
    ogs(options, function (error, results) {
        console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
        console.log('results:', results.data.ogImage);
    });
  }
};
