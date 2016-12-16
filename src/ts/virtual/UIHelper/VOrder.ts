/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType{
    Order=102
}

interface IVNodeMethod{
    (block:JS.JavaScriptBlock, nodeType: ENodeType.Order): VMDOM.VOrder&IVNodeMethod;
}
namespace VMDOM{
    export class VOrder extends VPlaceHolder{
        nodeName="#order"
        constructor(public block:JS.JavaScriptBlock){
            super('');
        }
        
        toJS(space:number=0):string{
            return '';
        }
    }
    bindClassToFunctionHelper[ENodeType.Order]=function(node:IVNodeMethod & VNode,block: JS.JavaScriptBlock){
        node.__proto__=VOrder.prototype;
        VOrder.call(node,block);
    }
}