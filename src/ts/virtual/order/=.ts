
/// <reference path='VOrder.ts'/>
namespace Order {
    /**运行并插入返回的节点 */
    @register
    export class Equal extends VOrder {
        static orderName = "="
        run(){
            Equal.run(this.data);
        }
        static run(this:void,data:IOrderData){
            let v=exec(data.node,data.condition);
            if(v instanceof VNode){
                replaceNodeByNode(data.node,v);
                return;
            }
            replaceNodeByNode(data.node,$$$(''+v,ENodeType.Text));
        }
    }
}
