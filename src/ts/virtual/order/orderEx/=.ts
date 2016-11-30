
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
namespace Order {
    extendsOrderFunction(Equal,'tryRun',function(this:Equal){
        test(this.node, this.condition);
    });
}