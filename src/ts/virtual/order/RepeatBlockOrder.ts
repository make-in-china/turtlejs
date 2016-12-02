
/// <reference path='BlockOrder.ts'/>
namespace Order {
    
    export abstract class RepeatBlockOrder extends BlockOrder {
        protected isBlockStart(subOrder:string):boolean{
            return subOrder==='end'
        }
        private static parseRepeatBlock(data:IOrderDataBlock,canRepeat:(data:IOrderDataBlock)=>boolean){
            let blocks=data.blocks[0].blocks;
            let cloneBlocks:INode[]=[];
            for(var i=0;i<blocks.length;i++){
                cloneBlocks.push(blocks[i].cloneNode(true));
            }
            insertNodesBefore(data.placeholder , cloneBlocks);
            let p=data.placeholder.parentNode;
            //执行order
            BlockOrder.parseBreakOrder(data,cloneBlocks,<INode>p);
            if(!data.isBreak&&canRepeat(data)){
                this.parseRepeatBlock(data,canRepeat);
            }
        }
        static run(data:IOrderDataBlock,canRepeat:(this:void,data:IOrderDataBlock)=>boolean){
            if(canRepeat(data)){
                this.parseRepeatBlock(data,canRepeat);
            }
            data.placeholder.remove();
        }
    }
}