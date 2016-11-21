
/// <reference path='lib.ts'/>

namespace Order {
    
    export abstract class VOrder {
        node: VComment;
        condition: string;
        run?(): void
        parseBlockResult: ITreeEachReturn | undefined
        abstract canRunAtService:boolean;
        constructor(node: VComment, condition: string) {
            this.node = node;
            this.condition = condition;
        }
        

    }
}