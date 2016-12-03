
/// <reference path='Var.ts'/>
namespace Order {
    interface IOrderDataScope extends IOrderDataVar{
        scopeName:string
    }
    @register
    class ScopeOrder extends Var {
        static orderName = "scope";
        data:IOrderDataScope
        initBlock(){
            let data=this.data;
            let conditionArr=splitByOnce(this.condition,":");
            data.scopeName=conditionArr[0];
            if(conditionArr.length===2){
                this.block=this.getBlock(conditionArr[1]);
            }
        }
        run(){
            ScopeOrder.run(this.data);
        }
        static run(data:IOrderDataScope){
            let scope=DOMScope.create(data.placeholder,data.scopeName);
            if(data.varInfos&&data.varInfos.length>0){
                runVarInfos(scope,data.placeholder,data.varInfos);
            }
            removeNode(data.placeholder);
        }
    }
}
