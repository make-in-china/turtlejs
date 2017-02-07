
/// <reference path='VOrder.ts'/>
namespace Order {
    export interface INodesOrderData extends IOrderData{
        // part:Component.Part
    }
    /**
     * 插入传递进组件的dom元素
     */
    @register
    export class Nodes extends VOrder {
        static orderName = "nodes"
        data:INodesOrderData
        constructor(node: VMDOM.VComment, condition: string){
            super(node,condition);
            //从系统中获取执行该order的part
        }
        run(){
            Nodes.run(this.data);
        }
        static run(this:void,data:INodesOrderData) {
            //获取当前组件
            //得到组件的未使用的输入元素  
            // data.part.elements
        }
    }
}