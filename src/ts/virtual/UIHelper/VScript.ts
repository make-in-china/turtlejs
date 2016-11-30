
/// <reference path='VPlaceHolder.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Script): VScript&IVNodeMethod;
}
class VScript extends VPlaceHolder{
    nodeName="#script"
    nodeType:ENodeType.Script=ENodeType.Script
    toJS():string{
        return `.$.appendChild((()=>{
            ${this.data}
        }())).$`;
    }
    
}