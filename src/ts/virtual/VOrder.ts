

/// <reference path='VOrderData.ts'/>
/// <reference path='VOrderHelper.ts'/>
interface IOrderParseReturn {
    stack: [IArray | INode[], number];
    state: eTreeEach | undefined;
    array: IArray | INode[];
    index: number;
}

interface ICommentOrderInfo{
    order?: string;
    orderCase?: string;
    condition: string;
}
interface VNodeVMData{
    /**命令 */
    order:VOrderData
}

interface INode{
    __order__?:VOrderData
}
/**从注释中读取命令 */
function getCommentStringInfo(s:string):ICommentOrderInfo|null{
    let order=s.match(orderRE);
    if(order){
        return {order:trim(order[0]),condition:s.substring(order[0].length,s.length)}    
    }else{
        let orderCase=s.match(orderCaseRE);
        if(orderCase){
            return {orderCase:trim(orderCase[0]),condition:s.substring(orderCase[0].length,s.length)}  
        }
    } 
    return null;
}
abstract class VOrder{
    abstract name:string
    abstract isLogic:boolean
    abstract parse(info:ICommentOrderInfo,node:IComment):IOrderParseReturn|undefined;
    addOrderToNode(info:ICommentOrderInfo,node:INode,fnGetOrder:()=>VOrderData){
        let order:VOrderData;
        if(!node.__order__){
            order=fnGetOrder();
            node.__order__=order;
            order.name=<string>info.order;
            order.node=node;
            order.endNode=null;
            order.condition=info.condition;
            orderStack.push(order);
            order.parseBlockResult=this.parseBlock(node);
        }else{
            order=node.__order__;
        }
        return order.parseBlockResult;
    }
    private parseLogic(info:ICommentOrderInfo,node:IComment){
        /*不渲染，纯找结构*/
        let orderName:string=<string>info.order;
        if(orderName in VOrderHelper.logicOrders){
            return this.parse(info,node);
        }
    }
    parseBlock(node:INode){
        let i=getNodeIndex2(node);
        let isError=false;
        let error=function(msg){
            isError=true;
            alert(msg);
            return eTreeEach.c_stopEach;
        }

        return treeEach(<INode[]><any>(<INode>node.parentNode).childNodes,'childNodes',(node,step)=>{
            if(!isCommentNode(node)){
                return;
            }
            let info=getCommentStringInfo(getCommentText(node));
            if(!info){
                return;
            }
            if(info.order){
                let ret=this.parseLogic(info,node);
                if(ret){
                    step.next=ret.index-getNodeIndex2(node)+1;
                }
                return eTreeEach.c_noRepeat&eTreeEach.c_noIn;
            }
            if(info.orderCase==='end'){
                if(orderStack.length>0){
                    (<VOrderData>orderStack.pop()).endNode=node;
                    
                    return eTreeEach.c_stopEach;
                }else{
                    return error('语法错误：多余的end');
                }
            }
            return eTreeEach.c_noIn;
        },i+1);
        
    }
}