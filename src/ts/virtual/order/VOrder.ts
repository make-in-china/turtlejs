
/// <reference path='Lib.ts'/>

namespace Order {
    export interface IOrderData{
        placeholder:VComment
    }
    export abstract class VOrder {
        data:IOrderData=<any>{};
        node: VComment
        condition: string
        run(){
            (<IOrderConstructor>this.constructor).run(this.data);
        }
        constructor(node: VComment, condition: string) {
            this.node = node;
            this.condition = condition;
            this.data.placeholder=node;
        }
        static eachOrder(this:void,array:INode[]|INodeList,fn:(node:VComment,info:ICommentOrderInfo,state:ITreeEachState<INode>)=>(eTreeEach|void),beginIndex:number=0):ITreeEachReturn | undefined{
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