/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../javascript/Parser.ts'/>
/// <reference path='../javascript/logic/Var.ts'/>
namespace Order {
    export function tryRunVarInfos(this:void,node:IComment,varInfos:[string,string|undefined,boolean][]){
        for(const varInfo of varInfos){
            if(varInfo[2]){
                testSet(node,varInfo[0],test(node,<string>varInfo[1]));
            }else{
                testSetValue(node,varInfo[0],varInfo[1]);
            }
        }
    }
    export function runVarInfos(this:void,scope:Scope,node:IComment,varInfos:[string,string|undefined,boolean][]){
        for(const varInfo of varInfos){
            if(varInfo[2]){
                scope[varInfo[0]]=exec(node,<any>varInfo[1]);
            }else{
                scope[varInfo[0]]=varInfo[1];
            }
        }
    }
    export class Var extends VOrder {
        static orderName = "var";
        node:IComment;
        block:JS.JavaScriptBlock
        protected varInfos:[string,string|undefined,boolean][]
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.initStatement();
            this.initvarInfos();
        }
        initStatement(){
            this.block=this.getBlock('var '+this.condition);
        }
        tryRun(){
            tryRunVarInfos(this.node,this.varInfos);
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
        run(){
            runVarInfos(DOMScope.get(this.node),this.node,this.varInfos);
            removeNode(this.node);
        }
    }
    register(Var);
}
