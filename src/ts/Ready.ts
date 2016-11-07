
class Ready{
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