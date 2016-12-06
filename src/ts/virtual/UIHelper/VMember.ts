/// <reference path='../node/VPlaceHolder.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Member): VMember&IVNodeMethod;
}
class VMember extends VPlaceHolder{
    nodeName="#member"
    isVar:boolean=false
    toJS(space:number=0):string{
        return (new Array(space+1)).join(" ")+`.$$$(${this.isVar?"":"this."}${this.data})`;
    }
}