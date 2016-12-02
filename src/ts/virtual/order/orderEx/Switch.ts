
/// <reference path='VOrder.ts'/>
/// <reference path='../Switch.ts'/>
namespace Order {
    extendsOrderFunction(Switch,EXFunction.tryRun,function(this:Switch){
        let data=this.data;
        for(const block of data.blocks){
            test(block.node, block.condition);
        }
    });
}