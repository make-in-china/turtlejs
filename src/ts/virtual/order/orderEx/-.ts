
/// <reference path='VOrder.ts'/>
/// <reference path='../-.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.BindExpressions,tryRun,function(this:Order.BindExpressions){
        
        //绑定有可能的变故有：
        //获取变量出错
        //不应该绑定即时数据
        //所以不能new
        //不能调用函数
        //不能
    });
}