/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../JavaScript.ts'/>
namespace Order {
    
    export function registerVar(scope:Scope,condition:string){
        
        let statement=JavaScript.parse(condition);
        let chds=statement.children;
        if(chds.length!==1){
            throw new Error("scope只识别一句var语句");
        }
        if(chds[0].type!=='var'){
            throw new Error("scope不支持"+chds[0].type);
        }
        chds=chds[0].children;
        let step=0;
        let varName:string="";
        for(const statement of chds){
            console.log(statement.type);
            switch(step){
                case 0:
                    //声明变量
                    varName=statement.type;
                    step++;
                    break;
                case 1:
                    if(statement.type===','){
                        scope[varName]=undefined;
                        step=0;
                    }else if(statement.type==='='){
                        step++;
                    }else{
                        throw new Error('keyword后只能出现"="或","');
                    }
                    break;
                case 2:
                    console.log(statement.childrenToString());
                    step++
                    break;
                case 3:
                    if(statement.type!==','){
                        throw new Error('value后只能出现","');
                    }
            }
        }
        // let conditionArr=splitByOnce(condition,"=");
        // //创建变量
        // if(conditionArr.length==2){
        //     // //初始化
        //     // let obj=exec(this.node,'({' + conditionArr[1] + '})');
        //     // //扩展scope;
        //     // for(var name in obj){
        //     //     if(scope.hasOwnProperty(name)){
        //     //         throw new Error(`不能重复定义变量：${name}到变量域上`);
        //     //     }
        //     //     scope[name]=obj[name];
        //     // }
        // }
    }
    class ScopeOrder extends VOrder {
        static orderName = "scope";
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
