
/// <reference path='VOrder.ts'/>
namespace Order {
    @register
    class Script extends VOrder {
        static orderName = ":"
        block:JS.JavaScriptBlock
        constructor(node:VMDOM.VComment , condition:string){
            super(node,condition);
            this.init();
        }
        init(){
            this.block=JS.Parser.parseStructor(this.condition);
        }
        static run(data:IOrderData){

        }
    }
}
