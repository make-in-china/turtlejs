
/// <reference path='VOrder.ts'/>
namespace Order {
    class While extends VOrder {
        static name = "while"
        static isLogic = true
        isBreak: boolean = false
        onBreak() {
            this.isBreak = true;
        }
        get canRunInService():boolean{
            try {
                exec(this.node, this.condition);
                return true;
            } catch (error) {
                return false;
            }
        }
        run() {

            let p: INode = <INode>this.node.parentNode;
            if (this.isBreak || !parseBool(exec(this.node, this.condition))) {
                //全部删除
                removeBlockBetween(this.node, <INode>this.endNode);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            } else {
                let nodes = cloneBetween(this.node, <INode>this.endNode);
                p.insertBefore2(createBreakElement(nodes, this), this.node);
            }
        }
    }
    register(While);
    function createBreakElement(nodes, order: VOrder) {
        let breakElement: IHTMLBreakElement = $node('__break__');
        for (let i = 0; i < nodes.length; i++) {
            breakElement.appendChild(nodes[i]);
        }
        breakElement.source = order;
        return breakElement;
    }
}
