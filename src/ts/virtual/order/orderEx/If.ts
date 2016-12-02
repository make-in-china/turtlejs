
/// <reference path='VOrder.ts'/>
/// <reference path='../If.ts'/>
namespace Order {
    extendsOrderFunction(If,EXFunction.tryRun,function(this:If){
        let data=this.data;
        for(const block of data.blocks){
            test(data.placeholder, block.condition);
        }
    });

    extendsOrderFunction(If,EXFunction.toJS,function(this:If){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `(function(this:VScript){
            let data={
                condition:'${data.condition}',
                isBlockStart:Order.If.isBlockStart,
                isBreak:false,
                placeholder:this,
                blocks:[${blocks.join(',')}]
            }; 
            Order.If.run(data);
        },ENodeType.Script).run()`;
    });
    
    export function getBlocksDataString(data:IOrderDataBlock){
        let blocks:string[]=[];
        for(const block of data.blocks){
            let nodes:string[]=[];
            for(const node of block.nodes){
                nodes.push(node.toJS());
            }
            blocks.push(`{
    order:'${block.order}',
    condition:'${block.condition}',
    nodes:[${nodes.join(',')}]
}`);
        }
        return blocks;
    }
}