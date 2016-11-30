
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    export class While extends RepeatBlockOrder {
        static orderName = "while"
        constructor(node: VComment, condition: string) {
            super(node, condition,'while');
        }
        canRepeat():boolean{
            return parseBool(exec(this.placeholder, this.condition));
        }
    }
    register(While);
}
