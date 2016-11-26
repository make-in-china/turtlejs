/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../javascript/Parser.ts'/>
/// <reference path='../javascript/logic/Var.ts'/>
namespace Order {
    export class Var extends VOrder {
        static orderName = "var";
        node:IComment;
        block:JS.JavaScriptBlock
        private varInfos:[string,any,boolean][]
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.initStatement();
            this.initvarInfos();
        }
        initStatement(){
            this.block=this.getBlock('var '+this.condition);
        }
        tryRun(){
            for(const varInfo of this.varInfos){
                if(varInfo[2]){
                    testSet(this.node,varInfo[0],test(this.node,varInfo[1]));
                }
            }
        }
        getBlock(condition:string):JS.JavaScriptBlock{
            return JS.Parser.parseStructor(condition);
        }
        initvarInfos(){
            let block=this.block;
            if(!block){
                return ;
            }
            
            let statements=block.children;
            if(statements.length>1){
                throw new Error("不支持多句！");
            }
            let logic:JS.Var=<JS.Var>JS.getLogic(statements[0],["var"]);
            if(logic){
                this.varInfos=logic.varInfos;
            }
            
        }
        registerVar(scope:Scope){
            for(const varInfo of this.varInfos){
                if(varInfo[2]){
                    scope[varInfo[0]]=exec(this.node,varInfo[1]);
                }else{
                    scope[varInfo[0]]=varInfo[1];
                }
            }
        }
        run(){
            this.registerVar(DOMScope.get(this.node));
            removeNode(this.node);
        }
    }
    register(Var);
}
