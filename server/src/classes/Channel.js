/**
 * @type {Channel}
 */
module.exports = class Channel {
    #history;

    constructor(title, topic = null){
        this._id       = ++incChannel;
        this._title    = title;
        this._topic    = topic;
        this._input    = '';
        this._totalMsg = 0;
        this.#history  = [];
    }

    addMessage(message){
        this.#history.push(message);
        this._totalMsg++;
    }

    get history() {
        return this.#history;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get topic() {
        return this._topic;
    }

    set topic(value) {
        return this._topic = value;
    }
}
