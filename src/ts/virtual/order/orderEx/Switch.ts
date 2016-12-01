
/// <reference path='VOrder.ts'/>
/// <reference path='../Switch.ts'/>
namespace Order {
    extendsOrderFunction(Switch,EXFunction.tryRun,function(this:Switch){
        for(const block of this.blocks){
            test(block.node, block.condition);
        }
    });
}