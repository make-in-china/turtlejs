
/// <reference path="../scope/execute.ts"/>
/// <reference path="../main/bind.ts"/>

interface IHTMLBreakElement extends IComment{
    source?:{run}
}
class xxxxOrder{
    
    /**从注释中读取命令 */
    getCommentStringInfo(s:string):ICommentOrderInfo|null{
        let order=s.match(orderRE);
        if(order){
            return {order:trim(order[0]),condition:s.substring(order[0].length,s.length)}    
        }else{
            let subOrder=s.match(orderCaseRE);
            if(subOrder){
                return {subOrder:trim(subOrder[0]),condition:s.substring(subOrder[0].length,s.length)}  
            }
        } 
        return null;
    }
    SetParseError=(function(){
        let SetParseError:{
            isError?:boolean;
            (msg:string):eTreeEach;
        }=<any>function (msg:string){
            SetParseError.isError=true;
            alert(msg);
            return eTreeEach.c_stopEach;
        };
        SetParseError.isError=false;
        return SetParseError;
    }());
    // parseScopeOrder(info:ICommentOrderInfo,node:IComment,outerChildNodes:INode[],outerChildren:INodeList,props,part){
    //     let condition=splitByOnce(info.condition,"|");
    //     if(condition.length==2){
    //         DOMScope.create(node,condition[0]);
    //         execScope(condition[1],node,outerChildNodes,outerChildren,props,part);
    //     }else{
    //         DOMScope.create(node,condition[0]);
    //     }
    //     removeNode(node);
    // }
    parseCommentOrderNoScript(info:ICommentOrderInfo,node:IComment,outerChildNodes,outerChildren,props,part){
        /*不渲染，纯找结构*/
        switch(info.order){
            case 'while':
                return this.parseWhileOrder(info,node,outerChildNodes,outerChildren,props,part);
            case 'if':
                return this.parseIfOrder(info,node,outerChildNodes,outerChildren,props,part);
            case 'for':
                return this.parseForOrder(info,node,outerChildNodes,outerChildren,props,part);
            case 'switch':
                return this.parseSwitchOrder(info,node,outerChildNodes,outerChildren,props,part);
            case 'async':
                return this.parseAsyncOrder(info,node,outerChildNodes,outerChildren,props,part);
        }
    }
    parseCommentOrderBlock(node:INode,outerChildNodes,outerChildren,props,part){
        let i=getNodeIndex2(node);
        let isError=false;
        let error=function(msg){
            isError=true;
            alert(msg);
            return eTreeEach.c_stopEach;
        }

        return treeEach(<INode[]><any>(<INode>node.parentNode).childNodes,'childNodes',function(node,state){
            if(!isCommentNode(node)){
                return;
            }
            let info=this.getCommentStringInfo(getCommentText(node));
            if(!info){
                return;
            }
            if(info.order){
                let ret=this.parseCommentOrderNoScript(info,node,outerChildNodes,outerChildren,props,part);
                if(ret){
                    state.nextStepLength=ret.index-getNodeIndex2(node)+1;
                }
                return eTreeEach.c_noRepeat&eTreeEach.c_noIn;
            }
            if(info.subOrder==='end'){
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

    addOrderToNode(node:INode,info,outerChildNodes,outerChildren,props,part,fnGetOrder:()=>IOrder){
        let order;
        if(!node.__order__){
            order=fnGetOrder();
            node.__order__=order;
            order.name=info.order;
            order.node=node;
            order.endNode=null;
            order.condition=info.condition;
            orderStack.push(order);
            order.parseBlockResult=this.parseCommentOrderBlock(node,outerChildNodes,outerChildren,props,part);
        }else{
            order=node.__order__;
        }
        return order.parseBlockResult;
    }
    parseIfOrder(info,node,outerChildNodes,outerChildren,props,part){
        return this.addOrderToNode(node,info,outerChildNodes,outerChildren,props,part,function(){
            let scope=DOMScope.get(node);
            return {
                endHit:null,
                hit:null,
                hasElse:false,
                run:function(){
                    let order=this;
                    order.hit=parseBool(execByScope(node,this.condition,scope,outerChildNodes,outerChildren,props,part))?this.node:null;
                    treeEach(node.parentNode.childNodes,'childNodes',function(node:INode,step){
                        if(!isCommentNode(node)){
                            return;
                        }
                        let info=this.getCommentStringInfo(getCommentText(node));
                        if(!info)return;
                        if(node.__order__&&node.__order__.node){
                            step.next=getNodeIndex2(node.__order__.node)-getNodeIndex2(node);
                            return;
                        }
                        switch(info.subOrder){
                            case 'else':
                            case 'else if':
                                if(!order.hasElse){
                                    if(info.subOrder=='else'){
                                        order.hasElse=true;
                                    }
                                    if(!order.endHit){
                                        if(order.hit){
                                            order.endHit=node;
                                        }else{
                                            if(info.subOrder=='else'||parseBool(execByScope(node,this.condition,scope,outerChildNodes,outerChildren,props,part))){
                                                order.hit=node;
                                            }else{
                                                /*删除else if*/
                                                removeNode(node);
                                            }
                                        }
                                    }
                                }else{
                                    return this.SetParseError('语法错误：else或else if不能出现在else后');
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
                        if(ns)insertNodesBefore(this.node,ns);
                        
                        /*全部删除*/
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }
                }
            }
        });
    }
    parseBreakOrder(info,node,outerChildNodes,outerChildren,props,part){
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
    parseWhileOrder(info,node,outerChildNodes,outerChildren,props,part){
            
        return this.addOrderToNode(node,info,outerChildNodes,outerChildren,props,part,function(){
            return {
                run:function(){
                    let p=this.node.parentNode;
                    if(this.isBreak||!parseBool(execByScope(this.node,this.condition,null,outerChildNodes,outerChildren,props,part))){
                        //全部删除
                        removeBlockBetween(this.node,this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }else{
                        let nodes=cloneBetween(this.node,this.endNode);
                        this.node.parentNode.insertBefore2(this.createBreakElement(nodes,this),this.node);
                    }
                },
                onBreak:function(){
                    this.isBreak=true;
                },
                isBreak:false
            }
        });
    }
    parseAsyncOrder(info,node,outerChildNodes,outerChildren,props,part){
        return this.addOrderToNode(node,info,outerChildNodes,outerChildren,props,part,function(){
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
                        if(ns)appendNodes(ns,elem);
                        let chds=elem.childNodes;
                        initHTML(chds,outerChildNodes,outerChildren,props,part);
                        takeOutChildNodes(elem);
                        // elem=null;
                        replaceCls();
                    },delay);
                }
            }
        });
    }
    parseSwitchOrder(info,node,outerChildNodes,outerChildren,props,part){
        return this.addOrderToNode(node,info,outerChildNodes,outerChildren,props,part,function(){
            return {
                value:execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part),
                hit:null,
                needBreak:false,
                endHit:null,
                hasDefault:false,
                run:function(){
                    let order=this;
                    let scope=DOMScope.get(node);
                    treeEach(node.parentNode.childNodes,'childNodes',function(node:IComment,step){
                        if(!isCommentNode(node)){
                            return;
                        }
                        let info=this.getCommentStringInfo(getCommentText(node));
                        if(!info){
                            return;
                        }
                        if(node.__order__&&node.__order__.endNode){
                            step.next=getNodeIndex2(node.__order__.endNode)-getNodeIndex2(node);
                            return;
                        }
                        switch(info.subOrder){
                            case 'case':
                            case 'case break':
                                if(order.hasDefault){
                                    return this.SetParseError('语法错误：default后不应出现case/case break');
                                }else if(!order.hit){
                                    let isPass=order.value==execByScope(node,info.condition,scope,outerChildNodes,outerChildren,props,part);
                                    if(isPass){
                                        order.hit=node;
                                        node.__order__=info.subOrder;
                                    }
                                }else if(!order.endHit){
                                    order.endHit=node;
                                }
                                break;
                            case 'default':
                                if(order.hasDefault){
                                    return this.SetParseError('语法错误：多余的default');
                                }else{
                                    order.hasDefault=true;
                                    if(!order.hit){
                                        order.hit=node;
                                        node.__order__=info.subOrder;
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
                        if(ns)insertNodesBefore(this.node,ns);
                        
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
    parseForOrder(info,node,outerChildNodes,outerChildren,props,part){
        
        return this.addOrderToNode(node,info,outerChildNodes,outerChildren,props,part,function(){
            let check;
            if(parseForOrderRE.test(info.condition)){
                check=(function(){
                    let s=info.condition.split(' in '),
                        index=0,
                        names=[],
                        source;
                    return function(){
                        if(!source){
                            source=execByScope(node,s[1],null,outerChildNodes,outerChildren,props,part)
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
                            execByScope(node,s[0]+'=\''+names[index]+'\';',null,outerChildNodes,outerChildren,props,part)
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
                            execByScope(node,s[0],null,outerChildNodes,outerChildren,props,part);
                        }else{
                            execByScope(node,s[2],null,outerChildNodes,outerChildren,props,part);
                        }
                        return {result:execByScope(node,s[1],null,outerChildNodes,outerChildren,props,part),params:null};
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
                        this.node.parentNode.insertBefore2(this.createBreakElement(nodes,this),this.node);
                    }
                },
                onBreak:function(){
                    this.isBreak=true;
                },
                isBreak:false
            }
        });
    }
    createBreakElement(nodes,order:{run}){
        let breakElement:IHTMLBreakElement=$node('__break__');
        for(let i=0;i<nodes.length;i++){
            breakElement.appendChild(nodes[i]);
        }
        breakElement.source=order;
        return breakElement;
    }
    parseCommentOrder(info:ICommentOrderInfo,node:IComment,outerChildNodes,outerChildren,props,part){
        switch(info.order){
            // case 'scope':
            //     this.parseScopeOrder(info,node,outerChildNodes,outerChildren,props,part);
            //     break;
            // case 'let':
            //     execScope(info.condition,node,outerChildNodes,outerChildren,props,part);
            //     removeNode(node);
            //     break;
            // case 'bind':
            //     bindPropertyByOrder(node,info.condition);
            //     break;
            // case '-':
            //     bindExpressionsByOrder(node,info.condition);
            //     break;
            // case '!':
            //     execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
            //     removeNode(node);
            //     break;
            // case '=':
            //     let v=execByScope(node,info.condition,null,outerChildNodes,outerChildren,props,part);
            //     if(isObject(v)&&v.nodeType){
            //         replaceNodeByNode(node,v);
            //     }else{
            //         replaceNodeByNode(node,$node(v,3));
            //     }
                
            //     break;
            // case 'content':
            //     replaceNodeByNodes(node,outerChildNodes);
            //     break;
            // case 'elements':
            //     replaceNodeByNodes(node,outerChildren);
            //     break;
            // case 'while':
            //     return this.parseWhileOrder(info,node,outerChildNodes,outerChildren,props,part);
            // case 'if':
            //     return this.parseIfOrder(info,node,outerChildNodes,outerChildren,props,part);
            // case 'break':
            //     return this.parseBreakOrder(info,node,outerChildNodes,outerChildren,props,part);
            // case 'for':
            //     return this.parseForOrder(info,node,outerChildNodes,outerChildren,props,part);
            // case 'switch':
            //     return this.parseSwitchOrder(info,node,outerChildNodes,outerChildren,props,part);
            // case 'async':
            //     return this.parseAsyncOrder(info,node,outerChildNodes,outerChildren,props,part);
        }
    }
    parseComment(node:IComment,outerChildNodes:INode[],outerChildren:IHTMLCollection,props:{},part){
        let info=this.getCommentStringInfo(getCommentText(node));
        if(!info)return;
        if(!info.order){
            throw new Error("语法错误：不恰当的"+info.subOrder);
        }
        this.parseCommentOrder(info,node,outerChildNodes,outerChildren,props,part);
        if(node.__order__){
            if(node.__order__.endNode){
                node.__order__.run();
                
            }
        }
    }
}