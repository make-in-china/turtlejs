
/// <reference path='VOrder.ts'/>
namespace Order {
    export interface IOrderBlock{
        order:string
        condition:string
        node:IComment
        blocks:INode[]
    }
    export abstract class BlockOrder extends VOrder {
        endNode: IComment
        placeholder:IComment
        protected abstract isBlockStart(subOrder:string):boolean;
        blocks:IOrderBlock[]=[];
        constructor(node:IComment,condition:string,orderName:string){
            super(node,condition);
            let i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            let preOrderNode=this.node;
            let preNode=node;
            let preCondition=condition;
            this.parseOrders((<INode>this.node.parentNode).childNodes, (node,subOrder,condition, step)=> {
                if(subOrder==='end'){
                    this.blocks.push({order:orderName,condition:preCondition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                    this.endNode=node;
                }else if(this.isBlockStart(subOrder)){
                    this.blocks.push({order:orderName,condition:preCondition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                    preOrderNode=node;
                    preCondition=condition;
                    preNode=node;
                    orderName=subOrder;
                }
                return eTreeEach.c_noIn;
            }, i + 1);
            for(const block of this.blocks){
                block.node.remove();
            }
            this.placeholder=$$$("placeholder",8);
            replaceNodeByNode(this.endNode,this.placeholder);
        }
        protected parseOrders(array:INode[]|INodeList,fn?:(node:IComment,subOrder:string,condition:string,step:ITreeEachStep)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
            return this.eachOrder(array, (node,info, step)=> {
                if (info.order) {
                    if (this.parseBlock(info, node)) {
                        step.next = (<ITreeEachReturn>this.parseBlockResult).index - getNodeIndex2(node) + 1;
                    }
                    return eTreeEach.c_noRepeat & eTreeEach.c_noIn;
                }
                if(fn){
                    let subOrder=<string>info.subOrder;
                    if(subOrder==='end'||this.isBlockStart(subOrder)){
                        return fn(node,subOrder,info.condition,step);
                    }
                }
                return eTreeEach.c_noIn;
            }, beginIndex);
        }
        
        protected replaceCommentToBlock(block:INode[]){
            insertNodesBefore(this.placeholder, block);
            this.placeholder.remove();
        }
        protected parseBlock(info: ICommentOrderInfo, node: IComment): boolean {
            let orderName: string = <string>info.order;

            if (orderName in orders) {
                let order=orders[orderName];
                if(order.prototype instanceof BlockOrder){
                    new order(node,info.condition);
                    return true;
                }
            }
            return false;
        }
        
    }
    //必须注册end；
    addSubOrderName('end');
}