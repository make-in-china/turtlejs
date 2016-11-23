
/// <reference path='VDOM.ts'/>
/// <reference path='../lib/TreeEach.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path='./VElementHelper.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='order/VOrder.ts'/>
/// <reference path='order/If.ts'/>
/// <reference path='order/For.ts'/>
/// <reference path='order/Scope.ts'/>

class UIHelper{
    static fs=typeof require!== "undefined"&&require('fs');
    static getScriptString(className:string){
        return `namespace ComponentScript{
    export class ${className}{
        constructor(part:Component.${className}){
            
        }
    }
}`
    }
    static getViewString(className:string,propertyInfo:string){
        return `/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class ${className}{
        ${propertyInfo}
    }
}`
    }
    static getClassString(className:string){
        return `/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class ${className} extends Part{
        constructor(
            template:PartTemplate,
            props:Object,
            html:string,
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
    static buildProject(className:string,path:string){
        if(!this.fs.existsSync(path)){
            this.fs.mkdirSync(path);
        }
        
        let htmlPath=path+'/View.html';
        let classPath=path+'/Class.ts';
        let scriptPath=path+'/Script.ts';
        // let viewPath=path+'/View.ts';
        className=className[0].toUpperCase()+className.substr(1).toLowerCase();
        this.fs.writeFileSync(htmlPath,
`<div>
    <div ref="${className}"></div>
</div>`);
        this.fs.writeFileSync(classPath,this.getClassString(className));
        this.fs.writeFileSync(scriptPath,this.getScriptString(className));
        this.makeClass(htmlPath,className);
        // this.fs.writeFileSync(viewPath,this.template.view.replace(/\{\{className\}\}/g,className).replace('{{propertyInfo}}','tops:[]'));
    }
    static toClassName(node:VNode):string{
        if(isVComment(node)){
            return "VComment&IVNodeMethod"
        }else if(isVText(node)){
            return "VText&IVNodeMethod"
        }else if(isVDocType(node)){
            return "VDocumentType&IVNodeMethod"
        }else{
            let nodeName=node.nodeName;
            nodeName=nodeName[0]+nodeName.substr(1).toLowerCase();
            return 'VMElement.V'+nodeName+'Element&IVNodeMethod';
        }
    }
    static makeClass(path:string,className?:string){
        if(!className){
            className=path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
        }
        className=className[0].toUpperCase()+className.substr(1).toLowerCase();
        let html=this.fs.readFileSync(path);
        if(!isString(html)){
            html=html.toString();
        }
        let dom=VDOM(html);
        let tops:VNode[];
        let chds:VNode | IArray;
        if(isArray(dom)){
            chds=dom;
            tops=dom
        }else{
            chds=dom.childNodes;
            tops=[dom];
        }
        let refs:[string,VMElement.VHtmlElement][]=[];
        treeEach(<VNode[]>chds,"childNodes",(node,step)=>{
            if(node instanceof VComment){
                //解析注释里的命令
                let order=Order.parseComment(node);
                if(order&&order.run){
                    if(order.canRunAtService){
                        order.run();
                    }else if(order.undo){
                        //哎呀debugger
                        order.undo();
                    }
                };
                return eTreeEach.c_noIn;
                //解析命令
            }
        });
        treeEach(<VNode[]>chds,"childNodes",(node,step)=>{
            if(node instanceof VMElement.VHtmlElement){
                //解析ref
                let v=node.getAttribute("ref");
                if(v){
                    refs.push([v,node]);
                    node.removeAttribute("ref");
                }
                //解析class
            }
        });
        let propertys:string[]=[];
        for(let i=refs.length-1;i>=0;i--){
            let refInfo=refs[i];
            let name=refInfo[0];
            let refNode:VElement&IVNodeMethod=<any>refInfo[1];
            let p=refNode.parentNode;
            if(p){
                p.insertBefore($$$(name,20),refNode);
                p.removeChild(refNode);
            }
        }
        for(let i=refs.length-1;i>=0;i--){
            let refInfo=refs[i];
            let name=refInfo[0];
            let refNode=refInfo[1];
            propertys.push(name+':'+this.toClassName(refNode)+'=<any>'+refNode.toJSString());
        }
        let topsJS:string[]=[];
        let topsType:string[]=[];
        for(const top of tops){
            topsJS.push(top.toJSString());
            topsType.push(this.toClassName(top));
        }
        if(topsJS.length>0){
            propertys.push('tops:['+topsType.join('\n,')+']=[<any>'+topsJS.join(',<any>')+']');
        }
        let propertyInfo:string=propertys.join(';\n        ');
        this.fs.writeFileSync(path.replace(/View\.html$/,'View.ts'),this.getViewString(className,propertyInfo));
        //mixin .css  to  变量
    }
}
typeof exports!=="undefined"&&(exports.UIHelper=UIHelper);


