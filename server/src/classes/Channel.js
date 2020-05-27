module.exports = class Channel {
    #history;

    constructor(title, description = null){
        this._title       = title;
        this._description = description;
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

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }
}
