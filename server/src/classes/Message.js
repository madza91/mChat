/**
 * @type {Message}
 */
module.exports = class Message {
  constructor(fromId, nick, message, attachment, to, type){
    this.messageId  = ++incMessage;
    this.nick       = nick;
    this.from       = fromId;
    this.message    = message;
    this.attachment = attachment;
    this.to         = to;
    this.date       = Date.now();
    this.type       = type || 'user';
  }
}
