
/// <reference path='VDOM.ts'/>
/// <reference path='../lib/TreeEach.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path='./VElementHelper.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='VOrder.ts'/>

class UIHelper{
    static fs=typeof require!== "undefined"&&require('fs');
    static template={
        class:`/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class {{className}} extends Part{
        constructor(
            template:PartTemplate,
            props:Object,
            html:string,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.{{className}}(this);
        }
        dom=new ComponentView.{{className}}
    }
}`,
        view:`/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class {{className}}{
        {{propertyInfo}}
    }
}`,
        script:`namespace ComponentScript{
    export class {{className}}{
        constructor(part:Component.{{className}}){
            
        }
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
        this.fs.writeFileSync(classPath,this.template.class.replace(/\{\{className\}\}/g,className));
        this.fs.writeFileSync(scriptPath,this.template.script.replace(/\{\{className\}\}/g,className));
        this.makeClass(htmlPath,className);
        // this.fs.writeFileSync(viewPath,this.template.view.replace(/\{\{className\}\}/g,className).replace('{{propertyInfo}}','tops:[]'));
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
        let refs:[string,VNode][]=[];
        treeEach(<VNode[]>chds,"childNodes",(node,step)=>{
            if(isVText(node)){
                //不处理咯
            }else if(node instanceof VComment){
                parseComment(node, outerChildNodes, outerElement, props, part);
                // } catch (e) { _catch(e) }
                return eTreeEach.c_noIn;
                //解析命令
            }else if(isVHTMLElement(node)){
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
                p.insertBefore(VNodeHelp(name,20),refNode);
                p.removeChild(refNode);
            }
        }
        for(let i=refs.length-1;i>=0;i--){
            let refInfo=refs[i];
            let name=refInfo[0];
            let refNode=refInfo[1];
            let typeName=refNode.nodeName;
            typeName=typeName[0]+typeName.substr(1).toLowerCase();
            propertys.push(name+':VMElement.V'+typeName+'Element&IVNodeMethod=<any>'+refNode.toJSString());
        }
        let topsJS:string[]=[];
        for(const top of tops){
            topsJS.push(top.toJSString());
        }
        propertys.push('tops=['+topsJS.join(',            ')+']');
        let propertyInfo:string=propertys.join(';\n        ');
        let view:string=this.template.view
        .replace('{{propertyInfo}}',propertyInfo)
        .replace('{{className}}',className);
        this.fs.writeFileSync(path.replace(/View\.html$/,'View.ts'),view);
        console.log(path.replace(/View\.html$/,'View.ts'));
        //mixin .css  to  变量
    }
}
typeof exports!=="undefined"&&(exports.UIHelper=UIHelper);