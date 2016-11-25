
/// <reference path='BlockOrder.ts'/>
namespace Order {
    export abstract class RepeatBlockOrder extends BlockOrder {
        abstract canRepeat():boolean;
        protected isBlockStart(subOrder:string):boolean{
            return subOrder==='end'
        }
        private tempBlocks:INode[]=[];
        private parseRepeatBlock(){
            let blocks=this.blocks[0].blocks;
            let cloneBlocks:INode[]=[];
            for(var i=0;i<blocks.length;i++){
                cloneBlocks.push(blocks[i].cloneNode(true));
            }
            insertNodesBefore(this.placeholder , cloneBlocks);
            let p=this.placeholder.parentNode;
            //执行order
            this.parseBreakOrder(cloneBlocks,<INode>p);
            if(!this.isBreak&&this.canRepeat()){
                this.parseRepeatBlock();
            }
        }
        run(){
            if(this.canRepeat()){
                this.parseRepeatBlock();
            }
            this.placeholder.remove();
        }
    }
}