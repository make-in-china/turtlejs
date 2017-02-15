/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType{
    Member=101
}
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Member): VMDOM.VMember&IVNodeMethod;
}
namespace VMDOM{
    @register('#member', ENodeType.Member)
    export class VMember extends VPlaceHolder{
        nodeName="#member"
        nodeType=ENodeType.Member
        isVar:boolean=false
        toJS(space:number=0):string{
            return (new Array(space+1)).join(" ")+`.$$$(${this.isVar?"":"this."}${this.data})`;
        }
    }
}
