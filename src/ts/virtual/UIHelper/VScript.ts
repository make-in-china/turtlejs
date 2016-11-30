
/// <reference path='../node/VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Script): VMember&IVNodeMethod;
}
class VScript extends VNode{
    nodeName="#script"
    nodeType:ENodeType.Script=ENodeType.Script
    data:string
    constructor(data:string){
        super();
        this.data=data;
    }
    toJS():string{
        return `.$.appendChild(this.${this.data}).$`;
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