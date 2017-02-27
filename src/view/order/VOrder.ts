
/// <reference path='Lib.ts'/>
/// <reference path='../javascript/JavaScriptStatement.ts'/>

namespace Order {
    export interface IOrderSetup{
        params?:JS.JavaScriptBlock<'('>,
        data?:JS.JavaScriptBlock<'{'>
    }
    export interface IOrderData{
        placeholder:VMDOM.VComment
    }
    export abstract class VOrder {
        data:IOrderData=<any>{};
        run(){
            (<IOrderConstructor>this.constructor).run(this.data);
        }
        constructor(public node: VMDOM.VComment,public setup: IOrderSetup) {
            this.data.placeholder=node;
        }
        static eachOrder(
                this:void,
                array:IArray<INode>,
                fn:(node:VMDOM.VComment,info:IOrderInfo,state:ITreeEachState<INode>)=>(eTreeEach|void),
                beginIndex:number=0
            ):ITreeEachReturn<INode> | undefined{
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