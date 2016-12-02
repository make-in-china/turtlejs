
/// <reference path='VOrder.ts'/>
/// <reference path='../While.ts'/>
namespace Order {
    extendsOrderFunction(While,EXFunction.tryRun,function(this:While){
        let data=this.data;
        test(data.placeholder, data.condition);
    });

    extendsOrderFunction(While,EXFunction.toJS,function(this:While){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `(function(this:VScript){
            let data={
                condition:'${data.condition}',
                isBlockStart:Order.RepeatBlockOrder.isBlockStart,
                placeholder:this,
                isBreak:false,
                blocks:[${blocks.join(',')}]
            }; 
            Order.While.run(data);
        },ENodeType.Script).run()`;
    });
}
