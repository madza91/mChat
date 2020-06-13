/**
 * ToDo Send a message on channel or private chat as system message (yellow middle message)
 * Example: /me is bored => nick is bored
 * @param User
 * @param params
 * @returns {{type: string, message: string}}
 */
module.exports = (User, params) => {
  return {
    type: 'system',
    message: `${ User.nick } ${ params }`
  };
};
