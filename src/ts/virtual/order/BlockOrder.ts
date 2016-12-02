
/// <reference path='VOrder.ts'/>
/// <reference path='Break.ts'/>
namespace Order {
    export interface IOrderDataBlock extends IOrderData {
        isBreak: boolean
        placeholder: VPlaceHolder
        blocks: IOrderBlock[];
        isBlockStart: (subOrder: string) => boolean
    }
    export interface IOrderBlock {
        order: string
        condition: string
        nodes: VNode[]
    }
    export abstract class BlockOrder extends VOrder {
        data: IOrderDataBlock
        endNode: IComment
        constructor(node: IComment, condition: string, orderName: string,isBlockStart:(subOrder: string) => boolean) {
            super(node, condition);
            let data = this.data;
            this.data.isBlockStart=isBlockStart;
            data.blocks = [];
            let i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            let preOrderNode = node;
            let preNode = node;
            let preCondition = condition;
            let blockNodes:INode[]=[];
            parseOrders(data, (<INode>node.parentNode).childNodes, false, (node, subOrder, condition, state) => {
                switch (subOrder) {
                    case 'end':
                        blockNodes.push(preNode);
                        data.blocks.push({ order: orderName, condition: preCondition, nodes: <VNode[]>takeBlockBetween(preOrderNode, node) });
                        this.endNode = node;
                        return eTreeEach.c_stopEach;
                    case 'break':
                        return;
                    default:
                        blockNodes.push(preNode);
                        data.blocks.push({ order: orderName, condition: preCondition, nodes: <VNode[]>takeBlockBetween(preOrderNode, node) });
                        preOrderNode = node;
                        preCondition = condition;
                        preNode = node;
                        orderName = subOrder;
                        return eTreeEach.c_noIn;
                }
            }, i + 1);
            for (const blockNode of blockNodes) {
                (<IHTMLElement>blockNode.parentNode).removeChild(blockNode);
            }
            data.placeholder = $$$("", ENodeType.PlaceHolder);
            replaceNodeByNode(this.endNode, data.placeholder);
        }

    }
    //必须注册end；
    addSubOrderName('end');




    function parseOrders(this:void,data:IOrderDataBlock,array:INode[]|INodeList,run:boolean,fn?:(node:IComment,subOrder:string,condition:string,state:ITreeEachState<INode>)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
        return VOrder.eachOrder(array, (node,info, state)=> {
            
            if (info.order) {
                if(info.order==='break'&&fn){
                    return fn(node,'break',"",state);
                }else{
                    if(run){
                        runOrder(info,node);
                    }else{
                        let innerBlock=parseBlock(info, node);
                        if (innerBlock) {
                            state.nextStepLength = getNodeIndex2(innerBlock.data.placeholder) - getNodeIndex2(node) + 1;
                        }
                        return eTreeEach.c_noRepeat & eTreeEach.c_noIn;
                    }
                }
            }
            if(fn){
                let subOrder=<string>info.subOrder;
                if(subOrder==='end'||data.isBlockStart(subOrder)){
                    return fn(node,subOrder,info.condition,state);
                }
            }
            return eTreeEach.c_noIn;
        }, beginIndex);
    }
    
    function runOrder(this:void,info: ICommentOrderInfo, node: IComment): VOrder|null {
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
    function parseBlock(this:void,info: ICommentOrderInfo, node: IComment): BlockOrder|null {
        let orderName: string = <string>info.order;

        if (orderName in orders) {
            let order=orders[orderName];
            if(order.prototype instanceof BlockOrder){
                return <BlockOrder>new order(node,info.condition);
            }
        }
        return null;
    }
    export function parseBreakOrder(this:void,data: IOrderDataBlock,blocks:INode[],p:INode){
        parseOrders(data,blocks,true,(node:IComment,subOrder,condition,step)=>{
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