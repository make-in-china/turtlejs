
/// <reference path="../lib/ArrayEx.ts"/>
/// <reference path="IAttr.ts"/>

interface INamedNodeMap{
    [index:number]:IAttr
    indexOfName(name:string):number
    indexOf(o:any):number
    getNamedItem(name:string):IAttr|null
    //getNamedItemNS: getNamedItemNS()
    item(index:number):IAttr|undefined
    readonly length:number
    removeNamedItem(v:string|Object):void
    //removeNamedItemNS: removeNamedItemNS()
    setNamedItem(arg:IAttr):void
    //setNamedItemNS: setNamedItemNS()
}

interface IExp{
    (...arg:any[]):any
    __me__:IExp
}
interface INodeList {
    length: number;
    item(index: number): INode|undefined;
    [index: number]: INode|undefined;
}

interface IHTMLCollectionOf<T extends IElement> extends IHTMLCollection {
    item(index: number): T;
    namedItem(name: string): T;
}
interface INode extends EventTarget {
    toDOM():Node
    insertBefore2(newChild: INode, refChild: INode): INode;
    readonly childNodes: INodeList;
    readonly nextSibling: INode | null;
    // readonly parentElement: IHTMLElement | null;

    // readonly attributes: INamedNodeMap;
    // readonly baseURI: string | null;
    // readonly firstChild: INode | null;
    // readonly lastChild: INode | null;
    // readonly localName: string | null;
    // readonly namespaceURI: string | null;
    readonly nodeName: string;
    readonly nodeType: number;
    // nodeValue: string | null;
    // readonly ownerDocument: Document;
    readonly parentNode: INode | null;
    readonly previousSibling: INode | null;
    // textContent: string | null;
    appendChild<T extends INode>(newChild: T): T;
    cloneNode(deep?: boolean): INode;
    // compareDocumentPosition(other: INode): number;
    // contains(child: INode): boolean;
    // hasAttributes(): boolean;
    // hasChildNodes(): boolean;
    insertBefore(newChild: INode, refChild: INode | null): INode;
    // isDefaultNamespace(namespaceURI: string | null): boolean;
    // isEqualNode(arg: INode): boolean;
    // isSameNode(other: INode): boolean;
    // lookupNamespaceURI(prefix: string | null): string | null;
    // lookupPrefix(namespaceURI: string | null): string | null;
    normalize(): void;
    removeChild(oldChild: INode): INode;
    replaceChild(newChild: INode, oldChild: INode): INode;
    // readonly ATTRIBUTE_NODE: number;
    // readonly CDATA_SECTION_NODE: number;
    // readonly COMMENT_NODE: number;
    // readonly DOCUMENT_FRAGMENT_NODE: number;
    // readonly DOCUMENT_NODE: number;
    // readonly DOCUMENT_POSITION_CONTAINED_BY: number;
    // readonly DOCUMENT_POSITION_CONTAINS: number;
    // readonly DOCUMENT_POSITION_DISCONNECTED: number;
    // readonly DOCUMENT_POSITION_FOLLOWING: number;
    // readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    // readonly DOCUMENT_POSITION_PRECEDING: number;
    // readonly DOCUMENT_TYPE_NODE: number;
    // readonly ELEMENT_NODE: number;
    // readonly ENTITY_NODE: number;
    // readonly ENTITY_REFERENCE_NODE: number;
    // readonly NOTATION_NODE: number;
    // readonly PROCESSING_INSTRUCTION_NODE: number;
    // readonly TEXT_NODE: number;
}
interface IElementTraversal {
    childElementCount: number;
    firstElementChild: IElement;
    lastElementChild: IElement;
    nextElementSibling: IElement;
    previousElementSibling: IElement;
}

interface INodeListOf<ITNode extends INode> extends INodeList {
    length: number;
    item(index: number): ITNode;
    [index: number]: ITNode;
}

interface INodeSelector {
    querySelector(selectors: string): IElement;
    querySelectorAll(selectors: string): INodeListOf<IElement>;
}

interface IChildNode {
    remove(): void;
}
interface IElement extends INode, GlobalEventHandlers, IElementTraversal, INodeSelector, IChildNode {
    valueOf():IElement;
    readonly classList: DOMTokenList;
    className: string;
    readonly clientHeight: number;
    readonly clientLeft: number;
    readonly clientTop: number;
    readonly clientWidth: number;
    id: string;
    innerHTML: string;
    msContentZoomFactor: number;
    readonly msRegionOverflow: string;
    onariarequest: (this: IElement, ev: Event) => any;
    oncommand: (this: IElement, ev: Event) => any;
    ongotpointercapture: (this: IElement, ev: PointerEvent) => any;
    onlostpointercapture: (this: IElement, ev: PointerEvent) => any;
    onmsgesturechange: (this: IElement, ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (this: IElement, ev: MSGestureEvent) => any;
    onmsgestureend: (this: IElement, ev: MSGestureEvent) => any;
    onmsgesturehold: (this: IElement, ev: MSGestureEvent) => any;
    onmsgesturestart: (this: IElement, ev: MSGestureEvent) => any;
    onmsgesturetap: (this: IElement, ev: MSGestureEvent) => any;
    onmsgotpointercapture: (this: IElement, ev: MSPointerEvent) => any;
    onmsinertiastart: (this: IElement, ev: MSGestureEvent) => any;
    onmslostpointercapture: (this: IElement, ev: MSPointerEvent) => any;
    onmspointercancel: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerdown: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerenter: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerleave: (this: IElement, ev: MSPointerEvent) => any;
    onmspointermove: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerout: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerover: (this: IElement, ev: MSPointerEvent) => any;
    onmspointerup: (this: IElement, ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (this: IElement, ev: Event) => any;
    onwebkitfullscreenerror: (this: IElement, ev: Event) => any;
    outerHTML: string;
    readonly prefix: string | null;
    readonly scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    readonly scrollWidth: number;
    readonly tagName: string;
    readonly assignedSlot: HTMLSlotElement | null;
    slot: string;
    readonly shadowRoot: ShadowRoot | null;
    getAttribute(name: string): string | null;
    getAttributeNS(namespaceURI: string, localName: string): string;
    getAttributeNode(name: string): Attr;
    getAttributeNodeNS(namespaceURI: string, localName: string): Attr;
    getBoundingClientRect(): ClientRect;
    getClientRects(): ClientRectList;
    getElementsByTagName<K extends keyof ElementListTagNameMap>(name: K): ElementListTagNameMap[K];
    getElementsByTagName(name: string): INodeListOf<IElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): IHTMLCollectionOf<IHTMLElement>;
    getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): IHTMLCollectionOf<ISVGElement>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): IHTMLCollectionOf<IElement>;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespaceURI: string, localName: string): boolean;
    msGetRegionContent(): MSRangeCollection;
    msGetUntransformedBounds(): ClientRect;
    msMatchesSelector(selectors: string): boolean;
    msReleasePointerCapture(pointerId: number): void;
    msSetPointerCapture(pointerId: number): void;
    msZoomTo(args: MsZoomToOptions): void;
    releasePointerCapture(pointerId: number): void;
    removeAttribute(qualifiedName: string): void;
    removeAttributeNS(namespaceURI: string, localName: string): void;
    removeAttributeNode(oldAttr: Attr): Attr;
    requestFullscreen(): void;
    requestPointerLock(): void;
    setAttribute(name: string, value: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    setAttributeNode(newAttr: Attr): Attr;
    setAttributeNodeNS(newAttr: Attr): Attr;
    setPointerCapture(pointerId: number): void;
    webkitMatchesSelector(selectors: string): boolean;
    webkitRequestFullScreen(): void;
    webkitRequestFullscreen(): void;
    getElementsByClassName(classNames: string): INodeListOf<IElement>;
    matches(selector: string): boolean;
    closest(selector: string): IElement | null;
    scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
    scroll(options?: ScrollToOptions): void;
    scroll(x: number, y: number): void;
    scrollTo(options?: ScrollToOptions): void;
    scrollTo(x: number, y: number): void;
    scrollBy(options?: ScrollToOptions): void;
    scrollBy(x: number, y: number): void;
    insertAdjacentElement(position: string, insertedElement: IElement): IElement | null;
    insertAdjacentHTML(where: string, html: string): void;
    insertAdjacentText(where: string, text: string): void;
    attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot;
    addEventListener<K extends keyof ElementEventMap>(type: K, listener: (this: IElement, ev: ElementEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
interface ICharacterData extends INode, IChildNode {
    data: string;
    length: number;
    appendData(arg: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, arg: string): void;
    replaceData(offset: number, count: number, arg: string): void;
    substringData(offset: number, count: number): string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface IText extends ICharacterData {
    wholeText: string;
    replaceWholeText(content: string): Text;
    splitText(offset: number): Text;
}
interface IComment extends ICharacterData {
    textContent: string;
}
interface IHTMLCollectionBase {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    readonly length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(index: number): IElement;
    [index: number]: IElement;
}
interface IHTMLCollection extends IHTMLCollectionBase {
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): IElement | null;
}
// interface IHTMLCollection {
//     /**
//       * Sets or retrieves the number of objects in a collection.
//       */
//     length: number;
//     /**
//       * Retrieves an object from various collections.
//       */
//     item(nameOrIndex?: any, optionalIndex?: any): IHTMLElement|undefined;
//     /**
//       * Retrieves a select object or an object from an options collection.
//       */
//     namedItem(name: string): IHTMLElement;
//     [index: number]: IHTMLElement|undefined;
// }
interface IHTMLElement extends IElement {
    attributes: INamedNodeMap
    accessKey: string;
    children: IHTMLCollection;
    contentEditable: string;
    dataset: DOMStringMap;
    dir: string;
    draggable: boolean;
    hidden: boolean;
    hideFocus: boolean;
    innerHTML: string;
    innerText: string;
    isContentEditable: boolean;
    lang: string;
    offsetHeight: number;
    offsetLeft: number;
    offsetParent: IHTMLElement;
    offsetTop: number;
    offsetWidth: number;
    onabort: (ev: Event) => any;
    onactivate: (ev: UIEvent) => any;
    onbeforeactivate: (ev: UIEvent) => any;
    onbeforecopy: (ev: DragEvent) => any;
    onbeforecut: (ev: DragEvent) => any;
    onbeforedeactivate: (ev: UIEvent) => any;
    onbeforepaste: (ev: DragEvent) => any;
    onblur: (ev: FocusEvent) => any;
    oncanplay: (ev: Event) => any;
    oncanplaythrough: (ev: Event) => any;
    onchange: (ev: Event) => any;
    onclick: (ev: MouseEvent) => any;
    oncontextmenu: (ev: PointerEvent) => any;
    oncopy: (ev: DragEvent) => any;
    oncuechange: (ev: Event) => any;
    oncut: (ev: DragEvent) => any;
    ondblclick: (ev: MouseEvent) => any;
    ondeactivate: (ev: UIEvent) => any;
    ondrag: (ev: DragEvent) => any;
    ondragend: (ev: DragEvent) => any;
    ondragenter: (ev: DragEvent) => any;
    ondragleave: (ev: DragEvent) => any;
    ondragover: (ev: DragEvent) => any;
    ondragstart: (ev: DragEvent) => any;
    ondrop: (ev: DragEvent) => any;
    ondurationchange: (ev: Event) => any;
    onemptied: (ev: Event) => any;
    onended: (ev: Event) => any;
    onerror: (ev: Event) => any;
    onfocus: (ev: FocusEvent) => any;
    oninput: (ev: Event) => any;
    onkeydown: (ev: KeyboardEvent) => any;
    onkeypress: (ev: KeyboardEvent) => any;
    onkeyup: (ev: KeyboardEvent) => any;
    onload: (ev: Event) => any;
    onloadeddata: (ev: Event) => any;
    onloadedmetadata: (ev: Event) => any;
    onloadstart: (ev: Event) => any;
    onmousedown: (ev: MouseEvent) => any;
    onmouseenter: (ev: MouseEvent) => any;
    onmouseleave: (ev: MouseEvent) => any;
    onmousemove: (ev: MouseEvent) => any;
    onmouseout: (ev: MouseEvent) => any;
    onmouseover: (ev: MouseEvent) => any;
    onmouseup: (ev: MouseEvent) => any;
    onmousewheel: (ev: MouseWheelEvent) => any;
    onmscontentzoom: (ev: UIEvent) => any;
    onmsmanipulationstatechanged: (ev: MSManipulationEvent) => any;
    onpaste: (ev: DragEvent) => any;
    onpause: (ev: Event) => any;
    onplay: (ev: Event) => any;
    onplaying: (ev: Event) => any;
    onprogress: (ev: ProgressEvent) => any;
    onratechange: (ev: Event) => any;
    onreset: (ev: Event) => any;
    onscroll: (ev: UIEvent) => any;
    onseeked: (ev: Event) => any;
    onseeking: (ev: Event) => any;
    onselect: (ev: UIEvent) => any;
    onselectstart: (ev: Event) => any;
    onstalled: (ev: Event) => any;
    onsubmit: (ev: Event) => any;
    onsuspend: (ev: Event) => any;
    ontimeupdate: (ev: Event) => any;
    onvolumechange: (ev: Event) => any;
    onwaiting: (ev: Event) => any;
    outerHTML: string;
    outerText: string;
    spellcheck: boolean;
    style: CSSStyleDeclaration;
    tabIndex: number;
    title: string;
    blur(): void;
    click(): void;
    dragDrop(): boolean;
    focus(): void;
    insertAdjacentElement(position: string, insertedElement: IElement): IElement;
    insertAdjacentHTML(where: string, html: string): void;
    insertAdjacentText(where: string, text: string): void;
    msGetInputContext(): MSInputMethodContext;
    scrollIntoView(top?: boolean): void;
    setActive(): void;
    
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: IHTMLElement, ev: HTMLElementEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
interface ISVGElement extends IElement {
    className: any;
    onclick: (this: ISVGElement, ev: MouseEvent) => any;
    ondblclick: (this: ISVGElement, ev: MouseEvent) => any;
    onfocusin: (this: ISVGElement, ev: FocusEvent) => any;
    onfocusout: (this: ISVGElement, ev: FocusEvent) => any;
    onload: (this: ISVGElement, ev: Event) => any;
    onmousedown: (this: ISVGElement, ev: MouseEvent) => any;
    onmousemove: (this: ISVGElement, ev: MouseEvent) => any;
    onmouseout: (this: ISVGElement, ev: MouseEvent) => any;
    onmouseover: (this: ISVGElement, ev: MouseEvent) => any;
    onmouseup: (this: ISVGElement, ev: MouseEvent) => any;
    readonly ownerSVGElement: SVGSVGElement;
    readonly style: CSSStyleDeclaration;
    readonly viewportElement: ISVGElement;
    xmlbase: string;
    addEventListener<K extends keyof SVGElementEventMap>(type: K, listener: (this: ISVGElement, ev: SVGElementEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
interface IHTMLTextAreaElement extends IHTMLElement {
    /**
      * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true when present on an element, and false when missing.
      */
    autofocus: boolean;
    /**
      * Sets or retrieves the width of the object.
      */
    cols: number;
    /**
      * Sets or retrieves the initial contents of the object.
      */
    defaultValue: string;
    disabled: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form: HTMLFormElement;
    /**
      * Sets or retrieves the maximum number of characters that the user can enter in a text control.
      */
    maxLength: number;
    /**
      * Sets or retrieves the name of the object.
      */
    name: string;
    /**
      * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
      */
    placeholder: string;
    /**
      * Sets or retrieves the value indicated whether the content of the object is read-only.
      */
    readOnly: boolean;
    /**
      * When present, marks an element that can't be submitted without a value.
      */
    required: boolean;
    /**
      * Sets or retrieves the number of horizontal rows contained in the object.
      */
    rows: number;
    /**
      * Gets or sets the end position or offset of a text selection.
      */
    selectionEnd: number;
    /**
      * Gets or sets the starting position or offset of a text selection.
      */
    selectionStart: number;
    /**
      * Sets or retrieves the value indicating whether the control is selected.
      */
    status: any;
    /**
      * Retrieves the type of control.
      */
    type: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity: ValidityState;
    /**
      * Retrieves or sets the text in the entry field of the textArea element.
      */
    value: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate: boolean;
    /**
      * Sets or retrieves how to handle wordwrapping in the object.
      */
    wrap: string;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity(): boolean;
    /**
      * Highlights the input area of a form element.
      */
    select(): void;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity(error: string): void;
    /**
      * Sets the start and end positions of a selection in a text field.
      * @param start The offset into the text field for the start of the selection.
      * @param end The offset into the text field for the end of the selection.
      */
    setSelectionRange(start: number, end: number): void;
}

interface IHTMLTitleElement extends IHTMLElement {
    /**
      * Retrieves or sets the text of the object as a string.
      */
    text?: string;
}
interface IHTMLScriptElement extends IHTMLElement {
    async?: boolean;
    /**
      * Sets or retrieves the character set used to encode the object.
      */
    charset?: string;
    /**
      * Sets or retrieves the status of the script.
      */
    defer?: boolean;
    /**
      * Sets or retrieves the event for which the script is written.
      */
    event?: string;
    /**
      * Sets or retrieves the object that is bound to the event script.
      */
    htmlFor?: string;
    /**
      * Retrieves the URL to an external file that contains the source code or data.
      */
    src?: string;
    /**
      * Retrieves or sets the text of the object as a string.
      */
    text?: string;
    /**
      * Sets or retrieves the MIME type for the associated scripting engine.
      */
    type?: string;
}

interface Object {
    [index:string]:any
    __proto__:Object
}