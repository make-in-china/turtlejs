
/// <reference path='BlockOrder.ts'/>
namespace Order {
    export class If extends BlockOrder {
        static orderName = "if"
        static subOrder=["else if","else"];
        constructor(node: VComment, condition: string) {
            super(node, condition,'if');
        }
        protected isBlockStart(subOrder:string):boolean{
            switch (subOrder) {
                case 'else':
                case 'else if':
                    return true
            }
            return false
        }
        run() {
            let hit=-1;
            if( parseBool(exec(this.placeholder, this.condition))){
                hit=0;
            }
            let blocks=this.blocks;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];
                if (block.order === 'else'||parseBool(exec(this.placeholder, block.condition))) {
                    hit = i;
                    break;
                }
            }
            if (hit!==-1) {
                this.replaceCommentToBlock(this.blocks[hit].blocks);
            }
        }
    }
    register(If);
}