
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Do,tryRun,function(this:Order.Do){
        let data=this.data;
        Order.test(data.placeholder, data.condition);
    });


    
    extendsOrderFunction(Order.Do,replaceToScriptNode,function(this:Order.Do){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `
    Order.Do.run({
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