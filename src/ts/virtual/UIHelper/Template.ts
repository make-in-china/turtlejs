
namespace UIHelper{
    

    export function getScriptString(className:string){
        return `namespace ComponentScript{
    export class ${className}{
        constructor(part:Component.${className}){
            part.dom.initDOM(part.props);
        }
    }
}`
    }

    
    export function getViewString(className:string,propertyInfo:string,varInfo:string,domInitScript:string,scripts:string,props:string,defaultValuesInfo:string){
        return `/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export interface I${className}Props{
        ${props}
    }
    export class ${className}{${defaultValuesInfo!==''?`
        static defaultValuesInfo=[${defaultValuesInfo}];`:``}
        ${propertyInfo}
        initDOM(props:I${className}Props){
            ${varInfo}${domInitScript}
        }
    }
${scripts!==''?`
    //因为无法推测运行结果，所以生成中间数据算法在此
    ${scripts}`:''}
}`
    }

    export function getClassString(className:string){
        return `/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class ${className} extends Part{
        constructor(
            public props:ComponentView.I${className}Props,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.${className}(this);
        }
        dom=new ComponentView.${className}
    }
}`
    }
}