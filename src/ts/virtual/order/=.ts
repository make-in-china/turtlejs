
/// <reference path='VOrder.ts'/>
namespace Order {
    /**运行并插入返回的节点 */
    export class Equal extends VOrder {
        static orderName = "="
        run(){
            let v=exec(this.node,this.condition);
            if(v instanceof VNode){
                replaceNodeByNode(this.node,v);
                return;
            }
            replaceNodeByNode(this.node,$$$(''+v,3));
        }
    }
    register(Equal);
}
