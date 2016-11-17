class VElementHelper{
    private static build(name:string,datas:string[]){
        let decorates=[];
        for(let i in datas){
            decorates.push(datas[i]);
        }
        let className=`V${name[0]+name.substr(1).toLowerCase()}Element`;
        let propertys=decorates.join(`:string
        `)+':string';
        return `/// <reference path="../Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "${name.toLowerCase()}", nodeType?: 1): VMElement.${className}&IVNodeMethod;
}
namespace VMElement{
    export class ${className} extends VHtmlElement{
        nodeName="${name.toUpperCase()}"
        ${propertys}
    }
    VAP.decorate(<any>${className},[${'"'+decorates.join('","')+'"'}]);
}`
    }
    private static checkAttr_Prop(name:string){
        let elem=document.createElement(name);
        let names=[];
        for(let i in elem){
            elem.setAttribute(i,"1");
            if((<any>elem)[i]==="1"){
                names.push(i);
            }
        }
        return names;
    }
    private static buildByName(name:string):string{
        return this.build(name.toUpperCase(),this.checkAttr_Prop(name));
    }
}
