
/// <reference path='RepeatBlockOrder.ts'/>
namespace Order {
    export class Do extends RepeatBlockOrder {
        static orderName = "do"
        private isFirst=true
        constructor(node: VComment, condition: string) {
            super(node, condition,'do');
        }
        canRepeat():boolean{
            if(this.isFirst){
                this.isFirst=false;
                return true
            }else{
                return parseBool(exec(this.placeholder, this.condition));
            }
        }
    }
    register(Do);
}
