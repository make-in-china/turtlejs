
/// <reference path='../VOrder.ts'/>
namespace Order {
    export function extendsOrderGet<U extends VOrder,T extends typeof VOrder,R>(
        clazz:T,
        name:string,
        fn:(this:U)=>R
    ){
        Object.defineProperty((<any>clazz).prototype,name,{get:fn});
    }
    export function extendsOrderFunction<U extends VOrder,T extends typeof VOrder,R>(
        clazz:T,
        name:string,
        fn:(this:U)=>R
    ){
        Object.defineProperty((<any>clazz).prototype,name,{value:fn});
    }

    extendsOrderGet(VOrder,'canRunAtService',function(this:VOrder&{tryRun():void}):boolean{
        try{
            this.tryRun();
            resetTest();
            return true;
        }catch(e){
            resetTest();
            return false;
        }
    });

    export function canRunAtService(order:VOrder):boolean{
        return order['canRunAtService'];
    }
}