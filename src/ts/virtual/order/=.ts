
/// <reference path='VOrder.ts'/>
namespace Order {
    /**运行并插入返回的节点 */
    class Equal extends VOrder {
        static orderName = "="
        tryRun(){
            test(this.node, this.condition);
        }
        run(){
            let v=exec(this.node,this.condition);
            if(v instanceof VNode){
                replaceNodeByNode(this.node,v);
            }
        }
    }
    register(Equal);
}
