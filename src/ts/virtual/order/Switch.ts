
/// <reference path='BlockOrder.ts'/>
namespace Order {
    @register
    export class Switch extends BlockOrder {
        static orderName = "switch"
        static subOrder=["case","default"];
        constructor(node: VComment, condition: string) {
            super(node, condition,'switch',Switch.isBlockStart);
        }
        protected static isBlockStart(subOrder:string):boolean{
            switch (subOrder) {
                case 'case':
                case 'default':
                    return true
            }
            return false
        }
        run(){
            Switch.run(this.data);
        }
        static run(data:IOrderDataBlock){
            
            let hit=-1
            let blocks=data.blocks;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];
                if (block.order==='default'|| exec(data.placeholder, data.condition)===exec(data.placeholder, data.condition)) {
                    if(hit===-1){
                        hit=i;
                    }else if(hit===i-1){
                        hit++;
                    }else{
                        break;
                    }
                    insertNodesBefore(data.placeholder , block.nodes);
                    let p=data.placeholder.parentNode;
                    parseBreakOrder(data,block.nodes,<INode>p);
                    if(data.isBreak){
                        break;
                    }
                }
            }
        }
    }
}