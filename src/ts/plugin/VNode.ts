
/// <reference path='../core.ts'/>
let
        $v                      = new Virturl, 
        styleListRE             = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g;

interface IVText extends IText{

}

interface IVElement extends IElement{
    (name: string, nodeType?:number):INode;
    text?:Fun;
    __events__?;
    __closeSelf__?:boolean;
    _?:Fun;
    append?:(name: string, nodeType?:number)=>INode;
    __isClose__?:boolean;
    __?:Object;
}

interface IVComment extends INode{

}
class Virturl{
    createElement(name:string):IVElement{

    }
    createTextNode(value:string):IVText{

    }
    createComment(value:string){

    }
}
var newVNode=(function(){
        var toHelp          = document.createElement('用于创建VStyle和toDom支持');
        var styleNode       = toHelp.style;
        var VStyleprototype ={};
        function VStyle(elem,attrs){
            var 
                style="",
                isLock=0,
                __={},
                t=this;
            for(var i in styleNode){
                __[i]="";
            }
            Object.defineProperty(this,'__',{
                    value: __,
                    writable: false,
                    enumerable: false,
                    configurable: false
                }
            );
            Object.defineProperty(this,'length',{
                    value: 0,
                    writable: true,
                    enumerable: false,
                    configurable: false
                }
            );
            Object.defineProperty(this,'__elem__',{
                    value: elem,
                    writable: false,
                    enumerable: false,
                    configurable: false
                }
            );
            Object.defineProperty(attrs,"__style__",{
                    get: function(){
                        return style;
                    },
                    set: function(s){
                        if(isLock===1||style===s){
                            return;
                        }
                        style=s;
                        if(isLock===2){
                            return;
                        }
                        isLock=1;
                        var lst;
                        var lst2=[];
                        while((lst=styleListRE.exec(s))!==null){
                            lst2.push(lst);
                        }
                        if(lst2.length>0){
                            for(var i=0;i<lst2.length-1;i++){
                                t[camelize(lst2[i][1])]=lst2[i][2];
                            }
                            isLock=2;
                            t[camelize(lst2[i][1])]=lst2[i][2];
                        }
                        isLock=0;
                        //styleListRE.lastIndex=0;
                    }
                }
            );
        }
        VStyle.prototype=VStyleprototype;
        function indexOfStyleName(t,name){
            for(var i=0;i<t.length;i++){
                if(t[i]===name){
                    return i;
                }
            }
            return -1;
        }
        function updateStyleAttribyte(t){
            var style="";
            for(var i=0;i<t.length;i++){
                style+=decamelize(t[i])+':'+t[t[i]]+';';
            }
            t.__elem__.setAttribute('style',style);
        }
        function setVStyleGetSet(name){
            Object.defineProperty(VStyleprototype,name,{
                get:function(){
                    return this.__[name];
                },
                set:function(s){
                    if(s===this.__[name]){
                        return;
                    }else if(s===""){
                        if(this.__[name]===s){
                            return;
                        }
                        //删除
                        this.__[name]=s;
                        var idx=indexOfStyleName(this,name);
                        //if(idx!==-1){
                            for(var i=idx;i<this.length-1;i++){
                                this[i]=this[i+1];
                            }
                            delete this[i];
                            this.length--;
                        //}
                        //更新标签属性
                        updateStyleAttribyte(this);
                    }else{
                        //验证是否有效style
                        var s2;
                        styleNode[name]=s;
                        s2=styleNode[name];
                        styleNode[name]="";
                        if(s!==""){
                            this.__[name]=s;
                            var style=this.__elem__.getAttribute(style);
                            var idx=indexOfStyleName(this,name);
                            if(idx===-1){
                                this[this.length]=name;
                                this.length++;
                            }
                            //更新标签属性
                            updateStyleAttribyte(this);
                        }else{
                            throwError(name+"不支持"+s);
                        }
                        
                    }
                }
            });
        }
        for(var i in styleNode){
            setVStyleGetSet(i);
        }
        VStyleprototype=null;
        
        var closeSelf       = new NullValueHash(
            'br,input,hr,map,img,area,base,link,meta,frame,param,basefont,col'
        );
        
        
        /*function getOwnGetSets(name){
            var elem=document.createElement(name);
            var Elem=elem.constructor.prototype;
            var ownGetSets=[];
            if(Elem===HTMLElement.prototype){
                return ownGetSets;
            }
            for(var i in Elem){
                if(Elem.hasOwnProperty(i)){
                    var desc=Object.getOwnPropertyDescriptor(Elem,i);
                    if(desc.hasOwnProperty('get')&&desc.hasOwnProperty('set')){
                        try{
                        elem[i]="1";
                        if(elem.hasAttribute(i)){
                            ownGetSets.push(i);
                        }
                        }catch(e){
                        }
                    }
                }
            }
            return ownGetSets;
        }
        var name="applet".toUpperCase();
        var a=name+':["'+getOwnGetSets(name).join('","')+'"],';
        copy(a);a;*/
        var htmlNodeInfo={
            A:["target","download","ping","rel","hreflang","type","coords","charset","name","rev","shape","href"],
            AREA:["alt","coords","shape","target","ping","noHref","href"],
            BASE:["href","target"],
            BLOCKQUOTE:["cite"],
            BODY:["text","link","vLink","aLink","bgColor","background"],
            BR:["clear"],
            CANVAS:["width","height"],
            CAPTION:["align"],
            COL:["span","align","vAlign","width"],
            COLGROUP:["span","align","vAlign","width"],
            DIALOG:["open"],
            DIR:["compact"],
            DIV:["align"],
            DL:["compact"],
            FIELDSET:["disabled","name"],
            H1:["align"],
            H2:["align"],
            H3:["align"],
            H4:["align"],
            H5:["align"],
            H6:["align"],
            HR:["align","color","noShade","size","width"],
            HTML:["version"],
            IFRAME:["src","srcdoc","name","sandbox","allowFullscreen","width","height","align","scrolling","frameBorder","longDesc","marginHeight","marginWidth"],
            IMG:["alt","src","srcset","sizes","crossOrigin","useMap","isMap","width","height","name","lowsrc","align","hspace","vspace","longDesc","border"],
            INPUT:["accept","alt","autocomplete","autofocus","checked","dirName","disabled","formAction","formEnctype","formMethod","formNoValidate","formTarget","height","max","maxLength","min","minLength","multiple","name","pattern","placeholder","readOnly","required","size","src","step","type","value","width","align","useMap","autocapitalize","webkitdirectory","incremental"],
            INS:["cite","dateTime"],
            KEYGEN:["autofocus","challenge","disabled","keytype","name"],
            LEGEND:["align"],
            LI:["value","type"],
            LINK:["disabled","href","crossOrigin","rel","media","hreflang","type","charset","rev","target","integrity"],
            MAP:["name"],
            MENU:["compact"],
            META:["name","content","scheme"],
            METER:["value","min","max","low","high","optimum"],
            OL:["reversed","start","type","compact"],
            OPTGROUP:["disabled","label"],
            OPTION:["disabled","label","selected","value"],
            OUTPUT:["name"],
            P:["align"],
            PARAM:["name","value","type","valueType"],
            PRE:["width"],
            PROGRESS:["value","max"],
            Q:["cite"],
            SCRIPT:["src","type","charset","async","defer","crossOrigin","event","integrity"],
            SELECT:["autofocus","disabled","multiple","name","required","size"],
            SOURCE:["src","type","srcset","sizes","media"],
            STYLE:["media","type"],
            TABLE:["align","border","frame","rules","summary","width","bgColor","cellPadding","cellSpacing"],
            TBODY:["align","vAlign"],
            TD:["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"],
            TEXTAREA:["autofocus","cols","dirName","disabled","maxLength","minLength","name","placeholder","readOnly","required","rows","wrap","autocapitalize"],
            TFOOT:["align","vAlign"],
            TH:["colSpan","rowSpan","headers","align","axis","height","width","noWrap","vAlign","bgColor","abbr","scope"],
            THEAD:["align","vAlign"],
            TR:["align","vAlign","bgColor"],
            TRACK:["kind","src","srclang","label","default"],
            UL:["compact","type"],
            VIDEO:["width","height","poster"],
            XMP:["width"]
        }
        
        function setGetSetPropertyWithAttribute(o,attributes,name){
            var hideValueName='__'+name+'__';
            Object.defineProperty(attributes,hideValueName,{
                    value: "",
                    writable: true,
                    enumerable: false,
                    configurable: false
                }
            )
            Object.defineProperty(o,name,{
                get:function(){
                    return attributes[hideValueName];
                },
                set:function(s){
                    this.setAttribute(name,s);
                }
            });
        }
        function setProto(t){
            var proto=htmlNodeInfo[t.nodeName];
            if(isArray(proto)){
                (htmlNodeInfo[t.nodeName]=t.__proto__=newObject(t.nodeName[0]+t.nodeName.substring(1))).__proto__=prototype;
                for(var i in proto){
                    setGetSetPropertyWithAttribute(t.__proto__,t.attributes,proto[i]);
                }
            }else{
                t.__proto__=htmlNodeInfo[t.nodeName];
            }
        }
        function setClassName(o){
            Object.defineProperty(o.attributes,'__class__',{
                    value: "",
                    writable: true,
                    enumerable: false,
                    configurable: false
                }
            )
            Object.defineProperty(o,'className',{
                get:function(){
                    var v=o.attributes.__class__;
                    return v===undefined?"":v;
                },
                set:function(s){
                    o.setAttribute('class',s);
                }
            });
        }
        function newVNode(name,nodeType){
            //console.log(name);
            var t:IVElement=function(name,nodeType){
                if(name!==undefined){
                    return t.append(name,nodeType);
                }else{
                    t.__isClose__=true;
                    return t.parentNode;
                }
            }
            if(nodeType===undefined){
                nodeType=1;
            }
            t.__={};
            t.childNodes=[];
            switch(nodeType){
                case 1:
                    t.nodeName=name.toUpperCase();
                    t.attributes=new VNamedNodeMap();
                    t.children=[];
                    t.__events__=[];
                    t.__isClose__=t.__closeSelf__=name in closeSelf;
                    t.style=new VStyle(t,t.attributes);
                    
                    setClassName(t);
                    defineClassList(t);
                    if(t.nodeName in htmlNodeInfo){
                        setProto(t);
                    }else{
                        t.__proto__=prototype;
                    }
                    break;
                case 3:
                    t.__proto__=textNodePrototype;
                    t.nodeName='#text';
                    if(isString(name)){
                        t.value=name//decodeHTML(name);    
                    }else{
                        t.value=name.toString();
                    }
                    t.__isClose__=true;
                    break;
                case 8:
                    t.nodeName='#comment';
                    t.value=t.data=name;
                    t.__proto__=prototype;
                    t.__isClose__=true;
                    break;
                case 10:
                    t.nodeName='html';
                    t.__proto__=prototype;
                    t.__isClose__=true;
                    break;
            }
            t.parentNode=null;
            t.nodeType=nodeType;
            return t;
        }
        function VNamedNodeMap(){
            Object.defineProperty(this,"__length__",{
                    value: 0,
                    writable: true,
                    enumerable: false,
                    configurable: false
                }
            );
        }
        VNamedNodeMap.prototype={
            indexOfName:function(name){
                var l=this.__length__;
                for(var i=0;i<l;i++){
                    if(this[i].name===name){
                        return i;
                    }
                }
                return -1;
            },
            indexOf:function(o){
                var l=this.__length__;
                for(var i=0;i<l;i++){
                    if(this[i]===o){
                        return i;
                    }
                }
                return -1;
            },
            getNamedItem: function(name){
                var idx=this.indexOfName(name);
                if(idx===-1){
                    return null;
                }else{
                    return this[idx];
                }
            },
            //getNamedItemNS: getNamedItemNS()
            item: function(index){
                return this[index];
            },
            get length(){
                return this.__length__;
            },
            removeNamedItem: function(name){
                if(isObject(name)){
                    var idx=this.indexOf(name);
                }else{
                    var idx=this.indexOfName(name); 
                }
                
                if(idx!==-1){
                    var l=this.__length__;
                    for(var i=idx;i<l;i++){
                        this[i]=this[i+1];
                    }
                    this.__length__--;
                    delete this[this.__length__];
                    var hideValueName='__'+name+'__';
                    if(hideValueName in this){
                        this[hideValueName]="";
                    }
                }
            },
            //removeNamedItemNS: removeNamedItemNS()
            setNamedItem: function(name,value){
                if(!isString(value)){
                    if(isObject(value)){
                        value=value.toString();
                    }else if(value===undefined){
                        value="";
                    }
                }
                var idx=this.indexOfName(name);
                if(idx===-1){
                    this[this.__length__]={name:name,value:value};
                    this.__length__++;
                }else{
                    this[idx].value=value;
                }
                var hideValueName='__'+name+'__';
                if(hideValueName in this){
                    this[hideValueName]=value;
                }
            }
            //setNamedItemNS: setNamedItemNS()
        }
        function append(name,nodeType){
            return _appendChild.call(this,newVNode(name,nodeType));
        }
        function appendChild(vNode){
            var idx=this.childNodes.indexOf(vNode);
            if(idx===-1){
                return _appendChild.call(this,vNode);
            }else{
                return vNode;
            }
        }
        function _appendChild(vNode){
            if(vNode instanceof Node){
                throwError('虚拟DOM只能插入虚拟节点！');
                return;
            }
            this.childNodes.push(vNode);
            if(vNode.nodeType===1){
                this.children.push(vNode);
            }
            var p=vNode.parentNode;
            if(p){
                p.removeChild(vNode);
            }
            vNode.parentNode=this;
            return vNode;
        }
        function removeChild(vNode){
            if(!vNode||this.childNodes.length===0){
                return vNode;
            }
            removeItem(this.childNodes,vNode);
            removeItem(this.children,vNode);
            vNode.parentNode=null;
            return vNode;
        }
        function addText(){
            var s=Array.prototype.join.call(arguments,'\r\n');
            var t=newVNode(s,3);
            this.appendChild(t);
            return this;
        }
        function addText2(fn){
            var t=newVNode($t.getFunctionComment(fn),3,this.nodeName==='PRE');
            this.appendChild(t);
            return this;
        }
        function removeAttribute(name){
            this.attributes.removeNamedItem(name);
        }
        function removeAttributeNode(item){
            this.attributes.removeNamedItem(item);
        }
        function hasAttribute(name){
            return this.attributes.indexOfName(name)!==-1;
        }
        function setAttribute(name,value){
            if(name&&!emptyTextNodeRE.test(name)){
                this.attributes.setNamedItem(name,value);
                return $t.getBind(this,setAttribute);
            }else{
                return this;
            }
        }
        function _(name,value){
            if(name){
                return setAttribute.call(this,name,value);
            }else{
                return this.parentNode;
            }
        }
        function getAttribute(name){
            var item=this.attributes.getNamedItem(name);
            if(item){
                return item.value;
            }else{
                return null;
            }
        }
        function valueOf(){
            if(this.__domNode__){
                return this.__domNode__;
            }else{
                return this;
            }
        }
        function cloneNode(){
            if(this.nodeType!==1){
                return newVNode(this.data,this.nodeType);
            }
            var node=newVNode(this.nodeName,this.nodeType);
            var attrs=this.attributes;
            for(var i=0;i<attrs.length;i++){
                node.setAttribute(attrs[i].name,attrs[i].value);
            }
            node.__isClose__=this.__isClose__;
            node.__closeSelf__=this.__closeSelf__;
            return node;
        }
        function insertBefore(newNode,node){
            if(newNode instanceof Node){
                throwError('虚拟DOM只能插入虚拟节点！');
                return;
            }
            var p1=node.parentNode;
            if(!p1){
                return;
            }
            var chds=p1.childNodes;
            var idx=chds.indexOf(node);
            if(idx===-1){
                return;
            }
            var p2=newNode.parentNode;
            if(p2){
                p2.removeChild(newNode);
            }
            chds.splice(idx,0,newNode);
            
            newNode.parentNode=p1;
            
            if(newNode.nodeType===1){
                if(idx>=chds.length){
                    chds.push(newNode);
                }else{
                    var chds=p1.children;
                    for(var i=idx;i<chds.length;i++){
                        if(chds[i].nodeType===1){
                            chds.splice(i,0,newNode);
                            return;
                        }
                    }
                    chds.push(newNode);
                }
            }
        }
        
        function getinnerText(){
            var s="";
            switch(this.nodeType){
                case 3:
                    s+=this.data;
                    break;
                case 1:
                    var chdns=this.childNodes;
                    for(var i=0;i<chdns.length;i++){
                        s+=encodeHTML(chdns[i].innerText);
                    }
            }
            return s;
        }
        function setinnerText(s){
            var chds;
            chds=this.children;
            for(var i in chds){
                delete chds[i];
            }
            chds=this.childNodes;
            for(var i in chds){
                delete chds[i];
            }
            this.appendChild(newVNode(decodeHTML(s),3));
        }
        function setinnerHTML(s){
            this.children.length=0;
            this.childNodes.length=0;
            if(!isString(s)){
                s=s.toString();
            }
            if(this.nodeName in stringNode){
                this.appendChild($node(s,3));    
            }else{
                new VDOM(s,this);
            }
        }
        function getinnerHTML(){
            var 
                cs=this.childNodes,
                data=[];
            if(cs){
                for(var i=0;i<cs.length;i++){
                    data.push(cs[i].outerHTML);
                }   
            }
            return data.join('');
        }
        function connectParent(self,elem){
            var p=self.parentNode;
            if(p&&p.__domNode__){
                var pE=p.__domNode__;
                if(pE.childNodes.length===0){
                    pE.appendChild(elem);
                }else{
                    var node=self;
                    while(true){
                        /*
                         * 向前找
                         */
                        node=node.previousSibling;
                        if(node){
                            var elem2=node.__domNode__;
                            if(elem2){
                                if(elem2.parentNode){
                                    pE.insertBefore2(elem,elem2);
                                    pE.insertBefore2(elem2,elem);
                                    break;
                                }
                            }
                         }else{
                             node=self;
                             while(true){
                                /*
                                 * 向后找
                                 */
                                 node=node.nextSibling;
                                 if(node){
                                     var elem2=node.__domNode__;
                                     if(elem2){
                                         if(elem2.parentNode){
                                             pE.insertBefore2(elem,elem2);
                                             break;
                                         }else{
                                             console.log(elem2.innerHTML);
                                             debugger;
                                             /*这里怎么处理好呢*/
                                         }
                                     }
                                 }else{
                                     pE.appendChild(elem);
                                     break;
                                 }
                             
                             }
                             break;
                         }
                    }
                }
            }
        }
        function VNode(){
            this.setAttribute=setAttribute;
            this._=_;
            this.text=addText;
            this.text2=addText2;
            this.append=append;
            this.appendChild=appendChild;
            this.removeChild=removeChild;
            this.hasAttribute=hasAttribute;
            this.removeAttribute=removeAttribute;
            this.removeAttributeNode=removeAttributeNode;
            this.getAttribute=getAttribute;
            this.insertBefore=insertBefore;
            this.insertBefore2=insertBefore;
            this.cloneNode=cloneNode;
            this.valueOf=valueOf;
            this.toString=function(){
                return "[object HTML"+this.nodeName[0]+this.nodeName.substring(1).toLowerCase()+"Element]";
            }
            this.toXMLNodeString=function(){
                var 
                    ret=[],
                    sAttr='',
                    arrAttr=[],
                    attr=this.attributes;
                if(attr){
                    for(var i=0;i<attr.length;i++){
                        if(attr[i].value){
                            arrAttr.push(attr[i].name+'="'+attr[i].value+'"');    
                        }else{
                            arrAttr.push(attr[i].name);    
                        }
                    }
                    if(arrAttr.length>0){
                        sAttr=' '+arrAttr.join(' ');
                    }
                }
                switch(this.nodeType){
                    case 1:
                        ret.push('<'+this.nodeName.toLowerCase()+sAttr+'>');
                        if(!this.__closeSelf__ && this.__isClose__){
                            ret.push('</'+this.nodeName.toLowerCase()+'>');
                        }
                        break;
                    case 3:
                        ret.push(this.data);
                        break;
                    case 8:
                        if(this.dbplus){
                            ret.push('<!--'+this.data+'-->');
                        }else{
                            ret.push('<!'+this.data+'>');
                        }
                        break;
                    case 10:
                        ret.push('<!DOCTYPE html>');
                        break;
                }
                return ret;
            }
            this.addEventListener=function(name,fn,useCapture){
                if(this.nodeType!==1){
                    return;
                }
                if(!useCapture){
                    useCapture=false;
                }
                this.__events__.push([name,fn,useCapture]);
            }
            this.removeEventListener=function(name,fn,useCapture){
                if(this.nodeType!==1){
                    return;
                }
                if(!useCapture){
                    useCapture=false;
                }
                var arr=this.__events__;
                for(var i in arr){
                    var e=arr[i];
                    if(e[0]===name&&e[1]===fn&&e[2]===useCapture){
                        arr.splice(i,1);
                        i--;
                    }
                }
            }
            this.toJS=function(){
                var 
                    sBegin='',
                    sAttr='',
                    sInner='',
                    sEnd='',
                    s;
                if(this.parentNode!==null&&this.__isClose__){
                    sEnd='()';
                }
                if(this.parentNode===null){
                    sBegin='$VNode';
                }
                if(this.nodeType===1){
                    sBegin+='("'+this.nodeName+'")';
                    if(this.attributes.length>0){
                        sAttr='._';
                        var attrs=this.attributes;
                        for(var i=0;i<attrs.length;i++){
                            sAttr+='("'+attrs[i].name;
                            if(attrs[i].value){
                                sAttr+='","'+attrs[i].value+'")';    
                            }else{
                                sAttr+='")';
                            }
                        }
                        sAttr+='()';
                    }
                    var chds=this.childNodes;
                    if(chds.length>0){
                        for(var i=0;i<chds.length;i++){
                            sInner+=chds[i].toJS();
                        }
                    }
                }else{
                    s=this.data;
                    s=s.replace(/[\'\"\r\n]/g,function(s){
                        switch(s){
                            case '\'':
                            case '\"':
                                return '\\'+s;
                            case '\r':
                                return '\\r';
                            case '\n':
                                return '\\n';
                        }
                    });
                    sBegin+='("'+s+'",'+this.nodeType+')';
                }
                return sBegin+sAttr+sInner+sEnd;
            }
            this.toDOM=function(){
                var elem;
                switch(this.nodeType){
                    case 1:
                        if(this.__domNode__){
                            elem=this.__domNode__;
                            return elem;
                        }
                        elem=document.createElement(this.nodeName);
                        this.__domNode__=elem;
                        break;
                    case 3:
                        if(this.__domNode__){
                            return this.__domNode__;
                        }
                        if(this.data!==""){
                            toHelp.innerHTML=this.data;
                            elem=toHelp.removeChild(toHelp.childNodes[0]);
                            //elem=document.createTextNode(this.data);不用这句的原因是为了转码
                        }else{
                            elem=document.createTextNode('');
                        }
                        this.__domNode__=elem;
                        break;
                    case 8:
                        if(this.__domNode__){
                            return this.__domNode__;
                        }
                        elem=document.createComment(this.data);
                        this.__domNode__=elem;
                        break;
                    case 10:
                    default:
                        if(this.__domNode__){
                            return this.__domNode__;
                        }
                        toHelp.innerHTML=this.outerHTML;
                        elem=toHelp.removeChild(toHelp.childNodes[0]);
                        this.__domNode__=elem;
                }
                for(var i in this){
                    switch(i){
                        case 'attributes':
                            var attrs=this.attributes;
                            for(var j=0;j<attrs.length;j++){
                                elem.setAttribute(attrs[j].name,attrs[j].value);
                            }
                            break;
                        
                        case '__events__':
                            var arr=this.__events__;
                            for(var j in arr){
                                var e=arr[j];
                                elem.addEventListener(e[0],e[1],e[2]);
                            }
                            break;
                        case '__':
                            var arr=this.__;
                            for(var j in arr){
                                elem[j]=arr[j];
                            }
                            break;
                        case 'children':
                        case 'childNodes':
                        case '__proto__':
                        case '__isClose__':
                        case '__domNode__':
                        case 'nodeType':
                        case 'nodeName':
                        case 'parentNode':
                        case "__closeSelf__":
                        case "style":
                        case "classList":
                        case "className":
                            break;
                        default:
                            if(!this.hasOwnProperty(i)){
                                continue;
                            }
                            var desc=Object.getOwnPropertyDescriptor(this,i);
                            if(desc){
                                if(!(i in elem)){
                                    Object.defineProperty(elem,i,desc);    
                                }else{
                                    elem[i]=this[i];
                                }
                            }else{
                                elem[i]=this[i];
                            }
                    }
                }
                connectParent(this,elem);
                if(this.nodeType===1){
                    if(this.nodeName==='PRE'){
                        if(this.childNodes.length>0){
                            elem.innerHTML=decodeHTML(this.childNodes[0].data);    
                        }
                    }else{
                        var chds=this.childNodes;
                        for(var j=0;j<chds.length;j++){
                            chds[j].toDOM();
                        }
                    }
                }
                delegateNode(this);
                elem.__vdomNode__=this;
                return elem;
            }
            Object.defineProperty(this,'outerHTML',{
                get:function(){
                    var 
                        xmlNode=this.toXMLNodeString(),
                        cs=this.childNodes,
                        data=[xmlNode[0]];
                    if(cs){
                        for(var i=0;i<cs.length;i++){
                            data.push(cs[i].outerHTML);
                        }
                    }
                    if(xmlNode.length===2){
                        data.push(xmlNode[1]);    
                    }
                    return data.join('');
                }
            });
            Object.defineProperty(this,'previousSibling',{
                get:function(){
                    var p=this.parentNode;
                    if(!p){
                        return null;
                    }
                    var chds=p.childNodes;
                    var idx=chds.indexOf(this);
                    var node=chds[idx-1];
                    return node?node:null;
                }
            });
            Object.defineProperty(this,'nextSibling',{
                get:function(){
                    var p=this.parentNode;
                    if(!p){
                        return null;
                    }
                    var chds=p.childNodes;
                    var idx=chds.indexOf(this);
                    var node=chds[idx+1];
                    return node?node:null;
                }
            });
            var arrGetSetEvents=["onabort","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onshow","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onautocomplete","onautocompleteerror","onbeforecopy","onbeforecut","onbeforepaste","oncopy","oncut","onpaste","onsearch","onselectstart","onwheel","onwebkitfullscreenchange","onwebkitfullscreenerror"];
            function defineProtoGetSet(proto,name){
                Object.defineProperty(proto,name,{
                    get:function(){
                        if(this.__domNode__){
                            return this.__domNode__[name];
                        }else{
                            return this.__[name];
                        }
                    },
                    set:function(v){
                        if(this.__domNode__){
                            this.__domNode__[name]=v;
                        }else{
                            this.__[name]=v;
                        }
                        return v;
                    }
                });
            }
            Object.defineProperty(this,'innerHTML',{
                get:getinnerHTML,
                set:setinnerHTML
            });
            Object.defineProperty(this,'innerText',{
                get:getinnerText,
                set:setinnerText
            });
            for(var i in arrGetSetEvents){
                defineProtoGetSet(this,arrGetSetEvents[i]);
            }
        }
        function VtextNode(){
            this.__proto__=prototype;
            this.__value__='';
            var defineDesc={
                get:function(){
                    return this.__value__;
                },
                set:function(s){
                    this.__value__=s;
                }
            }
            Object.defineProperty(this,'data',defineDesc);
            Object.defineProperty(this,'value',defineDesc);
        }
        var prototype=new VNode();
        var textNodePrototype=new VtextNode();
        function getHomology(name){
            return function(){
                this.__proto__[name].apply(this,arguments);
                return this.__domNode__[name].apply(this.__domNode__,arguments);
            }
        }
        function getDOMHomology(name){
            return function(){
                var objects=[],toDOMs=[];
                for(var i=0;i<arguments.length;i++){
                    var o=arguments[i].valueOf();
                    if(o===arguments[i]){
                        toDOMs.push(o);
                        o=o.toDOM();
                    }
                    objects.push(o);
                    
                }
                this.__proto__[name].apply(this,arguments);
                var ret=this.__domNode__[name].apply(this.__domNode__,objects);
                for(var i=0;i<toDOMs.length;i++){
                    var chds=toDOMs[i].childNodes;
                    for(var j=0;j<chds.length;j++){
                        var chds2=chds[j].childNodes;
                        if(chds2.length!==chds[j].__domNode__.childNodes.length){
                            for(var k=0;k<chds2.length;k++){
                                if(chds2[k].__domNode__.parentNode===null){
                                    connectParent(chds2[k],chds2[k].__domNode__);
                                }
                            }
                        }
                    }
                }
                return ret;
            }
        }
        function getBridge(name){
            return function(){
                return this.__domNode__[name].apply(this.__domNode__,arguments);
            }
        }
        var osetAttribute=getBridge('setAttribute');
        var ohasAttribute=getBridge('hasAttribute');
        var oremoveAttribute=getBridge('removeAttribute');
        var oremoveAttributeNode=getBridge('removeAttributeNode');
        var oappendChild=getDOMHomology('appendChild');
        var oremoveChild=(function(){
            return function(node){
                if(node.parentNode){
                    if(node.__domNode__){
                        //try{
                            //
                        this.__domNode__.removeChild(node.__domNode__);
                        //}catch(e){
                            
                        //}
                    }
                }else{
                    debugger;
                }
                return this.__proto__.removeChild.call(this,node);
            }
        }());
        var oinsertBefore=getDOMHomology('insertBefore');
        var oinsertBefore2=getDOMHomology('insertBefore2');
        var oaddEventListener=getHomology('addEventListener');
        var oremoveEventListener=getHomology('removeEventListener');
        var oGetstyle=function(){return this.__domNode__.style};
        var oGetclassList=function(){return this.__domNode__.classList};
        var oGetoffsetTop=function(){return this.__domNode__.offsetTop};
        var oGetoffsetLeft=function(){return this.__domNode__.offsetLeft};
        var oGetoffsetWidth=function(){return this.__domNode__.offsetWidth};
        var oGetoffsetHeight=function(){return this.__domNode__.offsetHeight};
        //var oGetouterHTML=function(){return this.__domNode__.outerHTML};
        var oGetattributes=function(){return this.__domNode__.attributes};
        var otoString=function(){return this.__domNode__.toString.apply(this.__domNode__,arguments)};
        function delegateNode(o){
            if(o.nodeType===1){
                o.setAttribute=osetAttribute;
                o.hasAttribute=ohasAttribute;
                o.appendChild=oappendChild;
                o.removeChild=oremoveChild;
                o.removeAttribute=oremoveAttribute;
                o.removeAttributeNode=oremoveAttributeNode;
                o.insertBefore=oinsertBefore;
                o.insertBefore2=oinsertBefore2;
                o.toString=otoString;
                o.addEventListener=oaddEventListener;
                o.removeEventListener=oremoveEventListener;
                Object.defineProperty(o,'style',{
                    get:oGetstyle
                });
                Object.defineProperty(o,'classList',{
                    get:oGetclassList
                });
                Object.defineProperty(o,'offsetTop',{
                    get:oGetoffsetTop
                });
                Object.defineProperty(o,'offsetLeft',{
                    get:oGetoffsetLeft
                });
                Object.defineProperty(o,'offsetWidth',{
                    get:oGetoffsetWidth
                });
                Object.defineProperty(o,'offsetHeight',{
                    get:oGetoffsetHeight
                });
                Object.defineProperty(o,'attributes',{
                    get:oGetattributes
                });
                switch(o.nodeName){
                    case "INPUT":
                    case "SELECT":
                    case "TEXTAREA":
                        Object.defineProperty(o,'value',{
                            get:function(){
                                return this.__domNode__.value;
                            },
                            set:function(s){
                                this.__domNode__.value=s;
                            }
                        });
                    case "INPUT":
                        Object.defineProperty(o,'checked',{
                            get:function(){
                                return this.__domNode__.checked;
                            },
                            set:function(s){
                                this.__domNode__.checked=s;
                            }
                        });
                        break;
                }
            }else if(o.nodeType===3){
                Object.defineProperty(o,'data',{
                    get:function(){
                        return this.__value__;
                    },
                    set:function(s){
                        this.__value__=s;
                        this.__domNode__.data=s;
                    }
                });
                Object.defineProperty(o,'value',{
                    get:function(){
                        return this.__value__;
                    },
                    set:function(s){
                        this.__value__=s;
                        this.__domNode__.value=s;
                    }
                });
            }
            
        }
        return newVNode;
    })();