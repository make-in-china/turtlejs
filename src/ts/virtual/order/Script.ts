
/// <reference path='VOrder.ts'/>
namespace Order {
    @register
    class Script extends VOrder {
        static orderName = ":"
        block:JS.JavaScriptBlock
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.init();
        }
        init(){
            this.block=JS.Parser.parseStructor(this.condition);
        }
        run(){
            Script.run(this.data);
            // replaceNodeByNode(this.node,$$$(exec(this.node,this.condition),3));
        }
        static run(data:IOrderData){

        }
    }
}
