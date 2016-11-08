
/// <reference path="../core/BrowserHelper.ts"/>
class TemplateList extends EventEmitter{
    onDefine(name:string,fn:ICallBack){
        if(name.length===0){
            return;
        }
        this.on(name,fn);
        this.emit(name,fn);
    }
    define(name:string,sortPath:string,path:string,s:string,ext){
        this[name]=new PartTemplate(name,sortPath,path,s,ext);
        // this.event.emit(name,this[name]);
        this.emit(name,this);
        return this[name];
    }
    
    toString():string{
        let lst:Array<string>=[];
        for(let i in this){
            if(this.hasOwnProperty(i)){
                lst.push(i);    
            }
        }
        return lst.join('\n');
    }
}
