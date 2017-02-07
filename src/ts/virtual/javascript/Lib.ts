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
    let isVarNameRegExp=/^[$_a-zA-Z][$_a-zA-Z\d]*$/;
    export function isVarName(keyWord:string):boolean{
        return isVarNameRegExp.test(keyWord);
    }
    let isNumberRegExp=/^(\d+)|(\de3)|([1-9]\d+e\d+)$/;
    export function toConst(value:string):null|number|string|boolean{
        switch(value){
            case "NaN":
                return NaN;
            case "null":
                return null;
            case 'false':
                return false;
            case 'true':
                return true;
            // case "undefined":
            // maybe be hook，so don't return
            //     return undefined;
        }
        if(isNumberRegExp.test(value)){
            return <number>eval.call(null,value);
        }
        return value;
    }
    export function getLogic(statement:JavaScriptStatement,name:'for'|'function'|'var'):JavaScriptLogic|null{
        let Logic=logics[name];
        return Logic.new(statement);
    }
    
    /**从代码块读取js逻辑 */
    export function findLogic(statement:JavaScriptStatement,firstTryNames:('for'|'function'|'var')[]):JavaScriptLogic|null{
        if(firstTryNames){
            for(const name of firstTryNames){
                if(name in logics){
                    let Logic=logics[name];
                    let logic=Logic.new(statement);
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
    /**合并连续空格
     * @param {JavaScriptBlock} block 语句块
     * @param {boolean=false} deep 递归
     */
    export function mergeSpace(block:JavaScriptBlock,deep:boolean=false):void{
        for(const statement of block.children){
            mergeStatementSpace(statement,deep);
        }
    }
    /**合并连续空格
     * @param {JavaScriptStatement} statement 语句
     * @param {boolean=false} deep 递归
     */
    export function mergeStatementSpace(statement:JavaScriptStatement,deep:boolean=false):void{
        let hasSpace:boolean=false;
        let chds=statement.children;
        for(let i=0;i<chds.length;i++){
            let keyWord=chds[i];
            if(keyWord instanceof JavaScriptBlock){
                if(deep){
                    mergeSpace(keyWord,true);
                }
                hasSpace=true;
            }else{
                switch(keyWord){
                    case " ":
                    case "\r":
                    case "\n":
                    case "\t":
                        if(hasSpace){
                            //删掉一个；
                            chds.splice(i,1);
                            i--;
                        }else{
                            //换成空格
                            chds[i]=' ';
                            hasSpace=true;
                        }
                        break;
                    default:
                        hasSpace=false;
                }
            }
        }
    }
    /**删除所有空格
     * @param {JavaScriptBlock} block 语句块
     * @param {boolean=false} deep 递归
     */
    export function deleteSpace(block:JavaScriptBlock,deep:boolean=false):void{
        for(const statement of block.children){
            deleteStatementSpace(statement,deep);
        }
    }
    /**删除所有空格
     * @param {JavaScriptStatement} statement 语句
     * @param {boolean=false} deep 递归
     */
    export function deleteStatementSpace(statement:JavaScriptStatement,deep:boolean=false):void{
        let chds=statement.children;
        for(let i=0;i<chds.length;i++){
            let keyWord=chds[i];
            if(keyWord instanceof JavaScriptBlock){
                if(deep){
                    deleteSpace(keyWord,true);
                }
            }else{
                if(isString(keyWord)&&isSpace(keyWord)){
                    chds.shift();
                    i--;
                }
            }
        }
    }
    export function isSpace(keyWord:string):boolean{
        switch(keyWord){
            case " ":
                return true
            case "\r":
                return true
            case "\n":
                return true
            case "\t":
                return true
        }
        return false
    }


}
