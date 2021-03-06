
/// <reference path="../lib/is.ts" />
interface ICallBack {
    (...arg:any[]): void
}
interface EventEmitter{
    on(type: string, listener: ICallBack): this
    off(type: string, listener: ICallBack): this
}
class EventEmitter{
    protected events: {
        [index: string]: ICallBack | ICallBack[] | undefined
        error?: ICallBack | ICallBack[]
    }
    constructor() {}
    emit(type: string, ...args:any[]): boolean {
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
        let handler = this.events[type];
        if (!handler){
            return false;
        } else if (isArray(handler)) {
            
            let listeners = (<ICallBack[]>handler).slice();
            for (let i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args);
            }
            return true;

        } else{
            (<ICallBack>handler).apply(this, args);
            return true;
        }
    };

    // EventEmitter is defined in src/nodeevents.cc
    // EventEmitter.prototype.emit() is also defined there.
    addListener(type: string, listener: ICallBack) {
        if ('function' !== typeof listener) {
            throw new Error('addListener only takes instances of Function');
        }

        if (!this.events) this.events = {};

        // To avoid recursion in the case that type == "newListeners"! Before
        // adding it to the listeners, first emit "newListeners".
        this.emit('newListener', type, listener);
        let handler = this.events[type];
        if (!handler) {
            // Optimize the case of one listener. Don't need the extra array object.
            this.events[type] = listener;
        } else if (isArray(handler)) {
            // If we've already got an array, just append.
            (<ICallBack[]>handler).push(listener);
        } else {
            // Adding the second element, need to change to array.
            this.events[type] = [<ICallBack>handler, listener];
        }

        return this;
    };


    once(type: string, listener: ICallBack):void {
        let self = this;
        self.on(type, function g(this:any) {
            self.removeListener(type, g);
            listener.apply(this, arguments);
        });
    };

    removeListener(type: string, listener: ICallBack) {
        if ('function' !== typeof listener) {
            throw new Error('removeListener only takes instances of Function');
        }

        // does not use listeners(), so no side effect of creating events[type]
        if (!this.events || !this.events[<string>type]) return this;

        let list = this.events[<string>type];

        if (isArray(list)) {
            let i = (<ICallBack[]>list).indexOf(listener);
            if (i < 0) return this;
            (<ICallBack[]>list).splice(i, 1);
            if (list.length == 0)
                delete this.events[<string>type];
        } else if (this.events[<string>type] === listener) {
            delete this.events[<string>type];
        }

        return this;
    };

    removeAllListeners(type: string) {
        // does not use listeners(), so no side effect of creating events[type]
        if (type && this.events && this.events[<string>type]) {
            delete this.events[<string>type]
        }
        return this;
    };

    listeners(type: string) {
        if (!this.events) this.events = {};
        let handler = this.events[<string>type];
        if (!handler) {
            this.events[<string>type] = [];
        } else if (!isArray(handler)) {
            this.events[<string>type] = [<ICallBack>handler];
        }
        return this.events[<string>type];
    };
}
EventEmitter.prototype.on=EventEmitter.prototype.addListener
EventEmitter.prototype.off=EventEmitter.prototype.removeListener