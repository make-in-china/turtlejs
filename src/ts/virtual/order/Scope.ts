/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>

namespace Order {
    function getScopeBy(scope:Scope|null, node: VComment) {
        if (!scope)
            return DOMScope.get(node);
        else
            return scope;
    }
    function execByScope(node: VComment, s: string, scope:Scope|null) {
        // return exec(node, s,getScopeBy(scope, node));
        return exec(node, s);
    }
    function execScope(s: string, node: VComment) {
        execByScope(node, '$t.extend(this,{' + s + '});', null);
    }
    class Scope extends VOrder {
        static name = "scope";
        static isLogic = false;
        get canRunAtService():boolean{
            return true;
        }
        constructor(node:VComment , condition:string){
            super(node,condition);
            let conditionArr=splitByOnce(condition,"|");
            if(conditionArr.length==2){
                DOMScope.create(node,conditionArr[0]);
                execScope(conditionArr[1],node);
            }else{
                DOMScope.create(node,conditionArr[0]);
            }
            removeNode(node);
        }
    }
    register(Scope);
    registerEnvVar("xx",0);
}
