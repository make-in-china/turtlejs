
interface Node {
    insertBefore2<T extends INode|Node>(newNode: T, node?: T): T;
}
interface IVText extends IVNode {
    value: string;
    data: string;
}

interface IVElement extends IVNode {
    innerHTML: string
    innerText: string
    outerHTML: string
}

interface IVComment extends IVNode {
    __dbplus__: boolean
    data: string;
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
    __data:string
    __?: Object;
    __closeSelf__?: boolean;
    __events__: [string, EventListenerOrEventListenerObject | undefined, boolean][];
    __isClose__: boolean;
    __domNode__: Node;
    nodeType: number;
    nodeName: string;
    childNodes: IVNode[];
    children: IVNode[];
    parentNode: IVNode | null;
    attributes: VNamedNodeMap;
    style: VStyle;
    createElement(name: string): IVElement;
    createTextNode(value: string): IVText;
    createComment(value: string): IVComment;
    append(name: string, nodeType: number): IVNode;
    appendChild(vNode: IVNode): IVNode;
    removeChild(vNode: IVNode): IVNode;
    _(name: string, value?): IVNode | null;
    setAttribute(name: string, value): IVNode;
    hasAttribute(name: string): boolean;
    removeAttribute(name: string): void;
    removeAttributeNode(item: Object): void;
    getAttribute(name: string): string|null;
    insertBefore(newNode: IVNode, node: IVNode): void;
    insertBefore2(newNode: IVNode, node: IVNode): void;
    addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    cloneNode(): IVNode;
    text(...agrs): IVNode;
    text2(fn: Function): IVNode;
    toXMLNodeString(): string[];
    toJS(): string;
    toDOM(): Node;
    previousSibling:IVNode|null
    nextSibling:IVNode|null
}