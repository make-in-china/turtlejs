
function _catch(e,fn?:Function){
    if(fn){
        fn(e);
    }else{
        $t.$error.emit(e);
    }
}
function throwError(err:string){
    try{
        throw new Error('turtle:\n'+err);
    }catch(e){
        _catch(e);
    }
}
