
namespace UIHelper{
    

    export function getScriptString(className:string){
        return `namespace ComponentScript{
    export class ${className}{
        constructor(part:Component.${className}){
        }
    }
}`
    }

    
    export function getViewString(className:string,propertyInfo:string,varInfo:string,domInitScript:string,scripts:string,props:string,defaultValuesInfo:string){
        return `/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:${(new Date()).toString()}

namespace ComponentView{
    export interface I${className}Props extends IProps{
        ${props}
    }
    export class ${className} implements IView{${defaultValuesInfo!==''?`
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

//本模块由引擎生成，请勿手动修改此文件
//生成时间:${(new Date()).toString()}

namespace Component{
    export class ${className} extends Part{
        partName="${className.toLowerCase()}"
        constructor(
            public props:ComponentView.I${className}Props,
            public outerChildNodes:INode[]
        ) {
            super(new ComponentView.${className},props,outerChildNodes);
            new ComponentScript.${className}(this);
        }
    }
}`
    }
}