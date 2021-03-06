const config = require('../modules/config');
const User   = require('./User');

/**
 * @type {Users}
 */
module.exports = class Users {
  constructor(){
    this.users = [];

    // Add Bot
    if (config.BOT_NAME) {
      this.add(new User(config.BOT_NAME, 'bot', 'bot'));
    }
  }

  /**
   * Get all users
   * @returns {[]}
   */
  getAll() {
    return this.users;
  }

  /**
   * Add new user
   * @param User
   */
  add(User) {
    this.users.push(User);
  }

  /**
   * Removes user from list
   * @param User
   */
  removeUser(User) {
    const index = this.users.findIndex((user) => user.id === User.id)

    if (index !== -1) {
      return this.users.splice(index, 1)[0]
    }
  }

  /**
   * Change nick or status of selected user
   * @param userNick
   * @param newValues
   */
  changeUser(userNick, newValues) {
    if (newValues) {
      for (let u = 0; u < this.users.length; u++) {
        if (this.users[u].nick === userNick) {
          if (newValues.nick) {
            this.users[u].nick = newValues.nick;
          }
          if (newValues.status) {
            this.users[u].status = newValues.status;
          }
          break;
        }
      }
    }
  }

  /**
   * Find User by Socket
   * @param value
   * @returns {*[]}
   */
  findBySocket(value) {
    return this.users.find(user => {
      return user.socket === value;
    });
  }

  /**
   * Find User by Socket
   * @param value
   * @returns {*[]}
   */
  findById(value) {
    return this.users.find(user => {
      return user._id === parseInt(value);
    });
  }

  /**
   * Find User by Nick
   * @param value
   * @returns {*[]}
   */
  findByNick(value) {
    return this.users.find(user => {
      return user.nick === value;
    });
  }
}
