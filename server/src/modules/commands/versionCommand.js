const botEmit = require('../../sockets/emit/botEmit');

/**
 * Return server version
 */
module.exports = (User) => {
  const version = serverBuild.getTime()
  return botEmit(User, `Current server version is <b>${ version }</b>, build at ${ serverBuild }`);
};
