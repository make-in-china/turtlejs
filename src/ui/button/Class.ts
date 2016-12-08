/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./View.ts"/>
namespace Component{
    export class Button{
        constructor(
            props:Object,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            // super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
        dom=new ComponentView.Button
    }
}

