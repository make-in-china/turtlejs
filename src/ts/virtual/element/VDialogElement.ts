/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "dialog", nodeType?: 1): VMElement.VDialogElement&IVNodeMethod
}
namespace VMElement{
    export class  VDialogElement extends VHtmlElement{
        nodeName="DIALOG";
        open:string
        cloneNode(deep:boolean=false):VDialogElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["open"]){
                if(this[name]!==""               $1
                }){
                    newNode[name]=this[name];
                }
            }
                return <VDialogElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(<any>VDialogElement,["open"]);
}