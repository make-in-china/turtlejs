
typeof document==="undefined"&&(document=<any>{})
class RootScope{
    public __actionNode__=document.documentElement;
    public __children__:Scope[]=[];
    constructor(){
        document['scope']=this;
    }
}

let $rootScope:RootScope=new RootScope;