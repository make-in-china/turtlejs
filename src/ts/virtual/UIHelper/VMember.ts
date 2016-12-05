/// <reference path='../node/VPlaceHolder.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Member): VMember&IVNodeMethod;
}
class VMember extends VPlaceHolder{
    nodeName="#member"
    isVar:boolean=false
    toJS():string{
        return `.$.$$(${this.isVar?"":"this."}${this.data}).$`;
    }
}