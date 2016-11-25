/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../JavaScript.ts'/>
namespace Order {
    export class Var extends VOrder {
        static orderName = "var";
        node:IComment;
        statement:JavaScriptStatement
        private varInfos:[string,any,boolean][]=[]
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.init();
        }
        init(){
            this.statement=this.getStatement('var '+this.condition);
            this.initvarInfos();
        }
        
        tryRun(){

            for(const varInfo of this.varInfos){
                if(varInfo[2]){
                    testSet(this.node,varInfo[0],test(this.node,varInfo[1]));
                }
            }
        }
        getStatement(condition:string):JavaScriptStatement{
            let statement=JavaScript.parse(condition);
            let chds=statement.children;
            if(chds.length!==1){
                throw new Error("scope只识别一句var语句");
            }
            if(chds[0].type!=='var'){
                throw new Error("scope不支持"+chds[0].type);
            }
            return statement;
        }
        initvarInfos(){
            let statement=this.statement;
            let chds=statement.children;
            chds=chds[0].children;
            let step=0;
            let varName:string="";
            for(let i=0;i< chds.length;i++){
                 statement=chds[i];
                if(statement.type===" "){
                    continue;
                }
                switch(step){
                    case 0:
                        //声明变量
                        varName=statement.type;
                        step++;
                        break;
                    case 1:
                        if(statement.type===','){
                            this.varInfos.push([varName,undefined,false]);
                            // scope[varName]=undefined;
                            step=0;
                        }else if(statement.type==='='){
                            step++;
                        }else{
                            throw new Error('keyword后只能出现"="或","');
                        }
                        break;
                    case 2:
                        if(statement.isBlock){
                            i++;
                            this.varInfos.push([varName,statement.toString()+chds[i].toString(),true]);
                        }else{
                            this.varInfos.push([varName,'('+statement.toString()+')',true]);
                        }
                        step++
                        break;
                    case 3:
                        if(statement.type!==','){
                            throw new Error('value后只能出现","');
                        }
                        step=0;
                        break;
                }
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
