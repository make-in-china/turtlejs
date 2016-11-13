
/// <reference path='../core/EventEmitterEx.ts'/>
/// <reference path='../lib/ArrayEx.ts'/>
/// <reference path='../lib/TreeEach.ts'/>
/// <reference path='../lib/lib.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path="Server.ts"/>
/// <reference path="PartTemplate.ts"/>

interface IComment {
    __part__?: Part;
    __sign__?: number;
}
interface IPartRefs {
    [index: string]: INode | undefined
    resize?: IHTMLElement
    main?: IHTMLElement
    begin: IComment
    end: IComment
}
class Part extends EventEmitterEx {
    //属性
    /**组件名*/
    partName: string;
    /**
     * 是否已插入DOM
     */
    isInDOM: boolean;
    /**
     * 组件的方法属性
     */
    $: Service;

    /** DOM节点存储数组 */
    protected nodeStore: INode[] = [];

    /**节点命名空间 */
    refs: IPartRefs

    // basePart:PartBase;

    /**资源路径 */
    resPath: string;


    //事件管理器
    /**resize事件管理器*/
    $resize = this.getEventHelper<
        (this: void, part: Part) => void,
        (this: void, part: Part) => boolean>("resize");

    /**init事件管理器 */
    $init = this.getEventHelper<
        (this: void, part: Part) => void,
        (this: void, part: Part) => boolean>("init");

    /**insert事件管理器 */
    $online = this.getEventHelper<
        (this: void, part: Part, node: IHTMLElement) => void,
        (this: void, part: Part, node: IHTMLElement) => boolean>("online");

    /**remove事件管理器 */
    $offline = this.getEventHelper<
        (this: void, part: Part) => void,
        (this: void, part: Part) => boolean>("offline");

    /**初始化对象 */
    constructor(public template: PartTemplate, public props: Object, html: string, outerChildNodes: INode[], outerElement: IHTMLCollection) {
        // constructor(public template: PartTemplate, extPart: Part | undefined, public props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection) {
        super();
        this.$ = new Service(template.service);
        this.partName = template.partName;
        // if(extPart){
        //     /**继承 */
        //     this.__proto__=extPart;   
        // }
        // if(!isUndefined(extPart)){
        //     this.super=extPart;
        // }
        let dom = $DOM(html);
        let nodes = dom.childNodes;

        initHTML(nodes, outerChildNodes, outerElement, props, this);
        for (let i = nodes.length; i > 0; i--) {
            this.nodeStore.push(dom.removeChild(nodes[0]));
        }
        let name = template.name;
        let begin: IComment = $node(name, 8);// document.createComment('<'+name+'>');
        let end: IComment = $node('/' + name, 8);//document.createComment('</'+name+'>')
        end.__part__ = begin.__part__ = this;
        begin.__sign__ = 1;
        end.__sign__ = 0;
        this.refs = {
            begin: begin,
            end: end
        };
        // this.super=extPart;
        this.resPath = template.path + '/' + template.name + '.res';
        // let sp:PartBase=this;
        // while(sp.super){
        //     sp=sp.super
        // }
        // this.basePart=sp?sp:this;
        // this.basePart.isInDOM=false;


        initHTML(nodes, outerChildNodes, outerElement, props, this);
        // if(extPart){
        //     (<ExtendsPart>extPart).to(this);
        // }
        let store = this.nodeStore;
        store.push.apply(store, nodes);
        for (let i = nodes.length; i > 0; i--) {
            dom.removeChild(nodes[0]);
        }
        store.unshift(begin);
        store.push(end);
        this.$init.emit(this);
    }

    /**即时子Part数组 */
    get child(): Part[] { return getParts(this.elements); }

    /**子节点数目 */
    get elementLength() {
        if (this.isInDOM) {
            return this.nodeStore.length;
        } else {
            return 1;
        }
    }
    /**即时读取子节点 */
    get elements(): INode[] {
        // if(this.isExtends){
        //     return new ArrayEx<INode>();
        // }
        if (this.isInDOM) {
            try {
                let elements = new ArrayEx<INode>();
                let node = this.refs.begin.nextSibling;
                let end = this.refs.end;
                while (node&&node !== end) {
                    elements.push(node);
                    node = node.nextSibling;
                }
                return elements;
            } catch (e) {
                // _catch(e);
                return new ArrayEx<INode>();
            }
        }
        if (isArray(this.nodeStore)) {
            return this.nodeStore.slice().splice(1, this.nodeStore.length - 2);
        } else {
            return new ArrayEx<INode>();
        }
    }
    /**读取父组件 */
    get parent() {
        return getParentPart(this.refs.begin);
    }
    /**读取组件下所有DOM节点 */
    get innerHTML() {
        return nodesToString(this.elements);
    }
    /**读取父节点 */
    get elemParent() {
        return this.refs.begin.parentNode;
    }
    get scopeNodes() {
        let scopeNodes = [];
        treeEach(this.elements, "children", function (node) {
            if (node.hasOwnProperty("scope")) {
                scopeNodes.push(node);
                return eTreeEach.c_noIn;
            }
        });
        return scopeNodes;
    }
    /**设置组件宽高 
     * @param {ClientRect} rect 区块
    */
    set size(rect: ClientRect) {

        if (this.refs.resize) {
            let style = this.refs.resize.style;
            style.left = rect.left + 'px';
            style.top = rect.top + 'px';
            style.width = rect.width + 'px';
            style.height = rect.height + 'px';
            style.boxSizing = 'border-box';
            // this.emitResize();
            this.$resize.emit(this);
        }
        // if(this.onSetSize){
        //     return this.onSetSize(rect);
        // }
        // if(this.super){
        //     this.super.setSize(rect);
        // }
    }
    /**获取组件区块（试验） */
    get size(): ClientRect {
        if (this.isInDOM) {
            let rects: Array<[number, number, number, number]> = [];
            let rt;
            //let recalNode           = document.createElement('div');

            //recalNode.setAttribute('style',"width:0 !important;height:0 !important;margin-left:0 !important;margin-right:0 !important;");

            // insertNodeBefore(this.begin,recalNode);
            // rt=[recalNode.offsetLeft,recalNode.offsetTop];
            // insertNodeBefore(this.end,recalNode);
            // rt.push(recalNode.offsetLeft,recalNode.offsetTop);
            // removeNode(recalNode);
            // rects.push(rt);
            let cs = this.elements;
            let elem: IElement;
            let dom: IElement = <any>document.documentElement;
            for (let i = 0; i < cs.length; i++) {
                elem = <IElement>cs[i].valueOf();
                if (elem.nodeType === 1) {
                    let l = 0, t = 0;
                    let elem2 = elem;
                    while (elem2 !== dom) {
                        t += elem2.offsetTop;
                        l += elem2.offsetLeft;
                        elem2 = <IElement>elem2.parentNode;
                    }
                    rects.push([l, t, elem.offsetWidth, elem.offsetHeight]);
                }
            }

            let rect = { left: 0x7fffffff, top: 0x7fffffff, width: 0, height: 0, right: 0, bottom: 0 }
            for (let i = 0; i < rects.length; i++) {
                rt = rects[i];
                if (rt[0] < rect.left) {
                    rect.left = rt[0];
                }
                if (rt[1] < rect.top) {
                    rect.top = rt[1];
                }
                let right: number = rt[0] + rt[2];
                let bottom: number = rt[1] + rt[3];
                if (right > rect.right) {
                    rect.right = right;
                }
                if (bottom > rect.bottom) {
                    rect.bottom = bottom;
                }
            }
            rect.width = rect.right - rect.left;
            rect.height = rect.bottom - rect.top;
            return rect;
        } else {
            return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };
        }
    }
    //API
    // emitResize(){
    //     try{
    //         if(!this.isInDOM){
    //             return;
    //         }
    //         if(this.onresize){
    //             if(this.onresize()){
    //                 return;
    //             }   
    //         }
    //         let cs=this.child;
    //         for(let i=0;i<cs.length;i++){
    //             cs[i].emitResize();
    //         }
    //     }catch(e){
    //         _catch(e);
    //     }
    // }
    // getSuper(name:string){
    //     if(this.super){
    //         if(this.super.template.name===name){
    //             return this.super;    
    //         }else{
    //             return this.super.getSuper(name);
    //         }
    //     }
    // }
    // emitInit(finalPart){
    //     if(this.super){
    //         this.super.emitInit(finalPart);
    //     }
    //     if(isFunction(this.oninit)){
    //         this.oninit(finalPart);
    //     }
    // }
    toString() {
        return this.template.partName + ":" + JSON.stringify(this.props);
    }
    treeDiagram(tabSpace) {
        if (tabSpace === undefined) {
            tabSpace = 0;
        }
        let s = "\r\n" + new Array(tabSpace + 1).join(" ") + this.toString();
        let child = this.child;
        for (let i = 0; i < child.length; i++) {
            s += child[i].treeDiagram(tabSpace + 8);
        }
        return s;
    }

    insertTo(elem) {
        if (this.isInDOM) {
            let elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            /*cut scope*/
            let scopeNodes = this.scopeNodes;
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].scope);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
        } else {
            appendNodes(this.nodeStore, elem);
            /*link scope*/
            let scopeNodes = this.scopeNodes;
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
            this.isInDOM = true;
            // if(isFunction(this.oninsert)){
            //     this.oninsert();
            // }
        }
    }
    insertBefore(elem) {

        if (this.isInDOM) {
            let elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            /*cut scope*/
            let scopeNodes = this.scopeNodes;
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].scope);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
        } else {
            insertNodesBefore(elem, this.nodeStore);
            /*link scope*/
            let scopeNodes = this.scopeNodes;
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
            // this.basePart.isInsert=true;
            // if(isFunction(this.oninsert)){
            //     this.oninsert();
            // }
        }
    }

    remove() {
        if (this.isInDOM) {
            let elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            let scopeNodes = this.scopeNodes;
            /*cut scope*/
            for (let i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].scope);
            }
            let p = this.refs.begin.parentNode;
            if (p !== null) {
                for (let i = 0; i < elems.length; i++) {
                    p.removeChild(elems[i]);
                }
            }
            this.nodeStore = elems;
            // this.basePart.isInsert=false;
            this.$offline.emit(this);
            if (this.parent) {
                this.parent.$resize.emit(this);
            }
        }
    }
}