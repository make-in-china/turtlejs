
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
namespace Order {
    extendsOrderFunction(Do,EXFunction.tryRun,function(this:Do){
        let data=this.data;
        test(data.placeholder, data.condition);
    });


    
    extendsOrderFunction(Do,EXFunction.toJS,function(this:Do){
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
            Order.Do.run(data);
        },ENodeType.Script).run()`;
    });
}