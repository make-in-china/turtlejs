
/// <reference path='VDOM.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='VScript.ts'/>
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
/// <reference path='UIHelper.template.ts'/>
/// <reference path='RefInfo.ts'/>

namespace UIHelper{
    let fs=typeof require!== "undefined"&&require('fs');
    
    export function buildProject(this:void,className:string,path:string){
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        
        let htmlPath=path+'/View.html';
        let classPath=path+'/Class.ts';
        let scriptPath=path+'/Script.ts';
        className=className[0].toUpperCase()+className.substr(1).toLowerCase();
        fs.writeFileSync(htmlPath,
`<div>
    <div ref="${className}"></div>
</div>`);
        fs.writeFileSync(classPath,getClassString(className));
        fs.writeFileSync(scriptPath,getScriptString(className));
        makeClass(htmlPath,className);
    }
    function toClassName(this:void,node:VNode):string{
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
    
    export function makeClass(this:void,path:string,className?:string){
        if(!className){
            className=path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
        }
        className=className[0].toUpperCase()+className.substr(1).toLowerCase();
        let html=fs.readFileSync(path);
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

        let refInfo=new RefInfo;
        let scripts:VScript[]=[];
        treeEach(<VNode[]>chds,"childNodes",(node,state)=>{
            if(node instanceof VComment){
                //解析注释里的命令
                try{
                    let order=Order.parseComment(node);
                    if(order&&order.run){
                        if(OrderEx.canRunAtService(order)){
                            //order达成运行所需条件，运行
                            order.run();
                        }else{
                            //order达成运行所需未条件，转换为VScript节点
                            OrderEx.toScriptNode(order);
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
                    debugger;
                    refInfo.push(v,<any>node);
                    // refs.push([v,node]);
                    node.removeAttribute("ref");
                }
                //解析class
            }else if(node instanceof VScript){
                scripts.push(node);
            }
        });

        let scriptFunctions:string='';
        for(let i=scripts.length-1;i>=0;i--){
            let script=scripts[i];
            let p=<VElement&IVNodeMethod>scripts[i].parentNode;
            let name='order'+i;
            script.propertyName=name;
            scriptFunctions+='\n    '+script.toFunction();
        }

        let propertys:string[]=[];
        let names:string[]=[];
        let vars:string[]=[];
        let propertyInitScript:{[index:string]:string}={};

                    debugger;
        for(const info of refInfo.data){
            if(info.refs.length>1){
                //缓存parent;
                let refParent=info.refParent;
                let parentName=RefInfo.getRefParentName(info.refs);
                for(const ref of info.refs){
                    let name=ref.name;
                    let refNode:VElement&IVNodeMethod=ref.node;
                    let mem=$$$(name,ENodeType.Member);
                    mem.isVar=true;
                    refParent.insertBefore(mem,refNode);
                    refNode.remove();
                    names.push(name);
                    propertys.push(name+':'+toClassName(refNode));
                    propertyInitScript[name]=`this.${name}=<any>${refNode.toJSString()};`;
                }
                let p=<VElement&IVNodeMethod>refParent.parentNode;
                p.insertBefore($$$(parentName,ENodeType.Member),<any>refParent);
                p.removeChild(<any>refParent);
                names.push(parentName);
                vars.push(parentName+':'+toClassName(refParent));
                propertyInitScript[parentName]=`${parentName}=<any>${refParent.toJSString()};`;
            }else{
                //只拆一次
                let refInfo=info.refs[0];
                let name=refInfo.name;
                let refNode:VElement&IVNodeMethod=<any>refInfo.node;
                let p=<VElement&IVNodeMethod>refNode.parentNode;
                p.insertBefore($$$(name,ENodeType.Member),refNode);
                p.removeChild(refNode);
                names.push(name);
                propertys.push(name+':'+toClassName(refNode));
                propertyInitScript[name]=`this.${name}=<any>${refNode.toJSString()};`;
            }
        }
        let topsJS:string[]=[];
        let topsType:string[]=[];
        for(const top of tops){
            topsJS.push(top.toJSString());
            topsType.push(toClassName(top));
        }
        let domInitScript:string='';
        for(const name of names){
            domInitScript+='\n            '+propertyInitScript[name];
        }
        
        if(topsJS.length>0){
            propertys.push('tops:['+topsType.join('\n,')+'];');
            domInitScript+=`
            push.call(this.tops,<any>[
                    ${topsJS.join(',\n                    ')}
            ]);`;
        }
        let propertyInfo:string=propertys.join(';\n        ');
        let varInfo:string=vars.join(';\n            ');
        fs.writeFileSync(path.replace(/View\.html$/,'View.ts'),getViewString(className,propertyInfo,varInfo,domInitScript,scriptFunctions));
        
        //mixin .css  to  变量
    }

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

}
typeof exports!=="undefined"&&(exports.UIHelper=UIHelper);

