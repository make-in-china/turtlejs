
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    export interface IOrderDataDo extends IOrderDataWhile{
        isFirst:boolean
    }
    @register
    export class Do extends RepeatBlockOrder {
        static orderName = "do"
        data:IOrderDataDo
        constructor(node: VMDOM.VComment, condition: string) {
            super(node, condition,'do');
            this.data.isFirst=true;
            this.data.condition=condition;
        }
        static run(data:IOrderDataDo){
            super.run(data,canRepeat);
        }
    }
    function canRepeat(this:void,data:IOrderDataDo):boolean{
        if(data.isFirst){
            data.isFirst=false;
            return true
        }else{
            return parseBool(exec(data.placeholder, data.condition));
        }
    }
}
