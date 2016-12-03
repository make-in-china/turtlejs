
/// <reference path='VOrder.ts'/>
/// <reference path='../If.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.If,tryRun,function(this:Order.If){
        let data=this.data;
        for(const block of data.blocks){
            Order.test(data.placeholder, block.condition);
        }
    });

    extendsOrderFunction(Order.If,replaceToScriptNode,function(this:Order.If){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `(Order.If.run({
                isBlockStart:Order.If.isBlockStart,
                isBreak:false,
                placeholder:this,
                blocks:[${blocks.join(',')}]
            });`;
    });
    
    export function getBlocksDataString(data:Order.IOrderDataBlock){
        let blocks:string[]=[];
        for(const block of data.blocks){
            let nodes:string[]=[];
            for(const node of block.nodes){
                nodes.push(node.toJS());
            }
            let nodesString:string='';
            if(nodes.length>0){
                nodesString='$$$'+nodes.join(',$$$');
            }
            blocks.push(`{
                order:'${block.order}',
                condition:'${block.condition}',
                nodes:[${nodesString}]
            }`);
        }
        return blocks;
    }
}