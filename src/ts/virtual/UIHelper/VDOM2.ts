
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
    name:string
    defaultValue:string|undefined
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
                
                let block=JS.Parser.parseBlock(html,m.index,'(',')');
                let length=block.toString().length;
                JS.deleteSpace(block,true);
                if(block.children.length!==1){
                    throw new Error('不支持：'+block.toString());
                }
                m.currentAttrValueFilter.params=block.children[0];
                debugger;
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
            debugger;
            m.currentAttrValueFilter.nameEnd=m.index;
            m.action='attrVarNameFilterParamBlock'
            // m.index++;
            return;
        }
        m.index++;
        // switch(keyWord){
        //     case ' ':
        //     case '\r':
        //     case '\n':
        //         break;
        //     default:
        //         throw new Error('错误的标识符:'+keyWord);
        // }
        
    }
    
    protected static attrValueStart(html:string,m:IMember2){
        switch (html[m.index]) {
            case '}':
                m.attrValueEnd=m.index;
                if(html[m.index+1]==='.'){
                    m.currentAttrValueFilter=new AttrValueFilter
                    m.attrValueFilters.push(m.currentAttrValueFilter);
                    m.action='attrVarNameFilter';
                    m.index+=2;
                    return;
                }else{
                    m.action='attributes';
                    m.index++;
                    return;
                }
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
    // protected static attributes(html: string, m: IMember2) {
    //     switch (html[m.index]) {
    //         case '{':
    //             if(m.attrVarNameStart===0){
    //                 m.action = 'attrVarNameStart';
    //                 m.attrVarNameStart=m.index;
    //                 m.index++;
    //             }else{
    //                 throw new Error('之前的{未闭合');
    //             }
    //             break;
    //         default:
    //             super.attributes(html,m);
    //     }
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
                let params:string[]=filter.params.split(',');
                for(const param of params){
                    let v=JS.toConst(param);
                    if(isString(v)&&v.length>=2){
                        switch(v[0]){
                            case "'":
                            case '"':
                            case '`':
                                if(v[v.length-1]===v[0]){
                                    break
                                }
                            default:
                                throw new Error('filter参数仅支持常量！')
                        }
                    }

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
            }
            directives.push({
                attrName:html.substring(m.attrStart, m.attrNameEnd),
                name:name,
                defaultValue:undefined,
                filters:filters
            });
        }else{
            (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
        }
    }
    protected static attrValue(html: string, m: IMember2) {
        switch (html[m.index]) {
            case '>':
                /*忽略等号*/
                this.setAttr(html,m);
                m.action = '';
                m.index++;
                break;
            case "/":
                if (m.length >= m.index + 2) {
                    if (html.substring(m.index + 1, 1) === '>') {
                        this.setAttr(html,m);
                        m.action = '';
                        m.index += 2;
                        return;
                    }
                }
                m.index++
                break;

            case '\r':
            case '\n':
            case ' ':
                m.index++;
                break;
            case '$':
                if(m.length>m.index+1&&html[m.index+1]==='{'){
                    if(m.attrValueStart===0){
                        m.action = 'attrValueStart';
                        m.attrValueStart=m.index;
                        m.attrValueFilters=[];
                        m.index+=2;
                    }else{
                        throw new Error('之前的${未闭合');
                    }
                    break;
                }
            default:
                super.attrValue(html,m);
        }
    }
    protected static getInitData(vNode: VNode & IVNodeMethod | undefined, length: number): IMember2 {
        let data:IMember2=<IMember2>super.getInitData(vNode,length);
        // data.attrVarNameStart=0;
        // data.attrVarNameEnd=0;
        data.attrValueStart=0;
        data.attrValueEnd=0;
        return data;
    }
}

//修改attributesToJS;
let VHtmlElement_attributesToJS=VMElement.VHtmlElement.prototype.attributesToJS;
VMElement.VHtmlElement.prototype.attributesToJS=function(this:VMElement.VHtmlElement&IVNodeMethod):string{
    let s:string=VHtmlElement_attributesToJS.call(this);
    //解析directive
    let directives=this.vmData.directives;
    if(directives){
        let fn='';
        for(const directive of directives){
            
            fn+=`let ${directive.name}=props.${directive.name}`;

            if(directive.defaultValue){
                fn+=`if(${directive.name}===undefined){
                    ${directive.name}='${directive.defaultValue};'
                }`
            }
            let paramInfo=new PartParam(directive.name);
            if(directive.filters!==null){
                for(const filter of directive.filters){
                    fn+=`
                    ${directive.name}=PartParamFilter.${filter.name}(${directive.name}${filter.params.length>0?',':''}${filter.params.join(',')});`
                }
            }
            fn+=`
                node.__('${directive.attrName}',${directive.name})`;
            
        }
        s+=`___(function(node:VNode){
                ${fn}
            })`;
    }
    return s;
}