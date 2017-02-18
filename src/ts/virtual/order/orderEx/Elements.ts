
/// <reference path='VOrder.ts'/>
/// <reference path='../Elements.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Elements,tryRun,function(this:Order.Elements){
        throw new Error("不能预编译项");
    });
    extendsOrderFunction(Order.Elements,replaceToScriptNode,function(this:Order.Elements){
        //生成中间数据  的  生成代码
        return `
            Order.Elements.run({
                placeholder:this
            });`;
    });
}
            