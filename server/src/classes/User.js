/**
 * @type {User}
 */
module.exports = class User {
  #_socket;
  #_isAdmin;

  constructor(nick, status, socket) {
    const STATUS_ONLINE = 1,
          STATUS_AWAY   = 2,
          STATUS_HIDDEN = 3;

    this.#_socket       = socket;
    this.#_isAdmin       = false;
    this._id            = ++incUser;
    this._nick          = nick;
    this._status        = status;
    this._statusMessage = null;
    this._history       = [];
    this._joined        = new Date();
    this._badge         = 0;
    this._input         = '';
    this._noticeMe      = false;
    this._totalMessages = 0;
    this._idleFrom      = new Date();
  }

  get id() {
    return this._id;
  }

  get nick() {
    return this._nick;
  }

  set nick(nick) {
    return this._nick = nick;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    return this._status = status;
  }

  get statusMessage() {
    return this._statusMessage;
  }

  set statusMessage(message) {
    return this._statusMessage = message;
  }

  get totalMessages() {
    return this._totalMessages;
  }

  set totalMessages(int) {
    return this._totalMessages = int;
  }

  incrementMessages() {
    return this._totalMessages++;
  }

  get socket() {
    return this.#_socket;
  }

  set socket(socket) {
    return this.#_socket = socket
  }

  get joined() {
    return this._joined;
  }

  get idleFrom() {
    return this._idleFrom;
  }

  updateIdleFrom() {
    return this._idleFrom = new Date();
  }

  get isAdmin() {
    return this.#_isAdmin;
  }

  set isAdmin(value) {
    return this.#_isAdmin = value;
  }
}
