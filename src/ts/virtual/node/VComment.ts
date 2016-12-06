
/// <reference path='VCharacterData.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Comment): VComment&IVNodeMethod;
}
function isVComment(node: VNode): node is VComment {
    return node.nodeType === ENodeType.Comment
}
interface VNodeVMData{
    /**是否有两个- */
    doubleMinus?:boolean;
}
class VComment extends VCharacterData{
    nodeName="#Comment"
    nodeType:ENodeType.Comment=ENodeType.Comment
    private __value__=""
    cloneNode(deep:boolean):VComment&IVNodeMethod{
        return $$$(this.__value__,ENodeType.Comment);
    }
    constructor(data:string){
        super();
        this.__value__=data;
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
    /**
     * 用自身做环境调用函数,并返回父
     */
    __(fn:(node:VNode)=>void): VElement&IVNodeMethod{
        fn.call(this)
        return <VElement&IVNodeMethod>this.parentNode;
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
        return elem;
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
    
}