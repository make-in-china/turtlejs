/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../JavaScript.ts'/>
namespace Order {
    
    export function registerVar(scope:Scope,condition:string){
        
        let conditionArr=splitByOnce(condition,"=");
        //创建变量
        if(conditionArr.length==2){
            let statements=JavaScript.parse(conditionArr[1]);
            // //初始化
            // let obj=exec(this.node,'({' + conditionArr[1] + '})');
            // //扩展scope;
            // for(var name in obj){
            //     if(scope.hasOwnProperty(name)){
            //         throw new Error(`不能重复定义变量：${name}到变量域上`);
            //     }
            //     scope[name]=obj[name];
            // }
        }
    }
    class ScopeOrder extends VOrder {
        static name = "scope";
        node:IComment;
        get canRunAtService():boolean{
            return true;
        }
        
        constructor(node:VComment , condition:string){
            super(node,condition);
            removeNode(this.node);
        }
        run(){
            
            let conditionArr=splitByOnce(this.condition,":");
            
            let scope=DOMScope.create(this.node,conditionArr[0]);
            if(conditionArr.length===2){
                registerVar(scope,conditionArr[1]);
            }
            
        }
    }
    register(ScopeOrder);
    // registerEnvVar("xx",0);
}
