
/// <reference path='BlockOrder.ts'/>
namespace Order {

    
    export interface IOrderDataIf extends IOrderDataBlock {
        condition:string
    }

    @register
    export class If extends BlockOrder {
        static orderName = "if"
        static subOrder=["else if","else"];
        data:IOrderDataIf
        constructor(node: VComment, condition: string) {
            super(node, condition,'if',If.isBlockStart);
            this.data.condition=condition;
        }

        static isBlockStart(subOrder:string):boolean{
            switch (subOrder) {
                case 'else':
                case 'else if':
                    return true
            }
            return false
        }
        run() {
            If.run(this.data);
        }
        static run(this:void,data:IOrderDataIf){

            let hit=-1;
            if( parseBool(exec(data.placeholder, data.condition))){
                hit=0;
            }
            let blocks=data.blocks;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];
                if (block.order === 'else'||parseBool(exec(data.placeholder, block.condition))) {
                    hit = i;
                    break;
                }
            }
            if (hit!==-1) {
                replaceNodeByNodes(data.placeholder,data.blocks[hit].nodes);
            }
        }
    }
}