/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "pre", nodeType: 1): VPreElement&IVNodeMethod;
}
class  VPreElement extends VHTMLElement{
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