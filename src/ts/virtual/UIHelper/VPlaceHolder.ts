
/// <reference path='../node/VNode.ts'/>

interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.PlaceHolder): VPlaceHolder&IVNodeMethod;
}
class VPlaceHolder extends VComment{
    nodeName="#placeholder"

    toHTMLString(): string[] {
        throw new Error("Can't toHTMLString");
    }
    remove(){
        if(!this.parentNode){
            return;
        }
        this.parentNode.removeChild(<any>this);
    }
}