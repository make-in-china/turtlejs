
/// <reference path='VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: 3): VText&IVNodeMethod;
}

function isVText(node: VNode): node is VText {
    return node.nodeType === 3
}
class VText extends VNode{
    nodeName="#text"
    nodeType:VNodeType=3
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
    get value() {
        return this.__value__;
    }
    set value(s:string) {
        this.__value__ = s;
        if(this.vmData.domNode){
            (<Text>this.vmData.domNode).data = s;
        }
    }
    toJS():string{
        let s ='`'+ this.__value__+'`';
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
        return `(${s},3).$`;
    }
    toHTMLString(): string[] {
        return [this.__value__];
    }
    getData():string{
        return this.data;
    }
    protected doToDOM():Text{
        let elem:Text;
        if (this.data !== "") {
            let toHelp = document.createElement('__Turtle__');//用于创建
            toHelp.innerHTML = this.data;
            elem = <Text>toHelp.removeChild(toHelp.childNodes[0]);
            //elem=document.createTextNode(this.data);不用这句的原因是为了转码
        } else {
            elem = document.createTextNode('');
        }
        return elem;
    }
    cloneNode(this:VText&IVNodeMethod):VText&IVNodeMethod{
        return this(this.data,3);
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
}