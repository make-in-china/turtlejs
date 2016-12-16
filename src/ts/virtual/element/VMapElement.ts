/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "map", nodeType?: 1): VMDOM.VMapElement&IVNodeMethod
}

namespace VMDOM{
    @mergeClass({name:''})
    export class  VMapElement extends VHtmlElement{
        nodeName="MAP";
        name:string
        
        constructor(){
            super();
            this.vmData.closeSelf=true;
        }
    }
    
}