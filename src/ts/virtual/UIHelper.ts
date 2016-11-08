
/// <reference path='VDOM.ts'/>

class UIHelper{
    static fs=require('fs');
    static template=`/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class {{className}} extends Part{
        constructor(
            template:PartTemplate,
            props:Object,
            html:string,
            public outerChildNodes:INodeArray,
            public outerElement:IHTMLCollection
        ) {
            super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.{{className}}(this);
        }
    }
}`
    static makeClass(path:string){
        var html=this.fs.readdirSync(path);
        var data=VDOM(html).toJS;
        console.log(data);
    }
}