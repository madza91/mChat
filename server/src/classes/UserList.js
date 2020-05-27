const config = require('../modules/config');
const User   = require('./User');

module.exports = class UserList {
  constructor(){
    this.users = [];

    // Add Bot
    if (config.BOT_NAME) {
      this.add(new User(config.BOT_NAME, 'online', 'bot'));
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
    // const index = this.users.findIndex((user) => user.id === id)
    //
    // if (index !== -1) {
    //   return this.users.splice(index, 1)[0]
    // }

    this.users = this.users.filter(function (user) {
      return user.nick !== User.nick;
    });
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
    return this.users.find(function (user) {
      return user._socket === value;
    });
  }

  /**
   * Find User by Nick
   * @param value
   * @returns {*[]}
   */
  findByNick(value) {
    return this.users.find(function (user) {
      return user.nick === value;
    });
  }
}
