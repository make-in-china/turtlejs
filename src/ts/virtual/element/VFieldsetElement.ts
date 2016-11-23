/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "fieldset", nodeType?: 1): VMElement.VFieldsetElement&IVNodeMethod
}
namespace VMElement{
    export class  VFieldsetElement extends VHtmlElement{
        nodeName="FIELDSET"
        disabled:string
        name:string
        cloneNode(deep:boolean=false):VFieldsetElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["disabled","name"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VFieldsetElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VFieldsetElement,["disabled","name"]);
}