
/// <reference path='Var.ts'/>
namespace Order {
    class ScopeOrder extends Var {
        static orderName = "scope";
        node:IComment;
        scopeName:string

        initBlock(){
            let conditionArr=splitByOnce(this.condition,":");
            this.scopeName=conditionArr[0];
            if(conditionArr.length===2){
                this.block=this.getBlock(conditionArr[1]);
            }
        }
        run(){
            let scope=DOMScope.create(this.node,this.scopeName);
            if(this.block){
                this.registerVar(scope);
            }
            removeNode(this.node);
        }
    }
    register(ScopeOrder);
}
