
/// <reference path='VOrder.ts'/>
namespace Order {
    class Switch extends VOrder {
        static orderName = "switch"
        static isLogic = true
        value: any
        hit: INode | null = null
        hitBy: string
        needBreak: boolean = false
        endHit: INode | null = null
        hasDefault: boolean = false
        get canRunAtService():boolean{
            try {
                test(this.node, this.condition,null);
                return true;
            } catch (error) {
                return false;
            }
        }
        run() {
            let p = <INode>this.node.parentNode;
            treeEach(p.childNodes, 'childNodes', function (node: IComment, step) {
                if (!isCommentNode(node)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                if (node.__order__ && node.__order__.endNode) {
                    step.next = getNodeIndex2(node.__order__.endNode) - getNodeIndex2(node);
                    return;
                }
                switch (info.subOrder) {
                    case 'case':
                    case 'case break':
                        if (this.hasDefault) {
                            return this.SetParseError('语法错误：default后不应出现case/case break');
                        } else if (!this.hit) {
                            let isPass = this.value == exec(node, info.condition);
                            if (isPass) {
                                this.hit = node;
                                this.hitBy = info.subOrder;
                            }
                        } else if (!this.endHit) {
                            this.endHit = node;
                        }
                        break;
                    case 'default':
                        if (this.hasDefault) {
                            return this.SetParseError('语法错误：多余的default');
                        } else {
                            this.hasDefault = true;
                            if (!this.hit) {
                                this.hit = node;
                                this.hitBy = info.subOrder;
                            } else if (!this.endHit) {
                                this.endHit = node;
                            }
                        }
                        break;
                }
            }, getNodeIndex2(this.node) + 1);
            if (!this.hit) {
                /*全部删除*/
                removeBlockBetween(this.node, this.node);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            } else {
                if (!this.endHit) {
                    this.endHit = this.endNode;
                }
                //删除hit前的数据
                removeBlockBetween(this.node, this.hit);
                //外置hit的数据
                let ns = takeBlockBetween(this.hit, <INode>this.endHit);
                if (ns) insertNodesBefore(this.node, ns);

                removeNode(this.hit);

                if (this.hitBy === 'case break'/*已终止选择*/ || this.endHit === this.endNode/*已结束*/) {
                    /*全部删除*/
                    removeBlockBetween(this.node, <INode>this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(<INode>this.endNode);
                }
            }
            delete this.node.__order__;
        }
    }
    register(Switch);
}