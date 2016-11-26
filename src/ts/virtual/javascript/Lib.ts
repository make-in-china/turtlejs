namespace JS{
    export interface IJavaScriptLogic{
        logicName:string
        ['new'](statement:JavaScriptStatement):JavaScriptLogic|null;
    }
    let logics:{[index:string]:IJavaScriptLogic}={};
    let logicNames:string[]=[];
    export function registerLogic(logic:IJavaScriptLogic){
        let name=logic.logicName;
        if(name in logics){
            throw new Error("不能重复注册："+name);
        }
        logics[name]=logic;
        logicNames.push(name);
    }
    export function getLogic(statement:JavaScriptStatement,firstTryNames:string[]):JavaScriptLogic|null{

        if(firstTryNames){
            for(const name of firstTryNames){
                if(name in logics){
                    let Logic=logics[name];
                    let logic=Logic.new(statement)
                    if(logic){
                        return logic;
                    }
                }
            }
            for(const name of logicNames){
                if(name in logics){
                    let Logic=logics[name];
                    let logic=Logic.new(statement)
                    if(logic){
                        return logic;
                    }
                }
            }
        }else{
            for(const name of logicNames){
                if(name in logics){
                    let Logic=logics[name];
                    let logic=Logic.new(statement)
                    if(logic){
                        return logic;
                    }
                }
            }
        }
        return null;
    }
}