
/// <reference path='VOrder.ts'/>
/// <reference path='../Var.ts'/>
namespace Order {
    extendsOrderFunction(Var,EXFunction.tryRun,function(this:Var){
        tryRunVarInfos(this.node,this.varInfos);
    });
}
            