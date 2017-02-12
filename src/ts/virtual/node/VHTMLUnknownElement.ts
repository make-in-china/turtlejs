
/// <reference path='VHtmlElement.ts'/>

function isVHTMLUnknownElement(node: VMDOM.VNode): node is VMDOM.VHTMLUnknownElement {
    return node instanceof VMDOM.VHTMLUnknownElement;
}
namespace VMDOM{
    @register('#htmlunknownelement', -1)
    export class VHTMLUnknownElement extends VHtmlElement{
        constructor(nodeName:string){
            super();
            this.nodeName=nodeName.toUpperCase();
        }
    }
}