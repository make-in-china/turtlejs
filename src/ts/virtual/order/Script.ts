
/// <reference path='VOrder.ts'/>
namespace Order {
    class Script extends VOrder {
        static orderName = ":"
        statement:JavaScriptBlock
        constructor(node:VComment , condition:string){
            super(node,condition);
            this.init();
        }
        init(){
            this.statement=JavaScript.parse(this.condition);
            debugger;
        }
        
        tryRun(){
            console.log(this.statement);
            // test(this.node, this.condition);
        }
        run(){

            // replaceNodeByNode(this.node,$$$(exec(this.node,this.condition),3));
        }
    }
    register(Script);
}
