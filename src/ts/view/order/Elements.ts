
/// <reference path='VOrder.ts'/>

namespace Order {

    /**
     * 插入传递进组件的dom元素
     */
    @register
    export class Elements extends VOrder {
        static orderName = "elements"
        run(){
            Elements.run(this.data);
        }
        static run(this:void,data:IOrderData) {
            replaceNodeByNodes(data.placeholder,$rootScope.lastRenderPart.propsElements);
        }
    }
}