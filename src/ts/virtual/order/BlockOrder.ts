
/// <reference path='VOrder.ts'/>
namespace Order {
    export interface IOrderBlock{
        order:string
        condition:string
        node:VComment
        blocks:VNode[]
    }
    export abstract class BlockOrder extends VOrder {
        endNode: VNode | null = null
        protected abstract isBlock(subOrder:string):boolean;
        blocks:IOrderBlock[]=[];
        constructor(node:VComment,condition:string){
            super(node,condition);
            let i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            let preOrderNode=this.node;
            let preNode=node;
            treeEach((<VNode&IVNodeMethod>this.node.parentNode).childNodes, 'childNodes', (node: VNode&IVNodeMethod, step)=> {
                if (!(node instanceof VComment)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                if (info.order) {
                    if (this.parseBlock(info, node)) {
                        step.next = (<ITreeEachReturn>this.parseBlockResult).index - getNodeIndex2(node) + 1;
                    }
                    return eTreeEach.c_noRepeat & eTreeEach.c_noIn;
                }
                let subOrder=<string>info.subOrder;
                if(subOrder==='end'){
                    this.blocks.push({order:subOrder,condition:condition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                    this.endNode=node;
                }else if(this.isBlock(subOrder)){
                    this.blocks.push({order:subOrder,condition:condition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                    preOrderNode=node;
                    condition=info.condition;
                    preNode=node;
                }
                return eTreeEach.c_noIn;
            }, i + 1);
        }
        private parseBlock(info: ICommentOrderInfo, node: VComment): boolean {
            /*不渲染，纯找结构*/
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
}