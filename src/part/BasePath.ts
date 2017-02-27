

/// <reference path='../lib/Is.ts'/>
class BasePath{
    paths:{
        [index:string]:string
    }={};
    
    // push(path:string):boolean{
    //     if(isString(path)){
    //         return this.parseUIPath(path);    
    //     }else if(isArray(path)){
    //         for(var i=0;i<path.length;i++){
    //             if(isString(path[i])){
    //                 if(!this.parseUIPath(path[i])){
    //                     return false;
    //                 }
    //             }
    //         }
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    /**
     * 解析UIPath字符串
     * @param {string} s 格式为: {name:'path'}[,{name:'path'}]
     */
    push(s:string):boolean{
        try{
            var o=exec('('+s+')');
            for(var name in o){
                this.paths[name]=o[name];
            }
            // if(isObject(o)&&o.hasOwnProperty('name')&&o.hasOwnProperty('path')){
            //     this.paths[o.name]=o.path;
            //     // this.push(o);
            //     return true;
            // }
        }catch(e){
            return false
        }
        return true;
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
