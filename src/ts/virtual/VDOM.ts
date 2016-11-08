
/// <reference path='VNode.ts'/>
let 
    VDOM,
    VTemplate,
    xmlwordRE       =   /[a-zA-Z\/\!]/,
    emptyTextNodeRE =   /^\s*$/,
    stringNode      =   {
                            SCRIPT:/^\/script[>\s]/i,
                            TEMPLATE:/^\/template[>\s]/i,
                            STYLE:/^\/style[>\s]/i,
                            TITLE:/^\/title[>\s]/i,
                            TEXTAREA:/^\/textarea[>\s]/i,
                            XMP:/^\/xmp[>\s]/i
                        };
interface IMember{
    index:number
    node:IVNode
    action:string
    length:number
    textNodeStart:number
    xmlNodeStart:number
    xmlNodeNameStart:number
    attrStart:number
    attrNameEnd:number
    equlIndex:number
    stringStart:number
    stringStartChar:string
    betweenSpaceStart:number
    stringNodeStart:number
    stringNodeRegExp:RegExp|null
    stringNodeKeyLength:number
    commentStart:number
}
(function(){
    let htmlParse={
        '':function(html:string,m:IMember){
            let nodeName=m.node.nodeName;
            if(m.node.__closeSelf__){
                if(!m.node.parentNode){
                    throw new Error("渲染出错！");
                }
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
        textNode:function(html:string,m:IMember){
            let data;
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
        createXMLNode:function(html:string,m:IMember){
            m.xmlNodeStart=0;
            if(m.xmlNodeNameStart>0){
                //无属性标签
                let nodeName=html.substring(m.xmlNodeNameStart,m.index);
                m.node=m.node(nodeName);
                m.xmlNodeNameStart=0;
                m.index++;
            }
            m.action='';
            
        },
        setXMLNodeClose:function(html:string,m:IMember){
            let n=m.node;
            let name=trim(html.substring(m.xmlNodeNameStart,m.index)).toUpperCase();
            while(n){
                if(!n.parentNode){
                    throw new Error("渲染出错！");
                }
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
        xmlNode:function(html:string,m:IMember){
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
        endXmlNode:function(html:string,m:IMember){
            switch(html[m.index]){
                case '>':
                    this.setXMLNodeClose(html,m);
                    m.index++;
                    break;
                default:
                    m.index++;
            }
        },
        comment:function(html:string,m:IMember){
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
        comment2:function(html:string,m:IMember){
            if(html[m.index]==='>'){
                let vNode=m.node(html.substring(m.commentStart,m.index),8);
                vNode.__dbplus__=false;
                m.commentStart=0;
                m.action='';
            }
            m.index++;
        },
        comment3:function(html:string,m:IMember){
            if(html[m.index]==='-'){
                if(m.length>=m.index+3){
                    if(html.substr(m.index+1,2)==='->'){
                        let vNode=m.node(html.substring(m.commentStart,m.index),8);
                        vNode.__dbplus__=true;
                        m.commentStart=0;
                        m.action='';
                        m.index+=3;
                        return;
                    }
                }
            }
            m.index++;
        },
        attributes:function(html:string,m:IMember){
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
        attrValue:function(html:string,m:IMember){
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
        atvbetweenSpace:function(html:string,m:IMember){
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
        atvstring:function(html:string,m:IMember){
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
        stringNode:function(html:string,m:IMember){
            if(html[m.index]==='<'){
                if(m.length>=m.index+m.stringNodeKeyLength+1){
                    if(m.stringNodeRegExp&&m.stringNodeRegExp.test(html.substr(m.index+1,m.stringNodeKeyLength))){
                        let s=html.substring(m.stringNodeStart,m.index);
                        if(!emptyTextNodeRE.test(s)){
                            m.node.text(s);
                        }
                        m.stringNodeStart=0;
                        m.stringNodeRegExp=null;
                        m.action='stringNode2';
                        m.node.__isClose__=true;
                        if(!m.node.parentNode){
                            throw new Error("渲染出错！");
                        }
                        m.node=m.node.parentNode;
                        m.index+=m.stringNodeKeyLength;
                        m.stringNodeKeyLength=0;
                        return;
                    }
                }
            }
            m.index++;
        },
        stringNode2:function(html:string,m:IMember){
            if(html[m.index]==='>'){
                m.action='';
            }
            m.index++;
        },
        checkEnd:function(html:string,m:IMember){
            if(m.action==='textNode'){
                if(m.textNodeStart!==m.index){
                    let data=html.substring(m.textNodeStart,m.index);
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
    let htmlParseT={
        __proto__:htmlParse,
        checkTemplate:function(html:string,m:IMember){
            switch(html[m.index]){
                case '{':
                    debugger;
                    break;
                case '<':
                    if(html[m.index+1]==='%'){
                        debugger;
                        m.index+=2;
                        return true; 
                    }
                    break;
                case '%':
                    if(html[m.index+1]==='>'){
                        debugger;
                        m.index+=2;
                        return true; 
                    }
                    break;
            }
        },
        attributes:function(html:string,m:IMember){
            if(!this.checkTemplate(html,m)){
                this.__proto__.attributes(html,m);
            }
        },
        stringNode:function(html:string,m:IMember){
            if(!this.checkTemplate(html,m)){
                this.__proto__.stringNode(html,m);
            }
        },
        attrValue:function(html:string,m:IMember){
            if(!this.checkTemplate(html,m)){
                this.__proto__.attrValue(html,m);
            }
        },
        checkEnd:function(html:string,m:IMember){
            debugger;
            if(m.action==='textNode'){
                if(m.textNodeStart!==m.index){
                    let data=html.substring(m.textNodeStart,m.index);
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
    function getInitData(vNode:IVNode,length:number):IMember{
        if(!vNode){
            vNode=VNode('document');
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
            stringNodeKeyLength:0,
            commentStart:0
        };
    }
    VTemplate=function(html,vNode){
        let m=getInitData(vNode,html.length);
        vNode=m.node;
        while(m.index<html.length){
            htmlParseT[m.action](html,m);
        }
        htmlParseT.checkEnd(html,m);
        return vNode;
    }
    VDOM=function(html,vNode){
        let m=getInitData(vNode,html.length);
        vNode=m.node;
        while(m.index<html.length){
            htmlParse[m.action](html,m);
        }
        htmlParse.checkEnd(html,m);
        return vNode;
    }
}());


    // $VDOM=VDOM;
    // $VNode=newVNode;
    // if(mode===1){
    //     /*
    //         * 虚拟DOM
    //         */
    //     $DOM=VDOM;
    //     $node=newVNode;
    //     vNodesToDOM=function(vNodes){
    //         var arr=[];
    //         for(var i=0;i<vNodes.length;i++){
    //             arr.push(vNodes[i].toDOM());    
    //         }
    //         return arr;
    //     }
    // }else{
