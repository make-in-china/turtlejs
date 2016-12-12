
/// <reference path="./View.ts"/>
namespace Component{
    export class Button{
        constructor(
            public props:ComponentView.IButtonProps,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            // super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
        dom=new ComponentView.Button
    }
}

