
/// <reference path='VOrder.ts'/>
namespace Order {
    /**仅作其他命令的辅助标记 */
    class Break extends VOrder {
        static orderName = "break"
        static subOrder=[];
        tryRun(){}
        run() {}
    }
    register(Break);
}