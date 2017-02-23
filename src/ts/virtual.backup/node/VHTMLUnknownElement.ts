
/// <reference path='VHTMLElement.ts'/>

function isVHTMLUnknownElement(node: VMDOM.VNode): node is VMDOM.VHTMLUnknownElement {
    return node instanceof VMDOM.VHTMLUnknownElement;
}
namespace VMDOM{
    @register('#htmlunknownelement', -1)
    export class VHTMLUnknownElement extends VHTMLElement{
        constructor(public nodeName:string){
            super();
            this.nodeName=nodeName.toUpperCase();
        }
    }
}