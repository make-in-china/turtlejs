/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "textarea", nodeType: 1): VTextareaElement&IVNodeMethod;
}
class  VTextareaElement extends VHTMLElement{
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
}
VAP.decorate(<any>VTextareaElement,["autofocus","cols","dirName","disabled","maxLength","minLength","name","placeholder","readOnly","required","rows","wrap","autocapitalize"]);