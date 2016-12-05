
/// <reference path='BlockOrder.ts'/>
namespace Order {
    
    export abstract class RepeatBlockOrder extends BlockOrder {
        constructor(node: VComment, condition: string, orderName: string) {
            super(node,condition,orderName,RepeatBlockOrder.isBlockStart);
        }
        static run(data:IOrderDataBlock,canRepeat:(data:IOrderDataBlock)=>boolean){
            if(canRepeat(data)){
                let runData:IOrderDataBlockRun=<any>data;
                runData.isBreak=false;
                parseRepeatBlock(runData,canRepeat);
            }
            data.placeholder.remove();
        }
        static isBlockStart(subOrder:string):boolean{
            return subOrder==='end'
        }
    }
    function parseRepeatBlock(this:void,data:IOrderDataBlockRun,canRepeat:(data:IOrderDataBlock)=>boolean){
        let nodes=data.blocks[0].nodes;
        let cloneBlocks:INode[]=[];
        for(var i=0;i<nodes.length;i++){
            cloneBlocks.push(nodes[i].cloneNode(true));
        }
        insertNodesBefore(data.placeholder , cloneBlocks);
        let p=data.placeholder.parentNode;
        //执行order
        parseBreakOrder(data,RepeatBlockOrder.isBlockStart,cloneBlocks,<INode>p);
        if(!data.isBreak&&canRepeat(data)){
            parseRepeatBlock(data,canRepeat);
        }
    }
}