
/// <reference path='Lib.ts'/>

namespace Order {
    
    export abstract class VOrder {
        node: IComment;
        condition: string;
        run?(): void
        undo?():void
        parseBlockResult: ITreeEachReturn | undefined
        abstract canRunAtService:boolean;
        constructor(node: IComment, condition: string) {
            this.node = node;
            this.condition = condition;
        }
        protected eachOrder(array:INode[]|INodeList,fn:(node:IComment,info:ICommentOrderInfo,step:ITreeEachStep)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
            return treeEach(array, 'childNodes', (node: INode, step)=> {
                if (!(node instanceof VComment)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                fn(node,info,step);
            },beginIndex);
        }
    }
}