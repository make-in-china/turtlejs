
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
namespace Order {
    extendsOrderFunction(Equal,EXFunction.tryRun,function(this:Equal){
        let data=this.data;
        test(data.placeholder, data.condition);
    });

    extendsOrderFunction(Equal,EXFunction.toJS,function(this:Equal){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        return `(function(this:VScript){
            let data={
                condition:'${data.condition}',
                placeholder:this
            }; 
            Order.Equal.run(data);
        },ENodeType.Script).run()`;
    });
}