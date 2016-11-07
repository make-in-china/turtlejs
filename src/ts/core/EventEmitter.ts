
/// <reference path="is.ts" />
interface ICallBack {
    (this: void, ...arg): void
}

class EventEmitter{
    protected events: {
        [index: string]: ICallBack | ICallBack[] | undefined
        error?
    }
    constructor() {
        this.on = this.addListener;
    }
    emit = function (type: string, ...args): boolean {
        // If there is no 'error' event listener then throw.
        if (type === 'error') {
            if (!this.events || !this.events.error ||
                (isArray(this.events.error) && !this.events.error.length)) {
                if (arguments[1] instanceof Error) {
                    throw arguments[1]; // Unhandled 'error' event
                } else {
                    throw new Error("Uncaught, unspecified 'error' event.");
                }
            }
        }

        if (!this.events) return false;
        let handler = this.events[<string>type];
        if (!handler) return false;

        if (!isArray(handler)) {
            handler.apply(this, args);
            return true;

        } else if (isArray(handler)) {

            let listeners = handler.slice();
            for (let i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args);
            }
            return true;

        } else {
            return false;
        }
    };

    on: (type: string, listener: ICallBack) => this
    // EventEmitter is defined in src/nodeevents.cc
    // EventEmitter.prototype.emit() is also defined there.
    addListener: (type: string, listener: ICallBack) => this =
    function (type: string, listener: ICallBack) {
        if ('function' !== typeof listener) {
            throw new Error('addListener only takes instances of Function');
        }

        if (!this.events) this.events = {};

        // To avoid recursion in the case that type == "newListeners"! Before
        // adding it to the listeners, first emit "newListeners".
        this.emit('newListener', type, listener);
        let hanlder = this.events[type];
        if (!hanlder) {
            // Optimize the case of one listener. Don't need the extra array object.
            this.events[type] = listener;
        } else if (isArray(hanlder)) {
            // If we've already got an array, just append.
            hanlder.push(listener);
        } else {
            // Adding the second element, need to change to array.
            this.events[type] = [hanlder, listener];
        }

        return this;
    };


    once = function (type: string, listener: ICallBack):void {
        let self = this;
        self.on(type, function g() {
            self.removeListener(type, g);
            listener.apply(this, arguments);
        });
    };

    removeListener: (type: string, listener: ICallBack) => this =
    function (type: string, listener: ICallBack) {
        if ('function' !== typeof listener) {
            throw new Error('removeListener only takes instances of Function');
        }

        // does not use listeners(), so no side effect of creating events[type]
        if (!this.events || !this.events[<string>type]) return this;

        let list = this.events[<string>type];

        if (isArray(list)) {
            let i = list.indexOf(listener);
            if (i < 0) return this;
            list.splice(i, 1);
            if (list.length == 0)
                delete this.events[<string>type];
        } else if (this.events[<string>type] === listener) {
            delete this.events[<string>type];
        }

        return this;
    };

    removeAllListeners: (type: string) => this =
    function (type: string) {
        // does not use listeners(), so no side effect of creating events[type]
        if (type && this.events && this.events[<string>type]) {
            delete this.events[<string>type]
        }
        return this;
    };

    listeners: (type: string) => ICallBack[] =
    function (type: string) {
        if (!this.events) this.events = {};
        let handler = this.events[<string>type];
        if (!handler) {
            this.events[<string>type] = [];
        } else if (!isArray(handler)) {
            this.events[<string>type] = [handler];
        }
        return this.events[<string>type];
    };
}
