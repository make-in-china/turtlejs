
/// <reference path='Lib.ts'/>

namespace Order {
    
    export abstract class VOrder {
        node: IComment;
        condition: string;
        run?(): void
        undo?():void
        constructor(node: IComment, condition: string) {
            this.node = node;
            this.condition = condition;
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