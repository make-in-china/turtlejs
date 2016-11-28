
/// <reference path='../JavaScriptLogic.ts'/>

namespace JS{
    export class Var extends JavaScriptLogic{
        static logicName='var'
        varInfos:[string,string|undefined,boolean][]
        static new(statement:JavaScriptStatement):Var|null{
            
            let keyWords=statement.children;
            if(keyWords.length===0){
                return null;
            }
            let varInfos:[string,any,boolean][]=[];
            if(keyWords[0]!=='var'){
                return null;
            }
            let step=0;
            let varName:string="";
            for(let i=1;i< keyWords.length;i++){
                let keyWord=keyWords[i];
                if(keyWord===" "){
                    continue;
                }
                switch(step){
                    case 0:
                        if(isString(keyWord)){
                            //声明变量
                            varName=keyWord;
                            step++;
                        }else{
                            // throw new Error("此处不该出现："+keyWord);
                            return null;
                        }
                        break;
                    case 1:
                        if(keyWord===','){
                            varInfos.push([varName,undefined,false]);
                            step=0;
                        }else if(keyWord==='='){
                            step++;
                        }else{
                            // throw new Error('keyword后只能出现"="或","');
                            return null;
                        }
                        break;
                    case 2:
                        if(isString(keyWord)){
                            varInfos.push([varName,'('+keyWord+')',true]);
                        }else{
                            varInfos.push([varName,keyWord.toString(),true]);
                        }
                        step++
                        break;
                    case 3:
                        if(keyWord!==','){
                            // throw new Error('value后只能出现","');
                            return null;
                        }
                        step=0;
                        break;
                }
            }
            return new Var(varInfos);
        }
        protected constructor(varInfos:[string,string|undefined,boolean][]){
            super();
            this.varInfos=varInfos;
        }
        getVars():string[]{
            let vars:string[]=[];
            for(const info of this.varInfos){
                vars.push(info[0])
            }
            return vars;
        }
    }
    registerLogic(Var);
}