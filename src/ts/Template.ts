/// <reference path='core.ts'/>
/// <reference path='PartCore.ts'/>

const memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;
const colorRE=/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/
class Service{
    constructor(serv?:Service){

    }
}
class PartParamFilter{
    bool(v){
        return parseBool(v);
    }
    intmin(v,p){
        v=parseInt(v);
        p=parseInt(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    string(v){
        return '"'+v+'"';
    }
    floatmin(v,p){
        v=parseFloat(v);
        p=parseFloat(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    int(v){
        return parseInt(v);
    }
    float(v){
        return parseFloat(v);
    }
    pxtoem(v,p){
        p=parseFloat(p);
        if(isNaN(p)){
            p=0;
        }
        return (parseFloat(v)/16+p)+'em';
    }
    color(v){
        
        if(colorRE.test(v)){
            return v;
        }else{
            return 'transparent';    
        }
    }
    date(v,p){
        var d=new Date(v);
        if(d.toDateString()==='Invalid Date'){
            d=new Date();
        }
        return dateFormat(p,d);
    }
    only(v,p){
        if(p.indexOf(';')===-1){
            return v;
        }
        let 
            arr=p.split(';'),
            datas=arr[0].split(','),
            filter:string|Array<string>;
        if(arr.length>0){
            filter=arr[1];
        }else{
            filter='';
        }
        if(datas.indexOf(v)!==-1){
            return v;
        }else{
            return filter;
        }
    }
    udftotrue(v){
        return v===undefined?true:v;
    }
    anytotrue(v){
        return v!==undefined?true:v;
    }
    udftofalse(v){
        return v===undefined?false:v;
    }
    anytofalse(v){
        return v!==undefined?false:v;
    }
    udftonull(v){
        return v===undefined?null:v;
    }
    anytonull(v){
        return v!==undefined?null:v;
    }
    udftoemptystr(v){
        return v===undefined?"":v;
    }
    anytoemptystr(v){
        return v!==undefined?"":v;
    }
}
class PartParam{
    constructor(public name:string,public hasDefault:boolean,public filter,public filterParam:string,public defaultValue:string,public limitValue:string){}
}

class Part{
    template:PartTemplate;
    props:Object;
    isInsert:boolean;
    store:Array<INode>;
    isExtend:boolean;
    constructor(){

    }
    toString(){
        return this.template.partName+":"+JSON.stringify(this.props);
    }
    treeDiagram(tabSpace){
        if(tabSpace===undefined){
            tabSpace=0;
        }
        var s="\r\n"+new Array(tabSpace+1).join(" ")+this.toString();
        var child=this.child;
        for(var i=0;i<child.length;i++){
            s+=child[i].treeDiagram(tabSpace+8);
        }
        return s;
    }
    get elementLength(){
        if(this.isInsert){
            return this.store.length;
        }else{
            return 1;
        }
    }
    get elements(){
        if(this.isExtend){
            return [];
        }
        if(this.isInsert){
            try{
                var elements=[];
                var node=this.begin.nextSibling;
                var end=this.end;
                while(node!==end){
                    elements.push(node);
                    var node=node.nextSibling;                
                }
                return elements;
            }catch(e){
                _catch(e);
                return [];
            }
        }
        if(isArray(this.store)){
            return this.store.slice().splice(1,this.store.length-2);    
        }else{
            return [];
        }
    }
    get child(){
        return getParts(this.elements);
    }
    getParentPart(node){
        while(1){
            if(node.previousSibling!==null){
                node=node.previousSibling;
            }else if(node.parentNode!==null){
                node=node.parentNode;
            }else{
                return null;
            }
            if(node.nodeType===8&&node.part){
                if(node.sign===0){
                    node=node.part.begin;
                }else{
                    return node.part;
                }
            }
        } 
    }
    get parent(){
        return this.getParentPart(this.begin);
    }
    getRect(){
        if(this.isInsert){
            var rects=[];
            var rt;
            //var recalNode           = document.createElement('div');

            //recalNode.setAttribute('style',"width:0 !important;height:0 !important;margin-left:0 !important;margin-right:0 !important;");

            // insertNodeBefore(this.begin,recalNode);
            // rt=[recalNode.offsetLeft,recalNode.offsetTop];
            // insertNodeBefore(this.end,recalNode);
            // rt.push(recalNode.offsetLeft,recalNode.offsetTop);
            // removeNode(recalNode);
            // rects.push(rt);
            var cs=this.elements;
            var elem;
            var dom=document.documentElement;
            for(var i=0;i<cs.length;i++){
                elem=cs[i].valueOf();
                if(elem.nodeType===1){
                    var l=0,t=0;
                    var elem2=elem;
                    while(elem2!==dom){
                        t+=elem2.offsetTop;
                        l+=elem2.offsetLeft;
                        elem2=elem2.parentNode;
                    }
                    rects.push([l,t,elem.offsetWidth,elem.offsetHeight]);
                }
            }
            
            var rect={left:0x7fffffff,top:0x7fffffff,width:0,height:0,right:0,bottom:0}
            for(var i=0;i<rects.length;i++){
                rt=rects[i];
                if(rt[0]<rect.left){
                    rect.left=rt[0];
                }
                if(rt[1]<rect.top){
                    rect.top=rt[1];
                }
                var right=rt[0]+rt[2];
                var bottom=rt[1]+rt[3];
                if(right>rect.right){
                    rect.right=right;
                }
                if(bottom>rect.bottom){
                    rect.bottom=bottom;
                }
            }
            rect.width=rect.right-rect.left;
            rect.height=rect.bottom-rect.top;
            return rect;
        }else{
            return {left:0,top:0,width:0,height:0,right:0,bottom:0};
        }
    }
    emitResize(){
        try{
            if(!this.isInsert){
                return;
            }
            if(this.onresize){
                if(this.onresize()){
                    return;
                }   
            }
            var cs=this.child;
            for(var i=0;i<cs.length;i++){
                cs[i].emitResize();
            }
        }catch(e){
            _catch(e);
        }
    }
    onSetSize(rect){
        if(this.partMain){
            var style=this.partMain.style;
            style.left=rect.left+'px';
            style.top=rect.top+'px';
            style.width=rect.width+'px';
            style.height=rect.height+'px';
            style.boxSizing='border-box';
            this.emitResize();
        }
    }
    setSize(rect){
        if(this.onSetSize){
            return this.onSetSize(rect);
        }
        if(this.super){
            this.super.setSize(rect);
        }
    }
    get innerHTML(){
        return nodesToString(this.elements);
    }
    get elemParent(){
        return this.begin.parentNode;
    }
    insertTo(elem){
        if(this.isInsert){
            var elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            var scopeNodes=this.scopeNodes;
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.cut(scopeNodes[i].scope);
            }
            appendNodes(elems,elem);
            /*link scope*/
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.onInsert)){
                this.onInsert(elem);
            }
        }else{
            appendNodes(this.store,elem);
            /*link scope*/
            var scopeNodes=this.scopeNodes;
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.onInsert)){
                this.onInsert(elem);
            }
            this.isInsert=true;
            if(isFunction(this.oninsert)){
                this.oninsert();
            }
        }  
    }
    insertBefore(elem){
        
        if(this.isInsert){
            var elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            var scopeNodes=this.scopeNodes;
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.cut(scopeNodes[i].scope);
            }
            insertNodesBefore(elem,elems);
            /*link scope*/
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.onInsert)){
                this.onInsert(elem);
            }
        }else{
            insertNodesBefore(elem,this.store);
            /*link scope*/
            var scopeNodes=this.scopeNodes;
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.onInsert)){
                this.onInsert(elem);
            }
            this.basePart.isInsert=true;
            if(isFunction(this.oninsert)){
                this.oninsert();
            }
        }
    }
    getSuper(name){
        if(this.super){
            if(this.super.template.name===name){
                return this.super;    
            }else{
                return this.super.getSuper(name);
            }
        }
    }
    emitInit(finalPart){
        if(this.super){
            this.super.emitInit(finalPart);
        }
        if(this.hasOwnProperty('onInit')&&isFunction(this.onInit)){
            this.onInit(finalPart);
        }
    }
    remove(){
        if(this.isInsert){
            var elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            var scopeNodes=this.scopeNodes;
            /*cut scope*/
            for(var i=0;i<scopeNodes.length;i++){
                $t.uiScope.cut(scopeNodes[i].scope);
            }
            var p=this.begin.parentNode;
            if(p!==null){
                for(var i=0;i<elems.length;i++){
                    p.removeChild(elems[i]);
                }
            }
            this.store=elems;
            this.basePart.isInsert=false;
            if(isFunction(this.onremove)){
                this.onremove();
            }
            var p=this.parent;
            if(p){
                p.emitResize();    
            }
        }
    }
    get scopeNodes(){
            var scopeNodes=[];
            treeEach(this.elements,"children",function(node){
                if(node.hasOwnProperty("scope")){
                    scopeNodes.push(node);
                    return TreeEach.c_noIn;
                }
            });
            return scopeNodes;
    }
}
function newPart(template,node,extPart,s,outerChildNodes,outerElement,props,part,partName){
    if(extPart){
        var t=newObject(template.partName,extPart);
    }else{
        var t=newObject(template.partName,newPart.prototype);    
    }
    
    if(partName){
        $t.parts.push(partName,t);    
    }
    var name=template.name;
    
    var dom=$DOM(s);
    //node.innerHTML=s;
    var begin=t.begin=$node(name,8);// document.createComment('<'+name+'>');
    var end=t.end=$node('/'+name,8);//document.createComment('</'+name+'>')
    end.part=begin.part=t;
    begin.sign=1;
    end.sign=0;
    
    t.props=props;
    t.template=template;
    t.onInsert=null;
    t.super=extPart;
    t.isExtend=false;
    t.resPath=template.path+'/'+template.name+'.res';
    var sp=t;
    while(sp.super){
        sp=sp.super
    }
    t.basePart=sp?sp:t;
    t.basePart.isInsert=false;
    t.$=new Service(template.service);
    t.store=[];
    
    var nodes=dom.childNodes;
    
    initHTML(nodes,outerChildNodes,outerElement,props,t);
    if(extPart){
        extPart.to(t);
    }
    
    t.store.push.apply(t.store,nodes);
    for(var i=nodes.length;i>0;i--){
        dom.removeChild(nodes[0]);
    }
    t.store.unshift(begin);
    t.store.push(end);
    t.emitInit(t);
    return t;
}
class PartTemplate{
    partName:string;
    Instance:ArrayEx<any>=new ArrayEx;
    params:ArrayEx<any>;
    datas:ArrayEx<any>;
    extends:Object;
    isJSDefine=true;
    parts:Array<Part>
    service:Service;
    constructor(public name:string,public sortPath:string,public path:string,s:string|Object,ext){
        this.partName=name.replace(/[\.]/g,"_");
        if(isObject(s)){
            if(isObject(s)){
                let obj:any=<Object>s;
                if(!isArray(obj.params)){
                    this.params=new ArrayEx;    
                }else{
                    this.params=obj.params;
                }
                if(!isArray(obj.datas)){
                    this.datas=new ArrayEx; 
                }else{
                    this.datas=obj.datas;
                }
                if(isObject(obj.extends)){
                    this.extends=obj.extends;
                }
                if(isObject(obj.service)){
                    if(!(obj.service instanceof Service)){
                        this.service=new Service(obj.service);
                    }else{
                        this.service=obj.service;
                    }
                }else{
                    this.service=new Service();
                }
            }else{
                this.params=new ArrayEx;
                this.datas=new ArrayEx;
                this.isJSDefine=false;
                this.service=new Service();
                if(ext){
                    this.extends=ext;    
                }
                let 
                    start=0,
                    idx=0,
                    str:string=<string>s;
                str.replace(memberRE,function(s0,name,s1,dft,s2,s3,limit,s4,s5,s6,filter,filterParam,index,sSource){
                    let hasDefault;
                    if(s1==="!"){
                        if(s1!==s3){
                            dft=limit;
                            limit="";
                        }
                        hasDefault=true;
                    }else{
                        hasDefault=false;
                    }
                    if(filterParam){
                        filterParam=filterParam.substring(1,filterParam.length-1);
                    }
                    idx++;
                    this.params.push(new PartParam(name,hasDefault,filter,filterParam,dft,limit));
                    this.datas.push(sSource.substring(start,index));
                    start=index+s0.length;
                    return '';
                });
                this.datas.push(str.substring(start,str.length));
            }
        }
    }
    /*调用render*/
    renderIn(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        let uiNode;
        if(!isArray(outerChildNodes)){
            outerChildNodes=[];
        }
        if(!isArray(outerElement)){
            outerElement=[];
        }
        uiNode=$node('ui:render');//document.createElement("ui:render");
        if(elem){
            elem.appendChild(uiNode);    
        }
        return this.render(uiNode,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    /*调用render*/
    renderBefore(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        let uiNode;
        if(!isArray(outerChildNodes)){
            outerChildNodes=[];
        }
        if(!isArray(outerElement)){
            outerElement=[];
        }
        uiNode=$node('ui:render');//document.createElement("ui:render");
        if(elem&&elem.parentNode){
            elem.parentNode.insertBefore2(uiNode,elem);
        }
        return this.render(uiNode,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    /*渲染dom*/
    render(uiNode,that,outerChildNodes,outerElement,props,part,partName,reExtends){
        
        let 
            ext,
            attrs,
            len,
            html;
            
        
        if(!isObject(props)){
            props={};
        }
        
        if(!uiNode){
            uiNode=$node('ui:render');//document.createElement("ui:render");
        }else{
            setQuestionAtrr(uiNode,outerChildNodes,outerElement,part?part.props:props,part);
        
            attrs=uiNode.attributes;
            len=attrs.length;
            for(let i=0;i<len;i++){
                let name=attrs[0].name;
                if(!props.hasOwnProperty(name)){
                    props[name]=attrs[0].value;    
                }
                uiNode.removeAttributeNode(attrs[0]);
            }
        }
        html=this.joinDatasByProps(props);
        if(html===undefined){
            return;
        }
        
        if(reExtends){
            ext=getExtends(reExtends,this.sortPath);
        }
        if(!ext){
            ext=this.extends;
        }
        if(ext instanceof PartTemplate){
            ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
        }
        part=newPart(this,uiNode,ext,execTemplateScript(html,that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement,props,part,partName)
        this.parts.push(part);
        
        if(uiNode.parentNode!==null){
            //let p=uiNode.parentNode.__domNode__;
            part.insertBefore(uiNode);
            removeNode(uiNode);
            /*if(p){
                debugger;
                vNodesToDOM(part.store);
            }*/
        }
        return part;
    }
    /*由props构建html字符串*/
    joinDatasByProps(props){
        
        let err=[];
        let d=slice.call(this.datas);
        for(let i=0;i<d.length-1;i+=2){
            let v;
            let p=this.params[i/2];
            if(props.hasOwnProperty(p.name)){
                if(p.limitValue){
                    v=p.limitValue;
                }else{
                    v=props[p.name];
                }
            }else if(p.hasDefault){
                v=p.defaultValue;
            }else{
                err.push(this.name+'不可缺少'+p.name+'参数');
                v=undefined;
            }
            if(p.filter&&hasOwnProperty(p.filter)){
                v=paramFilter[p.filter](v,p.filterParam);
            }
            d.splice(i+1, 0, v);  
        }
        if(err.length>0){
            if($this.config.debugMode==2){
                alert(err.join('\r\n'));
            }
            log(err.join('\r\n'));
            bp();
            return;
        }
        return d.join('');
    }
    /*变成别人的扩展*/
    beExtends(uiNode,that,outerChildNodes,outerElement,props,part){
        if(this.extends instanceof UITemplate){
            let ext=this.extends.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
        }
        let html;
        html=this.joinDatasByProps(props);
        return newExtendsPart(this,uiNode,ext,execTemplateScript(html,that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement,props,part);
    }
    toDefineString(){
        let s='$this.ui.define("'+this.name+'","'+this.sortPath+'","'+this.path+'",{datas:';
        s+=JSON.stringify(this.datas).replace(/<\/script>/g,'</scr"+"ipt>');
        s+=',params:[';
        let params=[];
        let ps=this.params;
        for(let i=0;i<ps.length;i++){
            let dft=JSON.stringify(ps[i].defaultValue);
            let limitValue=JSON.stringify(ps[i].limitValue);
            
            if(limitValue===undefined){
                limitValue="";
            }else{
                limitValue=','+limitValue;
            }
            if(dft===undefined){
                if(limitValue!==""){
                    dft=",undefined";
                }else{
                    dft="";
                }
            }else{
                dft=','+dft;
            }
            params.push('new $t.UIParam("'+ps[i].name+'",'+ps[i].hasDefault+',"'+ps[i].filter+'","'+ps[i].filterParam+'"'+dft+limitValue+')')
        }
        s+=params.join(',');
        s+='],service:'+this.service.toDefineString();
        s+="});";
        return s;
    }
    parseParamsHelp(p){
        let params=this.params;
        for(let i=0;i<params.length;i++){
            if(p.hasOwnProperty(params[i].name)){
                p[params[i].name]|=!params[i].hasDefault;
            }else{
                p[params[i].name]=!params[i].hasDefault;
            }
        }
        if(this.extends){
            this.extends.parseParamsHelp(p);
        }
    }
    getParamsHelp(){
        let p={};
        this.parseParamsHelp(p);
        let arr=[];
        for(let i in p){
            arr.push({name:i,necessary:p[i]});
        }
        return arr;
    }
}
class ITemplateList{
    [index:string]:Object
}
class TemplateList{
    private event=new $Event
    onDefine(name:string,fn:Fun){
        if(name.length===0){
            return;
        }
        this.event.on('name',fn);
        if(this.event.events.length>1){
            this[name];
        }
    }
    define(name:string,sortPath:string,path:string,s:string,ext){
        this[name]=new PartTemplate(name,sortPath,path,s,ext);
        this.event.emit(name,this[name]);
        return this[name];
    }
    toString():string{
        let lst:Array<string>=[];
        for(let i in this){
            if(this.hasOwnProperty(i)){
                lst.push(i);    
            }
        }
        return lst.join('\n');
    }
}
