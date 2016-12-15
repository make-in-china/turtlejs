

/// <reference path='../javascript/JavaScriptExpressions.ts'/>
/// <reference path='VOrder.ts'/>
namespace Order {
    interface IBindExpressionsFunction{
        __me__:IBindExpressionsFunction
    }
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
        function:Function
        propertyName:JS.JavaScriptExpressions|string
        exps:JS.JavaScriptExpressions|null
    }

    @register
    export class BindExpressions extends VOrder {
        static orderName = "-"
        data:IOrderDataBindExpressions
        constructor(node:VComment,condition:string){
            super(node,condition);
            let data=this.data;

            let block=JS.Parser.parseStructor(condition);
            //只支持一个语句
            if(block.children.length!==1){
                throw new Error('语句超出范围：'+condition);
            }

            //  xx1   、  xx1.xx2   或    xx1['xx2']  

            //取后面的访问
            let statement=block.children[0];
            let statements= statement.splitKeyWord(':');

            if(statements.length!==2){
                throw new Error('语句应该是如下格式：\n表达式:函数');
            }


            statement=statements[0];

            JS.deleteStatementSpace(statement,true);//删除空格回车换行
            // if(statement.children.length<2){
            //     throw new Error(`"${statement}"无法识别为xx1、xx1.xx或xx1['xx']`)
            // }
            
            if(statement.children.length===1){
                let keyWord=statement.children[0];
                if(isString(keyWord)&&JS.isVarName(keyWord)){
                    data.propertyName=keyWord;
                }
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
            let obj=exec(data.placeholder,data.exps.toString());
            if(!obj){
                throw new Error('获取对象失败：'+data.exps);
            }
            let propertyName:string;
            if(isString(data.propertyName)){
                propertyName=data.propertyName;
            }else{
                propertyName=exec(data.placeholder,data.propertyName.toString());
            }
            let exp:IBindExpressionsFunction = <any>function (v:string) {
                // try {_execExpressionsByScope.call(scope, cdtn[1], v, node);
                return exec(textNode,)
                // } catch (e) { _catch(e) }
            }
            exp.__me__ = exp;
            bindProperty(obj, data.var, exp, '__me__');
            let textNode=$$$('',ENodeType.Text);
            replaceNodeByNode(data.placeholder, textNode);
            bindElementProperty(exp, '__me__', textNode, 'data');
            textNode['data'] = <any>exp.__me__;
        }
    }
}

