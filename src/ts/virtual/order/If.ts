
/// <reference path='VOrder.ts'/>
class If extends VOrder {
    name = "if"
    isLogic = true
    parse(info: ICommentOrderInfo, node: IComment,orderStack:VOrderData[]): VOrderData {
        return this.addOrderToNode(info, node,orderStack, () => {
            let d = new VIfOrderData(this.name, node, info.condition, function () {
                d.hit = parseBool(VOrderHelper.exec(node, d.condition)) ? this.node : null;
                treeEach((<INode>node.parentNode).childNodes, 'childNodes', function (node: INode, step) {
                    if (!isCommentNode(node)) {
                        return;
                    }
                    let info = this.getCommentStringInfo(node.data);
                    if (!info) return;
                    if (node.__order__ && node.__order__.node) {
                        step.next = getNodeIndex2(node.__order__.node) - getNodeIndex2(node);
                        return;
                    }
                    switch (info.orderCase) {
                        case 'else':
                        case 'else if':
                            if (!d.hasElse) {
                                if (info.orderCase == 'else') {
                                    d.hasElse = true;
                                }
                                if (!d.endHit) {
                                    if (d.hit) {
                                        d.endHit = node;
                                    } else {
                                        if (info.orderCase == 'else' || parseBool(VOrderHelper.exec(node, this.condition))) {
                                            d.hit = node;
                                        } else {
                                            /*删除else if*/
                                            removeNode(node);
                                        }
                                    }
                                }
                            } else {
                                return this.SetParseError('语法错误：else或else if不能出现在else后');
                            }
                            break;
                    }
                }, getNodeIndex2(node) + 1);
                let p = this.node.parentNode;
                if (!this.hit) {
                    /*全部删除*/
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                } else {
                    if (!this.endHit) {
                        this.endHit = this.endNode;
                    }
                    /*保留hit到break之间的内容*/
                    let ns = takeBlockBetween(this.hit, this.endHit);
                    if (ns) insertNodesBefore(this.node, ns);

                    /*全部删除*/
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
            });
            return d;
        });
    }
}

