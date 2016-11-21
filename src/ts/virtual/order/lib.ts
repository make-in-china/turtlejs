
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
        subOrderNames:string[]=[],
        subOrderRE:RegExp=/^\s*()(?:\s|$)/,// = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
        orderNames:string[]=[],
        orderRE:RegExp;
        //if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=

    /**从注释中读取命令 */
    export function getCommentStringInfo(s: string): ICommentOrderInfo | null {
        let order = s.match(orderRE);
        if (order) {
            return { order: trim(order[0]), condition: s.substring(order[0].length, s.length) }
        } else {
            let subOrder = s.match(subOrderRE);
            if (subOrder) {
                return { subOrder: trim(subOrder[0]), condition: s.substring(subOrder[0].length, s.length) }
            }
        }
        return null;
    }

    export interface ICommentOrderInfo {
        order?: string;
        subOrder?: string;
        condition: string;
    }
    export interface IOrderConstructor {
        new (node: VComment, condition: string): VOrder;
        name: string;
        subOrder?:string[];
    }
    export let orders: { [index: string]: IOrderConstructor } = {};
    export function register(this:void,order: IOrderConstructor) {
        let name:string=order.name.toLowerCase();
        orders[name] = order;
        orderNames.push(name);
        orderRE=new RegExp("^\\s*"+orderNames.join("|")+"(?:\\s*|$)");
        if(isArray(order.subOrder)&&order.subOrder.length>0){
            subOrderNames.push(order.subOrder.join("|"));
            subOrderRE=new RegExp("^\\s*"+subOrderNames.join("|")+"(?:\\s*|$)");
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
            throw new Error("语法错误：不恰当的" + info.subOrder);
        }
        let orderName: string = (<string>info.order).toLowerCase();
        if (!(orderName in orders)) {
            return;
        }
        let order: VOrder = new orders[orderName](node, info.condition);
        // order.parse(node, []);
        if (run&&order.run) {
            // if (order.endNode) {
                order.run();
            // }
        }
        return order;
    }
    let _exec:(this: VComment, $$turtle$$: string) => any;
    let env={};
    let envNames=[];
    export function registerEnvVar(name:string,value:any){
        if(name in env){
            throw new Error(name+"无法重复注册到环境！");
        }
        env[name]=value;
        envNames.push(name);
        createExec();
    }
    function createExec(){
        let args=envNames.join(',');
        if(args.length>0){
            args='$$turtle$$,$node,'+args;
        }else{
            args='$$turtle$$,$node';
        }
        _exec = <(this: VComment, $$turtle$$: string) => any>Function(args, 'with(this){return eval($$turtle$$)};');
    }
    createExec();
    export function exec(this:void,node: VComment, script: string,that:any): any {
        let args=[script,node];
        for(const name of envNames){
            args.push(env[name]);
        }
        return _exec.apply(that, args);
    }
}