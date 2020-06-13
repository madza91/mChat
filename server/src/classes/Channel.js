module.exports = class Channel {
    #history;

    constructor(title, description = null){
        this._id          = ++incChannel;
        this._title       = title;
        this._description = description;
        this._input       = '';
        this._totalMsg    = 0;
        this.#history     = [];
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

    get description() {
        return this._description;
    }
}
