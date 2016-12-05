/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "br", nodeType?: 1): VMElement.VBrElement&IVNodeMethod
}
namespace VMElement{
    @mergeClass({clear:''})
    export class  VBrElement extends VHtmlElement{
        nodeName="BR";
        clear:string;
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}