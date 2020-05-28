module.exports = class Message {
  constructor(socketID, nick, message, to, type){
    incremental++;

    this.id = incremental;
    this.nick = nick;
    this.socket = socketID;
    this.message = message;
    this.to = to;
    this.date = Date.now();
    this.type = type || 'user';
  }
}
