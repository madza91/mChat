const botEmit = require('../../sockets/emit/botEmit');

/**
 * User wants to know something about mChat
 * @param User
 */
module.exports = (User) => {
  return botEmit(User, 'Hello! This chat application is written by Nemanja Madžovski. You can contact me via contact form on <a target="_blank" href="https://madza.rs/">madza.rs</a>. Thank you! 😊');
};
