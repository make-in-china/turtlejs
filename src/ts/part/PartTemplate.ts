
/// <reference path="PartParam.ts"/>

const memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;

interface IPartTemplate{
    params:ArrayEx<PartParam>;
    datas:ArrayEx<string>;
    extends:IPartTemplate;
    partName:string;
    service:Service;
    // beExtends:(node:INode,that,outerChildNodes:INodeArray,outerElement:IHTMLCollection,props,part)=>ExtendsPart;
    parseParamsHelp:(p)=>void;
}
class PartTemplate implements IPartTemplate{
    partName:string;
    Instance:ArrayEx<Part>=new ArrayEx<Part>();
    params:ArrayEx<PartParam>;
    datas:ArrayEx<string>;
    extends:IPartTemplate;
    isJSDefine=true;
    parts:Array<Part>=[];
    service:Service;
    constructor(
        public name:string,
        public sortPath:string,
        public path:string,
        s:string|IPartTemplate,
        ext
    ){
        this.partName=name.replace(/[\.]/g,"_");
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
    /*调用render*/
    renderIn(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        let uiNode:IHTMLElement;
        if(!isArray(outerChildNodes)){
            outerChildNodes=[];
        }
        if(!isArray(outerElement)){
            outerElement=[];
        }
        uiNode=<IHTMLElement>$node('ui:render');//document.createElement("ui:render");
        if(elem){
            elem.appendChild(uiNode);    
        }
        return this.render(uiNode,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    /*调用render*/
    renderBefore(elem,outerChildNodes,outerElement,props,part,partName,reExtends){
        let uiNode:IHTMLElement;
        if(!isArray(outerChildNodes)){
            outerChildNodes=[];
        }
        if(!isArray(outerElement)){
            outerElement=[];
        }
        uiNode=<IHTMLElement>$node('ui:render');//document.createElement("ui:render");
        if(elem&&elem.parentNode){
            elem.parentNode.insertBefore2(uiNode,elem);
        }
        return this.render(uiNode,elem,outerChildNodes,outerElement,props,part,partName,reExtends);
    }
    /**
     * 渲染dom
     */
    render(uiNode:IHTMLElement,that,outerChildNodes,outerElement,props,part:Part,refPartName:string,reExtends:boolean){
        
        let 
            ext,
            attrs:NamedNodeMap,
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
        // if(ext instanceof PartTemplate){
        //     ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
        // }
        // let newPart=new Part(this,ext,props,html,outerChildNodes,outerElement);
        let newPart=new Part(this,props,html,outerChildNodes,outerElement);
        if(refPartName){
            /**放置到全局引用 */
            KeyArrayHashObjectManage.push($t.parts,refPartName,newPart);
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
    /**由props构建html字符串
     * @param {Object} props 
     * */
    joinDatasByProps(props:Object):string{
        
        let err=[];
        let d:ArrayEx<string>=slice.call(this.datas);
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
            return "";
        }
        return d.join('');
    }
    // /*变成别人的扩展*/
    // beExtends(node:INode,that,outerChildNodes:INodeArray,outerElement:IHTMLCollection,props,part):ExtendsPart{
    //     let ext;
    //     if(this.extends instanceof PartTemplate){
    //         ext=this.extends.beExtends(node,that,outerChildNodes,outerElement,props,part);
    //     }
    //     let html=this.joinDatasByProps(props);
    //     return new ExtendsPart(
    //         this,
    //         ext,
    //         props,
    //         execTemplateScript(html,that,outerChildNodes,outerElement,props,part),
    //         outerChildNodes,
    //         outerElement
    //     );
    // }
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
