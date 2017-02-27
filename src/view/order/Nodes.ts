
/// <reference path='VOrder.ts'/>

namespace Order {

    /**
     * 插入传递进组件的dom元素
     */
    @register
    export class Nodes extends VOrder {
        static orderName = "nodes"
        run(){
            Nodes.run(this.data);
        }
        static run(this:void,data:IOrderData) {
            replaceNodeByNodes(data.placeholder,$rootScope.lastRenderPart.propsNodes);
        }
    }
}