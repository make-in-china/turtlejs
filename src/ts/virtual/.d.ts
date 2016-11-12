
interface Node {
    insertBefore2<T extends INode|Node>(newNode: T, node?: T): T;
}
interface Node {
    __vdomNode__: VNode&IVNodeMethod
}
type VNodeType=1|3|8|10;
interface IVNodeMethod{
    (name: string, nodeType: 10): VDocumentType&IVNodeMethod;
    (name: string, nodeType: 8): VComment&IVNodeMethod;
    (name: string, nodeType: 3): VText&IVNodeMethod;
    (name: string, nodeType?: 1): VHTMLElement&IVNodeMethod;
    (name: string, nodeType: VNodeType): VNode&IVNodeMethod;
    // (name: string, nodeType: undefined): VElement&IVNodeMethod;
    // (name: string, nodeType?: number): VNode&IVNodeMethod;
}
// interface IVNode extends INode {
//     /**private */__data:string;
//     /**private */__: Object;
//     __closeSelf__?: boolean;
//     __events__: [string, EventListenerOrEventListenerObject | undefined, boolean][];
//     __isClose__: boolean;
//     __domNode__: Node;
//     nodeType: number;
//     nodeName: string;
//     childNodes: VNodeList;
//     children: VHTMLCollection;
//     // parentNode: IVNode | null;
//     style: VStyle;
//     createElement(name: string): IVElement;
//     createTextNode(value: string): IVText;
//     createComment(value: string): IVComment;
//     append(name: string, nodeType: number): IVNode;
//     appendChild(vNode: IVNode): IVNode;
//     removeChild(vNode: IVNode): IVNode;
//     _(name: string, value?): IVNode | null;
//     setAttribute(name: string, value): IVNode;
//     hasAttribute(name: string): boolean;
//     removeAttribute(name: string): void;
//     removeAttributeNode(item: Object): void;
//     getAttribute(name: string): string|null;
//     insertBefore(newNode: IVNode, node: IVNode): IVNode;
//     insertBefore2(newNode: IVNode, node: IVNode): IVNode;
//     addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
//     removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
//     cloneNode(): IVNode;
//     text(...agrs): IVNode;
//     text2(fn: Function): IVNode;
//     toXMLNodeString(): string[];
//     toJS(): string;
//     toDOM(): Node;
//     previousSibling:IVNode|null
//     nextSibling:IVNode|null
// }