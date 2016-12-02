
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
namespace Order {
    extendsOrderFunction(For,EXFunction.tryRun,function(this:For){
        let data=this.data;
        if (data.forMode === JS.EForMode.In) {
            test(data.placeholder, data.forInInfo.object)
        } else {
            
            if(isString( data.forStepInfo.first)){
                test(data.placeholder, data.forStepInfo.first);
            }else{
                tryRunVarInfos(data.placeholder,data.forStepInfo.first);
            }
            test(data.placeholder, data.forStepInfo.step);
            test(data.placeholder, data.forStepInfo.exec);
        }
    });
}
