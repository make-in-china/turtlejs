
/// <reference path='../VOrder.ts'/>
namespace Order {
    export let EXFunction={
        tryRun:'tryRun',
        toJS:'toJS'
    }
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

    extendsOrderGet(VOrder,'canRunAtService',function(this:VOrder):boolean{
        try{
            if(EXFunction.tryRun in this){
                this[EXFunction.tryRun]();
            }
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

    export function toJS(order:VOrder){
        if(EXFunction.toJS in order){
            order[EXFunction.toJS]();
        }
    }
}