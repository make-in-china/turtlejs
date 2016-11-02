declare type Fun = (...arg) => void;
declare let $t: ITurtle;
interface ITurtle {
}
interface IExp {
    (...arg: any[]): any;
    __me__: IExp;
}
interface INodeList {
    length: number;
    item(index: number): INode;
    [index: number]: INode;
}
declare type INodeArray = INodeList | ArrayEx<INode> | INode[] | IHTMLCollection;
interface INode extends EventTarget {
    valueOf(): INode;
    attributes?: NamedNodeMap;
    baseURI?: string;
    childNodes?: INodeList;
    firstChild?: INode;
    lastChild?: INode;
    localName?: string;
    namespaceURI?: string;
    nextSibling?: INode;
    nodeName?: string;
    nodeType?: number;
    nodeValue?: string;
    ownerDocument?: Document;
    parentElement?: IHTMLElement;
    parentNode?: INode;
    prefix?: string;
    previousSibling?: INode;
    textContent?: string;
    appendChild?(newChild: INode): INode;
    cloneNode?(deep?: boolean): INode;
    compareDocumentPosition?(other: INode): number;
    hasAttributes?(): boolean;
    hasChildNodes?(): boolean;
    insertBefore?(newChild: INode, refChild?: INode): INode;
    isDefaultNamespace?(namespaceURI: string): boolean;
    isEqualNode?(arg: INode): boolean;
    isSameNode?(other: INode): boolean;
    lookupNamespaceURI?(prefix: string): string;
    lookupPrefix?(namespaceURI: string): string;
    normalize?(): void;
    removeChild?(oldChild: INode): INode;
    replaceChild?(newChild: INode, oldChild: INode): INode;
    contains?(INode: INode): boolean;
    ATTRIBUTE_NODE?: number;
    CDATA_SECTION_NODE?: number;
    COMMENT_NODE?: number;
    DOCUMENT_FRAGMENT_NODE?: number;
    DOCUMENT_NODE?: number;
    DOCUMENT_POSITION_CONTAINED_BY?: number;
    DOCUMENT_POSITION_CONTAINS?: number;
    DOCUMENT_POSITION_DISCONNECTED?: number;
    DOCUMENT_POSITION_FOLLOWING?: number;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC?: number;
    DOCUMENT_POSITION_PRECEDING?: number;
    DOCUMENT_TYPE_NODE?: number;
    ELEMENT_NODE?: number;
    ENTITY_NODE?: number;
    ENTITY_REFERENCE_NODE?: number;
    NOTATION_NODE?: number;
    PROCESSING_INSTRUCTION_NODE?: number;
    TEXT_NODE?: number;
}
interface IElementTraversal {
    childElementCount?: number;
    firstElementChild?: IElement;
    lastElementChild?: IElement;
    nextElementSibling?: IElement;
    previousElementSibling?: IElement;
}
interface INodeListOf<ITNode extends INode> extends INodeList {
    length: number;
    item(index: number): ITNode;
    [index: number]: ITNode;
}
interface INodeSelector {
    querySelector?(selectors: string): IElement;
    querySelectorAll?(selectors: string): INodeListOf<IElement>;
}
interface IChildNode {
    remove?(): void;
}
interface IElement extends INode, GlobalEventHandlers, IElementTraversal, INodeSelector, IChildNode {
    valueOf(): IElement;
    classList?: DOMTokenList;
    clientHeight?: number;
    clientLeft?: number;
    clientTop?: number;
    clientWidth?: number;
    offsetHeight?: number;
    offsetLeft?: number;
    offsetTop?: number;
    offsetWidth?: number;
    msContentZoomFactor?: number;
    msRegionOverflow?: string;
    onariarequest?: (ev: AriaRequestEvent) => any;
    oncommand?: (ev: CommandEvent) => any;
    ongotpointercapture?: (ev: PointerEvent) => any;
    onlostpointercapture?: (ev: PointerEvent) => any;
    onmsgesturechange?: (ev: MSGestureEvent) => any;
    onmsgesturedoubletap?: (ev: MSGestureEvent) => any;
    onmsgestureend?: (ev: MSGestureEvent) => any;
    onmsgesturehold?: (ev: MSGestureEvent) => any;
    onmsgesturestart?: (ev: MSGestureEvent) => any;
    onmsgesturetap?: (ev: MSGestureEvent) => any;
    onmsgotpointercapture?: (ev: MSPointerEvent) => any;
    onmsinertiastart?: (ev: MSGestureEvent) => any;
    onmslostpointercapture?: (ev: MSPointerEvent) => any;
    onmspointercancel?: (ev: MSPointerEvent) => any;
    onmspointerdown?: (ev: MSPointerEvent) => any;
    onmspointerenter?: (ev: MSPointerEvent) => any;
    onmspointerleave?: (ev: MSPointerEvent) => any;
    onmspointermove?: (ev: MSPointerEvent) => any;
    onmspointerout?: (ev: MSPointerEvent) => any;
    onmspointerover?: (ev: MSPointerEvent) => any;
    onmspointerup?: (ev: MSPointerEvent) => any;
    ontouchcancel?: (ev: TouchEvent) => any;
    ontouchend?: (ev: TouchEvent) => any;
    ontouchmove?: (ev: TouchEvent) => any;
    ontouchstart?: (ev: TouchEvent) => any;
    onwebkitfullscreenchange?: (ev: Event) => any;
    onwebkitfullscreenerror?: (ev: Event) => any;
    scrollHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
    scrollWidth?: number;
    tagName?: string;
    id?: string;
    className?: string;
    innerHTML?: string;
    getAttribute?(name?: string): string;
    getAttributeNS?(namespaceURI: string, localName: string): string;
    getAttributeNode?(name: string): Attr;
    getAttributeNodeNS?(namespaceURI: string, localName: string): Attr;
    getBoundingClientRect?(): ClientRect;
    getClientRects?(): ClientRectList;
    getElementsByTagName?(name: "a"): NodeListOf<HTMLAnchorElement>;
    getElementsByTagName?(name: "abbr"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "acronym"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "address"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "applet"): NodeListOf<HTMLAppletElement>;
    getElementsByTagName?(name: "area"): NodeListOf<HTMLAreaElement>;
    getElementsByTagName?(name: "article"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "aside"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "audio"): NodeListOf<HTMLAudioElement>;
    getElementsByTagName?(name: "b"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "base"): NodeListOf<HTMLBaseElement>;
    getElementsByTagName?(name: "basefont"): NodeListOf<HTMLBaseFontElement>;
    getElementsByTagName?(name: "bdo"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "big"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "blockquote"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "body"): NodeListOf<HTMLBodyElement>;
    getElementsByTagName?(name: "br"): NodeListOf<HTMLBRElement>;
    getElementsByTagName?(name: "button"): NodeListOf<HTMLButtonElement>;
    getElementsByTagName?(name: "canvas"): NodeListOf<HTMLCanvasElement>;
    getElementsByTagName?(name: "caption"): NodeListOf<HTMLTableCaptionElement>;
    getElementsByTagName?(name: "center"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "circle"): NodeListOf<SVGCircleElement>;
    getElementsByTagName?(name: "cite"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "clippath"): NodeListOf<SVGClipPathElement>;
    getElementsByTagName?(name: "code"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "col"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName?(name: "colgroup"): NodeListOf<HTMLTableColElement>;
    getElementsByTagName?(name: "datalist"): NodeListOf<HTMLDataListElement>;
    getElementsByTagName?(name: "dd"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "defs"): NodeListOf<SVGDefsElement>;
    getElementsByTagName?(name: "del"): NodeListOf<HTMLModElement>;
    getElementsByTagName?(name: "desc"): NodeListOf<SVGDescElement>;
    getElementsByTagName?(name: "dfn"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "dir"): NodeListOf<HTMLDirectoryElement>;
    getElementsByTagName?(name: "div"): NodeListOf<HTMLDivElement>;
    getElementsByTagName?(name: "dl"): NodeListOf<HTMLDListElement>;
    getElementsByTagName?(name: "dt"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "ellipse"): NodeListOf<SVGEllipseElement>;
    getElementsByTagName?(name: "em"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "embed"): NodeListOf<HTMLEmbedElement>;
    getElementsByTagName?(name: "feblend"): NodeListOf<SVGFEBlendElement>;
    getElementsByTagName?(name: "fecolormatrix"): NodeListOf<SVGFEColorMatrixElement>;
    getElementsByTagName?(name: "fecomponenttransfer"): NodeListOf<SVGFEComponentTransferElement>;
    getElementsByTagName?(name: "fecomposite"): NodeListOf<SVGFECompositeElement>;
    getElementsByTagName?(name: "feconvolvematrix"): NodeListOf<SVGFEConvolveMatrixElement>;
    getElementsByTagName?(name: "fediffuselighting"): NodeListOf<SVGFEDiffuseLightingElement>;
    getElementsByTagName?(name: "fedisplacementmap"): NodeListOf<SVGFEDisplacementMapElement>;
    getElementsByTagName?(name: "fedistantlight"): NodeListOf<SVGFEDistantLightElement>;
    getElementsByTagName?(name: "feflood"): NodeListOf<SVGFEFloodElement>;
    getElementsByTagName?(name: "fefunca"): NodeListOf<SVGFEFuncAElement>;
    getElementsByTagName?(name: "fefuncb"): NodeListOf<SVGFEFuncBElement>;
    getElementsByTagName?(name: "fefuncg"): NodeListOf<SVGFEFuncGElement>;
    getElementsByTagName?(name: "fefuncr"): NodeListOf<SVGFEFuncRElement>;
    getElementsByTagName?(name: "fegaussianblur"): NodeListOf<SVGFEGaussianBlurElement>;
    getElementsByTagName?(name: "feimage"): NodeListOf<SVGFEImageElement>;
    getElementsByTagName?(name: "femerge"): NodeListOf<SVGFEMergeElement>;
    getElementsByTagName?(name: "femergenode"): NodeListOf<SVGFEMergeNodeElement>;
    getElementsByTagName?(name: "femorphology"): NodeListOf<SVGFEMorphologyElement>;
    getElementsByTagName?(name: "feoffset"): NodeListOf<SVGFEOffsetElement>;
    getElementsByTagName?(name: "fepointlight"): NodeListOf<SVGFEPointLightElement>;
    getElementsByTagName?(name: "fespecularlighting"): NodeListOf<SVGFESpecularLightingElement>;
    getElementsByTagName?(name: "fespotlight"): NodeListOf<SVGFESpotLightElement>;
    getElementsByTagName?(name: "fetile"): NodeListOf<SVGFETileElement>;
    getElementsByTagName?(name: "feturbulence"): NodeListOf<SVGFETurbulenceElement>;
    getElementsByTagName?(name: "fieldset"): NodeListOf<HTMLFieldSetElement>;
    getElementsByTagName?(name: "figcaption"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "figure"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "filter"): NodeListOf<SVGFilterElement>;
    getElementsByTagName?(name: "font"): NodeListOf<HTMLFontElement>;
    getElementsByTagName?(name: "footer"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "foreignobject"): NodeListOf<SVGForeignObjectElement>;
    getElementsByTagName?(name: "form"): NodeListOf<HTMLFormElement>;
    getElementsByTagName?(name: "frame"): NodeListOf<HTMLFrameElement>;
    getElementsByTagName?(name: "frameset"): NodeListOf<HTMLFrameSetElement>;
    getElementsByTagName?(name: "g"): NodeListOf<SVGGElement>;
    getElementsByTagName?(name: "h1"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "h2"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "h3"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "h4"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "h5"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "h6"): NodeListOf<HTMLHeadingElement>;
    getElementsByTagName?(name: "head"): NodeListOf<HTMLHeadElement>;
    getElementsByTagName?(name: "header"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "hgroup"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "hr"): NodeListOf<HTMLHRElement>;
    getElementsByTagName?(name: "html"): NodeListOf<HTMLHtmlElement>;
    getElementsByTagName?(name: "i"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "iframe"): NodeListOf<HTMLIFrameElement>;
    getElementsByTagName?(name: "image"): NodeListOf<SVGImageElement>;
    getElementsByTagName?(name: "img"): NodeListOf<HTMLImageElement>;
    getElementsByTagName?(name: "input"): NodeListOf<HTMLInputElement>;
    getElementsByTagName?(name: "ins"): NodeListOf<HTMLModElement>;
    getElementsByTagName?(name: "isindex"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "kbd"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "keygen"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "label"): NodeListOf<HTMLLabelElement>;
    getElementsByTagName?(name: "legend"): NodeListOf<HTMLLegendElement>;
    getElementsByTagName?(name: "li"): NodeListOf<HTMLLIElement>;
    getElementsByTagName?(name: "line"): NodeListOf<SVGLineElement>;
    getElementsByTagName?(name: "lineargradient"): NodeListOf<SVGLinearGradientElement>;
    getElementsByTagName?(name: "link"): NodeListOf<HTMLLinkElement>;
    getElementsByTagName?(name: "listing"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "map"): NodeListOf<HTMLMapElement>;
    getElementsByTagName?(name: "mark"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "marker"): NodeListOf<SVGMarkerElement>;
    getElementsByTagName?(name: "marquee"): NodeListOf<HTMLMarqueeElement>;
    getElementsByTagName?(name: "mask"): NodeListOf<SVGMaskElement>;
    getElementsByTagName?(name: "menu"): NodeListOf<HTMLMenuElement>;
    getElementsByTagName?(name: "meta"): NodeListOf<HTMLMetaElement>;
    getElementsByTagName?(name: "metadata"): NodeListOf<SVGMetadataElement>;
    getElementsByTagName?(name: "nav"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "nextid"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "nobr"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "noframes"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "noscript"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "object"): NodeListOf<HTMLObjectElement>;
    getElementsByTagName?(name: "ol"): NodeListOf<HTMLOListElement>;
    getElementsByTagName?(name: "optgroup"): NodeListOf<HTMLOptGroupElement>;
    getElementsByTagName?(name: "option"): NodeListOf<HTMLOptionElement>;
    getElementsByTagName?(name: "p"): NodeListOf<HTMLParagraphElement>;
    getElementsByTagName?(name: "param"): NodeListOf<HTMLParamElement>;
    getElementsByTagName?(name: "path"): NodeListOf<SVGPathElement>;
    getElementsByTagName?(name: "pattern"): NodeListOf<SVGPatternElement>;
    getElementsByTagName?(name: "plaintext"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "polygon"): NodeListOf<SVGPolygonElement>;
    getElementsByTagName?(name: "polyline"): NodeListOf<SVGPolylineElement>;
    getElementsByTagName?(name: "pre"): NodeListOf<HTMLPreElement>;
    getElementsByTagName?(name: "progress"): NodeListOf<HTMLProgressElement>;
    getElementsByTagName?(name: "q"): NodeListOf<HTMLQuoteElement>;
    getElementsByTagName?(name: "radialgradient"): NodeListOf<SVGRadialGradientElement>;
    getElementsByTagName?(name: "rect"): NodeListOf<SVGRectElement>;
    getElementsByTagName?(name: "rt"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "ruby"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "s"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "samp"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "script"): NodeListOf<HTMLScriptElement>;
    getElementsByTagName?(name: "section"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "select"): NodeListOf<HTMLSelectElement>;
    getElementsByTagName?(name: "small"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "source"): NodeListOf<HTMLSourceElement>;
    getElementsByTagName?(name: "span"): NodeListOf<HTMLSpanElement>;
    getElementsByTagName?(name: "stop"): NodeListOf<SVGStopElement>;
    getElementsByTagName?(name: "strike"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "strong"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "style"): NodeListOf<HTMLStyleElement>;
    getElementsByTagName?(name: "sub"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "sup"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "svg"): NodeListOf<SVGSVGElement>;
    getElementsByTagName?(name: "switch"): NodeListOf<SVGSwitchElement>;
    getElementsByTagName?(name: "symbol"): NodeListOf<SVGSymbolElement>;
    getElementsByTagName?(name: "table"): NodeListOf<HTMLTableElement>;
    getElementsByTagName?(name: "tbody"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName?(name: "td"): NodeListOf<HTMLTableDataCellElement>;
    getElementsByTagName?(name: "text"): NodeListOf<SVGTextElement>;
    getElementsByTagName?(name: "textpath"): NodeListOf<SVGTextPathElement>;
    getElementsByTagName?(name: "textarea"): NodeListOf<HTMLTextAreaElement>;
    getElementsByTagName?(name: "tfoot"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName?(name: "th"): NodeListOf<HTMLTableHeaderCellElement>;
    getElementsByTagName?(name: "thead"): NodeListOf<HTMLTableSectionElement>;
    getElementsByTagName?(name: "title"): NodeListOf<HTMLTitleElement>;
    getElementsByTagName?(name: "tr"): NodeListOf<HTMLTableRowElement>;
    getElementsByTagName?(name: "track"): NodeListOf<HTMLTrackElement>;
    getElementsByTagName?(name: "tspan"): NodeListOf<SVGTSpanElement>;
    getElementsByTagName?(name: "tt"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "u"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "ul"): NodeListOf<HTMLUListElement>;
    getElementsByTagName?(name: "use"): NodeListOf<SVGUseElement>;
    getElementsByTagName?(name: "var"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "video"): NodeListOf<HTMLVideoElement>;
    getElementsByTagName?(name: "view"): NodeListOf<SVGViewElement>;
    getElementsByTagName?(name: "wbr"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: "x-ms-webview"): NodeListOf<MSHTMLWebViewElement>;
    getElementsByTagName?(name: "xmp"): NodeListOf<HTMLElement>;
    getElementsByTagName?(name: string): NodeListOf<Element>;
    getElementsByTagNameNS?(namespaceURI: string, localName: string): NodeListOf<Element>;
    hasAttribute?(name: string): boolean;
    hasAttributeNS?(namespaceURI: string, localName: string): boolean;
    msGetRegionContent?(): MSRangeCollection;
    msGetUntransformedBounds?(): ClientRect;
    msMatchesSelector?(selectors: string): boolean;
    msReleasePointerCapture?(pointerId: number): void;
    msSetPointerCapture?(pointerId: number): void;
    msZoomTo?(args: MsZoomToOptions): void;
    releasePointerCapture?(pointerId: number): void;
    removeAttribute?(name?: string): void;
    removeAttributeNS?(namespaceURI: string, localName: string): void;
    removeAttributeNode?(oldAttr: Attr): Attr;
    requestFullscreen?(): void;
    requestPointerLock?(): void;
    setAttribute?(name: string, value: string): void;
    setAttributeNS?(namespaceURI: string, qualifiedName: string, value: string): void;
    setAttributeNode?(newAttr: Attr): Attr;
    setAttributeNodeNS?(newAttr: Attr): Attr;
    setPointerCapture?(pointerId: number): void;
    webkitMatchesSelector?(selectors: string): boolean;
    webkitRequestFullScreen?(): void;
    webkitRequestFullscreen?(): void;
    getElementsByClassName?(classNames: string): NodeListOf<Element>;
    matches?(selector: string): boolean;
    getElementsByTagName?(tagname: "picture"): NodeListOf<HTMLPictureElement>;
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
    data?: string;
    length?: number;
    appendData?(arg: string): void;
    deleteData?(offset: number, count: number): void;
    insertData?(offset: number, arg: string): void;
    replaceData?(offset: number, count: number, arg: string): void;
    substringData?(offset: number, count: number): string;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}
interface IText extends ICharacterData {
    wholeText?: string;
    replaceWholeText?(content: string): Text;
    splitText?(offset: number): Text;
}
interface IComment extends ICharacterData {
    text?: string;
}
interface IHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(nameOrIndex?: any, optionalIndex?: any): IElement;
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): IElement;
    [index: number]: IElement;
}
interface IHTMLElement extends IElement {
    accessKey?: string;
    children?: IHTMLCollection;
    contentEditable?: string;
    dataset?: DOMStringMap;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    hideFocus?: boolean;
    innerHTML?: string;
    innerText?: string;
    isContentEditable?: boolean;
    lang?: string;
    offsetHeight?: number;
    offsetLeft?: number;
    offsetParent?: Element;
    offsetTop?: number;
    offsetWidth?: number;
    onabort?: (ev: Event) => any;
    onactivate?: (ev: UIEvent) => any;
    onbeforeactivate?: (ev: UIEvent) => any;
    onbeforecopy?: (ev: DragEvent) => any;
    onbeforecut?: (ev: DragEvent) => any;
    onbeforedeactivate?: (ev: UIEvent) => any;
    onbeforepaste?: (ev: DragEvent) => any;
    onblur?: (ev: FocusEvent) => any;
    oncanplay?: (ev: Event) => any;
    oncanplaythrough?: (ev: Event) => any;
    onchange?: (ev: Event) => any;
    onclick?: (ev: MouseEvent) => any;
    oncontextmenu?: (ev: PointerEvent) => any;
    oncopy?: (ev: DragEvent) => any;
    oncuechange?: (ev: Event) => any;
    oncut?: (ev: DragEvent) => any;
    ondblclick?: (ev: MouseEvent) => any;
    ondeactivate?: (ev: UIEvent) => any;
    ondrag?: (ev: DragEvent) => any;
    ondragend?: (ev: DragEvent) => any;
    ondragenter?: (ev: DragEvent) => any;
    ondragleave?: (ev: DragEvent) => any;
    ondragover?: (ev: DragEvent) => any;
    ondragstart?: (ev: DragEvent) => any;
    ondrop?: (ev: DragEvent) => any;
    ondurationchange?: (ev: Event) => any;
    onemptied?: (ev: Event) => any;
    onended?: (ev: Event) => any;
    onerror?: (ev: Event) => any;
    onfocus?: (ev: FocusEvent) => any;
    oninput?: (ev: Event) => any;
    onkeydown?: (ev: KeyboardEvent) => any;
    onkeypress?: (ev: KeyboardEvent) => any;
    onkeyup?: (ev: KeyboardEvent) => any;
    onload?: (ev: Event) => any;
    onloadeddata?: (ev: Event) => any;
    onloadedmetadata?: (ev: Event) => any;
    onloadstart?: (ev: Event) => any;
    onmousedown?: (ev: MouseEvent) => any;
    onmouseenter?: (ev: MouseEvent) => any;
    onmouseleave?: (ev: MouseEvent) => any;
    onmousemove?: (ev: MouseEvent) => any;
    onmouseout?: (ev: MouseEvent) => any;
    onmouseover?: (ev: MouseEvent) => any;
    onmouseup?: (ev: MouseEvent) => any;
    onmousewheel?: (ev: MouseWheelEvent) => any;
    onmscontentzoom?: (ev: UIEvent) => any;
    onmsmanipulationstatechanged?: (ev: MSManipulationEvent) => any;
    onpaste?: (ev: DragEvent) => any;
    onpause?: (ev: Event) => any;
    onplay?: (ev: Event) => any;
    onplaying?: (ev: Event) => any;
    onprogress?: (ev: ProgressEvent) => any;
    onratechange?: (ev: Event) => any;
    onreset?: (ev: Event) => any;
    onscroll?: (ev: UIEvent) => any;
    onseeked?: (ev: Event) => any;
    onseeking?: (ev: Event) => any;
    onselect?: (ev: UIEvent) => any;
    onselectstart?: (ev: Event) => any;
    onstalled?: (ev: Event) => any;
    onsubmit?: (ev: Event) => any;
    onsuspend?: (ev: Event) => any;
    ontimeupdate?: (ev: Event) => any;
    onvolumechange?: (ev: Event) => any;
    onwaiting?: (ev: Event) => any;
    outerHTML?: string;
    outerText?: string;
    spellcheck?: boolean;
    style?: CSSStyleDeclaration;
    tabIndex?: number;
    title?: string;
    blur?(): void;
    click?(): void;
    dragDrop?(): boolean;
    focus?(): void;
    insertAdjacentElement?(position: string, insertedElement: Element): Element;
    insertAdjacentHTML?(where: string, html: string): void;
    insertAdjacentText?(where: string, text: string): void;
    msGetInputContext?(): MSInputMethodContext;
    scrollIntoView?(top?: boolean): void;
    setActive?(): void;
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
    autofocus?: boolean;
    /**
      * Sets or retrieves the width of the object.
      */
    cols?: number;
    /**
      * Sets or retrieves the initial contents of the object.
      */
    defaultValue?: string;
    disabled?: boolean;
    /**
      * Retrieves a reference to the form that the object is embedded in.
      */
    form?: HTMLFormElement;
    /**
      * Sets or retrieves the maximum number of characters that the user can enter in a text control.
      */
    maxLength?: number;
    /**
      * Sets or retrieves the name of the object.
      */
    name?: string;
    /**
      * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
      */
    placeholder?: string;
    /**
      * Sets or retrieves the value indicated whether the content of the object is read-only.
      */
    readOnly?: boolean;
    /**
      * When present, marks an element that can't be submitted without a value.
      */
    required?: boolean;
    /**
      * Sets or retrieves the number of horizontal rows contained in the object.
      */
    rows?: number;
    /**
      * Gets or sets the end position or offset of a text selection.
      */
    selectionEnd?: number;
    /**
      * Gets or sets the starting position or offset of a text selection.
      */
    selectionStart?: number;
    /**
      * Sets or retrieves the value indicating whether the control is selected.
      */
    status?: any;
    /**
      * Retrieves the type of control.
      */
    type?: string;
    /**
      * Returns the error message that would be displayed if the user submits the form, or an empty string if no error message. It also triggers the standard error message, such as "this is a required field". The result is that the user sees validation messages without actually submitting.
      */
    validationMessage?: string;
    /**
      * Returns a  ValidityState object that represents the validity states of an element.
      */
    validity?: ValidityState;
    /**
      * Retrieves or sets the text in the entry field of the textArea element.
      */
    value?: string;
    /**
      * Returns whether an element will successfully validate based on forms validation rules and constraints.
      */
    willValidate?: boolean;
    /**
      * Sets or retrieves how to handle wordwrapping in the object.
      */
    wrap?: string;
    /**
      * Returns whether a form will validate when it is submitted, without having to submit it.
      */
    checkValidity?(): boolean;
    /**
      * Highlights the input area of a form element.
      */
    select?(): void;
    /**
      * Sets a custom error message that is displayed when a form is submitted.
      * @param error Sets a custom error message that is displayed when a form is submitted.
      */
    setCustomValidity?(error: string): void;
    /**
      * Sets the start and end positions of a selection in a text field.
      * @param start The offset into the text field for the start of the selection.
      * @param end The offset into the text field for the end of the selection.
      */
    setSelectionRange?(start: number, end: number): void;
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
    __proto__?: Object;
}
declare class ArrayEx<T> extends Array<T> {
    last(): T;
    clear(): void;
}
interface IHashObject<T> {
    [index: string]: T;
}
declare class HashObjectManage<T> {
    static clean<T>(data: IHashObject<T>): void;
    static take<T>(data: IHashObject<T>, name: string): T;
}
interface IKeyArrayHashObject<T> {
    [index: string]: ArrayEx<T>;
}
declare class KeyArrayHashObjectManage {
    private static isArray<T>(p);
    static clean<T>(data: IKeyArrayHashObject<T>): void;
    static take<T>(data: IKeyArrayHashObject<T>, name: string): ArrayEx<T>;
    static getKeyArray<T>(data: IKeyArrayHashObject<T>): ArrayEx<ArrayEx<T>>;
    static pop<T>(data: IKeyArrayHashObject<T>, key: string): T;
    static push<T>(data: IKeyArrayHashObject<T>, key: string | string[], value: T): void;
}
interface IEventsCol {
    [index: string]: Array<Fun>;
}
declare class $Event {
    private eventsCol;
    on(name: string, fn: Fun): void;
    off(name: string, fn: Fun): boolean;
    emit(name: string, event: Event): void;
    events(name: string): Array<Fun>;
}
declare class ReadyObject {
    private _isReady;
    on(fn: () => void): void;
    readyFunctions: Fun[];
    isReady: boolean;
}
interface Constructor {
    prototype: Object;
}
declare let exec: typeof eval, toStr: () => string, arrayPrototype: any[], Objectprototype: Object, slice: (start?: number, end?: number) => any[], push: (...items: any[]) => number, splice: {
    (start: number): any[];
    (start: number, deleteCount: number, ...items: any[]): any[];
}, getPrototypeOf: (o: any) => any, replace: {
    (searchValue: string, replaceValue: string): string;
    (searchValue: string, replacer: (substring: string, ...args: any[]) => string): string;
    (searchValue: RegExp, replaceValue: string): string;
    (searchValue: RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}, persentRE: RegExp, camelCaseRE: RegExp, camelizeRE: RegExp, deCamelizeRE: RegExp, classSplitRE: RegExp, addStyleRE: RegExp, addClassNameRE: RegExp, rte: $Event;
declare let vNodesToDOM: (nodes: any) => any;
interface INode {
    insertBefore2?(newChild: INode, refChild?: INode): INode;
}
/**
 * 压缩js后保留此函数用于console.log;
 */
declare let log: Function;
/**
 * 压缩js后保留此函数用于debugger;
 */
declare let bp: Function;
declare function extend<T>(elem: T, elemEx: any): T;
declare function merge<T>(elem: T, elemEx: any): T;
declare function takeAttr(node: IElement, attrName: string, defaultValue?: any): string;
declare function getAttr(node: IElement, attrName: string, defaultValue?: any): string;
declare function isRegExp(a: any): boolean;
declare function isDate(a: any): boolean;
declare function isNumber(a: any): boolean;
declare function isString(a: any): boolean;
declare function isFunction(a: any): boolean;
declare function isObject(a: any): boolean;
declare function isUndefined(a: any): boolean;
declare let isArray: (a: any) => boolean;
declare function isPersent(s: any): boolean;
declare function persentToFloat(s: any): number;
declare function isArrayLike(a: any): boolean;
declare function _catch(e: Event, fn?: Fun): void;
declare function throwError(err: string): void;
declare function camelize(str: string): string;
declare function decamelize(str: string): string;
declare function create(type: string, tsClass?: Constructor): any;
declare let newArrayObject: (type: string) => ArrayEx<any>;
declare function NullValueHash(s: any): void;
declare function parseBool(v: any): boolean;
declare function addStyle(elem: any, style: any): void;
declare function addClassName(elem: any, className: any): void;
declare function addClass(elem: any, ...arg: any[]): void;
declare function addClasses(elem: any, clses: any): void;
declare function removeClass(elem: any, cls: any): void;
declare function removeClasses(elem: any, clses: any): void;
declare function replaceClass(sel: any, a: any, b: any): void;
declare function toggleClass(sel: any, a: any, t: any, f: any): void;
declare function removeItem<T>(arr: T[], obj: T): void;
declare function trim(s: any): any;
declare function HTMLTrim(s: any): any;
declare function trimLine(s: any): any;
declare let dateFormat: (format: any, d: any) => any;
declare function camelCase(s: any): any;
declare function insertNodesBefore(node: INode, nodes: INodeArray): void;
declare function removeNode(node: INode): INode;
declare function replaceNodeByNodes(node: INode, nodes: INodeArray): void;
declare function insertNode(node: INode, childNode: any): number;
declare function deepClone(node: INode): INode;
declare function cloneBetween(node1: INode, node2: INode): INode[];
declare function removeBlockBetween(node1: INode, node2: INode): void;
declare function replaceNodeByNode(node: INode, node2: INode): void;
declare function appendNodes(nodes: INodeArray, parent: INode): void;
declare function takeChildNodes(node: INode): INodeArray;
declare function takeOutChildNodes(node: INode): number;
declare function takeBlockBetween(node1: INode, node2: INode): INodeArray;
declare function getNodesLength(node: IHTMLElement): number;
declare function getNodeIndex(node: IHTMLElement): number;
declare function getNodesLength2(node: INode): number;
declare function getNodeIndex2(node: INode): number;
declare function splitByOnce(s: string, split: string): Array<string>;
declare const enum eTreeEach {
    c_stopEach = 1,
    c_repeat = 2,
    c_noIn = 4,
    c_noRepeat = 8,
}
interface ITreeEachStep {
    next: number;
}
interface IArray {
    length: number;
}
/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
declare function treeEach<T>(array: T[] | IArray, propertyName: string, fn: (node: T, step?: ITreeEachStep) => (eTreeEach | void), beginIndex?: number): {
    stack: [IArray | T[], number];
    state: eTreeEach;
    array: IArray | T[];
    index: number;
};
/**浏览器兼容 */
declare class ClassList {
    private __elem__;
    constructor(__elem__: IElement);
    add(value: any): void;
    remove(value: any): void;
    toggle(value: any): void;
    contains(value: any): boolean;
    item(i: any): string;
}
declare function defineClassList(object: any): void;
interface Window {
    ActiveXObject?: Object;
}
declare let isIE: boolean;
declare let withthis: string, _execValueByScope: Function, _execByScope: Function, _execExpressionsByScope: Function;
declare function execValueByScope(node: INode, s: string, v: any, scope: Scope, outerChildNodes: INodeArray, outerElement: IHTMLElement[], props: any, part: any): any;
declare let execTemplateScript: (s: string, node: INode, outerChildNodes: INodeArray, outerElement: any, props: any, part: any) => string;
declare function _getBindObject(scope: any, arrNames: Array<string>): any;
interface IBindInfo {
    name: string;
    target: IBindObject;
    targetName: string;
    event: IBindFunction;
}
declare function addBindInfo(obj: IBindObject, name: string, target: IBindObject, targetName: string, event: IBindFunction): void;
declare function removeBind(obj: any, name: any, targetName: any): boolean;
declare function onPropertyChange(obj: any, name: any, fnOnSet: any): void;
declare function objectPropertyChange(obj: any, name: any, fnOnSet: any): void;
interface IBindObject {
    __bind__?: IBindInfo[];
}
interface IBindFunction {
    (name: string): any;
    isBinding?: boolean;
    removeObject?: Fun;
    list?: IBindObject[];
}
declare function bindPropertyByName(obj: IBindObject, name: string, obj2: IBindObject, name2: string): IBindFunction;
declare let bindProperty: (obj: IBindObject, name: string, obj2: IBindObject, name2: string, type?: number) => void;
declare function bindElementProperty(obj: Object, name: string, obj2: Object, name2: string): void;
declare function bindNodeProperty(node: INode, proName: string, condition: string): void;
declare function bindElementPropertyByName(node: IHTMLElement, elementValueName: string, condition: string): void;
declare function bindPropertyByOrder(node: any, condition: any): void;
declare function bindExpressionsByOrder(node: any, condition: any): void;
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
    readonly items: Array<NameItem>;
    findByString(str: string): RegExpMatchArray;
}
declare let templateConfig: TemplateConfig;
declare let baseUIPath: BasePath;
declare let orderRE: RegExp, orderCaseRE: RegExp, parseForOrderRE: RegExp, parseForOrderRE2: RegExp, SetParseError: IParseError, orderStack: ArrayEx<{}>;
interface IParseError {
    isError?: boolean;
    (msg: string): eTreeEach;
}
interface ICommentOrderInfo {
    order?: any;
    orderCase?: any;
    condition: any;
}
interface IComment {
    __order__?: INode;
    __endNode__?: INode;
}
interface ITurtle {
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
}
declare function replaceCls(): void;
declare function getCommentStringInfo(s: any): ICommentOrderInfo;
declare let getCommentText: (node: IComment) => string;
declare function parseScopeOrder(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseCommentOrderNoScript(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseCommentOrderBlock(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function addOrderToNode(node: any, info: any, outerChildNodes: any, outerElement: any, props: any, part: any, fnGetOrder: any): any;
declare function parseIfOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseBreakOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseWhileOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseAsyncOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseSwitchOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseForOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): any;
interface IHTMLBreakElement extends IComment {
    source?: {
        run;
    };
}
declare function createBreakElement(nodes: any, order: {
    run;
}): IHTMLBreakElement;
declare function parseCommentOrder(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): any;
declare function parseComment(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare class XHR {
    private send(type, url, data, async, fn, fnerror?);
    get(url: string, async: boolean, fn: (s: string) => void, fnerror?: Fun): void;
    post(url: string, data: string, async: boolean, fn: (s: string) => void, fnerror?: Fun): void;
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
declare let $DOM: any, $node: (name: string, nodeType?: number) => INode, operatorRE: RegExp;
interface ITurtle {
    xhr: XHR;
    refs: IKeyArrayHashObject<IHTMLElement>;
}
declare function getScopeBy(scope: any, node: INode): any;
declare function execByScope(node: INode, s: string, scope: any, outer: any, outerElement: any, props: any, part: any): any;
declare function execScope(s: string, node: INode, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function setNodeProperty(node: any, proName: any, condition: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function setQuestionAtrr(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function getTemplate(node: IHTMLElement): string;
declare function defineServiceByNode(node: IHTMLElement): void;
declare function getExtendsByNode(node: IHTMLElement, sortPath: string): any;
declare function defineUIByNode(node: IHTMLElement): void;
declare function defineClasses(node: IHTMLElement): void;
declare function parseDefine(node: IHTMLElement): void;
declare function isDefine(node: IHTMLElement): boolean;
declare function isTemplate(node: IHTMLElement): boolean;
declare function findTemplates(nodes: IElement[] | IArray): IElement[] | IArray;
declare function parseUITemplate(uiName: string, uiSortPath: string, uiPath: string, sHTML: string): void;
declare function importUIHTML(uiName: string, uiSortPath: string): any;
declare function getExtends(extName: any, sortPath: any): any;
declare function parseAsync(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseLazy(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function getUIInfo(node: any): any;
declare function parseUI(node: IHTMLElement, uiInfo: any, step: any, part: any): void;
declare function parseGet(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): eTreeEach;
declare function isHTMLElement(p: IHTMLElement | IHTMLCollection): p is IHTMLElement;
declare function parseSet(node: IHTMLElement, outerChildNodes: INode[], outerElement: IElement[], props: any, part: any): eTreeEach;
declare let includeJSFiles: (files: string | string[], callback?: () => void) => void;
declare function execOnScript(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function execScript(node: any, outerChildNodes?: any, outerElement?: any, props?: any, part?: any): void;
declare function execTurtleScript(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseScript(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function execNodeQuestion(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function bindNode(node: any, obj: any, name: any): void;
declare function bindNodeByCondition(node: INode, condition: string): void;
declare function bindNodeFunction(node: any, bindVar: any, fn: any): {
    object: any;
    name: any;
    targetObject: any;
    targetName: string;
};
declare function bindEval(node: any, s: any, outer: any, outerElement: any, props: any, part: any, fn: any): {
    object: any;
    name: any;
    targetObject: any;
    targetName: string;
};
declare class ElementParser {
    GET: typeof parseGet;
    SET: typeof parseSet;
    __BREAK__: typeof parseBreakOrder;
    SCRIPT: typeof parseScript;
}
declare function bindShowHide(node: any, s: any, isBindShow: any, outer: any, outerElement: any, props: any, part: any): void;
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
declare function initHTML(arr: INodeArray, outerChildNodes?: any, outerElement?: any, props?: any, part?: any): void;
declare function getParts(childNodes: INodeArray): any[];
declare function getService(serviceName: any): any;
declare function nodesToString(nodes: INode[]): string;
declare const memberRE: RegExp;
declare const colorRE: RegExp;
interface ITurtle {
    parts: IKeyArrayHashObject<Part>;
    service: Service;
    T: TemplateList;
}
interface IComment {
    __part__?: Part;
    __sign__?: number;
}
declare class PartParamFilter {
    static bool(v: any): boolean;
    static intmin(v: any, p: any): any;
    static string(v: any): string;
    static floatmin(v: any, p: any): any;
    static int(v: any): number;
    static float(v: any): number;
    static pxtoem(v: any, p: any): string;
    static color(v: any): any;
    static date(v: any, p: any): any;
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
declare class PartParam {
    name: string;
    hasDefault: boolean;
    filter: any;
    filterParam: string;
    defaultValue: string;
    limitValue: string;
    constructor(name: string, hasDefault: boolean, filter: any, filterParam: string, defaultValue: string, limitValue: string);
}
declare class PartBase {
    template: PartTemplate;
    props: Object;
    partName: string;
    super: PartBase;
    oninit: (final: Part) => void;
    partMain: IHTMLElement;
    isInsert: boolean;
    onresize: () => void;
    $: Service;
    store: INode[];
    isExtends: boolean;
    constructor(template: PartTemplate, extPart: PartBase, props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection);
    readonly child: any[];
    readonly elements: INode[];
    emitResize(): void;
    onSetSize(rect: any): void;
    getSuper(name: string): any;
    emitInit(finalPart: any): void;
    setSize(rect: ClientRect): void;
}
declare class Part extends PartBase {
    props: Object;
    isInsert: boolean;
    begin: IComment;
    end: IComment;
    basePart: PartBase;
    oninsert: (node: INode) => void;
    onremove: () => void;
    resPath: string;
    constructor(template: PartTemplate, extPart: PartBase, props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection);
    toString(): string;
    treeDiagram(tabSpace: any): string;
    readonly elementLength: number;
    readonly elements: INode[];
    getParentPart(node: any): any;
    readonly parent: any;
    getRect(): {
        left: number;
        top: number;
        width: number;
        height: number;
        right: number;
        bottom: number;
    };
    readonly innerHTML: string;
    readonly elemParent: INode;
    insertTo(elem: any): void;
    insertBefore(elem: any): void;
    remove(): void;
    readonly scopeNodes: any[];
}
declare class ExtendsPart extends PartBase {
    props: Object;
    constructor(template: PartTemplate, extPart: PartBase, props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection);
    to(part: PartBase): void;
}
interface IPartTemplate {
    params: ArrayEx<PartParam>;
    datas: ArrayEx<string>;
    extends: IPartTemplate;
    partName: string;
    service: Service;
    beExtends: (node: INode, that, outerChildNodes: INodeArray, outerElement: IHTMLCollection, props, part) => ExtendsPart;
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
    renderIn(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): Part;
    renderBefore(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): Part;
    /**
     * 渲染dom
     */
    render(uiNode: IHTMLElement, that: any, outerChildNodes: any, outerElement: any, props: any, part: Part, refPartName: string, reExtends: boolean): Part;
    /**由props构建html字符串
     * @param {} props
     * */
    joinDatasByProps(props: any): string;
    beExtends(node: INode, that: any, outerChildNodes: INodeArray, outerElement: IHTMLCollection, props: any, part: any): ExtendsPart;
    toDefineString(): string;
    parseParamsHelp(p: any): void;
    getParamsHelp(): {
        name: string;
        necessary: any;
    }[];
}
declare class ITemplateList {
    [index: string]: Object;
}
declare class TemplateList {
    protected event: $Event;
    onDefine(name: string, fn: Fun): void;
    define(name: string, sortPath: string, path: string, s: string, ext: any): any;
    toString(): string;
}
declare class Service extends TemplateList {
    private __defineCallbacks__;
    constructor(serv?: Service);
    require(n: any): any;
    define(name: any, s: any): void;
    toDefineString(): string;
}
declare let $rootScope: RootScope;
interface INode {
    __scope__?: Scope;
}
interface ITurtle {
    domScope: DOMScope;
    rootScope: RootScope;
}
declare class RootScope {
    __actionNode__: HTMLElement;
    __children__: Scope[];
    constructor();
}
declare class Scope {
    __commentNode__: INode;
    __name__: string;
    __actionNode__: INode;
    __parent__: Scope | RootScope;
    __children__: Scope[];
    __proto__: Object | Scope;
    constructor(__commentNode__: INode, parent: Scope | RootScope, __name__?: string);
}
declare class DOMScope {
    stack: Array<Scope | RootScope>;
    constructor();
    /**
     * 在dom节点上创建变量作用域对象
     * @param {INode} node - dom节点
     * @param {string} name - 名称
     */
    create(node: INode, name: string): Scope | RootScope;
    /**
     * 获取变量作用域对象
     * @param {INode} node - dom节点
     */
    get(node: INode): Scope | RootScope;
    /**
     * 切断dom节点和变量作用域对象的链接
     * @param {Scope} scopeVarObject - 变量作用域对象
     */
    unlink(scope: Scope): void;
    /**
     * 链接dom节点和变量作用域对象
     * @param {Scope} scopeVarObject - 变量作用域对象
     * @param {INode} node - dom节点
     */
    link(scope: Scope, node: INode): void;
}
declare let $client: Client;
declare class Client {
    private data;
    private isListen;
    private events;
    private emit();
    private setSizeProperty(name, fn);
    constructor();
}
declare class Store {
    [index: string]: IElement;
}
declare class StoreManage {
    static take(data: Store, name: string): INode | INodeArray;
    static takeElem(data: Store, name: string): IHTMLElement | IHTMLCollection;
}
declare let readyRE: RegExp;
declare function renderTemplate(tp: any): void;
interface IRenderDocument {
    (): void;
    beginTime?: Date;
    endTime?: Date;
}
declare class Config {
    baseUIPath: BasePath;
    baseServicePath: string;
    debugMode: number;
}
interface ITurtle {
    config: Config;
    store: Store;
}
declare var unescape: (v: string) => string;
declare function getQueryString(name: string): string;
declare let getNameByURL: (url: string) => string;
declare let getFileNameByURL: (url: string) => string;
declare function appendQueryString(name: any, value: any): string;
declare class Turtle implements ITurtle {
    domScope: DOMScope;
    rootScope: RootScope;
    config: Config;
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
    T: TemplateList;
    parts: IKeyArrayHashObject<Part>;
    xhr: XHR;
    service: Service;
    store: Store;
    refs: IKeyArrayHashObject<IHTMLElement>;
    fn: {};
    turtleScriptElement: IHTMLScriptElement;
    url: string;
    readyByRenderDocument: ReadyObject;
    isCompile: boolean;
    constructor();
    readonly rootParts: any[];
    emitResize(): void;
    renderDocument: IRenderDocument;
    private r1(scriptNode, compileuilist, compilename, compileInfo, compile);
    private r2();
    ready(fn: Fun): this;
}
declare let turtle: Turtle;
declare const data = "1234";
declare var s: string;