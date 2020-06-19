const Channel = require('./Channel');

/**
 * @type {Channels}
 */
module.exports = class Channels {
  constructor () {
    this._channels = [];

    this.add(new Channel('general', 'Channel for discussion about anything'));
    this.add(new Channel('help', 'Do you need help? This is the right channel for it'));
  }

  /**
   * Get all channels
   * @returns {[]}
   */
  getAll() {
    return this._channels.map(channel => {
      // ToDo Limit history messages
      // const msgHistoryLimited = history.slice((history.length - config.HISTORY_LIMIT), history.length)

      channel._history = channel.history;
      return channel;
    });
  }

  /**
   * Get all channel titles
   * @returns {*[]}
   */
  getAllTitles() {
    return this._channels.map(channel => {
      return channel._title;
    })
  }

  /**
   * Add channel
   * @param Channel
   */
  add(Channel) {
    this._channels.push(Channel);
  }

  /**
   * @param channelTitle
   * @returns {*}
   */
  findByTitle(channelTitle) {
    return this._channels.find(channel => {
      return channel.title === channelTitle;
    });
  }

  /**
   * @param channelId
   * @returns {*}
   */
  findById(channelId) {
    return this._channels.find(channel => {
      return channel.id === channelId;
    });
  }
}
