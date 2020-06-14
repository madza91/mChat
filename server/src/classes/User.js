module.exports = class User {
  #isAdmin;

  constructor(nick, status, socket) {
    const STATUS_ONLINE = 1,
          STATUS_AWAY   = 2,
          STATUS_HIDDEN = 3;

    this._id            = ++incUser;
    this._nick          = nick;
    this._status        = status;
    this._statusMessage = null;
    this._socket        = socket;
    this._history       = [];
    this._joined        = new Date();
    this._badge         = 0;
    this._input         = '';
    this._noticeMe      = false;
    this._totalMessages = 0;
    this._idleFrom      = null;
    this.#isAdmin       = false;
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
    return this._socket;
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
    return this.#isAdmin;
  }

  set isAdmin(value) {
    return this.#isAdmin = value;
  }
}
