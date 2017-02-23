
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.For,tryRun,function(this:Order.For){
        //只测试输入条件，不测试后期循环过程的变化
        let data=this.data;
        if (data.forMode === JS.EForMode.In) {
            
            if(data.forInInfo.var){
                Order.testSetValue(data.placeholder,data.forInInfo.var,undefined);
            }
            Order.test(data.placeholder, data.forInInfo.object)
        } else {
            
            if(isString( data.forStepInfo.first)){
                Order.test(data.placeholder, data.forStepInfo.first);
            }else{
                Order.tryRunVarInfos(data.placeholder,data.forStepInfo.first);
            }
            Order.test(data.placeholder, data.forStepInfo.step);
            Order.test(data.placeholder, data.forStepInfo.exec);
        }
    });
    extendsOrderFunction(Order.For,replaceToScriptNode,function(this:Order.For){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        let forStepInfo='';
        if(data.forStepInfo){
            forStepInfo=`{first:'${data.forStepInfo.first}',exec:'${data.forStepInfo.exec}',step:'${data.forStepInfo.step}'}`
        }else{
            forStepInfo='undefined';
        }
        let forInInfo='';
        if(data.forInInfo){
            forInInfo=`{object:'${data.forInInfo.object},names:'${data.forInInfo.names.join("','")}',var:'${data.forInInfo.var}'}`
        }else{
            forInInfo='undefined';
        }
        return `
            Order.For.run({
                forStepInfo:${forStepInfo},
                forInInfo:${forInInfo},
                forMode:${data.forMode},
                placeholder:this,
                blocks:[
                    ${blocks.join(`,
                    `)}]
            });
`;
    });
}
