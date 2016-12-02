
/// <reference path='VOrder.ts'/>
/// <reference path='../Switch.ts'/>
namespace Order {
    extendsOrderFunction(Switch,EXFunction.tryRun,function(this:Switch){
        let data=this.data;
        for(const block of data.blocks){
            test(data.placeholder, block.condition);
        }
    });
    extendsOrderFunction(Switch,EXFunction.toJS,function(this:Switch){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let blocks=getBlocksDataString(data);
        return `(function(this:VScript){
            let data={
                condition:'${data.condition}',
                isBlockStart:Order.If.isBlockStart,
                placeholder:this,
                isBreak:false,
                blocks:[${blocks.join(',')}]
            }; 
            Order.Switch.run(data);
        },ENodeType.Script).run()`;
    });
}