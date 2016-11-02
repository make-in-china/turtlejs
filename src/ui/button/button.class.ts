/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./button.ts"/>
namespace Component{
    export class Button extends Part{
        constructor(
            template:PartTemplate,
            extPart:PartBase,
            props:Object,
            html:string,
            public outerChildNodes:INodeArray,
            public outerElement:IHTMLCollection
        ) {
            super(template,extPart,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
    }
}

