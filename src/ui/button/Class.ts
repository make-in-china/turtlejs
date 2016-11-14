/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
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
        dom={
            main:VNodeHelp("DIV")(`测试`,8).$(`测试`,8).$
        ("SCRIPT")(`
        var vdom=VDOM(document.documentElement.outerHTML);
        var data=vdom.toJSString();
        console.log("<js:>\n",data);
        var dom=eval(data);
        console.log("<dom:>\n",dom.nodeName);
        console.log("<dom.innerHTML:>\n",dom.innerHTML);
    `,3).$.$
        }
    }
}

