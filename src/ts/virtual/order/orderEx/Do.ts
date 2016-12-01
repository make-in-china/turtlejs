
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
namespace Order {
    extendsOrderFunction(Do,EXFunction.tryRun,function(this:Do){
        test(this.placeholder, this.condition);
    });
}