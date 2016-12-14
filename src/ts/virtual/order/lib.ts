
/// <reference path='../../scope/DOMScope.ts'/>
interface VComment {
    __order__?: Order.VOrder
}
namespace Order {
    interface VNodeVMData {
        /**命令 */
        order: VOrder
    }

    let
        subOrderNames:string[]=[],
        subOrderRE:RegExp,//=/^\s*()(?:\s|$)/,// = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
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
        orderName: string;
        subOrder?:string[];
        run(data:IOrderData):void;
    }
    export let orders: { [index: string]: IOrderConstructor } = {};
    function makeOrderRegExp(names:string[]):RegExp{
        return new RegExp("^\\s*("+names.join("|")+")(?:\\s*|$)");
    }
    export function register(order: IOrderConstructor) {
        let name:string=order.orderName.toLowerCase();
        orders[name] = order;
        orderNames.push(name);
        orderRE=makeOrderRegExp(orderNames);
        if(isArray(order.subOrder)&&order.subOrder.length>0){
            for(const subOrder of order.subOrder){
                addSubOrderName(subOrder);
            }
            // subOrderNames.push(order.subOrder.join("|"));
            subOrderRE=makeOrderRegExp(subOrderNames);
        }
    }
    export function parseComment(this:void,node: VComment): VOrder | undefined {

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
        
        return order;
    }
    let _exec:{call(that:any,$$turtle$$: string,node:INode):any} = Function('$$turtle$$,node', 'with(this){return eval($$turtle$$)};');
    export function registerEnvVar(name:string,value:any){
        if(name in $rootScope){
            throw new Error(name+"无法重复注册到环境！");
        }
        $rootScope[name]=value;
    }
    
    export function exec(this:void,node: INode, script: string): any {
        let that:Scope=DOMScope.get(node);

        let ret=_exec.call(that, script,node);
        return ret;
    }
//test    
    let replaceScopes={
        scopes:[] as Scope[],
        oldScopes:[] as Scope[]
    }
    /**取消scope保护 */
    export function resetTest(){
        //倒序还原
        for(let i=replaceScopes.oldScopes.length-1;i>=0;i--){
            let oldScope=replaceScopes.oldScopes.pop();
            let scope=<Scope>replaceScopes.scopes.pop();
            scope.__actionNode__.__scope__=oldScope;
        }
    }
    /**测试时保护原来的scope */
    function replaceScope(scope:Scope):Scope{
        let idx=replaceScopes.oldScopes.indexOf(scope);
        if(idx!==-1){
            return <Scope>replaceScopes.scopes[idx];
        }else{
            
            idx=replaceScopes.scopes.indexOf(scope);
            if(idx!==-1){
                return scope;
            }
            let newScope=<Scope>createFakeObject(<any>scope);
            scope.__actionNode__.__scope__=newScope;
            replaceScopes.oldScopes.push(scope);
            replaceScopes.scopes.push(newScope);
            return newScope;
        }
    }
    export function test(this:void,node: INode, script: string): any {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        return _exec.call(that,script, node);
    }
    export function testSet(this:void,node: INode,name:string, script: string): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        that[name]=_exec.call(that,script, node);
    }
    export function testSetValue(this:void,node: INode,name:string, value: any): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        that[name]=value;
    }
    
    function createFakeObject(that:Object):Object{
        let obj={};
        for(let name in that){
            if(that.hasOwnProperty(name)){
                defineCloneProperty(obj,name,that);
            }
        }
        if(that.__proto__!==Object.prototype){
            obj.__proto__=createFakeObject(that.__proto__);
        }
        return obj;
    }
    function emptyFunction(){}
    function defineCloneProperty(that:Object,name:string,source:any){
        let created:any=null;
        Object.defineProperty(that,name,{
            get(){
                let ret = source[name];
                if(isObject(ret)){
                    if(!created){
                        created=createFakeObject(ret)
                    }
                    return created;
                }else{
                    return ret;
                }
            },
            set:emptyFunction
        })
    }
}