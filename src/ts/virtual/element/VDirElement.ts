/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dir", nodeType?: 1): VMElement.VDirElement&IVNodeMethod
}
namespace VMElement{
    export class  VDirElement extends VHtmlElement{
        nodeName="DIR"
        compact:string
        cloneNode(deep:boolean=false):VDirElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["compact"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VDirElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VDirElement,["compact"]);
}