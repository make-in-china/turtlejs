
/// <reference path='VNode.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.PlaceHolder): VMDOM.VPlaceHolder&IVNodeMethod;
}

namespace VMDOM{
    export class VPlaceHolder extends VComment{
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
    bindClassToFunctionHelper[ENodeType.PlaceHolder]=function(node:IVNodeMethod & VNode,nodeName: string){
        node.__proto__=VPlaceHolder.prototype;
        VPlaceHolder.call(node,nodeName);
    }
}