
/// <reference path="../core/Node.ts"/>
/// <reference path='../part/Part.ts'/>
/// <reference path='../scope/Scope.ts'/>
/// <reference path='ClientHelper.ts'/>
/// <reference path='Ready.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path='Config.ts'/>
/// <reference path='lib.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='../lib/Encode.ts'/>
/// <reference path='../lib/DebugHelper.ts'/>
/// <reference path='../core/xhr.ts'/>
/// <reference path='../part/store.ts'/>
/// <reference path='../virtual/Include.ts'/>
/// <reference path='../part/uiList.ts'/>

interface IRenderDocument{
    ():void;
    beginTime?:Date;
    endTime?:Date;
}




let readyRE                 =   /complete|loaded|interactive/;
class Turtle extends EventEmitterEx implements ITurtle{
    // domScope                                =new DOMScope;
    // rootScope                               =new Scope;
    config                                  =new Config;
    T:UIList                                =new UIList;
    xhr                                     =new XHR;
    // service                                 =new Service;
    store                                   =new Store;
    readyByRenderDocument:Ready             =new Ready;
    
    /**error事件管理器*/
    $error                                  =this.getEventHelper<
                                                (this:void,event:any)=>void,
                                                (this:void,event:any)=>boolean>("error");
    parts:IKeyArrayHashObject<Component.Part>         ={}
    refs:IKeyArrayHashObject<IHTMLElement>  ={}
    // private fn                              ={}
    replaceClassStore:IHTMLElement[]        =[]
    defineClassNames:string[];
    turtleScriptElement:IHTMLScriptElement
    url:string
    isCompile:boolean;/**未使用 */
    getBind                                 =getBind
    constructor(){
        super();
        this.$error.on((e)=>{
            log(e);
            bp();
            alert(e);
        });
        let 
            scriptNode                                              =this.getScriptNode(),
            compile                                                 =getAttr(scriptNode,'compile',""),
            load                                                    =getAttr(scriptNode,'load',""),
            baseuipath                                              =getAttr(scriptNode,'baseuipath',""),
            // isExtend                                                =getAttr(scriptNode,'extend',null),
            compileName                                             =getAttr(scriptNode,'compilename',""),
            compileuilist                                           =getAttr(scriptNode,'compileuilist',""),
            compileInfo:{isOn?:boolean,url?:string}|undefined;
        let script                                                  =<string>scriptNode.innerHTML;
        this.turtleScriptElement=scriptNode;
        //初始化组件配置
        if(baseuipath){
            baseUIPath.push(baseuipath.split(";"));
        }else{
            baseUIPath.push('{path:"ui",name:"ui"}');
        }
        // if(isExtend){
        //     extend(window,this.fn);
        // }
        //初始化预编译输出路径
        this.url=scriptNode.getAttribute("src");
        if (compile !== ""){
            if(getQueryString("turtle_nocompile")!="1"){
                this.xhr.get(scriptNode.src+'.setup',false,function(text){
                    // try{
                        compileInfo=exec('('+text+')');    
                    // }catch(e){
                    //     _catch(e);
                    // }
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
                        this.r1(scriptNode,compileuilist,compileName,compileInfo,compile);
                    }else{
                        this.r2();
                    }
                }
            }
            includeJSFiles(loads[0],fnLoad);
        }else{
            if(compileInfo && compileInfo.isOn && compileInfo.url){
                this.r1(scriptNode,compileuilist,compileName,compileInfo,compile);
            }else{
                this.r2();
            }
        }
        
        if(script.length>0){
            exec(script);
        }
        
    }
    private getScriptNode():IHTMLScriptElement{
        return <any>document.scripts[document.scripts.length-1];
    }
    get rootParts(){
        var t=getParts(document.body.childNodes);
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
            parts[i].$resize.emit(parts[i]);
        }
    }
    renderTemplate(tp:IHTMLElement){
        let sHTML=getTemplate(tp);
        let vDOM=VDOM.parseStructor(sHTML);
        let vDOMs:(VMDOM.VNode&IVNodeMethod)[];
        if(isArray(vDOM)){
            vDOMs=vDOM;
        }else{
            vDOMs=[vDOM];
            vDOM.toDOM
        }
        
        initHTML(vDOMs);    
        // if(isFunction(vDOM)){
        let p=tp.parentNode;
        let doms:INode[]=[]
        for(const node of vDOMs){
            doms.push(node.toDOM());
        }
        replaceNodeByNodes(tp,doms);
        // vDOM.__domNode__=p;debugger;
            // return;   
        // }
        // replaceNodeByNodes(tp,takeChildNodes(vDOM.toDOM()));
        //vDOM.innerHTML='';
    }
    renderDocument:IRenderDocument=()=>{
        this.renderDocument.beginTime=new Date();
        let 
            xmps=findTemplates(document.body.children),
            i,
            templateXMP:IHTMLElement[]=[];
        /*优先处理定义相关的模板*/
        for(i=0;i<xmps.length;i++){
            // if(isDefine(xmps[i])){
            //     parseDefine(xmps[i]);
            // }else{
                templateXMP.push(xmps[i]);
            // }
        }
        /*处理逻辑模板*/
        for(i=0;i<templateXMP.length;i++){
            this.renderTemplate(templateXMP[i]);
        }
        
        replaceCls();
        
        /*initLink();*/
        this.renderDocument.endTime=new Date();
    }
    
    private r1(scriptNode:IHTMLScriptElement,compileuilist:string|undefined,compileName:string|undefined,compileInfo:{isOn?:boolean,url?:string},compile:string|undefined){
        this.ready(function() {
            this.compileDocument(scriptNode,compileuilist,function(html:string,compileJS:{name:string,path:string,script:string}[],importScripts:string){
                if(compileName===""){
                    compileName=getNameByURL(getFileNameByURL(location.href));
                    if(/\./.test(compileName)){
                        compileName=compileName.split('.')[0];
                    }
                    console.log('未提供compileName，自动设置为“'+compileName+'”');
                }
                let url = compileInfo.url + "?htmlName=" + compileName;
                
                let b=document.body;
                b.innerHTML='<div style="background-color:#fff;position:absolute;left:0;right:0;bottom:0;top:0;">开始编译页面</div>';
                let c=b.children[0];
                switch(compile){
                    case 'onlyBody':
                    
                        html='<xmp><script>'+importScripts+'</script></xmp>'+html.match(/(<body[\s\S]*?>)([\s\S]*?)(<\/body>)/)[2];
                        break;
                }
                this.xhr.post(url,html,false,function(text:string){
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
                        this.xhr.post(url,compileJS[i].script,false,function(text:string){
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
    ready(fn:()=>void){
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