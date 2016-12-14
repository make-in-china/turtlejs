namespace JS{
    export class JavaScriptExpressions{
        children:(JavaScriptExpressions|string)[]=[]
        push(child:JavaScriptExpressions|string){
            this.children.push(child);
        }
        toString():string{
            return this.innerText;
        }
        get innerText():string{
            let ret="";
            for(const child of this.children){
                ret+=child;
            }
            return ret;
        }
    }
    /**获得分级代码数组
     * @param {JavaScriptBlock} block 语句块
     */
    export function getExps(block:JS.JavaScriptBlock):JavaScriptExpressions{
        let exps:JavaScriptExpressions=new JavaScriptExpressions;
        exps.push(block.begin);
        for(const statement of block.children){
            exps.push(getStatementExps(statement));
        }
        exps.push(block.end);
        return exps;
    }
    
    /**获得分级代码数组
     * @param {JavaScriptStatement} statement 语句
     */
    export function getStatementExps(statement:JS.JavaScriptStatement):JavaScriptExpressions{
        let keyWords=statement.children;
        let exps:JavaScriptExpressions=new JavaScriptExpressions;
        let exp:string='';
        let isPush:boolean=false;
        for(const keyWord of keyWords){
            if(isString(keyWord)){
                switch(JS.getKeyWordType(keyWord)){
                    case JS.EKeyWordType.Member_Access_Operator:
                        if(isPush===false&&exp!==''){
                            exps.push(exp);
                        }
                        isPush=true;
                        break;
                    case JS.EKeyWordType.Unary_Operator:
                    case JS.EKeyWordType.Operator:
                    case JS.EKeyWordType.UnKnown:
                        exp+=keyWord;
                        isPush=false;
                        break;
                    default:
                        throw new Error('不支持该运算符：'+keyWord);
                }
                
            }else if(keyWord instanceof JS.JavaScriptBlock){
                exps.push(getExps(keyWord));
            }
        }
        if(isPush===false&&exp!==''){
            exps.push(exp);
        }
        return exps;
    }
    export enum EKeyWordType{
        UnKnown,
        Unary_Operator,
        Operator,
        Assigning_Operator,
        Comparison_Operator,
        Compound_Assigning_Operator,
        Instruction_Operator,
        Ternary_Operator,
        Member_Access_Operator
    }
    /**获取keyWord类型*/
    export function getKeyWordType(keyWord:string):EKeyWordType{
        switch(keyWord){
            case '++':
            case '--':
            case '~':
            case '!':
                return EKeyWordType.Unary_Operator;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '&':
            case '|':
            case '&&':
            case '||':
            case '>>':
            case '<<':
            case ',':
                return EKeyWordType.Operator;
            case '+=':
            case '-=':
            case '*=':
            case '/=':
            case '%=':
            case '&=':
            case '|=':
                return EKeyWordType.Compound_Assigning_Operator;
            case '=':
                return EKeyWordType.Assigning_Operator;
            case '>=':
            case '>':
            case '<=':
            case '<':
            case '==':
            case '===':
            case '!=':
            case '!==':
            case 'instanceof':
            case 'in':
                return EKeyWordType.Comparison_Operator;
            case 'new':
            case 'delete':
            case 'typeof':
            case 'void':
                return EKeyWordType.Instruction_Operator;
            case '?':
            case ':':
                return EKeyWordType.Ternary_Operator;
            case '.':
                return EKeyWordType.Member_Access_Operator;
            default:
                return EKeyWordType.UnKnown;
        }
    }
}