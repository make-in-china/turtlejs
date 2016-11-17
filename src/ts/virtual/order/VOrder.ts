
interface VComment {
    __order__?: Order.VOrder
}
interface VComment {
    __order__?:Order.VOrder
}

namespace Order {
    interface VNodeVMData {
        /**命令 */
        order: VOrder
    }

    let
        orderCaseRE = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
        orderRE = /^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=)(\s|$)/g;
    /**从注释中读取命令 */
    export function getCommentStringInfo(s: string): ICommentOrderInfo | null {
        let order = s.match(orderRE);
        if (order) {
            return { order: trim(order[0]), condition: s.substring(order[0].length, s.length) }
        } else {
            let orderCase = s.match(orderCaseRE);
            if (orderCase) {
                return { orderCase: trim(orderCase[0]), condition: s.substring(orderCase[0].length, s.length) }
            }
        }
        return null;
    }

    export interface ICommentOrderInfo {
        order?: string;
        orderCase?: string;
        condition: string;
    }
    export interface IOrderConstructor {
        new (node: VComment, condition: string): VOrder
        name: string
        isLogic: boolean
    }

    export abstract class VOrder {
        node: VComment;
        condition: string;
        abstract canRunInService: boolean;
        abstract run(): void
        endNode: VNode | null = null
        parseBlockResult: ITreeEachReturn | undefined
        constructor(node: VComment, condition: string) {
            this.node = node;
            this.condition = condition;
        }

        parse(node: VComment, orderStack: VOrder[]) {
            node.__order__ = this;
            orderStack.push(this);
            this.parseBlockResult = this.parseBlock(node, orderStack);
        }
        private parseLogic(info: ICommentOrderInfo, node: VComment, orderStack: VOrder[]): boolean {
            /*不渲染，纯找结构*/
            let orderName: string = <string>info.order;
            if (orderName in logicOrders) {
                this.parse(node, orderStack);
                return true;
            }
            return false;
        }
        parseBlock(node: VComment, orderStack: VOrder[]): ITreeEachReturn | undefined {
            let i = getNodeIndex2(node);
            let isError = false;
            let error = function (msg: string) {
                isError = true;
                alert(msg);
                return eTreeEach.c_stopEach;
            }

            return treeEach(<VNode[]><any>(<VNode>node.parentNode).childNodes, 'childNodes', (node, step) => {
                if (!isVComment(node)) {
                    return;
                }
                let info = getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                if (info.order) {
                    if (this.parseLogic(info, node, orderStack)) {
                        step.next = (<ITreeEachReturn>this.parseBlockResult).index - getNodeIndex2(node) + 1;
                    }
                    return eTreeEach.c_noRepeat & eTreeEach.c_noIn;
                }
                if (info.orderCase === 'end') {
                    if (orderStack.length > 0) {
                        (<VOrder>orderStack.pop()).endNode = node;

                        return eTreeEach.c_stopEach;
                    } else {
                        return error('语法错误：多余的end');
                    }
                }
                return eTreeEach.c_noIn;
            }, i + 1);

        }

    }
    let orders: { [index: string]: IOrderConstructor } = {};
    let logicOrders: { [index: string]: IOrderConstructor } = {};
    export function register(this:void,order: IOrderConstructor) {
        let name:string=order.name.toLowerCase();
        orders[name] = order;
        if (order.isLogic) {
            logicOrders[name] = order;
        }
    }
    export function parseComment(this:void,node: VComment, run: boolean = false): VOrder | undefined {

        if (node.__order__) {
            return node.__order__;
        }
        let info = getCommentStringInfo(node.data);
        if (!info) {
            return;
        }
        if (!info.order) {
            throw new Error("语法错误：不恰当的" + info.orderCase);
        }
        let orderName: string = (<string>info.order).toLowerCase();
        if (!(orderName in orders)) {
            return;
        }
        let order: VOrder = new orders[orderName](node, info.condition);
        order.parse(node, []);
        if (run) {
            if (order.endNode) {
                order.run();
            }
        }
        return order;
    }
    let _exec = <(this: VComment, $$turtle$$: string) => any>Function('$$turtle$$', 'with(this){return eval($$turtle$$)};');
    export function exec(this:void,node: VComment, script: string): any {
        return _exec.call(node, script);
    }
}