
/// <reference path='VOrder.ts'/>
/// <reference path='Break.ts'/>
namespace Order {
    export interface IOrderDataBlock extends IOrderData{
        isBreak: boolean
        endNode: IComment
        placeholder:IComment
        blocks:IOrderBlock[];
    }
    export interface IOrderBlock{
        order:string
        condition:string
        node:IComment
        blocks:INode[]
    }
    export abstract class BlockOrder extends VOrder {
        data:IOrderDataBlock
        protected abstract isBlockStart(subOrder:string):boolean;
        constructor(node:IComment,condition:string,orderName:string){
            super(node,condition);
            let data=this.data;
            data.blocks=[];
            let i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            let preOrderNode=data.node;
            let preNode=node;
            let preCondition=condition;
            this.parseOrders((<INode>data.node.parentNode).childNodes,false, (node,subOrder,condition, state)=> {
                switch(subOrder){
                    case 'end':
                        data.blocks.push({order:orderName,condition:preCondition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                        data.endNode=node;
                        return eTreeEach.c_stopEach;
                    case 'break':
                        return;
                    default:
                        data.blocks.push({order:orderName,condition:preCondition,node:preNode,blocks:<VNode[]>takeBlockBetween(preOrderNode,node)});
                        preOrderNode=node;
                        preCondition=condition;
                        preNode=node;
                        orderName=subOrder;
                        return eTreeEach.c_noIn;
                }
            }, i + 1);
            for(const block of data.blocks){
                block.node.remove();
            }
            data.placeholder=$$$("placeholder",ENodeType.Comment);
            replaceNodeByNode(data.endNode,data.placeholder);
        }
        protected static parseOrders(array:INode[]|INodeList,run:boolean,fn?:(node:IComment,subOrder:string,condition:string,state:ITreeEachState<INode>)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
            return this.eachOrder(array, (node,info, state)=> {
                
                if (info.order) {
                    if(info.order==='break'&&fn){
                        return fn(node,'break',"",state);
                    }else{
                        if(run){
                            this.runOrder(info,node);
                        }else{
                            let innerBlock=this.parseBlock(info, node);
                            if (innerBlock) {
                                state.nextStepLength = getNodeIndex2(innerBlock.data.placeholder) - getNodeIndex2(node) + 1;
                            }
                            return eTreeEach.c_noRepeat & eTreeEach.c_noIn;
                        }
                    }
                }
                if(fn){
                    let subOrder=<string>info.subOrder;
                    if(subOrder==='end'||this.isBlockStart(subOrder)){
                        return fn(node,subOrder,info.condition,state);
                    }
                }
                return eTreeEach.c_noIn;
            }, beginIndex);
        }
        
        protected static replaceCommentToBlock(data:IOrderDataBlock,block:INode[]){
            insertNodesBefore(data.placeholder, block);
            data.placeholder.remove();
        }
        protected runOrder(info: ICommentOrderInfo, node: IComment): VOrder|null {
            let orderName: string = <string>info.order;

            if (orderName in orders) {
                let order=new orders[orderName](node,info.condition);
                if(order.run&&canRunAtService(order)){
                    order.run();
                }
                return order;
            }
            return null;
        }
        protected parseBlock(info: ICommentOrderInfo, node: IComment): BlockOrder|null {
            let orderName: string = <string>info.order;

            if (orderName in orders) {
                let order=orders[orderName];
                if(order.prototype instanceof BlockOrder){
                    return <BlockOrder>new order(node,info.condition);
                }
            }
            return null;
        }
        protected static parseBreakOrder(data: IOrderDataBlock,blocks:INode[],p:INode){
            this.parseOrders(blocks,true,(node:IComment,subOrder,condition,step)=>{
                if(subOrder==='break'){
                    data.isBreak=true;
                    //级联删除break后面的数据直至当前层；
                    let node1:INode=node;
                    let pNode=<INode>node.parentNode;
                    while(node1!==p){
                        let cs=pNode.childNodes;
                        let length=cs.length;
                        let index=getNodeIndex2(node1)+1;
                        for(let i=index;i<length;i++){
                            //删除后面的数据；
                            pNode.removeChild(<INode>cs[index]);
                        }
                        node1=pNode;
                        pNode=<INode>pNode.parentNode;
                    }
                    node.remove();
                    return eTreeEach.c_stopEach;
                }
            });
        }
    }
    //必须注册end；
    addSubOrderName('end');
}