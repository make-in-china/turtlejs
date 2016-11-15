

class VOrderHelper{
    static orders:{[index:string]:VOrder}={};
    static logicOrders:{[index:string]:VOrder}={};
    static register(orders:VOrder[]){
        for(const order of orders){
            this.orders[order.name]=order;
            if(order.isLogic){
                this.logicOrders[order.name]=order;
            }
        }
    }
    static parseComment(node:VComment){
        let info=getCommentStringInfo(getCommentText(node));
        if(!info)return;
        if(!info.order){
            throw new Error("语法错误：不恰当的"+info.orderCase);
        }
        this.parseCommentOrder(info,node);
        if(node.vmData.order){
            if(node.vmData.order.endNode){
                node.vmData.order.run();
            }
        }
    }
    static exec(node:IComment,script:string):any{

    }
    private static parseCommentOrder(info:ICommentOrderInfo,node:IComment):IOrderParseReturn|undefined{
        let orderName:string=<string>info.order;
        if(orderName in this.orders){
            return this.orders[orderName].parse(info,node);
        }
        switch(info.order){
            case 'scope':
                this.parseScopeOrder(info,node,outerChildNodes,outerChildren,props,part);
                break;
            case 'let':
                execScope(info.condition,node,outerChildNodes,outerChildren,props,part);
                removeNode(node);
                break;
            case 'bind':
                bindPropertyByOrder(node,info.condition);
                break;
            case '-':
                bindExpressionsByOrder(node,info.condition);
                break;
            case '!':
                execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
                removeNode(node);
                break;
            case '=':
                let v=execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
                if(isObject(v)&&v.nodeType){
                    replaceNodeByNode(node,v);
                }else{
                    replaceNodeByNode(node,$node(v,3));
                }
                
                break;
            case 'content':
                replaceNodeByNodes(node,outerChildNodes);
                break;
            case 'elements':
                replaceNodeByNodes(node,outerChildren);
                break;
            case 'break':
                return this.parseBreakOrder(info,node,outerChildNodes,outerChildren,props,part);
            case 'async':
                return this.parseAsyncOrder(info,node,outerChildNodes,outerChildren,props,part);
        }
    }
}