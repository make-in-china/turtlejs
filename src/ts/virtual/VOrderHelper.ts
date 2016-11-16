
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
    static parseComment(node:IComment,run:boolean=false):VOrderData|undefined{
        let info=getCommentStringInfo(node.data);
        if(!info){
            return;
        }
        if(!info.order){
            throw new Error("语法错误：不恰当的"+info.orderCase);
        }
        let orderName:string=<string>info.order;
        if(!(orderName in this.orders)){
            return;
        }
        let ret = this.orders[orderName].parse(info, node, []);
        if (run && ret) {
            if (ret.endNode) {
                ret.run();
            }
        }
        return ret;
    }
    private static _exec=<(this:IComment,$$turtle$$:string)=>any>Function('$$turtle$$','with(this){return eval($$turtle$$)};');
    static exec(node:IComment,script:string):any{
        return this._exec.call(node,script);
    }
    // private static parseOrder(info:ICommentOrderInfo,node:IComment,orderStack:VOrderData[]):IOrderParseReturn|undefined{

        // switch(info.order){
        //     case 'scope':
        //         this.parseScopeOrder(info,node,outerChildNodes,outerChildren,props,part);
        //         break;
        //     case 'let':
        //         execScope(info.condition,node,outerChildNodes,outerChildren,props,part);
        //         removeNode(node);
        //         break;
        //     case 'bind':
        //         bindPropertyByOrder(node,info.condition);
        //         break;
        //     case '-':
        //         bindExpressionsByOrder(node,info.condition);
        //         break;
        //     case '!':
        //         execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
        //         removeNode(node);
        //         break;
        //     case '=':
        //         let v=execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
        //         if(isObject(v)&&v.nodeType){
        //             replaceNodeByNode(node,v);
        //         }else{
        //             replaceNodeByNode(node,$node(v,3));
        //         }
                
        //         break;
        //     case 'content':
        //         replaceNodeByNodes(node,outerChildNodes);
        //         break;
        //     case 'elements':
        //         replaceNodeByNodes(node,outerChildren);
        //         break;
        //     case 'break':
        //         return this.parseBreakOrder(info,node,outerChildNodes,outerChildren,props,part);
        //     case 'async':
        //         return this.parseAsyncOrder(info,node,outerChildNodes,outerChildren,props,part);
        // }
    // }
}