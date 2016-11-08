
/// <reference path="EventEmitter.ts"/>
class EventHelper<T extends ICallBack,E extends Function>{
    constructor(private target:EventEmitter,private type:string){}
    emit:E=<any>function(this:EventHelper<T,E>,...args):boolean{
        args.unshift(this.type);
        return this.target.emit.apply(this,args);
    }
    on(listener:T):void{
        this.target.on(this.type,listener);
    }
    addListener(listener:T):void{
        this.target.on(this.type,listener);
    }
    once(listener: T):void {
        this.target.once(this.type,listener);
    }

    removeListener(listener: T):EventEmitter {
        return this.target.removeListener(this.type,listener);
    }

    removeAllListeners():EventEmitter{
        return this.target.removeAllListeners(this.type);
    }
    listeners():T[]{
        return <T[]>this.target.listeners(this.type);
    }
}
