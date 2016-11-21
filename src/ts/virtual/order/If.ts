
/// <reference path='BlockOrder.ts'/>
namespace Order {
    class If extends BlockOrder {
        static name = "if"
        static isLogic = true
        static subOrder=["else","else if","end"];

        /**命中的命令块开端 */
        hit:VNode|null=null
        /**命令块是否拥有else */
        hasElse:boolean=false
        /**命中的结束块 */
        endHit:VNode|null=null
        protected isBlock(subOrder:string):boolean{
            switch (subOrder) {
                case 'else':
                case 'else if':
                    return true
            }
            return false
        }
        get canRunAtService(): boolean {
            try {
                for(const block of this.blocks){
                    exec(block.node, block.condition,null);
                }
                return true;
            } catch (error) {
                return false
            }
        }
        run() {
            this.hit = parseBool(exec(this.node, this.condition,null)) ? this.node : null;
            let blocks=this.blocks;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];

                if (this.hasElse) {
                    throw new Error(block.order+"不能出现在else后");
                } else {
                    if (block.order == 'else') {
                        this.hasElse = true;
                    }
                    if (!this.endHit) {
                        //之前未结束命中
                        if (this.hit) {
                            //完整的命中
                            this.endHit = block.node;
                        } else {
                            //是否新的块
                            if (block.order == 'else' || parseBool(exec(block.node, this.condition,null))) {
                                this.hit = block.node;
                            } else {
                                /*删除else if*/
                                removeNode(block.node);
                            }
                        }
                    }
                }
            }
            let p:IHTMLElement = <any>this.node.parentNode;
            if (!this.hit) {
                /*全部删除*/
                removeBlockBetween(this.node, <INode>this.endNode);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            } else {
                if (!this.endHit) {
                    this.endHit = this.endNode;
                }
                /*保留hit到break之间的内容*/
                let ns = takeBlockBetween(this.hit, <INode>this.endHit);
                if (ns){
                    insertNodesBefore(this.node, ns);
                }
                /*全部删除*/
                removeBlockBetween(this.node, <INode>this.endNode);
                console.log(p.innerHTML);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            }
        }
    }
    register(If);
}