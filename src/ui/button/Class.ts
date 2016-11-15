/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./View.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class Button extends Part{
        constructor(
            template:PartTemplate,
            props:Object,
            html:string,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
        dom=new ComponentView.Button
    }
}

