
/// <reference path='Lib.ts'/>

namespace Order {
    export interface IOrderData{
        node: IComment
        condition: string
    }
    export abstract class VOrder {
        data:IOrderData=<any>{};
        run?(): void
        constructor(node: IComment, condition: string) {
            this.data.node = node;
            this.data.condition = condition;
        }
        protected eachOrder(array:INode[]|INodeList,fn:(node:IComment,info:ICommentOrderInfo,state:ITreeEachState<INode>)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
            return treeEach(array, 'childNodes', (node: INode, state)=> {
                if (!(node instanceof VComment)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                return fn(node,info,state);
            },beginIndex);
        }
    }
}