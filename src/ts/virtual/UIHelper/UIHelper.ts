
/// <reference path='VDOM.ts'/>
/// <reference path='../../lib/TreeEach.ts'/>
/// <reference path='../../lib/is.ts'/>
/// <reference path='./VElementHelper.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='../order/VOrder.ts'/>
/// <reference path='../order/If.ts'/>
/// <reference path='../order/For.ts'/>
/// <reference path='../order/Switch.ts'/>
/// <reference path='../order/while.ts'/>
/// <reference path='../order/Do.ts'/>
/// <reference path='../order/Scope.ts'/>
/// <reference path='../order/=.ts'/>
/// <reference path='../order/-.ts'/>
/// <reference path='../order/Script.ts'/>
/// <reference path='../order/orderEx/Index.ts'/>

class UIHelper{
    static fs=typeof require!== "undefined"&&require('fs');
    
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
        let chds:VNode[]| IArray;
        if(isArray(dom)){
            chds=dom;
            tops=dom
        }else{
            chds=dom.childNodes;
            tops=[dom];
        }
        let refs:[string,VMElement.VHtmlElement][]=[];
        treeEach(<VNode[]>chds,"childNodes",(node,state)=>{
            if(node instanceof VComment){
                //解析注释里的命令
                try{
                    let order=Order.parseComment(node);
                    if(order&&order.run){
                        if(Order.canRunAtService(order)){
                            order.run();
                        }else if(order.undo){
                            //哎呀debugger
                            order.undo();
                        }
                    };
                }catch(e){
                    throw getMakeClassError(path,node,(<Error>e).message,state);
                }
                return eTreeEach.c_noIn;
                //解析命令
            }
        });
        treeEach(<VNode[]>chds,"childNodes",(node,state)=>{
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
        let propertyNames:string[]=[];
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
        let propertyInitScript:{[index:string]:string}={};
        for(let i=refs.length-1;i>=0;i--){
            let refInfo=refs[i];
            let name=refInfo[0];
            let refNode=refInfo[1];
            propertyNames.push(name);
            propertys.push(name+':'+this.toClassName(refNode));
            propertyInitScript[name]=`this.${name}=<any>${refNode.toJSString()};`;
        }
        let topsJS:string[]=[];
        let topsType:string[]=[];
        for(const top of tops){
            topsJS.push(top.toJSString());
            topsType.push(this.toClassName(top));
        }
        let domInitScript:string;
        if(topsJS.length>0){
            propertys.push('tops:['+topsType.join('\n,')+'];');
            domInitScript=`
            push.call(this.tops,<any>[
                    ${topsJS.join(',\n                    ')}
            ]);`;
        }else{
            domInitScript='';
        }
        let propertyInfo:string=propertys.join(';\n        ');
        for(const name of propertyNames){
            domInitScript+='\n            '+propertyInitScript[name];
        }
        this.fs.writeFileSync(path.replace(/View\.html$/,'View.ts'),this.getViewString(className,propertyInfo,domInitScript));
        
        //mixin .css  to  变量
    }


    
    static getScriptString(className:string){
        return `namespace ComponentScript{
    export class ${className}{
        constructor(part:Component.${className}){
            part.dom.initDOM();
        }
    }
}`
    }
    static getViewString(className:string,propertyInfo:string,domInitScript:string){
        return `/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class ${className}{
        ${propertyInfo}
        initDOM(){${domInitScript}
        }
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
}
typeof exports!=="undefined"&&(exports.UIHelper=UIHelper);


function getMakeClassError(path:string,node:IComment,message:string,state:ITreeEachState<INode>):string{
    let stack=state.stack;
    let strStack='    at '+path+'\n';
    for(let i=0;i<stack.length;i+=2){
        let arr:INode[]=<INode[]>stack[i];
        let index:number=<number>stack[i+1];
        let info:string[]=[];
        strStack='    at childNodes.'+index+':'+arr[index].nodeName+'\n'+strStack;
    }
    strStack='    at childNodes.'+state.currentIndex+':'+node.data+'\n'+strStack;
    
    return 'Error:'+message+'\n'+strStack;
}