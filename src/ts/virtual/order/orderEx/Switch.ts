
/// <reference path='VOrder.ts'/>
/// <reference path='../Switch.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Switch,tryRun,function(this:Order.Switch){
        let data=this.data;
        for(const block of data.blocks){
            Order.test(data.placeholder, block.condition);
        }
    });
    extendsOrderFunction(Order.Switch,replaceToScriptNode,function(this:Order.Switch){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `
            Order.Switch.run({
                condition:'${data.condition}',
                placeholder:this,
                blocks:[
                    ${blocks.join(`,
                    `)}]
            });
`;
    });
}