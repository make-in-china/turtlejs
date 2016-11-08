
/// <reference path='VNameNodeMap.ts'/>
/// <reference path='VStyle.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='../lib/Encode.ts'/>
/// <reference path='../lib/ClassList.ts'/>
/// <reference path='../core/Node.ts'/>
let 
        emptyTextNodeRE = /^\s*$/,
        styleListRE = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g,
        stringNode = {
            SCRIPT: /^\/script[>\s]/i,
            TEMPLATE: /^\/template[>\s]/i,
            STYLE: /^\/style[>\s]/i,
            TITLE: /^\/title[>\s]/i,
            TEXTAREA: /^\/textarea[>\s]/i,
            XMP: /^\/xmp[>\s]/i
        }

interface IVText extends IVNode {
    value: string
}

interface IVElement extends IVNode {
    innerHTML: string
    innerText: string
    outerHTML: string
}

interface IVComment extends IVNode {
    value: string
    __dbplus__: boolean
}
interface IVDocType extends IVNode {
}
interface Node {
    __vdomNode__: IVNode
}
interface IVNode {
    (name: string, nodeType: 8): IVComment;
    (name: string, nodeType: 3): IVText;
    (name: string, nodeType: 1): IVElement;
    (name: string, nodeType?: number): IVNode;
    __?: Object;
    __closeSelf__?: boolean
    __events__: [string, EventListenerOrEventListenerObject | undefined, boolean][]
    __isClose__: boolean;
    __domNode__: Node
    nodeType: number;
    data: string
    nodeName: string
    childNodes: IVNode[]
    children: IVNode[]
    parentNode: IVNode | null
    attributes: VNamedNodeMap;
    style: VStyle
    createElement(name: string): IVElement
    createTextNode(value: string): IVText
    createComment(value: string): IVComment
    append(name: string, nodeType: number): IVNode
    appendChild(vNode: IVNode): IVNode
    removeChild(vNode: IVNode): IVNode
    _(name: string, value?): IVNode | null;
    setAttribute(name: string, value): IVNode
    hasAttribute(name: string): boolean
    removeAttribute(name: string): void
    removeAttributeNode(item: Object): void
    getAttribute(name: string): any
    insertBefore(newNode: IVNode, node: IVNode): void
    insertBefore2(newNode: IVNode, node: IVNode): void
    addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void
    removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void
    cloneNode(): IVNode
    text(...agrs): IVNode
    text2(fn: Function): IVNode
    toXMLNodeString(): string[]
    toJS(): string
    toDOM(): Node
}
let VNode: IVNode = <any>(function () {
    function __VNode(this: IVNode) {
        this.setAttribute = setAttribute;
        this._ = _;
        this.__events__ = [];
        this.text = addText;
        this.text2 = addText2;
        this.append = append;
        this.appendChild = appendChild;
        this.removeChild = removeChild;
        this.hasAttribute = hasAttribute;
        this.removeAttribute = removeAttribute;
        this.removeAttributeNode = removeAttributeNode;
        this.getAttribute = getAttribute;
        this.insertBefore = insertBefore;
        this.insertBefore2 = insertBefore;
        this.cloneNode = cloneNode;
        this.valueOf = valueOf;
        this.toString = function () {
            return "[object HTML" + this.nodeName[0] + this.nodeName.substring(1).toLowerCase() + "Element]";
        }
        this.toXMLNodeString = toXMLNodeString
        this.addEventListener = addEventListener
        this.removeEventListener = removeEventListener
        this.toJS = toJS
        this.toDOM = toDOM
        Object.defineProperty(this, 'outerHTML', {
            get: function () {
                let
                    xmlNode = this.toXMLNodeString(),
                    cs = this.childNodes,
                    data = [xmlNode[0]];
                if (cs) {
                    for (let i = 0; i < cs.length; i++) {
                        data.push(cs[i].outerHTML);
                    }
                }
                if (xmlNode.length === 2) {
                    data.push(xmlNode[1]);
                }
                return data.join('');
            }
        });
        Object.defineProperty(this, 'previousSibling', {
            get: function () {
                let p = this.parentNode;
                if (!p) {
                    return null;
                }
                let chds = p.childNodes;
                let idx = chds.indexOf(this);
                let node = chds[idx - 1];
                return node ? node : null;
            }
        });
        Object.defineProperty(this, 'nextSibling', {
            get: function () {
                let p = this.parentNode;
                if (!p) {
                    return null;
                }
                let chds = p.childNodes;
                let idx = chds.indexOf(this);
                let node = chds[idx + 1];
                return node ? node : null;
            }
        });
        let arrGetSetEvents = ["onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onautocomplete", "onautocompleteerror", "onbeforecopy", "onbeforecut", "onbeforepaste", "oncopy", "oncut", "onpaste", "onsearch", "onselectstart", "onwheel", "onwebkitfullscreenchange", "onwebkitfullscreenerror"];
        function defineProtoGetSet(proto, name) {
            Object.defineProperty(proto, name, {
                get: function () {
                    if (this.__domNode__) {
                        return this.__domNode__[name];
                    } else {
                        return this.__[name];
                    }
                },
                set: function (v) {
                    if (this.__domNode__) {
                        this.__domNode__[name] = v;
                    } else {
                        this.__[name] = v;
                    }
                    return v;
                }
            });
        }
        Object.defineProperty(this, 'innerHTML', {
            get: getinnerHTML,
            set: setinnerHTML
        });
        Object.defineProperty(this, 'innerText', {
            get: getinnerText,
            set: setinnerText
        });
        for (let i in arrGetSetEvents) {
            defineProtoGetSet(this, arrGetSetEvents[i]);
        }
    }


    let closeSelf = new HashObject(
        'br,input,hr,map,img,area,base,link,meta,frame,param,basefont,col', null
    );


    /*function getOwnGetSets(name){
        let elem=document.createElement(name);
        let Elem=elem.constructor.prototype;
        let ownGetSets=[];
        if(Elem===HTMLElement.prototype){
            return ownGetSets;
        }
        for(let i in Elem){
            if(Elem.hasOwnProperty(i)){
                let desc=Object.getOwnPropertyDescriptor(Elem,i);
                if(desc.hasOwnProperty('get')&&desc.hasOwnProperty('set')){
                    try{
                    elem[i]="1";
                    if(elem.hasAttribute(i)){
                        ownGetSets.push(i);
                    }
                    }catch(e){
                    }
                }
            }
        }
        return ownGetSets;
    }
    let name="applet".toUpperCase();
    let a=name+':["'+getOwnGetSets(name).join('","')+'"],';
    copy(a);a;*/
    let htmlNodeInfo = {
        A: ["target", "download", "ping", "rel", "hreflang", "type", "coords", "charset", "name", "rev", "shape", "href"],
        AREA: ["alt", "coords", "shape", "target", "ping", "noHref", "href"],
        BASE: ["href", "target"],
        BLOCKQUOTE: ["cite"],
        BODY: ["text", "link", "vLink", "aLink", "bgColor", "background"],
        BR: ["clear"],
        CANVAS: ["width", "height"],
        CAPTION: ["align"],
        COL: ["span", "align", "vAlign", "width"],
        COLGROUP: ["span", "align", "vAlign", "width"],
        DIALOG: ["open"],
        DIR: ["compact"],
        DIV: ["align"],
        DL: ["compact"],
        FIELDSET: ["disabled", "name"],
        H1: ["align"],
        H2: ["align"],
        H3: ["align"],
        H4: ["align"],
        H5: ["align"],
        H6: ["align"],
        HR: ["align", "color", "noShade", "size", "width"],
        HTML: ["version"],
        IFRAME: ["src", "srcdoc", "name", "sandbox", "allowFullscreen", "width", "height", "align", "scrolling", "frameBorder", "longDesc", "marginHeight", "marginWidth"],
        IMG: ["alt", "src", "srcset", "sizes", "crossOrigin", "useMap", "isMap", "width", "height", "name", "lowsrc", "align", "hspace", "vspace", "longDesc", "border"],
        INPUT: ["accept", "alt", "autocomplete", "autofocus", "checked", "dirName", "disabled", "formAction", "formEnctype", "formMethod", "formNoValidate", "formTarget", "height", "max", "maxLength", "min", "minLength", "multiple", "name", "pattern", "placeholder", "readOnly", "required", "size", "src", "step", "type", "value", "width", "align", "useMap", "autocapitalize", "webkitdirectory", "incremental"],
        INS: ["cite", "dateTime"],
        KEYGEN: ["autofocus", "challenge", "disabled", "keytype", "name"],
        LEGEND: ["align"],
        LI: ["value", "type"],
        LINK: ["disabled", "href", "crossOrigin", "rel", "media", "hreflang", "type", "charset", "rev", "target", "integrity"],
        MAP: ["name"],
        MENU: ["compact"],
        META: ["name", "content", "scheme"],
        METER: ["value", "min", "max", "low", "high", "optimum"],
        OL: ["reversed", "start", "type", "compact"],
        OPTGROUP: ["disabled", "label"],
        OPTION: ["disabled", "label", "selected", "value"],
        OUTPUT: ["name"],
        P: ["align"],
        PARAM: ["name", "value", "type", "valueType"],
        PRE: ["width"],
        PROGRESS: ["value", "max"],
        Q: ["cite"],
        SCRIPT: ["src", "type", "charset", "async", "defer", "crossOrigin", "event", "integrity"],
        SELECT: ["autofocus", "disabled", "multiple", "name", "required", "size"],
        SOURCE: ["src", "type", "srcset", "sizes", "media"],
        STYLE: ["media", "type"],
        TABLE: ["align", "border", "frame", "rules", "summary", "width", "bgColor", "cellPadding", "cellSpacing"],
        TBODY: ["align", "vAlign"],
        TD: ["colSpan", "rowSpan", "headers", "align", "axis", "height", "width", "noWrap", "vAlign", "bgColor", "abbr", "scope"],
        TEXTAREA: ["autofocus", "cols", "dirName", "disabled", "maxLength", "minLength", "name", "placeholder", "readOnly", "required", "rows", "wrap", "autocapitalize"],
        TFOOT: ["align", "vAlign"],
        TH: ["colSpan", "rowSpan", "headers", "align", "axis", "height", "width", "noWrap", "vAlign", "bgColor", "abbr", "scope"],
        THEAD: ["align", "vAlign"],
        TR: ["align", "vAlign", "bgColor"],
        TRACK: ["kind", "src", "srclang", "label", "default"],
        UL: ["compact", "type"],
        VIDEO: ["width", "height", "poster"],
        XMP: ["width"]
    }

    function setGetSetPropertyWithAttribute(o, attributes, name) {
        let hideValueName = '__' + name + '__';
        Object.defineProperty(attributes, hideValueName, {
            value: "",
            writable: true,
            enumerable: false,
            configurable: false
        }
        )
        Object.defineProperty(o, name, {
            get: function () {
                return attributes[hideValueName];
            },
            set: function (s) {
                this.setAttribute(name, s);
            }
        });
    }
    function setProto(t) {
        let proto = htmlNodeInfo[t.nodeName];
        if (isArray(proto)) {
            // (htmlNodeInfo[t.nodeName] = t.__proto__ = newObject(t.nodeName[0] + t.nodeName.substring(1))).__proto__ = prototype;
            (htmlNodeInfo[t.nodeName] = t.__proto__ = {}).__proto__ = prototype;
            for (let i in proto) {
                setGetSetPropertyWithAttribute(t.__proto__, t.attributes, proto[i]);
            }
        } else {
            t.__proto__ = htmlNodeInfo[t.nodeName];
        }
    }
    function setClassName(o) {
        Object.defineProperty(o.attributes, '__class__', {
            value: "",
            writable: true,
            enumerable: false,
            configurable: false
        }
        )
        Object.defineProperty(o, 'className', {
            get: function () {
                let v = o.attributes.__class__;
                return v === undefined ? "" : v;
            },
            set: function (s) {
                o.setAttribute('class', s);
            }
        });
    }
    function isVText(node: IVNode): node is IVText {
        return node.nodeType === 3
    }
    function isVElement(node: IVNode): node is IVElement {
        return node.nodeType === 1
    }
    function isVComment(node: IVNode): node is IVComment {
        return node.nodeType === 8
    }
    function isVDocType(node: IVNode): node is IVDocType {
        return node.nodeType === 10
    }
    
    function defineClassList(object) {
        Object.defineProperty(object, 'classList', {
            enumerable: true,
            configurable: true,
            get: function () {
                if (this.__classList__) {
                    return this.__classList__;
                } else {
                    Object.defineProperty(this, '__classList__', {
                        writable: false,
                        enumerable: false,
                        configurable: false,
                        value: new ClassList(this)
                    });
                    return this.__classList__;
                }
            }
        });
    }
    function newVNode(name: string, nodeType: number): IVNode {
        //console.log(name);
        let t: IVNode = <any>function (name: string, nodeType: number) {
            if (name !== undefined) {
                return t.append(name, nodeType);
            } else {
                t.__isClose__ = true;
                return t.parentNode;
            }
        }
        if (nodeType === undefined) {
            nodeType = 1;
        }
        t.__ = {};
        t.childNodes = [];
        t.nodeType = nodeType;
        if (isVText(t)) {
            t.__proto__ = textNodePrototype;
            t.nodeName = '#text';
            if (isString(name)) {
                t.value = name//decodeHTML(name);    
            // } else {
            //     t.value = name.toString();
            }
            t.__isClose__ = true;
        } else
            if (isVElement(t)) {
                t.nodeName = name.toUpperCase();
                t.attributes = new VNamedNodeMap();
                t.children = [];
                t.__events__ = [];
                t.__isClose__ = t.__closeSelf__ = name in closeSelf;
                t.style = new VStyle(t, t.attributes);

                setClassName(t);
                defineClassList(t);
                if (t.nodeName in htmlNodeInfo) {
                    setProto(t);
                } else {
                    t.__proto__ = prototype;
                }
            } else
                if (isVComment(t)) {
                    t.nodeName = '#comment';
                    t.value = t.data = name;
                    t.__proto__ = prototype;
                    t.__isClose__ = true;
                } else
                    if (isVDocType(t)) {
                        t.nodeName = 'html';
                        t.__proto__ = prototype;
                        t.__isClose__ = true;
                    }
        t.parentNode = null;
        return t;
    }

    function append(name: string, nodeType: number): IVNode {
        return _appendChild.call(this, newVNode(name, nodeType));
    }
    function appendChild(this: IVNode, vNode: IVNode): IVNode {
        let idx = this.childNodes.indexOf(vNode);
        if (idx === -1) {
            return _appendChild.call(this, vNode);
        } else {
            return vNode;
        }
    }
    function _appendChild(this:IVNode,vNode: IVNode) {
        if (vNode instanceof Node) {
            throw new Error('虚拟DOM只能插入虚拟节点！');
        }
        this.childNodes.push(vNode);
        if (vNode.nodeType === 1) {
            this.children.push(vNode);
        }
        let p = vNode.parentNode;
        if (p) {
            p.removeChild(vNode);
        }
        vNode.parentNode = this;
        return vNode;
    }
    function removeChild(vNode: IVNode): IVNode {
        if (!vNode || this.childNodes.length === 0) {
            return vNode;
        }
        removeItem(this.childNodes, vNode);
        removeItem(this.children, vNode);
        vNode.parentNode = null;
        return vNode;
    }
    function addText(this: IVNode, ...agrs): IVNode {
        let s = agrs.join('\r\n');
        let t = (<IVNode>newVNode)(s, 3);
        this.appendChild(t);
        return this;
    }
    function addText2(this: IVNode, fn: Function): IVNode {
        // let t = newVNode($t.getFunctionComment(fn), 3, this.nodeName === 'PRE');
        let t = newVNode(getFunctionComment(fn), 3);
        this.appendChild(t);
        return this;
    }
    function removeAttribute(this: IVNode, name: string): void {
        this.attributes.removeNamedItem(name);
    }
    function removeAttributeNode(this: IVNode, item: Object): void {
        this.attributes.removeNamedItem(item);
    }
    function hasAttribute(name: string): boolean {
        return this.attributes.indexOfName(name) !== -1;
    }
    function setAttribute(name: string, value): IVNode {
        if (name && !emptyTextNodeRE.test(name)) {
            this.attributes.setNamedItem(name, value);
            return <any>getBind(this, setAttribute);
        } else {
            return this;
        }
    }
    function _(this: IVNode, name: string, value?): IVNode | null {
        if (name) {
            return setAttribute.call(this, name, value);
        } else {
            return this.parentNode;
        }
    }
    function getAttribute(name: string) {
        let item = this.attributes.getNamedItem(name);
        if (item) {
            return item.value;
        } else {
            return null;
        }
    }
    function valueOf() {
        if (this.__domNode__) {
            return this.__domNode__;
        } else {
            return this;
        }
    }
    function cloneNode(): IVNode {
        if (this.nodeType !== 1) {
            return newVNode(this.data, this.nodeType);
        }
        let node = newVNode(this.nodeName, this.nodeType);
        let attrs = this.attributes;
        for (let i = 0; i < attrs.length; i++) {
            node.setAttribute(attrs[i].name, attrs[i].value);
        }
        node.__isClose__ = this.__isClose__;
        node.__closeSelf__ = this.__closeSelf__;
        return node;
    }
    function insertBefore(this: IVNode, newNode: IVNode, node: IVNode): void {
        if (newNode instanceof Node) {
            throw new Error('虚拟DOM只能插入虚拟节点！');
        }
        let p1 = node.parentNode;
        if (!p1) {
            return;
        }
        let chds = p1.childNodes;
        let idx = chds.indexOf(node);
        if (idx === -1) {
            return;
        }
        let p2 = newNode.parentNode;
        if (p2) {
            p2.removeChild(newNode);
        }
        chds.splice(idx, 0, newNode);

        newNode.parentNode = p1;

        if (newNode.nodeType === 1) {
            if (idx >= chds.length) {
                chds.push(newNode);
            } else {
                let chds = p1.children;
                for (let i = idx; i < chds.length; i++) {
                    if (chds[i].nodeType === 1) {
                        chds.splice(i, 0, newNode);
                        return;
                    }
                }
                chds.push(newNode);
            }
        }
    }

    function getinnerText() {
        let s = "";
        switch (this.nodeType) {
            case 3:
                s += this.data;
                break;
            case 1:
                let chdns = this.childNodes;
                for (let i = 0; i < chdns.length; i++) {
                    s += encodeHTML(chdns[i].innerText);
                }
        }
        return s;
    }
    function setinnerText(s) {
        let chds;
        chds = this.children;
        for (let i in chds) {
            delete chds[i];
        }
        chds = this.childNodes;
        for (let i in chds) {
            delete chds[i];
        }
        this.appendChild(newVNode(decodeHTML(s), 3));
    }
    function setinnerHTML(s) {
        this.children.length = 0;
        this.childNodes.length = 0;
        if (!isString(s)) {
            s = s.toString();
        }
        if (this.nodeName in stringNode) {
            this.appendChild(VNode(s, 3));
        } else {
            VDOM(s, this);
        }
    }
    function getinnerHTML() {
        let
            cs = this.childNodes,
            data = [];
        if (cs) {
            for (let i = 0; i < cs.length; i++) {
                data.push(cs[i].outerHTML);
            }
        }
        return data.join('');
    }
    function connectParent(self, elem) {
        let p = self.parentNode;
        if (p && p.__domNode__) {
            let pE = p.__domNode__;
            if (pE.childNodes.length === 0) {
                pE.appendChild(elem);
            } else {
                let node = self;
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
                        node = self;
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
                                    } else {
                                        console.log(elem2.innerHTML);
                                        debugger;
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
    function toXMLNodeString(this: IVNode): string[] {
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
        if (isVElement(me)) {
            ret.push('<' + me.nodeName.toLowerCase() + sAttr + '>');
            if (!me.__closeSelf__ && me.__isClose__) {
                ret.push('</' + me.nodeName.toLowerCase() + '>');
            }
        } else if (isVText(me)) {
            ret.push(me.data);
        } else if (isVComment(me)) {
            if (me.__dbplus__) {
                ret.push('<!--' + me.data + '-->');
            } else {
                ret.push('<!' + me.data + '>');
            }
        } else if (isVDocType(me)) {
            ret.push('<!DOCTYPE html>');
        }
        return ret;
    }
    function addEventListener(this: IVNode, name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void {
        if (this.nodeType !== 1) {
            return;
        }
        if (!useCapture) {
            useCapture = false;
        }
        this.__events__.push([name, fn, useCapture]);
    }
    function removeEventListener(this: IVNode, name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void {
        debugger;
        if (this.nodeType !== 1) {
            return;
        }
        if (!useCapture) {
            useCapture = false;
        }
        let arr = this.__events__;
        for (let i = 0; i < arr.length; i++) {
            let e = arr[i];
            if (e[0] === name && e[1] === fn && e[2] === useCapture) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
    function toJS(this: IVNode): string {
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
            sBegin = '$VNode';
        }
        if (this.nodeType === 1) {
            sBegin += '("' + this.nodeName + '")';
            if (this.attributes.length > 0) {
                sAttr = '._';
                let attrs = this.attributes;
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
            let chds = this.childNodes;
            if (chds.length > 0) {
                for (let i = 0; i < chds.length; i++) {
                    sInner += chds[i].toJS();
                }
            }
        } else {
            s = this.data;
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
            sBegin += '("' + s + '",' + this.nodeType + ')';
        }
        return sBegin + sAttr + sInner + sEnd;
    }
    function toDOM(this: IVNode): Node {
        let elem: Node;
        switch (this.nodeType) {
            case 1:
                if (this.__domNode__) {
                    elem = this.__domNode__;
                    return elem;
                }
                elem = document.createElement(this.nodeName);
                this.__domNode__ = elem;
                break;
            case 3:
                if (this.__domNode__) {
                    return this.__domNode__;
                }
                if (this.data !== "") {
                    toHelp.innerHTML = this.data;
                    elem = toHelp.removeChild(toHelp.childNodes[0]);
                    //elem=document.createTextNode(this.data);不用这句的原因是为了转码
                } else {
                    elem = document.createTextNode('');
                }
                this.__domNode__ = elem;
                break;
            case 8:
                if (this.__domNode__) {
                    return this.__domNode__;
                }
                elem = document.createComment(this.data);
                this.__domNode__ = elem;
                break;
            case 10:
            default:
                if (this.__domNode__) {
                    return this.__domNode__;
                }
                // toHelp.innerHTML = this.outerHTML;
                toHelp.innerHTML = this.data;
                elem = toHelp.removeChild(toHelp.childNodes[0]);
                this.__domNode__ = elem;
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
        connectParent(this, elem);
        if (isVElement(this)) {
            if (this.nodeName === 'PRE') {
                if (this.childNodes.length > 0) {
                    (<Element>elem).innerHTML = decodeHTML(this.childNodes[0].data);
                }
            } else {
                let chds = this.childNodes;
                for (let j = 0; j < chds.length; j++) {
                    chds[j].toDOM();
                }
            }
        }
        delegateNode(this);
        elem.__vdomNode__ = this;
        return elem;
    }

    function VtextNode() {
        this.__proto__ = prototype;
        this.__value__ = '';
        let defineDesc = {
            get: function () {
                return this.__value__;
            },
            set: function (s) {
                this.__value__ = s;
            }
        }
        Object.defineProperty(this, 'data', defineDesc);
        Object.defineProperty(this, 'value', defineDesc);
    }
    let prototype = new __VNode();
    let textNodePrototype = new VtextNode();
    function getHomology(name) {
        return function () {
            this.__proto__[name].apply(this, arguments);
            return this.__domNode__[name].apply(this.__domNode__, arguments);
        }
    }
    function getDOMHomology(name) {
        return function () {
            let objects = [], toDOMs = [];
            for (let i = 0; i < arguments.length; i++) {
                let o = arguments[i].valueOf();
                if (o === arguments[i]) {
                    toDOMs.push(o);
                    o = o.toDOM();
                }
                objects.push(o);

            }
            this.__proto__[name].apply(this, arguments);
            let ret = this.__domNode__[name].apply(this.__domNode__, objects);
            for (let i = 0; i < toDOMs.length; i++) {
                let chds = toDOMs[i].childNodes;
                for (let j = 0; j < chds.length; j++) {
                    let chds2 = chds[j].childNodes;
                    if (chds2.length !== chds[j].__domNode__.childNodes.length) {
                        for (let k = 0; k < chds2.length; k++) {
                            if (chds2[k].__domNode__.parentNode === null) {
                                connectParent(chds2[k], chds2[k].__domNode__);
                            }
                        }
                    }
                }
            }
            return ret;
        }
    }
    function getBridge(name) {
        return function () {
            return this.__domNode__[name].apply(this.__domNode__, arguments);
        }
    }
    let osetAttribute = getBridge('setAttribute');
    let ohasAttribute = getBridge('hasAttribute');
    let oremoveAttribute = getBridge('removeAttribute');
    let oremoveAttributeNode = getBridge('removeAttributeNode');
    let oappendChild = getDOMHomology('appendChild');
    let oremoveChild = (function () {
        return function (node) {
            if (node.parentNode) {
                if (node.__domNode__) {
                    //try{
                    //
                    this.__domNode__.removeChild(node.__domNode__);
                    //}catch(e){

                    //}
                }
            } else {
                debugger;
            }
            return this.__proto__.removeChild.call(this, node);
        }
    } ());
    let oinsertBefore = getDOMHomology('insertBefore');
    let oinsertBefore2 = getDOMHomology('insertBefore2');
    let oaddEventListener = getHomology('addEventListener');
    let oremoveEventListener = getHomology('removeEventListener');
    let oGetstyle = function () { return this.__domNode__.style };
    let oGetclassList = function () { return this.__domNode__.classList };
    let oGetoffsetTop = function () { return this.__domNode__.offsetTop };
    let oGetoffsetLeft = function () { return this.__domNode__.offsetLeft };
    let oGetoffsetWidth = function () { return this.__domNode__.offsetWidth };
    let oGetoffsetHeight = function () { return this.__domNode__.offsetHeight };
    //let oGetouterHTML=function(){return this.__domNode__.outerHTML};
    let oGetattributes = function () { return this.__domNode__.attributes };
    let otoString = function () { return this.__domNode__.toString.apply(this.__domNode__, arguments) };
    function delegateNode(o) {
        if (o.nodeType === 1) {
            o.setAttribute = osetAttribute;
            o.hasAttribute = ohasAttribute;
            o.appendChild = oappendChild;
            o.removeChild = oremoveChild;
            o.removeAttribute = oremoveAttribute;
            o.removeAttributeNode = oremoveAttributeNode;
            o.insertBefore = oinsertBefore;
            o.insertBefore2 = oinsertBefore2;
            o.toString = otoString;
            o.addEventListener = oaddEventListener;
            o.removeEventListener = oremoveEventListener;
            Object.defineProperty(o, 'style', {
                get: oGetstyle
            });
            Object.defineProperty(o, 'classList', {
                get: oGetclassList
            });
            Object.defineProperty(o, 'offsetTop', {
                get: oGetoffsetTop
            });
            Object.defineProperty(o, 'offsetLeft', {
                get: oGetoffsetLeft
            });
            Object.defineProperty(o, 'offsetWidth', {
                get: oGetoffsetWidth
            });
            Object.defineProperty(o, 'offsetHeight', {
                get: oGetoffsetHeight
            });
            Object.defineProperty(o, 'attributes', {
                get: oGetattributes
            });
            switch (o.nodeName) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    Object.defineProperty(o, 'value', {
                        get: function () {
                            return this.__domNode__.value;
                        },
                        set: function (s) {
                            this.__domNode__.value = s;
                        }
                    });
                case "INPUT":
                    Object.defineProperty(o, 'checked', {
                        get: function () {
                            return this.__domNode__.checked;
                        },
                        set: function (s) {
                            this.__domNode__.checked = s;
                        }
                    });
                    break;
            }
        } else if (o.nodeType === 3) {
            Object.defineProperty(o, 'data', {
                get: function () {
                    return this.__value__;
                },
                set: function (s) {
                    this.__value__ = s;
                    this.__domNode__.data = s;
                }
            });
            Object.defineProperty(o, 'value', {
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
    return newVNode;
})();
