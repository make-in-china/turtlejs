
/// <reference path='BlockOrder.ts'/>
namespace Order {
    class Switch extends BlockOrder {
        static orderName = "switch"
        static subOrder=["case","default"];
        isBreak:boolean=false
        constructor(node: VComment, condition: string) {
            super(node, condition,'switch');
        }
        protected isBlockStart(subOrder:string):boolean{
            switch (subOrder) {
                case 'case':
                case 'default':
                    return true
            }
            return false
        }
        tryRun(){
            for(const block of this.blocks){
                test(block.node, block.condition);
            }
        }
        run(){
            let hit=-1
            let blocks=this.blocks;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];
                if (block.order==='default'|| exec(this.node, this.condition)===exec(block.node, this.condition)) {
                    if(hit===-1){
                        hit=i;
                    }else if(hit===i-1){
                        hit++;
                    }else{
                        break;
                    }
                    insertNodesBefore(this.placeholder , block.blocks);
                    let p=this.placeholder.parentNode;
                    this.parseBreakOrder(block.blocks,<INode>p);
                    if(this.isBreak){
                        break;
                    }
                }
            }
        }
        
    }
    register(Switch);
}