/// <reference path="../src/ts/virtual/node/.d.ts" />
declare class ArrayEx<T> extends Array<T> {
    last(): T | undefined;
    clear(): void;
}
interface INamedNodeMap {
    [index: number]: IAttr;
    indexOfName(name: string): any;
    indexOf(o: any): any;
    getNamedItem(name: string): IAttr | null;
    item(index: number): IAttr | undefined;
    readonly length: number;
    removeNamedItem(v: string | Object): any;
    setNamedItem(arg: IAttr): any;
}
interface IExp {
    (...arg: any[]): any;
    __me__: IExp;
}
interface INodeList {
    length: number;
    item(index: number): INode | undefined;
    [index: number]: INode | undefined;
}
interface INode extends EventTarget {
    readonly childNodes: INodeList;
    previousSibling: INode | null;
    nextSibling: INode | null;
    parentNode: INode | null;
    nodeName: string;
    nodeType: number;
    appendChild(newChild: INode): INode;
    removeChild(oldChild: INode): INode;
    cloneNode(deep?: boolean): INode;
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
    valueOf(): IElement;
    classList: DOMTokenList;
    clientHeight: number;
    clientLeft: number;
    clientTop: number;
    clientWidth: number;
    offsetHeight: number;
    offsetLeft: number;
    offsetTop: number;
    offsetWidth: number;
    msContentZoomFactor: number;
    msRegionOverflow: string;
    onariarequest: (ev: AriaRequestEvent) => any;
    oncommand: (ev: CommandEvent) => any;
    ongotpointercapture: (ev: PointerEvent) => any;
    onlostpointercapture: (ev: PointerEvent) => any;
    onmsgesturechange: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (ev: MSGestureEvent) => any;
    onmsgestureend: (ev: MSGestureEvent) => any;
    onmsgesturehold: (ev: MSGestureEvent) => any;
    onmsgesturestart: (ev: MSGestureEvent) => any;
    onmsgesturetap: (ev: MSGestureEvent) => any;
    onmsgotpointercapture: (ev: MSPointerEvent) => any;
    onmsinertiastart: (ev: MSGestureEvent) => any;
    onmslostpointercapture: (ev: MSPointerEvent) => any;
    onmspointercancel: (ev: MSPointerEvent) => any;
    onmspointerdown: (ev: MSPointerEvent) => any;
    onmspointerenter: (ev: MSPointerEvent) => any;
    onmspointerleave: (ev: MSPointerEvent) => any;
    onmspointermove: (ev: MSPointerEvent) => any;
    onmspointerout: (ev: MSPointerEvent) => any;
    onmspointerover: (ev: MSPointerEvent) => any;
    onmspointerup: (ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (ev: Event) => any;
    onwebkitfullscreenerror: (ev: Event) => any;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    tagName: string;
    id: string;
    className: string;
    innerHTML: string;
    getAttribute(name?: string): string;
    getAttributeNS(namespaceURI: string, localName: string): string;
    getAttributeNode(name: string): IAttr;
    getAttributeNodeNS(namespaceURI: string, localName: string): IAttr;
    getBoundingClientRect(): ClientRect;
    getClientRects(): ClientRectList;
    getElementsByTagName(name: "a"): NodeListOf<HTMLAnchorElement>;
    getElementsByTagName(name: "abbr"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "acronym"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "address"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "applet"): NodeListOf<HTMLAppletElement>;
    getElementsByTagName(name: "area"): NodeListOf<HTMLAreaElement>;
    getElementsByTagName(name: "article"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "aside"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "audio"): NodeListOf<HTMLAudioElement>;
    getElementsByTagName(name: "b"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "base"): NodeListOf<HTMLBaseElement>;
    getElementsByTagName(name: "basefont"): NodeListOf<HTMLBaseFontElement>;
    getElementsByTagName(name: "bdo"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "big"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "blockquote"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "body"): NodeListOf<HTMLBodyElement>;
    getElementsByTagName(name: "br"): NodeListOf<HTMLBRElement>;
    getElementsByTagName(name: "button"): NodeListOf<HTMLButtonElement>;
    getElementsByTagName(name: "canvas"): NodeListOf<HTMLCanvasElement>;
    getElementsByTagName(name: "caption"): NodeListOf<HTMLTableCaptionElement>;
    getElementsByTagName(name: "center"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "circle"): NodeListOf<SVGCircleElement>;
    getElementsByTagName(name: "cite"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "clippath"): NodeListOf<SVGClipPathElement>;
    getElementsByTagName(name: "code"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "col"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(name: "colgroup"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName(name: "datalist"): NodeListOf<HTMLDataListElement>;
    getElementsByTagName(name: "dd"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "defs"): NodeListOf<SVGDefsElement>;
    getElementsByTagName(name: "del"): NodeListOf<HTMLModElement>;
    getElementsByTagName(name: "desc"): NodeListOf<SVGDescElement>;
    getElementsByTagName(name: "dfn"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "dir"): NodeListOf<HTMLDirectoryElement>;
    getElementsByTagName(name: "div"): NodeListOf<HTMLDivElement>;
    getElementsByTagName(name: "dl"): NodeListOf<HTMLDListElement>;
    getElementsByTagName(name: "dt"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "ellipse"): NodeListOf<SVGEllipseElement>;
    getElementsByTagName(name: "em"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "embed"): NodeListOf<HTMLEmbedElement>;
    getElementsByTagName(name: "feblend"): NodeListOf<SVGFEBlendElement>;
    getElementsByTagName(name: "fecolormatrix"): NodeListOf<SVGFEColorMatrixElement>;
    getElementsByTagName(name: "fecomponenttransfer"): NodeListOf<SVGFEComponentTransferElement>;
    getElementsByTagName(name: "fecomposite"): NodeListOf<SVGFECompositeElement>;
    getElementsByTagName(name: "feconvolvematrix"): NodeListOf<SVGFEConvolveMatrixElement>;
    getElementsByTagName(name: "fediffuselighting"): NodeListOf<SVGFEDiffuseLightingElement>;
    getElementsByTagName(name: "fedisplacementmap"): NodeListOf<SVGFEDisplacementMapElement>;
    getElementsByTagName(name: "fedistantlight"): NodeListOf<SVGFEDistantLightElement>;
    getElementsByTagName(name: "feflood"): NodeListOf<SVGFEFloodElement>;
    getElementsByTagName(name: "fefunca"): NodeListOf<SVGFEFuncAElement>;
    getElementsByTagName(name: "fefuncb"): NodeListOf<SVGFEFuncBElement>;
    getElementsByTagName(name: "fefuncg"): NodeListOf<SVGFEFuncGElement>;
    getElementsByTagName(name: "fefuncr"): NodeListOf<SVGFEFuncRElement>;
    getElementsByTagName(name: "fegaussianblur"): NodeListOf<SVGFEGaussianBlurElement>;
    getElementsByTagName(name: "feimage"): NodeListOf<SVGFEImageElement>;
    getElementsByTagName(name: "femerge"): NodeListOf<SVGFEMergeElement>;
    getElementsByTagName(name: "femergenode"): NodeListOf<SVGFEMergeNodeElement>;
    getElementsByTagName(name: "femorphology"): NodeListOf<SVGFEMorphologyElement>;
    getElementsByTagName(name: "feoffset"): NodeListOf<SVGFEOffsetElement>;
    getElementsByTagName(name: "fepointlight"): NodeListOf<SVGFEPointLightElement>;
    getElementsByTagName(name: "fespecularlighting"): NodeListOf<SVGFESpecularLightingElement>;
    getElementsByTagName(name: "fespotlight"): NodeListOf<SVGFESpotLightElement>;
    getElementsByTagName(name: "fetile"): NodeListOf<SVGFETileElement>;
    getElementsByTagName(name: "feturbulence"): NodeListOf<SVGFETurbulenceElement>;
    getElementsByTagName(name: "fieldset"): NodeListOf<HTMLFieldSetElement>;
    getElementsByTagName(name: "figcaption"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "figure"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "filter"): NodeListOf<SVGFilterElement>;
    getElementsByTagName(name: "font"): NodeListOf<HTMLFontElement>;
    getElementsByTagName(name: "footer"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "foreignobject"): NodeListOf<SVGForeignObjectElement>;
    getElementsByTagName(name: "form"): NodeListOf<HTMLFormElement>;
    getElementsByTagName(name: "frame"): NodeListOf<HTMLFrameElement>;
    getElementsByTagName(name: "frameset"): NodeListOf<HTMLFrameSetElement>;
    getElementsByTagName(name: "g"): NodeListOf<SVGGElement>;
    getElementsByTagName(name: "h1"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h2"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h3"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h4"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h5"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "h6"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName(name: "head"): NodeListOf<HTMLHeadElement>;
    getElementsByTagName(name: "header"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "hgroup"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "hr"): NodeListOf<HTMLHRElement>;
    getElementsByTagName(name: "html"): NodeListOf<HTMLHtmlElement>;
    getElementsByTagName(name: "i"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "iframe"): NodeListOf<HTMLIFrameElement>;
    getElementsByTagName(name: "image"): NodeListOf<SVGImageElement>;
    getElementsByTagName(name: "img"): NodeListOf<HTMLImageElement>;
    getElementsByTagName(name: "input"): NodeListOf<HTMLInputElement>;
    getElementsByTagName(name: "ins"): NodeListOf<HTMLModElement>;
    getElementsByTagName(name: "isindex"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "kbd"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "keygen"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "label"): NodeListOf<HTMLLabelElement>;
    getElementsByTagName(name: "legend"): NodeListOf<HTMLLegendElement>;
    getElementsByTagName(name: "li"): NodeListOf<HTMLLIElement>;
    getElementsByTagName(name: "line"): NodeListOf<SVGLineElement>;
    getElementsByTagName(name: "lineargradient"): NodeListOf<SVGLinearGradientElement>;
    getElementsByTagName(name: "link"): NodeListOf<HTMLLinkElement>;
    getElementsByTagName(name: "listing"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "map"): NodeListOf<HTMLMapElement>;
    getElementsByTagName(name: "mark"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "marker"): NodeListOf<SVGMarkerElement>;
    getElementsByTagName(name: "marquee"): NodeListOf<HTMLMarqueeElement>;
    getElementsByTagName(name: "mask"): NodeListOf<SVGMaskElement>;
    getElementsByTagName(name: "menu"): NodeListOf<HTMLMenuElement>;
    getElementsByTagName(name: "meta"): NodeListOf<HTMLMetaElement>;
    getElementsByTagName(name: "metadata"): NodeListOf<SVGMetadataElement>;
    getElementsByTagName(name: "nav"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "nextid"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "nobr"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "noframes"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "noscript"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "object"): NodeListOf<HTMLObjectElement>;
    getElementsByTagName(name: "ol"): NodeListOf<HTMLOListElement>;
    getElementsByTagName(name: "optgroup"): NodeListOf<HTMLOptGroupElement>;
    getElementsByTagName(name: "option"): NodeListOf<HTMLOptionElement>;
    getElementsByTagName(name: "p"): NodeListOf<HTMLParagraphElement>;
    getElementsByTagName(name: "param"): NodeListOf<HTMLParamElement>;
    getElementsByTagName(name: "path"): NodeListOf<SVGPathElement>;
    getElementsByTagName(name: "pattern"): NodeListOf<SVGPatternElement>;
    getElementsByTagName(name: "plaintext"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "polygon"): NodeListOf<SVGPolygonElement>;
    getElementsByTagName(name: "polyline"): NodeListOf<SVGPolylineElement>;
    getElementsByTagName(name: "pre"): NodeListOf<HTMLPreElement>;
    getElementsByTagName(name: "progress"): NodeListOf<HTMLProgressElement>;
    getElementsByTagName(name: "q"): NodeListOf<HTMLQuoteElement>;
    getElementsByTagName(name: "radialgradient"): NodeListOf<SVGRadialGradientElement>;
    getElementsByTagName(name: "rect"): NodeListOf<SVGRectElement>;
    getElementsByTagName(name: "rt"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "ruby"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "s"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "samp"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "script"): NodeListOf<HTMLScriptElement>;
    getElementsByTagName(name: "section"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "select"): NodeListOf<HTMLSelectElement>;
    getElementsByTagName(name: "small"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "source"): NodeListOf<HTMLSourceElement>;
    getElementsByTagName(name: "span"): NodeListOf<HTMLSpanElement>;
    getElementsByTagName(name: "stop"): NodeListOf<SVGStopElement>;
    getElementsByTagName(name: "strike"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "strong"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "style"): NodeListOf<HTMLStyleElement>;
    getElementsByTagName(name: "sub"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "sup"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "svg"): NodeListOf<SVGSVGElement>;
    getElementsByTagName(name: "switch"): NodeListOf<SVGSwitchElement>;
    getElementsByTagName(name: "symbol"): NodeListOf<SVGSymbolElement>;
    getElementsByTagName(name: "table"): NodeListOf<HTMLTableElement>;
    getElementsByTagName(name: "tbody"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "td"): NodeListOf<HTMLTableDataCellElement>;
    getElementsByTagName(name: "text"): NodeListOf<SVGTextElement>;
    getElementsByTagName(name: "textpath"): NodeListOf<SVGTextPathElement>;
    getElementsByTagName(name: "textarea"): NodeListOf<HTMLTextAreaElement>;
    getElementsByTagName(name: "tfoot"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "th"): NodeListOf<HTMLTableHeaderCellElement>;
    getElementsByTagName(name: "thead"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName(name: "title"): NodeListOf<HTMLTitleElement>;
    getElementsByTagName(name: "tr"): NodeListOf<HTMLTableRowElement>;
    getElementsByTagName(name: "track"): NodeListOf<HTMLTrackElement>;
    getElementsByTagName(name: "tspan"): NodeListOf<SVGTSpanElement>;
    getElementsByTagName(name: "tt"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "u"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "ul"): NodeListOf<HTMLUListElement>;
    getElementsByTagName(name: "use"): NodeListOf<SVGUseElement>;
    getElementsByTagName(name: "var"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "video"): NodeListOf<HTMLVideoElement>;
    getElementsByTagName(name: "view"): NodeListOf<SVGViewElement>;
    getElementsByTagName(name: "wbr"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: "x-ms-webview"): NodeListOf<MSHTMLWebViewElement>;
    getElementsByTagName(name: "xmp"): NodeListOf<HTMLElement>;
    getElementsByTagName(name: string): NodeListOf<Element>;
    getElementsByTagNameNS(namespaceURI: string, localName: string): NodeListOf<Element>;
    hasAttribute(name: string): boolean;
    hasAttributeNS(namespaceURI: string, localName: string): boolean;
    msGetRegionContent(): MSRangeCollection;
    msGetUntransformedBounds(): ClientRect;
    msMatchesSelector(selectors: string): boolean;
    msReleasePointerCapture(pointerId: number): void;
    msSetPointerCapture(pointerId: number): void;
    msZoomTo(args: MsZoomToOptions): void;
    releasePointerCapture(pointerId: number): void;
    removeAttribute(name?: string): void;
    removeAttributeNS(namespaceURI: string, localName: string): void;
    removeAttributeNode(oldAttr: IAttr): IAttr;
    requestFullscreen(): void;
    requestPointerLock(): void;
    setAttribute(name: string, value: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    setAttributeNode(newAttr: IAttr): IAttr;
    setAttributeNodeNS(newAttr: IAttr): IAttr;
    setPointerCapture(pointerId: number): void;
    webkitMatchesSelector(selectors: string): boolean;
    webkitRequestFullScreen(): void;
    webkitRequestFullscreen(): void;
    getElementsByClassName(classNames: string): NodeListOf<Element>;
    matches(selector: string): boolean;
    getElementsByTagName(tagname: "picture"): NodeListOf<HTMLPictureElement>;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
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
interface IHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(nameOrIndex?: any, optionalIndex?: any): IHTMLElement | undefined;
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): IHTMLElement;
    [index: number]: IHTMLElement | undefined;
}
interface IHTMLElement extends IElement {
    attributes: INamedNodeMap;
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
    insertAdjacentElement(position: string, insertedElement: Element): Element;
    insertAdjacentHTML(where: string, html: string): void;
    insertAdjacentText(where: string, text: string): void;
    msGetInputContext(): MSInputMethodContext;
    scrollIntoView(top?: boolean): void;
    setActive(): void;
    addEventListener(type: "MSContentZoom", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureChange", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureDoubleTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureEnd", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureHold", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGestureTap", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSGotPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSInertiaStart", listener: (ev: MSGestureEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSLostPointerCapture", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSManipulationStateChanged", listener: (ev: MSManipulationEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerCancel", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerDown", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerEnter", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerLeave", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerMove", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOut", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerOver", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "MSPointerUp", listener: (ev: MSPointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "abort", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "activate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ariarequest", listener: (ev: AriaRequestEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecopy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforecut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforedeactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "beforepaste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "blur", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "canplay", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "canplaythrough", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "change", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "click", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "command", listener: (ev: CommandEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "contextmenu", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "copy", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "cuechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "cut", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dblclick", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "deactivate", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drag", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragend", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragenter", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragleave", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragover", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "dragstart", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "drop", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "durationchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "emptied", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "ended", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "error", listener: (ev: ErrorEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "focus", listener: (ev: FocusEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "gotpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "input", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "keydown", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keypress", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "keyup", listener: (ev: KeyboardEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "load", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadeddata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadedmetadata", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "loadstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "lostpointercapture", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousedown", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseenter", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseleave", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousemove", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseout", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseover", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mouseup", listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "mousewheel", listener: (ev: MouseWheelEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "paste", listener: (ev: DragEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pause", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "play", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "playing", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "pointercancel", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerdown", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerenter", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerleave", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointermove", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerout", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerover", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "pointerup", listener: (ev: PointerEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "progress", listener: (ev: ProgressEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "ratechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "reset", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "scroll", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "seeked", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "seeking", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "select", listener: (ev: UIEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "selectstart", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "stalled", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "submit", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "suspend", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "timeupdate", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "touchcancel", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchend", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchmove", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "touchstart", listener: (ev: TouchEvent) => any, useCapture?: boolean): void;
    addEventListener(type: "volumechange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "waiting", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenchange", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "webkitfullscreenerror", listener: (ev: Event) => any, useCapture?: boolean): void;
    addEventListener(type: "wheel", listener: (ev: WheelEvent) => any, useCapture?: boolean): void;
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
    __proto__: Object;
}
interface INode {
    insertBefore2(newChild: INode, refChild: INode): INode;
}
interface Node {
    beDOM(): Node;
    valueOf(): Node;
}
declare let vNodesToDOM: (nodes: INode[]) => INode[];
declare function insertNodesBefore(node: INode, nodes: INode[]): void;
declare function removeNode(this: void, node: INode): INode | null;
declare function replaceNodeByNodes(node: INode, nodes: INode[]): void;
declare function insertNode(refChilde: INode, newChild: INode): number;
declare function nodesToString(nodes: INode[]): string;
declare function cloneBetween(node1: INode, node2: INode): INode[] | null;
declare function removeBlockBetween(node1: INode, node2: INode): any;
declare function replaceNodeByNode(refChilde: INode, newChild: INode): void;
declare function appendNodes(nodes: INode[] | INodeList | IHTMLCollection, parent: INode): void;
declare function takeChildNodes(node: INode): INode[];
declare function takeOutChildNodes(node: INode): void;
declare function takeBlockBetween(node1: INode, node2: INode): INode[] | null;
declare function getNodesLength(node: IElement): number;
declare function getNodeIndex(node: IElement): number;
declare function getNodesLength2(node: INode): number;
declare function getNodeIndex2(node: INode): number;
declare function takeAttr<T extends string | null>(node: IElement, attrName: string, defaultValue?: T): T | string | undefined;
declare function getAttr<T extends string | null>(node: IElement, attrName: string, defaultValue?: T): T | string | undefined;
declare let addStyleRE: RegExp;
declare function addStyle(elem: IElement, style: string): void;
declare let addClassNameRE: RegExp;
declare function addClassName(elem: IElement, className: string): void;
declare function addClass(elem: IElement, ...arg: any[]): void;
declare function addClasses(elem: IElement, clses: string[]): void;
declare function removeClass(elem: IElement, cls: string): void;
declare function removeClasses(elem: IElement, clses: string[]): void;
declare function replaceClass(elem: IElement, a: string, b: string): void;
declare function toggleClass(elem: IElement, a: string, t: Function, f: Function): void;
/**判断是否注释节点 */
declare function isCommentNode(node: INode): node is IComment;
/**判断是否文本节点 */
declare function isTextNode(node: INode): node is IText;
declare let arrayConstructor: Array<any>, objectConstructor: ObjectConstructor, stringConstructor: String, toStr: () => string, getPrototypeOf: (o: any) => any, replace: {
    (searchValue: string, replaceValue: string): string;
    (searchValue: string, replacer: (substring: string, ...args: any[]) => string): string;
    (searchValue: RegExp, replaceValue: string): string;
    (searchValue: RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}, slice: {
    <T>(start?: number, end?: number): T[];
    call<T>(arr: IArray | T[], start?: number, end?: number): T[];
}, push: {
    <T>(...items: T[]): number;
    apply<T>(arr: IArray | T[], items: T[]): number;
    call<T>(arr: IArray | T[], ...items: T[]): number;
}, splice: {
    <T>(start: number): T[];
    call<T>(arr: IArray | T[], start: number): T[];
    call<T>(arr: IArray | T[], start: number, deleteCount: number, ...items: T[]): T[];
}, indexOf: {
    <T>(searchElement: T, fromIndex?: number): number;
    call<T>(arr: IArray | T[], searchElement: T, fromIndex?: number): number;
};
declare let last: {
    <T>(): T | undefined;
    call<T>(arr: IArray | T[]): T | undefined;
};
interface Constructor {
    prototype: Object;
}
declare function extend<T>(elem: T, elemEx: any): T;
declare function merge<T>(elem: T, elemEx: any): T;
declare function removeItem<T>(arr: {
    [index: number]: T;
    length: number;
}, obj: T): void;
declare function persentToFloat(s: string): number | undefined;
declare function parseBool(v: any): boolean;
declare function trim(s: string): string;
declare function HTMLTrim(s: string): string;
declare function trimLine(s: string): string;
declare let dateFormat: (format: string, d: Date) => string;
declare let camelCaseRE: RegExp, camelizeRE: RegExp, deCamelizeRE: RegExp;
declare function camelCase(s: string): string;
declare function camelize(str: string): string;
declare function decamelize(str: string): string;
declare function splitByOnce(s: string, split: string): Array<string>;
declare function getBind(obj: Object, fn: Function): () => any;
/**从注释中读取字符串 */
declare let getCommentText: (node: IComment) => string;
declare let persentRE: RegExp;
declare function isNull<T>(p: T | null): p is null;
declare function isUndefined<T>(p: T | undefined): p is undefined;
declare function isObject<T>(p: any): p is Object;
declare function isRegExp(a: any): a is RegExp;
declare function isDate(a: any): a is Date;
declare function isNumber(a: any): a is number;
declare function isString(a: any): a is string;
declare function isFunction(a: any): a is Function;
declare let isArray: (arg: any) => arg is any[];
declare function isPersent(s: any): boolean;
declare function isArrayLike(a: any): boolean;
interface ICallBack {
    (this: void, ...arg: any[]): void;
}
declare class EventEmitter {
    protected events: {
        [index: string]: ICallBack | ICallBack[] | undefined;
        error?: ICallBack | ICallBack[];
    };
    constructor();
    emit(type: string, ...args: any[]): boolean;
    on: (type: string, listener: ICallBack) => this;
    addListener(type: string, listener: ICallBack): this;
    once(type: string, listener: ICallBack): void;
    off: (type: string, listener: ICallBack) => this;
    removeListener(type: string, listener: ICallBack): this;
    removeAllListeners(type: string): this;
    listeners(type: string): ICallBack | ICallBack[];
}
declare class EventHelper<T extends ICallBack, E extends Function> {
    private target;
    private type;
    constructor(target: EventEmitter, type: string);
    readonly emit: E;
    on(listener: T): void;
    addListener(listener: T): void;
    once(listener: T): void;
    off(listener: T): void;
    removeListener(listener: T): EventEmitter;
    removeAllListeners(): EventEmitter;
    listeners(): T[];
}
declare class EventEmitterEx extends EventEmitter {
    /**
     * 缓存事件管理器
     */
    private eventHelpers;
    /**
     * 生成或获取一个事件管理器
     */
    getEventHelper<T extends ICallBack, U extends Function>(type: string): EventHelper<T, U>;
}
/**
 * 遍历树回调函数返回值的枚举:
    c_stopEach 结束枚举,
    c_repeat 重复本次,
    c_noIn 不进入子集,
    c_noRepeat 不重复（默认）
 */
declare const enum eTreeEach {
    c_stopEach = 1,
    c_repeat = 2,
    c_noIn = 4,
    c_noRepeat = 8,
}
interface ITreeEachState<T> {
    stack: [T[] | IArray, number];
    nextStepLength: number;
    currentIndex: number;
}
interface IArray {
    length: number;
}
interface ITreeEachReturn {
    stack: [IArray | INode[], number];
    return: eTreeEach | undefined;
    array: IArray | INode[];
    index: number;
}
/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
declare function treeEach<T>(array: T[] | IArray, propertyName: string, fn: (node: T, state: ITreeEachState<T>) => (eTreeEach | void), beginIndex?: number): ITreeEachReturn | undefined;
interface Window {
    ActiveXObject?: Object;
}
interface Node {
    insertBefore2<T extends INode | Node>(newNode: T, node?: T): T;
}
declare let isIE: boolean;
declare class TemplateList extends EventEmitter {
    onDefine(name: string, fn: ICallBack): void;
    define(name: string, sortPath: string, path: string, s: string, ext: any): any;
    toString(): string;
}
declare class Service extends TemplateList {
    [index: string]: Object;
    private __defineCallbacks__;
    constructor(serv?: Service);
    require(n: any): Object;
    define(name: any, s: any): void;
    toDefineString(): string;
}
declare class NameItem {
    constructor(name: string);
    name: string;
}
declare class BasePath {
    private paths;
    push(v: string | Array<string>): void;
    parseUIPath(s: string): void;
    getPathBySortPath(sortPath: any): any;
    hasSortPath(sortPath: any): boolean;
    toString(): string;
}
declare class TemplateConfig {
    [index: string]: Object;
    XMP: {};
    TEMPLATE: {};
    TITLE: {
        getData: (node: IHTMLTitleElement) => string;
    };
    STYLE: {
        xmp: any;
    };
    SCRIPT: {
        xmp: any;
    };
    TEXTAREA: {
        xmp: any;
        getData: (node: IHTMLTextAreaElement) => string;
    };
    toString(): string;
    readonly items: NameItem[];
    findByString(str: string): RegExpMatchArray | undefined;
}
declare let templateConfig: TemplateConfig;
declare let baseUIPath: BasePath;
interface INode {
    __scope__?: Scope;
}
declare class Scope {
    __name__: string;
    __actionNode__: INode;
    __parent__: Scope | null;
    __children__: Scope[];
    __proto__: Scope | null;
    constructor(commentNode: IComment, parent: Scope | null, __name__?: string);
}
declare class RootScope implements Scope {
    document: INode;
    __actionNode__: INode;
    __parent__: null;
    __children__: Scope[];
    __proto__: Scope | null;
    constructor(document: INode);
}
declare class IAttr {
    readonly name: string;
    value: string;
    constructor(name: string, value: string);
}
declare class VNamedNodeMap {
    [index: number]: IAttr;
    private _length;
    indexOfName(name: string): number;
    indexOf(o: any): number;
    getNamedItem(name: string): IAttr | null;
    item(index: number): IAttr | undefined;
    readonly length: number;
    removeNamedItem(v: string | Object): void;
    setNamedItem(arg: IAttr): void;
    toJS(): string;
}
declare let styleListRE: RegExp;
declare class VStyle {
    constructor(elem: VElement);
}
declare function indexOfStyleName(t: any, name: string): number;
declare function updateStyleAttribyte(t: any): void;
declare function setVStyleGetSet(name: string): void;
declare var VStyleprototype: {};
declare var styleNode: {};
/**
 * 一个普通对象
 * @param {string} s 格式为:xxx,yyy,zzz
 * @param {any} defaultValue 初始化时每个属性的默认值
 */
declare class HashObject {
    constructor(s: string, defaultValue?: any);
}
interface IHashObject<T> {
    [index: string]: T;
}
declare class HashObjectManage<T> {
    static clean<T>(data: IHashObject<T>): void;
    static take<T>(data: IHashObject<T>, name: string): T | null;
}
interface IKeyArrayHashObject<T> {
    [index: string]: ArrayEx<T>;
}
declare class KeyArrayHashObjectManage {
    private static isArray<T>(p);
    static clean<T>(data: IKeyArrayHashObject<T>): void;
    static take<T>(data: IKeyArrayHashObject<T>, name: string): ArrayEx<T> | null;
    static getKeyArray<T>(data: IKeyArrayHashObject<T>): ArrayEx<ArrayEx<T>>;
    static pop<T>(data: IKeyArrayHashObject<T>, key: string): T;
    static push<T>(data: IKeyArrayHashObject<T>, key: string | string[], value: T): void;
}
declare let classSplitRE: RegExp;
declare class ClassList {
    private element;
    constructor(element: IElement);
    add(value: string): void;
    remove(value: string): void;
    toggle(value: string): void;
    contains(value: string): boolean;
    item(i: number): string;
}
declare class VNodeList {
    length: number;
    item(index: number): VNode & IVNodeMethod | undefined;
    [index: number]: VNode & IVNodeMethod | undefined;
    static clear(vNodeList: VNodeList): void;
}
declare class VHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(index: number): VElement & IVNodeMethod | null;
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): VElement & IVNodeMethod | null;
    [index: number]: VElement & IVNodeMethod | undefined;
}
declare class VNodeVMData {
    data: string;
    __: Object;
    domNode: Node | null;
    /**是否闭合 */
    isClose: boolean;
    /**是否自闭合 */
    /** */
    closeSelf: boolean;
}
interface Node {
    __vdomNode__: VNode & IVNodeMethod;
}
declare const enum ENodeType {
    Element = 1,
    Text = 3,
    Comment = 8,
    Document = 9,
    DocumentType = 10,
    DocumentFragment = 11,
    PlaceHolder = 20,
    Member = 21,
    Script = 22,
}
interface IVNodeMethod {
    (nodeName: string, nodeType: ENodeType): VNode & IVNodeMethod;
}
declare let emptyTextNodeRE: RegExp, stringNode: {
    SCRIPT: RegExp;
    TEMPLATE: RegExp;
    STYLE: RegExp;
    TITLE: RegExp;
    TEXTAREA: RegExp;
    XMP: RegExp;
};
declare let functionCommentRE: RegExp;
declare function getFunctionComment(fn: Function): string;
declare abstract class VNode implements INode {
    vmData: VNodeVMData;
    abstract nodeType: ENodeType;
    abstract nodeName: string;
    abstract toJS(space?: number): string;
    abstract toCreateJS(space?: number): string;
    readonly childNodes: VNodeList;
    parentNode: VNode & IVNodeMethod | null;
    /**
     * 添加子节点，并返回子节点
     */
    $$(this: VNode & IVNodeMethod, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    /**
     * 添加子节点，并返回自身
     */
    $$$(this: VNode & IVNodeMethod, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    /**
     * 返回父节点，如果无，返回自己
     */
    readonly $: VElement & IVNodeMethod;
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    addText(this: VNode & IVNodeMethod, ...args: string[]): VNode & IVNodeMethod;
    addText2(this: VNode & IVNodeMethod, fn: Function): VNode & IVNodeMethod;
    append(this: VNode, name: string, nodeType: ENodeType): VNode & IVNodeMethod;
    /**
     * 添加子节点，并返回子节点
     */
    appendChild(this: VNode, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    protected doAppendChild(this: VNode, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    insertBefore(this: VNode & IVNodeMethod, newNode: VNode & IVNodeMethod, refChild: VNode & IVNodeMethod): VNode & IVNodeMethod;
    insertBefore2(this: VNode & IVNodeMethod, newNode: VNode & IVNodeMethod, node: VNode & IVNodeMethod): VNode & IVNodeMethod;
    remove(): void;
    removeChild(this: VNode & IVNodeMethod, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    getData(this: VNode): string;
    abstract cloneNode(deep: boolean): VNode & IVNodeMethod;
    abstract toHTMLString(): string[];
    toJSString(space?: number): string;
    beDOM(): Node;
    protected doToDOM(): Node;
    private copyPropertyToNode(elem);
    /**与真实DOM交互 */
    protected connectParent<T extends IVNodeMethod>(this: VNode, elem: Node): void;
    protected createHomologyFunction(name: string): (this: VNode & IVNodeMethod) => any;
    protected createBridgeFunction(name: string): (this: VNode) => any;
    protected setBridgeGet(name: string): void;
    protected setBridgeGetSet(name: string): void;
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected abstract emulation(): void;
    readonly previousSibling: VNode & IVNodeMethod | null;
    readonly nextSibling: VNode & IVNodeMethod | null;
}
interface IBindClassToFunction {
    [index: number]: (node: IVNodeMethod & VNode, nodeName: string) => void;
}
declare let bindClassToFunctionHelper: IBindClassToFunction;
declare function bindClassToFunction(node: IVNodeMethod & VNode, nodeName: string, nodeType?: ENodeType | undefined): string;
declare function getVNodeMethod(): VNode & IVNodeMethod;
declare let VNodeHelp: IVNodeMethod;
interface VElementVMData extends VNodeVMData {
    events: [string, EventListenerOrEventListenerObject | undefined, boolean][];
}
declare abstract class VElement extends VNode {
    vmData: VElementVMData;
    attributes: VNamedNodeMap;
    style: VStyle;
    children: VHTMLCollection;
    constructor();
    removeAttribute(name: string): void;
    removeAttributeNode(item: Object): void;
    hasAttribute(name: string): boolean;
    setAttribute(name: string, value: string): VElement & IVNodeMethod;
    _(this: VElement & IVNodeMethod, name: string, value?: string): VElement & IVNodeMethod;
    getAttribute(name: string): string | null;
    innerHTML: VElement & IVNodeMethod;
    removeChild(this: VElement & IVNodeMethod, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
    toHTMLString(): string[];
    onpointercancel: (this: this, ev: PointerEvent) => any;
    onpointerdown: (this: this, ev: PointerEvent) => any;
    onpointerenter: (this: this, ev: PointerEvent) => any;
    onpointerleave: (this: this, ev: PointerEvent) => any;
    onpointermove: (this: this, ev: PointerEvent) => any;
    onpointerout: (this: this, ev: PointerEvent) => any;
    onpointerover: (this: this, ev: PointerEvent) => any;
    onpointerup: (this: this, ev: PointerEvent) => any;
    onwheel: (this: this, ev: WheelEvent) => any;
    onariarequest: (this: this, ev: AriaRequestEvent) => any;
    oncommand: (this: this, ev: CommandEvent) => any;
    ongotpointercapture: (this: this, ev: PointerEvent) => any;
    onlostpointercapture: (this: this, ev: PointerEvent) => any;
    onmsgesturechange: (this: this, ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (this: this, ev: MSGestureEvent) => any;
    onmsgestureend: (this: this, ev: MSGestureEvent) => any;
    onmsgesturehold: (this: this, ev: MSGestureEvent) => any;
    onmsgesturestart: (this: this, ev: MSGestureEvent) => any;
    onmsgesturetap: (this: this, ev: MSGestureEvent) => any;
    onmsgotpointercapture: (this: this, ev: MSPointerEvent) => any;
    onmsinertiastart: (this: this, ev: MSGestureEvent) => any;
    onmslostpointercapture: (this: this, ev: MSPointerEvent) => any;
    onmspointercancel: (this: this, ev: MSPointerEvent) => any;
    onmspointerdown: (this: this, ev: MSPointerEvent) => any;
    onmspointerenter: (this: this, ev: MSPointerEvent) => any;
    onmspointerleave: (this: this, ev: MSPointerEvent) => any;
    onmspointermove: (this: this, ev: MSPointerEvent) => any;
    onmspointerout: (this: this, ev: MSPointerEvent) => any;
    onmspointerover: (this: this, ev: MSPointerEvent) => any;
    onmspointerup: (this: this, ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (this: this, ev: Event) => any;
    onwebkitfullscreenerror: (this: this, ev: Event) => any;
}
declare let encodeHTML: (value: string) => string;
declare let decodeHTML: (value: string) => string;
declare namespace VMElement {
    function mergeClass<U>(v: U): (constructor: {
        prototype: VMElement.VHtmlElement & U;
    }) => void;
}
interface IVNodeMethod {
    (nodeName: string, nodeType?: ENodeType.Element): VMElement.VHtmlElement & IVNodeMethod;
    (nodeName: 'html', nodeType?: ENodeType.Element): VMElement.VHtmlElement & IVNodeMethod;
}
declare function isVHTMLElement(node: VNode): node is VMElement.VHtmlElement;
declare namespace VMElement {
    class VHtmlElement extends VElement {
        nodeType: ENodeType.Element;
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
        cloneNode(deep?: boolean): VHtmlElement & IVNodeMethod;
        getData(): string;
        innerText: string;
        insertBefore(newNode: VNode & IVNodeMethod, refChild: VNode & IVNodeMethod): VNode & IVNodeMethod;
        protected doAppendChild(vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
        protected doBaseToDOM(): HTMLElement;
        protected doToDOM(): Node;
        toCreateJS(space?: number): string;
        childNodesToJS(space?: number): string;
        toJS(space?: number): string;
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation(): void;
        outerHTML: VHtmlElement & IVNodeMethod;
        outerText: string;
    }
}
declare abstract class VCharacterData extends VNode {
    abstract data: string;
    getData(): string;
    readonly length: number;
    appendData(arg: string): void;
    deleteData(offset: number, count: number): void;
    insertData(offset: number, arg: string): void;
    replaceData(offset: number, count: number, arg: string): void;
    substringData(offset: number, count: number): string;
}
interface IVNodeMethod {
    (nodeName: any, nodeType: ENodeType.Text): VText & IVNodeMethod;
}
declare function isVText(node: VNode): node is VText;
declare let getFunctionBlock: (fn: Function) => string;
declare class VText extends VCharacterData {
    nodeName: string;
    nodeType: ENodeType.Text;
    private __value__;
    cloneNode(deep: boolean): VText & IVNodeMethod;
    constructor(data: any);
    data: string;
    value: string;
    toCreateJS(space?: number): string;
    toJS(space?: number): string;
    toHTMLString(): string[];
    protected doToDOM(): Text;
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation(): void;
}
interface IVNodeMethod {
    (nodeName: string, nodeType: ENodeType.Comment): VComment & IVNodeMethod;
}
declare function isVComment(node: VNode): node is VComment;
interface VNodeVMData {
    /**是否有两个- */
    doubleMinus?: boolean;
}
declare class VComment extends VCharacterData {
    nodeName: string;
    nodeType: ENodeType.Comment;
    private __value__;
    cloneNode(deep: boolean): VComment & IVNodeMethod;
    constructor(data: string);
    data: string;
    textContent: string;
    /**
     * 用自身做环境调用函数,并返回父
     */
    __(fn: (node: VNode) => void): VElement & IVNodeMethod;
    toCreateJS(space?: number): string;
    toJS(space?: number): string;
    toHTMLString(): string[];
    protected doToDOM(): Comment;
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation(): void;
}
interface IVNodeMethod {
    (nodeName: string, nodeType: ENodeType.DocumentType): VDocumentType & IVNodeMethod;
}
declare function isVDocType(node: VNode): node is VDocumentType;
declare class VDocumentType extends VNode {
    nodeType: ENodeType.DocumentType;
    nodeName: string;
    cloneNode(deep: boolean): VDocumentType & IVNodeMethod;
    toCreateJS(space?: number): string;
    toJS(): string;
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation(): void;
    toHTMLString(): string[];
}
interface IVNodeMethod {
    (nodeName: "#document", nodeType?: ENodeType.Element): VDocument & IVNodeMethod;
}
declare class VDocument extends VNode {
    nodeType: ENodeType.Element;
    nodeName: string;
    cloneNode(deep: boolean): VDocument & IVNodeMethod;
    toCreateJS(space?: number): string;
    toJS(): string;
    protected emulation(): void;
    toHTMLString(): string[];
}
interface IVNodeMethod {
    (nodeName: "a", nodeType?: 1): VMElement.VAElement & IVNodeMethod;
}
declare namespace VMElement {
    class VAElement extends VHtmlElement {
        nodeName: string;
        target: string;
        download: string;
        ping: string;
        rel: string;
        hreflang: string;
        type: string;
        coords: string;
        charset: string;
        name: string;
        rev: string;
        shape: string;
        href: string;
    }
}
interface IVNodeMethod {
    (nodeName: "area", nodeType?: 1): VMElement.VAreaElement & IVNodeMethod;
}
declare namespace VMElement {
    class VAreaElement extends VHtmlElement {
        nodeName: string;
        alt: string;
        coords: string;
        shape: string;
        target: string;
        ping: string;
        noHref: string;
        href: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "base", nodeType?: 1): VMElement.VBaseElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBaseElement extends VHtmlElement {
        nodeName: string;
        href: string;
        target: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "basefont", nodeType?: 1): VMElement.VBasefontElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBasefontElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "blockquote", nodeType?: 1): VMElement.VBlockquoteElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBlockquoteElement extends VHtmlElement {
        nodeName: string;
        cite: string;
    }
}
interface IVNodeMethod {
    (nodeName: "body", nodeType?: 1): VMElement.VBodyElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBodyElement extends VHtmlElement {
        nodeName: string;
        text: string;
        link: string;
        vLink: string;
        aLink: string;
        bgColor: string;
        background: string;
    }
}
interface IVNodeMethod {
    (nodeName: "br", nodeType?: 1): VMElement.VBrElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBrElement extends VHtmlElement {
        nodeName: string;
        clear: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "canvas", nodeType?: 1): VMElement.VCanvasElement & IVNodeMethod;
}
declare namespace VMElement {
    class VCanvasElement extends VHtmlElement {
        nodeName: string;
        width: string;
        height: string;
    }
}
interface IVNodeMethod {
    (nodeName: "caption", nodeType?: 1): VMElement.VCaptionElement & IVNodeMethod;
}
declare namespace VMElement {
    class VCaptionElement extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "col", nodeType?: 1): VMElement.VColElement & IVNodeMethod;
}
declare namespace VMElement {
    class VColElement extends VHtmlElement {
        nodeName: string;
        span: string;
        align: string;
        vAlign: string;
        width: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "colgroup", nodeType?: 1): VMElement.VColgroupElement & IVNodeMethod;
}
declare namespace VMElement {
    class VColgroupElement extends VHtmlElement {
        nodeName: string;
        span: string;
        align: string;
        vAlign: string;
        width: string;
    }
}
interface IVNodeMethod {
    (nodeName: "dialog", nodeType?: 1): VMElement.VDialogElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDialogElement extends VHtmlElement {
        nodeName: string;
        open: string;
    }
}
interface IVNodeMethod {
    (nodeName: "dir", nodeType?: 1): VMElement.VDirElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDirElement extends VHtmlElement {
        nodeName: string;
        compact: string;
    }
}
interface IVNodeMethod {
    (nodeName: "div", nodeType?: 1): VMElement.VDivElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDivElement extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "dl", nodeType?: 1): VMElement.VDlElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDlElement extends VHtmlElement {
        nodeName: string;
        compact: string;
    }
}
interface IVNodeMethod {
    (nodeName: "fieldset", nodeType?: 1): VMElement.VFieldsetElement & IVNodeMethod;
}
declare namespace VMElement {
    class VFieldsetElement extends VHtmlElement {
        nodeName: string;
        disabled: string;
        name: string;
    }
}
interface IVNodeMethod {
    (nodeName: "frame", nodeType?: 1): VMElement.VFrameElement & IVNodeMethod;
}
declare namespace VMElement {
    class VFrameElement extends VHtmlElement {
        nodeName: string;
        name: string;
        scrolling: string;
        frameBorder: string;
        marginHeight: string;
        marginWidth: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "h1", nodeType?: 1): VMElement.VH1Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH1Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "h2", nodeType?: 1): VMElement.VH2Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH2Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "h3", nodeType?: 1): VMElement.VH3Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH3Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "h4", nodeType?: 1): VMElement.VH4Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH4Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "h5", nodeType?: 1): VMElement.VH5Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH5Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "h6", nodeType?: 1): VMElement.VH6Element & IVNodeMethod;
}
declare namespace VMElement {
    class VH6Element extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "head", nodeType?: 1): VMElement.VHeadElement & IVNodeMethod;
}
declare namespace VMElement {
    class VHeadElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "hr", nodeType?: 1): VMElement.VHrElement & IVNodeMethod;
}
declare namespace VMElement {
    class VHrElement extends VHtmlElement {
        nodeName: string;
        align: string;
        color: string;
        noShade: string;
        size: string;
        width: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "iframe", nodeType?: 1): VMElement.VIframeElement & IVNodeMethod;
}
declare namespace VMElement {
    class VIframeElement extends VHtmlElement {
        nodeName: string;
        src: string;
        srcdoc: string;
        name: string;
        sandbox: string;
        allowFullscreen: string;
        width: string;
        height: string;
        align: string;
        scrolling: string;
        frameBorder: string;
        longDesc: string;
        marginHeight: string;
        marginWidth: string;
    }
}
interface IVNodeMethod {
    (nodeName: "img", nodeType?: 1): VMElement.VImgElement & IVNodeMethod;
}
declare namespace VMElement {
    class VImgElement extends VHtmlElement {
        nodeName: string;
        alt: string;
        src: string;
        srcset: string;
        sizes: string;
        crossOrigin: string;
        useMap: string;
        isMap: string;
        width: string;
        height: string;
        name: string;
        lowsrc: string;
        align: string;
        hspace: string;
        vspace: string;
        longDesc: string;
        border: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "input", nodeType?: 1): VMElement.VInputElement & IVNodeMethod;
}
declare namespace VMElement {
    class VInputElement extends VHtmlElement {
        nodeName: string;
        accept: string;
        alt: string;
        autocomplete: string;
        autofocus: string;
        checked: string;
        dirName: string;
        disabled: string;
        formAction: string;
        formEnctype: string;
        formMethod: string;
        formNoValidate: string;
        formTarget: string;
        height: string;
        max: string;
        maxLength: string;
        min: string;
        minLength: string;
        multiple: string;
        name: string;
        pattern: string;
        placeholder: string;
        readOnly: string;
        required: string;
        size: string;
        src: string;
        step: string;
        type: string;
        value: string;
        width: string;
        align: string;
        useMap: string;
        autocapitalize: string;
        webkitdirectory: string;
        incremental: string;
        constructor();
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation(): void;
    }
}
interface IVNodeMethod {
    (nodeName: "ins", nodeType?: 1): VMElement.VInsElement & IVNodeMethod;
}
declare namespace VMElement {
    class VInsElement extends VHtmlElement {
        nodeName: string;
        cite: string;
        dateTime: string;
    }
}
interface IVNodeMethod {
    (nodeName: "keygen", nodeType?: 1): VMElement.VKeygenElement & IVNodeMethod;
}
declare namespace VMElement {
    class VKeygenElement extends VHtmlElement {
        nodeName: string;
        autofocus: string;
        challenge: string;
        disabled: string;
        keytype: string;
        name: string;
    }
}
interface IVNodeMethod {
    (nodeName: "legend", nodeType?: 1): VMElement.VLegendElement & IVNodeMethod;
}
declare namespace VMElement {
    class VLegendElement extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "li", nodeType?: 1): VMElement.VLiElement & IVNodeMethod;
}
declare namespace VMElement {
    class VLiElement extends VHtmlElement {
        nodeName: string;
        value: string;
        type: string;
    }
}
interface IVNodeMethod {
    (nodeName: "link", nodeType?: 1): VMElement.VLinkElement & IVNodeMethod;
}
declare namespace VMElement {
    class VLinkElement extends VHtmlElement {
        nodeName: string;
        disabled: string;
        href: string;
        crossOrigin: string;
        rel: string;
        media: string;
        hreflang: string;
        type: string;
        charset: string;
        rev: string;
        target: string;
        integrity: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "map", nodeType?: 1): VMElement.VMapElement & IVNodeMethod;
}
declare namespace VMElement {
    class VMapElement extends VHtmlElement {
        nodeName: string;
        name: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "menu", nodeType?: 1): VMElement.VMenuElement & IVNodeMethod;
}
declare namespace VMElement {
    class VMenuElement extends VHtmlElement {
        nodeName: string;
        compact: string;
    }
}
interface IVNodeMethod {
    (nodeName: "meta", nodeType?: 1): VMElement.VMetaElement & IVNodeMethod;
}
declare namespace VMElement {
    class VMetaElement extends VHtmlElement {
        nodeName: string;
        name: string;
        content: string;
        scheme: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "meter", nodeType?: 1): VMElement.VMeterElement & IVNodeMethod;
}
declare namespace VMElement {
    class VMeterElement extends VHtmlElement {
        nodeName: string;
        value: string;
        min: string;
        max: string;
        low: string;
        high: string;
        optimum: string;
    }
}
interface IVNodeMethod {
    (nodeName: "ol", nodeType?: 1): VMElement.VOlElement & IVNodeMethod;
}
declare namespace VMElement {
    class VOlElement extends VHtmlElement {
        nodeName: string;
        reversed: string;
        start: string;
        type: string;
        compact: string;
    }
}
interface IVNodeMethod {
    (nodeName: "optgroup", nodeType?: 1): VMElement.VOptgroupElement & IVNodeMethod;
}
declare namespace VMElement {
    class VOptgroupElement extends VHtmlElement {
        nodeName: string;
        disabled: string;
        label: string;
    }
}
interface IVNodeMethod {
    (nodeName: "option", nodeType?: 1): VMElement.VOptionElement & IVNodeMethod;
}
declare namespace VMElement {
    class VOptionElement extends VHtmlElement {
        nodeName: string;
        disabled: string;
        label: string;
        selected: string;
        value: string;
    }
}
interface IVNodeMethod {
    (nodeName: "output", nodeType?: 1): VMElement.VOutputElement & IVNodeMethod;
}
declare namespace VMElement {
    class VOutputElement extends VHtmlElement {
        nodeName: string;
        name: string;
    }
}
interface IVNodeMethod {
    (nodeName: "param", nodeType?: 1): VMElement.VParamElement & IVNodeMethod;
}
declare namespace VMElement {
    class VParamElement extends VHtmlElement {
        nodeName: string;
        name: string;
        value: string;
        type: string;
        valueType: string;
        constructor();
    }
}
interface IVNodeMethod {
    (nodeName: "p", nodeType?: 1): VMElement.VPElement & IVNodeMethod;
}
declare namespace VMElement {
    class VPElement extends VHtmlElement {
        nodeName: string;
        align: string;
    }
}
interface IVNodeMethod {
    (nodeName: "pre", nodeType?: 1): VMElement.VPreElement & IVNodeMethod;
}
declare namespace VMElement {
    class VPreElement extends VHtmlElement {
        nodeName: string;
        width: string;
    }
}
interface IVNodeMethod {
    (nodeName: "progress", nodeType?: 1): VMElement.VProgressElement & IVNodeMethod;
}
declare namespace VMElement {
    class VProgressElement extends VHtmlElement {
        nodeName: string;
        value: string;
        max: string;
    }
}
interface IVNodeMethod {
    (nodeName: "q", nodeType?: 1): VMElement.VQElement & IVNodeMethod;
}
declare namespace VMElement {
    class VQElement extends VHtmlElement {
        nodeName: string;
        cite: string;
    }
}
interface IVNodeMethod {
    (nodeName: "script", nodeType?: 1): VMElement.VScriptElement & IVNodeMethod;
}
declare namespace VMElement {
    class VScriptElement extends VHtmlElement {
        nodeName: string;
        src: string;
        type: string;
        charset: string;
        async: string;
        defer: string;
        crossOrigin: string;
        event: string;
        integrity: string;
        toJS(space?: number): string;
        private toScriptText();
    }
}
interface IVNodeMethod {
    (nodeName: "select", nodeType?: 1): VMElement.VSelectElement & IVNodeMethod;
}
declare namespace VMElement {
    class VSelectElement extends VHtmlElement {
        nodeName: string;
        autofocus: string;
        disabled: string;
        multiple: string;
        name: string;
        required: string;
        size: string;
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation(): void;
    }
}
interface IVNodeMethod {
    (nodeName: "source", nodeType?: 1): VMElement.VSourceElement & IVNodeMethod;
}
declare namespace VMElement {
    class VSourceElement extends VHtmlElement {
        nodeName: string;
        src: string;
        type: string;
        srcset: string;
        sizes: string;
        media: string;
    }
}
interface IVNodeMethod {
    (nodeName: "style", nodeType?: 1): VMElement.VStyleElement & IVNodeMethod;
}
declare namespace VMElement {
    class VStyleElement extends VHtmlElement {
        nodeName: string;
        media: string;
        type: string;
    }
}
interface IVNodeMethod {
    (nodeName: "table", nodeType?: 1): VMElement.VTableElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTableElement extends VHtmlElement {
        nodeName: string;
        align: string;
        border: string;
        frame: string;
        rules: string;
        summary: string;
        width: string;
        bgColor: string;
        cellPadding: string;
        cellSpacing: string;
    }
}
interface IVNodeMethod {
    (nodeName: "tbody", nodeType?: 1): VMElement.VTbodyElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTbodyElement extends VHtmlElement {
        nodeName: string;
        align: string;
        vAlign: string;
    }
}
interface IVNodeMethod {
    (nodeName: "td", nodeType?: 1): VMElement.VTdElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTdElement extends VHtmlElement {
        nodeName: string;
        colSpan: string;
        rowSpan: string;
        headers: string;
        align: string;
        axis: string;
        height: string;
        width: string;
        noWrap: string;
        vAlign: string;
        bgColor: string;
        abbr: string;
        scope: string;
    }
}
interface IVNodeMethod {
    (nodeName: "textarea", nodeType?: 1): VMElement.VTextareaElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTextareaElement extends VHtmlElement {
        nodeName: string;
        autofocus: string;
        cols: string;
        dirName: string;
        disabled: string;
        maxLength: string;
        minLength: string;
        name: string;
        placeholder: string;
        readOnly: string;
        required: string;
        rows: string;
        wrap: string;
        autocapitalize: string;
        value: string;
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation(): void;
    }
}
interface IVNodeMethod {
    (nodeName: "tfoot", nodeType?: 1): VMElement.VTfootElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTfootElement extends VHtmlElement {
        nodeName: string;
        align: string;
        vAlign: string;
    }
}
interface IVNodeMethod {
    (nodeName: "thead", nodeType?: 1): VMElement.VTheadElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTheadElement extends VHtmlElement {
        nodeName: string;
        align: string;
        vAlign: string;
    }
}
interface IVNodeMethod {
    (nodeName: "th", nodeType?: 1): VMElement.VThElement & IVNodeMethod;
}
declare namespace VMElement {
    class VThElement extends VHtmlElement {
        nodeName: string;
        colSpan: string;
        rowSpan: string;
        headers: string;
        align: string;
        axis: string;
        height: string;
        width: string;
        noWrap: string;
        vAlign: string;
        bgColor: string;
        abbr: string;
        scope: string;
    }
}
interface IVNodeMethod {
    (nodeName: "track", nodeType?: 1): VMElement.VTrackElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTrackElement extends VHtmlElement {
        nodeName: string;
        kind: string;
        src: string;
        srclang: string;
        label: string;
        default: string;
    }
}
interface IVNodeMethod {
    (nodeName: "tr", nodeType?: 1): VMElement.VTrElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTrElement extends VHtmlElement {
        nodeName: string;
        align: string;
        vAlign: string;
        bgColor: string;
    }
}
interface IVNodeMethod {
    (nodeName: "ul", nodeType?: 1): VMElement.VUlElement & IVNodeMethod;
}
declare namespace VMElement {
    class VUlElement extends VHtmlElement {
        nodeName: string;
        compact: string;
        type: string;
    }
}
interface IVNodeMethod {
    (nodeName: "video", nodeType?: 1): VMElement.VVideoElement & IVNodeMethod;
}
declare namespace VMElement {
    class VVideoElement extends VHtmlElement {
        nodeName: string;
        width: string;
        height: string;
        poster: string;
    }
}
interface IVNodeMethod {
    (nodeName: "xmp", nodeType?: 1): VMElement.VXmpElement & IVNodeMethod;
}
declare namespace VMElement {
    class VXmpElement extends VHtmlElement {
        nodeName: string;
        width: string;
    }
}
interface IVNodeMethod {
    (nodeName: "title", nodeType?: 1): VMElement.VTitleElement & IVNodeMethod;
}
declare namespace VMElement {
    class VTitleElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "span", nodeType?: 1): VMElement.VSpanElement & IVNodeMethod;
}
declare namespace VMElement {
    class VSpanElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "em", nodeType?: 1): VMElement.VEmElement & IVNodeMethod;
}
declare namespace VMElement {
    class VEmElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "i", nodeType?: 1): VMElement.VIElement & IVNodeMethod;
}
declare namespace VMElement {
    class VIElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "b", nodeType?: 1): VMElement.VBElement & IVNodeMethod;
}
declare namespace VMElement {
    class VBElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "form", nodeType?: 1): VMElement.VFormElement & IVNodeMethod;
}
declare namespace VMElement {
    class VFormElement extends VHtmlElement {
        nodeName: string;
        name: string;
        target: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "label", nodeType?: 1): VMElement.VLabelElement & IVNodeMethod;
}
declare namespace VMElement {
    class VLabelElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "dt", nodeType?: 1): VMElement.VDtElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDtElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "dd", nodeType?: 1): VMElement.VDdElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDdElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "embed", nodeType?: 1): VMElement.VEmbedElement & IVNodeMethod;
}
declare namespace VMElement {
    class VEmbedElement extends VHtmlElement {
        nodeName: string;
        type: string;
        width: string;
        height: string;
        align: string;
        name: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "strong", nodeType?: 1): VMElement.VStrongElement & IVNodeMethod;
}
declare namespace VMElement {
    class VStrongElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "button", nodeType?: 1): VMElement.VButtonElement & IVNodeMethod;
}
declare namespace VMElement {
    class VButtonElement extends VHtmlElement {
        nodeName: string;
        formTarget: string;
        name: string;
        value: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "object", nodeType?: 1): VMElement.VObjectElement & IVNodeMethod;
}
declare namespace VMElement {
    class VObjectElement extends VHtmlElement {
        nodeName: string;
        type: string;
        name: string;
        useMap: string;
        width: string;
        height: string;
        align: string;
        archive: string;
        code: string;
        standby: string;
        codeType: string;
        border: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "svg", nodeType?: 1): VMElement.VSvgElement & IVNodeMethod;
}
declare namespace VMElement {
    class VSvgElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "circle", nodeType?: 1): VMElement.VCircleElement & IVNodeMethod;
}
declare namespace VMElement {
    class VCircleElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "header", nodeType?: 1): VMElement.VHeaderElement & IVNodeMethod;
}
declare namespace VMElement {
    class VHeaderElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "footer", nodeType?: 1): VMElement.VFooterElement & IVNodeMethod;
}
declare namespace VMElement {
    class VFooterElement extends VHtmlElement {
        nodeName: string;
        title: string;
        lang: string;
        accessKey: string;
        webkitdropzone: string;
        id: string;
    }
}
interface IVNodeMethod {
    (nodeName: "domhelper", nodeType?: ENodeType.Element): VMElement.VDomhelperElement & IVNodeMethod;
}
declare namespace VMElement {
    class VDomhelperElement extends VHtmlElement {
        nodeName: string;
    }
}
interface IMember {
    index: number;
    node: VNode & IVNodeMethod;
    action: string;
    length: number;
    textNodeStart: number;
    htmlNodeStart: number;
    htmlNodeNameStart: number;
    attrStart: number;
    attrNameEnd: number;
    equlIndex: number;
    stringStart: number;
    stringStartChar: string;
    betweenSpaceStart: number;
    stringNodeStart: number;
    stringNodeRegExp: RegExp | null;
    stringNodeKeyLength: number;
    commentStart: number;
}
interface IVDOMBuilder {
    (html: string, vNode?: undefined): VNode & IVNodeMethod | (VNode & IVNodeMethod)[];
    (html: string, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod;
}
declare let VDOM: IVDOMBuilder, VTemplate: IVDOMBuilder;
declare let $$$: IVNodeMethod;
declare let $rootScope: RootScope;
declare class DOMScope {
    static stack: Array<Scope>;
    /**
     * 在dom节点上创建变量作用域对象
     * @param {INode} node - dom节点
     * @param {string} name - 名称
     */
    static create(node: IComment, name: string): Scope;
    /**
     * 获取变量作用域对象
     * @param {INode} node - dom节点
     */
    static get(node: INode): Scope;
    /**
     * 切断dom节点和变量作用域对象的链接
     * @param {Scope} scopeVarObject - 变量作用域对象
     */
    static unlink(scope: Scope): void;
    /**
     * 链接dom节点和变量作用域对象
     * @param {Scope} scopeVarObject - 变量作用域对象
     * @param {INode} node - dom节点
     */
    static link(scope: Scope, node: INode): void;
}
interface VComment {
    __order__?: Order.VOrder;
}
declare namespace Order {
    function addSubOrderName(name: string): void;
    /**从注释中读取命令 */
    function getCommentStringInfo(s: string): ICommentOrderInfo | null;
    interface ICommentOrderInfo {
        order?: string;
        subOrder?: string;
        condition: string;
    }
    interface IOrderConstructor {
        new (node: IComment, condition: string, ...args: any[]): VOrder;
        orderName: string;
        subOrder?: string[];
        run(this: typeof VOrder, data: IOrderData): void;
    }
    let orders: {
        [index: string]: IOrderConstructor;
    };
    function register(order: IOrderConstructor): void;
    function parseComment(this: void, node: VComment): VOrder | undefined;
    function registerEnvVar(name: string, value: any): void;
    function exec(this: void, node: INode, script: string): any;
    /**取消scope保护 */
    function resetTest(): void;
    function test(this: void, node: INode, script: string): any;
    function testSet(this: void, node: INode, name: string, script: string): void;
    function testSetValue(this: void, node: INode, name: string, value: any): void;
}
declare namespace Order {
    interface IOrderData {
        placeholder: VComment;
    }
    abstract class VOrder {
        data: IOrderData;
        node: VComment;
        condition: string;
        run?(): void;
        constructor(node: VComment, condition: string);
        static eachOrder(this: void, array: INode[] | INodeList, fn: (node: VComment, info: ICommentOrderInfo, state: ITreeEachState<INode>) => (eTreeEach | void), beginIndex?: number): ITreeEachReturn | undefined;
    }
}
declare class XHR {
    private send(type, url, data, async, fn, fnerror?);
    get(url: string, async: boolean, fn: (s: string) => void, fnerror?: (this: XMLHttpRequest, ev?: ErrorEvent) => any): void;
    post(url: string, data: string, async: boolean, fn: (s: string) => void, fnerror?: (this: XMLHttpRequest, ev?: ErrorEvent) => any): void;
}
declare namespace _util {
    const DI_TARGET = "$di$target";
    const DI_DEPENDENCIES = "$di$dependencies";
    function getServiceDependencies(ctor: any): {
        id: ServiceIdentifier<any>;
        index: number;
        optional: boolean;
    }[];
}
declare function storeServiceDependency(id: Function, target: Function, index: number, optional: boolean): void;
/**
 * A *only* valid way to create a {{ServiceIdentifier}}.
 */
declare function createDecorator<T>(serviceId: string): {
    (...args: any[]): void;
    type: T;
};
interface ServiceIdentifier<T> {
    (...args: any[]): void;
    type: T;
}
interface ITurtle {
    store: Store;
}
declare class Store {
    [index: string]: IHTMLElement;
}
declare class StoreManage {
    static take(data: Store, name: string): INode | INodeList | undefined;
    static takeElem(data: Store, name: string): IHTMLElement | IHTMLCollection | undefined;
}
interface ITurtle {
    config: Config;
}
declare class Config {
    baseUIPath: BasePath;
    baseServicePath: string;
    debugMode: number;
}
declare let $t: ITurtle;
declare let operatorRE: RegExp;
interface ITurtle {
    xhr: XHR;
    refs: IKeyArrayHashObject<IHTMLElement>;
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
}
declare function replaceCls(): void;
declare function getScopeBy(scope: any, node: INode): any;
declare function setNodeProperty(node: any, proName: any, condition: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function setQuestionAtrr(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function getTemplate(node: IHTMLElement): string;
declare function defineServiceByNode(node: IHTMLElement): void;
declare function defineClasses(node: IHTMLElement): void;
declare function parseDefine(node: IHTMLElement): void;
declare function isDefine(node: IHTMLElement): boolean;
declare function isTemplate(node: IHTMLElement): node is IHTMLElement;
declare function findTemplates(nodes: IHTMLElement[] | IArray): IElement[] | IArray;
/**从DOM树获取父组件
 * @param {}
 */
declare function getParentPart(node: VNode): Part | null;
declare function parseAsync(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseLazy(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function getUIInfo(node: IHTMLElement): string | {
    sortPath: string;
    name: string;
};
declare function parseUI(node: IHTMLElement, uiInfo: any, step: any, part: any): void;
declare function parseGet(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): eTreeEach;
declare function isHTMLElement(p: IHTMLElement | IHTMLCollection): p is IHTMLElement;
declare function parseSet(node: IHTMLElement, outerChildNodes: INode[], outerElement: IElement[], props: any, part: any): eTreeEach;
declare let includeJSFiles: (files: string | string[], callback?: () => void) => void;
declare let exec: typeof eval;
declare function execOnScript(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function execScript(node: IHTMLElement, outerChildNodes?: any, outerElement?: any, props?: any, part?: any): void;
declare function execTurtleScript(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
interface INode {
    type?: string;
}
declare function parseScript(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function execNodeQuestion(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function bindNode(node: INode, obj: any, name: any): void;
declare function bindNodeByCondition(node: INode, condition: string): void;
declare function bindNodeFunction(node: INode, bindVar: any, fn: any): {
    object: any;
    name: any;
    targetObject: any;
    targetName: string;
};
declare function bindEval(node: INode, s: any, outer: any, outerElement: any, props: any, part: any, fn: any): {
    object: any;
    name: any;
    targetObject: any;
    targetName: string;
};
declare class ElementParser {
    GET: typeof parseGet;
    SET: typeof parseSet;
    SCRIPT: typeof parseScript;
}
declare function bindShowHide(node: IElement, s: any, isBindShow: any, outer: any, outerElement: any, props: any, part: any): void;
declare class AttributeParser {
    ref(node: IElement, outerChildNodes: IElement[], outerElement: any, props: any, part: any): void;
    ":"(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    'p-ref'(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    bind(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    remove(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    add(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    show(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    hide(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    cls(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
    'p-main'(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
}
declare let elementParser: ElementParser;
declare let attributeParser: AttributeParser;
declare function initHTML(arr: INode[] | INodeList, outerChildNodes?: any, outerElement?: any, props?: any, part?: any): void;
declare function getParts(childNodes: VNode[]): Part[];
declare function getService(serviceName: string): Object;
/**
 * 可躲过一些js压缩库console.log;
 */
declare let log: Function;
/**
 * 可躲过一些js压缩库debugger;
 */
declare let bp: Function;
declare let unescape: (v: string) => string;
declare function getQueryString(name: string): string | null;
interface String {
    match(regexp: RegExp): RegExpMatchArray;
}
declare let getNameByURL: (url: string) => string;
declare let getFileNameByURL: (url: string) => string;
declare function appendQueryString(name: string, value: string): string;
declare class PartParamFilter {
    static bool(v: any): boolean;
    static intmin(v: any, p: any): any;
    static string(v: any): string;
    static floatmin(v: any, p: any): any;
    static int(v: any): number;
    static float(v: any): number;
    static pxtoem(v: any, p: any): string;
    static color(v: any): any;
    static date(v: any, p: any): string;
    static only(v: any, p: any): any;
    static udftotrue(v: any): any;
    static anytotrue(v: any): any;
    static udftofalse(v: any): any;
    static anytofalse(v: any): any;
    static udftonull(v: any): any;
    static anytonull(v: any): any;
    static udftoemptystr(v: any): any;
    static anytoemptystr(v: any): any;
}
declare const colorRE: RegExp;
interface ITurtle {
    parts: IKeyArrayHashObject<Part>;
    service: Service;
    T: TemplateList;
}
declare class PartParam {
    name: string;
    hasDefault: boolean;
    filter: any;
    filterParam: string;
    defaultValue: string;
    limitValue: string;
    constructor(name: string, hasDefault: boolean, filter: any, filterParam: string, defaultValue: string, limitValue: string);
}
declare const memberRE: RegExp;
interface IPartTemplate {
    params: ArrayEx<PartParam>;
    datas: ArrayEx<string>;
    extends: IPartTemplate;
    partName: string;
    service: Service;
    parseParamsHelp: (p) => void;
}
declare class PartTemplate implements IPartTemplate {
    name: string;
    sortPath: string;
    path: string;
    partName: string;
    Instance: ArrayEx<Part>;
    params: ArrayEx<PartParam>;
    datas: ArrayEx<string>;
    extends: IPartTemplate;
    isJSDefine: boolean;
    parts: Array<Part>;
    service: Service;
    constructor(name: string, sortPath: string, path: string, s: string | IPartTemplate, ext: any);
    renderIn(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): any;
    renderBefore(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): any;
    /**
     * 渲染dom
     */
    render(uiNode: IHTMLElement, that: any, outerChildNodes: any, outerElement: any, props: any, part: Part, refPartName: string, reExtends: boolean): any;
    /**由props构建html字符串
     * @param {Object} props
     * */
    joinDatasByProps(props: Object): string;
    toDefineString(): string;
    parseParamsHelp(p: any): void;
    getParamsHelp(): any[];
}
declare namespace ComponentView {
    interface IView {
        tops: (VNode & IVNodeMethod)[];
        initDom(): void;
    }
}
interface VNodeVMData {
    sign: number;
    part: Part;
}
interface IPartRefs {
    [index: string]: INode | undefined;
    resize?: IHTMLElement;
    main?: IHTMLElement;
    begin: VComment & IVNodeMethod;
    end: VComment & IVNodeMethod;
}
declare abstract class Part extends EventEmitterEx {
    template: PartTemplate;
    props: Object;
    abstract dom: ComponentView.IView;
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
    protected nodeStore: (VNode & IVNodeMethod)[];
    /**节点命名空间 */
    refs: IPartRefs;
    /**资源路径 */
    resPath: string;
    /**resize事件管理器*/
    $resize: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**init事件管理器 */
    $init: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**insert事件管理器 */
    $online: EventHelper<(this: void, part: Part, node: IHTMLElement) => void, (this: void, part: Part, node: IHTMLElement) => boolean>;
    /**remove事件管理器 */
    $offline: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**初始化对象 */
    constructor(template: PartTemplate, props: Object, outerChildNodes: INode[], outerElement: IHTMLCollection);
    /**即时子Part数组 */
    readonly child: Part[];
    /**子节点数目 */
    readonly elementLength: number;
    /**即时读取子节点 */
    readonly elements: (VNode & IVNodeMethod)[];
    /**读取父组件 */
    readonly parent: Part;
    /**读取组件下所有DOM节点 */
    readonly innerHTML: string;
    /**读取父节点 */
    readonly elemParent: VNode & IVNodeMethod;
    readonly scopeNodes: INode[];
    /**获取组件区块（试验） */
    /**设置组件宽高
     * @param {ClientRect} rect 区块
    */
    size: ClientRect;
    toString(): string;
    treeDiagram(tabSpace: any): string;
    insertTo(elem: any): void;
    insertBefore(elem: any): void;
    remove(): void;
}
declare class ClientHelper {
    private data;
    private isListen;
    private events;
    private emit();
    private setSizeProperty(name, fn);
    constructor();
}
declare let $clientHelper: ClientHelper;
declare class Ready {
    private _isReady;
    on(fn: () => void): void;
    readyFunctions: Function[];
    isReady: boolean;
}
declare let readyRE: RegExp;
declare function renderTemplate(tp: IHTMLElement): void;
interface IRenderDocument {
    (): void;
    beginTime?: Date;
    endTime?: Date;
}
declare class Turtle extends EventEmitterEx implements ITurtle {
    config: Config;
    T: TemplateList;
    xhr: XHR;
    service: Service;
    store: Store;
    readyByRenderDocument: Ready;
    /**error事件管理器*/
    $error: EventHelper<(this: void, event: any) => void, (this: void, event: any) => boolean>;
    parts: IKeyArrayHashObject<Part>;
    refs: IKeyArrayHashObject<IHTMLElement>;
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
    turtleScriptElement: IHTMLScriptElement;
    url: string;
    isCompile: boolean;
    getBind: typeof getBind;
    constructor();
    private getScriptNode();
    readonly rootParts: Part[];
    emitResize(): void;
    renderDocument: IRenderDocument;
    private r1(scriptNode, compileuilist, compileName, compileInfo, compile);
    private r2();
    ready(fn: () => void): this;
}
declare let turtle: Turtle;
