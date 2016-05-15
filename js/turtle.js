
var turtle,$t;
(function(){
    try{document.write("<style>xmp,[type=xmp]{display:none}</style>");/* 这里隐藏我们的模板，防止闪一下*/}catch(e){}
    var 
        arrayPrototype      = Array.prototype,
        Objectprototype     = Object.prototype,
        hasOwnProperty      = Object.prototype.hasOwnProperty,
        slice               = arrayPrototype.slice,
        getPrototypeOf      = Object.getPrototypeOf,
        appendChild         = Node.prototype.appendChild,
        readyRE             = /complete|loaded|interactive/,
        memberRE            = /{[a-zA-Z\d\.\%\u4e00-\u9fa5]+\!?(['"]?)-?[a-zA-Z\d\.\%\u4e00-\u9fa5]*?\1\!?(['"]?)-?[a-zA-Z\d\.\%\u4e00-\u9fa5]*?\2}/g,
        orderRE             = /^\s?(if|while|for|switch|break|-|scope|content|bind|!|var|=)(\s|$)/g,
        orderCaseRE         = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
        operatorRE          = /\!=|==|=|<|>|\|/,
        camelCaseRE         = /-(\w)/g,
        isIE                = (!!window.ActiveXObject||"ActiveXObject" in window);
    
    if (!("classList" in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/g),
                            index = classes.indexOf(value);
                        
                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    }
                }
                
                return {                    
                    add: update(function(classes, index, value) {
                        if (!~index) classes.push(value);
                    }),
                    
                    remove: update(function(classes, index) {
                        if (~index) classes.splice(index, 1);
                    }),
                    
                    toggle: update(function(classes, index, value) {
                        if (~index)
                            classes.splice(index, 1);
                        else
                            classes.push(value);
                    }),
                    
                    contains: function(value) {
                        return !!~self.className.split(/\s+/g).indexOf(value);
                    },
                    
                    item: function(i) {
                        return self.className.split(/\s+/g)[i] || null;
                    }
                };
            }
        });
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
    function log(s){
        eval("console.log(s)");
    }
    function bp(){
        eval("debugger;");
    }
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
            return node.parentNode.removeChild(node);
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
        return url.match(/[a-zA-Z\d\.]+\.[a-zA-Z\d]+$/)[0];
    }
    function getNameByURL(url){
        return url.match(/[a-zA-Z\d\.]+\.[a-zA-Z\d]+$/)[0].replace(/\.[a-zA-Z\d]+$/,'');
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
    
    function getDebounce(cb){
        if(isFunction(cb)){
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
                    cb.apply(t,arg);
                },delay);
            }    
        }
    }
    function hasCustomToString(obj) {
      return isFunction(obj.toString) && obj.toString !== toString;
    }
    function getDPI(){
        var edpi=document.createElement('div');
        var dpi;
        edpi.style.height="1em";
        document.body.appendChild(edpi);
        dpi=edpi.scrollHeight;
        edpi.style.height="16px";
        dpi=dpi/edpi.scrollHeight;
        document.body.removeChild(edpi);
        return dpi;
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
                    if(value == newValue)return;
                    value = newValue;
                    _value.call(this, value);
                    fnOnSet.call(obj,name);
                };
            }else{
                newProperty.get=function() {
                    return _value;
                };
                newProperty.set=function(newValue) {
                    if(_value == newValue)return;
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
        if(obj.hasOwnProperty(name))
            onPropertyChange(obj,name,fnOnSet);
    }
    function removeItem(arr,obj){
        var index=arr.indexOf(obj);
        if(index!=-1)
            arr.splice(index, 1);
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
                                obj[o[j].name]=this[name];
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
    function addClass(elem,cls){
        var lst;
        if(!elem)
            return;
        lst=elem.classList;
        if(lst.contains(cls))
            return;
        lst.add(cls);
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
        if(!elem)
            return;
        lst=elem.classList;
        if(lst.contains(cls))
            lst.remove(cls);
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
    function isArrayLike(a){return typeof a.length=='number'}
    function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
    function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
    function camelize(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
    function trim(s){return s.replace(/^\s*/g,"").replace(/\s*$/g,"");}
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
    var _en_decode=document.createElement('div');
    function encodeHTML(str){
      _en_decode.innerText=str;
      var s=_en_decode.innerHTML;
      _en_decode.innerHTML='';
      return s;
    }
    function decodeHTML(str){
      _en_decode.innerHTML=str;
      var s=_en_decode.innerText;
      _en_decode.innerHTML='';
      return s;
    }
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
        id=setInterval(function(){
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
                if(isString(url)&&!(url in $t.jsScript)){
                    this.files.push(url);
                    $t.jsScript[url]=document.createElement("script");
                }
            }
        }else if(files){
            url=files;
            if(isString(url)&&!(url in $t.jsScript)){
                this.files.push(url);
                $t.jsScript[url]=document.createElement("script");
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
        var t;
        eval('var '+type+'=function(){};t='+type);
        if(isObject(prototype)){
            t.prototype=prototype;
        }
        return new t();
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
        if(!isArrayLike(array))return;
        var arr=array;
        var i=beginIndex>=0?beginIndex:0;
        var stack=[];
        var obj;
        var obj2;
        var state;
        var step={next:1}
        while(1){
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
        if(parent==null)return;
        insertNode(node,node2);
        parent.removeChild(node);
    }
    function insertNodesBefore(node,nodes){
        var parent=node.parentNode;
        if(parent==null)return;
        for(var i=0;i<nodes.length;i++){
            parent.insertBefore2(nodes[i],node);
        }
    }
    function appendNodes(nodes,parent){
        var c=toArray(nodes);
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
        var name=getAttr(node,'name');
        if(name){
            name=name;
            initHTML(node.childNodes,outerChildNodes,outerElement,props,part)
            $t.getNode[name]=node;    
        }
        removeNode(node);
        return treeEach.c_noIn;
    }
    function execOnScript(node,outerChildNodes,outerElement,props,part){
        var p=node.parentNode;
        if(p){
            var script=node.innerHTML;
            if(script.length>0){
                /*设置父对象事件*/
                var events;
                eval('events={'+script+'}');
                for(var i in events){
                    if(isFunction(events[i])){
                        p.addEventListener(i,events[i]);
                    }
                }
            }
        }
    }
    function execScript(node,outerChildNodes,outerElement,props,part){
        var script=node.innerHTML;
        if(script.length>0){
            var fn;
            var keyVar=String(getAttr(node,'var',''));
            
            fn=Function('outer,outerElement,props,part'+(keyVar?',':'')+keyVar,script);
            
            var args=[outerChildNodes,outerElement,props,part];
            if(keyVar.length>0){
                keyVar=keyVar.split(',');
                for(var i=0;i<keyVar.length;i++){
                    var ui=$t.refNode[keyVar[i]];
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
    function _execByScope(s,node,outer,outerElement,props,part){
        with(this){return eval(arguments[0])};
    }
    function execScope(s,node,outerChildNodes,outerElement,props,part){
        execByScope(node,'extend(this,{'+s+'});',null,outerChildNodes,outerElement,props,part);
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
        var length=name.length;
        while(scope){
            var obj=scope;
            for(var i=0;i<length;i++){
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
    
    function _execExpressionsByScope(s,v,node){
        var arg={v:v,node:node};
        with(this){
            return eval(arguments[0])
        };
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
            textNode=document.createTextNode('');
            
        if(bindVar.indexOf(".")!=-1){
            bindVar=bindVar.split(".");
        }else{
            bindVar=[bindVar];
        }
        name=bindVar[bindVar.length-1];
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        exp=function(v){
            try{
                return _execExpressionsByScope.call(scope,cdtn[1],v,node);
            }catch(e){_catch(e)}
        }
        exp.__that__=exp;
        $t.bindProperty(obj,name,exp,'__that__');
        replaceNodeByNode(node,textNode);
        bindElementProperty(exp,'__that__',textNode,'data');
        textNode['data']=exp.__that__;
    }
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
        if(cdtn.length==2){
            exp=function(v){
                obj2[name2]=execNodeValueEval(v,node,cdtn[1]);
            }
            exp.__that__=exp;
            bindProperty(obj,name,exp,'__that__');
        }else{
            bindElementProperty(obj,name,obj2,name2);
            obj2[name2]=obj[name];
        }
    }
    function execNodeValueEval(v,node,s){
        with(this){return eval(s)}
    }
    
    function bindElementPropertyByName(node,elementValueName,condition){
        var 
            cdtn=splitByOnce(condition,"|"),
            name=cdtn[0],
            scope,
            exp;
        if(!name)return;
        scope=$t.uiScope.get(node);
        if(name.indexOf(".")!=-1){
            name=name.split(".");
            obj=_getBindObject(scope,name);
            name=name[name.length-1];
        }else{
            obj=_getBindObject(scope,[name]);
        }
        if(!obj)return;
        
        if(cdtn.length==2){
            exp=function(v){
                execNodeValueEval(v,node,cdtn[1]);
            }
            exp.__that__=exp;
            bindProperty(obj,name,exp,"__that__");
        }else{
            if(!node.__bind__)node[elementValueName]=obj[name];
            bindProperty(obj,name,node,elementValueName);
        }
    }
    function bindNode(node,condition){
        var 
            cdtn=splitByOnce(condition,"|"),
            name=cdtn[0],
            scope,
            obj,
            exp,
            elementValueName,
            eventName;
        if(!name)return;
        scope=$t.uiScope.get(node);
        if(name.indexOf(".")!=-1){
            name=name.split(".");
            obj=_getBindObject(scope,name);
            name=name[name.length-1];
        }else{
            obj=_getBindObject(scope,[name]);
        }
        if(!obj)return;
        
        if(cdtn.length==2){
            exp=function(v){
                execNodeValueEval(v,node,cdtn[1]);
            }
            exp.__that__=exp;
            bindProperty(obj,name,exp,"__that__");
        }else{
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
            if(!node.__bind__)node[elementValueName]=obj[name];
            bindElementProperty(obj,name,node,elementValueName);
            if(eventName){
                node.addEventListener(eventName,function(){
                    obj[name]=node[elementValueName];
                });
            }
        }
    }
    function throwError(err){
        try{
            throw new Error('turtle:\n'+err);
        }catch(e){
            _catch(e);
        }
    }
    function replaceByObjectAttr(s,obj){
        var err=[];
        s=s.replace(memberRE,
            function(s){
                var isDefault;
                var dft;
                var limitValue;
                s=s.substring(1,s.length-1);
                isDefault=/\!/.test(s);
                if(isDefault){
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
                }else if(isDefault){
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
                var isDefault;
                var dft;
                var limitValue;
                s=s.substring(1,s.length-1);
                isDefault=/\!/.test(s);
                if(isDefault){
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
                }else if(isDefault){
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
    }
    /*function parseText(node,outerChildNodes,outerElement,props,part){
        node.data=execTemplateScript(node.data,node.parentNode,outerChildNodes,outerElement,props,part);
    }*/
    var getCommentText;
    
    if(Comment.prototype.hasOwnProperty("text")){
        getCommentText=function(node){
           var s=node.text;
           if(/^<!--([\s\S]*?)-->$/.test(s)){
               return s.substring(4,s.length-3);
           }else if(/^<!([\s\S]*?)>$/.test(s)){
               return s.substring(2,s.length-1);
           }
            return node.text.replace(/^!-?|-?&/);
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
    function cloneBewtween(node1,node2){
        var nodes=[];
        
        var l1=getNodeIndex2(node1);
        var l2=getNodeIndex2(node2);
        var p1=node1.parentNode;
        for(var i=l1+1;i<l2;i++){
            nodes.push(deepClone(p1.childNodes[i]));
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
                        var nodes=cloneBewtween(this.node,this.endNode);
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
            if(/[a-zA-Z\d] in .*/.test(info.condition)){
                check=new function(){
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
                }
            }else if(/^.*;.*;.*$/.test(info.condition)){
                check=new function(){
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
                }
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
                        var nodes=cloneBewtween(this.node,this.endNode);
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
        var breakElement=document.createElement('__break__');
        for(var i=0;i<nodes.length;i++){
            breakElement.appendChild(nodes[i]);
        }
        breakElement.source=order;
        return breakElement;
    }
    function parseCommentOrderNoScript(info,node,outerChildNodes,outerElement,props,part){
        switch(info.order){
            case 'while':
                return parseWhileOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'if':
                return parseIfOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'for':
                return parseForOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'switch':
                return parseSwitchOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
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
                replaceNodeByNodes(node,[document.createTextNode(v)]);
                break;
            case 'content':
                replaceNodeByNodes(node,outerChildNodes);
                break;
            case 'while':
                return parseWhileOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'if':
                return parseIfOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'break':
                return parseBreakOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'for':
                return parseForOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
            case 'switch':
                return parseSwitchOrder(info,node,outerChildNodes,outerElement,props,part);
                break;
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
    var elementParser={
                GET:parseGet,
                SET:parseSet,
                __BREAK__:parseBreak,
                SCRIPT:parseScript
            }
        ,attributeParser={
            ref:function(node,outerChildNodes,outerElement,props,part){
                $t.refNode.push(node.getAttribute('ref'),node);
                node.removeAttribute('ref');
            }
            ,":":function(node,outerChildNodes,outerElement,props,part){
                execNodeQuestion(node,outerChildNodes,outerElement,props,part);
                setQuestionAtrr(node,outerChildNodes,outerElement,props,part);
            }
            ,bind:function(node,outerChildNodes,outerElement,props,part){
                bindNode(node,takeAttr(node,'bind'));
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
        };
    function initHTML(c,outerChildNodes,outerElement,props,part){
        treeEach(c,'childNodes',function(node,step){
            if(node.nodeType===8){
                try{
                    parseComment(node,outerChildNodes,outerElement,props,part);    
                }catch(e){_catch(e)}
                return;
            }
            if(node.nodeType!==1){
                return;
            }
            if(node.hasAttribute('lazy')){
                parseLazy(node,outerChildNodes,outerElement,props,part);
                return treeEach.c_repeat;
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
                var ret=elementParser[node.nodeName](node,outerChildNodes,outerElement,props,part);
                if(ret){
                    return ret;
                };
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
        var attr=node.attributes;
        if(node.hasAttribute('link')){
            /*设置关联子对象*/
            var link=takeAttr(node,'link');
            if($t.getNode.hasOwnProperty(link)&&node.children.length==1){
                appendNodes($t.getNode[link].childNodes,node.children[0]);
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
    function bindNodeFunction(node,bindVar,fn){
        var 
            name,
            scope,
            obj,
            obj2;
        if(bindVar.indexOf(".")!=-1){
            bindVar=bindVar.split(".");
        }else{
            bindVar=[bindVar];
        }
        name=bindVar[bindVar.length-1];
        scope=$t.uiScope.get(node);
        obj=_getBindObject(scope,bindVar);
        obj2={fn:fn};
        bindProperty(obj,name,obj2,"fn");
        return {object:obj,name:name,targetObject:obj2,targetName:"fn"};
    }
    function execValueByScope(node,s,v,scope,outer,outerElement,props,part){
        return _execValueByScope.call(getScopeBy(scope,node),s,v,node,outer,outerElement,props,part);
    }
    function _execValueByScope(s,v,node,outer,outerElement,props,part){
        var arg={node:node,v:v,outer:outer,outerElement:outerElement,props:props,part:part}
        with(this){return eval(arguments[0])};
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
        var placeholder=document.createComment('');
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
    function UIParam(name,isDefault,defaultValue,limitValue){
        this.name=name;
        this.isDefault=isDefault;
        this.defaultValue=defaultValue;
        this.limitValue=limitValue;
    }
    function UITemplate(name,sortPath,path,s,isInnerUI){
        var t=this;
        t.params=[];
        t.datas=[];
        t.parts=[];
        t.isInnerUI=parseBool(isInnerUI);
        if(isObject(s)){
            extend(t,s);
            return;
        }
        var start=0;
        var idx=0;
        s.replace(memberRE,function(s0,s1,s2,index,sSource){
            var isDefault;
            var dft;
            var limitValue;
            var name;
            var s;
            s=s0.substring(1,s0.length-1);
            isDefault=/\!/.test(s);
            if(isDefault){
                s=s.split('!');
                dft=s[1];
                if(s.length>2)
                    limitValue=s[2];
                name=s[0];
            }else{
                name=s;
            }
            idx++;
            t.params.push(new UIParam(name,isDefault,dft,limitValue));
            t.datas.push(sSource.substring(start,index));
            start=index+s0.length;
            return '';
        });
        t.datas.push(s.substring(start,s.length));
        t.service=new Service();
        t.name=name;
        t.sortPath=sortPath;
        t.path=path;
        t.partName=t.name.replace(/[\.]/g,"_");
    }
    UITemplate.prototype={
        renderIn:function(elem,outerChildNodes,outerElement,props,part){
            if(!isArray(outerChildNodes)){
                outerChildNodes=[];
            }
            if(!isArray(outerElement)){
                outerElement=[];
            }
            var uiNode=document.createElement("ui:render");
            if(elem){
                elem.appendChild(uiNode);    
            }
            return this.render(uiNode,elem,outerChildNodes,outerElement,props,part);
        },
        renderBefore:function(elem,outerChildNodes,outerElement,props,part){
            if(!isArray(outerChildNodes)){
                outerChildNodes=[];
            }
            if(!isArray(outerElement)){
                outerElement=[];
            }
            var uiNode=document.createElement("ui:render");
            if(elem&&elem.parentNode){
                elem.parentNode.insertBefore2(uiNode,elem);
            }
            return this.render(uiNode,elem,outerChildNodes,outerElement,props,part);
        },
        render:function(uiNode,that,outerChildNodes,outerElement,props,part){
            var d=slice.call(this.datas);
            var err=[];
            if(!uiNode){
                uiNode=document.createElement("ui:render");
            }
            setQuestionAtrr(uiNode,outerChildNodes,outerElement,props,part);
            
            if(!isObject(props)){
                props={};
            }
            var attrs=uiNode.attributes;
            var len=attrs.length;
            for(var i=0;i<len;i++){
                var name=attrs[0].name;
                if(!props.hasOwnProperty(name)){
                    props[name]=attrs[0].value;    
                }
                uiNode.removeAttributeNode(attrs[0]);
            }
            for(var i=0;i<d.length-1;i+=2){
                var v;
                var p=this.params[i/2];
                if(props.hasOwnProperty(p.name)){
                    if(p.limitValue){
                        v=p.limitValue;
                    }else{
                        v=props[p.name];
                    }
                }else if(p.isDefault){
                    v=p.defaultValue;
                }else{
                    err.push(this.name+'不可缺少'+p.name+'参数');
                    v=undefined;
                }
                d.splice(i+1, 0, v);  
            }
            if(err.length>0){
                if($t.config.debugMode==2){
                    alert(err.join('\r\n'));
                }
                console.log(err.join('\r\n'));
                return;
            }
            var part=newPart(this,uiNode,execTemplateScript(d.join(''),that,outerChildNodes,outerElement,props,part),outerChildNodes,outerElement,props,part)
            this.parts.push(part);
            if(uiNode.parentNode!==null){
                part.insertBefore(uiNode);
            }
            removeNode(uiNode);
        
            return part;
        }
    }
    
    function newPart(template,node,s,outerChildNodes,outerElement,props,part){
        var t=newObject(template.partName,newPart.prototype);
        var name=template.name;
        node.innerHTML=s;
        var begin=t.begin=document.createComment('<'+name+'>');
        var end=t.end=document.createComment('</'+name+'>')
        end.part=begin.part=t;
        begin.sign=1;
        end.sign=0;
        t.props=props;
        t.template=template;
        t.onInsert=null;
        t.isInsert=false;
        var nodes=node.childNodes;
        
        initHTML(nodes,outerChildNodes,outerElement,props,t);
        t.store=slice.call(nodes);
        t.store.unshift(begin);
        t.store.push(end);
        for(var i=nodes.length;i>0;i--){
            node.removeChild(nodes[0]);
        }
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
        get elements(){
            if(this.isInsert){
                var elements=[];
                var node=this.begin.nextSibling;
                while(node!==this.end){
                    elements.push(node);
                    var node=node.nextSibling;                
                }
                return elements;
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
        get parent(){
            var node=this.begin;
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
                this.isInsert=true;
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
                this.isInsert=false;
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
        name=node.getAttribute('service');
        if(name){
            nodeName=node.getAttribute('ui');
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
    function defineUIByNode(node){
        var name=getAttr(node,'ui');
        if(name){
            $t.ui.define(name,'','',getTemplate(node),true);
        }
        removeNode(node);
    }
    function parseUITemplate(uiName,uiSortPath,uiPath,template){
        var _uiMain=document.createElement('ui:parseUITemplate');
        _uiMain.innerHTML=template;
        var cs=_uiMain.children;
        var i=0;
        var node;
        var s;
        var name;
        var nodeName;
        for(;i<cs.length;i++){
            node=cs[i];
            if(!isTemplate(node)){
                alert('最上层必须是ui/service模板标签，\r\n模板标签包含（xmp,template,title和含type="xmp"的script,style,textarea）');
                return;
            }
            if(node.hasAttribute('service')){
                defineServiceByNode(node);
                i--;
            }else{
                s=getTemplate(node);
                nodeName=node.getAttribute('ui');
                if(!nodeName)nodeName=uiName;
                if(!$t.ui.hasOwnProperty(nodeName)){
                    $t.ui.define(nodeName,uiSortPath,uiPath,s);
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
                eval(text);
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
        var ui=importUIHTML(uiInfo.name,uiInfo.sortPath);
        if (!ui) {
            removeNode(node);
            console.log(uiInfo.name + '组件不存在！');
            return;
        }
        var outerChildNodes = slice.call(node.childNodes);
        var outerElement = slice.call(node.children);
        for(var i=node.childNodes.length;i>0;i--){
            node.removeChild(node.childNodes[0]);    
        }
        var cpn=ui.render(node, node.parentNode,outerChildNodes,outerElement,null,part);
        step.next =cpn.elements.length;
    }
    function getUI(uiName,uiSortPath,outerChildNodes,outerElement,props,part){
        var ui=importUIHTML(uiName,uiSortPath);
        if (!ui) {
            console.log(uiName + '组件不存在！');
            return;
        }
        return ui.renderIn(null,outerChildNodes,outerElement,props,part);
    }
    function renderIn(uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part){
        var ui=importUIHTML(uiName,uiSortPath);
        if (!ui) {
            console.log(uiName + '组件不存在！');
            return;
        }
        return ui.renderIn(elem,outerChildNodes,outerElement,props,part);
    }
    function renderBefore(uiName,uiSortPath,elem,outerChildNodes,outerElement,props,part){
        var ui=importUIHTML(uiName,uiSortPath);
        if (!ui) {
            console.log(uiName + '组件不存在！');
            return;
        }
        return ui.renderBefore(elem,outerChildNodes,outerElement,props,part);
    }
    function parseXMP2(node){
        var ret=parseXMP(node);
        if(isArray(ret))
            replaceNodeByNodes(node,ret);
        else
            removeNode(node);
    }
    function initCls(){
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
    function parseHTML(uiHTML){
        var _uiMain=document.createElement('ui:parseHTML');
        _uiMain.innerHTML=uiHTML;
        initHTML(_uiMain.childNodes);
        return takeChildNodes(_uiMain);
    }
    
    function parseXMP(node){
        if(isDefine(node)){
            parseDefine(node);
        }else{
            return parseHTML(getTemplate(node));    
        }
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
                    if(this[i].hasOwnProperty("type")){
                        desc+=' type="'+this[i]["type"]+'"';
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
                var ts=this.items;
                var regExes=[];
                for(var i=0;i<ts.length;i++){
                    var s='(<'+ts[i].name;
                    if(ts[i].hasOwnProperty('type')){
                        s+=' +type=[\'"]'+ts[i].type+'[\'"]';
                    }
                    s+='([\\s\\S]*?)>([\\s\\S]*?)<\\/'+ts[i].name+'>';
                    s+=')';
                    regExes.push(s);
                }
                var re=eval('(/'+regExes.join("|")+'/g)');
                return str.match(re);
            }
        }
    );
    templates.XMP={};
    templates.TEMPLATE={};
    templates.TITLE={getData:function(node){return node.innerText;}};
    templates.STYLE={type:"xmp"};
    templates.SCRIPT={type:"xmp"};
    templates.TEXTAREA={type:"xmp",getData:function(node){return node.defaultValue;}};
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
                    var o=eval('('+s+')');
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
        var appends=[];
        
        document.head.appendChild=function(e){
            appends.push(e);
            Node.prototype.appendChild.call(this,e);
        }
        var 
            b=document.body,
            xmps=findTemplates(b.children),
            templateXMP=[];
            
        for(var i=0;i<xmps.length;i++){
            if(isDefine(xmps[i])){
                parseDefine(xmps[i]);
            }else{
                templateXMP.push(xmps[i]);
            }
        }
        oldHTML=b.innerHTML;
        for(var i=0;i<templateXMP.length;i++){
            parseHTML(getTemplate(templateXMP[i]));
        }
        var s=compileCls();
        var uiComplie=compileUI(uiList);;
        s+=uiComplie.script;
        removeNode(xmpStyle);
        scriptNode.innerHTML=s+scriptNode.innerHTML;
        for(var i in $t.jsScript){
            removeNode($t.jsScript[i]);
        }
        for(var i=0;i<appends.length;i++){
            var parentNode=appends[i].parentNode;
            if(parentNode){
                parentNode.removeChild(appends[i]);
            }
        }
        delete document.head.appendChild;
        s='';
        var ns=document.childNodes;
        
        b.innerHTML=oldHTML;
        for(var i=0;i<ns.length;i++){
            switch(ns[i].nodeType){
                case 10:/*<!DOCTYPE xxx>*/
                    s+='<!DOCTYPE '+ns[i].name+(ns[i].publicId?' '+ns[i].publicId:'')+(ns[i].systemId?' '+ns[i].systemId:'')+'>';
                    break;
                case 1:/*<html>*/
                    s+=ns[i].outerHTML;
                    break;
            }
        }
        fn(s,uiComplie.compileJS);
    }
    function propertyToJS(v){
        var s=JSON.stringify({xx:v});
        s=s.substring(6,s.length-1);
        return s;
    }
    function renderDocument(noAppend){
        renderDocument.beginTime=new Date();
        if($t.body.length>0){
            document.body.innerHTML=$t.body;
        }
        var 
            xmps=findTemplates(document.body.children),
            i,
            templateXMP=[];
        for(i=0;i<xmps.length;i++){
            if(isDefine(xmps[i])){
                parseDefine(xmps[i]);
            }else{
                templateXMP.push(xmps[i]);
            }
        }
        for(i=0;i<templateXMP.length;i++){
            var ret=parseHTML(getTemplate(templateXMP[i]));
            replaceNodeByNodes(templateXMP[i],ret);
        }
        initCls();
        
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
                    importUIHTML(uiList[i]);
                }
            }
        }
        for(var e in $t.ui){
            if($t.ui.hasOwnProperty(e)){
                var o=$t.ui[e];
                var sj=JSON.stringify(o).replace(/<\/script>/g,'</scr"+"ipt>');
                if(o.isInnerUI){
                    s.push('$t.ui.define("'+e+','+sj+')");');
                }else{
                    s.push('$t.importUIJS("'+e+'");');
                    compileJS.push({name:e,script:'$t.ui.define("'+e+'",'+sj+');'});
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
    function RootScope(){
        this.__actionNode__=document.documentElement;
        this.__children__=[];
        lockObject2(this);
        document.scope=this;
        window.$rootScope=this;
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
        stack:[new RootScope()],
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
    function UILink(){}
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
    }
    function UI(){
        Object.defineProperty(this,"__defineCallbacks__",{
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            }
        )
    }
    UI.prototype=
        {
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
            define:function(name,sortPath,path,s,isInnerUI){
                this[name]=new UITemplate(name,sortPath,path,s,isInnerUI);
                this.emitOnDefine(name,this[name]);
            }
        }
    function Service(){
        Object.defineProperty(this,"__defineCallbacks__",{
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            }
        )
    }
    Service.prototype=
        {
            require:function(n){
                if(!this.hasOwnProperty[n]){
                    this[n]=getService(n);
                }
                return this[n];
            },
            onDefine:UI.prototype.onDefine,
            emitOnDefine:UI.prototype.emitOnDefine,
            define:function(name,s){
                try{
                    this[name]=eval("("+s+")");    
                }catch(e){
                    _catch(e);
                }
                this.emitOnDefine(name,this[name]);
            }
        }
    function UITeam(){}
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
    }
    function newKeyArrayObject(type){
        return newObject(type,newKeyArrayObject.prototype);
    }
    newKeyArrayObject.prototype={
        push:function(key,node){
            if(!this.hasOwnProperty(key)){
                this[key]=[];
            }
            this[key].push(node);
        },
        clear:function(){
            forEach(this,function(data,key,obj){
                delete obj[key];
            },this,false);
        },
        getKeyArray:function(){
            return getKeyArray(this);
        }
    }
    function makeCompileString(){
        var script=$t.turtleScriptElement.cloneNode();
        script.setAttribute('compile','');
        script.setAttribute('compileuilist',getKeyArray($t.ui).join(','));
        
        return script.outerHTML;
    }
    function beforeReady(){
        var 
            scriptNode=$t.turtleScriptElement=document.scripts[document.scripts.length-1],
            compile=takeAttr(scriptNode,'compile',null),
            load=getAttr(scriptNode,'load',null),
            sciript=scriptNode.innerHTML,
            baseuipath=takeAttr(scriptNode,'baseuipath',null),
            extend=takeAttr(scriptNode,'extend',null),
            compilename=takeAttr(scriptNode,'compilename',null),
            compileuilist=takeAttr(scriptNode,'compileuilist',null);
        if(baseuipath){
            baseUIPath.push(baseuipath.split(";"));
        }else{
            baseUIPath.push('{path:"ui",name:"ui"}');
        }
        if(extend)
            $t.extend(window,$t.fn);
        if(sciript.length>0){
            execTurtleScript(scriptNode,null,null);
        }
        $t.url=scriptNode.getAttribute("src");
        if (compile != null){
            if(getQueryString("turtle_nocompile")!="1"){
                $t.xhr.get(scriptNode.src+'.setup',false,function(text){
                    eval('compile='+text);
                });
            }
        }
        var resume=(compile && compile.isOn && compile.url)?r1:r2;
        if(load){
            var loads=load.split(",");
            var i=0;
            var fnLoad=function(){
                i++;
                if(i<loads.length){
                    $t.includeJSFiles(loads[i],fnLoad);
                }else{
                    resume();
                }
            }
            $t.includeJSFiles(loads[0],fnLoad);
        }else{
            resume();
        }
        function r1(){
            $t.ready(function() {
                turtle.compileDocument(scriptNode,compileuilist,function(s,uiList){
                    if(!compilename){
                        compilename=getNameByURL(getNameByLocation());
                        if(/\./.test(compilename)){
                            compilename=compilename.split('.')[0];
                        }
                        console.log('未提供compilename，自动设置为“'+compilename+'”');
                    }
                    var url = compile.url + "?htmlName=" + compilename;
                    
                    var b=document.body;
                    b.innerHTML='<div style="background-color:#fff;position:absolute;left:0;right:0;bottom:0;top:0;">开始编译页面</div>';
                    var c=b.children[0];
                    $t.xhr.post(url,s,false,function(text){
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
                        for(var i=0;i<uiList.length;i++){
                            var url = compile.url + "?uiName=" + uiList[i].name;
                            $t.xhr.post(url,uiList[i].script,false,function(text){
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
                $t.renderDocument();
                $t.readyByRenderDocument.isReady=true;
            });
        }
    }
    function ready(fn){
        if($t.readyByRenderDocument.isReady||(readyRE.test(document.readyState)&&document.body!==null)){
            fn();
        }else{
            window.addEventListener('DOMContentLoaded',function(){
                if(document.body!==null){
                    window.removeEventListener('DOMContentLoaded',arguments.callee);
                    fn();   
                }
            },false);
        }
        return this;
    }
    
    function Config(){
        this.baseUIPath=baseUIPath;
        this.baseServicePath='service';
        lockObject(this);
        this.debugMode=2;
    }
    var onViewOnce;
    (function(){
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
            this.needWatch=0;
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
                    this.needWatch++;
                    if(this.needWatch===1){
                        window.addEventListener('scroll',scroll);
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
                    while(elem.parentNode!==elemScroll){
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
                        this.needWatch--;
                        items.splice(i,1);
                        i--;
                    }
                }
                if(this.needWatch===0){
                    window.removeEventListener('scroll',scroll);
                }
            }
        }
        
        onViewOnce=function(elem,elemScroll,fn){
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
    
    fn.toArray=toArray;
    fn.moveArray=moveArray;
    fn.getRect=getRect;
    fn.encodeHTML=encodeHTML;
    fn.decodeHTML=decodeHTML;
    fn.idle=idle;
    fn.elementDOMdistance=elementDOMdistance;
    fn.elementInElement=elementInElement;
    fn.getDebounce=getDebounce;
    fn.getAttr=getAttr;
    fn.extend=extend;
    fn.extendConst=extendConst;
    fn.lockObject=lockObject;
    fn.lockObject2=lockObject2;
    fn.getBind=getBind;
    fn.compact=compact;
    fn.flatten=flatten;
    fn.camelize=camelize;
    fn.dasherize=dasherize;
    fn.takeOutChildNodes=takeOutChildNodes;
    fn.takeChildNodes=takeChildNodes;
    fn.trim=trim;
    fn.trimLine=trimLine;
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
    fn.replaceByObjectAttr=replaceByObjectAttr;
    fn.replaceByNodeAttr=replaceByNodeAttr;
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
    //fn.base64Decode=decode;
    //fn.base64Encode=encode;
    fn.objectChange=objectChange;
    fn.objectPropertyChange=objectPropertyChange;
    fn.bindProperty=bindProperty;
    fn.bindElementProperty=bindElementProperty;
    fn.getUIInfo=getUIInfo;
    fn.repeatCall=repeatCall;
    fn.removeItem=removeItem;
    fn.UITemplate=UITemplate;
    fn.importUIJS=importUIJS;
    fn.onPropertyChange=onPropertyChange;
    fn.bindNodeProperty=bindNodeProperty;
    fn.newHashObject=newHashObject;
    fn.newArrayObject=newArrayObject;
    fn.includeJSFiles=includeJSFiles;
    fn.bindElementPropertyByName=bindElementPropertyByName;
    fn.log=log;
    fn.bp=bp;
    fn.camelCase=camelCase;
    fn.execByScope=execByScope;
    fn.execTemplateScript=execTemplateScript;
    fn.toPercent=toPercent;
    //fn.delay=delay;
    fn.getStateFunction=getStateFunction;
    fn.onViewOnce=onViewOnce;
    function Turtle(){
        this.isTemplate=isTemplate;
        this.config=new Config();
        this.event={onerror:function(e){log(e);alert(e)}};
        this.getUI=getUI;
        this.renderIn=renderIn;
        this.renderBefore=renderBefore;
        this.parseHTML=parseHTML;
        this.parseXMP=parseXMP;
        this.renderDocument=renderDocument;
        this.compileUI=compileUI;
        this.compileDocument=compileDocument;
        this.initCls=initCls;
        this.initHTML=initHTML;
        this.ui=new UI();
        this.jsScript=newHashObject('JSHash');
        this.styleClasses=newKeyArrayObject("StyleClasses");
        this.refNode=newKeyArrayObject("RefNode");
        this.clsNode=newArrayObject('ClassNode');
        this.getNode=newHashObject('GetNode');
        this.service=new Service();
        this.body='';
        this.uiTeam=new UITeam();
        this.uiLink=new UILink();
        this.uiScope=new UIScope();
        this.xhr=new XHR();
        Object.defineProperty(this,"rootParts",{get:function(){return new RootParts();}});
        this.ready=ready;
        this.readyByRenderDocument=new ReadyObject();
        this.fn=fn;
        this.turtleScriptElement='';
        this.makeCompileString=makeCompileString;
        this.renderParser={
            attributeParser:attributeParser,
            elementParser:elementParser
        };
        this.require=require;
        this.isIE=isIE;
        this.templates=templates;
        this.url="";
    }
    Turtle.prototype=fn;
    turtle=$t=new Turtle();
    beforeReady();
    
})();