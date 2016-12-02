
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
namespace Order {
    extendsOrderFunction(Equal,EXFunction.tryRun,function(this:Equal){
        let data=this.data;
        test(data.node, data.condition);
    });
}