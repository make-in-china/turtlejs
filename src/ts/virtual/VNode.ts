
/// <reference path='.d.ts'/>
/// <reference path='../lib/INamedNodeMap.ts'/>
/// <reference path='VStyle.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='../lib/ClassList.ts'/>
/// <reference path='../lib/Lib.ts'/>
/// <reference path='../lib/TypeHelper.ts'/>
/// <reference path='Is.ts'/>
/// <reference path='../lib/INamedNodeMap.ts'/>
/// <reference path='VNodeList.ts'/>
/// <reference path='VHTMLCollection.ts'/>
let emptyTextNodeRE = /^\s*$/,
    stringNode = {
        SCRIPT: /^\/script[>\s]/i,
        TEMPLATE: /^\/template[>\s]/i,
        STYLE: /^\/style[>\s]/i,
        TITLE: /^\/title[>\s]/i,
        TEXTAREA: /^\/textarea[>\s]/i,
        XMP: /^\/xmp[>\s]/i
    };
let functionCommentRE = /\/\*([\s\S]*?)\*\//g
function getFunctionComment(fn: Function) {
    let s: RegExpExecArray = <RegExpExecArray>functionCommentRE.exec(fn.toString());
    return s[1];
}

abstract class VNode extends EventEmitterEx implements INode{
    protected __data__:string         ="";
    protected __: Object              ={};
    protected __events__: [string, EventListenerOrEventListenerObject | undefined, boolean][]=[];
    protected __domNode__:Node;
    __isClose__: boolean;
    /**是否自闭和 */
    __closeSelf__?: boolean;
    attributes=new INamedNodeMap();
    nodeType: number;
    nodeName: string;
    childNodes: VNodeList;
    parentNode: VNode&IVNodeMethod | null;
    style: VStyle;
    
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void
    {

    }
    dispatchEvent(evt: Event): boolean
    {   
        return false;
    }
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void
    {
        
    }
    _(this: VNode&IVNodeMethod, name: string, value?: string): VNode&IVNodeMethod | null {
        if (name) {
            return this.setAttribute.call(this, name, value);
        } else {
            return this.parentNode;
        }
    }
    addText(this: VNode&IVNodeMethod, ...agrs:string[]): VNode&IVNodeMethod {
        let s = agrs.join('\r\n');
        let t = this(s, 3);
        this.appendChild(t);
        return this;
    }
    addText2(this: VNode&IVNodeMethod,fn: Function): VNode&IVNodeMethod{
        // let t = newVNode($t.getFunctionComment(fn), 3, this.nodeName === 'PRE');
        let t = this(getFunctionComment(fn), 3);
        this.appendChild(t);
        return this;
    }
    append(this: VNode, name: string, nodeType: number): VNode&IVNodeMethod {
        return this.doAppendChild(VNodeHelp(name, nodeType));
    }
    appendChild(this: VNode, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod {
        let idx =Array.prototype.indexOf.call(this.childNodes,vNode);
        if (idx === -1) {
            return this.doAppendChild( vNode);
        } else {
            return vNode;
        }
    }
    protected doAppendChild(this: VNode, vNode: VNode&IVNodeMethod) {
        // if (vNode instanceof Node) {
        //     throw new Error('虚拟DOM只能插入虚拟节点！');
        // }
        Array.prototype.push.call(this.childNodes,vNode);
        let me=this;
        let p = vNode.parentNode;
        if (p) {
            p.removeChild(vNode);
        }
        vNode.parentNode = <VNode&IVNodeMethod>this;
        if (isVHTMLElement(me)&&isVHTMLElement(vNode)) {
            push.call(me.children,vNode);
        }
        return vNode;
    }
    removeAttribute(this: VNode&IVNodeMethod, name: string): void {
        this.attributes.removeNamedItem(name);
    }
    removeAttributeNode(this: VNode&IVNodeMethod, item: Object): void {
        this.attributes.removeNamedItem(item);
    }
    hasAttribute(this: VNode&IVNodeMethod, name: string): boolean {
        return this.attributes.indexOfName(name) !== -1;
    }
    setAttribute(this: VNode&IVNodeMethod, name: string, value: string): VNode&IVNodeMethod {
        if (name && !emptyTextNodeRE.test(name)) {
            this.attributes.setNamedItem(new IAttr(name, value));
            return <any>getBind(this, this.setAttribute);
        } else {
            return this;
        }
    }
    getAttribute(this: VNode, name: string):string|null {
        let item = this.attributes.getNamedItem(name);
        if (item) {
            return item.value;
        } else {
            return null;
        }
    }
    insertBefore(this:  VNode&IVNodeMethod, newNode:  VNode&IVNodeMethod, refChild:  VNode&IVNodeMethod):  VNode&IVNodeMethod {
        //添加到childNodes里
        let chds = this.childNodes;
        let idx:number = indexOf.call(chds,refChild);
        if (idx === -1) {
            return newNode;
        }
        let p2 = newNode.parentNode;
        if (p2) {
            p2.removeChild(newNode);
        }
        splice.call(chds,idx, 0, newNode);

        newNode.parentNode = this;


        //添加到children里
        if(isVHTMLElement(newNode)){
            let me=this;
            if(isVHTMLElement(me)){
                if (idx >= chds.length) {
                    push.call(chds,newNode);
                } else {
                    let chds = me.children;
                    // for (let i = idx; i < chds.length; i++) {
                        // if ((<VElem<IVNodeMethod>>chds[i]).nodeType === 1) {
                            splice.call(chds,idx, 0, newNode);
                            return newNode;
                        // }
                    // }
                    // push.call(chds,newNode);
                }
            }
        }
        return newNode;
    }
    insertBefore2(this:  VNode&IVNodeMethod, newNode:  VNode&IVNodeMethod, node:  VNode&IVNodeMethod):  VNode&IVNodeMethod{
        return this.insertBefore(newNode,node);
    }
    removeChild(this:  VNode&IVNodeMethod, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod {
        if (!vNode || this.childNodes.length === 0) {
            return vNode;
        }
        removeItem(this.childNodes, vNode);
        vNode.parentNode = null;
        return vNode;
    }
    getData(this: VNode): string {
        return this.__data__;
    }
    cloneNode(this:VNode&IVNodeMethod): VNode&IVNodeMethod {
        debugger;
        // let me=this;
        // if(isVHTMLElement(me)){
        //     return <any>VNodeHelp((<any>this).getData(), me.nodeType);
        // }
        // let node = VNodeHelp(this.nodeName, this.nodeType);
        // let attrs = this.attributes;
        // for (let i = 0; i < attrs.length; i++) {
        //     node.setAttribute(attrs[i].name, attrs[i].value);
        // }
        //     node.__isClose__ = this.__isClose__;
        //     node.__closeSelf__ = this.__closeSelf__;

        // return node;
        return this;
    }
    
    // createElement(name: string): IVElement;
    // createTextNode(value: string): IVText;
    // createComment(value: string): IVComment;
    // addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    // removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    toJS(this:VNode): string {
        let
            sBegin = '',
            sAttr = '',
            sInner = '',
            sEnd = '',
            s;
        if (this.parentNode !== null && this.__isClose__) {
            sEnd = '()';
        }
        if (this.parentNode === null) {
            sBegin = 'VNode';
        }
        let me = this;
        if (isVHTMLElement(me)) {
            sBegin += '("' + me.nodeName + '")';
            if (me.attributes.length > 0) {
                sAttr = '._';
                let attrs = me.attributes;
                for (let i = 0; i < attrs.length; i++) {
                    sAttr += '("' + attrs[i].name;
                    if (attrs[i].value) {
                        sAttr += '","' + attrs[i].value + '")';
                    } else {
                        sAttr += '")';
                    }
                }
                sAttr += '()';
            }
            let chds = me.childNodes;
            if (chds.length > 0) {
                for (let i = 0; i < chds.length; i++) {
                    sInner += (<VNode>chds[i]).toJS();
                }
            }
        } else if (isVText(me) || isVComment(me)) {
            s = me.data;
            s = s.replace(/[\'\"\r\n]/g, function (s: string) {
                switch (s) {
                    case '\'':
                    case '\"':
                        return '\\' + s;
                    case '\r':
                        return '\\r';
                    case '\n':
                        return '\\n';
                }
                return "";
            });
            sBegin += '("' + s + '",' + me.nodeType + ')';
        }
        return sBegin + sAttr + sInner + sEnd;
    }
    toDOM(this: VNode): Node {
        let elem: Node;
        let toHelp = document.createElement('__Turtle__');//用于创建VStyle和toDom支持
        let me = this;
        if (isVHTMLElement(me)) {
            if (me.__domNode__) {
                elem = me.__domNode__;
                return elem;
            }
            elem = document.createElement(me.nodeName);
            me.__domNode__ = elem;
        } else if (isVText(me)) {
            if (me.__domNode__) {
                return me.__domNode__;
            }
            if (me.data !== "") {
                toHelp.innerHTML = me.data;
                elem = toHelp.removeChild(toHelp.childNodes[0]);
                //elem=document.createTextNode(this.data);不用这句的原因是为了转码
            } else {
                elem = document.createTextNode('');
            }
            me.__domNode__ = elem;
        } else if (isVComment(me)) {
            if (me.__domNode__) {
                return me.__domNode__;
            }
            elem = document.createComment(me.data);
            me.__domNode__ = elem;
        } else {
            if (me.__domNode__) {
                return me.__domNode__;
            }
            // toHelp.innerHTML = this.outerHTML;
            toHelp.innerHTML = me.__data__;
            elem = toHelp.removeChild(toHelp.childNodes[0]);
            me.__domNode__ = elem;
        }
        for (let i in this) {
            switch (i) {
                case 'attributes':
                    let attrs = this.attributes;
                    for (let j = 0; j < attrs.length; j++) {
                        (<any>elem).setAttribute(attrs[j].name, attrs[j].value);
                    }
                    break;

                case '__events__':
                    let arr = this.__events__;
                    for (let j in arr) {
                        let e = arr[j];
                        elem.addEventListener(e[0], e[1], e[2]);
                    }
                    break;
                case '__':
                    let obj = this.__;
                    if (obj) {
                        for (let j in obj) {
                            elem[j] = obj[j];
                        }
                    }
                    break;
                case 'children':
                case 'childNodes':
                case '__proto__':
                case '__isClose__':
                case '__domNode__':
                case 'nodeType':
                case 'nodeName':
                case 'parentNode':
                case "__closeSelf__":
                case "style":
                case "classList":
                case "className":
                    break;
                default:
                    if (!this.hasOwnProperty(i)) {
                        continue;
                    }
                    let desc = Object.getOwnPropertyDescriptor(this, i);
                    if (desc) {
                        if (!(i in elem)) {
                            Object.defineProperty(elem, i, desc);
                        } else {
                            elem[i] = this[i];
                        }
                    } else {
                        elem[i] = this[i];
                    }
            }
        }
        this.connectParent(elem);
        if (isVHTMLElement(me)) {
            if (me.nodeName === 'PRE') {
                if (me.childNodes.length > 0) {
                    (<Element>elem).innerHTML = decodeHTML((<VNode>me.childNodes[0]).getData());
                }
            } else {
                let chds = me.childNodes;
                for (let j = 0; j < chds.length; j++) {
                    (<VNode>chds[j]).toDOM();
                }
            }
        }
        this.emulation();
        elem.__vdomNode__ = <any>this;
        return elem;
    }
    
    /**与真实DOM交互 */
    protected connectParent<T extends IVNodeMethod>(this: VNode, elem: Node) {
        let p:VNode|null = this.parentNode;
        if (p && p.__domNode__) {
            let pE = p.__domNode__;
            if (pE.childNodes.length === 0) {
                pE.appendChild(elem);
            } else {
                let node: VNode | null = this;
                while (true) {
                    /*
                        * 向前找
                        */
                    node = node.previousSibling;
                    if (node) {
                        let elem2 = node.__domNode__;
                        if (elem2) {
                            if (elem2.parentNode) {
                                pE.insertBefore2(elem, elem2);
                                pE.insertBefore2(elem2, elem);
                                break;
                            }
                        }
                    } else {
                        node = this;
                        while (true) {
                            /*
                                * 向后找
                                */
                            node = node.nextSibling;
                            if (node) {
                                let elem2 = node.__domNode__;
                                if (elem2) {
                                    if (elem2.parentNode) {
                                        pE.insertBefore2(elem, elem2);
                                        break;
                                        // } else {
                                        // console.log(elem2.innerHTML);
                                        // debugger;
                                        /*这里怎么处理好呢*/
                                    }
                                }
                            } else {
                                pE.appendChild(elem);
                                break;
                            }

                        }
                        break;
                    }
                }
            }
        }
    }
    protected createHomologyFunction(name) {
        return function () {
            let objects:Node[] = [], 
                toDOMs:INode[] = [];
            for (let i = 0; i < arguments.length; i++) {
                //获取对象
                let o:INode = <INode>arguments[i].valueOf();
                //如果valueOf的值不是自己
                if (o === arguments[i]&&o instanceof VNode) {
                    toDOMs.push(o);
                    //转换为真实Node
                    objects.push(o.toDOM());
                }else{
                    objects.push(<any>o);
                }

            }
            //仍然调用虚拟dom的函数
            this.__proto__[name].apply(this, arguments);
            //调用真实dom的函数
            let ret = this.__domNode__[name].apply(this.__domNode__, objects);
            //返回值父子关系修正
            for (let i = 0; i < toDOMs.length; i++) {
                let chds = toDOMs[i].childNodes;
                for (let j = 0; j < chds.length; j++) {
                    let node:VNode=<VNode>chds[j];
                    let chds2 = node.childNodes;
                    if (chds2.length !== node.__domNode__.childNodes.length) {
                        for (let k = 0; k < chds2.length; k++) {
                            if ((<VNode>chds2[k]).__domNode__.parentNode === null) {
                                this.connectParent(chds2[k], (<VNode>chds2[k]).__domNode__);
                            }
                        }
                    }
                }
            }
            return ret;
        }
    }
    protected createBridgeFunction(name){
        return function (this:VNode) {
            return this.__domNode__[name].apply(this.__domNode__, arguments);
        }
    }
    protected setBridgeGet(name){
        Object.defineProperty(this, name, {
            get: function (this:VNode) {
                return this.__domNode__[name];
            }
        });
    }
    protected setBridgeGetSet(name){
        Object.defineProperty(this, name, {
            get: function (this:VNode) {
                return this.__domNode__[name];
            },
            set: function (this:VNode,v) {
                this.__domNode__[name]=v;
            }
        });
    }
    protected emulation(this:VNode) {
        let me=this;
        if(me instanceof VHTMLElement){
            this.createBridgeFunction("setAttribute");
            this.createBridgeFunction("hasAttribute");
            this.createBridgeFunction("removeAttribute");
            this.createBridgeFunction("removeAttributeNode");
            this.createBridgeFunction("toString");
            this.createBridgeFunction("addEventListener");
            this.createBridgeFunction("removeEventListener");
            
            this.createHomologyFunction("insertBefore");
            this.createHomologyFunction("insertBefore2");
            this.createHomologyFunction("appendChild");
            this.createHomologyFunction("removeChild");

            this.setBridgeGet("style");
            this.setBridgeGet("classList");
            this.setBridgeGet("attributes");

            this.setBridgeGet("offsetTop");
            this.setBridgeGet("offsetLeft");
            this.setBridgeGet("offsetWidth");
            this.setBridgeGet("offsetHeight");

            switch (me.nodeName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    this.setBridgeGetSet("value");
                case "INPUT":
                    this.setBridgeGetSet("checked");
                    break;
            }
        } else if (me instanceof VText) {
            debugger;
            Object.defineProperty(me, 'data', {
                get: function () {
                    return this.__value__;
                },
                set: function (s) {
                    this.__value__ = s;
                    this.__domNode__.data = s;
                }
            });
            Object.defineProperty(me, 'value', {
                get: function () {
                    return this.__value__;
                },
                set: function (s) {
                    this.__value__ = s;
                    this.__domNode__.value = s;
                }
            });
        }
    }
    toXMLNodeString(this: VNode): string[] {
        let
            ret: string[] = [],
            sAttr = '',
            arrAttr = [],
            attr = this.attributes,
            me = this;
        if (attr) {
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].value) {
                    arrAttr.push(attr[i].name + '="' + attr[i].value + '"');
                } else {
                    arrAttr.push(attr[i].name);
                }
            }
            if (arrAttr.length > 0) {
                sAttr = ' ' + arrAttr.join(' ');
            }
        }
        ret.push(this.__data__);
        return ret;
    }
    get previousSibling():VNode&IVNodeMethod|null{
        let p = this.parentNode;
        if (!p) {
            return null;
        }
        let chds = p.childNodes;
        let idx:number =Array.prototype.indexOf.call(chds,this);
        let node = chds[idx - 1];
        return node ? node : null;
    }
    get nextSibling():VNode&IVNodeMethod|null{
        let p = this.parentNode;
        if (!p) {
            return null;
        }
        let chds = p.childNodes;
        let idx:number = Array.prototype.indexOf.call(chds,this);
        let node = chds[idx + 1];
        return node ? node : null;
    }
}
let VNodeHelp:IVNodeMethod & VNode=(function(){
    let ret:IVNodeMethod&VNode=<any><IVNodeMethod>
    function(name: string, nodeType?: number):IVNodeMethod & VNode{
        return <any>null;
    };
    (<any>VNode).call(ret);
    return ret;
}());
