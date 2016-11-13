
/// <reference path='VDOM.ts'/>
/// <reference path='../lib/TreeEach.ts'/>
/// <reference path='../lib/is.ts'/>

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
        let html=this.fs.readFileSync(path);
        if(!isString(html)){
            html=html.toString();
        }
        let dom=VDOM(html);
        let chds:VNode | IArray;
        if(isArray(dom)){
            chds=dom;
        }else{
            chds=dom.childNodes;
        }
        let refs:string[]=[];
        treeEach(<VNode[]>chds,"childNodes",(node,step)=>{
            // if(isVText(node)){
            //     //不处理咯
            // }else if(isVComment(node)){
            //     //解析命令
            // }else if(isVHTMLElement(node)){
            //     let v=node.getAttribute("ref");
            //     if(v!==undefined){
                    
            //     }
            //     //解析ref
            //     //解析class
            // }
        })
        //mixin .css  to  变量
    }
}
exports.UIHelper=UIHelper;