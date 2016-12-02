
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    @register
    export class While extends RepeatBlockOrder {
        static orderName = "while"
        constructor(node: VComment, condition: string) {
            super(node, condition,'while');
        }
        static run(data:IOrderDataBlock){
            super.run(data,canRepeat);
        }
    }
    
    function canRepeat(this:void,data:IOrderDataBlock):boolean{
        return parseBool(exec(data.placeholder, data.condition));
    }
}
