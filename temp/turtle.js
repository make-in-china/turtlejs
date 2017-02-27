
var turtle,$t,
    $rootScope,
    $client,
    $DOM,
    $node,
    $VDOM,
    $VNode;
(function(){
    var 
        arrayPrototype          = Array.prototype,
        Objectprototype         = Object.prototype,
        hasOwnProperty          = Object.prototype.hasOwnProperty,
        slice                   = arrayPrototype.slice,
        push                    = arrayPrototype.push,
        splice                  = arrayPrototype.splice,
        getPrototypeOf          = Object.getPrototypeOf,
        replace                 = String.prototype.replace,
        parseForOrderRE         = /[a-zA-Z\d] in .*/,
        parseForOrderRE2        = /^.*;.*;.*$/,
        addStyleRE              = /;\s*$/,
        addClassNameRE          = /\s+$/,
        readyRE                 = /complete|loaded|interactive/,
        memberRE                = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g,
        orderRE                 = /^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|var|=)(\s|$)/g,
        orderCaseRE             = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
        operatorRE              = /\!=|==|=|<|>|\|/,
        camelCaseRE             = /-(\w)/g,
        persentRE               = /^\s*([\d.]+)%\s*$/,
        emptyTextNodeRE         = /^\s*$/,
        functionCommentRE       = /\/\*([\s\S]*?)\*\//g,
        xmlwordRE               = /[a-zA-Z\/\!]/,
        classSplitRE            = /\s+/g,
        styleListRE             = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g,
        camelizeRE              = /-+(.)?/g,
        deCamelizeRE            = /[A-Z]/g,
        isIE                    = (!!window.ActiveXObject||"ActiveXObject" in window),
        exec                    = eval,
        fragment                = document.createDocumentFragment();
    
    var withthis                = 'with(this){return eval($$turtle$$)};'/*eval支持返回最后一个表达式的值*/,
        _execValueByScope       = Function('$$turtle$$,v,node,outer,outerElement,props,part',withthis),
        _execByScope            = Function('$$turtle$$,node,outer,outerElement,props,part',withthis),
        _execExpressionsByScope = Function('$$turtle$$,v,node',withthis);
        
    // Number.prototype.replace=function(){
        // return replace.apply(this,arguments);
    // }
    var dateFormat=(function(){
        return function(format,d){
            'use strict' 
            var o = {
                "M+" : d.getMonth() + 1, //month
                "d+" : d.getDate(), //day
                "h+" : d.getHours(), //hour
                "m+" : d.getMinutes(), //minute
                "s+" : d.getSeconds(), //second
                "q+" : Math.floor((d.getMonth() + 3) / 3), //quarter
                "S" : d.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
    })();
    function last(){
        return this[this.length-1];
    }
    
    function ClassList(elem){
        Object.defineProperty(this,'__elem__',{
            value:elem,
            writable:false,
            enumerable: true,
            configurable: true
        });
    }
    ClassList.prototype={
        add: function(value) {
            var classes = this.__elem__.className.split(classSplitRE);
            var index=classes.indexOf(value);
            if (!~index){
                classes.push(value);
                this.__elem__.className=classes.join(' ');  
            }
            
        },
        remove: function(value){
            var classes = this.__elem__.className.split(classSplitRE);
            var index=classes.indexOf(value);
            if (~index){
                classes.splice(index, 1);
                this.__elem__.className=classes.join(' ');  
            }
        },
        toggle: function(value) {
            var classes = this.__elem__.className.split(classSplitRE);
            var index=classes.indexOf(value);
            if (~index){
                classes.splice(index, 1);
            }else{
                classes.push(value);
            }
            this.__elem__.className=classes.join(' '); 
        },
        contains: function(value) {
            return !!~this.__elem__.className.split(classSplitRE).indexOf(value);
        },
        item: function(i) {
            return this.__elem__.className.split(classSplitRE)[i] || null;
        }
    }
    function defineClassList(object){
        Object.defineProperty(object,'classList',{
            enumerable: true,
            configurable: true,
            get:function(){
                if(this.__classList__){
                    return this.__classList__;
                }else{
                    Object.defineProperty(this,'__classList__',{
                        writable:false,
                        enumerable: false,
                        configurable: false,
                        value:new ClassList(this)
                    });
                    return this.__classList__;
                }
            }
        });
    }
    if (!("classList" in document.documentElement)){
        defineClassList(HTMLElement.prototype);
    }
    (function(){
        var insertBefore=Node.prototype.insertBefore;
        if(isIE){
            Node.prototype.insertBefore2=function(newNode,node){
                var reAppend=[];
                var n;
                switch(newNode.nodeType){
                    case 3:
                        if(newNode.data===""){
                            return;
                        }
                    case 8:
                        n=node.nextSibling;
                        while(n!==null){
                            reAppend.push(this.removeChild(n));
                            n=node.nextSibling;
                        }
                        reAppend.unshift(this.removeChild(node));
                        this.appendChild(newNode);
                        for(var i=0;i<reAppend.length;i++){
                            this.appendChild(reAppend[i]);
                        }
                        break;
                    default:
                        insertBefore.call(this,newNode,node);
                }
            }
        }else{
            Node.prototype.insertBefore2=insertBefore;
        }
        
    })();
    var require=(function(){
        var _requireHash=newHashObject('RequireHash');
        function RequireFile(file){
            this.file=file;
            this.injectInvoke=Function(file+"\r\n;return function(s){return eval('('+s+')');};")();
        }
        return function(path,variable){
            if(isArray(path)){
                var key=path.join(",");
                if(_requireHash.hasOwnProperty(key)){
                    return _requireHash[key].injectInvoke(variable);
                }else{
                    var codes="";
                    for(var i=0;i<path.length;i++){
                        $t.xhr.get(path[i],false,function(s){
                            codes+="\r\n"+s;
                        });
                    }
                    var requireFile=_requireHash[key]=new RequireFile(codes);
                    return requireFile.injectInvoke(variable);;
                }
            }else{
                if(_requireHash.hasOwnProperty(path)){
                    return _requireHash[path].injectInvoke(variable);
                }else{
                    var something;
                    $t.xhr.get(path,false,function(s){
                        var requireFile=_requireHash[path]=new RequireFile(s);
                        something=requireFile.injectInvoke(variable);
                    });
                    return something;
                }
            }
            
        }
    })();
    function requireByScript(s,variable){
        return Function(s+"\r\n;return function(s){return eval('('+s+')');};")()(variable);
    }
    function KeyWord(){
        s=["target","download","ping","rel","hreflang","type","coords","charset","name","rev","shape","href","alt","noHref","cite","text","link","vLink","aLink","bgColor","background","clear","width","height","align","span","vAlign","open","compact","disabled","color","noShade","size","version","src","srcdoc","sandbox","allowFullscreen","scrolling","frameBorder","longDesc","marginHeight","marginWidth","srcset","sizes","crossOrigin","useMap","isMap","lowsrc","hspace","vspace","border","accept","autocomplete","autofocus","checked","dirName","formAction","formEnctype","formMethod","formNoValidate","formTarget","max","maxLength","min","minLength","multiple","pattern","placeholder","readOnly","required","step","value","autocapitalize","webkitdirectory","incremental","dateTime","challenge","keytype","media","integrity","content","scheme","low","high","optimum","reversed","start","label","selected","valueType","async","defer","event","frame","rules","summary","cellPadding","cellSpacing","colSpan","rowSpan","headers","axis","noWrap","abbr","scope","cols","rows","wrap","kind","srclang","default","poster","xmp","anchor", "area", "audio", "br", "base", "basefont", "body", "button", "canvas", "content", "dlist", "directory", "div", "embed", "fieldset", "font", "form", "frame", "frameset", "hr", "head", "heading", "html", "iframe", "image", "input", "keygen", "li", "label", "legend", "link", "map", "marquee", "media", "menu", "meta", "meter", "mod", "olist", "object", "optgroup", "option", "output", "paragraph", "pre", "progress", "quote", "script", "select", "source", "span", "style", "tablecaption", "tablecell", "tablecol", "table", "tablerow", "tablesection", "textarea", "title", "track", "ulist", "unknown", "video"];
        for(var i in s){
            this[s[i]]=s[i];
        }
    }
    function toVarString(s){
        s=s.split(',');
        for(var i in s){
            s[i]=s[i]+'="'+s[i]+'"';
        }
        s='var '+s.join(',')+';';
        return s;
    }
    var log=Function('s','console.log(s)');
    var bp=Function('debugger');
    var lowercase,uppercase;
    if ('i'!=='I'.toLowerCase()) {
        lowercase= function(s) {
          return isString(s)
              ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
              : s;
        };
        uppercase = function(s) {
          return isString(s)
              ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
              : s;
        };
    }else{
        lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};
        uppercase = function(string) {return isString(string) ? string.toUpperCase() : string;};
    }
    function sort(arr,key,fn){
        var hash={};
        for(var i in a){
            var obj=a[i];
            var keyv=fn?fn(obj[key]):obj[key];
            if(hash[keyv]){
                hash[keyv].push(obj);
            }else{
                hash[keyv]=[obj];
            }
        }
        var newarr=[];
        for(var i in hash){
            var obj=hash[i];
            for(var j in obj){
                newarr.push(obj[j]);
            }
        }
        return newarr;
    }
    function FatFunction(s){
        var condition=s.split('=>');
        if(condition.length!=2)return;
        if(!/^\(.*?\)$/.test(condition[0]))return;
        var p=condition[0].substring(1,condition[0].length-1);
        return Function(p,'return eval("'+condition[1]+'");');
    }
    function isBlankObject(value) {
        return value !== null && typeof value === 'object' && !getPrototypeOf(value);
    }
    function forEach(obj, iterator, context , eachValue) {
        var key,
            length;
        if(eachValue===undefined)eachValue=true;
        if (obj) {
            if (isFunction(obj)) {
                for (key in obj) {
                    // Need to check if hasOwnProperty exists,
                    // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                    if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, eachValue ? obj[key] : null, key, obj);
                    }
                }
            } else if (isArray(obj) || isArrayLike(obj)) {
                var isPrimitive = typeof obj !== 'object';
                for ( key = 0,
                length = obj.length; key < length; key++) {
                    if (isPrimitive || key in obj) {
                        iterator.call(context, eachValue ? obj[key] : null, key, obj);
                    }
                }
            } else if (obj.forEach && obj.forEach !== forEach) {
                obj.forEach(iterator, context, obj);
            } else if (isBlankObject(obj)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (key in obj) {
                    iterator.call(context, eachValue ? obj[key] : null, key, obj);
                }
            } else if ( typeof obj.hasOwnProperty === 'function') {
                // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, eachValue ? obj[key] : null, key, obj);
                    }
                }
            } else {
                // Slow path for objects which do not have a method `hasOwnProperty`
                for (key in obj) {
                    if (hasOwnProperty.call(obj, key)) {
                        iterator.call(context, eachValue ? obj[key] : null, key, obj);
                    }
                }
            }
        }
        return obj;
    }
    function removeNode(node){
        var p=node.parentNode;
        if(p){
            return p.removeChild(node);
        }else{
            return null;
        }
    }
    function isArrayLike(obj) {
      // `null`, `undefined` and `window` are not array-like
      if (obj == null || isWindow(obj)) return false;
    
      // arrays, strings and jQuery/jqLite objects are array like
      // * jqLite is either the jQuery or jqLite constructor function
      // * we have to check the existence of jqLite first as this method is called
      //   via the forEach method when constructing the jqLite object in the first place
      if (isArray(obj) || isString(obj)) return true;
    
      // Support: iOS 8.2 (not reproducible in simulator)
      // "length" in obj used to prevent JIT error (gh-11508)
      var length = "length" in Object(obj) && obj.length;
    
      // NodeList objects (with `item` method) and
      // other objects with suitable length characteristics are array-like
      return isNumber(length) &&
        (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item == 'function');
    
    }
    
    function forEachSorted(obj, iterator, context) {
        var keys = Object.keys(obj).sort();
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }
    function _catch(e,onerror){
        if(isFunction(onerror)){
            onerror(e);
        }else{
            if(isFunction($t.event.onerror)){
                $t.event.onerror(e);
            }
        }
    }
    function _try(obj){
        var arg=slice.call(arguments,1);
        try{
            this.apply(obj,arg);
        }catch(e){
            _catch(e);
        }
    }
    function getTry(fn) {
        return function(){
            try{
                return fn.apply(this,arguments);
            }catch(e){
                _catch(e);
            }
        };
    }
    function onTry(obj,onerror){
        var arg=slice.call(arguments,2);
        try{
            this.apply(obj,arg);
        }catch(e){
            _catch(e,onerror);
        }
    }
    function handleWebkitRrror(e){
        var info = e.stack;
        var stacks=info.split('\n');
        stacks.shift();
        for(var i=0;i<stacks.length;i++){
            var t=stacks[i].split(':');
            if(t.length>1){
                var c=t[t.length-1].replace(')','');
                var l=t[t.length-2];
                t=t[t.length-3].split('/');
                t[t.length-1]=t[t.length-1].replace('html','h').replace('js','s');
                stacks[i]="at "+t[t.length-1]+":"+l+":"+c;
            }else{
                stacks[i]=t[0].replace(/(^\s*)|(\s*$)/g,'');
            }
        }
        return stacks.join("\r\n");
    }
    function getFileNameByURL(url){
        return url.match(/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/)[0];
    }
    function getNameByURL(url){
        return url.match(/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/)[0].replace(/\.[a-zA-Z\d]+$/,'');
    }
    function getNameByLocation(){
        return getFileNameByURL(window.location.href);
    }
    function getOnTry(fn) {
        var _args=slice.call(arguments,1);
        return function(){
            var args=slice.call(_args);
            for(var i=0;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            try{
                return fn.apply(this,args);
            }catch(e){
                _catch(e);
            }
        };
    }
    function $$(id){return document.getElementById(id);}
    function getBind(obj, fn){
        return function(){
            return fn.apply(obj, arguments);
        };
    }
    function getStep(fn,count){
        if(!isNumber(count)){
            return fn;
        }
        var step=count;
        var _fn=function(){
            if(step===count){
                step=1
                fn.apply(this,arguments);
            }else{
                step++;
            }
        }
        return _fn;
    }
    function getBindTry(obj, fn){
        return function (){
            try{
                return fn.apply(obj,arguments);
            }catch(e){
                _catch(e);
            }
        };
    }
    function getStateFunction(fn){
        var _fn=function(){
            if(_fn.enable){
                return fn.apply(this,arguments);
            }
        }
        _fn.enable=true;
        return _fn;
    }
    function getReTimeout(fn){
        var timeid=0;
        return function(delay){
            if(timeid>0){
                clearTimeout(timeid);
            }
            if(!delay){
                delay=0;
            }
            var t=this;
            var arg=slice.call(arguments,1);
            timeid=setTimeout(function(){
                timeid=0;
                fn.apply(t,arg);
            },delay);
        }
    }
    function Empty(){}
    function getDebounce(fn){
        if(!isFunction(fn)){
            return Empty;
        }
        var timeid=0;
        return function(delay){
            if(timeid>0){
                return;
            }
            if(!delay){
                delay=0;
            }
            var t=this;
            var arg=slice.call(arguments,1);
            timeid=setTimeout(function(){
                timeid=0;
                fn.apply(t,arg);
            },delay);
        }
    }
    var locStorage=(function(){
        var storage = window.localStorage,
                i=0,
                len=0;
        /*
        从本地存储获取值
        @param String key 设置localstorage的key
        @param String value 设置localstorage的val
    
        */
        function setValue(key,val){
            try{
                if(storage){
                    if(!appcan.isString(val)){
                        val = JSON.stringify(val);
                    }
                    storage.setItem(key,val);
                }else{
    
                }
            }catch(e){
                _catch(e);
            }
        }
        /*
            批量设置localstorage
    
        */
        function setValues(key){
            if(appcan.isPlainObject(key)){
                for(var k in key){
                    if(key.hasOwnPropery(k)){
                        setValue(k,key[k]);
                    }
                }
            }else if(appcan.isArray(key)){
                for(i=0,len=key.length;i<len;i++){
                    if(key[i]){
                        setValue.apply(this,key[i]);
                    }
                }
            }else{
                setValue.apply(this,arguments);
            }
        }
    
        /*
        从localStorage拿出对应的值
        @param String key 获取值的key
    
        */
        function popValue(key){
            if(!key){
                return;
            }
            try{
                if(storage){
                    var v=storage.getItem(key);
                    storage.removeItem(key);
                    return v;
                }
            }catch(e){
                _catch(e);
            }
        }
        /*
        从localStorage获取对应的值
        @param String key 获取值的key
    
        */
        function getValue(key){
            if(!key){
                return;
            }
            try{
                if(storage){
                    return storage.getItem(key);
                }
            }catch(e){
                _catch(e);
            }
        }
        /*
        从localStorage获取所有的keys
    
        */
        function getKeys(){
            var res = [];
            var key = '';
            for (var i=0,len=storage.length; i< len; i++){
                key = storage.key(i);
                if(key){
                    res.push(key);
                }
            }
            return res;
        }
    
        /*
        青春对应的key
        @param String key
    
    
        */
        function clear(key){
            try{
                if(key && isString(key)){
                    storage.removeItem(key);
                }else{
                    storage.clear();
                }
            }catch(e){
                _catch(e);
            }
        }
    
        /*
        localStorage剩余空间大小
    
        */
        function leaveSpace(){
            var space = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(storage))).length;
            return space;
        }
        
        /*
            获取或者设置localStorage的值
            @param String key
            @param String val
            
        */
        function val(key,value){
            if(arguments.length === 1){
                return getValue(key);
            }
            setValue(key,value);
        }
        
        
        function contains(key){
            return storage.hasOwnProperty(key);
        }
        
        
        return {
            getVal:getValue,
            setVal:setValues,
            leaveSpace:leaveSpace,
            remove:clear,
            keys:getKeys,
            val:val,
            contains:contains,
            popVal:popValue
        };
    
    })();
    function hasCustomToString(obj) {
      return isFunction(obj.toString) && obj.toString !== toString;
    }
    function getDPI(){
        if(getDPI.DPI){
            return getDPI.DPI;
        }
        var x,y;
        if (window.screen.deviceXDPI != undefined) {
            x = window.screen.deviceXDPI;
            y = window.screen.deviceYDPI;
        }
        else {
            var tmpNode = document.createElement("div");
            tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
            document.body.appendChild(tmpNode);
            x = parseInt(tmpNode.offsetWidth);
            y = parseInt(tmpNode.offsetHeight);
            tmpNode.parentNode.removeChild(tmpNode);    
        }
        getDPI.DPI=(x>y?y:x)/96
        return getDPI.DPI;
        // var edpi=document.createElement('div');
        // var dpi;
        // edpi.style.height="1em";
        // document.body.appendChild(edpi);
        // dpi=edpi.scrollHeight;
        // edpi.style.height="16px";
        // dpi=dpi/edpi.scrollHeight;
        // document.body.removeChild(edpi);
        // return dpi;
    }
    function getClosure(fn) {
        var _args=arguments;
        return function(){
            var args=toArray(_args);
            for(var i=0;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            return fn.apply(this,args);
        };
    }
    function toArray(obj) {
      return slice.call(obj);
    }
    function getKeyArray(obj){
        var arr=[]
        forEach(obj,function(v,key){
            arr.push(key);
        },this,false);
        return arr;
    }
    function _resetDescriptor(obj,descriptor){
        var desc;
        for(var e in obj){
            desc=Object.getOwnPropertyDescriptor(obj,e);
            if(!desc)return;
            if(desc.configurable===false)
                throwError('重置'+name+'失败：configurable==false');
            if(desc.writable===false)
                throwError('重置'+name+'失败：writable==false');
            if(desc.hasOwnProperty("value")){
                descriptor.value=desc.value;
            }else{
                if(desc.hasOwnProperty("get")){
                    descriptor.get=desc.get;
                }
                if(desc.hasOwnProperty("set")){
                    descriptor.set=desc.set;
                }
            } 
            Object.defineProperty(obj,e,descriptor);
        }
    }
    function lockObject(obj){
        var descriptor={
                writable: false,
                enumerable: true,
                configurable: false
            };
        _resetDescriptor(obj,descriptor);
    }
    function lockObject2(obj){
        var descriptor={
            writable: true,
            enumerable: false,
            configurable: false
        }
        _resetDescriptor(obj,descriptor);
    }
    function objectChange(obj,fnOnSet){
        for(var i in obj){
            onPropertyChange(obj,i,fnOnSet);
        }
    }
    function onPropertyChange(obj,name,fnOnSet){
        var desc=Object.getOwnPropertyDescriptor(obj,name);
        if(!desc)return;
        if(desc.configurable===false)
            throwError('绑定失败：原属性'+name+'替换失败');
        if(desc.writable===false)
            throwError('绑定失败：原属性'+name+'不可写');
        delete obj[name];
        var newProperty={enumerable:desc.enumerable,configurable:true};
        var value;
        if(desc.hasOwnProperty('value')){
            var _value=desc.value;
            if(isFunction(_value)){
                newProperty.get=function() {
                    return _value.call(this, value);
                };
                newProperty.set=function(newValue) {
                    value = newValue;
                    _value.call(this, value);
                    fnOnSet.call(obj,name);
                };
            }else{
                newProperty.get=function() {
                    return _value;
                };
                newProperty.set=function(newValue) {
                    _value = newValue;
                    fnOnSet.call(obj,name);
                };
            }
        }else{
            if(desc.hasOwnProperty('get')){
                var _get=desc.get;
                newProperty.get=function() {
                    return _get.call(this);
                };
            }
            if(desc.hasOwnProperty('set')){
                var _set=desc.set;
                newProperty.set=function(newValue){
                    _set.call(this,newValue);
                    fnOnSet.call(obj,name);
                };
            }
        }
        Object.defineProperty(obj, name,newProperty);
        desc=null;
    }
    function objectPropertyChange(obj,name,fnOnSet){
        if(obj.hasOwnProperty(name)){
            onPropertyChange(obj,name,fnOnSet);
        }
    }
    function removeItem(arr,obj){
        var index=arr.indexOf(obj);
        if(index!=-1){
            arr.splice(index, 1);
        }
    }
    function addBindInfo(obj,name,target,targetName,event){
        var bindInfoHash=obj.__bind__;
        if(!bindInfoHash){
            bindInfoHash=[];
            obj.__bind__=bindInfoHash;
        }
        bindInfoHash.push({name:name,target:target,targetName:targetName,event:event});
    }
    function removeBind(obj,name,targetName){
        if(!obj.__bind__)return false;
        var bindInfoHash=obj.__bind__;
        for(var i in bindInfoHash){
            if(bindInfoHash[i].name===name&&bindInfoHash[i].targetName===targetName){
                if(bindInfoHash.length==1){
                    bindInfoHash.length=0;
                    delete obj.__bind__;
                }else{
                    bindInfoHash.splice(i,1);
                }
                return true;
            }
        }
        return false
    }
    function bindPropertyByName(obj,name,obj2,name2){
        var t=function(name){
            if(!t.isBinding){
                t.isBinding=true;
                for(var i=0;i<t.list.length;i++){
                    var obj=t.list[i];
                    if(obj!==this){
                        var o=obj.__bind__;
                        for(var j in o){
                            if(o[j].targetName===name){
                                if(obj[o[j].name]!=this[name]){/*相同则不重置*/
                                    obj[o[j].name]=this[name];
                                }
                            }
                        }
                    }
                }
                t.isBinding=false;
            }
        }
        t.isBinding=false;
        t.removeObject=function(obj){
            removeItem(t.list,obj);
        }
        t.list=[obj,obj2];
        addBindInfo(obj,name,obj2,name2,t);
        addBindInfo(obj2,name2,obj,name,t);
        return t;
    }
    function camelCase(s){
        return s.replace(camelCaseRE,function(s,s1){
            return s1.toUpperCase();
        })
    }
    function bindElementProperty(obj,name,obj2,name2){
        bindProperty(obj,name,obj2,name2,2);
    }
    
    var bindProperty;
    (function(){
        function getBindInfo(obj,name,targetName){
            if(!obj.__bind__)return;
            var bindInfoHash=obj.__bind__;
            for(var i in bindInfoHash){
                if(bindInfoHash[i].name===name&&bindInfoHash[i].targetName===targetName){
                    return bindInfoHash[i];
                }
            }
        }
        bindProperty=function (obj,name,obj2,name2,type){
            var bindInfo1=getBindInfo(obj,name,name2);
            var bindInfo2=getBindInfo(obj2,name2,name);
            if(bindInfo1 && bindInfo2 && bindInfo1.event!==bindInfo2.event){
                throwError("不能混合不同的绑定链");
                return;
            }else if(bindInfo1){
                var e=bindInfo1.event;
                addBindInfo(obj2,name2,obj,name,e);
                e.list.push(obj2);
                if(type!=2){
                    onPropertyChange(obj2,name2,e);
                    e.isBinding=true;
                    obj2[name2]=obj[name];
                    e.isBinding=false;
                }
            }else if(bindInfo2){
                var e=bindInfo2.event;
                addBindInfo(obj,name,obj2,name2,e);
                e.list.push(obj);
                //if(type!=2){
                    onPropertyChange(obj,name,e);
                    e.isBinding=true;
                    obj[name]=obj2[name2];
                    e.isBinding=false;
                //}
            }else{
                var e=bindPropertyByName(obj,name,obj2,name2)
                onPropertyChange(obj,name,e);
                if(type!=2){
                    onPropertyChange(obj2,name2,e);
                    e.isBinding=true;
                    obj2[name2]=obj[name];
                    e.isBinding=false;
                }
            }
        }
    })();
    
    function parseBool(v) {
        if ( typeof v == 'string') {
            v = v.replace(/[\s]/g, '').toLowerCase();
            if(v&&(v=='false'||v =='0'||v=='null'||v =='undefined'))
                v = false;
            else if (v)
                v = true;
        }
        return !!v;
    }
    function addStyle(elem,style){
        if(!style){
            return;
        }
        var oldStyle=elem.getAttribute('style');
        if(oldStyle){
            if(addStyleRE.test(oldStyle)){
                style=oldStyle+style;
            }else{
                style=oldStyle+';'+style;
            }
        }
        elem.setAttribute('style',style);
    }
    function addClassName(elem,className){
        if(!className){
            return;
        }
        var oldClass=elem.getAttribute('class');
        if(oldClass){
            if(addClassNameRE.test(oldClass)){
                className=oldClass+className;
            }else{
                className=oldClass+' '+className;
            }
        }
        elem.setAttribute('class',className);
    }
    function addClass(elem){
        addClasses(elem,slice.call(arguments,1));
    }
    function addClasses(elem,clses){
        var lst;
        if(!elem)
            return;
        lst=elem.classList;
        for(var i=0;i<clses.length;i++){
            if(!lst.contains(clses[i]))
                lst.add(clses[i]);
        }
    }
    function removeClass(elem,cls){
        var lst;
        if(!elem){
            return;
        }
        lst=elem.classList;
        if(lst.contains(cls)){
            lst.remove(cls);
        }
    }
    function removeClasses(elem,clses){
        var lst;
        if(!elem)
            return;
        lst=elem.classList;
        for(var i=0;i<clses.length;i++){
            if(lst.contains(clses[i]))
                lst.remove(clses[i]);
        }
    }
    
    function replaceClass(sel,a,b){if(sel&&a&&b)sel.className = sel.className.replace(a, b);}
    function toggleClass(sel,a,t,f) {
        if (sel && a)
            if (sel.className.indexOf(a) >= 0) {
                sel.className = sel.className.replace(a, "");
                if(f)f();
            } else {
                sel.className += " " + a;
                if(t)t();
            }
    }
    function _rpl(s,s1,s2){return s1.toLowerCase()+'-'+s2.toLowerCase();}
    function dasherize(str){return str.replace(/::/g, '/').replace(/([a-z\d])([A-Z])/g,_rpl).replace(/([A-Z]+)([A-Z][a-z])/g,_rpl);}
    function scriptToJSON(script){
        return JSON.parse(script.replace(/([a-zA-Z\d]+?)(?=:)/g,function(s){return '"'+s.substring(0,s.length)+'"'}));
    }
    var _toString = {}.toString;
    function isRegExp(a){
        return "[object RegExp]" === _toString.call(a)
    }
    function isDate(a){
        return "[object Date]" === _toString.call(a)
    }
    function isNumber(a){
        return "[object Number]" === _toString.call(a)
    }
    function isString(a){
        return "[object String]" === _toString.call(a)
    }
    function isFunction(a){
        return "[object Function]" === _toString.call(a)
    }
    function isObject(a) {
        var type = typeof a;
        return type === 'function' || type === 'object' && !!a;
    }
    function isFinite(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    }
    function isUndefined(a) {
        return a === void 0;
    }
    var isArray = Array.isArray || function(a) {
        return "[object Array]"===_toString.call(a)
    }
    function isPersent(s){
        return persentRE.test(s);
    }
    function persentToFloat(s){
        var v=persentRE.exec(s);
        if(v){
            return v[1]/100;
        }
    }
    function isArrayLike(a){return typeof a.length=='number'}
    function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
    function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
    function camelize(str){ return str.replace(camelizeRE, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
    function decamelize(str){
         return str.replace(deCamelizeRE, function(match){ 
             return '-'+match.toLowerCase();
         }); 
    }
    function trim(s){return s.replace(/^\s*|\s*$/g,"");}
    function HTMLTrim(s){return s.replace(/^[\s\r\n]*|[\s\r\n]*$/g,"");}
    function trimLine(s){return s.replace(/^\s*/g,"").replace(/\s*$/g,"").replace(/\s*[\r\n]\s*/g,"");}
    function isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
            if(arr[i] in hash)
                return true;
            hash[arr[i]]=undefined;
        }
        return false;
    }
    function moveArray(s,d){for(var i=0;i<s.length;i++){d.push(s[i]);}}
    function getRect(e){
        var rect={left:0,top:0,right:0,bottom:0};
        var b=document.body;
        var p=e;
        while(p&&p!=b){
            rect.left+=p.offsetLeft;
            rect.top+=p.offsetTop;
            p=p.parentNode;
        }
        rect.right=rect.left+e.offsetWidth;
        rect.bottom=rect.top+e.offsetHeight;
        return rect;
    }
    function getOffsetPos(elem1,elem2){
        var pos={x:0,y:0};
        while(elem1&&elem1!=elem2){
            pos.x+=elem1.offsetLeft;
            pos.y+=elem1.offsetTop;
            elem1=elem1.parentNode;
        }
        return pos;
    }
    function each(elements, callback) {
        var i,
            key
        if (isArrayLike(elements)) {
            for ( i = 0; i < elements.length; i++)
                if (callback.call(elements[i], i, elements[i]) === false)
                    return elements
        } else {
            for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false)
                return elements
        }
        return elements
    }
    function map(elements, callback) {
        var value,
            values = [],
            i,
            key
        if (isArrayLike(elements))
            for ( i = 0; i < elements.length; i++) {
                value = callback(elements[i], i)
                if (value != null)
                    values.push(value)
            }
        else
            for (key in elements) {
                value = callback(elements[key], key)
                if (value != null)
                    values.push(value)
            }
        return flatten(values)
    }
    var encodeHTML=(function(){
        var 
            re=/&lt;|&gt;/g,
            fn=function(s){
                switch(s){
                    case "&lt;":
                        return '<';
                    case "&gt;":
                        return '>';
                }
                return s;
            }
        return function(value){
            return value.replace(re,fn);
        }
    }());
    var decodeHTML=(function(){
        var 
            re=/<|>/g,
            fn=function(s){
                switch(s){
                    case "<":
                        return '&lt;';
                    case ">":
                        return '&gt;';
                }
                return s;
            }
        return function(value){
            return value.replace(re,fn);
        }
    }());
    function idle(cb){
        var timeid=0;
        return function(delay){
            if(timeid>0){
                clearTimeout(timeid);
            }
            if(!delay)
                delay=0;
            timeid=setTimeout(function(){
                timeid=0;
                biz.trycall(cb);
            },delay);
        }
    }
    function insertNode(node,childNode){
        var parent=node.parentNode;
        if(parent==null)return 0;
        parent.insertBefore2(childNode,node)
        return 0;
    }
    
    function repeatCall(delay,repeat,fn){
        var i=0;
        var id=setInterval(function(){
            i++;
            if(repeat!=-1&&i>=repeat){
                clearInterval(id);
            }
            fn();
        },delay);
    }
    function takeChildNodes(node){
        var c=node.childNodes;
        var length=c.length;
        var ret=[];
        for(var i=length;i>0;i--){
            ret.push(node.removeChild(c[0]));
        }
        return ret;
    }
    function toPercent(s){
        return (Math.round(s * 10000)/100).toFixed(0) + '%';
    }
    function takeOutChildNodes(node){
        var parent=node.parentNode;
        if(parent==null)return 0;
        var c=node.childNodes;
        var i=0;
        for(var j=c.length-1;j>-1;j--){
            parent.insertBefore2(node.removeChild(c[0]),node);
        }
        parent.removeChild(node);
        return i;
    }
    function elementDOMdistance(borderElem,elem1,elem2){
        var i=0;
        var j=0;
        while(1){
            if(elem1===borderElem)
                break;
            i++;
            elem1=elem1.parentNode;
        }
        while(1){
            if(elem2===borderElem)
                break;
            j++;
            elem2=elem2.parentNode;
        }
        return j-i;
    }
    function elementInElement(elem1,elem2,borderElem){
        if(!borderElem)borderElem=document.body;
        while(1){
            if(elem1===borderElem)
                break;
            if(elem1===elem2)
                return true;
            elem1=elem1.parentNode;
        }
        return false;
    }
    
    function takeAttr(node,attrName,defaultValue){
        if(!node.hasAttribute(attrName)){
            return defaultValue;
        }else{
            var s=node.getAttribute(attrName);
            node.removeAttribute(attrName);
            return s;
        }
    }
    function getAttr(node,attrName,defaultValue){
        if(!node.hasAttribute(attrName)){
            return defaultValue;
        }else{
            return node.getAttribute(attrName);
        }
    }
    function extendConst(elem,elemEx){
        for(var e in elemEx){
            Object.defineProperty(elem,e,{
                value: elemEx[e],
                writable: false,
                enumerable: true,
                configurable: false
            });
        }
        return elem;
    }
    function extend(elem,elemEx){
        for(var e in elemEx){
            elem[e]=elemEx[e];
        }
        return elem;
    }
    function merge(elem,elemEx){
        for(var e in elemEx){
            if(!elem.hasOwnProperty(e)){
                elem[e]=elemEx[e];
            }
        }
        return elem;
    }
    /**
     *
     * 以下为turtle逻辑 
     *  
    */
    var _includeTask=null;
    function setIncludeTaskDone(task,fn){
        _includeTask=task.parent;
        if(_includeTask!=null)_includeTask.child=null;
        task.child=null;
        if(isFunction(fn))fn();
    }
    function IncludeTask(parentTask,files,fn){
        this.files=[];
        this.child=null;
        this.parent=parentTask;
        if(parentTask!=null){
            this.parent.child=this;      
        }
        this.isallload=false;
        this.onallload=function(){
            this.isallload=true;
            if(this.child==null){
                setIncludeTaskDone(this,fn);
            }else if(this.child.isallload){
                setIncludeTaskDone(this,fn);
            }
            if(this.parent!=null){
                this.parent.onchildallload();
            }
        };
        this.onchildallload=function(){
            if(this.isallload){
                setIncludeTaskDone(this,fn);
            }
        }
        this.count=0;
        if(isArray(files)){
            for(i in files){
                var url=files[i];
                if(isString(url)&&!(url in jsScript)){
                    this.files.push(url);
                    jsScript[url]=$node("script");
                }
            }
        }else if(files){
            url=files;
            if(isString(url)&&!(url in jsScript)){
                this.files.push(url);
                jsScript[url]=$node("script");
            }
        }
    }
    function includeJSFiles(files,fn){
        _includeTask=new IncludeTask(_includeTask,files,fn);
        includeJSFile(_includeTask);
    }
    function includeJSFile(task){
        if(task.files.length>0){
            var url=task.files.shift();
            var scriptNode=$t.jsScript[url];
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
    function newObject(type,prototype){
        var s='var '+type+'=function(){};';
        if(isObject(prototype)){
            s+=type+'.prototype=proto;';
        }
        s+='return new '+type+'();';
        return Function('proto',s)(prototype);
    }
    function newArrayObject(type,prototype){
        if(prototype){
            return newObject(type,merge(prototype,newArrayObject.prototype));
        }
        return newObject(type,newArrayObject.prototype);
    }
    newArrayObject.prototype={
            clear:function(){
                var l=this.length;
                for(var i=0;i<l;i++){
                    this.pop();
                }
            },
            concat: arrayPrototype.concat,
            // copyWithin: arrayPrototype.copyWithin,
            // entries: arrayPrototype.entries,
            every: arrayPrototype.every,
            // fill: arrayPrototype.fill,
            filter: arrayPrototype.filter,
            // find: arrayPrototype.find,
            // findIndex: arrayPrototype.findIndex,
            forEach: arrayPrototype.forEach,
            indexOf: arrayPrototype.indexOf,
            join: arrayPrototype.join,
            // keys: arrayPrototype.keys,
            lastIndexOf: arrayPrototype.lastIndexOf,
            map: arrayPrototype.map,
            pop: arrayPrototype.pop,
            push: arrayPrototype.push,
            reduce: arrayPrototype.reduce,
            reduceRight: arrayPrototype.reduceRight,
            reverse: arrayPrototype.reverse,
            shift: arrayPrototype.shift,
            slice: arrayPrototype.slice,
            some: arrayPrototype.some,
            sort: arrayPrototype.sort,
            splice: arrayPrototype.splice,
            toLocaleString: arrayPrototype.toLocaleString,
            toString: arrayPrototype.toString,
            unshift: arrayPrototype.unshift
        }
    function newHashObject(type){
        return newObject(type,newHashObject.prototype);
    }
    newHashObject.prototype={
        clean:function(){
            for(var i in this){
                delete this[i];
            }
        }
    }
    /*function delay(s){
        var old=new Date();
        var xhr=new XMLHttpRequest();
        var portPath='http://127.0.0.1:1234';
        var ms=s*1000;
        while((new Date())-old<ms){
            xhr.open('GET',portPath,false);
            try{
                xhr.send();    
            }catch(e){}
        }
    }*/
    function Store(){}
    Store.prototype=extend({
            take:function(name){
                if(this.hasOwnProperty(name)){
                    var ret=this[name];
                    delete this[name];
                    if(ret.childNodes.length>1){
                        return ret.childNodes;
                    }else{
                        return ret.childNodes[0];
                    }
                }
            },
            takeElem:function(name){
                if(this.hasOwnProperty(name)){
                    var ret=this[name];
                    delete this[name];
                    if(ret.children.length>1){
                        return ret.children;
                    }else{
                        return ret.children[0];
                    }
                }
            }
        },newHashObject.prototype);
    function XHR(){
        function send(type,url,data,async,fn,fnerror){
            var xhr=new XMLHttpRequest();
            xhr.open(type,url,!!async);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status === 200 || xhr.status === 0){
                        if(xhr.responseText.length>0){
                            fn(xhr.responseText);    
                        }
                    }
                }
            }
            type=='POST' && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onerror=fnerror;
            xhr.send(data);
        }
        var t={
            get:function(url,async,fn,fnerror){
                send('GET',url,undefined,async,fn,fnerror);
            },
            post:function(url,data,async,fn,fnerror){
                send('POST',url,data,async,fn,fnerror);
            }
        }
        return t;
    }
    function treeEach(array,property,fn,beginIndex){
        if(!isArrayLike(array)){
            return;
        }
        var 
            arr=array,
            i=beginIndex>=0?beginIndex:0,
            stack=[],
            obj,
            obj2,
            state,
            step={next:1};
            
        while(true){
            if(i<arr.length){
                obj=arr[i];
                step.next=1;
                state=fn(obj,step);
                if(state==undefined){
                    state=0
                }else if(state==treeEach.c_stopEach){
                    break;
                }
                obj2=arr[i];
                if(obj2&&obj2!=obj&&!(treeEach.c_noRepeat&state)){
                        state=state|treeEach.c_repeat;
                }
                if(obj2&&obj2[property]&&obj2[property].length>0&&!(state&treeEach.c_noIn)&&property){
                    stack.push(arr);
                    stack.push(i+(state&treeEach.c_repeat?0:step.next));
                    i=0;
                    arr=obj2[property];
                }else{
                    i+=(state&treeEach.c_repeat?0:step.next);
                }
            }else if(stack.length>0){
                i=stack.pop();
                arr=stack.pop();
            }else{
                break;
            }
        }
        return {stack:stack,state:state,array:arr,index:i}
    }
    treeEach.c_stopEach=1;
    treeEach.c_repeat=2;
    treeEach.c_noIn=4;
    treeEach.c_noRepeat=8;
    lockObject(treeEach);
    function nodesToString(nodes){
        var s='';
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType===8){
                s+='<!--'+nodes[i].data+'-->';
            }else if(nodes[i].nodeType===3){
                try{
                s+=nodes[i].data;
                }catch(e){}
            }else if(nodes[i].nodeType===1){
                s+=nodes[i].outerHTML;
            }
        }
        return s;
    }
    function replaceNodeByNodes(node,nodes){
        insertNodesBefore(node,nodes)
        removeNode(node);
    }
    function replaceNodeByNode(node,node2){
        var parent=node.parentNode;
        if(parent==null){
            return;
        }
        insertNode(node,node2);
        parent.removeChild(node);
    }
    function insertNodesBefore(node,nodes){
        var parent=node.parentNode;
        if(parent==null){
            return;
        }
        for(var i=0;i<nodes.length;i++){
            parent.insertBefore2(nodes[i],node);
        }
    }
    function insertNodeBefore(node,node2){
        var parent=node.parentNode;
        if(parent==null)return;
        parent.insertBefore2(node2,node);
    }
    /*
    @param String nodes 节点数组
    @param Function parent 父节点
     */
    function appendNodes(nodes,parent){
        var c=slice.call(nodes);
        for(var i=0;i<c.length;i++){
            parent.appendChild(c[i]);
        }
    }
    function getQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }
    function appendQueryString(name,value)
    {
        if(window.location.search){
            return window.location.href+'&'+name+'='+value;
        }else{
            return window.location.href+'?'+name+'='+value;
        }
    }
    function replaceNodeByString(node,s){
        var parent=node.parentNode;
        if(parent==null)return;
        node.insertAdjacentText('beforeBegin',s)
        parent.removeChild(node);
    }
    function parseBreak(node,outerChildNodes,outerElement,props,part){
        initHTML(node.childNodes,outerChildNodes,outerElement,props,part);
        takeOutChildNodes(node);
    }
    function parseGet(node,outerChildNodes,outerElement,props,part){
        removeNode(node);
        var name=getAttr(node,'name');
        if(name){
            initHTML(node.childNodes,outerChildNodes,outerElement,props,part);
            $t.store[name]=node;    
            return treeEach.c_noIn;
        }
        var toRef=getAttr(node,'to-p-ref');
        if(toRef&&part){
            toRef='$'+toRef;
            if(part[toRef]){
                appendNodes(node.childNodes,part[toRef]);
                initHTML(part[toRef].childNodes,outerChildNodes,outerElement,props,part);
                node.innerHTML='';
            }
        }
    }
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
    function execScript(node,outerChildNodes,outerElement,props,part){
        'use strict'
        var script=node.innerHTML;
        if(script.length>0){
            var fn;
            var keyVar=String(getAttr(node,'var',''));
            
            fn=Function('outer,outerElement,props,part'+(keyVar?',':'')+keyVar,script);
            
            var args=[outerChildNodes,outerElement,props,part];
            if(keyVar.length>0){
                keyVar=keyVar.split(',');
                for(var i=0;i<keyVar.length;i++){
                    var ui=$t.refs[keyVar[i]];
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
    function execTemplateScript(s,node,outerChildNodes,outerElement,props,part){
        s=s.replace(/{%.+?%}/g,function(s){
            return execByScope(node,s.substring(2,s.length-2),null,outerChildNodes,outerElement,props,part);
        })
        return s;
    }
    function getScopeBy(scope,node){
        if(!scope)
            return $t.uiScope.get(node);
        else
            return scope;
    }
    function execByScope(node,s,scope,outer,outerElement,props,part){
        return _execByScope.call(getScopeBy(scope,node),s,node,outer,outerElement,props,part);
    }
    function execScope(s,node,outerChildNodes,outerElement,props,part){
        execByScope(node,'$t.extend(this,{'+s+'});',null,outerChildNodes,outerElement,props,part);
    }
    function parseScript(node,outerChildNodes,outerElement,props,part){
        if(node.type==""||node.type=="on"||node.type=="text/javascript"){
            var src=getAttr(node,'src','');
            if(src){
                includeJSFiles(src);
            }else{
                execTurtleScript(node,outerChildNodes,outerElement,props,part);
            }
            removeNode(node);
        }
    }
    function _getBindObject(scope,name){
        'use strict'
        var i,obj,length=name.length;;
        while(scope){
            obj=scope;
            for(i=0;i<length;i++){
                if(obj.hasOwnProperty(name[i])){
                    if(i<length-1){
                        obj=obj[name[i]];
                        continue;
                    }else{
                        return obj;    
                    }
                }
            }   
            scope=scope.__parent__;
        }
        
        obj=window[name[0]];
        if(obj){
            for(i=1;i<length;i++){
                if(obj.hasOwnProperty(name[i])){
                    if(i<length-1){
                        obj=obj[name[i]];
                        continue;
                    }else{
                        return obj;    
                    }
                }
            }
        }
        return null;
    }
    function splitByOnce(s,split){
        var 
            index=s.indexOf(split),
            arr=[];
        if(index!=-1){
            arr.push(s.substring(0,index));
            arr.push(s.substring(index+split.length,s.length));
        }else{
            arr.push(s);
        }
        return arr;
    }
    function bindPropertyByOrder(node,condition){
        var cdtn=splitByOnce(condition,'|');
        if(cdtn.length<2)return;
        var 
            name,
            scope,
            obj,
            bindVar=cdtn[0],
            name2,
            scope2,
            obj2,
            bindVar2=cdtn[1];
            
        if(bindVar.indexOf(".")!=-1){
            bindVar=bindVar.split(".");
        }else{
            bindVar=[bindVar];
        }
        name=bindVar[bindVar.length-1];
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        
        if(bindVar2.indexOf(".")!=-1){
            bindVar2=bindVar2.split(".");
        }else{
            bindVar2=[bindVar2];
        }
        name2=bindVar2[bindVar2.length-1];
        scope2=$t.uiScope.get(node);
        obj2=_getBindObject(scope2,bindVar2);
        
        bindProperty(obj,name,obj2,name2);
        obj2[name2]=obj[name];
    }
    
    function bindExpressionsByOrder(node,condition){
        var cdtn=splitByOnce(condition,'|');
        if(cdtn.length<2)
            cdtn.push('v');
        var 
            name,
            scope,
            obj,
            bindVar=cdtn[0],
            exp,
            textNode=$node(' ',3);
            
        if(bindVar.indexOf(".")!=-1){
            bindVar=bindVar.split(".");
        }else{
            bindVar=[bindVar];
        }
        name=bindVar[bindVar.length-1];
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        if(obj===null){
            throwError('不能获取绑定属性:'+cdtn[0]);
            return;
        }
        exp=function(v){
            try{
                return _execExpressionsByScope.call(scope,cdtn[1],v,node);
            }catch(e){_catch(e)}
        }
        exp.__me__=exp;
        $t.bindProperty(obj,name,exp,'__me__');
        replaceNodeByNode(node,textNode);
        bindElementProperty(exp,'__me__',textNode,'data');
        textNode['data']=exp.__me__;
    }
    /*绑定属性与描述*/
    function bindNodeProperty(node,proName,condition){
        var 
            cdtn=splitByOnce(condition,"|"),
            name,
            scope,
            obj,
            obj2=node,
            bindVar=cdtn[0],
            exp,
            name2=camelCase(proName);
        if(name2.indexOf(".")!=-1){
            name2=name2.split(".");
            for(var i=0;i<name2.length-1;i++){
                obj2=obj2[name2[i]];
                if(!obj2)return;
            }
            name2=name2[name2.length-1];
        }
        if(bindVar.indexOf(".")!=-1){
            bindVar=bindVar.split(".");
        }else{
            bindVar=[bindVar];
        }
        name=bindVar[bindVar.length-1];
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        if(obj===null){
            throwError('不能获取绑定属性:'+cdtn[0]);
            return;
        }
        if(cdtn.length==2){
            exp=function(v){
                obj2[name2]=_execExpressionsByScope(cdtn[1],v,node);
            }
            exp.__me__=exp;
            bindProperty(obj,name,exp,'__me__');
        }else{
            bindElementProperty(obj,name,obj2,name2);
            obj2[name2]=obj[name];
        }
    }
    /*
     * 绑定标签属性
     */ 
    function bindElementPropertyByName(node,elementValueName,condition){
        var 
            cdtn=splitByOnce(condition,"|"),
            name=cdtn[0],
            scope,
            exp,
            obj;
        if(!name)return;
        scope=$t.uiScope.get(node);
        if(name.indexOf(".")!=-1){
            name=name.split(".");
            obj=_getBindObject(scope,name);
            name=name[name.length-1];
        }else{
            obj=_getBindObject(scope,[name]);
        }
        if(obj===null){
            throwError('不能获取绑定属性:'+cdtn[0]);
            return;
        }
        
        if(cdtn.length==2){
            exp=function(v){
                _execExpressionsByScope(cdtn[1],v,node);
            }
            exp.__me__=exp;
            bindProperty(obj,name,exp,"__me__");
        }else{
            if(!node.__bind__)node[elementValueName]=obj[name];
            bindProperty(obj,name,node,elementValueName);
        }
    }
    function pref(node,part,refName){
        if(part&&refName){
            refName=refName.split(',');
            for(var i=0;i<refName.length;i++){
                part['$'+refName[i]]=node;    
            }
        }
    }
    function bindNodeByCondition(node,condition){
        var 
            cdtn=splitByOnce(condition,"|"),
            name=cdtn[0],
            scope,
            obj,
            exp;
            
        if(!name){
            return;
        }
        scope=$t.uiScope.get(node);
        if(name.indexOf(".")!=-1){
            name=name.split(".");
            obj=_getBindObject(scope,name);
            name=name[name.length-1];
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
    function throwError(err){
        try{
            throw new Error('turtle:\n'+err);
        }catch(e){
            _catch(e);
        }
    }
    /*function replaceByObjectAttr(s,obj){
        var err=[];
        s=s.replace(memberRE,
            function(s){
                var hasDefault;
                var dft;
                var limitValue;
                s=s.substring(1,s.length-1);
                hasDefault=/\!/.test(s);
                if(hasDefault){
                    s=s.split('!');
                    dft=s[1];
                    if(s.length>2)
                        limitValue=s[2];
                    s=s[0];
                }
                if(obj.hasOwnProperty(s)){
                    if(limitValue){
                        return limitValue;
                    }else{
                        return obj[s];
                    }
                }else if(hasDefault){
                    return dft;
                }else{
                    err.push('不可缺少'+s+'属性');
                    return undefined;
                }
            }
        );
        if(err.length>0){
            if($t.config.debugMode==2){
                alert(err.join('\r\n'));
            }
            console.log(err.join('\r\n'));
        }
        return s;
    }
    function replaceByNodeAttr(s,node){
        var err=[];
        s=s.replace(memberRE,
            function(s){
                var hasDefault;
                var dft;
                var limitValue;
                s=s.substring(1,s.length-1);
                hasDefault=/\!/.test(s);
                if(hasDefault){
                    s=s.split('!');
                    dft=s[1];
                    if(s.length>2)
                        limitValue=s[2];
                    s=s[0];
                }
                if(node.hasAttribute(s)){
                    if(limitValue){
                        return limitValue;
                    }else{
                        return node.getAttribute(s);
                    }   
                }else if(hasDefault){
                    return dft;
                }else{
                     err.push(getUIInfo(node).name+'不可缺少'+s+'参数');
                    return undefined;
                }
            }
        );
        if(err.length>0){
            if($t.config.debugMode==2){
                alert(err.join('\r\n'));
            }
            console.log(err.join('\r\n'));
        }
        return s;
    }*/
    /*function parseText(node,outerChildNodes,outerElement,props,part){
        node.data=execTemplateScript(node.data,node.parentNode,outerChildNodes,outerElement,props,part);
    }*/
    function getFunctionComment(fn){
        var s=functionCommentRE.exec(fn.toString());
        return s[1];
    }
    function getFunctionComments(fn){
        var str=fn.toString();
        var s;
        var arr=[];
        while((s=functionCommentRE.exec(str))!==null){
            arr.push(s[1]);
        }
        functionCommentRE.lastIndex=0;
        return arr;
    }
    var getCommentText;
    
    if(Comment.prototype.hasOwnProperty("text")){
        getCommentText=function(node){
           var s=node.text;
           if(/^<!--([\s\S]*?)-->$/.test(s)){
               return s.substring(4,s.length-3);
           }else if(/^<!([\s\S]*?)>$/.test(s)){
               return s.substring(2,s.length-1);
           }
            return node.text.replace(/^!-?|-?&/,'');
        }
    }else{
        getCommentText=function(node){
            return node.data;
        }
    }
    function getCommentStringInfo(s){
        var order=s.match(orderRE);
        if(order){
            return {order:trim(order[0]),condition:s.substring(order[0].length,s.length)}    
        }else{
            var orderCase=s.match(orderCaseRE);
            if(orderCase){
                return {orderCase:trim(orderCase[0]),condition:s.substring(orderCase[0].length,s.length)}  
            }
        } 
    }
    var orderStack= newArrayObject('OrderStack');
    function parseCommentOrderBlock(node,outerChildNodes,outerElement,props,part){
        var i=getNodeIndex2(node);
        var isError=false;
        var error=function(msg){
            isError=true;
            alert(msg);
            return treeEach.c_stopEach;
        }
        return treeEach(node.parentNode.childNodes,'childNodes',function(node,step){
            if(node.nodeType!=8)return;
            var info=getCommentStringInfo(getCommentText(node));
            if(!info)return;
            if(info.order){
                var ret=parseCommentOrderNoScript(info,node,outerChildNodes,outerElement,props,part);
                if(ret){
                    step.next=ret.index-getNodeIndex2(node)+1;
                }
                return treeEach.c_noRepeat+treeEach.c_noIn;
            }
            if(info.orderCase=='end'){
                if(orderStack.length>0){
                    orderStack.pop().endNode=node;
                    
                    return treeEach.c_stopEach;
                }else{
                    return error('语法错误：多余的end');
                }
            }
            return treeEach.c_noIn;
        },i+1);
        
    }
    function deepClone(node){
        var n=node.cloneNode();
        var ns=node.childNodes;
        for(var i=0;i<ns.length;i++){
            n.appendChild(deepClone(ns[i]));
        }
        return n;
    }
    function DropRect(elem,fnbegin,fn,fnend){
        this.on=function(){
            elem.addEventListener("mousedown",md);
            elem.addEventListener("touchstart",td);
            with(document.body){
                addEventListener("mouseup",mu);
                addEventListener("touchend",tu);
                addEventListener("touchcancel",tu);
            }
        }
        this.off=function(){
            elem.removeEventListener("mousedown",md);
            elem.removeEventListener("touchstart",td);
            with(document.body){
                removeEventListener("mouseup",mu);
                removeEventListener("touchend",tu);
                removeEventListener("touchcancel",tu);
            }
        }
        
        var start,offsetLeft,offsetTop;
        
        function setOffset(){
            var node=elem.valueOf();
            var t=0,l=0;
            var topE=document.documentElement;
            while(node!==topE){
                t+=node.offsetTop;
                l+=node.offsetLeft;
                node=node.parentNode;
            }
            offsetLeft=l;
            offsetTop=t;
        }
        function md(e){
            start=e;
            setOffset();
            document.body.addEventListener("mousemove",mm);
            fnbegin(offsetLeft,offsetTop);
        }
        function td(e){
            start=e.changedTouches[0];
            setOffset();
            fnbegin(offsetLeft,offsetTop);
            document.body.addEventListener("touchmove",tm);
        }
        function getRectByPoint(x1,y1,x2,y2){
            var rect={}
            if(x1>x2){
                rect.left=x2;
                rect.width=x1-x2;
            }else{
                rect.left=x1;
                rect.width=x2-x1;
            }
            if(y1>y2){
                rect.top=y2;
                rect.height=y1-y2;
            }else{
                rect.top=y1;
                rect.height=y2-y1;
            }
            rect.screenLeft=rect.left;
            rect.screenTop=rect.top;
            rect.left-=offsetLeft;
            rect.top-=offsetTop;
            return rect;
        }
        function mm(e){
            if(start){
                fn(getRectByPoint(start.x,start.y,e.clientX,e.clientY));
            }
        }
        function tm(e){
            if(start){
                fn(getRectByPoint(start.changedTouches[0].clientX,start.changedTouches[0].clientY,e.changedTouches[0].clientX,e.changedTouches[0].clientY));
            }
        }
        function mu(e){
            if(start){
                fnend(getRectByPoint(start.x,start.y,e.clientX,e.clientY));
                start=null;
                document.body.removeEventListener("mousemove",mm);
            }
        }
        function tu(e){
            if(start){
                fnend(getRectByPoint(start.changedTouches[0].clientX,start.changedTouches[0].clientY,e.changedTouches[0].clientX,e.changedTouches[0].clientY));
                start=null;
                document.body.removeEventListener("touchmove",tm);
            }
        }
    }
    function dropMove(elemTarget,elemMove,arrow,noOut,fn){
        fn=getDebounce(fn);
        elemTarget.addEventListener("mousedown",md);
        elemTarget.addEventListener("touchstart",td);
        with(document.body){
            addEventListener("mouseup",mu);
            addEventListener("touchend",tu);
            addEventListener("touchcancel",tu);
        }
        var start,startLeft,startTop;
        function md(e){
            e.stopPropagation();
            startLeft=elemMove.offsetLeft;
            startTop=elemMove.offsetTop;
            start=e;
            document.body.addEventListener("mousemove",mm);
        }
        function td(e){
            e.stopPropagation();
            startLeft=elemMove.offsetLeft;
            startTop=elemMove.offsetTop;
            start=e.changedTouches[0];
            document.body.addEventListener("touchmove",tm);
        }
        function mmove(e){
            switch(arrow){
                case 1:
                    setLeft(startLeft+e.x-start.x);
                    break;
                case 2:
                    setTop(startTop+e.y-start.y);
                    break;
                case 3:
                    setLeft(startLeft+e.clientX-start.x);
                    setTop(startTop+e.clientX-start.x);
                    break;
                case 4:
                    setLeft(startLeft+e.clientY-start.y);
                    setTop(startTop+e.clientY-start.y);
                    break;
                default:
                    setLeft(startLeft+e.x-start.x);
                    setTop(startTop+e.y-start.y);
            }
            fn(30);
        }
        function mm(e){
            if(start){
                mmove(e);
            }
        }
        function setLeft(v){
            if(noOut){
                if(v<0){
                    v=0;
                }else if(v+elemMove.offsetWidth>elemMove.parentNode.offsetWidth){
                    v=elemMove.parentNode.offsetWidth-elemMove.offsetWidth;
                }
            }
            elemMove.style.left=v+'px';
        }
        function setTop(v){
            if(noOut){
                if(v<0){
                    v=0;
                }else if(v+elemMove.offsetHeight>elemMove.parentNode.scrollHeight){
                    v=elemMove.parentNode.offsetHeight-elemMove.offsetHeight;
                }
            }
            elemMove.style.top=v+'px';
        }
        function tmove(e){
            switch(arrow){
                case 1:
                    setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                    break;
                case 2:
                    setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
                    break;
                case 3:
                    setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                    setTop(startTop+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                    break;
                case 4:
                    setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientY);
                    setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
                    break;
                default:
                    setLeft(startLeft+e.changedTouches[0].clientX-start.changedTouches[0].clientX);
                    setTop(startTop+e.changedTouches[0].clientY-start.changedTouches[0].clientY);
            }
            fn(30);
        }
        function tm(e){
            if(start){
                tmove(e);
            }
        }
        function mu(e){
            if(start){
                mmove(e);
                start=null;
                document.body.removeEventListener("mousemove",mm);
            }
        }
        function tu(e){
            if(start){
                tmove(e);
                start=null;
                document.body.removeEventListener("touchmove",tm);
            }
        }
    }
    function cloneBetween(node1,node2){
        var nodes=[];
        var l1=getNodeIndex2(node1);
        var l2=getNodeIndex2(node2);
        var p1=node1.parentNode;
        for(var i=l1+1;i<l2;i++){
            nodes.push(deepClone(p1.childNodes[i]));
        }
        return nodes;
    }
    function getElementsBetween(node1,node2){
        var nodes=[];
        var l1=getNodeIndex2(node1);
        var l2=getNodeIndex2(node2);
        var p1=node1.parentNode;
        for(var i=l1+1;i<l2;i++){
            nodes.push(p1.childNodes[i]);
        }
        return nodes;
    }
    function takeBlockBetween(node1,node2){
        var p1=node1.parentNode;
        var ns1=p1.childNodes;
        var l1=getNodeIndex2(node1)+1;
        l2=getNodeIndex2(node2);
        var ns=[];
        for(var i=l1;i<l2;i++){
            ns.push(p1.removeChild(ns1[l1]));
        }
        return ns;
    }
    function removeBlockBetween(node1,node2){
        var p1=node1.parentNode;
        var l1=getNodeIndex2(node1)+1;
        l2=getNodeIndex2(node2);
        for(var i=l1;i<l2;i++){
            p1.removeChild(p1.childNodes[l1]);
        }
    }
    function parseComment(node,outerChildNodes,outerElement,props,part){
        var info=getCommentStringInfo(getCommentText(node));
        if(!info)return;
        if(!info.order){
            alert("语法错误：不恰当的"+info.orderCase);
            return ;
        }
        parseCommentOrder(info,node,outerChildNodes,outerElement,props,part);
        if(node.order){
            if(node.order.endNode){
                node.order.run();
                
            }
        }
    }
    function parseAsyncOrder(info,node,outerChildNodes,outerElement,props,part){
        return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
            return {
                run:function(){
                    var order=this;
                    var ns=takeBlockBetween(this.node,this.endNode);
                    var delay=parseInt(this.condition);
                    if(delay===NaN){
                        delay=0;
                    }
                    removeNode(this.endNode);
                    var mark=$node('async',8);
                    replaceNodeByNode(this.node,mark);
                    this.endNode=null;
                    this.node=null;
                    setTimeout(function(){
                        var elem=$node('div');
                        var p=mark.parentNode;
                        replaceNodeByNode(mark,elem);
                        mark=null;
                        appendNodes(ns,elem);
                        var chds=elem.childNodes;
                        initHTML(chds,outerChildNodes,outerElement,props,part);
                        takeOutChildNodes(elem);
                        elem=null;
                        replaceCls();
                    },delay);
                }
            }
        });
    }
    function parseSwitchOrder(info,node,outerChildNodes,outerElement,props,part){
        
        return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
            
            return {
                value:execByScope(node,info.condition,null,outerChildNodes,outerElement,props,part),
                hit:null,
                needBreak:false,
                endHit:null,
                hasDefault:false,
                run:function(){
                    var order=this;
                    var scope=$t.uiScope.get(node);
                    treeEach(node.parentNode.childNodes,'childNodes',function(node,step){
                        if(node.nodeType!=8)return;
                        var info=getCommentStringInfo(getCommentText(node));
                        if(!info)return;
                        if(node.order){
                            step.next=getNodeIndex2(node.order.endNode)-getNodeIndex2(node);
                            return;
                        }
                        switch(info.orderCase){
                            case 'case':
                            case 'case break':
                                if(order.hasDefault){
                                    return error('语法错误：default后不应出现case/case break');
                                }else if(!order.hit){
                                    var isPass=order.value==execByScope(node,info.condition,scope,outerChildNodes,outerElement,props,part);
                                    if(isPass){
                                        order.hit=node;
                                        node.order=info.orderCase;
                                    }
                                }else if(!order.endHit){
                                    order.endHit=node;
                                }
                                break;
                            case 'default':
                                if(order.hasDefault){
                                    return error('语法错误：多余的default');
                                }else{
                                    order.hasDefault=true;
                                    if(!order.hit){
                                        order.hit=node;
                                        node.order=info.orderCase;
                                    }else if(!order.endHit){
                                        order.endHit=node;
                                    }
                                }
                                break;
                        }
                    },getNodeIndex2(node)+1);
                    var p=this.node.parentNode;
                    if(!this.hit){
                        /*全部删除*/
                        removeBlockBetween(this.node,node);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }else{
                        if(!this.endHit){
                            this.endHit=this.endNode;
                        }
                        //删除hit前的数据
                        removeBlockBetween(this.node,this.hit);
                        //外置hit的数据
                        var ns=takeBlockBetween(this.hit,this.endHit);
                        insertNodesBefore(this.node,ns);
                        
                        removeNode(this.hit);
                        
                        if(this.hit.order==='case break'/*已终止选择*/||this.endHit===this.endNode/*已结束*/){
                            /*全部删除*/
                            removeBlockBetween(this.node,this.endNode);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                    }
                    delete this.node.order;
                }
            }
        });
    }
    function parseBreakOrder(info,node,outerChildNodes,outerElement,props,part){
        /*删除后面节点,父节点后面节点,父父节点后面节点直至__break__*/
        var _node=node.previousSibling;
        if(!_node)
            _node=node.parentNode;
        removeNode(node);
        var p=_node.parentNode;
        while(_node.nodeName!='__BREAK__'){
            var cs=p.childNodes;
            var length=cs.length;
            var index=getNodeIndex2(_node)+1;
            for(var i=index;i<length;i++){
                p.removeChild(cs[index]);
            }
            _node=p;
            p=p.parentNode;
        }
        _node.source.onBreak();
    }
    function parseIfOrder(info,node,outerChildNodes,outerElement,props,part){
        return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
            var scope=$t.uiScope.get(node);
            return {
                endHit:null,
                hit:null,
                hasElse:false,
                run:function(){
                    var order=this;
                    order.hit=parseBool(execByScope(node,this.condition,scope,outerChildNodes,outerElement,props,part))?this.node:null;
                    treeEach(node.parentNode.childNodes,'childNodes',function(node,step){
                        if(node.nodeType!=8)return;
                        var info=getCommentStringInfo(getCommentText(node));
                        if(!info)return;
                        if(node.order){
                            step.next=getNodeIndex2(node.order.endNode)-getNodeIndex2(node);
                            return;
                        }
                        switch(info.orderCase){
                            case 'else':
                            case 'else if':
                                if(!order.hasElse){
                                    if(info.orderCase=='else'){
                                       order.hasElse=true;
                                    }
                                    if(!order.endHit){
                                        if(order.hit){
                                            order.endHit=node;
                                        }else{
                                            if(info.orderCase=='else'||parseBool(execByScope(node,this.condition,scope,outerChildNodes,outerElement,props,part))){
                                                order.hit=node;
                                            }else{
                                                /*删除else if*/
                                                removeNode(node);
                                            }
                                        }
                                    }
                                }else{
                                    return error('语法错误：else或else if不能出现在else后');
                                }
                                break;
                        }
                    },getNodeIndex2(node)+1);
                    var p=this.node.parentNode;
                    if(!this.hit){
                        /*全部删除*/
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }else{
                        if(!this.endHit){
                            this.endHit=this.endNode;
                        }
                        /*保留hit到break之间的内容*/
                        var ns=takeBlockBetween(this.hit,this.endHit);
                        insertNodesBefore(this.node,ns);
                        
                        /*全部删除*/
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }
                }
            }
        });
    }
    function addOrderToNode(node,info,outerChildNodes,outerElement,props,part,fnGetOrder){
        var order;
        if(!node.order){
            order=fnGetOrder();
            node.order=order;
            order.name=info.order;
            order.node=node;
            order.endNode=null;
            order.condition=info.condition;
            orderStack.push(order);
            order.parseCommentOrderBlockReturnValue=parseCommentOrderBlock(node,outerChildNodes,outerElement,props,part);
        }else{
            order=node.order;
        }
        return order.parseCommentOrderBlockReturnValue;
    }
    function parseWhileOrder(info,node,outerChildNodes,outerElement,props,part){
        
        return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
            return {
                run:function(){
                    var p=this.node.parentNode;
                    if(this.isBreak||!parseBool(execByScope(this.node,this.condition,null,outerChildNodes,outerElement,props,part))){
                        //全部删除
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }else{
                        var nodes=cloneBetween(this.node,this.endNode);
                        this.node.parentNode.insertBefore2(createBreakElement(nodes,this),this.node);
                    }
                },
                onBreak:function(){
                    this.isBreak=true;
                },
                isBreak:false
            }
        });
    }
    function parseForOrder(info,node,outerChildNodes,outerElement,props,part){
        
        return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
            var check;
            if(parseForOrderRE.test(info.condition)){
                check=(function(){
                    var s=info.condition.split(' in '),
                        index=0,
                        names=[],
                        source;
                    return function(){
                        if(!source){
                            source=execByScope(node,s[1],null,outerChildNodes,outerElement,props,part)
                            if(!source){
                                return {result:false,params:null}
                            }
                            for(var i in source){
                                names.push(i);
                            }
                            if(names.length==0){
                                return {result:false,params:null}
                            }
                        }
                        if(index<names.length){
                            execByScope(node,s[0]+'=\''+names[index]+'\';',null,outerChildNodes,outerElement,props,part)
                            index++;
                            return {result:true,params:null}
                        }else{
                            return {result:false,params:null}
                        }
                    }
                }());
            }else if(parseForOrderRE2.test(info.condition)){
                check=(function(){
                    var isFirst=true;
                    var s=info.condition.split(';');
                    if(s.length==2){
                        return function(){
                            return {result:false,params:null};
                        }
                    }
                    return function(){
                        if(isFirst){
                            isFirst=false;
                            execByScope(node,s[0],null,outerChildNodes,outerElement,props,part);
                        }else{
                            execByScope(node,s[2],null,outerChildNodes,outerElement,props,part);
                        }
                        return {result:execByScope(node,s[1],null,outerChildNodes,outerElement,props,part),params:null};
                    }
                }());
            }else{
                check=function(){
                    return {result:false,params:null};
                }
            }
            return {
                check:check,
                run:function(){
                    var p=this.node.parentNode;
                    var ret=this.check();
                    if(this.isBreak||!ret.result){
                        //全部删除
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }else{
                        var nodes=cloneBetween(this.node,this.endNode);
                        this.node.parentNode.insertBefore2(createBreakElement(nodes,this),this.node);
                    }
                },
                onBreak:function(){
                    this.isBreak=true;
                },
                isBreak:false
            }
        });
    }
    function createBreakElement(nodes,order){
        var breakElement=$node('__break__');
        for(var i=0;i<nodes.length;i++){
            breakElement.appendChild(nodes[i]);
        }
        breakElement.source=order;
        return breakElement;
    }
    function parseCommentOrderNoScript(info,node,outerChildNodes,outerElement,props,part){
        /*不渲染，纯找结构*/
        switch(info.order){
            case 'while':
                return parseWhileOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'if':
                return parseIfOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'for':
                return parseForOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'switch':
                return parseSwitchOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'async':
                return parseAsyncOrder(info,node,outerChildNodes,outerElement,props,part);
        }
    }
    function parseScopeOrder(info,node,outerChildNodes,outerElement,props,part){
        var condition=splitByOnce(info.condition,"|");
        if(condition.length==2){
            $t.uiScope.create(node,condition[0]);
            execScope(condition[1],node,outerChildNodes,outerElement,props,part);
        }else{
            $t.uiScope.create(node,condition[0]);
        }
        removeNode(node);
    }
    function parseCommentOrder(info,node,outerChildNodes,outerElement,props,part){
        switch(info.order){
            case 'scope':
                parseScopeOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'var':
                execScope(info.condition,node,outerChildNodes,outerElement,props,part);
                removeNode(node);
                break;
            case 'bind':
                bindPropertyByOrder(node,info.condition);
                break;
            case '-':
                bindExpressionsByOrder(node,info.condition);
                break;
            case '!':
                execByScope(node,info.condition,null,outerChildNodes,outerElement,props,part);
                removeNode(node);
                break;
            case '=':
                var v=execByScope(node,info.condition,null,outerChildNodes,outerElement,props,part);
                if(isObject(v)&&v.nodeType){
                    replaceNodeByNode(node,v);
                }else{
                    replaceNodeByNode(node,$node(v,3));
                }
                
                break;
            case 'content':
                replaceNodeByNodes(node,outerChildNodes);
                break;
            case 'elements':
                replaceNodeByNodes(node,outerElement);
                break;
            case 'while':
                return parseWhileOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'if':
                return parseIfOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'break':
                return parseBreakOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'for':
                return parseForOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'switch':
                return parseSwitchOrder(info,node,outerChildNodes,outerElement,props,part);
            case 'async':
                return parseAsyncOrder(info,node,outerChildNodes,outerElement,props,part);
        }
    }
    function getLastOrder(name){
        var arr=orderStack;
        if(arr.length==0)return null;
        var order=arr[arr.length-1];
        if(order.name==name){
            return order;
        }else{
            return null;
        }
    }
    function parseTemp(node){
        var ret=parseXMP(node);
        replaceNodeByNodes(node,ret);
    }
    function parseLazy(node,outerChildNodes,outerElement,props,part){
        node.removeAttribute('lazy');
        initHTML(node.childNodes,outerChildNodes,outerElement,props,part);
    }
    function parseAsync(node,outerChildNodes,outerElement,props,part){
        var delay=parseInt(execByScope(node,node.getAttribute('async')),null,outerChildNodes,outerElement,props,part);
        node.removeAttribute('async');
        var mark=$node('async',8);
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
    var elementParser={
                GET:parseGet,
                SET:parseSet,
                __BREAK__:parseBreak,
                SCRIPT:parseScript
            }
        ,attributeParser={
            ref:function(node,outerChildNodes,outerElement,props,part){
                var refName=node.getAttribute('ref')
                node.removeAttribute('ref');
                $t.refs.push(refName.split(','),node);
            }
            ,":":function(node,outerChildNodes,outerElement,props,part){
                execNodeQuestion(node,outerChildNodes,outerElement,props,part);
                setQuestionAtrr(node,outerChildNodes,outerElement,props,part);
            }
            ,'p-ref':function(node,outerChildNodes,outerElement,props,part){
                pref(node,part,takeAttr(node,'p-ref'));
            }
            ,bind:function(node,outerChildNodes,outerElement,props,part){
                bindNodeByCondition(node,takeAttr(node,'bind'));
            }
            ,remove:function(node,outerChildNodes,outerElement,props,part){
                bindRemove(node,takeAttr(node,'remove'),outerChildNodes,outerElement,props,part);
            }
            ,add:function(node,outerChildNodes,outerElement,props,part){
                bindAdd(node,takeAttr(node,'add'),outerChildNodes,outerElement,props,part);
            }
            ,show:function(node,outerChildNodes,outerElement,props,part){
                bindShowHide(node,takeAttr(node,'show'),true,outerChildNodes,outerElement,props,part);
            }
            ,hide:function(node,outerChildNodes,outerElement,props,part){
                bindShowHide(node,takeAttr(node,'hide'),false,outerChildNodes,outerElement,props,part);
            }
            ,cls:function(node,outerChildNodes,outerElement,props,part){
                $t.clsNode.push(node);
                /*不要删node.removeAttribute('cls');*/
            }
            ,'p-main':function(node,outerChildNodes,outerElement,props,part){
                if(part&&!part.partMain){
                    part.partMain=node;
                }
            }
        };
    function initHTML(c,outerChildNodes,outerElement,props,part){
        treeEach(c,'childNodes',function(node,step){
            if(node.nodeType===8){
                try{
                    parseComment(node,outerChildNodes,outerElement,props,part);    
                }catch(e){_catch(e)}
                return treeEach.c_noIn;
            }
            if(node.nodeType!==1){
                return;
            }
            if(node.hasAttribute('async')){
                parseAsync(node,outerChildNodes,outerElement,props,part);
                return treeEach.c_repeat;
            }
            if(node.hasAttribute('lazy')){
                parseLazy(node,outerChildNodes,outerElement,props,part);
                return treeEach.c_noIn|treeEach.c_repeat;
            }
            var uiInfo=getUIInfo(node);
            if(uiInfo){
                parseUI(node,uiInfo,step,part);
                return treeEach.c_noIn|treeEach.c_noRepeat;
            }
            /*if(isTemplate(node)){
                parseTemp(node);
                return;
            }*/
            if(elementParser.hasOwnProperty(node.nodeName)){
                /* var ret=*/return elementParser[node.nodeName](node,outerChildNodes,outerElement,props,part);
                /* if(ret){
                    return ret;
                 };*/
            }
            var attrs=slice.call(node.attributes);
            for(var i=0;i<attrs.length;i++){
                if(attributeParser.hasOwnProperty(attrs[i].name)){
                    attributeParser[attrs[i].name](node,outerChildNodes,outerElement,props,part);
                }
            }
        });
    }
    
    function defineClasses(node){
        $t.styleClasses.push(getAttr(node,'class'),trimLine(getTemplate(node)));
        removeNode(node);
    }
    
    function hasAttrOnce(node,attr){
        if(node.hasAttribute(attr)){
            node.removeAttribute(attr)
            return true;
        }
        return false;
    }
    
    function parseSet(node,outerChildNodes,outerElement,props,part){
        
        if(node.hasAttribute('link')){
            /*设置关联子对象*/
            var link=takeAttr(node,'link');
            if($t.store.hasOwnProperty(link)&&node.children.length==1){
                appendNodes($t.store[link].childNodes,node.children[0]);
                takeOutChildNodes(node);
            }else{
                removeNode(node);
            }
        }else{
            var ns;
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
            var isAppend=!node.hasAttribute('append');
            node.removeAttribute('append');
            var attr=node.attributes;
            for(var j=0;j<ns.length;j++){
                if(isAppend){
                    for(var i=0;i<attr.length;i++){
                        ns[j].setAttribute(attr[i].name,attr[i].value);
                    }
                }else{
                    for(var i=0;i<attr.length;i++){
                        var value=attr[i].value;
                        switch(attr[i].name){
                            case 'class':
                                var value2=ns[j].getAttribute(attr[i].name);
                                if(value2){
                                    value+=(/ $/.test(value)?'':' ')+value2;
                                }
                                break;
                            case 'style':
                                var value2=ns[j].getAttribute(attr[i].name);
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
        return treeEach.c_noIn;
    }
    function setNodeProperty(node,proName,condition,outerChildNodes,outerElement,props,part){
        var v=execByScope(node,condition,null,outerChildNodes,outerElement,props,part);
        var name=camelCase(proName.substr(0,proName.length-1));
        
        if(name.indexOf(".")!=-1){
            var obj2=node;
            name=name.split(".");
            for(var i=0;i<name.length-1;i++){
                obj2=obj2[name[i]];
                if(!obj2)return;
            }
            name=name[name.length-1];
            obj2[name]=v;
        }else{
            node.setAttribute(name,v);
        }
    }
    function getObjectValue(obj,vars){
        for(var i in vars){
            if(vars[i] in obj){
                obj=obj[vars[i]];
            }else{
                return null;
            }
        }
        return obj;
    }
    function bindFunction(obj,bindVar,fn){
        var vars=bindVar.split('.');
        var propertyName;
        if(vars.length>0){
            propertyName=vars.pop();
            obj=getObjectValue(obj,vars);
        }else{
            propertyName=bindVar;
        }
        fn.__me__=fn;
        bindProperty(obj,propertyName,fn,"__me__");
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
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        fn.__me__=fn;
        bindProperty(obj,name,fn,"__me__");
        return {object:obj,name:name,targetObject:fn,targetName:"__me__"};
    }
    function execValueByScope(node,s,v,scope,outer,outerElement,props,part){
        return _execValueByScope.call(getScopeBy(scope,node),s,v,node,outer,outerElement,props,part);
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
    function bindRemove(node,s,outer,outerElement,props,part){
        var bindInfo=bindEval(node,s,outer,outerElement,props,part,function(v){
            if(!v)return;
            removeBind(this,bindInfo.targetName,bindInfo.name);
            removeNode(node);
        });
    }
    function bindAdd(node,s,outer,outerElement,props,part){
        var placeholder=$node('',8);
        replaceNodeByNode(node,placeholder);
        var bindInfo=bindEval(node,s,outer,outerElement,props,part,function(v){
            if(!v)return;
            removeBind(this,bindInfo.targetName,bindInfo.name);
            replaceNodeByNode(placeholder,node);
        });
    }
    function execNodeQuestion(node,outerChildNodes,outerElement,props,part){
        var v=takeAttr(node,':');
        if(v.length>0){
            execByScope(node,v,null,outerChildNodes,outerElement,props,part);
        }
    }
    function setQuestionAtrr(node,outerChildNodes,outerElement,props,part){
        var attrs=slice.call(node.attributes);
        for(var i=0;i<attrs.length;i++){
            var name=attrs[i].name;
            if(name.length>1){
                if(name[name.length-1]===':'){
                    setNodeProperty(node,name,takeAttr(node,name),outerChildNodes,outerElement,props,part);
                }else if(name[0]===':'){
                    bindNodeProperty(node,name.substring(1,name.length),takeAttr(node,name));
                }
            }
        }
    }
    function UIParam(name,hasDefault,filter,filterParam,defaultValue,limitValue){
        this.name=name;
        this.hasDefault=hasDefault;
        this.defaultValue=defaultValue;
        this.limitValue=limitValue;
        this.filter=filter;
        this.filterParam=filterParam;
    }
    function UITemplate(name,sortPath,path,s,ext){
        var t=this;
        t.name=name;
        t.sortPath=sortPath;
        t.path=path;
        t.partName=t.name.replace(/[\.]/g,"_");
        (t.parts=[]).last=last;
        if(isObject(s)){
            if(!isArray(s.params)){
                t.params=[];    
            }else{
                t.params=s.params;
            }
            
            if(!isArray(s.datas)){
                t.datas=[];
            }else{
                t.datas=s.datas;
            }
            
            if(isObject(s.extends)){
                t.extends=s.extends;
            }
            
            t.isJSDefine=true;
            
            if(isObject(s.service)){
                if(!(s.service instanceof Service)){
                    t.service=new Service(s.service);
                }else{
                    t.service=s.service;
                }
            }else{
                t.service=new Service();
            }
        }else{
                
            t.params=[];
            t.datas=[];
            t.isJSDefine=false;
            t.service=new Service();
            if(ext){
                t.extends=ext;    
            }
            var start=0;
            var idx=0;
            s.replace(memberRE,function(s0,name,s1,dft,s2,s3,limit,s4,s5,s6,filter,filterParam,index,sSource){
                var hasDefault;
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
                t.params.push(new UIParam(name,hasDefault,filter,filterParam,dft,limit));
                t.datas.push(sSource.substring(start,index));
                start=index+s0.length;
                return '';
            });
            t.datas.push(s.substring(start,s.length));
        }
    }
    UITemplate.prototype={
        /*调用render*/
        renderIn:function(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
            var uiNode;
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
        },
        /*调用render*/
        renderBefore:function(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
            var uiNode;
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
        },
        /*渲染dom*/
        render:function(uiNode,that,outerChildNodes,outerElement,props,part,partName,reExtends){
            
            var 
                ext,
                attrs,
                len,
                html,
                part;
                
            
            if(!isObject(props)){
                props={};
            }
            
            if(!uiNode){
                uiNode=$node('ui:render');//document.createElement("ui:render");
            }else{
                setQuestionAtrr(uiNode,outerChildNodes,outerElement,part?part.props:props,part);
            
                attrs=uiNode.attributes;
                len=attrs.length;
                for(var i=0;i<len;i++){
                    var name=attrs[0].name;
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
            if(ext instanceof UITemplate){
                ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
            }
            part=newPart(this,uiNode,ext,execTemplateScript(html,that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement,props,part,partName)
            this.parts.push(part);
            
            if(uiNode.parentNode!==null){
                //var p=uiNode.parentNode.__domNode__;
                part.insertBefore(uiNode);
                removeNode(uiNode);
                /*if(p){
                    debugger;
                    vNodesToDOM(part.store);
                }*/
            }
            return part;
        },
        /*由props构建html字符串*/
        joinDatasByProps:function(props){
            
            var err=[];
            var d=slice.call(this.datas);
            for(var i=0;i<d.length-1;i+=2){
                var v;
                var p=this.params[i/2];
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
                if(p.filter&&paramFilter.hasOwnProperty(p.filter)){
                    v=paramFilter[p.filter](v,p.filterParam);
                }
                d.splice(i+1, 0, v);  
            }
            if(err.length>0){
                if($t.config.debugMode==2){
                    alert(err.join('\r\n'));
                }
                log(err.join('\r\n'));
                bp();
                return;
            }
            return d.join('');
        },
        /*变成别人的扩展*/
        beExtends:function(uiNode,that,outerChildNodes,outerElement,props,part){
            if(this.extends instanceof UITemplate){
                var ext=this.extends.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
            }
            var html;
            html=this.joinDatasByProps(props);
            return newExtendsPart(this,uiNode,ext,execTemplateScript(html,that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement,props,part);
        },
        toDefineString:function(){
            var s='$t.ui.define("'+this.name+'","'+this.sortPath+'","'+this.path+'",{datas:';
            s+=JSON.stringify(this.datas).replace(/<\/script>/g,'</scr"+"ipt>');
            s+=',params:[';
            var params=[];
            var ps=this.params;
            for(var i=0;i<ps.length;i++){
                var dft=JSON.stringify(ps[i].defaultValue);
                var limitValue=JSON.stringify(ps[i].limitValue);
                
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
        },
        parseParamsHelp:function(p){
            var params=this.params;
            for(var i=0;i<params.length;i++){
                if(p.hasOwnProperty(params[i].name)){
                    p[params[i].name]|=!params[i].hasDefault;
                }else{
                    p[params[i].name]=!params[i].hasDefault;
                }
            }
            if(this.extends){
                this.extends.parseParamsHelp(p);
            }
        },
        getParamsHelp:function(){
            var p={};
            this.parseParamsHelp(p);
            var arr=[];
            for(var i in p){
                arr.push({name:i,necessary:p[i]});
            }
            return arr;
        }
    }
    function newExtendsPart(template,node,extPart,s,outerChildNodes,outerElement,props,part){
        if(extPart){
            var t=newObject(template.partName,extPart);
        }else{
            var t=newObject(template.partName,newPart.prototype);    
        }
        var name=template.name;
        
        var dom=$DOM(s);
        //node.innerHTML=s;
        t.template=template;
        t.super=extPart;
        t.isExtend=true
        var nodes=dom.childNodes;
        t.$=new Service(template.service);
        initHTML(nodes,outerChildNodes,outerElement,props,t);
        t.store=[];
        for(var i=nodes.length;i>0;i--){
            t.store.push(dom.removeChild(nodes[0]));
        }
        t.to=function(part){
            var proto=part.$.__proto__;
            t.$.__proto__=proto;
            part.$.__proto__=t.$;
            if(extPart){
                extPart.to(part);
            }
            
            push.apply(part.store,t.store);
        }
        return t;
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
    newPart.prototype={
        toString:function(){
            return this.template.partName+":"+JSON.stringify(this.props);
        },
        treeDiagram:function(tabSpace){
            if(tabSpace===undefined){
                tabSpace=0;
            }
            var s="\r\n"+new Array(tabSpace+1).join(" ")+this.toString();
            var child=this.child;
            for(var i=0;i<child.length;i++){
                s+=child[i].treeDiagram(tabSpace+8);
            }
            return s;
        },
        get elementLength(){
            if(this.isInsert){
                return this.store.length;
            }else{
                return 1;
            }
        },
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
        },
        get child(){
            return getParts(this.elements);
        },
        getParentPart:function(node){
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
        },
        get parent(){
            return this.getParentPart(this.begin);
        },
        getRect:function(){
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
        },
        emitResize:function(){
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
        },
        onSetSize:function(rect){
            if(this.partMain){
                var style=this.partMain.style;
                style.left=rect.left+'px';
                style.top=rect.top+'px';
                style.width=rect.width+'px';
                style.height=rect.height+'px';
                style.boxSizing='border-box';
                this.emitResize();
            }
        },
        setSize:function(rect){
            if(this.onSetSize){
                return this.onSetSize(rect);
            }
            if(this.super){
                this.super.setSize(rect);
            }
        },
        get innerHTML(){
            return nodesToString(this.elements);
        },
        get elemParent(){
            return this.begin.parentNode;
        },
        insertTo:function(elem){
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
        },
        insertBefore:function(elem){
            
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
        },
        getSuper:function(name){
            if(this.super){
                if(this.super.template.name===name){
                    return this.super;    
                }else{
                    return this.super.getSuper(name);
                }
            }
        },
        emitInit:function(finalPart){
            if(this.super){
                this.super.emitInit(finalPart);
            }
            if(this.hasOwnProperty('onInit')&&isFunction(this.onInit)){
                this.onInit(finalPart);
            }
        },
        remove:function(){
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
        },
        get scopeNodes(){
             var scopeNodes=[];
             treeEach(this.elements,"children",function(node){
                 if(node.hasOwnProperty("scope")){
                     scopeNodes.push(node);
                     return treeEach.c_noIn;
                 }
             });
             return scopeNodes;
        }
    }
    var emitResize=function(){
        var parts=RootParts;
        for(var i=0;i<parts.length;i++){
            parts[i].emitResize();
        }
    }
    var onResize=function(fn){
        bindFunction($client,'onResize',getStep(function(v){
           fn(v);
        }),2);
    }
    function RootParts(){
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
    function getParts(childNodes){
        var child=[];
        var cpn=null;
        treeEach(childNodes,"childNodes",function(node){
            if(node.nodeType===8&&node.part){
                if(cpn!==null){
                    if(node.part===cpn&&node.sign===0){
                        child.push(node.part);
                        cpn=null;
                    }
                }else{
                    cpn=node.part;
                }
                return;
            }
            if(cpn!==null){
                return treeEach.c_noIn;
            }
        });
        return child;
    }
    function defineServiceByNode(node){
        var name=node.getAttribute('service');
        if(name){
            var nodeName=node.getAttribute('ui');
            if(nodeName){
                if($t.ui.hasOwnProperty(nodeName)){
                    /*把服务定义到组件*/
                    $t.ui[nodeName].service.define(name,getTemplate(node));
                }else{
                    throwError('不能定义service：'+name+'到'+nodeName+'上');
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
    function getExtendsByNode(node,sortPath){
        var ext=getAttr(node,'extends',null);
        if(isString(ext)){
            return getExtends(ext,sortPath);
        }
    }
    function getExtends(extName,sortPath){
        var ext;
        if(extName.indexOf(':')!==-1){
            extName=extName.split(':');
            sortPath=extName[0]?extName[0]:sortPath;
            extName=extName[1];
        }
        if(!isObject(importUIHTML(extName,sortPath))){
            throwError('找不到可继承的模板：'+extName);
        }
        ext=$t.ui[extName];
        return ext;
    }
    function defineUIByNode(node){
        var name=getAttr(node,'ui');
        var ext=getExtendsByNode(node,'ui');
        if(name){
            $t.ui.define(name,'','',getTemplate(node),ext);
        }
        removeNode(node);
    }
    function parseUITemplate(uiName,uiSortPath,uiPath,sHTML){
        VTemplate(sHTML);
        var 
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
                if(!$t.ui.hasOwnProperty(nodeName)){
                    s=getTemplate(node);
                    $t.ui.define(nodeName,uiSortPath,uiPath,s,getExtendsByNode(node,uiSortPath));
                }else{
                    alert('不能重复定义ui：'+nodeName);
                }
            }
        }
    }
    function importUIJS(uiName,uiSortPath){
        if(!$t.ui.hasOwnProperty(uiName)){
            var uiPath=baseUIPath.getPathBySortPath(uiSortPath);
            $t.xhr.get(uiPath + '/' + (uiName + '.js').toLowerCase(),false,function(text){
                exec(text);
            });
        }
        return $t.ui[uiName];
    }
    function getService(serviceName){
        if(!$t.service.hasOwnProperty(serviceName)){
            $t.xhr.get($t.config.baseServicePath + '/' + (serviceName + '.js').toLowerCase(),false,function(text){
                $t.service.define(serviceName,text);
            });
        } 
        return $t.service[serviceName];
    }
    function importUIHTML(uiName,uiSortPath){
        if(!$t.ui.hasOwnProperty(uiName)){
            var uiPath=baseUIPath.getPathBySortPath(uiSortPath);
            $t.xhr.get(uiPath + '/' + (uiName + '.html').toLowerCase(),false,function(text){
                parseUITemplate(uiName,uiSortPath,uiPath,text);
            });
        }
        return $t.ui[uiName];
    }
    function parseUI(node,uiInfo,step,part){
        var 
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
        
        for(var i=node.childNodes.length;i>0;i--){
            node.removeChild(node.childNodes[0]);    
        }
        
        cpn=ui.render(node, node.parentNode,outerChildNodes,outerElement,null,part,partName,reExtends);
        if(cpn){
            step.next =cpn.elementLength;    
        }
    }
    
    function render(fnName,uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        var ui=importUIHTML(uiName,uiSortPath);
        if (!ui) {
            console.log(uiName + '组件不存在！');
            return;
        }
        try{
            if($node===$VNode&&!isFunction(elem)){
                elem=elem.__vdomNode__;
            }
            return ui[fnName](elem,outerChildNodes,outerElement,props,part,partName,reExtends);  
        }catch(e){
            _catch(e);
        }
    }
    function getUI(uiName,uiSortPath,outerChildNodes,outerElement,props,part,partName,reExtends){
        return render('renderIn',uiName,uiSortPath,null,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    function renderIn(uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        return render('renderIn',uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    function renderBefore(uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        return render('renderBefore',uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    function parseXMP2(node){
        var ret=parseXMP(node);
        if(isArray(ret))
            replaceNodeByNodes(node,ret);
        else
            removeNode(node);
    }
    function replaceCls(){
        var arr=$t.clsNode;
        for(i=0;i<arr.length;i++){
            var cls=arr[i].getAttribute('cls');
            arr[i].removeAttribute('cls');
            if($t.styleClasses[cls]){
                arr[i].className+=' '+$t.styleClasses[cls].join(" ");
            }
        }
        arr.length=0;
    }
    function compileCls(){
        var s='';
        forEach($t.styleClasses,function(val,key){
            for(var i=0;i<val.length;i++){
                s+='$t.styleClasses.push("'+key+'",'+propertyToJS(val[i])+');\n';
            }
        });
        return s;
    }
    function parseHTML(sHTML){
        var vDOM=$DOM(sHTML);
        initHTML(vDOM.childNodes);
        return takeChildNodes(vDOM.toDOM());
    }
    
    function parseXMP(node){
        if(isDefine(node)){
            parseDefine(node);
        }else{
            return parseHTML(getTemplate(node));    
        }
    }
    var paramFilter=newObject("ParamFilter");
    paramFilter.bool=function(v){
        return parseBool(v);
    }
    paramFilter.intmin=function(v,p){
        v=parseInt(v);
        p=parseInt(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    paramFilter.string=function(v){
        return '"'+v+'"';
    }
    paramFilter.floatmin=function(v,p){
        v=parseFloat(v);
        p=parseFloat(p);
        if(v<p||isNaN(v)){
            v=p;
        }
        return v;
    }
    paramFilter.int=function(v){
        return parseInt(v);
    }
    paramFilter.float=function(v){
        return parseFloat(v);
    }
    paramFilter.pxtoem=function(v,p){
        p=parseFloat(p);
        if(isNaN(p)){
            p=0;
        }
        return (parseFloat(v)/16+p)+'em';
    }
    paramFilter.color=function(v){
        
        if(/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/.test(v)){
            return v;
        }else{
            return 'transparent';    
        }
    }
    paramFilter.date=function(v,p){
        var d=new Date(v);
        if(d.toDateString()==='Invalid Date'){
            d=new Date();
        }
        return dateFormat(p,d);
    }
    paramFilter.only=function(v,p){
        if(p.indexOf(';')===-1){
            return v;
        }
        var arr=p.split(';');
        var datas=arr[0].split(',');
        if(arr.length>0){
            var filter=arr[1];
        }else{
            var filter='';
        }
        if(datas.indexOf(v)!==-1){
            return v;
        }else{
            return filter;
        }
    }
    paramFilter.udftotrue=function(v){
        return v===undefined?true:v;
    }
    paramFilter.anytotrue=function(v){
        return v!==undefined?true:v;
    }
    paramFilter.udftofalse=function(v){
        return v===undefined?false:v;
    }
    paramFilter.anytofalse=function(v){
        return v!==undefined?false:v;
    }
    paramFilter.udftonull=function(v){
        return v===undefined?null:v;
    }
    paramFilter.anytonull=function(v){
        return v!==undefined?null:v;
    }
    paramFilter.udftoemptystr=function(v){
        return v===undefined?"":v;
    }
    paramFilter.anytoemptystr=function(v){
        return v!==undefined?"":v;
    }
    var templates=newObject("Templates",
        {
            toString:function(){
                var s=[];
                var desc;
                for(var i in this){
                    if(!this.hasOwnProperty(i)){
                        continue;
                    }
                    desc='<'+i.toLowerCase();
                    if(this[i].hasOwnProperty("xmp")){
                        desc+=' xmp';
                    }
                    desc+='>';
                    s.push(desc);
                }
                return s.join("\n");
            },get items(){
                var items=[];
                
                for(var i in this){
                    if(!this.hasOwnProperty(i)){
                        continue;
                    }
                    var item={name:i.toLowerCase()};
                    items.push(extend(item,this[i]));
                }
                return items;
            },findByString:function(str){
                if(str.length===0){
                    return ;
                }
                
                var ts=this.items;
                var regExes=[];
                for(var i=0;i<ts.length;i++){
                    var s='(<'+ts[i].name;
                    if(ts[i].hasOwnProperty('xmp')){
                        s+='[\\s\\S]*? +xmp';
                    }
                    s+='([\\s\\S]*?)>([\\s\\S]*?)<\\/'+ts[i].name+'>';
                    s+=')';
                    regExes.push(s);
                }
                var re=exec('(/'+regExes.join("|")+'/g)');
                return str.match(re);
            }
        }
    );
    templates.XMP={};
    templates.TEMPLATE={};
    templates.TITLE={getData:function(node){return node.innerText;}};
    templates.STYLE={xmp:undefined};
    templates.SCRIPT={xmp:undefined};
    templates.TEXTAREA={xmp:undefined,getData:function(node){return node.defaultValue;}};
    function parseDefine(node){
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
    function isDefine(node){
        switch(true){
            case node.hasAttribute('service'):
            case node.hasAttribute('ui'):
            case node.hasAttribute('class'):
                return true;
        }
        return false;
    }
    
    function isTemplate(node){
        var nodeName=node.nodeName;
        if(templates.hasOwnProperty(nodeName)){
            if(templates[nodeName].hasOwnProperty('type')){
                return getAttr(node,'type')==='xmp';
            }else{
                return true;
            }
        }
        return false;
    }
    function getTemplate(node){
        var nodeName=node.nodeName;
        if(templates.hasOwnProperty(nodeName)){
            if(templates[nodeName].hasOwnProperty('getData')){
                return templates[nodeName].getData(node);
            }else{
                return node.innerHTML;
            }
        }
    }
    function findTemplates(nodes){
        var temps=[];
        treeEach(nodes,'children',function(node){
            if(isTemplate(node))
                temps.push(node);
        });
        return temps;
    }
     
    var baseUIPath;
    (function(){
        var _paths={};
        baseUIPath=newArrayObject('BaseUIPath',{
            push:function(v){
                if(isString(v)){
                    this.parseUIPath(v)    
                }else if(isArray(v)){
                    this.clear();
                    _paths={};
                    for(var i=0;i<v.length;i++){
                        if(isString(v[i])){
                            this.parseUIPath(v[i])
                        }
                    }
                }
            },
            parseUIPath:function(s){
                try{
                    var o=exec('('+s+')');
                    if(isObject(o)&&o.hasOwnProperty('name')&&o.hasOwnProperty('path')){
                        _paths[o.name]=o;
                        this.push(o);
                    }
                }catch(e){_catch(e);}
            },
            getPathBySortPath:function(sortPath){
                return _paths[sortPath].path;
            },
            hasSortPath:function(sortPath){
                return _paths.hasOwnProperty(sortPath);
            },
            toString:function(){
                var arr=[];
                for(var i in _paths){
                    arr.push("{name:'"+_paths[i].name+"',path:'"+_paths[i].path+"'}")
                }
                return arr.join(';');
            }
        });
        lockObject(baseUIPath);
    })();
    
    function getUIInfo(node){
        var nodeName=node.nodeName;
        if(nodeName==='SCRIPT'&&getAttr(node,'type')==='ui'){
            return node.getAttribute('name').toLowerCase();
        }else if(nodeName.indexOf(':')){
             var c=nodeName.split(':');
             var sortPath=c[0].toLowerCase();
             if(baseUIPath.hasSortPath(sortPath)){
                 return {sortPath:sortPath,name:c[1].toLowerCase()};
             }
        }
    }
    function compileDocument(scriptNode,uiList,fn){
        var 
            html,
            xmps=findTemplates(document.body.children),
            templateXMP=[];
            
        $t.xhr.get(location.href,false,function(s){
            html=s;
        });
        for(var i=0;i<xmps.length;i++){
            if(isDefine(xmps[i])){
                parseDefine(xmps[i]);
            }else{
                templateXMP.push(xmps[i]);
            }
        }
        for(var i=0;i<templateXMP.length;i++){
            parseHTML(getTemplate(templateXMP[i]));
        }
        var s=compileCls();
        /*获取ui定义*/
        var uiComplie=compileUI(uiList);;
        s+=uiComplie.script;
        
        var x=scriptNode.outerHTML;
        var inner;
        if(s.length>0){
            inner=scriptNode.innerHTML;
            if(/[^ \r\n]/.test(inner)){
                inner='\r\n;'+s;
            }else{
                inner=s;
            }
        }else{
            inner='';
        }
        var newTurtle=x.substring(0,x.length-9);
        newTurtle=newTurtle.replace(/ compile=(['"]).*?\1/,'').replace(/ compileuilist=(['"]).*?\1/,'');
        html=html.replace(x,newTurtle+inner+'</script>');
        fn(html,uiComplie.compileJS,inner);
    }
    function propertyToJS(v){
        var s=JSON.stringify({xx:v});
        s=s.substring(6,s.length-1);
        return s;
    }
    function renderTemplate(tp){
        var sHTML=getTemplate(tp);
        var vDOM=$DOM(sHTML);
        initHTML(vDOM.childNodes);
        
        if(isFunction(vDOM)){
            var p=tp.parentNode;
            replaceNodeByNodes(tp,takeChildNodes(vDOM.toDOM()));
            vDOM.__domNode__=p;
            return;   
        }
        replaceNodeByNodes(tp,takeChildNodes(vDOM.toDOM()));
        //vDOM.innerHTML='';
    }
    function renderDocument(noAppend){
        renderDocument.beginTime=new Date();
        var 
            xmps=findTemplates(document.body.children),
            i,
            templateXMP=[];
        /*优先处理定义先关的模板*/
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
        renderDocument.endTime=new Date();
    }
    function compileUI(uiList){
        var s=[];
        var compileJS=[];
        if(isString(uiList)){
            uiList=trimLine(uiList).split(',');
            if(uiList[0].length>0){
                for(var i=0;i<uiList.length;i++){
                    uiList[i]=trimLine(uiList[i]);
                    var s=uiList[i].split(':');
                    importUIHTML(s[1],s[0]);
                }
            }
        }
        s=[];
        for(var e in $t.ui){
            if($t.ui.hasOwnProperty(e)){
                var o=$t.ui[e];
                
                if(!o.sortPath){
                    /*内置组件直接定义到html*/
                    s.push(o.toDefineString());
                }else{
                    /*外置js组件*/
                    s.push('$t.importUIJS("'+e+'","'+o.sortPath+'");');/*同步加载*/
                    compileJS.push({name:e,path:o.path,script:o.toDefineString()});
                }
            }
        }
        return {script:s.join(''),compileJS:compileJS};
    }
    function getNodesLength(node){
        if(node.parentNode){
            return node.parentNode.children.length;
        }
        var index=getNodeIndex(node)-1;
        node=node.nextElementSibling;
        while(node!=null){
            node=node.nextElementSibling;
            index++;
        }
        return index;
    }
    function getNodeIndex(node){
        var index=0;
        node=node.previousElementSibling;
        while(node!=null){
            node=node.previousElementSibling;
            index++;
        }
        return index;
    }
    function getNodesLength2(node){
        if(node.parentNode){
            return node.parentNode.childNodes.length;
        }
        var index=getNodeIndex2(node)-1;
        node=node.nextSibling;
        while(node!=null){
            node=node.nextSibling;
            index++;
        }
        return index;
    }
    function getNodeIndex2(node){
        var index=0;
        node=node.previousSibling;
        while(node!=null){
            node=node.previousSibling;
            index++;
        }
        return index;
    }
    function getUUID(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uuid = '';
        while(len--){
            uuid += seed[Math.round(Math.random()*seedLen)]
        }
        return uuid;
    }
    function pushToLinks(uuid,v,uiLinks){
        var arr;
        if(!uiLinks.hasOwnProperty(uuid)){
            arr=[];
            uiLinks[uuid]=arr;
        }else{
            arr=uiLinks[uuid];
        }
        arr.push(v);
    };
    function Scope(node,scopeParent,name){
        this.__name__=name;
        this.__commentNode__=node;
        this.__actionNode__=node.parentNode;
        this.__parent__=scopeParent;
        this.__children__=[];
        this.__proto__=scopeParent;
        lockObject2(this);
        node.parentNode.scope=this;
        scopeParent.__children__.push(this);
        if(name){
            scopeParent[name]=this;
        }
    }
    function Client(){
        'use strict'
        var data={};
        var isListen=false;
        var events=[];
        var t=this;
        function emit(){
            'use strict'
            for(var i=0;i<events.length;i++){
                events[i]();
            }
        }
        function setSizeProperty(name,fn){
            'use strict'
            data[name]=undefined;
            t[name]=function(v){
                'use strict'
                /*此属性用于被绑定*/
                if(data[name]===undefined&&t.__bind__){
                    if(isListen===false){
                        isListen=true;
                        window.addEventListener('resize',emit);
                    }
                    var bind=t.__bind__;
                    var getV=function(){
                        t[name]=fn();
                    }
                    data[name]=fn();
                    events.push(getV);
                }
                if(v){
                    data[name]=v;
                }
                return data[name];
            }
        }
        setSizeProperty('onResize',function(){'use strict'
            return {width:document.documentElement.clientWidth
                ,height:document.documentElement.clientHeight};});
            
            
        setSizeProperty('width',function(){'use strict'
            return document.documentElement.clientWidth;});
        setSizeProperty('height',function(){'use strict'
            return document.documentElement.clientHeight;});
        
        setSizeProperty('left',function(){'use strict'
            return document.documentElement.clientLeft;});
        setSizeProperty('top',function(){'use strict'
            return document.documentElement.clientTop;});
            
        setSizeProperty('right',function(){'use strict'
            return document.documentElement.clientLeft+document.documentElement.clientWidth;});
        setSizeProperty('bottom',function(){'use strict'
            return document.documentElement.clientTop+document.documentElement.clientHeight;});
        
    }
    function RootScope(){
        this.__actionNode__=document.documentElement;
        this.__children__=[];
        lockObject2(this);
        document.scope=this;
    }
    function UIScope(){}
    UIScope.prototype={
        create:function(node,name){
            var scope=this.get(node);
            if(node.parentNode!==scope.__actionNode__){
                scope=new Scope(node,scope,name);
                this.stack.push(scope);
            }else/* if(scope.__name__!==name)*/{
                throwError('当前层不允许重复定义scope:'+name);
            }
            return scope;
        },
        get:function(node){
            if(!node)
                return $rootScope;
            while(node!=null){
                if(node.scope){
                    return node.scope;
                }
                node=node.parentNode;
            }
            return $rootScope;
        },
        stack:[$rootScope],
        cut:function(scope){
            var p=scope.__parent__;
            scope.__parent__=null;
            removeItem(p.__children__,scope);
            delete p[scope.name];
        },
        link:function(scope,node){
            var p=$t.uiScope.get(node);
            if(!p){
                return;
            }
            scope.__parent__=p;
            p.__children__.push(scope);
            if(name){
                p[name]=scope;
            }
        }
    }
    /*function UILink(){}
    UILink.prototype=new function (){
        var onlink='\\"onlink';
        var t={
            on:function(o){
                var uuid;
                if(isString(o))
                    uuid=o;
                else if(o.uiLinkUUID)
                    uuid=o.uiLinkUUID
                else return;
                var uiLinks=this.uiLinks[uuid];
                var arg=slice.call(arguments,1);
                for(var i=0;i<uiLinks.length;i++){
                    uiLinks[i].apply(this,arg);
                }
            },
            create:function(node,fn){
                node[onlink]=fn;
            },
            appendByTree:function(nod,fn){
                var uuid='\\"'+getUUID(8);
                var uiLinks=this.uiLinks;
                
                treeEach(nod.childNodes,'childNodes',function(node,step){
                    if(node.nodeType==8&&isFunction(node[onlink])){
                        pushToLinks(uuid,node[onlink],uiLinks);
                        if(!nod.uiLinkUUID)
                            nod.uiLinkUUID=uuid;
                    }
                });
            },
            appendByName:function(name,fn){
                var uuid='\\"'+name;
                pushToLinks(uuid,fn,this.uiLinks);
                return uuid;
            },
            uiLinks:{}
        }
        return t;
    }*/
    function UI(){
        Object.defineProperty(this,"__defineCallbacks__",{
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            }
        )
    }
    UI.prototype={
        onDefine:function(name,fn){
            if(!isFunction(fn)){
                return;
            }
            if(!isString(name)){
                return;
            }
            if(name.length===0){
                return;
            }
            this.__defineCallbacks__.push({name:name,fn:fn});
            if(this.hasOwnProperty(name)){
                fn(this[name]);
            }
        },
        emitOnDefine:function(name,fn){
            var cbs=this.__defineCallbacks__;
            for(var i=0;i<cbs.length;i++){
                if(cbs[i].name===name||cbs[i].name==="*"){
                    cbs[i].fn(fn);
                }
            }
        },
        define:function(name,sortPath,path,s,ext){
            this[name]=new UITemplate(name,sortPath,path,s,ext);
            this.emitOnDefine(name,this[name]);
            return this[name];
        },
        toString:function(){
            var list=[];
            for(var i in this){
                if(this.hasOwnProperty(i)){
                    list.push(i);    
                }
            }
            return list.join('\r\n');
        }
    }
    function Service(fns){
        Object.defineProperty(this,"__defineCallbacks__",{
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            }
        );
        if(isObject(fns)){
            for(var i in fns){
                this[i]=fns[i];
                this.emitOnDefine(i,this[i]);
            }
        }
    }
    Service.prototype={
        require:function(n){
            if(!this.hasOwnProperty(n)){
                this[n]=getService(n);
            }
            return this[n];
        },
        onDefine:UI.prototype.onDefine,
        emitOnDefine:UI.prototype.emitOnDefine,
        define:function(name,s){
            try{
                this[name]=exec("("+s+")");    
            }catch(e){
                _catch(e);
            }
            this.emitOnDefine(name,this[name]);
        },
        toDefineString:function(){
            var s='new $t.Service(';
            var fns=[];
            for(var i in this){
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
    var stringNode={
        'SCRIPT':/^\/script[>\s]/i,
        'TEMPLATE':/^\/template[>\s]/i,
        'STYLE':/^\/style[>\s]/i,
        'TITLE':/^\/title[>\s]/i,
        'TEXTAREA':/^\/textarea[>\s]/i,
        'XMP':/^\/xmp[>\s]/i
    }
    var VDOM,VTemplate;
    (function(){
        var htmlParse={
            '':function(html,m){
                var nodeName=m.node.nodeName;
                if(m.node.__closeSelf__){
                    m.node=m.node.parentNode;
                    m.action='textNode';
                    m.textNodeStart=m.index;
                }else if(stringNode.hasOwnProperty(nodeName)){
                    m.action='stringNode';
                    m.stringNodeRegExp=stringNode[nodeName];
                    m.stringNodeKeyLength=nodeName.length+2;
                    m.stringNodeStart=m.index;
                    return;
                }else{
                    m.action='textNode';
                    m.textNodeStart=m.index;
                }
            },
            textNode:function(html,m){
                var data;
                switch(html[m.index]){
                    case '<':
                        if(m.index<m.length+1&&xmlwordRE.test(html[m.index+1])){
                          
                            if(m.textNodeStart!==m.index){
                                data=html.substring(m.textNodeStart,m.index);
                                if(!emptyTextNodeRE.test(data)){
                                    m.node(data,3);
                                }
                                m.textNodeStart=0;
                            }
                            m.xmlNodeStart=m.index;
                            m.index++;
                            m.action='xmlNode';
                        }else{
                            m.index++;
                        }
                        break;
                    default:
                        m.index++;
                }
            },
            createXMLNode:function(html,m){
                m.xmlNodeStart=0;
                if(m.xmlNodeNameStart>0){
                    //无属性标签
                    var nodeName=html.substring(m.xmlNodeNameStart,m.index);
                    m.node=m.node(nodeName);
                    m.xmlNodeNameStart=0;
                    m.index++;
                }
                m.action='';
                
            },
            setXMLNodeClose:function(html,m){
                var n=m.node;
                var name=trim(html.substring(m.xmlNodeNameStart,m.index)).toUpperCase();
                while(n){
                    if(n.nodeName===name){
                        n.__isClose__=true;
                        m.node=n.parentNode;
                        m.action='';
                        m.xmlNodeNameStart=0;
                        return;
                    }
                    n=n.parentNode;
                }
                /*当注释*/
                console.log('变成注释',name);
                debugger;
                m.node(name,8);
            },
            setAttrStart:function(m){
                m.action='attributes';
                m.attrStart=0;
                m.attrNameEnd=0;
                m.equlIndex=0;
                m.stringStart=0;
                m.stringStartChar='';
            },
            xmlNode:function(html,m){
                switch(html[m.index]){
                    case '>':
                        this.createXMLNode(html,m);
                        break;
                    case ' ':
                        this.createXMLNode(html,m);
                        m.action='attributes';
                        break;
                    case '!':
                        if(m.xmlNodeStart===m.index-1){
                            m.action='comment';    
                        }
                        m.index++;
                        break;
                    case '/':
                        if(m.xmlNodeStart===m.index-1){
                            m.action='endXmlNode';
                            m.index++;
                            m.xmlNodeNameStart=m.index;
                            return;
                        }else if(m.length>=m.index+1){
                            if(html.substr(m.index+1,1)==='>'){
                                this.createXMLNode(html,m);
                                m.index++;
                                return;
                            }
                        }
                        break;
                    default:
                        if(m.xmlNodeNameStart===0){
                            m.xmlNodeNameStart=m.index;
                        }
                        m.index++;
                }
            },
            endXmlNode:function(html,m){
                switch(html[m.index]){
                    case '>':
                        this.setXMLNodeClose(html,m);
                        m.index++;
                        break;
                    default:
                        m.index++;
                }
            },
            comment:function(html,m){
                switch(html[m.index]){
                    case '>':
                        m.node('',8);
                        m.index++;
                        break;
                    case '-':
                        if(m.length>=m.index+2){
                            if(html.substr(m.index+1,1)==='-'){
                                m.commentStart=m.index+2;
                                m.action='comment3';
                                m.index+=2;
                            }else{
                                m.commentStart=m.index;
                                m.action='comment2';
                                m.index++;
                            }
                        }else{
                            m.index++;
                        }
                        break;
                    case 'd':
                    case 'D':
                        if(m.length>=m.index+7){
                            if(html.substr(m.index+1,6).toUpperCase()==='OCTYPE'){
                                m.node('',10);
                                m.index+=13;
                                m.action='';
                            }else{
                                m.index++;
                            }
                        }else{
                            m.index++;
                        }
                        break;
                    default:
                        m.commentStart=m.index;
                        m.action='comment2';
                        m.index++;
                }
            },
            comment2:function(html,m){
                if(html[m.index]==='>'){
                    var vNode=m.node(html.substring(m.commentStart,m.index),8);
                    vNode.dbplus=false;
                    m.commentStart=0;
                    m.action='';
                }
                m.index++;
            },
            comment3:function(html,m){
                if(html[m.index]==='-'){
                    if(m.length>=m.index+3){
                        if(html.substr(m.index+1,2)==='->'){
                            var vNode=m.node(html.substring(m.commentStart,m.index),8);
                            vNode.dbplus=true;
                            m.commentStart=0;
                            m.action='';
                            m.index+=3;
                            return;
                        }
                    }
                }
                m.index++;
            },
            attributes:function(html,m){
                switch(html[m.index]){
                    case '/':
                        if(m.length>=m.index+2){
                            if(html.substr(m.index+1,1)==='>'){
                                if(m.attrStart!==m.attrNameEnd){
                                    if(m.attrNameEnd===0){
                                        m.attrNameEnd=m.index;
                                    }
                                    m.node._(html.substring(m.attrStart,m.attrNameEnd));    
                                }
                                m.action='';
                                m.index+=2;
                                break;
                            }
                        }
                        m.attrStart=m.attrNameEnd=0;
                        m.action='';
                        m.index++;
                        break;
                    case '>':
                        if(m.attrStart!==m.attrNameEnd){
                            if(m.attrNameEnd===0){
                                m.attrNameEnd=m.index;
                            }
                            m.node._(html.substring(m.attrStart,m.attrNameEnd));   
                        }
                        m.attrStart=m.attrNameEnd=0;
                        m.action='';
                        m.index++;
                        break;
                    case '=':
                        if(m.attrStart>0&&m.attrNameEnd===0){
                            m.attrNameEnd=m.index;
                        }
                        m.equlIndex=m.index;
                        m.action='attrValue';
                        m.index++;
                        break;
                    case '\r':
                    case '\n':
                    case ' ':
                        if(m.attrStart>0&&m.attrNameEnd===0){
                            m.attrNameEnd=m.index;
                        }
                        m.index++;
                        break;
                    default:
                        if(m.attrStart===0){
                            m.attrStart=m.index;
                        }else if(m.equlIndex>0){
                            m.node._(html.substring(m.attrStart,m.attrNameEnd));
                            this.setAttrStart(m);
                        }else if(m.attrNameEnd!==0){
                            m.node._(html.substring(m.attrStart,m.attrNameEnd));
                            this.setAttrStart(m);
                            m.attrStart=m.index;
                        }
                        m.index++;
                }
            },
            attrValue:function(html,m){
                switch(html[m.index]){
                    case '\r':
                    case '\n':
                    case ' ':
                        m.index++;
                        break;
                    case '"':
                        m.stringStartChar='"';
                        m.action='atvstring';
                        m.index++;
                        m.stringStart=m.index;
                        break;
                    case "'":
                        m.stringStartChar='\'';
                        m.action='atvstring';
                        m.index++;
                        m.stringStart=m.index;
                        break;
                    case '>':
                        /*忽略等号*/
                        m.node._(html.substring(m.attrStart,m.attrNameEnd));
                        m.action='';
                        m.index++;
                        break;
                    case "/":
                        if(m.length>=m.index+2){
                            if(html.substring(m.index+1,1)==='>'){
                                m.node._(html.substring(m.attrStart,m.attrNameEnd));
                                m.action='';
                                m.index+=2;
                                return;
                            }
                        }
                        m.index++
                        break;
                    default:
                        m.action='atvbetweenSpace';
                        m.betweenSpaceStart=m.index;
                        m.index++;
                }
            },
            atvbetweenSpace:function(html,m){
                switch(html[m.index]){
                    case ' ':
                        m.node._(html.substring(m.attrStart,m.attrNameEnd),html.substring(m.betweenSpaceStart,m.index));
                        this.setAttrStart(m);
                        m.index++;
                        break;
                    case '>':
                        m.node._(html.substring(m.attrStart,m.attrNameEnd),html.substring(m.betweenSpaceStart,m.index));
                        this.setAttrStart(m);
                        break;
                    case "/":
                        if(m.length>=m.index+2){
                            m.node._(html.substring(m.attrStart,m.attrNameEnd),html.substring(m.betweenSpaceStart,m.index));
                            if(html.substring(m.index+1,1)==='>'){
                                this.setAttrStart(m);
                                m.index++;
                                return;
                            }
                        }
                        m.index++
                    default:
                        m.index++;
                }
            },
            atvstring:function(html,m){
                switch(html[m.index]){
                    case '\\':
                        m.index+=2;
                        break;
                    case m.stringStartChar:
                        m.node._(html.substring(m.attrStart,m.attrNameEnd),html.substring(m.stringStart,m.index));
                        this.setAttrStart(m);
                        m.index++;
                        break;
                    default:
                        m.index++;
                }
            },
            stringNode:function(html,m){
                if(html[m.index]==='<'){
                    if(m.length>=m.index+m.stringNodeKeyLength+1){
                        if(m.stringNodeRegExp.test(html.substr(m.index+1,m.stringNodeKeyLength))){
                            var s=html.substring(m.stringNodeStart,m.index);
                            if(!emptyTextNodeRE.test(s)){
                                m.node.text(s);
                            }
                            m.stringNodeStart=0;
                            m.stringNodeRegExp=null;
                            m.action='stringNode2';
                            m.node.__isClose__=true;
                            m.node=m.node.parentNode;
                            m.index+=m.stringNodeKeyLength;
                            m.stringNodeKeyLength=0;
                            return;
                        }
                    }
                }
                m.index++;
            },
            stringNode2:function(html,m){
                if(html[m.index]==='>'){
                    m.action='';
                }
                m.index++;
            },
            checkEnd:function(html,m){
                if(m.action==='textNode'){
                    if(m.textNodeStart!==m.index){
                        var data=html.substring(m.textNodeStart,m.index);
                        if(!emptyTextNodeRE.test(data)){
                            m.node(data,3);
                        }
                        m.textNodeStart=0;
                    }
                }else if(m.action!==""){
                    console.log(m.action)
                    debugger;
                }
            }
        }
        var htmlParseT={
            __proto__:htmlParse,
            checkTemplate:function(html,m){
                switch(html[m.index]){
                    case '{':
                        debugger;
                        break;
                    case '<':
                        if(html[m.idnex+1]==='%'){
                            debugger;
                            m.index+=2;
                            return true; 
                        }
                        break;
                    case '%':
                        if(html[m.idnex+1]==='>'){
                            debugger;
                            m.index+=2;
                            return true; 
                        }
                        break;
                }
            },
            attributes:function(html,m){
                if(!this.checkTemplate(html,m)){
                    this.__proto__.attributes(html,m);
                }
            },
            stringNode:function(html,m){
                if(!this.checkTemplate(html,m)){
                    this.__proto__.stringNode(html,m);
                }
            },
            attrValue:function(html,m){
                if(!this.checkTemplate(html,m)){
                    this.__proto__.attrValue(html,m);
                }
            }
        }
        function getInitData(vNode,length){
            if(!vNode){
                vNode=newVNode('document');
                vNode.__isClose__=true;
            }
            return {
                index:0,
                node:vNode,
                action:'',
                length:length,
                textNodeStart:0,
                xmlNodeStart:0,
                xmlNodeNameStart:0,
                attrStart:0,
                attrNameEnd:0,
                equlIndex:0,
                stringStart:0,
                stringStartChar:'',
                betweenSpaceStart:0,
                stringNodeStart:0,
                stringNodeRegExp:null,
                stringNodeKeyLength:0
            };
        }
        VTemplate=function(html,vNode){
            var m=getInitData(vNode,html.length);
            vNode=m.node;
            while(m.index<html.length){
                htmlParseT[m.action](html,m);
            }
            htmlParseT.checkEnd(html,m);
            return vNode;
        }
        VDOM=function(html,vNode){
            var m=getInitData(vNode,html.length);
            vNode=m.node;
            while(m.index<html.length){
                htmlParse[m.action](html,m);
            }
            htmlParse.checkEnd(html,m);
            return vNode;
        }
    }());
    function NullValueHash(s){
        var arr=s.split(',');
        for(var i in arr){
            this[arr[i]]=null;
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
            var t=function(name,nodeType){
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
            this.toHTMLString=function(){
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
                        xmlNode=this.toHTMLString(),
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
    /*function UITeam(){}
    UITeam.prototype=new function (){
        var t={
            push:function(name,group,check,missingCheck){
                var team;
                if(!this.hasOwnProperty(name)){
                    team={
                        call:function(){
                            var e=team.checkEvents;
                            var index=getNodeIndex(this);
                            for(var i=0;i<e.length;i++){
                                var t=team.groups[i][index];
                                if(t){
                                    e[i].call(t);    
                                }else{
                                    team.missingCheckEvents[i]();
                                }
                            }
                        }
                        ,checkEvents:[check]
                        ,missingCheckEvents:[missingCheck]
                        ,groups:[group]
                    };
                    this[name]=team;
                }else{
                    team=this[name];
                    team.checkEvents.push(check);
                    team.missingCheckEvents.push(missingCheck);
                    team.groups.push(group);
                }
                return team.call;
            }
        }
        return t;
    }*/
    function newKeyArrayObject(type){
        return newObject(type,newKeyArrayObject.prototype);
    }
    newKeyArrayObject.prototype={
        push:function(key,node){
            if(isArray(key)){
                for(var i=0;i<key.length;i++){
                    if(!this.hasOwnProperty(key[i])){
                        (this[key[i]]=[]).last=last;
                    }
                    this[key[i]].push(node);
                }
            }else{
                if(!this.hasOwnProperty(key)){
                    (this[key]=[]).last=last;
                }
                this[key].push(node);
            }
            
        },
        clear:function(){
            forEach(this,function(data,key,obj){
                delete obj[key];
            },this,false);
        },
        getKeyArray:function(){
            return getKeyArray(this);
        },
        pop:function(key){
            var keyObject=this[key];
            if(keyObject){
                return keyObject.pop();
            }
        }
    }
    function makeCompileString(){
        var script=$t.turtleScriptElement.cloneNode();
        script.setAttribute('compile','');
        // script.setAttribute('uibasepath',$t.config.baseUIPath.toString());
        var obj=$t.ui,
            arr=[];
        forEach(obj,function(v,key){
            if(obj[key].sortPath){
                arr.push(obj[key].sortPath+':'+key);
            }
        },this,false);
        script.setAttribute('compileuilist',arr.join(','));
        
        return script.outerHTML;
    }
    var vNodesToDOM;
    function setParseMode(mode){
        $VDOM=VDOM;
        $VNode=newVNode;
        if(mode===1){
            /*
             * 虚拟DOM
             */
            $DOM=VDOM;
            $node=newVNode;
            vNodesToDOM=function(vNodes){
                var arr=[];
                for(var i=0;i<vNodes.length;i++){
                    arr.push(vNodes[i].toDOM());    
                }
                return arr;
            }
        }else{
            /*
             * DOM
             */
            $DOM=function(html){var elem=document.createElement('ui:dom');elem.innerHTML=html;return elem;}
            $node=function(name,nodeType){
                switch(nodeType){
                    case 3:
                        return document.createTextNode(name);

                    case 8:
                        return document.createComment(name);
                        
                    case 1:
                    case undefined:
                        return document.createElement(name);
                        
                    case 10:
                        return null;
                        
                    default:
                        return null;
                }
            };
            Node.prototype.toDOM=Node.prototype.valueOf=function(){return this}
            vNodesToDOM=function(nodes){return nodes}
        }
    }
    function aftertInit(){
        var 
            scriptNode=$t.turtleScriptElement=document.scripts[document.scripts.length-1],
            compile=getAttr(scriptNode,'compile',null),
            load=getAttr(scriptNode,'load',null),
            script=scriptNode.innerHTML,
            baseuipath=getAttr(scriptNode,'baseuipath',null),
            extend=getAttr(scriptNode,'extend',null),
            compilename=getAttr(scriptNode,'compilename',null),
            compileuilist=getAttr(scriptNode,'compileuilist',null),
            compileInfo;
        if(baseuipath){
            baseUIPath.push(baseuipath.split(";"));
        }else{
            baseUIPath.push('{path:"ui",name:"ui"}');
        }
        if(extend){
            $t.extend(window,$t.fn);
        }
        $t.url=scriptNode.getAttribute("src");
        if (compile !== null){
            if(getQueryString("turtle_nocompile")!="1"){
                $t.xhr.get(scriptNode.src+'.setup',false,function(text){
                    try{
                        exec('compileInfo='+text);    
                    }catch(e){
                        _catch(e);
                    }
                });
            }
            $t.isCompile=true;
        }
        var resume=(compileInfo && compileInfo.isOn && compileInfo.url)?r1:r2;
        if(load){
            var loads=load.split(",");
            var i=0;
            var fnLoad=function(){
                i++;
                if(i<loads.length){
                    includeJSFiles(loads[i],fnLoad);
                }else{
                    resume();
                }
            }
            includeJSFiles(loads[0],fnLoad);
        }else{
            resume();
        }
        
        if(script.length>0){
            execScript(scriptNode);
        }
        function r1(){
            $t.ready(function() {
                $t.compileDocument(scriptNode,compileuilist,function(html,compileJS,importScripts){
                    if(!compilename){
                        compilename=getNameByURL(getNameByLocation());
                        if(/\./.test(compilename)){
                            compilename=compilename.split('.')[0];
                        }
                        console.log('未提供compilename，自动设置为“'+compilename+'”');
                    }
                    var url = compileInfo.url + "?htmlName=" + compilename;
                    
                    var b=document.body;
                    b.innerHTML='<div style="background-color:#fff;position:absolute;left:0;right:0;bottom:0;top:0;">开始编译页面</div>';
                    var c=b.children[0];
                    switch(compile){
                        case 'onlyBody':
                        
                            html='<xmp><script>'+importScripts+'</script></xmp>'+html.match(/(<body[\s\S]*?>)([\s\S]*?)(<\/body>)/)[2];
                            break;
                    }
                    $t.xhr.post(url,html,false,function(text){
                        var br= document.createElement('br');
                        var sec=document.createElement('span');
                        var timeout=1000;
                        sec.innerHTML="?";
                        sec.style.color="#f00";
                        c.appendChild(br);
                        c.appendChild(br.cloneNode());
                        c.appendChild(document.createTextNode('刷新页面剩余时间：'));
                        c.appendChild(sec);
                        c.appendChild(br.cloneNode());
                        c.appendChild(br.cloneNode());
                        c.appendChild(document.createTextNode(text));
                        for(var i=0;i<compileJS.length;i++){
                            var url = compileInfo.url + "?uiName=" + compileJS[i].name + "&uiPath=" + compileJS[i].path;
                            $t.xhr.post(url,compileJS[i].script,false,function(text){
                                c.appendChild(br.cloneNode());
                                c.appendChild(document.createTextNode(text));
                            });
                        }
                        setTimeout(function(){
                            window.location.href=appendQueryString("turtle_nocompile","1");
                        },timeout);
                        setInterval(function(){
                            timeout=timeout-100;
                            sec.innerHTML=timeout/1000;
                        },100);
                    });
                });
                
            });
            
        }
        function r2(){
            $t.ready(function(){
                renderDocument();
                $t.readyByRenderDocument.isReady=true;
                emitResize();
            });
        }
    }
    function ready(fn){
        if($t.readyByRenderDocument.isReady||(readyRE.test(document.readyState)&&document.body!==null)){
            fn();
        }else{
            function onLoaded(){
                if(document.body!==null){
                    window.removeEventListener('DOMContentLoaded',onLoaded);
                    clearInterval(tid);
                    fn();
                }
            }
            
            var tid=setInterval(function(){
                if($t.readyByRenderDocument.isReady||(readyRE.test(document.readyState)&&document.body!==null)){
                    clearInterval(tid);
                    window.removeEventListener('DOMContentLoaded',onLoaded);
                    fn();
                }
            },10);
            window.addEventListener('DOMContentLoaded',onLoaded,false);
        }
        return this;
    }
    
    function Config(){
        this.baseUIPath=baseUIPath;
        this.baseServicePath='service';
        lockObject(this);
        this.debugMode=2;
    }
    var onViewOnce=(function(){
        var viewWatchs=[];
        function indexOfTarget(arr,o){
            for(var i=0;i<arr.length;i++){
                if(arr[i].target===o){
                    return i;
                }
            }
            return -1;
        }
        function ViewWatch(elemScroll){
            var items=[];
            var onceItems=[];
            this.target=elemScroll;
            this.on=function(elem,fn){
                var idx=indexOfTarget(onceItems,elem);
                if(idx!==-1){
                    fn();
                    return;
                }
                idx=indexOfTarget(items,elem);
                var item;
                if(idx!==-1){
                    item=items[idx];
                    item.fn.push(fn);
                }else{
                    item={target:elem,fn:[fn]}
                    items.push(item);
                }
                if(item.fn.length===1){
                    if(items.length===1){
                        window.addEventListener('scroll',scroll);
                        scroll();
                    }
                }
            }
            function scroll(e){
                var t=elemScroll.scrollTop;
                var b=t+elemScroll.clientHeight;
                var l=elemScroll.scrollLeft;
                var r=l+elemScroll.clientWidth;
                for(var i=0;i<items.length;i++){
                    var elem=items[i].target;
                    var t2=0,l2=0;
                    while(elem!==elemScroll&&elem!==null){
                        t2+=elem.offsetTop;
                        l2+=elem.offsetLeft;
                        elem=elem.parentNode;
                    }
                    if(l2>=l&&l2<r&&t2>=t&&t2<=b){
                        
                        var fns=items[i].fn;
                        var len=fns.length
                        for(var j=0;j<len;j++){
                            fns.pop()();
                        }
                        items.splice(i,1);
                        i--;
                    }
                }
                if(items.length===0){
                    window.removeEventListener('scroll',scroll);
                }
            }
        }
        
        return function(elem,elemScroll,fn){
            var idx=indexOfTarget(viewWatchs,elemScroll);
            
            if(idx===-1){
                viewWatch=new ViewWatch(elemScroll);
                viewWatchs.push(viewWatch);
            }else{
                viewWatch=viewWatchs[idx];
            }
            viewWatch.on(elem,fn);
        }
    })();
    function ReadyObject(){
        var _isReady=false;
        var t={
            on:function(fn){
                if(!isFunction(fn))return;
                if(_isReady){
                    fn();
                }else{
                    this.readyFunctions.push(fn);
                }
            },
            readyFunctions:[]
        }
        Object.defineProperty(t, "isReady", {
            get :function(){
                return _isReady;
            },
            set :function(v){
                _isReady=v;
                while(this.readyFunctions.length>0){
                    this.readyFunctions.shift()();
                }
            }
        });
        return t;
    }
    
    var fn={};
    fn.$$=$$;
    
    fn.onTry=onTry;
    fn.getOnTry=getOnTry;
    
    fn.getClosure=getClosure;
    fn.getClosureTry=getOnTry;
    fn.getStep=getStep;
    fn.exec=eval;
    
    fn.addStyle=addStyle;
    fn.addClassName=addClassName;
    fn.addClass=addClass;
    fn.addClasses=addClasses;
    fn.removeClass=removeClass;
    fn.removeClasses=removeClasses;
    fn.replaceClass=replaceClass;
    fn.toggleClass=toggleClass;
    
    
    fn.isRegExp=isRegExp;
    fn.isDate=isDate;
    fn.isNumber=isNumber;
    fn.isString=isString;
    fn.isFunction=isFunction;
    fn.isObject=isObject;
    fn.isFinite=isFinite;
    fn.isUndefined=isUndefined;
    fn.isArray=isArray;
    fn.isRepeat=isRepeat;
    fn.isArrayLike=isArrayLike;
    fn.isPersent=isPersent;
    fn.persentToFloat=persentToFloat;
    
    fn.toArray=toArray;
    fn.moveArray=moveArray;
    fn.getRect=getRect;
    fn.getOffsetPos=getOffsetPos;
    fn.encodeHTML=encodeHTML;
    fn.decodeHTML=decodeHTML;
    fn.idle=idle;
    fn.elementDOMdistance=elementDOMdistance;
    fn.elementInElement=elementInElement;
    fn.getDebounce=getDebounce;
    fn.getReTimeout=getReTimeout;
    
    fn.getAttr=getAttr;
    fn.extend=extend;
    fn.extendConst=extendConst;
    fn.lockObject=lockObject;
    fn.lockObject2=lockObject2;
    fn.getBind=getBind;
    fn.compact=compact;
    fn.flatten=flatten;
    fn.camelize=camelize;
    fn.decamelize=decamelize;
    fn.dasherize=dasherize;
    fn.takeOutChildNodes=takeOutChildNodes;
    fn.takeChildNodes=takeChildNodes;
    fn.trim=trim;
    fn.trimLine=trimLine;
    fn.HTMLTrim=HTMLTrim;
    fn.map=map;
    fn.each=each;
    fn.forEach=forEach;
    fn.forEachSorted=forEachSorted;
    fn.treeEach=treeEach;
    fn.scriptToJSON=scriptToJSON;
    
    fn.replaceNodeByNodes=replaceNodeByNodes;
    fn.replaceNodeByNode=replaceNodeByNode;
    fn.replaceNodeByString=replaceNodeByString;
    fn.insertNodesBefore=insertNodesBefore;
    fn.insertNodeBefore=insertNodeBefore;
    
    //fn.replaceByObjectAttr=replaceByObjectAttr;
    //fn.replaceByNodeAttr=replaceByNodeAttr;
    fn.appendNodes=appendNodes;
    fn.nodesToString=nodesToString;
    fn.parseBool=parseBool;
    fn.getUUID=getUUID;
    fn.handleWebkitRrror=handleWebkitRrror;
    fn.getNodeIndex=getNodeIndex;
    fn.getNodeIndex2=getNodeIndex2;
    fn.getNameByURL=getNameByURL;
    fn.getFileNameByURL=getFileNameByURL;
    fn.getNameByLocation=getNameByLocation;
    fn.execTurtleScript=execTurtleScript;
    fn.lowercase=lowercase;
    fn.uppercase=uppercase;
    fn.getDPI=getDPI;
    fn.removeNode=removeNode;
    fn.ReadyObject=ReadyObject;
    fn.dateFormat=dateFormat;
    //fn.base64Decode=decode;
    //fn.base64Encode=encode;
    fn.objectChange=objectChange;
    fn.objectPropertyChange=objectPropertyChange;
    fn.bindProperty=bindProperty;
    fn.bindNodeByCondition=bindNodeByCondition;
    fn.bindNode=bindNode;
    fn.bindElementProperty=bindElementProperty;
    fn.getUIInfo=getUIInfo;
    fn.repeatCall=repeatCall;
    fn.removeItem=removeItem;
    fn.UITemplate=UITemplate;
    fn.importUIJS=importUIJS;
    fn.importUIHTML=importUIHTML;
    fn.onPropertyChange=onPropertyChange;
    fn.bindNodeProperty=bindNodeProperty;
    fn.bindFunction=bindFunction;
    fn.newHashObject=newHashObject;
    fn.newArrayObject=newArrayObject;
    fn.includeJSFiles=includeJSFiles;
    fn.bindElementPropertyByName=bindElementPropertyByName;
    fn.toVarString=toVarString;
    fn.log=log;
    fn.bp=bp;
    fn.camelCase=camelCase;
    fn.execByScope=execByScope;
    fn.execTemplateScript=execTemplateScript;
    fn.toPercent=toPercent;
    //fn.delay=delay;
    fn.getStateFunction=getStateFunction;
    fn.onViewOnce=onViewOnce;
    fn.removeBlockBetween=removeBlockBetween;
    fn.takeBlockBetween=takeBlockBetween;
    fn.getElementsBetween=getElementsBetween;
    fn.cloneBetween=cloneBetween;
    fn.dropMove=dropMove;
    fn.DropRect=DropRect;
    fn.slice=slice;
    fn.push=push;
    fn.getFunctionComment=getFunctionComment;
    fn.getFunctionComments=getFunctionComments;
    
    fn.VDOM=VDOM;
    fn.newVNode=newVNode;
    function Turtle(){
        this.isTemplate=isTemplate;
        this.config=new Config();
        this.event={onerror:function(e){log(e);bp();alert(e);}};
        this.getUI=getUI;
        this.renderIn=renderIn;
        this.renderBefore=renderBefore;
        this.parseHTML=parseHTML;
        this.parseXMP=parseXMP;
        this.renderDocument=renderDocument;
        this.renderTemplate=renderTemplate;
        // this.compileUI=compileUI;
        this.compileDocument=compileDocument;
        this.replaceCls=replaceCls;
        this.initHTML=initHTML;
        this.ui=new UI();
        this.jsScript=newHashObject('JSHash');
        this.styleClasses=newKeyArrayObject("StyleClasses");
        this.refs=newKeyArrayObject("RefElements");
        this.parts=newKeyArrayObject("Parts");
        this.clsNode=newArrayObject('ClassNode');
        this.store=new Store();
        this.service=new Service();
        //this.body='';
        //this.uiTeam=new UITeam();
        //this.uiLink=new UILink();
        this.uiScope=new UIScope();
        this.xhr=new XHR();
        Object.defineProperty(this,"rootParts",{get:function(){return new RootParts();}});
        this.ready=ready;
        this.readyByRenderDocument=new ReadyObject();
        this.fn=fn;
        this.turtleScriptElement='';
        this.makeCompileString=makeCompileString;
        this.Service=Service;
        this.UIParam=UIParam;
        this.renderParser={
            attributeParser:attributeParser,
            elementParser:elementParser
        };
        this.require=require;
        this.isIE=isIE;
        this.templates=templates;
        this.url="";
        this.catch=_catch;
        this.paramFilter=paramFilter;
        this.locStorage=locStorage;
        this.isCompile=false;
        this.throwError=throwError;
        this.onResize=onResize;
        this.emitResize=emitResize;
        this.keyWord=new KeyWord();
    }
    Turtle.prototype=fn;
    turtle=$t=new Turtle();
    $rootScope=new RootScope();
    $client=new Client();
    setParseMode(1);
    
    aftertInit();
    
})();