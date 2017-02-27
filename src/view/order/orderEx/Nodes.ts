
/// <reference path='VOrder.ts'/>
/// <reference path='../Nodes.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Nodes,tryRun,function(this:Order.Nodes){
        throw new Error("不能预编译项");
    });
    extendsOrderFunction(Order.Nodes,replaceToScriptNode,function(this:Order.Nodes){
        //生成中间数据  的  生成代码
        return `
            Order.Nodes.run({
                placeholder:this
            });`;
    });
}
            