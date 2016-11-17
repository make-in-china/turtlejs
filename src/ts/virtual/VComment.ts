
/// <reference path='VCharacterData.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: 8): VComment&IVNodeMethod;
}
function isVComment(node: VNode): node is VComment {
    return node.nodeType === 8
}
interface VNodeVMData{
    /**是否有两个- */
    doubleMinus?:boolean;
}
class VComment extends VCharacterData{
    nodeName="#Comment"
    nodeType:VNodeType=8
    private __value__=""
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
    toJS():string{
        let s ='`'+ this.data+'`';
        // s = s.replace(/[\'\"\r\n]/g, function (s: string) {
        //     switch (s) {
        //         case '\'':
        //         case '\"':
        //             return '\\' + s;
        //         case '\r':
        //             return '\\r';
        //         case '\n':
        //             return '\\n';
        //     }
        //     return "";
        // });
        return `(${s},8).$`;
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
    
    cloneNode(this:VComment&IVNodeMethod):VComment&IVNodeMethod{
        return this(this.data,8);
    }
}