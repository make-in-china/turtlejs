
/// <reference path='VOrder.ts'/>
/// <reference path='../If.ts'/>
namespace Order {
    extendsOrderFunction(If,EXFunction.tryRun,function(this:If){
        let data=this.data;
        for(const block of data.blocks){
            test(data.placeholder, block.condition);
        }
    });

    extendsOrderFunction(If,EXFunction.toJS,function(this:If){
        
    });
}