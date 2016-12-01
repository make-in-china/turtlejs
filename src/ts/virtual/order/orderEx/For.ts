
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
namespace Order {
    extendsOrderFunction(For,EXFunction.tryRun,function(this:For){
        if (this.forMode === JS.EForMode.In) {
            test(this.placeholder, this.forInInfo.object)
        } else {
            
            if(isString( this.forStepInfo.first)){
                test(this.placeholder, this.forStepInfo.first);
            }else{
                tryRunVarInfos(this.placeholder,this.forStepInfo.first);
            }
            test(this.placeholder, this.forStepInfo.step);
            test(this.placeholder, this.forStepInfo.exec);
        }
    });
}
