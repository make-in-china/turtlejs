
/// <reference path='VOrder.ts'/>
namespace Order {
    class Script extends VOrder {
        static orderName = ":"
        tryRun(){
            test(this.node, this.condition);
        }
        run(){
            replaceNodeByNode(this.node,$$$(exec(this.node,this.condition),3));
        }
    }
    register(Script);
}
