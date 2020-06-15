const botEmit = require('../../sockets/emit/botEmit');
const tableTemplate = require('../templates/tableTemplate');

/**
 * User requesting info about other user
 * @param User
 * @param params
 */
module.exports = (User, params) => {
  if (params) {
    const foundUser = userList.findByNick(params);

    if (foundUser) {
      if (foundUser.status === 'bot') {
        botEmit(User, 'Hey! You are interested in me 😍');

        return botEmit(User, 'I\'m here to inform and help you whatever you need.');
      }

      return botEmit(User, tableTemplate({
        'Nick': foundUser.nick,
        'Joined': foundUser.joined,
        'Status': foundUser.status,
        'Away status': foundUser.statusMessage,
        'Messages': foundUser.totalMessages,
        'Idle': calculateIdle(foundUser)
      }));
    }

    return botEmit(User, 'I have not found that user, try again with another nick.');
  }

  return botEmit(User, 'Uncompleted command. Please type in <b>/whois nick</b>.');
};

/**
 * @param User
 * @returns {string}
 */
calculateIdle = (User) => {
  const lastMessageTimestamp = Math.round(User.idleFrom.getTime() / 1000);
  const currentTimestamp = Math.round(new Date().getTime() / 1000);
  const idleSeconds = currentTimestamp - lastMessageTimestamp;

  const d = Math.floor(idleSeconds / 86400);
  const h = Math.floor(idleSeconds / 3600 % 24);
  const m = Math.floor(idleSeconds % 3600 / 60);
  const s = Math.floor(idleSeconds % 3600 % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? " day" : " days") : null;
  const hDisplay = h > 0 ? h + (h === 1 ? " hour" : " hours") : null;
  const mDisplay = m > 0 ? m + (m === 1 ? " minute" : " minutes") : null;
  const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : null;

  return [dDisplay, hDisplay, mDisplay, sDisplay].filter(v => v !== null).join(', ');
}
