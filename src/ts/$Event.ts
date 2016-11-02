
/// <reference path="global.ts" />

interface IEventsCol{
    [index:string]:Array<Fun>
}
class $Event{
    private eventsCol:IEventsCol={};
    on(name:string,fn:Fun){
        let lst:Array<Fun>;
        if(this.eventsCol.hasOwnProperty(name)){
            lst=this.eventsCol[name];    
        }else{
            lst=[];
            this.eventsCol[name]=lst;
        }
        lst.push(fn);
    }
    off(name:string,fn:Fun):boolean{
        let lst:Array<Fun>;
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
        let lst:Array<Fun>;
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
    readyFunctions:Fun[]=[];
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