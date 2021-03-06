
/// <reference path='BlockOrder.ts'/>
namespace Order {

    
    export interface IOrderDataSwitch extends IOrderDataBlock {
        setup: IOrderSetup
        condition:string
    }


    @register
    export class Switch extends BlockOrder {
        static orderName = "switch"
        static subOrder=["case","default"];
        data:IOrderDataSwitch
        constructor(node: VMDOM.VComment, setup: IOrderSetup) {
            super(node, setup,'switch',Switch.isBlockStart);
            debugger;
            this.data.setup=setup;
            this.data.condition=setup.params.toString();
        }
        static isBlockStart(subOrder:string):boolean{
            switch (subOrder) {
                case 'case':
                case 'default':
                    return true
            }
            return false
        }
        static run(data:IOrderDataSwitch){
            
            let hit=-1
            let blocks=data.blocks;
            let runData:IOrderDataBlockRun=<any>data;
            runData.isBreak=false;
            for(let i=1;i<blocks.length;i++){
                let block=blocks[i];
                if (block.order==='default'|| exec(data.placeholder, data.condition)===exec(data.placeholder, data.condition)) {
                    if(hit===-1){
                        hit=i;
                    }else if(hit===i-1){
                        hit++;
                    }else{
                        break;
                    }
                    insertNodesBefore(data.placeholder , block.nodes);
                    // let p=data.placeholder.parentNode;
                    parseBreakOrder(runData,this.isBlockStart,block.nodes);
                    if(runData.isBreak){
                        break;
                    }
                }
            }
            data.placeholder.remove();
        }
    }
}