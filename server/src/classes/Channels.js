const Channel = require('./Channel');

module.exports = class Channels {
  constructor () {
    this._channels = [];

    this.add(new Channel('general', 'General discussion'));
    this.add(new Channel('help', 'There is no help for ya'));
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

  findByTitle(channelTitle) {
    return this._channels.find(function (channel) {
      return channel.title === channelTitle;
    });
  }
}
