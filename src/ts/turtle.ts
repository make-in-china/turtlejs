/// <reference path='core.ts'/>
/// <reference path='Template.ts'/>
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
interface IRenderDocument{
    beginTime?:Date;
    endTime?:Date;
}
let renderDocument:IRenderDocument=function(noAppend){
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


class Config{
    baseUIPath=baseUIPath;
    baseServicePath='service';
    debugMode=2;
}

class Turtle{
    constructor(){
        rte.on("error",function(e:Event){log(e);bp();alert(e);});
    }
    isTemplate=isTemplate
    config=new Config;
}