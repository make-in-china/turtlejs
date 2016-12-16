
/// <reference path='VOrder.ts'/>
/// <reference path='../-.ts'/>
namespace OrderEx {
    
    extendsOrderFunction(Order.BindExpressions,tryRun,function(this:Order.BindExpressions){
        throw new Error('不能预编译');
    });

    extendsOrderFunction(Order.BindExpressions,replaceToScriptNode,function(this:Order.BindExpressions){
        
        let data=this.data;
        let fn:string;
        if(data.function){
            let params:string=data.function.params.join('`,`');
            if(params.length>0){
                params='`'+params+'`';
            }
            fn=`{
                params:[${params}],
                content:\`${data.function.content}\`
            }`
        }else{
            fn='null';
        }
        return `
        Order.BindExpressions.run({,
            object:['${data.object[0]}','${data.object[1]}'],
            function:${fn},
            placeholder:this
        });`;
    });
}