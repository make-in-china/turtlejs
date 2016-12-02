
/// <reference path='Var.ts'/>
namespace Order {
    interface IOrderDataScope extends IOrderDataVar{
        node:IComment;
        scopeName:string
    }
    @register
    class ScopeOrder extends Var {
        static orderName = "scope";
        data:IOrderDataScope
        initBlock(){
            let data=this.data;
            let conditionArr=splitByOnce(data.condition,":");
            data.scopeName=conditionArr[0];
            if(conditionArr.length===2){
                data.block=this.getBlock(conditionArr[1]);
            }
        }
        run(){
            ScopeOrder.run(this.data);
        }
        static run(data:IOrderDataScope){
            let scope=DOMScope.create(data.node,data.scopeName);
            if(data.block){
                runVarInfos(scope,data.node,data.varInfos);
            }
            removeNode(data.node);
        }
    }
}
