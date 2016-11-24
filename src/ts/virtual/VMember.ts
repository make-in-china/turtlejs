
/// <reference path='VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: 20): VMember&IVNodeMethod;
}
class VMember extends VNode{
    nodeName="#member"
    nodeType:ENodeType=ENodeType.Member
    data:string
    constructor(data:string){
        super();
        this.data=data;
    }
    toJS():string{
        return `.appendChild(this.${this.data}).$`;
    }
    toHTMLString(): string[] {
        throw new Error("Can't toHTMLString");
    }
    getData():string{
        return this.data;
    }
    protected doToDOM():Node{
        throw new Error("Can't beDOM");
    }
    cloneNode(this:VMember&IVNodeMethod):VMember&IVNodeMethod{
        throw new Error("Can't cloneNode");
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
}