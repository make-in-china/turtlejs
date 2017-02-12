interface ITurtle{
    loadJS(path: string | string[], variable?: string):any
}
let loadJS=(function(){

    let requireHash:{
        [index:string]:RequireFile
    }={};
    class RequireFile{
        readonly injectInvoke:(variable?:string)=>any
        constructor(public file:string){
            this.injectInvoke=Function(file+`;
    return function(s){
        return eval('('+s+')');
    };
    `)();
        }
    }
    return function(path:string|string[],variable?:string){
        if(isArray(path)){
            let key=path.join(",");
            if(requireHash.hasOwnProperty(key)){
                return requireHash[key].injectInvoke(variable);
            }else{
                let codes="";
                for(let i=0;i<path.length;i++){
                    $t.xhr.get(path[i],false,function(s){
                        codes+="\r\n"+s;
                    });
                }
                let requireFile=requireHash[key]=new RequireFile(codes);
                return requireFile.injectInvoke(variable);;
            }
        }else{
            if(requireHash.hasOwnProperty(path)){
                return requireHash[path].injectInvoke(variable);
            }else{
                let something;
                $t.xhr.get(path,false,function(s){
                    let requireFile=requireHash[path]=new RequireFile(s);
                    something=requireFile.injectInvoke(variable);
                });
                return something;
            }
        }
    }
})();