
/// <reference path='VDOM.ts'/>
class AttrValueFilter{
    nameStart:number=0
    nameEnd:number=0
    params:JS.JavaScriptStatement
}
interface IMember2 extends IMember {
    // attrVarNameStart:number
    // attrVarNameEnd:number
    attrValueFilters:AttrValueFilter[]
    currentAttrValueFilter:AttrValueFilter
    attrValueStart:number
    attrValueEnd:number
}
interface IDirective{
    attrName:string
    defaultValue:string|undefined
    name:string
    filters:{
        name:string
        params:string[]
    }[]|null
}
interface VNodeVMData{
    directives?:IDirective[]
}
abstract class VDOM2 extends VDOM {

    private static varNameKeyWordFirst="$abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"
    private static varNameKeyWord="$abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789?"
    
    protected static attrVarNameFilterParamBlock(html:string,m:IMember2){
        let keyWord=html[m.index];
        switch(keyWord){
            case '(':
                
                let {length,block}=JS.Parser.parseBlock(html,m.index);
                debugger;
                //block.toString().length;
                JS.deleteSpace(block,true);
                if(block.children.length>1){
                    throw new Error('不支持：'+block.toString());
                }
                m.currentAttrValueFilter.params=block.children[0];
                m.index+=length;
                m.action='attributes';
                return;
            case ' ':
            case '\r':
            case '\n':
                m.index++;
                return;
            default:
                throw new Error('错误的标识符:'+keyWord);
        }
    }
    protected static attrVarNameFilter(html:string,m:IMember2){
        let keyWord=html[m.index];
        if(m.currentAttrValueFilter.nameStart===0){
            if(this.varNameKeyWordFirst.indexOf(keyWord)!==-1){
                m.currentAttrValueFilter.nameStart=m.index;
                m.index++;
                return;
            }
        }else if(this.varNameKeyWord.indexOf(keyWord)===-1){
            //结束
            m.currentAttrValueFilter.nameEnd=m.index;
            m.action='attrVarNameFilterParamBlock'
            // m.index++;
            return;
        }
        m.index++;
        
    }
    protected static dot(html:string,m:IMember2){
        let keyWord=html[m.index];
        switch(keyWord){
            case '\r':
            case '\n':
            case ' ':
                m.index++; 
                return;
            case '.':
                m.currentAttrValueFilter=new AttrValueFilter
                m.attrValueFilters.push(m.currentAttrValueFilter);
                m.action='attrVarNameFilter';
                m.index++;
                return;
        }
        m.action='attributes';
    }
    protected static attrValue2(html:string,m:IMember2){
        switch (html[m.index]) {
            case '}':
                m.attrValueEnd=m.index;
                m.action='dot';
        }
        m.index++;
    }
    // protected static attrVarNameStart(html:string,m:IMember2){
    //     switch (html[m.index]) {
    //         case '}':
    //             m.attrVarNameEnd=m.index;
    //             m.action='attributes';
    //     }
    //     m.index++;
    // }
    // static stringNode(html: string, m: IMember2) {
    //     if (!this.checkTemplate(html, m)) {
    //         super.stringNode(html, m);
    //     }
    // }
    protected static setAttr(html:string,m:IMember2){
        let name:string;
        let defaultValue:string|undefined=undefined;
        // if(m.attrVarNameStart!==0&&m.attrVarNameStart<m.attrVarNameEnd){
        //     let directives=m.node.vmData.directives;
        //     if(directives===undefined){
        //         directives= m.node.vmData.directives=[];
        //     }
        //     name=html.substring(m.attrVarNameStart, m.attrVarNameEnd);
        //     let nameArr=splitByOnce(name,'?');
        //     if(nameArr.length===2){
        //         throw new Error('')
        //     }
        //     directives.push({
        //         name:name,
        //         defaultValue:undefined,
        //         filters:null
        //     });
        // }else 
        if(m.attrValueStart!==0&&m.attrValueEnd>m.attrValueStart){
            let directives=m.node.vmData.directives;
            if(directives===undefined){
                directives= m.node.vmData.directives=[];
            }
            let filters:{
                name:string
                params:string[]
            }[]=[];
            for(const filter of m.attrValueFilters){
                let params:string[];
                if(filter.params){
                    params=filter.params.split(',');
                    for(const param of params){
                        if(!isConst(param)){
                            throw new Error('filter参数仅支持常量！')
                        }
                    } 
                }else{
                    params=[];
                }
                let filterInfo={
                    name:html.substring(filter.nameStart, filter.nameEnd),
                    params:params
                }
                filters.push(filterInfo);
            }
            name=html.substring(m.attrValueStart, m.attrValueEnd);
            let nameArr=splitByOnce(name,'?');
            if(nameArr.length===2){
                name=nameArr[0];
                defaultValue=nameArr[1];
                let v=JS.toConst(defaultValue);
                if(isString(v)){
                    if(!isStringConst(defaultValue)){
                        throw new Error('默认值仅支持常量！');
                    }
                }else{
                    defaultValue="'"+defaultValue+"'";
                }
            }
            directives.push({
                attrName:html.substring(m.attrStart, m.attrNameEnd),
                name:name,
                defaultValue:defaultValue,
                filters:filters
            });
            m.attrValueFilters=[];
            m.attrValueStart=0;
            m.attrValueEnd=0;
            m.attrStart=0;
            m.attrNameEnd=0;
            m.equlIndex=0;
        }else{
            super.setAttr(html,m);
        }
    }
    protected static attributes(html: string, m: IMember2) {
        switch (html[m.index]) {
            case '=':
                if(html[m.index+1]==='$'&&m.length>m.index+2&&html[m.index+2]==='{'){
                    if (m.attrStart > 0 && m.attrNameEnd === 0) {
                        m.attrNameEnd = m.index;
                    }
                    m.equlIndex = m.index;
                    if(m.attrValueStart===0){
                        m.action = 'attrValue2';
                        m.index+=3;
                        m.attrValueStart=m.index;
                        m.attrValueFilters=[];
                        break;
                    }else{
                        throw new Error('之前的${未闭合');
                    }
                }
            default:
                super.attributes(html,m);
        }
    }
    
    protected static textNode(html: string, m: IMember2) {
        let data;
        switch (html[m.index]) {
            case '@':
                let data:string;
                if (m.textNodeStart !== m.index) {
                    data = html.substring(m.textNodeStart, m.index);
                    if (!VMDOM.emptyTextNodeRE.test(data)) {
                        m.node(data, 3);
                    }
                }
                
                //代码块
                switch(true){
                    case m.index<m.length-2&&html[m.index+1]==='{':
                        //@{js语句块}    
                        m.index++;
                        var {length,block}=JS.Parser.parseBlock(html,m.index);
                        m.index+=length;
                        
                        var script=`Order.exec(this,'${block.toString()}')`;
                        
                        var scriptNode=$$$(script,ENodeType.Script);
                        m.node.appendChild(scriptNode);

                        m.textNodeStart = m.index;
                        return;
                    case m.index<m.length-2&&html[m.index+1]==='@':
                        //@@order;
                        //@@order();
                        //@@order   ();
                        m.index+=2;
                        var {length,statement}=JS.Parser.parseStatement(html,m.index);
                        m.index+=length;
                        
                        let count:number=2;
                        let chds=statement.children;
                        if(chds.length<count){
                            throw new Error("错误的Order语句：语句不完整，缺少';'");
                        }
                        let itm=chds[0];
                        if(!isString(itm)){
                            throw new Error("错误的Order语句：'"+itm+"'应该为Order Name");
                        }
                        let name=itm;
                        let idx=1;
                        itm=chds[idx];
                        if(isString(itm)&&JS.isSpace(itm)){
                            idx++;
                            count++;
                            if(chds.length<count){
                                throw new Error("错误的Order语句：语句不完整，缺少';'");
                            }
                            itm=chds[idx];
                        }
                        let condition:JS.JavaScriptBlock|undefined;
                        if(itm instanceof JS.JavaScriptBlock){
                            idx++;
                            count++;
                            if(chds.length<count){
                                throw new Error("错误的Order语句：语句不完整，缺少';'");
                            }
                            condition=itm;
                        }

                        if(!isString(itm)||itm!==';'){
                            //order;
                            throw new Error("错误的Order语句：语句不完整，缺少';'");
                        }

                        m.node.appendChild($$$(new VMDOM.VOrderData(name,condition),ENodeType.Order));

                        m.textNodeStart = m.index;
                        return;
                    default:
                        //寻找执行体
                        m.index++;
                        var {length,statement}=JS.Parser.parseStatement(html,m.index);
                        m.index+=length;
                        //@js语句
                                                

                        
                        var script=`Order.exec(this,'${statement.toString()}')`;
                        
                        var scriptNode=$$$(script,ENodeType.Script);
                        m.node.appendChild(scriptNode);

                        m.textNodeStart = m.index;


                }
            default:
                super.textNode(html,m);
        }
    }
    protected static getInitData(vNode: VMDOM.VNode & IVNodeMethod | undefined, length: number): IMember2 {
        let data:IMember2=<IMember2>super.getInitData(vNode,length);
        data.attrValueStart=0;
        data.attrValueEnd=0;
        return data;
    }
}

//修改attributesToJS;   
//tag:hook
let VHtmlElement_attributesToJS=VMDOM.VHtmlElement.prototype.attributesToJS;
VMDOM.VHtmlElement.prototype.attributesToJS=function(this:VMDOM.VHtmlElement&IVNodeMethod):string{
    let s:string=VHtmlElement_attributesToJS.call(this);
    //解析directive
    let directives=this.vmData.directives;
    if(directives){
        
        let fn='';
        for(const directive of directives){
            
            fn+=`
                let $${directive.name}:any=props.${directive.name};`;

            if(directive.defaultValue){
                fn+=`
                if($${directive.name}===undefined){
                    $${directive.name}=${directive.defaultValue};
                }`
            }
            let paramInfo=new PartParam(directive.name);
            if(directive.filters!==null){
                for(const filter of directive.filters){
                    fn+=`
                $${directive.name}=PartParamFilter.${filter.name}($${directive.name}${filter.params.length>0?',':''}${filter.params.join(',')});`
                }
            }
            fn+=`
                this._('${directive.attrName}',$${directive.name}.toString());`;
            
        }
        s+=`.___(function(this:${toClassName(this)}){${fn}
            })`;
    }
    return s;
}

function toClassName(this: void, node: VMDOM.VNode): string {
    if (isVComment(node)) {
        return "VComment&IVNodeMethod"
    } else if (isVText(node)) {
        return "VText&IVNodeMethod"
    } else if (isVDocType(node)) {
        return "VDocumentType&IVNodeMethod"
    } else {
        let nodeName = node.nodeName;
        nodeName = nodeName[0] + nodeName.substr(1).toLowerCase();
        return 'VMDOM.V' + nodeName + 'Element&IVNodeMethod';
    }
}
function isConst(value:string):boolean{
    let v=JS.toConst(value);
    if(isString(v)){
        return isStringConst(value);
    }
    return true;
}
function isStringConst(value:string):boolean{
    if(value.length>=2){
        switch(value[0]){
            case "'":
            case '"':
            case '`':
                if(value[value.length-1]===value[0]){
                    return true;
                }
            default:
                return false;
        }
    }
    return false;
}