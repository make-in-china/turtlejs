
/// <reference path='VOrder.ts'/>
let parseForOrderRE         =   /[a-zA-Z\d] in .*/;
class For extends VOrder {
    name = "for"
    isLogic = true
    condition:string
    get canPrebuild():boolean{
        
    }
    parse(info: ICommentOrderInfo, node: IComment,orderStack:VOrderData[]): VOrderData {
        
        return this.addOrderToNode(info, node,orderStack, () => {
            let d = new VForOrderData(this.name, node, info.condition, function () {
                let p=<INode>node.parentNode;
                let ret=d.check();
                if(d.isBreak||!ret.result){
                    //全部删除
                    removeBlockBetween(node,<INode>d.endNode);
                    p.removeChild(node);
                    p.removeChild(<INode>d.endNode);
                }else{
                    let nodes=cloneBetween(node,<INode>d.endNode);
                    p.insertBefore2(createBreakElement(nodes,d),node);
                }
            });
            if(parseForOrderRE.test(info.condition)){
                d.check=(function(){
                    let s=info.condition.split(' in '),
                        index=0,
                        names=[],
                        source;
                    return function(){
                        if(!source){
                            source=VOrderHelper.exec(node,s[1]);
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
                            VOrderHelper.exec(node,s[0]+'=\''+names[index]+'\';');
                            index++;
                            return {result:true,params:null}
                        }else{
                            return {result:false,params:null}
                        }
                    }
                }());
            }else if(parseForOrderRE2.test(info.condition)){
                d.check=(function(){
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
                            VOrderHelper.exec(node,s[0]);
                        }else{
                            VOrderHelper.exec(node,s[2]);
                        }
                        return {result:VOrderHelper.exec(node,s[1]),params:null};
                    }
                }());
            }else{
                d.check=function(){
                    return {result:false,params:null};
                }
            }
            return d;
        });
    }
}

