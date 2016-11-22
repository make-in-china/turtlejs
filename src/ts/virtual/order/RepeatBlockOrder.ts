
/// <reference path='BlockOrder.ts'/>
namespace Order {
    export abstract class RepeatBlockOrder extends BlockOrder {
        isBreak: boolean
        abstract canRepeat():boolean;
        protected isBlockStart(subOrder:string):boolean{
            return subOrder==='break'
        }
        private tempBlocks:INode[]=[];
        private parseRepeatBlock(){
            let blocks=push.apply([],this.blocks[0].blocks);
            insertNodesBefore(this.endNode, blocks);
            let p=this.endNode.parentNode;
            this.parseOrders(blocks,(node:INode,subOrder,condition,step)=>{
                if(subOrder==='break'){
                    this.isBreak=true;
                }
                
                //级联删除break后面的数据直至当前层；
                let pNode=<INode>node.parentNode;
                while(node!==p){
                    let cs=pNode.childNodes;
                    let length=cs.length;
                    let index=getNodeIndex2(node)+1;
                    for(let i=index;i<length;i++){
                        //删除后面的数据；
                        pNode.removeChild(<INode>cs[index]);
                    }
                    node=pNode;
                    pNode=<INode>pNode.parentNode;
                }
                return eTreeEach.c_stopEach;
            });
            this.run(true);
        }
        run(isAgain=false){
            debugger;
            let canRepeat: boolean=this.isBreak?false:true;
            if(canRepeat){
                canRepeat=this.canRepeat();
            }
            if(canRepeat){
                this.parseRepeatBlock();
            }
            if(!isAgain){
                this.placeholder.remove();
            }
        }
    }
    //必须注册break；
    addSubOrderName('break');
}