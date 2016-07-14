
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
    events(name:string):Array<Fun>{
        if(this.eventsCol.hasOwnProperty(name)){
            return this.eventsCol[name];
        }
    }
}