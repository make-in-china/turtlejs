
let 
    $rootScope:RootScope;

interface ITurtle{
    rootScope:RootScope;
}

class RootScope{
    public __actionNode__=document.documentElement;
    public __children__:Scope[]=[];
    constructor(){
        document['scope']=this;
    }
}