
/// <reference path="PartEvents.ts"/>
class EventsHelper<T extends ICallBack,E extends Function>{
    constructor(private part:PartBase,private type:string){}
    emit:E=<any>function(...args):boolean{
        args.unshift(this.type);
        return this.part.emit.apply(this.part,args);
    }
    on(listener:T):void{
        this.part.on(this.type,listener);
    }
    addListener(listener:T):void{
        this.part.on(this.type,listener);
    }
    once(listener: T):void {
        this.part.once(this.type,listener);
    }

    removeListener(listener: T):PartBase {
        return this.part.removeListener(this.type,listener);
    }

    removeAllListeners():PartBase{
        return this.part.removeAllListeners(this.type);
    }
    listeners():T[]{
        return <any>this.part.listeners(this.type);
    }
}
