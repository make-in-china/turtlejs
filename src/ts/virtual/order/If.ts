
/// <reference path='VOrder.ts'/>
namespace Order {
    class If extends VOrder {
        static name = "if"
        static isLogic = true
        
        hit:VNode|null=null
        hasElse:boolean=false
        endHit:VNode|null=null
        get canRunInService(): boolean {
            try {
                exec(this.node, this.condition);
                return true;
            } catch (error) {
                return false
            }
        }
        run() {
            this.hit = parseBool(exec(this.node, this.condition)) ? this.node : null;
            treeEach((<VNode&IVNodeMethod>this.node.parentNode).childNodes, 'childNodes', (node: VNode&IVNodeMethod, step)=> {
                if (!isVComment(node)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) return;
                if (node.__order__ && node.__order__.node) {
                    step.next = getNodeIndex2(node.__order__.node) - getNodeIndex2(node);
                    return;
                }
                switch (info.orderCase) {
                    case 'else':
                    case 'else if':
                        if (!this.hasElse) {
                            if (info.orderCase == 'else') {
                                this.hasElse = true;
                            }
                            if (!this.endHit) {
                                if (this.hit) {
                                    this.endHit = node;
                                } else {
                                    if (info.orderCase == 'else' || parseBool(exec(node, this.condition))) {
                                        this.hit = node;
                                    } else {
                                        /*删除else if*/
                                        removeNode(node);
                                    }
                                }
                            }
                        } else {
                            return eTreeEach.c_stopEach;//this.SetParseError('语法错误：else或else if不能出现在else后');
                        }
                        break;
                }
            }, getNodeIndex2(this.node) + 1);
            let p = <INode>this.node.parentNode;
            if (!this.hit) {
                /*全部删除*/
                removeBlockBetween(this.node, <INode>this.endNode);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            } else {
                if (!this.endHit) {
                    this.endHit = this.endNode;
                }
                /*保留hit到break之间的内容*/
                let ns = takeBlockBetween(this.hit, <INode>this.endHit);
                if (ns) insertNodesBefore(this.node, ns);

                /*全部删除*/
                removeBlockBetween(this.node, <INode>this.endNode);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            }
        }
    }
    register(If);
}