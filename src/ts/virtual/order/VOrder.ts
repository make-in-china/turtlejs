
/// <reference path='Lib.ts'/>
/// <reference path='../javascript/JavaScriptStatement.ts'/>

namespace Order {
    
    export interface IOrderData{
        placeholder:VMDOM.VComment
    }
    export abstract class VOrder {
        data:IOrderData=<any>{};
        node: VMDOM.VComment
        condition: string
        run(){
            (<IOrderConstructor>this.constructor).run(this.data);
        }
        constructor(node: VMDOM.VComment, condition: string) {
            this.node = node;
            this.condition = condition;
            this.data.placeholder=node;
        }
        static eachOrder(
                this:void,
                array:INode[]|INodeList,
                fn:(node:VMDOM.VComment,info:IOrderInfo,state:ITreeEachState<INode>)=>(eTreeEach|void),
                beginIndex:number=0
            ):ITreeEachReturn | undefined{
            return treeEach(array, 'childNodes', (node: INode, state)=> {
                if (!(node instanceof VMDOM.VComment)) {
                    return;
                }
                let info:IOrderInfo|null;
                if(node instanceof VMDOM.VOrder){
                    info = getOrderInfo(node);
                }else{
                    info = getOrderInfoByString(node.data);
                }
                if (!info) {
                    return;
                }
                return fn(node,info,state);
            },beginIndex);
        }
    }
}