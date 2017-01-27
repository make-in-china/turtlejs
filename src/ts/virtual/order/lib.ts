
/// <reference path='../../scope/DOMScope.ts'/>
/// <reference path='../UIHelper/VOrder.ts'/>
/// <reference path='../UIHelper/VScript.ts'/>
// interface VComment {
//     __order__?: Order.VOrder
// }
interface Object {
    __bind__: IBindInfo[]
}

interface IBindFunction {
    (name: string):void;
    isBinding: boolean;
    removeObject: Function;
    list: {
        [index:number]:Object;
        length:number
    };
}

interface IBindInfo {
    name: string
    target: Object
    targetName: string
    event: IBindFunction
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
    export function getOrderInfoByString(s: string): IOrderInfo | null {
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

    /**从VOrder中读取命令 */
    export function getOrderInfo(vOrder: VMDOM.VOrder): IOrderInfo | null {
        let block=vOrder.block.clone();
        let statements=block.children;
        if(statements.length===0){
            return null;
        }
        //无论是否有多个statement，order name 都只会出现在第一个statement里
        let statement=statements[0];
        let keyWords=statement.children;
        
        let keyWord=keyWords[0];
        if(keyWords[0]===' '){
            keyWords.shift();
            keyWord=keyWords[0];
        }
        if(isString(keyWord)){
            let order = keyWord.match(orderRE);
            
            if (order) {
                keyWords.shift();
                return { order: order[0], condition:block.innerText  }
            } else {
                let subOrder = keyWord.match(subOrderRE);
                if (subOrder) {
                    keyWords.shift();
                    return { subOrder: subOrder[0], condition: block.innerText }
                }
            }
        }
        return null;
    }

    export interface IOrderInfo {
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
    
    export function parseOrder(this:void,node: VMDOM.VOrder): VOrder | undefined {
        let info = getOrderInfo(node);
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
    export function parseComment(this:void,node: VMDOM.VComment): VOrder | undefined {

        let info = getOrderInfoByString(node.data);
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
    let _exec:{call(that:any,$$turtle$$: string,node:INode):any} = newScopeFunction([]);
    
    export function newScopeFunction(this:void,params:string[]){
        let paramsInfo=params.join(',');
        if(paramsInfo.length>0){
            paramsInfo+=','
        }
        return Function(paramsInfo+'$$turtle$$,node', 'with(this){return eval("("+$$turtle$$+")")};');
    }
    export function registerEnvVar(name:string,value:any){
        if(name in $rootScope){
            throw new Error(name+"无法重复注册到环境！");
        }
        $rootScope[name]=value;
    }
    
    export function exec(this:void,node: INode, script: string): any {
        
        //标记操作过程
        insertNode(node,$$$(`
        Order.exec(this,'${script}');`,ENodeType.Script));
        let that:Scope=DOMScope.get(node);
        return _exec.call(that, script,node);
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
            // debugger;
            // Object.defineProperty(scope.__actionNode__,'__scope__',{
            //     value:oldScope
            // });
            delete scope.__actionNode__.__scope__;
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
    // export const enum ETestSetCode{
    //     normal=0,
    //     var=1
    // }
    // export function testSet(this:void,node: INode,name:string, script: string,code:ETestSetCode=ETestSetCode.normal): void {
    export function testSet(this:void,node: INode,name:string, script: string): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        that[name]=_exec.call(that,script, node);
    }
    export function testVar(this:void,node: INode,name:string, script: string): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        //删除旧的
        delete that[name];
        that[name]=_exec.call(that,script, node);
    }
    export function testSetValue(this:void,node: INode,name:string, value: any): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        that[name]=value;
    }
    export function testSetVar(this:void,node: INode,name:string, value: any): void {
        let that:Scope=DOMScope.get(node);
        that=replaceScope(that);
        delete that[name];
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
    // function emptyFunction(){}
    function defineCloneProperty(that:Object,name:string,source:any){
        let created:any=null;
        Object.defineProperty(that,name,{
            configurable: true,
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
            set(v:any){}
        })
    }
    function onPropertyChange(obj:Object, name:string, fnOnSet:Function) {
        let desc: PropertyDescriptor | null = Object.getOwnPropertyDescriptor(obj, name);
        if (!desc) return;
        if (desc.configurable === false)
            throw new Error('绑定失败：原属性' + name + '替换失败');
        if (desc.writable === false)
            throw new Error('绑定失败：原属性' + name + '不可写');
        delete obj[name];
        let newProperty: PropertyDescriptor = { enumerable: desc.enumerable, configurable: true };
        let value:any;
        if (desc.hasOwnProperty('value')) {
            let _value = desc.value;
            if (isFunction(_value)) {
                newProperty.get = function () {
                    return _value.call(this, value);
                };
                newProperty.set = function (newValue) {
                    value = newValue;
                    _value.call(this, value);
                    fnOnSet.call(obj, name);
                };
            } else {
                newProperty.get = function () {
                    return _value;
                };
                newProperty.set = function (newValue) {
                    _value = newValue;
                    fnOnSet.call(obj, name);
                };
            }
        } else {
            if (desc.hasOwnProperty('get')) {
                let get = <Function>desc.get;
                newProperty.get = function () {
                    return get.call(this);
                };
            }
            if (desc.hasOwnProperty('set')) {
                let set = <Function>desc.set;
                newProperty.set = function (newValue) {
                    set.call(this, newValue);
                    fnOnSet.call(obj, name);
                };
            }
        }
        Object.defineProperty(obj, name, newProperty);
        desc = null;
    }
    function objectPropertyChange(obj:Object, name:string, fnOnSet:Function) {
        if (obj.hasOwnProperty(name)) {
            onPropertyChange(obj, name, fnOnSet);
        }
    }
    export function bindElementProperty(obj: any, name: string, obj2: Object, name2: string) {
        bindProperty(obj, name, obj2, name2, 2);
    }
    
    function addBindInfo(obj: Object, name: string, target: Object, targetName: string, event: IBindFunction) {
        let bindInfoHash = obj.__bind__;
        if (!bindInfoHash) {
            bindInfoHash = [];
            obj.__bind__ = bindInfoHash;
        }
        bindInfoHash.push({ name: name, target: target, targetName: targetName, event: event });
    }
    function getBindInfo(obj: Object, name: string, targetName: string) {
        if (!obj.__bind__) return;
        let bindInfoHash = obj.__bind__;
        for (let i in bindInfoHash) {
            if (bindInfoHash[i].name === name && bindInfoHash[i].targetName === targetName) {
                return bindInfoHash[i];
            }
        }
    }
    export function bindProperty(obj: Object, name: string, obj2: Object, name2: string, type?: number) {
        let bindInfo1 = getBindInfo(obj, name, name2);
        let bindInfo2 = getBindInfo(obj2, name2, name);
        if (bindInfo1 && bindInfo2 && bindInfo1.event !== bindInfo2.event) {
            throw new Error("不能混合不同的绑定链");
        } else if (bindInfo1) {
            let e = bindInfo1.event;
            addBindInfo(obj2, name2, obj, name, e);
            Array.prototype.push.call(e.list,obj2);
            if (type != 2) {
                onPropertyChange(obj2, name2, e);
                e.isBinding = true;
                obj2[name2] = obj[name];
                e.isBinding = false;
            }
        } else if (bindInfo2) {
            let e = bindInfo2.event;
            addBindInfo(obj, name, obj2, name2, e);
            Array.prototype.push.call(e.list,obj);
            //if(type!=2){
            onPropertyChange(obj, name, e);
            e.isBinding = true;
            obj[name] = obj2[name2];
            e.isBinding = false;
            //}
        } else {
            let fn: IBindFunction = bindPropertyByName(obj, name, obj2, name2)
            onPropertyChange(obj, name, fn);
            if (type != 2) {
                onPropertyChange(obj2, name2, fn);
                fn.isBinding = true;
                obj2[name2] = obj[name];
                fn.isBinding = false;
            }
        }
    }
    function bindPropertyByName(obj: Object, name: string, obj2: Object, name2: string): IBindFunction {
        let t: IBindFunction = <any>function (name:string) {
            if (!t.isBinding) {
                t.isBinding = true;
                for (let i = 0; i < t.list.length; i++) {
                    let obj = t.list[i];
                    if (obj !== this) {
                        let o = obj.__bind__;
                        for (let j in o) {
                            if (o[j].targetName === name) {
                                if (obj[o[j].name] != this[name]) {/*相同则不重置*/
                                    obj[o[j].name] = this[name];
                                }
                            }
                        }
                    }
                }
                t.isBinding = false;
            }
        }
        t.isBinding = false;
        t.removeObject = function (obj:Object) {
            removeItem(t.list, obj);
        }
        t.list = [obj, obj2];
        addBindInfo(obj, name, obj2, name2, t);
        addBindInfo(obj2, name2, obj, name, t);
        return t;
    }

}
