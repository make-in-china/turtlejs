
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
    extendsOrderFunction(For,EXFunction.toJS,function(this:For){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `(function(this:VScript){
            let data={
                condition:'${data.condition}',
                isBlockStart:Order.RepeatBlockOrder.isBlockStart,
                placeholder:this,
                isBreak:false,
                blocks:[${blocks.join(',')}]
            }; 
            Order.For.run(data);
        },ENodeType.Script).run()`;
    });
}
