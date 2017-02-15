
/// <reference path='VCharacterData.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Comment): VMDOM.VComment&IVNodeMethod;
}

function isVComment(node: VMDOM.VNode): node is VMDOM.VComment {
    return node.nodeType === ENodeType.Comment
}
interface VNodeVMData{
    /**是否有两个- */
    doubleMinus?:boolean;
}

interface Comment{
    vmData?:VNodeVMData
}
namespace VMDOM{
    @register('#comment',ENodeType.Comment)
    export class VComment extends VCharacterData{
        nodeName="#comment"
        nodeType:ENodeType=ENodeType.Comment
        private __value__=""
        constructor(data:any){
            super();
            if(isString(data)){
                this.__value__=data;
            }else if(isFunction(data)){
                this.__value__=getFunctionBlock(data);
            }else{
                this.__value__=data.toString();
            }
        }
        cloneNode(deep:boolean):VComment&IVNodeMethod{
            return $$$(this.__value__,ENodeType.Comment);
        }
        get data() {
            return this.__value__;
        }
        set data(s:string) {
            this.__value__ = s;
            if(this.vmData.domNode){
                (<Text>this.vmData.domNode).data = s;
            }
        }
        get textContent() {
            return this.__value__;
        }
        set textContent(s:string) {
            this.data=s
        }
        toCreateJS(space:number=0):string{
            return (new Array(space+1)).join(" ")+'(`'+ this.__value__+'`,ENodeType.Comment)';
        }
        toJS(space:number=0):string{
            return this.toCreateJS(space)+'.$';
        }
        toHTMLString(): string[] {
            let
                ret: string[] = [];
            if (this.vmData.doubleMinus) {
                ret.push('<!--' + this.data + '-->');
            } else {
                ret.push('<!' + this.data + '>');
            }
            return ret;
        }
        protected doToDOM():Comment{
            let elem = document.createComment(this.data);
            this.vmData.domNode = elem;
            return elem;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{}
        
        protected copyPropertyToNode(elem:Comment){
            elem.vmData=this.vmData;
            super.copyPropertyToNode(elem);
        }
    }
}