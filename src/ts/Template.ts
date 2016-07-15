/// <reference path='core.ts'/>
/// <reference path='PartCore.ts'/>

const memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;
const colorRE=/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/
interface ITurtle{
    parts:KeyArrayObject<any>;
    service:Service;
    T:TemplateList;
}
interface IComment{
    __part__?:Part;
    __sign__?:number;
}
class PartParamFilter{
    static bool(v){
        return parseBool(v);
    }
    static intmin(v,p){
        v=parseInt(v);
        p=parseInt(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    static string(v){
        return '"'+v+'"';
    }
    static floatmin(v,p){
        v=parseFloat(v);
        p=parseFloat(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    static int(v){
        return parseInt(v);
    }
    static float(v){
        return parseFloat(v);
    }
    static pxtoem(v,p){
        p=parseFloat(p);
        if(isNaN(p)){
            p=0;
        }
        return (parseFloat(v)/16+p)+'em';
    }
    static color(v){
        
        if(colorRE.test(v)){
            return v;
        }else{
            return 'transparent';    
        }
    }
    static date(v,p){
        let d=new Date(v);
        if(d.toDateString()==='Invalid Date'){
            d=new Date();
        }
        return dateFormat(p,d);
    }
    static only(v,p){
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
    static udftotrue(v){
        return v===undefined?true:v;
    }
    static anytotrue(v){
        return v!==undefined?true:v;
    }
    static udftofalse(v){
        return v===undefined?false:v;
    }
    static anytofalse(v){
        return v!==undefined?false:v;
    }
    static udftonull(v){
        return v===undefined?null:v;
    }
    static anytonull(v){
        return v!==undefined?null:v;
    }
    static udftoemptystr(v){
        return v===undefined?"":v;
    }
    static anytoemptystr(v){
        return v!==undefined?"":v;
    }
}
class PartParam{
    constructor(public name:string,public hasDefault:boolean,public filter,public filterParam:string,public defaultValue:string,public limitValue:string){}
}
class Part extends PartBase{
    isInsert:boolean;
    begin:IComment;
    end:IComment;
    basePart:PartBase;
    oninsert:(node:INode)=>void;
    onremove:()=>void;
    resPath:string;
    constructor(template:PartTemplate,extPart:PartBase,public props:Object,html:string,outerChildNodes:INodeArray,outerElement:IHTMLCollection){
        super(template,extPart,props,html,outerChildNodes,outerElement);
        let name=template.name;
        
        let dom=$DOM(html);
        let begin:IComment=this.begin=$node(name,8);// document.createComment('<'+name+'>');
        let end:IComment=this.end=$node('/'+name,8);//document.createComment('</'+name+'>')
        end.__part__=begin.__part__=this;
        begin.__sign__=1;
        end.__sign__=0;
        this.super=extPart;
        this.resPath=template.path+'/'+template.name+'.res';
        let sp:PartBase=this;
        while(sp.super){
            sp=sp.super
        }
        this.basePart=sp?sp:this;
        this.basePart.isInsert=false;
        
        let nodes=dom.childNodes;
        
        initHTML(nodes,outerChildNodes,outerElement,props,this);
        if(extPart){
            (<ExtendsPart>extPart).to(this);
        }
        let store=this.store;
        store.push.apply(store,nodes);
        for(let i=nodes.length;i>0;i--){
            dom.removeChild(nodes[0]);
        }
        store.unshift(begin);
        store.push(end);
        this.emitInit(this);
    }
    toString(){
        return this.template.partName+":"+JSON.stringify(this.props);
    }
    treeDiagram(tabSpace){
        if(tabSpace===undefined){
            tabSpace=0;
        }
        let s="\r\n"+new Array(tabSpace+1).join(" ")+this.toString();
        let child=this.child;
        for(let i=0;i<child.length;i++){
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
    get elements():INode[]{
        if(this.isExtends){
            return new ArrayEx<INode>();
        }
        if(this.isInsert){
            try{
                let elements=new ArrayEx<INode>();
                let node=this.begin.nextSibling;
                let end=this.end;
                while(node!==end){
                    elements.push(node);
                    node=node.nextSibling;                
                }
                return elements;
            }catch(e){
                _catch(e);
                return new ArrayEx<INode>();
            }
        }
        if(isArray(this.store)){
            return this.store.slice().splice(1,this.store.length-2);    
        }else{
            return new ArrayEx<INode>();
        }
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
            let rects=[];
            let rt;
            //let recalNode           = document.createElement('div');

            //recalNode.setAttribute('style',"width:0 !important;height:0 !important;margin-left:0 !important;margin-right:0 !important;");

            // insertNodeBefore(this.begin,recalNode);
            // rt=[recalNode.offsetLeft,recalNode.offsetTop];
            // insertNodeBefore(this.end,recalNode);
            // rt.push(recalNode.offsetLeft,recalNode.offsetTop);
            // removeNode(recalNode);
            // rects.push(rt);
            let cs=this.elements;
            let elem;
            let dom=document.documentElement;
            for(let i=0;i<cs.length;i++){
                elem=cs[i].valueOf();
                if(elem.nodeType===1){
                    let l=0,t=0;
                    let elem2=elem;
                    while(elem2!==dom){
                        t+=elem2.offsetTop;
                        l+=elem2.offsetLeft;
                        elem2=elem2.parentNode;
                    }
                    rects.push([l,t,elem.offsetWidth,elem.offsetHeight]);
                }
            }
            
            let rect={left:0x7fffffff,top:0x7fffffff,width:0,height:0,right:0,bottom:0}
            for(let i=0;i<rects.length;i++){
                rt=rects[i];
                if(rt[0]<rect.left){
                    rect.left=rt[0];
                }
                if(rt[1]<rect.top){
                    rect.top=rt[1];
                }
                let right=rt[0]+rt[2];
                let bottom=rt[1]+rt[3];
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
    get innerHTML(){
        return nodesToString(this.elements);
    }
    get elemParent(){
        return this.begin.parentNode;
    }
    insertTo(elem){
        if(this.isInsert){
            let elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            let scopeNodes=this.scopeNodes;
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.cut(scopeNodes[i].scope);
            }
            appendNodes(elems,elem);
            /*link scope*/
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.oninsert)){
                this.oninsert(elem);
            }
        }else{
            appendNodes(this.store,elem);
            /*link scope*/
            let scopeNodes=this.scopeNodes;
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.oninsert)){
                this.oninsert(elem);
            }
            this.isInsert=true;
            // if(isFunction(this.oninsert)){
            //     this.oninsert();
            // }
        }  
    }
    insertBefore(elem){
        
        if(this.isInsert){
            let elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            let scopeNodes=this.scopeNodes;
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.cut(scopeNodes[i].scope);
            }
            insertNodesBefore(elem,elems);
            /*link scope*/
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.oninsert)){
                this.oninsert(elem);
            }
        }else{
            insertNodesBefore(elem,this.store);
            /*link scope*/
            let scopeNodes=this.scopeNodes;
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.link(scopeNodes[i].scope,elem);
            }
            if(isFunction(this.oninsert)){
                this.oninsert(elem);
            }
            this.basePart.isInsert=true;
            // if(isFunction(this.oninsert)){
            //     this.oninsert();
            // }
        }
    }
    
    remove(){
        if(this.isInsert){
            let elems=this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            let scopeNodes=this.scopeNodes;
            /*cut scope*/
            for(let i=0;i<scopeNodes.length;i++){
                $t.domScope.cut(scopeNodes[i].scope);
            }
            let p=this.begin.parentNode;
            if(p!==null){
                for(let i=0;i<elems.length;i++){
                    p.removeChild(elems[i]);
                }
            }
            this.store=elems;
            this.basePart.isInsert=false;
            if(isFunction(this.onremove)){
                this.onremove();
            }
            if(this.parent){
                this.parent.emitResize();    
            }
        }
    }
    get scopeNodes(){
            let scopeNodes=[];
            treeEach(this.elements,"children",function(node){
                if(node.hasOwnProperty("scope")){
                    scopeNodes.push(node);
                    return TreeEach.c_noIn;
                }
            });
            return scopeNodes;
    }
}
class PartBase{
    partName:string;
    super:PartBase;
    oninit:(final:Part)=>void;
    partMain:IHTMLElement;
    isInsert:boolean;
    onresize:()=>void;
    $:Service;
    store:INode[];
    isExtends:boolean;
    constructor(public template:PartTemplate,extPart:PartBase,public props:Object,html:string,outerChildNodes:INodeArray,outerElement:IHTMLCollection){
        this.$=new Service(template.service);
        this.partName=template.partName;
        if(extPart){
            /**继承 */
            this.__proto__=extPart;   
        }
        this.super=extPart;
        let dom=$DOM(html);
        let nodes=dom.childNodes;
        initHTML(nodes,outerChildNodes,outerElement,props,this);
        for(let i=nodes.length;i>0;i--){
            this.store.push(dom.removeChild(nodes[0]));
        }
    }
    get child(){
        return getParts(this.elements);
    }
    get elements():INode[]{return []}
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
            let cs=this.child;
            for(let i=0;i<cs.length;i++){
                cs[i].emitResize();
            }
        }catch(e){
            _catch(e);
        }
    }
    onSetSize(rect){
        if(this.partMain){
            let style=this.partMain.style;
            style.left=rect.left+'px';
            style.top=rect.top+'px';
            style.width=rect.width+'px';
            style.height=rect.height+'px';
            style.boxSizing='border-box';
            this.emitResize();
        }
    }
    getSuper(name:string){
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
        if(isFunction(this.oninit)){
            this.oninit(finalPart);
        }
    }
    setSize(rect:ClientRect){
        if(this.onSetSize){
            return this.onSetSize(rect);
        }
        if(this.super){
            this.super.setSize(rect);
        }
    }
}
class ExtendsPart extends PartBase{

    constructor(template:PartTemplate,extPart:PartBase,public props:Object,html:string,outerChildNodes:INodeArray,outerElement:IHTMLCollection){
        super(template,extPart,props,html,outerChildNodes,outerElement);
        this.isExtends=true;
    }
    to(part:PartBase){
        /**剪切厡型链 */
        let proto=part.$.__proto__;
        this.$.__proto__=proto;
        part.$.__proto__=this.$;
        if(this.super){
            (<ExtendsPart>this.super).to(part);
        }
        push.apply(part.store,this.store);
    }
}

interface IPartTemplate{
    params:ArrayEx<PartParam>;
    datas:ArrayEx<string>;
    extends:IPartTemplate;
    partName:string;
    service:Service;
    beExtends:(node:INode,that,outerChildNodes:INodeArray,outerElement:IHTMLCollection,props,part)=>ExtendsPart;
    parseParamsHelp:(p)=>void;
}
class PartTemplate implements IPartTemplate{
    partName:string;
    Instance:ArrayEx<Part>=new ArrayEx<Part>();
    params:ArrayEx<PartParam>;
    datas:ArrayEx<string>;
    extends:IPartTemplate;
    isJSDefine=true;
    parts:Array<Part>
    service:Service;
    constructor(public name:string,public sortPath:string,public path:string,s:string|IPartTemplate,ext){
        this.partName=name.replace(/[\.]/g,"_");
        if(isObject(s)){
            if(isObject(s)){
                let obj:IPartTemplate=<IPartTemplate>s;
                if(!isArray(obj.params)){
                    this.params=new ArrayEx<PartParam>();    
                }else{
                    this.params=obj.params;
                }
                if(!isArray(obj.datas)){
                    this.datas=new ArrayEx<string>(); 
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
                this.params=new ArrayEx<PartParam>(); 
                this.datas=new ArrayEx<string>(); 
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
    render(uiNode:IHTMLElement,that,outerChildNodes,outerElement,props,part:Part,refPartName:string,reExtends:boolean){
        
        let 
            ext,
            attrs,
            len,
            html;
            
        
        if(!isObject(props)){
            props={};
        }
        
        if(!uiNode){
            uiNode=<IHTMLElement>$node('ui:render');//document.createElement("ui:render");
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
        let newPart=new Part(this,ext,props,html,outerChildNodes,outerElement);
        if(refPartName){
            /**放置到全局引用 */
            $t.parts.push(refPartName,newPart);    
        }
        this.parts.push(newPart);
        
        if(uiNode.parentNode!==null){
            //let p=uiNode.parentNode.__domNode__;
            newPart.insertBefore(uiNode);
            removeNode(uiNode);
            /*if(p){
                debugger;
                vNodesToDOM(part.store);
            }*/
        }
        return newPart;
    }
    /*由props构建html字符串*/
    joinDatasByProps(props):string{
        
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
            if(p.filter&&PartParamFilter.hasOwnProperty(p.filter)){
                v=PartParamFilter[p.filter](v,p.filterParam);
            }
            d.splice(i+1, 0, v);  
        }
        if(err.length>0){
            if($t.config.debugMode==2){
                alert(err.join('\n'));
            }
            log(err.join('\n'));
            bp();
            return;
        }
        return d.join('');
    }
    /*变成别人的扩展*/
    beExtends(node:INode,that,outerChildNodes:INodeArray,outerElement:IHTMLCollection,props,part):ExtendsPart{
        let ext;
        if(this.extends instanceof PartTemplate){
            ext=this.extends.beExtends(node,that,outerChildNodes,outerElement,props,part);
        }
        let html=this.joinDatasByProps(props);
        return new ExtendsPart(this,ext,props,execTemplateScript(html,that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement);
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
            let name=params[i].name;
            if(p.hasOwnProperty(name)){
                p[name]=p[name]||!params[i].hasDefault;
            }else{
                p[name]=!params[i].hasDefault;
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
    protected event=new $Event;
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
class Service extends TemplateList{
    private __defineCallbacks__:ArrayEx<Fun>=new ArrayEx<Fun>();
    constructor(serv?:Service){
        super();
        if(isObject(serv)){
            for(let i in serv){
                this[i]=serv[i];
                this.event.emit(i,this[i]);
            }
        }
    }
    require(n){
        if(!this.hasOwnProperty(n)){
            this[n]=getService(n);
        }
        return this[n];
    }
    define(name,s){
        try{
            this[name]=exec("("+s+")");    
        }catch(e){
            _catch(e);
        }
        this.event.emit(name,this[name]);
    }
    toDefineString(){
        let s='new $t.Service(';
        let fns=[];
        for(let i in this){
            if(this.hasOwnProperty(i)){
                fns.push('"'+i+'":'+this[i].toString());    
            }
        }
        if(fns.length>0){
            s+='{'+fns.join(',')+'})';
        }else{
            s+=')';
        }
        return s;
    }
}