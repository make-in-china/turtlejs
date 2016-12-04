
/// <reference path='VOrder.ts'/>
/// <reference path='../While.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.While,tryRun,function(this:Order.While){
        let data=this.data;
        Order.test(data.placeholder, data.condition);
    });

    extendsOrderFunction(Order.While,replaceToScriptNode,function(this:Order.While){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `
    Order.While.run({
        condition:'${data.condition}',
        placeholder:this,
        isBreak:false,
        blocks:[
            ${blocks.join(`,
            `)}]
    });
`;
    });
}
