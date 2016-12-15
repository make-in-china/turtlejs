

/// <reference path='../javascript/JavaScriptExpressions.ts'/>
/// <reference path='VOrder.ts'/>
namespace Order {
    interface IBindFunction{
        __me__:IBindFunction
    }

    export interface IOrderDataBind  extends IOrderData{
        propertyName:JS.JavaScriptExpressions|string
        exps:JS.JavaScriptExpressions
    }

    @register
    export class Bind extends VOrder {
        static orderName = "-"
        data:IOrderDataBind
        constructor(node:VComment,condition:string){
            super(node,condition);
            let data=this.data;
            
            let block=JS.Parser.parseStructor(condition);
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
        
        static run(data:IOrderDataBind){
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

            
        }
    }
}

