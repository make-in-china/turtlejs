
/// <reference path='../JavaScriptLogic.ts'/>
/// <reference path='Var.ts'/>

namespace JS{
    export const enum EForMode{
        In=0,
        Step=1
    }
    export interface IInfoForIn{
        mode:EForMode
        hasVar:boolean
        varName:string
        bindingExp:JavaScriptStatement
    }
    export interface IInfoForStep{
        mode:EForMode
        variable:Var|null
        first:JavaScriptStatement
        exec:JavaScriptStatement
        step:JavaScriptStatement
    }
    
    export class For extends JavaScriptLogic{
        static logicName='for'
        static new(statement:JavaScriptStatement):For|null{
            
            mergeStatementSpace(statement,true);
            let keyWords=statement.children;
            let count=3;
            if(keyWords.length<count){
                //至少3个空格
                return null;
            }
            if(keyWords[0]!=='for'){
                return null;
            }
            let index=1;
            if(keyWords[index]===' '){
                index++;
                count++;
            }
            let keyWord=keyWords[index];
            if(!(keyWord instanceof JS.JavaScriptBlock)){
                //应该是一个block;
                return null;
            }
            if(keyWord.begin!=='('){
                //应该是一个(...)
                return null;
            }
            let controlParamsBlock=keyWord;
            index++;
            
            if(keyWords[index]===' '){
                index++;
                count++;
            }

            keyWord=keyWords[index];
            
            if(!(keyWord instanceof JS.JavaScriptBlock)){
                //应该是一个block;
                return null;
            }
            
            if(keyWord.begin!=='{'){
                //应该是一个{...}
                return null;
            }
            //判断controlParamsBlock内容是否有效;
            let conditionsInfo=this.parseConditions(controlParamsBlock);
            if(conditionsInfo){
                return new this(conditionsInfo.mode,conditionsInfo);
            }
            return null;
            
        }
        static parseConditions(block:JavaScriptBlock):IInfoForStep|IInfoForIn|null{
            let paramStatements=block.children;
            if(paramStatements.length===3){
                //可能是step for
                return this.parseStep(paramStatements);
            }else if(paramStatements.length===1){
                //可能是 for in
                return this.parseForIn(paramStatements[0].children);
            }
            return null;
        }
        private static parseStep(statements:JavaScriptStatement[]):IInfoForStep|null{
            if(statements[0].children.length===0||
                statements[1].children.length===0||
                statements[2].children.length===0){
                return null;
            }
            let variable=Var.new(statements[0]);
            return {
                mode:EForMode.Step,
                variable:variable,
                first:statements[0],
                exec:statements[1],
                step:statements[2]
            }
        }
        private static parseForIn(keyWords:(string | JavaScriptBlock | JavaScriptComment | JavaScriptString)[]):IInfoForIn|null{
            let count=5;
            let index=1;
            let info:{count:number,index:number}|null;
            let hasVar;
            if(keyWords[0]==='var'){
                //var开头;
                hasVar=true;
                index++;
                if(keyWords[index]!==' '){
                    return null;
                }
                index++;
                count+=2;
            }else{
                hasVar=false;
            }
            let varName=keyWords[index];
            if(!isString(varName) ||!isVarName(varName)){
                //需求一个变量名
                return null;
            }
            index++;
            if(keyWords[index]!==' '){
                return null;
            }
            index++;
            let keyWord=keyWords[index];
            if(keyWord!=='in'){
                //需求一个in
                return null;
            }
            
            index++;
            if(keyWords[index]!==' '){
                return null;
            }
            index++;

            //后面可能是一串语句
            let bindingExp:JavaScriptStatement=new JavaScriptStatement();
            if(keyWords.length===count){
                //这是最后一个词了，所以
                let destVarName=keyWords[index];
                if(!isString(destVarName) ||!isVarName(destVarName)){
                    //需求一个变量名
                    return null;
                }
                bindingExp.push(destVarName);
            }else{
                //都扔进去吧
                push.apply(bindingExp.children,keyWords.slice(index));
            }
            
            return {
                mode:EForMode.In,
                hasVar:hasVar,
                varName:varName,
                bindingExp:bindingExp
            };
        }

        mode:EForMode
        info:IInfoForIn|IInfoForStep
        constructor(mode:EForMode,info:IInfoForIn|IInfoForStep){
            super();
            this.mode=mode;
            this.info=info;
        }
    }
    registerLogic(For);
}