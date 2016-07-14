
let 
    withthis                = 'with(this){return eval($$turtle$$)};'/*eval支持返回最后一个表达式的值*/,
    _execValueByScope       = Function('$$turtle$$,v,node,outer,outerElement,props,part',withthis),
    _execByScope            = Function('$$turtle$$,node,outer,outerElement,props,part',withthis),
    _execExpressionsByScope = Function('$$turtle$$,v,node',withthis);
