
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    class While extends RepeatBlockOrder {
        static orderName = "while"
        constructor(node: VComment, condition: string) {
            super(node, condition,'while');
        }
        tryRun(){
            test(this.placeholder, this.condition);
        }
        canRepeat():boolean{
            return parseBool(exec(this.placeholder, this.condition));
        }
    }
    register(While);
}
