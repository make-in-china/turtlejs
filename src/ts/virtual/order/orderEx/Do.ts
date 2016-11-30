
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
namespace Order {
    extendsOrderFunction(Do,'tryRun',function(this:Do){
        test(this.placeholder, this.condition);
    });
}