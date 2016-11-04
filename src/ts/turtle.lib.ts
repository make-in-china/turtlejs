
function _catch(e:Event,fn?:Fun){
    if(fn){
        fn(e);
    }else{
        rte.emit("error",e);
    }
}
function throwError(err:string){
    try{
        throw new Error('turtle:\n'+err);
    }catch(e){
        _catch(e);
    }
}