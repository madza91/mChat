module.exports = class Message {
  constructor(socketID, nick, message, to, type){
    this.nick = nick;
    this.socket = socketID;
    this.message = message;
    this.to = to;
    this.text = message;
    this.date = Date.now();
    this.type = type || 'user';
  }
}
