/// <reference path='../virtual/src/node/VPlaceHolder.ts'/>
/// <reference path='../javascript/JavaScriptBlock.ts'/>
/// <reference path='VOrderData.ts'/>

const enum ENodeType{
    Order=102
}

interface IVNodeMethod{
    (data:VMDOM.VOrderData, nodeType: ENodeType.Order): VMDOM.VOrder&IVNodeMethod;
}
namespace VMDOM{
    @register('#order',ENodeType.Order)
    export class VOrder extends VPlaceHolder{
        nodeName:"#order"="#order"
        nodeType=ENodeType.Order
        constructor(public orderData:VOrderData){
            super('');
        }
        
        cloneNode():VOrder&IVNodeMethod{
            return $$$(this.orderData.clone(),ENodeType.Order);
        }
        toJS():string{
            return '';
        }
    }
}
