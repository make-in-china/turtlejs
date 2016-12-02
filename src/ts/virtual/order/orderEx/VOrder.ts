
/// <reference path='../VOrder.ts'/>
namespace Order {
    export let EXFunction={
        tryRun:'tryRun',
        toJS:'toJS'
    }
    export function extendsOrderGet<U extends VOrder>(
        clazz:{prototype:U},
        name:string,
        fn:(this:U)=>void
    ){
        Object.defineProperty(clazz.prototype,name,{get:fn});
    }
    export function extendsOrderFunction<U extends VOrder>(
        clazz:{prototype:U},
        name:string,
        fn:(this:U)=>void
    ){
        Object.defineProperty(clazz.prototype,name,{value:fn});
    }

    extendsOrderGet(VOrder,'canRunAtService',function():boolean{
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