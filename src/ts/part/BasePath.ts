

/// <reference path='../lib/Is.ts'/>
class BasePath{
    paths:{
        [index:string]:string
    }={ui:'ui'};
    push(v:string|Array<string>):boolean{
        if(isString(v)){
            return this.parseUIPath(v);    
        }else if(isArray(v)){
            for(var i=0;i<v.length;i++){
                if(isString(v[i])){
                    if(!this.parseUIPath(v[i])){
                        return false;
                    }
                }
            }
            return true;
        }else{
            return false;
        }
    }
    /**
     * 解析UIPath字符串
     * @param {string} s 格式为:{name:'',path:''}
     */
    parseUIPath(s:string):boolean{
        try{
            var o=exec('('+s+')');
            if(isObject(o)&&o.hasOwnProperty('name')&&o.hasOwnProperty('path')){
                this.paths[o.name]=o;
                // this.push(o);
                return true;
            }
        }catch(e){
            
        }
        return false;
    }
    hasSortPath(sortPath:string){
        return this.paths.hasOwnProperty(sortPath);
    }
    toString(){
        var arr:string[]=[];
        for(var i in this.paths){
            arr.push("{name:'"+i+"',path:'"+this.paths[i]+"'}")
        }
        return arr.join(';');
    }
}
let baseUIPath=new BasePath;
