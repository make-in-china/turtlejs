
/// <reference path="EventEmitter.ts"/>
/// <reference path="EventHelper.ts"/>
class EventEmitterEx extends EventEmitter{
    /**
     * 缓存事件管理器
     */
    private eventHelpers:{[index:string]:EventHelper<ICallBack,Function>}={}
    /**
     * 生成或获取一个事件管理器
     * 
     * @template T 回调函数
     * @template U 
     * @param {string} type 事件名
     * @returns {EventHelper<T,U>} 
     * 
     * @memberOf EventEmitterEx
     */
    getEventHelper<T extends ICallBack,U extends Function>(type:string):EventHelper<T,U>{
        var eventHelper=this.eventHelpers[type];
        if(!eventHelper){
            eventHelper=this.eventHelpers[type]=new EventHelper<T,U>(this,type);
        }
        return <EventHelper<T,U>>eventHelper;
    }
}
