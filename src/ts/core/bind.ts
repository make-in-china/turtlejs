
/// <reference path="execute.ts"/>

function _getBindObject(scope,arrNames:Array<string>){
    let i,obj,length=arrNames.length;;
    while(scope){
        obj=scope;
        for(i=0;i<length;i++){
            if(obj.hasOwnProperty(arrNames[i])){
                if(i<length-1){
                    obj=obj[arrNames[i]];
                    continue;
                }else{
                    return obj;    
                }
            }
        }   
        scope=scope.__parent__;
    }
    
    obj=window[arrNames[0]];
    if(obj){
        for(i=1;i<length;i++){
            if(obj.hasOwnProperty(arrNames[i])){
                if(i<length-1){
                    obj=obj[arrNames[i]];
                    continue;
                }else{
                    return obj;    
                }
            }
        }
    }
    return null;
}
interface IBindInfo{
    name:string
    target:Object
    targetName:string
    event:IBindFunction
}
function addBindInfo(obj:Object,name:string,target:Object,targetName:string,event:IBindFunction){
    let bindInfoHash=obj.__bind__;
    if(!bindInfoHash){
        bindInfoHash=[];
        obj.__bind__=bindInfoHash;
    }
    bindInfoHash.push({name:name,target:target,targetName:targetName,event:event});
}
function removeBind(obj,name,targetName):boolean{
    if(!obj.__bind__){
        return false;
    }
    let bindInfoHash=obj.__bind__;
    for(let i in bindInfoHash){
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
function onPropertyChange(obj,name,fnOnSet){
    let desc:PropertyDescriptor|null=Object.getOwnPropertyDescriptor(obj,name);
    if(!desc)return;
    if(desc.configurable===false)
        throwError('绑定失败：原属性'+name+'替换失败');
    if(desc.writable===false)
        throwError('绑定失败：原属性'+name+'不可写');
    delete obj[name];
    let newProperty:PropertyDescriptor={enumerable:desc.enumerable,configurable:true};
    let value;
    if(desc.hasOwnProperty('value')){
        let _value=desc.value;
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
            let get=<Function>desc.get;
            newProperty.get=function() {
                return get.call(this);
            };
        }
        if(desc.hasOwnProperty('set')){
            let set=<Function>desc.set;
            newProperty.set=function(newValue){
                set.call(this,newValue);
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
interface Object{
    __bind__:IBindInfo[]
}
interface IBindFunction{
    (name:string)
    isBinding:boolean;
    removeObject:Function;
    list:Array<Object>;
}
function bindPropertyByName(obj:Object,name:string,obj2:Object,name2:string):IBindFunction{
    let t:IBindFunction=<any>function(name){
        if(!t.isBinding){
            t.isBinding=true;
            for(let i=0;i<t.list.length;i++){
                let obj=t.list[i];
                if(obj!==this){
                    let o=obj.__bind__;
                    for(let j in o){
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

let bindProperty=(function(){
    function getBindInfo(obj:Object,name:string,targetName:string){
        if(!obj.__bind__)return;
        let bindInfoHash=obj.__bind__;
        for(let i in bindInfoHash){
            if(bindInfoHash[i].name===name&&bindInfoHash[i].targetName===targetName){
                return bindInfoHash[i];
            }
        }
    }
    return function (obj:Object,name:string,obj2:Object,name2:string,type?:number){
        let bindInfo1=getBindInfo(obj,name,name2);
        let bindInfo2=getBindInfo(obj2,name2,name);
        if(bindInfo1 && bindInfo2 && bindInfo1.event!==bindInfo2.event){
            throwError("不能混合不同的绑定链");
            return;
        }else if(bindInfo1){
            let e=bindInfo1.event;
            addBindInfo(obj2,name2,obj,name,e);
            e.list.push(obj2);
            if(type!=2){
                onPropertyChange(obj2,name2,e);
                e.isBinding=true;
                obj2[name2]=obj[name];
                e.isBinding=false;
            }
        }else if(bindInfo2){
            let e=bindInfo2.event;
            addBindInfo(obj,name,obj2,name2,e);
            e.list.push(obj);
            //if(type!=2){
                onPropertyChange(obj,name,e);
                e.isBinding=true;
                obj[name]=obj2[name2];
                e.isBinding=false;
            //}
        }else{
            let fn:IBindFunction=bindPropertyByName(obj,name,obj2,name2)
            onPropertyChange(obj,name,fn);
            if(type!=2){
                onPropertyChange(obj2,name2,fn);
                fn.isBinding=true;
                obj2[name2]=obj[name];
                fn.isBinding=false;
            }
        }
    }
}());
function bindElementProperty(obj:Object,name:string,obj2:Object,name2:string){
    bindProperty(obj,name,obj2,name2,2);
}

/*绑定属性与描述*/
function bindNodeProperty(node:INode,proName:string,condition:string){
    let 
        cdtn    =splitByOnce(condition,"|"),
        name,
        scope,
        obj,
        obj2    =node,
        bindVar =cdtn[0],
        arrBindVar:Array<string>,
        exp:IExp,
        name2   =camelCase(proName);
    if(name2.indexOf(".")!=-1){
        name2=name2.split(".");
        for(let i=0;i<name2.length-1;i++){
            obj2=obj2[name2[i]];
            if(!obj2)return;
        }
        name2=name2[name2.length-1];
    }
    if(bindVar.indexOf(".")!=-1){
        arrBindVar=bindVar.split(".");
    }else{
        arrBindVar=[bindVar];
    }
    name=bindVar[bindVar.length-1];
    scope=$t.domScope.get(node);
    obj=_getBindObject(scope,arrBindVar);
    if(obj===null){
        throwError('不能获取绑定属性:'+cdtn[0]);
        return;
    }
    if(cdtn.length==2){
        exp=<any>function(v){
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
function bindElementPropertyByName(node:IHTMLElement,elementValueName:string,condition:string){
    let 
        cdtn=splitByOnce(condition,"|"),
        name=cdtn[0],
        arrName:Array<string>,
        scope,
        exp:IExp,
        obj;
    if(!name)return;
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
    
    if(cdtn.length==2){
        exp=<any>function(v){
            _execExpressionsByScope(cdtn[1],v,node);
        }
        exp.__me__=exp;
        bindProperty(obj,name,exp,"__me__");
    }else{
        if(!node.__bind__){
            node[elementValueName]=obj[name];
        }
        bindProperty(obj,name,node,elementValueName);
    }
}
function bindPropertyByOrder(node,condition){
    let cdtn=splitByOnce(condition,'|');
    if(cdtn.length<2)return;
    let 
        name,
        scope,
        obj,
        bindVar=cdtn[0],
        arrBindVar:Array<string>,
        name2,
        scope2,
        obj2,
        bindVar2=cdtn[1],
        arrBindVar2:Array<string>;
        
    if(bindVar.indexOf(".")!=-1){
        arrBindVar=bindVar.split(".");
    }else{
        arrBindVar=[bindVar];
    }
    name=bindVar[bindVar.length-1];
    scope=$t.domScope.get(node);
    obj=_getBindObject(scope,arrBindVar);
    
    if(bindVar2.indexOf(".")!=-1){
        arrBindVar2=bindVar2.split(".");
    }else{
        arrBindVar2=[bindVar2];
    }
    name2=bindVar2[bindVar2.length-1];
    scope2=$t.domScope.get(node);
    obj2=_getBindObject(scope2,arrBindVar2);
    
    bindProperty(obj,name,obj2,name2);
    obj2[name2]=obj[name];
}
function bindExpressionsByOrder(node,condition){
    let cdtn=splitByOnce(condition,'|');
    if(cdtn.length<2)
        cdtn.push('v');
    let 
        name,
        scope,
        obj,
        bindVar=cdtn[0],
        arrBindVar:Array<string>,
        exp:IExp,
        textNode:IText=$node(' ',3);
        
    if(bindVar.indexOf(".")!=-1){
        arrBindVar=bindVar.split(".");
    }else{
        arrBindVar=[bindVar];
    }
    name=bindVar[bindVar.length-1];
    scope=$t.domScope.get(node);
    obj=_getBindObject(scope,arrBindVar);
    if(obj===null){
        throwError('不能获取绑定属性:'+cdtn[0]);
        return;
    }
    exp=<any>function(v){
        try{
            return _execExpressionsByScope.call(scope,cdtn[1],v,node);
        }catch(e){_catch(e)}
    }
    exp.__me__=exp;
    bindProperty(obj,name,exp,'__me__');
    replaceNodeByNode(node,textNode);
    bindElementProperty(exp,'__me__',textNode,'data');
    textNode['data']=<any>exp.__me__;
}
