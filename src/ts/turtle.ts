
/// <reference path='core.ts'/>
/// <reference path='Template.ts'/>
/// <reference path='scope.ts'/>
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
class Store extends HashObject<IHTMLElement>{
    take(name):INode|INodeArray{
        if(this.hasOwnProperty(name)){
            var ret:IHTMLElement=<IHTMLElement>this[name];
            delete this[name];
            if(ret.childNodes.length>1){
                return ret.childNodes;
            }else{
                return ret.childNodes[0];
            }
        }
    }
    takeElem(name):IHTMLElement|INodeArray{
        if(this.hasOwnProperty(name)){
            var ret:IHTMLElement=<IHTMLElement>this[name];
            delete this[name];
            if(ret.children.length>1){
                return ret.children;
            }else{
                return ret.children[0];
            }
        }
    }
}
interface ITurtle{
    config: Config;
    store:Store;
}
class Turtle implements ITurtle{
    constructor(){
        rte.on("error",function(e:Event){log(e);bp();alert(e);});
    }
    isTemplate=isTemplate;
    config=new Config;
    domScope=new DOMScope;
    replaceClassStore:IHTMLElement[];
    defineClassNames:string[];
    T:TemplateList=new TemplateList;
    parts:KeyArrayObject<Part>=newKeyArrayObject<Part>('Parts');
    xhr=new XHR;
    service=new Service;
    store=new Store;
    refs=newKeyArrayObject<IHTMLElement>("RefElements");
    
}