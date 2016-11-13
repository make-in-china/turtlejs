/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "pre", nodeType?: 1): VMElement.VPreElement&IVNodeMethod;
}

namespace VMElement{
    export class  VPreElement extends VHtmlElement{
        nodeName="PRE";
        width:string
        protected doToDOM(): Node {
            let elem=this.doBaseToDOM();
            let chds = this.childNodes;
            if (chds.length > 0) {
                (<Element>elem).innerHTML = decodeHTML((<VNode>chds[0]).getData());
            }
            return elem;
        }
    }
    VAP.decorate(<any>VPreElement,["width"]);
}