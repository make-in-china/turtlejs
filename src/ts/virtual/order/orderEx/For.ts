
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.For,tryRun,function(this:Order.For){
        let data=this.data;
        if (data.forMode === JS.EForMode.In) {
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
            forStepInfo=JSON.stringify(data.forStepInfo);
        }else{
            forStepInfo='undefined';
        }
        let forInInfo='';
        if(data.forInInfo){
            forInInfo=JSON.stringify(data.forInInfo);
        }else{
            forInInfo='undefined';
        }
        return `
    Order.For.run({
        forStepInfo:${forStepInfo},
        forInInfo:${forInInfo},
        forMode:${data.forMode},
        placeholder:this,
        isBreak:false,
        blocks:[
            ${blocks.join(`,
            `)}]
    });
`;
    });
}
