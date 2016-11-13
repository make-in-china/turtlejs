/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "textarea", nodeType?: 1): VMElement.VTextareaElement&IVNodeMethod;
}

namespace VMElement{
    export class  VTextareaElement extends VHTMLElement{
        nodeName="TEXTAREA";
        autofocus:string
        cols:string
        dirName:string
        disabled:string
        maxLength:string
        minLength:string
        name:string
        placeholder:string
        readOnly:string
        required:string
        rows:string
        wrap:string
        autocapitalize:string
        get value():string{
            return this.innerText;
        }
        set value(v:string){
            this.innerText=v;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{}
    }
    VAP.decorate(<any>VTextareaElement,["autofocus","cols","dirName","disabled","maxLength","minLength","name","placeholder","readOnly","required","rows","wrap","autocapitalize"]);
}