
/// <reference path='Var.ts'/>
 
namespace Order {
    export interface IOrderDataScope extends IOrderDataVar{
        scopeName:string
    }
    @register
    export class ScopeOrder extends Var {
        static orderName = "scope";
        data:IOrderDataScope
        initBlock(){
            let data=this.data;
            let conditionArr=splitByOnce(this.setup.params.toString(),":");
            data.scopeName=conditionArr[0];
            if(conditionArr.length===2){
                this.block=this.getBlock(conditionArr[1]);
            }
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
