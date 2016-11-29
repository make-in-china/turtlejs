
/// <reference path='../JavaScriptLogic.ts'/>
namespace JS{
    export class Function extends JavaScriptLogic{
        static logicName='function'
        static new(statement:JavaScriptStatement):Function|null{
            
            mergeStatementSpace(statement,true);
            let keyWords=statement.children;
            if(keyWords.length<2){
                return null;
            }
            let keyWord=keyWords[0];
            let params:string[]=[];
            let isLambda:boolean=false;
            let content:JavaScriptBlock|string;
            if(keyWord==='function'){
                let index=1;
                if(keyWords[index]===' '){
                    index++;
                }
                keyWord=keyWords[index];
                if(keyWord instanceof JavaScriptBlock&& keyWord.begin==='('){
                    if(!this.setParams(params,keyWord)){
                        return null
                    }
                    if(keyWords[index]===' '){
                        index++;
                    }
                    keyWord=keyWords[index];
                    if(keyWord instanceof JavaScriptBlock&& keyWord.begin==='{'){
                        content=keyWord;
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
            }else{
                let index=1;
                if(keyWord instanceof JavaScriptBlock&&keyWord.begin==='('){
                    if(keyWords[index]===' '){
                        index++;
                    }
                    if(keyWords[index]==='=>'){
                        //lambda
                        if(!this.setParams(params,keyWord)){
                            return null
                        }
                    }else{
                        return null;
                    }
                }else if(isString(keyWord)&&JS.isVarName(keyWord)){
                    if(keyWords[index]===' '){
                        index++;
                    }
                    if(keyWords[index]==='=>'){
                        //lambda
                        params.push(keyWord);
                    }else{
                        return null;
                    }
                }else{
                    return null;
                }
                isLambda=true;
                if(keyWords[index]===' '){
                    index++;
                }
                keyWord=keyWords[index];
                if(keyWord instanceof JavaScriptBlock&& keyWord.begin==='{'){
                    //执行块
                    content=keyWord;
                }else if(keyWord==="return"){
                    return null;
                }else{
                    //单句
                    if(isString(keyWord)){
                        content=keyWord;
                    }else{
                        return null;
                    }
                }
            }
            return new this(params,isLambda,content);
        }
        static setParams(params:string[],block:JavaScriptBlock):boolean{
            let statements=block.children;
            if(statements.length!==1){
                return false;
            }
            let statement=statements[0];
            let needVar:boolean=true;
            for(const keyWord of statement.children){
                if(!isString(keyWord)){
                    return false;
                }
                if(needVar){
                    if(isVarName(keyWord)){
                        params.push(keyWord);
                    }else{
                        return false;
                    }
                    needVar=false;
                }else{
                    needVar=true;
                }
            }
            return true;
        }
        protected constructor(
            public params:string[],
            public isLambda:boolean,
            public content:JavaScriptBlock|string
        ){
            super();
        }
    }
    registerLogic(Function);
}