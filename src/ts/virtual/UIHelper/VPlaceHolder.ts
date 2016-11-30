
/// <reference path='../node/VNode.ts'/>

abstract class VPlaceHolder extends VNode{
    data:string
    constructor(data:string){
        super();
        this.data=data;
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