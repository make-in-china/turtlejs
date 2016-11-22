
/// <reference path='../../scope/DOMScope.ts'/>
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
    export function addSubOrderName(name:string){
        if(subOrderNames.indexOf(name)===-1){
            subOrderNames.push(name);
        }
    }
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
        new (node: IComment, condition: string,...args:any[]): VOrder;
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
            for(const subOrder of order.subOrder){
                addSubOrderName(subOrder);
            }
            // subOrderNames.push(order.subOrder.join("|"));
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
    let _exec:{call(that:any,$$turtle$$: string,node:IComment):any} = Function('$$turtle$$,node', 'with(this){return eval($$turtle$$)};');;
    let env:RootScope=$rootScope;
    let envNames=[];
    export function registerEnvVar(name:string,value:any){
        if(name in env){
            throw new Error(name+"无法重复注册到环境！");
        }
        env[name]=value;
        envNames.push(name);
        // createExec();
    }
    // function createExec(){
    //     let args=envNames.join(',');
    //     if(args.length>0){
    //         args='$$turtle$$,$node,'+args;
    //     }else{
    //         args='$$turtle$$,$node';
    //     }
    //     _exec = <(this: VComment, $$turtle$$: string) => any>Function(args, 'with(this){return eval($$turtle$$)};');
    // }
    // createExec();
    export function exec(this:void,node: IComment, script: string): any {
        let that:Scope|RootScope;
        if(node.__scope__){
            that=node.__scope__;
        }else{
            that=env;
        }
        // for(const name of envNames){
        //     args.push(env[name]);
        // }
        let ret=_exec.call(that, script,node);
        return ret;
    }
    export function test(this:void,node: IComment, script: string): any {
        let that:Scope|RootScope;
        if(node.__scope__){
            that=node.__scope__;
        }else{
            that=env;
        }
        let _that={}
        for(const name of envNames){
            defineLockProperty(_that,name,that);
        }
        return _exec.call(_that,script, node);
    }
    function createFakeObject(that:Object):Object{
        let obj={};
        for(let name in that){
            if(that.hasOwnProperty(name)){
                defineLockProperty(obj,name,that[name]);
            }
        }
        if(that.__proto__!==Object){
            obj.__proto__=createFakeObject(that.__proto__);
        }
        return obj;
    }
    function defineLockProperty(that:Object,name:string,source:Object){
        Object.defineProperty(that,name,{
            get(){
                let ret = source[name];
                if(isObject(ret)){
                    return createFakeObject(ret);
                }else{
                    return ret;
                }
            },
            set(v:any){
                debugger;
                // throw new Error("不允许修改外部数据！");
            }
        })
    }
}