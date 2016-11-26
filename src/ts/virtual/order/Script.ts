
/// <reference path='VOrder.ts'/>
namespace Order {
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
        
        tryRun(){
            console.log(this.block);
            // test(this.node, this.condition);
        }
        run(){

            // replaceNodeByNode(this.node,$$$(exec(this.node,this.condition),3));
        }
    }
    register(Script);
}
