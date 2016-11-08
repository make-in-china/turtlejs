
/// <reference path="../core/core.ts"/>
/// <reference path="../core/execute.ts"/>
/// <reference path="../core/bind.ts"/>
let 
    orderRE                 =	/^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=)(\s|$)/g,
    orderCaseRE             =   /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
    parseForOrderRE         =   /[a-zA-Z\d] in .*/,
    parseForOrderRE2        =   /^.*;.*;.*$/,
    SetParseError:IParseError  =   function(msg:string){
        SetParseError.isError=true;
        alert(msg);
        return eTreeEach.c_stopEach;
    },
    orderStack              =   new ArrayEx<IOrder>();
SetParseError.isError=false;
interface IParseError{
    isError?:boolean;
    (msg:string):eTreeEach;
}
interface ICommentOrderInfo{
    order?: string;
    orderCase?: string;
    condition: string;
}
interface ITurtle{
    replaceClassStore:IHTMLElement[];
    defineClassNames:string[];
}
function replaceCls(){
    let arr=$t.replaceClassStore;
    for(let i=0;i<arr.length;i++){
        let cls=arr[i].getAttribute('cls');
        arr[i].removeAttribute('cls');
        if($t.defineClassNames[cls]){
            arr[i].className+=' '+$t.defineClassNames[cls].join(" ");
        }
    }
    arr.length=0;
}
/**从注释中读取命令 */
function getCommentStringInfo(s):ICommentOrderInfo|null{
    let order=s.match(orderRE);
    if(order){
        return {order:trim(order[0]),condition:s.substring(order[0].length,s.length)}    
    }else{
        let orderCase=s.match(orderCaseRE);
        if(orderCase){
            return {orderCase:trim(orderCase[0]),condition:s.substring(orderCase[0].length,s.length)}  
        }
    } 
    return null;
}
/**从注释中读取字符串 */
let getCommentText=(function(){
    if(Comment.prototype.hasOwnProperty("text")){
        let commentDataRE=/^<!--([\s\S]*?)-->$/;
        let commentDataRE2=/^<!([\s\S]*?)>$/;
        let commentDataRE3=/^!-?|-?&/;
        return function(node:IComment):string{
            let s=node.text;
            if(commentDataRE.test(s)){
                return s.substring(4,s.length-3);
            }else if(commentDataRE2.test(s)){
                return s.substring(2,s.length-1);
            }else{
                return s.replace(commentDataRE3,'');
            }
            
        }
    }else{
        return function(node:IComment){
            return node.data;
        }
    }
}());
function parseScopeOrder(info:ICommentOrderInfo,node:IComment,outerChildNodes,outerElement,props,part){
    let condition=splitByOnce(info.condition,"|");
    if(condition.length==2){
        $t.domScope.create(node,condition[0]);
        execScope(condition[1],node,outerChildNodes,outerElement,props,part);
    }else{
        $t.domScope.create(node,condition[0]);
    }
    removeNode(node);
}
function parseCommentOrderNoScript(info:ICommentOrderInfo,node:IComment,outerChildNodes,outerElement,props,part){
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
function parseCommentOrderBlock(node:INode,outerChildNodes,outerElement,props,part){
    let i=getNodeIndex2(node);
    let isError=false;
    let error=function(msg){
        isError=true;
        alert(msg);
        return eTreeEach.c_stopEach;
    }
    return treeEach(node.parentNode.childNodes,'childNodes',function(node,step){
        if(!isCommentNode(node)){
            return;
        }
        let info=getCommentStringInfo(getCommentText(node));
        if(!info){
            return;
        }
        if(info.order){
            let ret=parseCommentOrderNoScript(info,node,outerChildNodes,outerElement,props,part);
            if(ret){
                step.next=ret.index-getNodeIndex2(node)+1;
            }
            return eTreeEach.c_noRepeat&eTreeEach.c_noIn;
        }
        if(info.orderCase==='end'){
            if(orderStack.length>0){
                (<IOrder>orderStack.pop()).endNode=node;
                
                return eTreeEach.c_stopEach;
            }else{
                return error('语法错误：多余的end');
            }
        }
        return eTreeEach.c_noIn;
    },i+1);
    
}
interface INode{
    __order__?:IOrder
}
interface IOrder{
    name?:string
    node?:INode
    endNode?:INode|null
    condition?:string
    parseCommentOrderBlockReturnValue?:{
        stack: [IArray | INode[], number];
        state: eTreeEach | undefined;
        array: IArray | INode[];
        index: number;
    } | undefined
}
function addOrderToNode(node:INode,info,outerChildNodes,outerElement,props,part,fnGetOrder:()=>IOrder){
    let order;
    if(!node.__order__){
        order=fnGetOrder();
        node.__order__=order;
        order.name=info.order;
        order.node=node;
        order.endNode=null;
        order.condition=info.condition;
        orderStack.push(order);
        order.parseCommentOrderBlockReturnValue=parseCommentOrderBlock(node,outerChildNodes,outerElement,props,part);
    }else{
        order=node.__order__;
    }
    return order.parseCommentOrderBlockReturnValue;
}
function parseIfOrder(info,node,outerChildNodes,outerElement,props,part){
    return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
        let scope=$t.domScope.get(node);
        return {
            endHit:null,
            hit:null,
            hasElse:false,
            run:function(){
                let order=this;
                order.hit=parseBool(execByScope(node,this.condition,scope,outerChildNodes,outerElement,props,part))?this.node:null;
                treeEach(node.parentNode.childNodes,'childNodes',function(node:INode,step){
                    if(!isCommentNode(node)){
                        return;
                    }
                    let info=getCommentStringInfo(getCommentText(node));
                    if(!info)return;
                    if(node.__order__&&node.__order__.node){
                        step.next=getNodeIndex2(node.__order__.node)-getNodeIndex2(node);
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
                                return SetParseError('语法错误：else或else if不能出现在else后');
                            }
                            break;
                    }
                },getNodeIndex2(node)+1);
                let p=this.node.parentNode;
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
                    let ns=takeBlockBetween(this.hit,this.endHit);
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
function parseBreakOrder(info,node,outerChildNodes,outerElement,props,part){
    /*删除后面节点,父节点后面节点,父父节点后面节点直至__break__*/
    let _node=node.previousSibling;
    if(!_node)
        _node=node.parentNode;
    removeNode(node);
    let p=_node.parentNode;
    while(_node.nodeName!='__BREAK__'){
        let cs=p.childNodes;
        let length=cs.length;
        let index=getNodeIndex2(_node)+1;
        for(let i=index;i<length;i++){
            p.removeChild(cs[index]);
        }
        _node=p;
        p=p.parentNode;
    }
    _node.source.onBreak();
}
function parseWhileOrder(info,node,outerChildNodes,outerElement,props,part){
        
    return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
        return {
            run:function(){
                let p=this.node.parentNode;
                if(this.isBreak||!parseBool(execByScope(this.node,this.condition,null,outerChildNodes,outerElement,props,part))){
                    //全部删除
                    removeBlockBetween(this.node,this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }else{
                    let nodes=cloneBetween(this.node,this.endNode);
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
function parseAsyncOrder(info,node,outerChildNodes,outerElement,props,part){
    return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
        return {
            run:function(){
                let order=this;
                let ns=takeBlockBetween(this.node,this.endNode);
                let delay=parseInt(this.condition);
                if(delay===NaN){
                    delay=0;
                }
                removeNode(this.endNode);
                let mark=$node('async',8);
                replaceNodeByNode(this.node,mark);
                this.endNode=null;
                this.node=null;
                setTimeout(function(){
                    let elem=$node('div');
                    let p=mark.parentNode;
                    replaceNodeByNode(mark,elem);
                    // mark=null;
                    appendNodes(ns,elem);
                    let chds=elem.childNodes;
                    initHTML(chds,outerChildNodes,outerElement,props,part);
                    takeOutChildNodes(elem);
                    // elem=null;
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
                let order=this;
                let scope=$t.domScope.get(node);
                treeEach(node.parentNode.childNodes,'childNodes',function(node:IComment,step){
                    if(!isCommentNode(node)){
                        return;
                    }
                    let info=getCommentStringInfo(getCommentText(node));
                    if(!info){
                        return;
                    }
                    if(node.__order__&&node.__order__.endNode){
                        step.next=getNodeIndex2(node.__order__.endNode)-getNodeIndex2(node);
                        return;
                    }
                    switch(info.orderCase){
                        case 'case':
                        case 'case break':
                            if(order.hasDefault){
                                return SetParseError('语法错误：default后不应出现case/case break');
                            }else if(!order.hit){
                                let isPass=order.value==execByScope(node,info.condition,scope,outerChildNodes,outerElement,props,part);
                                if(isPass){
                                    order.hit=node;
                                    node.__order__=info.orderCase;
                                }
                            }else if(!order.endHit){
                                order.endHit=node;
                            }
                            break;
                        case 'default':
                            if(order.hasDefault){
                                return SetParseError('语法错误：多余的default');
                            }else{
                                order.hasDefault=true;
                                if(!order.hit){
                                    order.hit=node;
                                    node.__order__=info.orderCase;
                                }else if(!order.endHit){
                                    order.endHit=node;
                                }
                            }
                            break;
                    }
                },getNodeIndex2(node)+1);
                let p=this.node.parentNode;
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
                    let ns=takeBlockBetween(this.hit,this.endHit);
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
function parseForOrder(info,node,outerChildNodes,outerElement,props,part){
    
    return addOrderToNode(node,info,outerChildNodes,outerElement,props,part,function(){
        let check;
        if(parseForOrderRE.test(info.condition)){
            check=(function(){
                let s=info.condition.split(' in '),
                    index=0,
                    names=[],
                    source;
                return function(){
                    if(!source){
                        source=execByScope(node,s[1],null,outerChildNodes,outerElement,props,part)
                        if(!source){
                            return {result:false,params:null}
                        }
                        for(let i in source){
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
                let isFirst=true;
                let s=info.condition.split(';');
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
                let p=this.node.parentNode;
                let ret=this.check();
                if(this.isBreak||!ret.result){
                    //全部删除
                    removeBlockBetween(this.node,this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }else{
                    let nodes=cloneBetween(this.node,this.endNode);
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
interface IHTMLBreakElement extends IComment{
    source?:{run}
}
function createBreakElement(nodes,order:{run}){
    let breakElement:IHTMLBreakElement=$node('__break__');
    for(let i=0;i<nodes.length;i++){
        breakElement.appendChild(nodes[i]);
    }
    breakElement.source=order;
    return breakElement;
}
function parseCommentOrder(info:ICommentOrderInfo,node:IComment,outerChildNodes,outerElement,props,part){
    switch(info.order){
        case 'scope':
            parseScopeOrder(info,node,outerChildNodes,outerElement,props,part);
            break;
        case 'let':
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
            let v=execByScope(node,info.condition,null,outerChildNodes,outerElement,props,part);
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
function parseComment(node,outerChildNodes,outerElement,props,part){
    let info=getCommentStringInfo(getCommentText(node));
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