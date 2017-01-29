
/// <reference path="View.ts"/>
namespace Component{
    @register
    export class Button extends Part{
        constructor(
            public props:ComponentView.IButtonProps,
            public outerChildNodes?:INode[]
        ) {
            super("button",new ComponentView.Button,props,outerChildNodes);
            new ComponentScript.Button(this);
        }
    }
}

