
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
namespace Order {
    extendsOrderFunction(For,EXFunction.tryRun,function(this:For){
        let data=this.data;
        if (this.forMode === JS.EForMode.In) {
            test(data.placeholder, this.forInInfo.object)
        } else {
            
            if(isString( this.forStepInfo.first)){
                test(data.placeholder, this.forStepInfo.first);
            }else{
                tryRunVarInfos(data.placeholder,this.forStepInfo.first);
            }
            test(data.placeholder, this.forStepInfo.step);
            test(data.placeholder, this.forStepInfo.exec);
        }
    });
}
