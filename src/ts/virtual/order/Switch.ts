
/// <reference path='../VOrder.ts'/>
class Switch extends VOrder {
    name = "switch"
    isLogic = true
    parse(info: ICommentOrderInfo, node: IComment): IOrderParseReturn | undefined {
        return this.addOrderToNode(info, node, () => {
            let d = new VSwitchOrderData(this.name, node, info.condition, function () {
                let p=<INode>node.parentNode;
                treeEach(p.childNodes, 'childNodes', function (node: IComment, step) {
                    if (!isCommentNode(node)) {
                        return;
                    }
                    let info = getCommentStringInfo(getCommentText(node));
                    if (!info) {
                        return;
                    }
                    if (node.__order__ && node.__order__.endNode) {
                        step.next = getNodeIndex2(node.__order__.endNode) - getNodeIndex2(node);
                        return;
                    }
                    switch (info.orderCase) {
                        case 'case':
                        case 'case break':
                            if (d.hasDefault) {
                                return this.SetParseError('语法错误：default后不应出现case/case break');
                            } else if (!d.hit) {
                                let isPass = d.value == VOrderHelper.exec(node, info.condition);
                                if (isPass) {
                                    d.hit = node;
                                    node.__order__ = info.orderCase;
                                }
                            } else if (!d.endHit) {
                                d.endHit = node;
                            }
                            break;
                        case 'default':
                            if (d.hasDefault) {
                                return this.SetParseError('语法错误：多余的default');
                            } else {
                                d.hasDefault = true;
                                if (!d.hit) {
                                    d.hit = node;
                                    node.__order__ = info.orderCase;
                                } else if (!d.endHit) {
                                    d.endHit = node;
                                }
                            }
                            break;
                    }
                }, getNodeIndex2(node) + 1);
                if (!d.hit) {
                    /*全部删除*/
                    removeBlockBetween(d.node, node);
                    p.removeChild(node);
                    p.removeChild(<INode>d.endNode);
                } else {
                    if (!d.endHit) {
                        d.endHit = d.endNode;
                    }
                    //删除hit前的数据
                    removeBlockBetween(node, d.hit);
                    //外置hit的数据
                    let ns = takeBlockBetween(d.hit, <INode>d.endHit);
                    if (ns) insertNodesBefore(d.node, ns);

                    removeNode(d.hit);

                    if ((<VOrderData>d.hit.__order__).name === 'case break'/*已终止选择*/ || d.endHit === d.endNode/*已结束*/) {
                        /*全部删除*/
                        removeBlockBetween(this.node, this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }
                }
                delete node.__order__;
            });
            return d;
        });
    }
}

