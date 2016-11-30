
/// <reference path='VOrder.ts'/>
/// <reference path='../If.ts'/>
namespace Order {
    extendsOrderFunction(If,'tryRun',function(this:If){
        for(const block of this.blocks){
            test(this.placeholder, block.condition);
        }
    });
}