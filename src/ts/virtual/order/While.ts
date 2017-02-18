
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    
    export interface IOrderDataWhile extends IOrderDataBlock{
        setup: IOrderSetup
        condition:string
    }
    @register
    export class While extends RepeatBlockOrder {
        static orderName = "while"
        data:IOrderDataWhile
        constructor(node: VMDOM.VComment, setup: IOrderSetup) {
            super(node, setup,'while');
            this.data.setup=setup;
            this.data.condition=setup.params.toString();
        }
        static run(data:IOrderDataWhile){
            super.run(data,canRepeat);
        }
    }
    function canRepeat(this:void,data:IOrderDataWhile):boolean{
        return parseBool(exec(data.placeholder, data.condition));
    }
}
