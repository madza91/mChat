/**
 * @type {Message}
 */
module.exports = class Message {
  constructor(fromId, nick, message, to, type){
    this.messageId = ++incMessage;
    this.nick      = nick;
    this.from      = fromId;
    this.message   = message;
    this.to        = to;
    this.date      = Date.now();
    this.type      = type || 'user';
  }
}
