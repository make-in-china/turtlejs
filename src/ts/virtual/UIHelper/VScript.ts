
/// <reference path='VPlaceHolder.ts'/>
interface IVNodeMethod{
    (data: (this:VScript)=>void, nodeType: ENodeType.Script): VScript&IVNodeMethod;
}
class VScript extends VPlaceHolder{
    nodeName="#script"
    nodeType:ENodeType.Script=ENodeType.Script
    script:(this:VScript)=>void
    constructor(data:(this:VScript)=>void){
        super('');
        this.script=data;
    }
    run(){
        this.script();
    }
    
}