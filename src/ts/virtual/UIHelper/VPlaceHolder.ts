
/// <reference path='../node/VNode.ts'/>

interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.PlaceHolder): VPlaceHolder&IVNodeMethod;
}
class VPlaceHolder extends VNode{
    nodeName="#placeholder"
    nodeType:ENodeType=ENodeType.PlaceHolder
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
    cloneNode(this:VPlaceHolder&IVNodeMethod):VPlaceHolder&IVNodeMethod{
        throw new Error("Can't cloneNode");
    }
    toJS():string{
        throw new Error("Can't toJS");
    }
    remove(){
        if(!this.parentNode){
            return;
        }
        this.parentNode.removeChild(<any>this);
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
}