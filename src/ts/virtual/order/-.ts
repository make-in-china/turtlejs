

/// <reference path='../javascript/JavaScriptExpressions.ts'/>
/// <reference path='VOrder.ts'/>
namespace Order {
    
    // function bindExpressionsByOrder(node:INode, condition:string) {
    //     let cdtn = splitByOnce(condition, '|');
    //     if (cdtn.length < 2)
    //         cdtn.push('v');
    //     let
    //         name,
    //         scope:Scope,
    //         obj,
    //         bindVar = cdtn[0],
    //         arrBindVar: Array<string>,
    //         exp: IExp,
    //         textNode: IText = $node(' ', 3);

    //     if (bindVar.indexOf(".") != -1) {
    //         arrBindVar = bindVar.split(".");
    //     } else {
    //         arrBindVar = [bindVar];
    //     }
    //     name = bindVar[bindVar.length - 1];
    //     scope = DOMScope.get(node);
    //     obj = _getBindObject(scope, arrBindVar);
    //     if (obj === null) {
    //         throw new Error('不能获取绑定属性:' + cdtn[0]);
    //     }
    //     exp = <any>function (v:string) {
    //         // try {
    //         return _execExpressionsByScope.call(scope, cdtn[1], v, node);
    //         // } catch (e) { _catch(e) }
    //     }
    //     exp.__me__ = exp;
    //     bindProperty(obj, name, exp, '__me__');
    //     replaceNodeByNode(node, textNode);
    //     bindElementProperty(exp, '__me__', textNode, 'data');
    //     textNode['data'] = <any>exp.__me__;
    // }
    export interface IOrderDataBindExpressions  extends IOrderData{
        var:string
        propertyName:JS.JavaScriptExpressions|string
        exps:JS.JavaScriptExpressions
    }

    @register
    export class BindExpressions extends VOrder {
        static orderName = "-"
        data:IOrderDataBindExpressions
        constructor(node:VComment,condition:string){
            super(node,condition);
            let data=this.data;
            let cdtn = splitByOnce(condition, ':');
            if (cdtn.length < 2){
                cdtn.unshift('v');
            }
            data.var = cdtn[0];
            
            let block=JS.Parser.parseStructor(cdtn[1]);
            //只支持一个语句
            if(block.children.length!==1){
                throw new Error('必须为合法的语句！');
            }
            //并且语句的最后必须为xx1.xx2或xx1['xx2']，即需求一个父对象，一个子属性
            //xx1可以为一个表达式

            //取后面的访问
            let statement=block.children[0];
            JS.deleteStatementSpace(statement,true);//删除空格回车换行
            if(statement.children.length<2){
                throw new Error(`"${statement}"无法识别为xx.xx或xx['xx']`)
            }
            let chds=statement.children;
            let keyWord=chds.pop();
            if(keyWord instanceof JS.JavaScriptBlock){
                if(keyWord.begin==='['){
                    data.propertyName=JS.getExps(keyWord);;
                }else{
                    throw new Error(`"${keyWord}"不是一个合法的变量名`);
                }
            }else if(isString(keyWord)){
                if(JS.isVarName(keyWord)){
                    data.propertyName=keyWord;
                    //再去掉一个.
                    keyWord=last.call(chds);
                    if(keyWord==='.'){
                        chds.pop();
                    }
                }else{
                    throw new Error(`"${keyWord}"不是一个合法的变量名`);
                }
            }else{
                //什么鬼
                throw new Error('无非识别的keyWord:'+keyWord);
            }
            
            this.data.exps=JS.getStatementExps(statement);
        }
        
        /** 计算*/
        
        static run(data:IOrderDataBindExpressions){
            console.log(data);
            debugger;
        }
    }
}

