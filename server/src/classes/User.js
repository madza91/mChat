module.exports = class User {
  constructor(nick, status, socket) {
    const STATUS_ONLINE = 1,
          STATUS_AWAY   = 2,
          STATUS_HIDDEN = 3;

    this._nick    = nick;
    this._status  = status;
    this._socket  = socket;
    this._history = [];
    this._joined  = Date.now();
    this._totalMessages = 0;
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

  get socket() {
    return this._socket;
  }

  get joined() {
    return this._joined;
  }
}
