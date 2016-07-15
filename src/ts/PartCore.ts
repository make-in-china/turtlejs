
/// <reference path="global.ts"/>
/// <reference path="core.ts"/>
/// <reference path="Execute.ts"/>
/// <reference path="bind.ts"/>
/// <reference path='TemplateConfig.ts'/>
/// <reference path='PartOrderCore.ts'/>
/// <reference path='XHR.ts'/>
let
        $DOM,
        $node:(name:string,nodeType?:number)=>INode,
        operatorRE              = /\!=|==|=|<|>|\|/;

interface ITurtle{
    xhr:XHR;
    refs:KeyArrayObject<IHTMLElement>;
}
function getScopeBy(scope,node:INode){
    if(!scope)
        return $t.domScope.get(node);
    else
        return scope;
}
function execByScope(node:INode,s:string,scope,outer,outerElement,props,part){
    return _execByScope.call(getScopeBy(scope,node),s,node,outer,outerElement,props,part);
}

function execScope(s:string,node:INode,outerChildNodes,outerElement,props,part){
    execByScope(node,'$t.extend(this,{'+s+'});',null,outerChildNodes,outerElement,props,part);
}

function setNodeProperty(node,proName,condition,outerChildNodes,outerElement,props,part){
    let v=execByScope(node,condition,null,outerChildNodes,outerElement,props,part);
    let name=camelCase(proName.substr(0,proName.length-1));
    
    if(name.indexOf(".")!=-1){
        let obj2=node;
        name=name.split(".");
        for(let i=0;i<name.length-1;i++){
            obj2=obj2[name[i]];
            if(!obj2)return;
        }
        name=name[name.length-1];
        obj2[name]=v;
    }else{
        node.setAttribute(name,v);
    }
}

function setQuestionAtrr(node,outerChildNodes,outerElement,props,part){
    let attrs=slice.call(node.attributes);
    for(let i=0;i<attrs.length;i++){
        let name=attrs[i].name;
        if(name.length>1){
            if(name[name.length-1]===':'){
                setNodeProperty(node,name,takeAttr(node,name),outerChildNodes,outerElement,props,part);
            }else if(name[0]===':'){
                bindNodeProperty(node,name.substring(1,name.length),takeAttr(node,name));
            }
        }
    }
}
function getTemplate(node:IHTMLElement):string{
    let nodeName=node.nodeName;
    if(templateConfig.hasOwnProperty(nodeName)){
        if(templateConfig[nodeName].hasOwnProperty('getData')){
            return templateConfig[nodeName].getData(node);
        }else{
            return node.innerHTML;
        }
    }
}
function defineServiceByNode(node:IHTMLElement){
    let name:string=node.getAttribute('service');
    if(name){
        let partType:string=node.getAttribute('ui');
        if(partType){
            if($t.T.hasOwnProperty(partType)){
                /*把服务定义到组件*/
                $t.T[partType].service.define(name,getTemplate(node));
            }else{
                throwError('不能定义service：'+name+'到'+partType+'上');
            }
        }else{
            if(!$t.service.hasOwnProperty(name)){
                $t.service.define(name,getTemplate(node));
            }else{
                throwError('不能重复定义service：'+name);
            }
        }
    }
    removeNode(node);
}
function getExtendsByNode(node:IHTMLElement,sortPath:string){
    let ext=getAttr(node,'extends',null);
    if(isString(ext)){
        return getExtends(ext,sortPath);
    }
}
function defineUIByNode(node:IHTMLElement){
    let name=getAttr(node,'ui');
    let ext=getExtendsByNode(node,'ui');
    if(name){
        $t.T.define(name,'','',getTemplate(node),ext);
    }
    removeNode(node);
}
function defineClasses(node:IHTMLElement){
    $t.defineClassNames.push(getAttr(node,'class'),trimLine(getTemplate(node)));
    removeNode(node);
}
function parseDefine(node:IHTMLElement){
        switch(true){
            case node.hasAttribute('service'):
                defineServiceByNode(node);
                break;
            case node.hasAttribute('ui'):
                defineUIByNode(node);
                break;
            case node.hasAttribute('class'):
                defineClasses(node);
                break;
        }
    }
function isDefine(node:IHTMLElement):boolean{
    switch(true){
        case node.hasAttribute('service'):
        case node.hasAttribute('ui'):
        case node.hasAttribute('class'):
            return true;
    }
    return false;
}
function isTemplate(node:IHTMLElement):boolean{
    let nodeName=node.nodeName;
    if(templateConfig.hasOwnProperty(nodeName)){
        if(templateConfig[nodeName].hasOwnProperty('type')){
            return getAttr(node,'type')==='xmp';
        }else{
            return true;
        }
    }
    return false;
}
function findTemplates(nodes){
    let temps=[];
    treeEach(nodes,'children',function(node:IHTMLElement){
        if(isTemplate(node))
            temps.push(node);
    });
    return temps;
}
function parseUITemplate(uiName:string,uiSortPath:string,uiPath:string,sHTML:string){
    let 
        vDOM=$DOM(sHTML),
        cs=vDOM.children,
        i=0,
        node,
        s,
        name,
        nodeName;
    for(;i<cs.length;i++){
        node=cs[i];
        if(!isTemplate(node)){
            alert('最上层必须是ui/service模板标签');
            return;
        }
        if(node.hasAttribute('service')){
            defineServiceByNode(node);
            i--;
        }else{
            nodeName=node.getAttribute('ui');
            if(!nodeName)nodeName=uiName;
            if(!$t.T.hasOwnProperty(nodeName)){
                s=getTemplate(node);
                $t.T.define(nodeName,uiSortPath,uiPath,s,getExtendsByNode(node,uiSortPath));
            }else{
                alert('不能重复定义ui：'+nodeName);
            }
        }
    }
}
function importUIHTML(uiName:string,uiSortPath:string){
    if(!$t.T.hasOwnProperty(uiName)){
        let uiPath=baseUIPath.getPathBySortPath(uiSortPath);
        $t.xhr.get(uiPath + '/' + (uiName + '.html').toLowerCase(),false,function(text:string){
            parseUITemplate(uiName,uiSortPath,uiPath,text);
        });
    }
    return $t.T[uiName];
}

function getExtends(extName,sortPath){
    let ext;
    if(extName.indexOf(':')!==-1){
        extName=extName.split(':');
        sortPath=extName[0]?extName[0]:sortPath;
        extName=extName[1];
    }
    if(!isObject(importUIHTML(extName,sortPath))){
        throwError('找不到可继承的模板：'+extName);
    }
    ext=$t.T[extName];
    return ext;
}

function parseAsync(node,outerChildNodes,outerElement,props,part){
    let delay=parseInt(execByScope(node,node.getAttribute('async'),null,outerChildNodes,outerElement,props,part));
    node.removeAttribute('async');
    let mark=$node('async',8);
    replaceNodeByNode(node,mark);
    if(delay===NaN){
        delay=0;
    }
    setTimeout(function(){
        replaceNodeByNode(mark,node);
        mark=null;
        initHTML([node],outerChildNodes,outerElement,props,part);
        replaceCls();
    },delay);
}
function parseLazy(node,outerChildNodes,outerElement,props,part){
    node.removeAttribute('lazy');
    initHTML(node.childNodes,outerChildNodes,outerElement,props,part);
}
function getUIInfo(node){
    let nodeName=node.nodeName;
    if(nodeName==='SCRIPT'&&getAttr(node,'type')==='ui'){
        return node.getAttribute('name').toLowerCase();
    }else if(nodeName.indexOf(':')){
            let c=nodeName.split(':');
            let sortPath=c[0].toLowerCase();
            if(baseUIPath.hasSortPath(sortPath)){
                return {sortPath:sortPath,name:c[1].toLowerCase()};
            }
    }
}
function parseUI(node:IHTMLElement,uiInfo,step,part){
    let 
        partName,
        reExtends,
        outerChildNodes,
        outerElement,
        cpn,
        ui=importUIHTML(uiInfo.name,uiInfo.sortPath);
        
    if (!ui) {
        removeNode(node);
        throwError(uiInfo.name + '组件不存在！');
        return;
    }
    
    partName=takeAttr(node,'p-name');
    
    
    reExtends=takeAttr(node,'re-extends');
    
    outerChildNodes= slice.call(node.childNodes);
    outerElement = slice.call(node.children);
    let chds=node.childNodes;
    for(let i=chds.length;i>0;i--){
        node.removeChild(chds[0]);    
    }
    
    cpn=ui.render(node, node.parentNode,outerChildNodes,outerElement,null,part,partName,reExtends);
    if(cpn){
        step.next =cpn.elementLength;    
    }
}

function parseGet(node,outerChildNodes,outerElement,props,part){
    removeNode(node);
    let name=getAttr(node,'name');
    if(name){
        initHTML(node.childNodes,outerChildNodes,outerElement,props,part);
        $t.store[name]=node;    
        return TreeEach.c_noIn;
    }
    let toRef=getAttr(node,'to-p-ref');
    if(toRef&&part){
        toRef='$'+toRef;
        if(part[toRef]){
            appendNodes(node.childNodes,part[toRef]);
            initHTML(part[toRef].childNodes,outerChildNodes,outerElement,props,part);
            node.innerHTML='';
        }
    }
}
function parseSet(node,outerChildNodes,outerElement,props,part){
    
    if(node.hasAttribute('link')){
        /*设置关联子对象*/
        let link=takeAttr(node,'link');
        let chds=$t.store.takeElem(link);

        if(chds!==null){
            if(typeof chds ==='IHTMLElement'){
                node.appendChild(chds);
            }else{
                appendNodes(<INodeArray>chds,node.children[0]);
            }
            
            takeOutChildNodes(node);
        }else{
            removeNode(node);
        }
    }else{
        let ns;
        /*设置属性*/
        if(node.children.length>0){
            /*设置子对象*/
            ns=node.children;
        }else if(node.parentNode){
            /*设置父对象*/
            ns=[node.parentNode];
        }else{
            return;
        }
        let isAppend=!node.hasAttribute('append');
        node.removeAttribute('append');
        let attr=node.attributes;
        for(let j=0;j<ns.length;j++){
            if(isAppend){
                for(let i=0;i<attr.length;i++){
                    ns[j].setAttribute(attr[i].name,attr[i].value);
                }
            }else{
                for(let i=0;i<attr.length;i++){
                    let value=attr[i].value;
                    let value2:string;
                    switch(attr[i].name){
                        case 'class':
                            value2=ns[j].getAttribute(attr[i].name);
                            if(value2){
                                value+=(/ $/.test(value)?'':' ')+value2;
                            }
                            break;
                        case 'style':
                            value2=ns[j].getAttribute(attr[i].name);
                            if(value2){
                                value+=(/; *$/.test(value)?'':';')+value2;
                            }
                                
                            break;
                    }
                    ns[j].setAttribute(attr[i].name,value);
                }
            }
        }
        takeOutChildNodes(node);
    }
    return TreeEach.c_noIn;
}

let includeJSFiles=(function(){
    class IncludeTask{
        static jsScript=newHashObject('JSHash');
        files:Array<string>;
        constructor(public parent:IncludeTask,files:Array<string>|string,public callback:()=>void){
            if(parent){
                parent.child=this;      
            }
            let arr:Array<string>
            if(isArray(files)){
                arr=<Array<string>>files;
                for(let i in arr){
                    let url=files[i];
                    if(isString(url)&&!(url in IncludeTask.jsScript)){
                        arr.push(url);
                        IncludeTask.jsScript[url]=$node("script");
                    }
                }
            }else if(files){
                arr=[];
                let url:string=<string>files;
                if(isString(url)&&!(url in IncludeTask.jsScript)){
                    arr.push(url);
                    IncludeTask.jsScript[url]=$node("script");
                }
            }
            this.files=arr;
        }
        child:IncludeTask=null;
        isallload=false;
        count=0;
        onallload(){
            this.isallload=true;
            if(this.child==null){
                setIncludeTaskDone(this,this.callback);
            }else if(this.child.isallload){
                setIncludeTaskDone(this,this.callback);
            }
            if(this.parent!=null){
                this.parent.onchildallload();
            }
        }
        onchildallload(){
            if(this.isallload){
                setIncludeTaskDone(this,this.callback);
            }
        }
    }
    let includeTask:IncludeTask;
    
    function setIncludeTaskDone(task,fn){
        includeTask=task.parent;
        if(includeTask!=null)includeTask.child=null;
        task.child=null;
        if(isFunction(fn))fn();
    }
    function includeJSFile(task:IncludeTask){
        if(task.files.length>0){
            let url=task.files.shift();
            let scriptNode=IncludeTask.jsScript[url];
            scriptNode.src=url;
            task.count++;
            scriptNode.onload=function(){
                task.count--;
                includeJSFile(task);
            }
            document.head.appendChild(scriptNode);
            
        }else if(task.count==0){
            task.onallload();
        }
    }
    return function(files:Array<string>|string,callback?:()=>void){
        includeTask=new IncludeTask(includeTask,files,callback);
        includeJSFile(includeTask);
    }
}());
function execOnScript(node,outerChildNodes,outerElement,props,part){
    var p=node.parentNode;
    if(p){
        var script=node.innerHTML;
        if(script.length>0){
            /*设置父对象事件*/
            var events=exec('({'+script+'})');
            for(var i in events){
                if(isFunction(events[i])){
                    p.addEventListener(i,events[i]);
                }
            }
        }
    }
}
function execScript(node,outerChildNodes?,outerElement?,props?,part?){
    var script=node.innerHTML;
    if(script.length>0){
        var fn;
        var keyVar=String(getAttr(node,'var',''));
        var arrKeyVar:string[];
        fn=Function('outer,outerElement,props,part'+(keyVar?',':'')+keyVar,script);
        
        var args=[outerChildNodes,outerElement,props,part];
        if(keyVar.length>0){
            arrKeyVar=keyVar.split(',');
            for(var i=0;i<arrKeyVar.length;i++){
                var ui=$t.refs[arrKeyVar[i]];
                if(ui){
                    args.push(ui[ui.length-1]);
                }else{
                    args.push(null);
                }
            }
        }
        try{
            fn.apply(node.parentNode,args);
        }catch(e){
            _catch(e);                    
        }
        fn=null;
    }
}
function execTurtleScript(node,outerChildNodes,outerElement,props,part){
    var type=getAttr(node,'type',null);
    if(type=='on'){
        execOnScript(node,outerChildNodes,outerElement,props,part)
    }else{
        execScript(node,outerChildNodes,outerElement,props,part);
    }
}
function parseScript(node,outerChildNodes,outerElement,props,part){
    if(node.type==""||node.type=="on"||node.type=="text/javascript"){
        let src=getAttr(node,'src','');
        if(src){
            includeJSFiles(src);
        }else{
            execTurtleScript(node,outerChildNodes,outerElement,props,part);
        }
        removeNode(node);
    }
}
function execNodeQuestion(node,outerChildNodes,outerElement,props,part){
    var v=takeAttr(node,':');
    if(v.length>0){
        execByScope(node,v,null,outerChildNodes,outerElement,props,part);
    }
}
function bindNode(node,obj,name){
    var 
        elementValueName,
        eventName;
    switch(node.nodeName){
        case "SELECT":
            elementValueName="value";
            eventName="change";
            break;
        case "TEXTAREA":
            elementValueName="value";
            eventName="input";
            break;
        case "INPUT":
            switch(node.type){
                case "checkbox":
                    elementValueName="checked";
                    eventName="click";
                    break;
                default:
                    elementValueName="value";
                    eventName="input";
                    break;
            }
            break;
        case "#text":
            elementValueName="data";
            break;
        case "BUTTON":
        case "DIV":
        default:
            elementValueName="innerHTML";
            break;
    }
    if(!node.__bind__){
        node[elementValueName]=obj[name];
    }
    bindElementProperty(obj,name,node,elementValueName);
    if(eventName){
        node.addEventListener(eventName,function(){
            obj[name]=node[elementValueName];
        });
    }
}
function bindNodeByCondition(node:INode,condition:string){
    let 
        cdtn=splitByOnce(condition,"|"),
        name=cdtn[0],
        arrName:string[],
        scope,
        obj,
        exp;
        
    if(!name){
        return;
    }
    scope=$t.domScope.get(node);
    if(name.indexOf(".")!=-1){
        arrName=name.split(".");
        obj=_getBindObject(scope,arrName);
        name=arrName[arrName.length-1];
    }else{
        obj=_getBindObject(scope,[name]);
    }
    if(obj===null){
        throwError('不能获取绑定属性:'+cdtn[0]);
        return;
    }
    if(cdtn.length===2){
        exp=function(v){
            _execExpressionsByScope(cdtn[1],v,node);
        }
        exp.__me__=exp;
        bindProperty(obj,name,exp,"__me__");
    }else{
        bindNode(node,obj,name);
    }
}
function bindNodeFunction(node,bindVar,fn){
    var 
        name,
        scope,
        obj;
    if(bindVar.indexOf(".")!=-1){
        bindVar=bindVar.split(".");
    }else{
        bindVar=[bindVar];
    }
    name=bindVar[bindVar.length-1];
    scope=$t.domScope.get(node);
    obj=_getBindObject(scope,bindVar);
    fn.__me__=fn;
    bindProperty(obj,name,fn,"__me__");
    return {object:obj,name:name,targetObject:fn,targetName:"__me__"};
}
function bindEval(node,s,outer,outerElement,props,part,fn){
    var 
        operator=s.match(operatorRE)[0],
        bindVar=splitByOnce(s,operator),
        sfn;
    if(bindVar.length<2)return;
    switch(operator){
        case "|":
            sfn=bindVar[1];
            break;
        case "=":
            operator="==";
        default:
            sfn='v'+operator+bindVar[1];
            break;
    }
    return bindNodeFunction(node,bindVar[0],function(v){
        fn.call(this,execValueByScope(node,sfn,v,this,outer,outerElement,props,part));
    });
}
class ElementParser{
    GET=parseGet
    SET=parseSet
    __BREAK__=parseBreakOrder
    SCRIPT=parseScript
}
function bindShowHide(node,s,isBindShow,outer,outerElement,props,part){
    bindEval(node,s,outer,outerElement,props,part,function(v){
        if(v){
            if(isBindShow){
                removeClass(node,'uhide');
            }else{
                addClass(node,'uhide');
            }
        }else{
            if(isBindShow){
                addClass(node,'uhide');
            }else{
                removeClass(node,'uhide');
            }
        }
    });
}
class AttributeParser{
    ref(node,outerChildNodes,outerElement,props,part){
        let refName=node.getAttribute('ref')
        node.removeAttribute('ref');
        $t.refs.push(refName.split(','),node);
    }
    ":"(node,outerChildNodes,outerElement,props,part){
        execNodeQuestion(node,outerChildNodes,outerElement,props,part);
        setQuestionAtrr(node,outerChildNodes,outerElement,props,part);
    }
    'p-ref'(node,outerChildNodes,outerElement,props,part){
        let refName=takeAttr(node,'p-ref');
        let arrRefName:string[]
        if(part&&refName){
            arrRefName=refName.split(',');
            for(var i=0;i<arrRefName.length;i++){
                part['$'+arrRefName[i]]=node;    
            }
        }
    }
    bind(node,outerChildNodes,outerElement,props,part){
        bindNodeByCondition(node,takeAttr(node,'bind'));
    }
    remove(node,outerChildNodes,outerElement,props,part){
        var bindInfo=bindEval(node,takeAttr(node,'remove'),outerChildNodes,outerElement,props,part,function(v){
            if(!v)return;
            removeBind(this,bindInfo.targetName,bindInfo.name);
            removeNode(node);
        });
    }
    add(node,outerChildNodes,outerElement,props,part){
        var placeholder=$node('',8);
        replaceNodeByNode(node,placeholder);
        var bindInfo=bindEval(node,takeAttr(node,'add'),outerChildNodes,outerElement,props,part,function(v){
            if(!v)return;
            removeBind(this,bindInfo.targetName,bindInfo.name);
            replaceNodeByNode(placeholder,node);
        });
    }
    show(node,outerChildNodes,outerElement,props,part){
        bindShowHide(node,takeAttr(node,'show'),true,outerChildNodes,outerElement,props,part);
    }
    hide(node,outerChildNodes,outerElement,props,part){
        bindShowHide(node,takeAttr(node,'hide'),false,outerChildNodes,outerElement,props,part);
    }
    cls(node,outerChildNodes,outerElement,props,part){
        $t.replaceClassStore.push(node);
        /*不要删node.removeAttribute('cls');*/
    }
    'p-main'(node,outerChildNodes,outerElement,props,part){
        if(part&&!part.partMain){
            part.partMain=node;
        }
    }
};
let elementParser=new ElementParser;
let attributeParser=new AttributeParser;
function initHTML(arr:INodeArray,outerChildNodes?,outerElement?,props?,part?){
    treeEach(arr,'childNodes',function(node:IHTMLElement,step){
        if(node.nodeType===8){
            try{
                parseComment(node,outerChildNodes,outerElement,props,part);    
            }catch(e){_catch(e)}
            return TreeEach.c_noIn;
        }
        if(node.nodeType!==1){
            return;
        }
        if(node.hasAttribute('async')){
            parseAsync(node,outerChildNodes,outerElement,props,part);
            return TreeEach.c_repeat;
        }
        if(node.hasAttribute('lazy')){
            parseLazy(node,outerChildNodes,outerElement,props,part);
            return TreeEach.c_noIn|TreeEach.c_repeat;
        }
        let uiInfo=getUIInfo(node);
        if(uiInfo){
            parseUI(node,uiInfo,step,part);
            return TreeEach.c_noIn|TreeEach.c_noRepeat;
        }
        /*if(isTemplate(node)){
            parseTemp(node);
            return;
        }*/
        if(elementParser.hasOwnProperty(node.nodeName)){
            /* let ret=*/return elementParser[node.nodeName](node,outerChildNodes,outerElement,props,part);
            /* if(ret){
                return ret;
                };*/
        }
        let attrs=slice.call(node.attributes);
        for(let i=0;i<attrs.length;i++){
            if(attributeParser.hasOwnProperty(attrs[i].name)){
                attributeParser[attrs[i].name](node,outerChildNodes,outerElement,props,part);
            }
        }
    });
}
function getParts(childNodes:INodeArray){
    var child=[];
    var cpn=null;
    treeEach(childNodes,"childNodes",function(node:INode){
        if(node.nodeType===8&&(<IComment>node).__part__){
            if(cpn!==null){
                if((<IComment>node).__part__===cpn&&(<IComment>node).__sign__===0){
                    child.push((<IComment>node).__part__);
                    cpn=null;
                }
            }else{
                cpn=(<IComment>node).__part__;
            }
            return;
        }
        if(cpn!==null){
            return TreeEach.c_noIn;
        }
    });
    return child;
}
function getService(serviceName){
    if(!$t.service.hasOwnProperty(serviceName)){
        $t.xhr.get($t.config.baseServicePath + '/' + (serviceName + '.js').toLowerCase(),false,function(text){
            $t.service.define(serviceName,text);
        });
    } 
    return $t.service[serviceName];
}
function nodesToString(nodes:INode[]){
    var s='';
    for(var i=0;i<nodes.length;i++){
        if(nodes[i].nodeType===8){
            s+='<!--'+(<IComment>nodes[i]).data+'-->';
        }else if(nodes[i].nodeType===3){
            try{
            s+=(<IText>nodes[i]).data;
            }catch(e){}
        }else if(nodes[i].nodeType===1){
            s+=(<IHTMLElement>nodes[i]).outerHTML;
        }
    }
    return s;
}