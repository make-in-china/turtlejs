
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Equal,tryRun,function(this:Order.Equal){
        let data=this.data;
        Order.test(data.placeholder, data.condition);
    });

    extendsOrderFunction(Order.Equal,replaceToScriptNode,function(this:Order.Equal){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        return `
        Order.Equal.run({
            condition:'${data.condition}',
            placeholder:this
        });`;
    });
}