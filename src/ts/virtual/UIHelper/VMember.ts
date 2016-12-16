/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType{
    Member=101
}
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Member): VMDOM.VMember&IVNodeMethod;
}
namespace VMDOM{
    export class VMember extends VPlaceHolder{
        nodeName="#member"
        isVar:boolean=false
        toJS(space:number=0):string{
            return (new Array(space+1)).join(" ")+`.$$$(${this.isVar?"":"this."}${this.data})`;
        }
    }
    bindClassToFunctionHelper[ENodeType.Member]=function(node:IVNodeMethod & VNode,nodeName: string){
        node.__proto__=VMember.prototype;
        VMember.call(node,nodeName);
    }
}