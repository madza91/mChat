const commandEmit = require('../../sockets/emit/commandEmit')

/**
 * User wants to simulate more users
 * Note: For development purposes
 * @param User
 * @param params
 */
module.exports = (User, params) => {
  return commandEmit.toUser(User, 'simulate', {
    action: 'add_user',
    total: params
  })
};
