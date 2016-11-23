/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "select", nodeType?: 1): VMElement.VSelectElement&IVNodeMethod
}

namespace VMElement{
    export class  VSelectElement extends VHtmlElement{
        nodeName="SELECT";
        autofocus:string
        disabled:string
        multiple:string
        name:string
        required:string
        size:string
        cloneNode(deep:boolean=false):VSelectElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["autofocus","disabled","multiple","name","required","size"]){
                if(this[name]!==undefined){
                    newNode[name]=this[name];
                }
            }
                return <VSelectElement&IVNodeMethod>newNode;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{
            this.setBridgeGetSet("value");
        }
    }
    VAP.decorate(<any>VSelectElement,["autofocus","disabled","multiple","name","required","size"]);
}