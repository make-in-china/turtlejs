
/// <reference path='VOrder.ts'/>
/// <reference path='../While.ts'/>
namespace Order {
    extendsOrderFunction(While,EXFunction.tryRun,function(this:While){
        let data=this.data;
        test(data.placeholder, data.condition);
    });
}
