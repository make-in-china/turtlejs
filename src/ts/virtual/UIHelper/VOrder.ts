/// <reference path='../node/VPlaceHolder.ts'/>
/// <reference path='../javascript/JavaScriptBlock.ts'/>

const enum ENodeType{
    Order=102
}

interface IVNodeMethod{
    (block:JS.JavaScriptBlock, nodeType: ENodeType.Order): VMDOM.VOrder&IVNodeMethod;
}
namespace VMDOM{
    @register('#order',ENodeType.Order)
    export class VOrder extends VPlaceHolder{
        nodeName="#order"
        nodeType=ENodeType.Order
        constructor(public block:JS.JavaScriptBlock){
            super('');
        }
        
        cloneNode(deep:boolean):VOrder&IVNodeMethod{
            return $$$(this.block.clone(),ENodeType.Order);
        }
        toJS(space:number=0):string{
            return '';
        }
    }
    // bindClassToFunction2Helper['#order']=bindClassToFunctionHelper[ENodeType.Order]=function(node:IVNodeMethod & VNode,block: JS.JavaScriptBlock){
    //     node.__proto__=VOrder.prototype;
    //     VOrder.call(node,block);
    // }
}