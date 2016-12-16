

/// <reference path='../javascript/JavaScriptExpressions.ts'/>
/// <reference path='../javascript/logic/Function.ts'/>
/// <reference path='VOrder.ts'/>
namespace Order {
    interface IBindExpressionsFunction{
        __me__:IBindExpressionsFunction
    }
    export interface IOrderDataBindExpressions  extends IOrderData{
        function:{
            params:string[],
            content:string
        }|null
    object:[string,string]
    }

    @register
    export class BindExpressions extends VOrder {
        static orderName = "-"
        data:IOrderDataBindExpressions
        constructor(node:VMDOM.VComment,condition:string){
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

            if(statements.length>2){
                throw new Error('语句应该是如下格式：\n(表达式):(回调函数)');
            }


            statement=statements[0];

            JS.deleteStatementSpace(statement,false);//删除空格回车换行

            
            if(statement.children.length===1){
                let keyWord=statement.children[0];
                if(isString(keyWord)&&JS.isVarName(keyWord)){
                    data.object=['',keyWord];
                }
            }else{
                let chds=statement.children;
                let keyWord=chds.pop();
                data.object=<any>[JS.getStatementExps(statement).toString()];
                if(keyWord instanceof JS.JavaScriptBlock){
                    if(keyWord.begin==='['){
                        let propertyName=JS.getExps(keyWord);
                        let chds=propertyName.children;
                        chds.shift();
                        chds.pop();
                        data.object.push(propertyName.toString());
                    }else{
                        throw new Error(`"${keyWord}"不是一个合法的变量名`);
                    }
                }else if(isString(keyWord)){
                    if(JS.isVarName(keyWord)){
                        data.object.push(keyWord);
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
                
            }
            if(statements.length===1){
                data.function=null;
                return ;
            }
            statement=statements[1];
            JS.mergeStatementSpace(statement,false);//删除空格回车换行
            let fn=JS.Function.new(statement);
            if(fn){
                if(fn.params.length!==1){
                    throw new Error('函数参数数量不正确！');
                }
                let content:string;
                if(isString(fn.content)){
                    content=fn.content;
                }else{
                    content='function(){'+fn.content.innerText+'}()';
                }
                data.function={
                    content:content,
                    params:fn.params
                };
            }else{
                data.function=null;
            }
        }
        
        /** 计算*/
        
        static run(data:IOrderDataBindExpressions){
            let propertyName:string;
            let textNode=$$$('',ENodeType.Text);
            let obj:any;
            let objectExps=data.object[0];
            let objectName=data.object[1];
            if(objectExps!==''){
                //对象+属性
                obj=exec(data.placeholder,objectExps);
                if(!obj){
                    throw new Error('获取对象失败：'+objectExps);
                }
                if(isString(objectName)){
                    propertyName=objectName;
                }else{
                    propertyName=exec(data.placeholder,objectName);
                }
                
            }else{
                //scope+属性
                obj=DOMScope.get(data.placeholder);
                propertyName=<string>objectName;
            }
            
            if(data.function){
                let fn:Function=makeExpressFunction(data.function.content,data.function.params);
                let exp:IBindExpressionsFunction = <any>function (v:any) {
                    return  fn(data.placeholder,[v]);
                }
                exp.__me__ = exp;
                bindProperty(obj, propertyName, exp, '__me__');
                bindElementProperty(exp, '__me__', textNode, 'data');
                textNode['data'] = <any>exp.__me__;
            }else{

                bindElementProperty(obj, propertyName, textNode, 'data');
                textNode['data'] = <any>obj[propertyName];
            }
            replaceNodeByNode(data.placeholder, textNode);
        }
    }
    export function makeExpressFunction(this:void,content:string,params:string[]){
        let scopeFun=Order.newScopeFunction(params);
        return function(node:INode,args:any[]):any{
            let scope=DOMScope.get(node);
            args.push(content);
            args.push(node);
            return scopeFun.apply(scope,args);
        };
    }
}

