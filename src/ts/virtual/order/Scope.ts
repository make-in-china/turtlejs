
/// <reference path='Var.ts'/>
namespace Order {
    class ScopeOrder extends Var {
        static orderName = "scope";
        node:IComment;
        scopeName:string

        init(){
            let conditionArr=splitByOnce(this.condition,":");
            this.scopeName=conditionArr[0];
            if(conditionArr.length===2){
                this.statement=this.getStatement(conditionArr[1]);
                this.initvarInfos();
            }
        }
        run(){
            let scope=DOMScope.create(this.node,this.scopeName);
            if(this.statement){
                this.registerVar(scope);
            }
            removeNode(this.node);
        }
    }
    register(ScopeOrder);
}
