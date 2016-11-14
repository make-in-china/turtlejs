class VElementHelper{
    private static build(name,datas){
        var decorates=[];
        for(var i in datas){
            decorates.push(datas[i]);
        }
        let className=`V${name[0]+name.substr(1).toLowerCase()}Element`;
        var propertys=decorates.join(`:string
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
    private static checkAttr_Prop(name){
        var elem=document.createElement(name);
        var names=[];
        for(var i in elem){
            elem.setAttribute(i,"1");
            if(elem[i]==="1"){
                names.push(i);
            }
        }
        return names;
    }
    private static buildByName(name):string{
        return this.build(name.toUpperCase(),this.checkAttr_Prop(name));
    }
}
