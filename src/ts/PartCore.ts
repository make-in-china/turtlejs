
/// <reference path="core.ts"/>
/// <reference path="Execute.ts"/>
/// <reference path="bind.ts"/>
/// <reference path='TemplateConfig.ts'/>


function getScopeBy(scope,node:IVNode){
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
function getTemplate(node:INode):string{
    var nodeName=node.nodeName;
    if(templateConfig.hasOwnProperty(nodeName)){
        if(templateConfig[nodeName].hasOwnProperty('getData')){
            return templateConfig[nodeName].getData(node);
        }else{
            return node.innerHTML;
        }
    }
}
function parseDefine(node:INode){
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
function isDefine(node:INode):boolean{
    switch(true){
        case node.hasAttribute('service'):
        case node.hasAttribute('ui'):
        case node.hasAttribute('class'):
            return true;
    }
    return false;
}
function isTemplate(node:INode):boolean{
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
    var temps=[];
    treeEach(nodes,'children',function(node:INode){
        if(isTemplate(node))
            temps.push(node);
    });
    return temps;
}
function parseUITemplate(uiName:string,uiSortPath:string,uiPath:string,sHTML:string){
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
function importUIHTML(uiName:string,uiSortPath:string){
    if(!$t.ui.hasOwnProperty(uiName)){
        var uiPath=baseUIPath.getPathBySortPath(uiSortPath);
        $t.xhr.get(uiPath + '/' + (uiName + '.html').toLowerCase(),false,function(text){
            parseUITemplate(uiName,uiSortPath,uiPath,text);
        });
    }
    return $t.ui[uiName];
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