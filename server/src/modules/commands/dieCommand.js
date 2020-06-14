const botEmit = require('../../sockets/emit/botEmit');

/**
 * Instructs the server to shut down. Only for Admins.
 * Aliases: exit, quit
 * @param User
 * @returns {*}
 */
module.exports = (User) => {
  if (User.isAdmin) {
    process.exit(1);
  }

  return botEmit(User, 'Only Admin can shut down the server.')
};
