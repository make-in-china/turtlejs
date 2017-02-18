
/// <reference path='VOrder.ts'/>
/// <reference path='Break.ts'/>
/// <reference path='orderEx/Vorder.ts'/>
namespace Order {
    export interface IOrderDataBlock extends IOrderData {
        placeholder: VMDOM.VPlaceHolder
        blocks: IOrderBlock[]
    }
    export interface IOrderDataBlockRun extends IOrderDataBlock {
        isBreak:boolean
    }
    export interface IOrderBlock {
        order: string
        // setup: IOrderSetup
        condition:string
        nodes:VMDOM.VNode[] 
    }
    export abstract class BlockOrder extends VOrder {
        /**
         * 数据块
         * 
         * @type {IOrderDataBlock}
         * @memberOf BlockOrder
         */
        data: IOrderDataBlock
        /**
         * 
         * 
         * @type {VMDOM.VComment}
         * @memberOf BlockOrder
         */
        endNode: VMDOM.VComment
        /**
         * Creates an instance of BlockOrder.
         * 
         * @param {VMDOM.VComment} node
         * @param {IOrderSetup} setup
         * @param {string} orderName
         * @param {(subOrder: string) => boolean} isBlockStart
         * 
         * @memberOf BlockOrder
         */
        constructor(node: VMDOM.VComment, setup: IOrderSetup, orderName: string,isBlockStart:(subOrder: string) => boolean) {
            super(node, setup);
            let data = this.data;
            data.blocks = [];
            let i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            let preOrderNode = node;
            let preNode = node;
            // let preInfo = info.params.innerText;
            let preSetup = setup;
            let blockNodes:INode[]=[];
            parseOrders(isBlockStart, (<INode>node.parentNode).childNodes, false, (node, subOrder, setup) => {
                switch (subOrder) {
                    case 'end':
                        blockNodes.push(preNode);
                        // data.blocks.push({ order: orderName, setup: preSetup, nodes: <VMDOM.VNode[]>takeBlockBetween(preOrderNode, node) });
                        data.blocks.push({ order: orderName, condition: preSetup.params.innerText, nodes:<any>preSetup.data.children  });
                        this.endNode = node;
                        return eTreeEach.c_stopEach;
                    case 'break':
                        return;
                    default:
                        blockNodes.push(preNode);
                        // data.blocks.push({ order: orderName, setup: preSetup, nodes: <VMDOM.VNode[]>takeBlockBetween(preOrderNode, node) });
                        data.blocks.push({ order: orderName, condition: preSetup.params.innerText, nodes:<any>preSetup.data.children });
                        preOrderNode = node;
                        preSetup = setup;
                        preNode = node;
                        orderName = subOrder;
                        return eTreeEach.c_noIn;
                }
            }, i + 1);
            for (const blockNode of blockNodes) {
                (<IHTMLElement>blockNode.parentNode).removeChild(blockNode);
            }
            data.placeholder = $$$("PlaceHolder", ENodeType.PlaceHolder);
            replaceNodeByNode(this.endNode, data.placeholder);
        }

    }
    //必须注册end；
    addSubOrderName('end');




    /**
     * 继续解析内部Order
     * 
     * @param {void} this
     * @param {IOrderDataBlock} data
     * @param {(subOrder: string) => boolean} isBlockStart
     * @param {IArray<INode>} array
     * @param {boolean} run
     * @param {((
     *             node:VMDOM.VComment,
     *             subOrder:string,
     *             setup:IOrderSetup,
     *             state:ITreeEachState<INode>
     *         )=>(eTreeEach|void))} [fn]
     * @param {number} [beginIndex=0]
     * @returns {(ITreeEachReturn<INode> | undefined)}
     */
    function parseOrders(
        this:void,
        isBlockStart: (subOrder: string) => boolean,
        array:IArray<INode>,
        run:boolean,
        fn?:(
            node:VMDOM.VComment,
            subOrder:string,
            // setup:IOrderSetup,
            state:ITreeEachState<INode>
        )=>(eTreeEach|void),
        beginIndex:number=0
    ):ITreeEachReturn<INode> | undefined{
        return VOrder.eachOrder(array, (node,info, state)=> {
            
            if (info.order) {
                if(info.order==='break'&&fn){
                    return fn(node,'break',state);
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
                if(subOrder==='end'||isBlockStart(subOrder)){
                    return fn(node,subOrder,state);
                }
            }
            return eTreeEach.c_noIn;
        }, beginIndex);
    }
    
    function runOrder(this:void,info: IOrderInfo, node: VMDOM.VComment){
        let orderName: string = <string>info.order;
        if (orderName in orders) {
            let order=new orders[orderName](node,info.setup);
            if(order.run&&OrderEx.canRunAtService(order)){
                order.run();
            }
        }
    }
    function parseBlock(this:void,info: IOrderInfo, node: VMDOM.VComment): BlockOrder|null {
        let orderName: string = <string>info.order;

        if (orderName in orders) {
            let order=orders[orderName];
            if(order.prototype instanceof BlockOrder){
                return <BlockOrder>new order(node,info.setup);
            }
        }
        return null;
    }
    export function parseBreakOrder(this:void,data: IOrderDataBlockRun,isBlockStart: (subOrder: string) => boolean,blocks:INode[]){
        parseOrders(isBlockStart,blocks,true,(node:VMDOM.VComment,subOrder,step)=>{
            if(subOrder==='break'){
                data.isBreak=true;
                //级联删除break后面的数据直至当前层；
                let node1:INode=node;
                let pNode=<INode>node.parentNode;
                let level=step.stack.length/2;
                while(level>1){
                    let cs=pNode.childNodes;
                    let length=cs.length;
                    let index=getNodeIndex2(node1)+1;
                    for(let i=index;i<length;i++){
                        //删除后面的数据；
                        pNode.removeChild(<INode>cs[index]);
                    }
                    node1=pNode;
                    pNode=<INode>pNode.parentNode;
                    level--;
                }
                for(var i=step.currentIndex+1;i<blocks.length;i++){
                    // pNode=<INode>blocks[i].parentNode;
                    pNode.removeChild(blocks[i]);
                }
                node.remove();
                return eTreeEach.c_stopEach;
            }
        });
    }



}