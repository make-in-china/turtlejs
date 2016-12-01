
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
namespace Order {
    extendsOrderFunction(Equal,EXFunction.tryRun,function(this:Equal){
        test(this.node, this.condition);
    });
}