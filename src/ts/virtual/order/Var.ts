/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../javascript/Parser.ts'/>
/// <reference path='../javascript/logic/Var.ts'/>
namespace Order {
    export interface IOrderDataVar extends IOrderData{
        varInfos:[string,string|undefined,boolean][]
        placeholder:VComment
    }
    @register
    export class Var extends VOrder {
        static orderName = "var";
        data:IOrderDataVar
        block:JS.JavaScriptBlock
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.initStatement();
            this.initvarInfos();
            this.data.placeholder=node;
        }
        initStatement(){
            let data=this.data;
            this.block=this.getBlock('var '+this.condition);
        }
        getBlock(condition:string):JS.JavaScriptBlock{
            return JS.Parser.parseStructor(condition);
        }
        initvarInfos(){
            let data=this.data;
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
                data.varInfos=logic.varInfos;
            }
            
        }
        run(){
            Var.run(this.data);
        }
        static run(data:IOrderDataVar){
            runVarInfos(DOMScope.get(data.placeholder),data.placeholder,data.varInfos);
            removeNode(data.placeholder);
        }
    }
    
    export function tryRunVarInfos(this:void,node:INode,varInfos:[string,string|undefined,boolean][]){
        for(const varInfo of varInfos){
            if(varInfo[2]){
                testSet(node,varInfo[0],test(node,<string>varInfo[1]));
            }else{
                testSetValue(node,varInfo[0],varInfo[1]);
            }
        }
    }
    export function runVarInfos(this:void,scope:Scope,node:VNode,varInfos:[string,string|undefined,boolean][]){
        for(const varInfo of varInfos){
            if(varInfo[2]){
                scope[varInfo[0]]=exec(node,<any>varInfo[1]);
            }else{
                scope[varInfo[0]]=varInfo[1];
            }
        }
    }
}
