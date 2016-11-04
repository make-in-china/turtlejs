
/// <reference path="lib/lib.d.ts" />

interface IEventsCol{
    [index:string]:Array<Function>
}
class $Event{
    private eventsCol:IEventsCol={};
    on(name:string,fn:Function){
        let lst:Array<Function>;
        if(this.eventsCol.hasOwnProperty(name)){
            lst=this.eventsCol[name];    
        }else{
            lst=[];
            this.eventsCol[name]=lst;
        }
        lst.push(fn);
    }
    off(name:string,fn:Function):boolean{
        let lst:Array<Function>;
        if(this.eventsCol.hasOwnProperty(name)){
            lst=this.eventsCol[name];
            lst.forEach((item,index,array)=>{
                if(item==fn){
                    lst.splice(index);
                }
            });
            return true;
        }else{
            return false;
        }
    }
    emit(name:string,event:Event){
        let lst:Array<Function>;
        if(this.eventsCol.hasOwnProperty(name)){
            lst=this.eventsCol[name];
            for(let i=0;i<lst.length;i++){
                lst[i](event);
            }
        }
    }
    events(name:string):Array<Function>|undefined{
        if(this.eventsCol.hasOwnProperty(name)){
            return this.eventsCol[name];
        }
    }
}
class ReadyObject{
    private _isReady=false;
    on(fn:()=>void){
        if(!isFunction(fn)){
            return;
        }
        if(this._isReady){
            fn();
        }else{
            this.readyFunctions.push(fn);
        }
    }
    readyFunctions:Function[]=[];
    get isReady(){
        return this._isReady;
    }
    set isReady(v){
        this._isReady=v;
        while(this.readyFunctions.length>0){
            (<Function>this.readyFunctions.shift())();
        }
    }
}