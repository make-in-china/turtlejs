
/// <reference path='VOrder.ts'/>
namespace Order {
    /**运行并插入返回的节点 */
    export interface IOrderDataEqual extends IOrderData{
        condition:string
    }
    @register
    export class Equal extends VOrder {
        static orderName = "="
        data:IOrderDataEqual
        constructor(node:VMDOM.VComment,setup: IOrderSetup){
            super(node,setup);
            this.data.condition=setup.params.innerText;
        }
        static run(this:void,data:IOrderDataEqual){
            let v=exec(data.placeholder,data.condition);
            if(v instanceof VMDOM.VNode){
                replaceNodeByNode(data.placeholder,v);
                return;
            }
            replaceNodeByNode(data.placeholder,$$$(''+v,ENodeType.Text));
        }
    }
}
