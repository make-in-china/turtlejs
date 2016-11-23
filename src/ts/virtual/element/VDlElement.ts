/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dl", nodeType?: 1): VMElement.VDlElement&IVNodeMethod
}
namespace VMElement{
    export class  VDlElement extends VHtmlElement{
        nodeName="DL"
        compact:string
        cloneNode(deep:boolean=false):VDlElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["compact"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VDlElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VDlElement,["compact"]);
}