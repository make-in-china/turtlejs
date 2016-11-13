
/// <reference path="../lib/ArrayEx.ts"/>
/// <reference path="INamedNodeMap.ts"/>

interface IExp{
    (...arg):any
    __me__:IExp
}
interface INodeList {
    length: number;
    item(index: number): INode|undefined;
    [index: number]: INode|undefined;
}
// type INodeArray=INodeList|ArrayEx<INode>|INode[]|IHTMLCollection;
interface INode extends EventTarget {
    // attributes: INamedNodeMap;
    readonly childNodes: INodeList;
    previousSibling: INode|null;
    nextSibling: INode|null;
    parentNode: INode|null;
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
    valueOf():IElement;
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
    text: string;
}
interface IHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(nameOrIndex?: any, optionalIndex?: any): IHTMLElement|undefined;
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): IHTMLElement;
    [index: number]: IHTMLElement|undefined;
}
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
    __proto__:Object
}