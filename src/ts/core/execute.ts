
let 
    withthis                = 'with(this){return eval($$turtle$$)};'/*eval支持返回最后一个表达式的值*/,
    _execValueByScope       = Function('$$turtle$$,v,node,outer,outerElement,props,part',withthis),
    _execByScope            = Function('$$turtle$$,node,outer,outerElement,props,part',withthis),
    _execExpressionsByScope = Function('$$turtle$$,v,node',withthis);
function execValueByScope(node:INode,s:string,v,scope:Scope,outerChildNodes:INodeArray,outerElement:IHTMLElement[],props,part){
    return _execValueByScope.call(getScopeBy(scope,node),s,v,node,outerChildNodes,outerElement,props,part);
}
let execTemplateScript=(function(){
    let replaceRE=/{%.+?%}/g;
    return function(s:string,node:INode,outerChildNodes:INodeArray,outerElement,props,part){
        s=s.replace(replaceRE,function(s){
            return execByScope(node,s.substring(2,s.length-2),null,outerChildNodes,outerElement,props,part);
        })
        return s;
    }
}())
