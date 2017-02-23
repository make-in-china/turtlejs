

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
        constructor(node:VMDOM.VComment,condition:string){
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

// function bindNode(node: INode, obj, name) {
//     var
//         elementValueName,
//         eventName;
//     switch (node.nodeName) {
//         case "SELECT":
//             elementValueName = "value";
//             eventName = "change";
//             break;
//         case "TEXTAREA":
//             elementValueName = "value";
//             eventName = "input";
//             break;
//         case "INPUT":
//             switch (node.type) {
//                 case "checkbox":
//                     elementValueName = "checked";
//                     eventName = "click";
//                     break;
//                 default:
//                     elementValueName = "value";
//                     eventName = "input";
//                     break;
//             }
//             break;
//         case "#text":
//             elementValueName = "data";
//             break;
//         case "BUTTON":
//         case "DIV":
//         default:
//             elementValueName = "innerHTML";
//             break;
//     }
//     if (!node.__bind__) {
//         node[elementValueName] = obj[name];
//     }
//     bindElementProperty(obj, name, node, elementValueName);
//     if (eventName) {
//         node.addEventListener(eventName, function () {
//             obj[name] = node[elementValueName];
//         });
//     }
// }
// function bindNodeByCondition(node: INode, condition: string) {
//     let
//         cdtn = splitByOnce(condition, "|"),
//         name = cdtn[0],
//         arrName: string[],
//         scope: Scope,
//         obj,
//         exp: IExp;

//     if (!name) {
//         return;
//     }
//     scope = DOMScope.get(node);
//     if (name.indexOf(".") != -1) {
//         arrName = name.split(".");
//         obj = _getBindObject(scope, arrName);
//         name = arrName[arrName.length - 1];
//     } else {
//         obj = _getBindObject(scope, [name]);
//     }
//     if (obj === null) {
//         throw new Error('不能获取绑定属性:' + cdtn[0]);
//     }
//     if (cdtn.length === 2) {
//         exp = <any>function (v) {
//             _execExpressionsByScope(cdtn[1], v, node);
//         }
//         exp.__me__ = exp;
//         bindProperty(obj, name, exp, "__me__");
//     } else {
//         bindNode(node, obj, name);
//     }
// }
// function bindNodeFunction(node: INode, bindVar, fn) {
//     var
//         name,
//         scope,
//         obj;
//     if (bindVar.indexOf(".") != -1) {
//         bindVar = bindVar.split(".");
//     } else {
//         bindVar = [bindVar];
//     }
//     name = bindVar[bindVar.length - 1];
//     scope = DOMScope.get(node);
//     obj = _getBindObject(scope, bindVar);
//     fn.__me__ = fn;
//     bindProperty(obj, name, fn, "__me__");
//     return { object: obj, name: name, targetObject: fn, targetName: "__me__" };
// }
// function bindEval(node: INode, s, outer, outerElement, props, part, fn) {
//     var
//         operator = s.match(operatorRE)[0],
//         bindVar = splitByOnce(s, operator),
//         sfn;
//     if (bindVar.length < 2) return;
//     switch (operator) {
//         case "|":
//             sfn = bindVar[1];
//             break;
//         case "=":
//             operator = "==";
//         default:
//             sfn = 'v' + operator + bindVar[1];
//             break;
//     }
//     return bindNodeFunction(node, bindVar[0], function (v) {
//         fn.call(this, execValueByScope(node, sfn, v, this, outer, outerElement, props, part));
//     });
// }
// function bindShowHide(node: IElement, s, isBindShow, outer, outerElement, props, part) {
//     bindEval(node, s, outer, outerElement, props, part, function (v) {
//         if (v) {
//             if (isBindShow) {
//                 removeClass(node, 'uhide');
//             } else {
//                 addClass(node, 'uhide');
//             }
//         } else {
//             if (isBindShow) {
//                 addClass(node, 'uhide');
//             } else {
//                 removeClass(node, 'uhide');
//             }
//         }
//     });
// }
