
/// <reference path='VOrder.ts'/>
/// <reference path='../While.ts'/>
namespace Order {
    extendsOrderFunction(While,EXFunction.tryRun,function(this:While){
        test(this.placeholder, this.condition);
    });
}
