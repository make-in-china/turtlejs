/// <reference path="Attribute_Property.ts"/>
interface IVNodeMethod{
    (name: "input", nodeType: 1): VInputElement&IVNodeMethod;
}
class  VInputElement extends VElement{
    accept:string
    alt:string
    autocomplete:string
    autofocus:string
    checked:string
    dirName:string
    disabled:string
    formAction:string
    formEnctype:string
    formMethod:string
    formNoValidate:string
    formTarget:string
    height:string
    max:string
    maxLength:string
    min:string
    minLength:string
    multiple:string
    name:string
    pattern:string
    placeholder:string
    readOnly:string
    required:string
    size:string
    src:string
    step:string
    type:string
    value:string
    width:string
    align:string
    useMap:string
    autocapitalize:string
    webkitdirectory:string
    incremental:string
}
VAP.decorate(<any>VInputElement,["accept","alt","autocomplete","autofocus","checked","dirName","disabled","formAction","formEnctype","formMethod","formNoValidate","formTarget","height","max","maxLength","min","minLength","multiple","name","pattern","placeholder","readOnly","required","size","src","step","type","value","width","align","useMap","autocapitalize","webkitdirectory","incremental"]);