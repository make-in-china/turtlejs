
/// <reference path='core.ts'/>
/// <reference path='./part/Template.ts'/>
/// <reference path='scope.ts'/>
/// <reference path='Client.ts'/>


let 
        readyRE                 =   /complete|loaded|interactive/;

function renderTemplate(tp){
    let sHTML=getTemplate(tp);
    let vDOM=$DOM(sHTML);
    initHTML(vDOM.childNodes);
    
    if(isFunction(vDOM)){
        let p=tp.parentNode;
        replaceNodeByNodes(tp,takeChildNodes(vDOM.toDOM()));
        vDOM.__domNode__=p;
        return;   
    }
    replaceNodeByNodes(tp,takeChildNodes(vDOM.toDOM()));
    //vDOM.innerHTML='';
}
interface IRenderDocument{
    ():void;
    beginTime?:Date;
    endTime?:Date;
}



class Config{
    baseUIPath=baseUIPath;
    baseServicePath='service';
    debugMode=2;
}
class Store extends HashObject<IHTMLElement>{
    take(name:string):INode|INodeArray{
        if(this.hasOwnProperty(name)){
            let ret:IHTMLElement=<IHTMLElement>this[name];
            delete this[name];
            if(ret.childNodes.length>1){
                return ret.childNodes;
            }else{
                return ret.childNodes[0];
            }
        }
        return null;
    }
    takeElem(name:string):IHTMLElement|INodeArray{
        if(this.hasOwnProperty(name)){
            let ret:IHTMLElement=<IHTMLElement>this[name];
            delete this[name];
            if(ret.children.length>1){
                return ret.children;
            }else{
                return ret.children[0];
            }
        }
        return null;
    }
}
interface ITurtle{
    config: Config;
    store:Store;
}
declare var unescape:(v:string)=>string;
function getQueryString(name:string):string{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if(r!=null){
        return unescape(r[2]); 
    }
    return null;
}
let getNameByURL=(function(){
    let RE1=/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    let RE2=/\.[a-zA-Z\d]+$/;
    return function (url:string){
        return url.match(RE1)[0].replace(RE2,'');
    }
}());
let getFileNameByURL=(function(){
    let RE1=/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    return function (url:string){
        return url.match(RE1)[0];
    }
}());
function appendQueryString(name,value){
    if(location.search){
        return location.href+'&'+name+'='+value;
    }else{
        return location.href+'?'+name+'='+value;
    }
}
class Turtle implements ITurtle{
    domScope=new DOMScope;
    rootScope=new RootScope;
    config=new Config;
    replaceClassStore:IHTMLElement[]=[];
    defineClassNames:string[];
    T:TemplateList=new TemplateList;
    parts:KeyArrayObject<Part>=newKeyArrayObject<Part>('Parts');
    xhr=new XHR;
    service=new Service;
    store=new Store;
    refs=newKeyArrayObject<IHTMLElement>("RefElements");
    fn={}
    turtleScriptElement:IHTMLScriptElement;
    url:string;
    readyByRenderDocument:ReadyObject=new ReadyObject;
    isCompile:boolean;/**未使用 */
    constructor(){
        rte.on("error",function(e:Event){log(e);bp();alert(e);});
        let 
            scriptNode:IHTMLScriptElement=this.turtleScriptElement=<any>document.scripts[document.scripts.length-1],
            compile=getAttr(scriptNode,'compile',null),
            load=getAttr(scriptNode,'load',null),
            script=scriptNode.innerHTML,
            baseuipath=getAttr(scriptNode,'baseuipath',null),
            isExtend=getAttr(scriptNode,'extend',null),
            compilename=getAttr(scriptNode,'compilename',null),
            compileuilist=getAttr(scriptNode,'compileuilist',null),
            compileInfo:{isOn?:boolean,url?:string};

        //初始化组件配置
        if(baseuipath){
            baseUIPath.push(baseuipath.split(";"));
        }else{
            baseUIPath.push('{path:"ui",name:"ui"}');
        }
        if(isExtend){
            extend(window,this.fn);
        }

        //初始化预编译输出路径
        this.url=scriptNode.getAttribute("src");
        if (compile !== null){
            if(getQueryString("turtle_nocompile")!="1"){
                this.xhr.get(scriptNode.src+'.setup',false,function(text){
                    try{
                        exec('compileInfo='+text);    
                    }catch(e){
                        _catch(e);
                    }
                });
            }
            this.isCompile=true;
        }
        
        //预加载依赖项
        if(load){
            let loads=load.split(",");
            let i=0;
            let fnLoad=()=>{
                i++;
                if(i<loads.length){
                    includeJSFiles(loads[i],fnLoad);
                }else{
                    if(compileInfo && compileInfo.isOn && compileInfo.url){
                        this.r1(scriptNode,compileuilist,compilename,compileInfo,compile);
                    }else{
                        this.r2();
                    }
                }
            }
            includeJSFiles(loads[0],fnLoad);
        }else{
            if(compileInfo && compileInfo.isOn && compileInfo.url){
                this.r1(scriptNode,compileuilist,compilename,compileInfo,compile);
            }else{
                this.r2();
            }
        }
        
        if(script.length>0){
            execScript(scriptNode);
        }
        
    }
    
    get rootParts(){
        var t=getParts(<any>document.body.childNodes);
        Object.defineProperty(t,"treeDiagram",{
            get :function(){
                var tabSpace=0;
                var s="";
                for(var i=0;i<t.length;i++){
                    s+=t[i].treeDiagram(tabSpace+2);
                }
                return s;
            }
        });
        return t;
    }
    emitResize(){
        var parts=this.rootParts;
        for(var i=0;i<parts.length;i++){
            parts[i].emitResize();
        }
    }
    renderDocument:IRenderDocument=()=>{
        this.renderDocument.beginTime=new Date();
        let 
            xmps=findTemplates(document.body.children),
            i,
            templateXMP=[];
        /*优先处理定义相关的模板*/
        for(i=0;i<xmps.length;i++){
            if(isDefine(xmps[i])){
                parseDefine(xmps[i]);
            }else{
                templateXMP.push(xmps[i]);
            }
        }
        /*处理逻辑模板*/
        for(i=0;i<templateXMP.length;i++){
            renderTemplate(templateXMP[i]);
        }
        
        replaceCls();
        
        /*initLink();*/
        this.renderDocument.endTime=new Date();
    }
    
    private r1(scriptNode:IHTMLScriptElement,compileuilist:string,compilename:string,compileInfo:{isOn?:boolean,url?:string},compile:string){
        this.ready(function() {
            this.compileDocument(scriptNode,compileuilist,function(html,compileJS,importScripts){
                if(!compilename){
                    compilename=getNameByURL(getFileNameByURL(location.href));
                    if(/\./.test(compilename)){
                        compilename=compilename.split('.')[0];
                    }
                    console.log('未提供compilename，自动设置为“'+compilename+'”');
                }
                let url = compileInfo.url + "?htmlName=" + compilename;
                
                let b=document.body;
                b.innerHTML='<div style="background-color:#fff;position:absolute;left:0;right:0;bottom:0;top:0;">开始编译页面</div>';
                let c=b.children[0];
                switch(compile){
                    case 'onlyBody':
                    
                        html='<xmp><script>'+importScripts+'</script></xmp>'+html.match(/(<body[\s\S]*?>)([\s\S]*?)(<\/body>)/)[2];
                        break;
                }
                this.xhr.post(url,html,false,function(text){
                    let br= document.createElement('br');
                    let sec=document.createElement('span');
                    let timeout=1000;
                    sec.innerHTML="?";
                    sec.style.color="#f00";
                    c.appendChild(br);
                    c.appendChild(br.cloneNode());
                    c.appendChild(document.createTextNode('刷新页面剩余时间：'));
                    c.appendChild(sec);
                    c.appendChild(br.cloneNode());
                    c.appendChild(br.cloneNode());
                    c.appendChild(document.createTextNode(text));
                    for(let i=0;i<compileJS.length;i++){
                        let url = compileInfo.url + "?uiName=" + compileJS[i].name + "&uiPath=" + compileJS[i].path;
                        this.xhr.post(url,compileJS[i].script,false,function(text){
                            c.appendChild(br.cloneNode());
                            c.appendChild(document.createTextNode(text));
                        });
                    }
                    setTimeout(function(){
                        window.location.href=appendQueryString("turtle_nocompile","1");
                    },timeout);
                    setInterval(function(){
                        timeout=timeout-100;
                        sec.innerHTML=''+timeout/1000;
                    },100);
                });
            });
        });
    }
    private r2(){
        this.ready(()=>{
            this.renderDocument();
            this.readyByRenderDocument.isReady=true;
            this.emitResize();
        });
    }
    ready(fn:Fun){
        if(this.readyByRenderDocument.isReady||(readyRE.test(document.readyState)&&document.body!==null)){
            fn();
        }else{
            let onLoaded=function (){
                if(document.body!==null){
                    window.removeEventListener('DOMContentLoaded',onLoaded);
                    clearInterval(tid);
                    fn();
                }
            }
            
            var tid=setInterval(()=>{
                if(this.readyByRenderDocument.isReady||(readyRE.test(document.readyState)&&document.body!==null)){
                    clearInterval(tid);
                    window.removeEventListener('DOMContentLoaded',onLoaded);
                    fn();
                }
            },10);
            window.addEventListener('DOMContentLoaded',onLoaded,false);
        }
        return this;
    }
}