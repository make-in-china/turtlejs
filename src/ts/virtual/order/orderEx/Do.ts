
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
namespace Order {
    extendsOrderFunction(Do,EXFunction.tryRun,function(this:Do){
        let data=this.data;
        test(data.placeholder, data.condition);
    });
}