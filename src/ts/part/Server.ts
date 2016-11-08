class Service extends TemplateList{
    private __defineCallbacks__:ArrayEx<Function>=new ArrayEx<Function>();
    constructor(serv?:Service){
        super();
        if(isObject(serv)){
            for(let i in serv){
                this[i]=serv[i];
                this.emit(i,this[i]);
                // this.event.emit(i,this[i]);
            }
        }
    }
    require(n){
        if(!this.hasOwnProperty(n)){
            this[n]=getService(n);
        }
        return this[n];
    }
    define(name,s){
        try{
            this[name]=exec("("+s+")");    
        }catch(e){
            _catch(e);
        }
        this.emit(name,this[name]);
        // this.event.emit(name,this[name]);
    }
    toDefineString(){
        let s='new $t.Service(';
        let fns=[];
        for(let i in this){
            if(this.hasOwnProperty(i)){
                fns.push('"'+i+'":'+this[i].toString());    
            }
        }
        if(fns.length>0){
            s+='{'+fns.join(',')+'})';
        }else{
            s+=')';
        }
        return s;
    }
}