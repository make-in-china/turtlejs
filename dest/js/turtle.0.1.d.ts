/// <reference path="../src/ts/lib/lib.d.ts" />
declare let arrayConstructor: Array<any>, objectConstructor: ObjectConstructor, stringConstructor: String, toStr: () => string, slice: (start?: number, end?: number) => any[], push: (...items: any[]) => number, splice: {
    (start: number): any[];
    (start: number, deleteCount: number, ...items: any[]): any[];
}, getPrototypeOf: (o: any) => any, replace: {
    (searchValue: string, replaceValue: string): string;
    (searchValue: string, replacer: (substring: string, ...args: any[]) => string): string;
    (searchValue: RegExp, replaceValue: string): string;
    (searchValue: RegExp, replacer: (substring: string, ...args: any[]) => string): string;
};
interface Constructor {
    prototype: Object;
}
declare function extend<T>(elem: T, elemEx: any): T;
declare function merge<T>(elem: T, elemEx: any): T;
declare function removeItem<T>(arr: T[], obj: T): void;
declare function persentToFloat(s: string): number | undefined;
declare function parseBool(v: any): boolean;
declare function trim(s: any): any;
declare function HTMLTrim(s: any): any;
declare function trimLine(s: any): any;
declare let dateFormat: (format: any, d: any) => any;
declare let camelCaseRE: RegExp, camelizeRE: RegExp, deCamelizeRE: RegExp;
declare function camelCase(s: any): any;
declare function camelize(str: string): string;
declare function decamelize(str: string): string;
declare function splitByOnce(s: string, split: string): Array<string>;
declare let persentRE: RegExp;
declare function isNull<T>(p: T | null): p is null;
declare function isUndefined<T>(p: T | undefined): p is undefined;
declare function isObject<T>(p: any): p is Object;
declare function isRegExp(a: any): boolean;
declare function isDate(a: any): boolean;
declare function isNumber(a: any): boolean;
declare function isString(a: any): boolean;
declare function isFunction(a: any): boolean;
declare let isArray: (a: any) => boolean;
declare function isPersent(s: any): boolean;
declare function isArrayLike(a: any): boolean;
/**
 * 一个普通对象
 * @param {string} s 格式为:xxx,yyy,zzz
 * @param {any} defaultValue 初始化时每个属性的默认值
 */
declare class HashObject {
    constructor(s: string, defaultValue?: any);
}
declare class ArrayEx<T> extends Array<T> {
    last(): T | undefined;
    clear(): void;
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
interface INode {
    insertBefore2(newChild: INode, refChild: INode): INode;
}
interface Node {
    insertBefore2(newChild: INode, refChild: INode): INode;
}
interface Node {
    toDOM(): Node;
    valueOf(): Node;
}
declare let vNodesToDOM: (nodes: INode[]) => INode[];
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
declare function getNodesLength(node: IElement): number;
declare function getNodeIndex(node: IElement): number;
declare function getNodesLength2(node: INode): number;
declare function getNodeIndex2(node: INode): number;
declare function takeAttr<T extends string | null>(node: IElement, attrName: string, defaultValue?: T): T | string | undefined;
declare function getAttr<T extends string | null>(node: IElement, attrName: string, defaultValue?: T): T | string | undefined;
declare let addStyleRE: RegExp;
declare function addStyle(elem: any, style: any): void;
declare let addClassNameRE: RegExp;
declare function addClassName(elem: any, className: any): void;
declare function addClass(elem: any, ...arg: any[]): void;
declare function addClasses(elem: any, clses: any): void;
declare function removeClass(elem: any, cls: any): void;
declare function removeClasses(elem: any, clses: any): void;
declare function replaceClass(sel: any, a: any, b: any): void;
declare function toggleClass(sel: any, a: any, t: any, f: any): void;
/**判断是否注释节点 */
declare function isCommentNode(node: INode): node is IComment;
/**判断是否文本节点 */
declare function isTextNode(node: INode): node is IText;
declare let withthis: string, _execValueByScope: Function, _execByScope: Function, _execExpressionsByScope: Function;
declare function execValueByScope(node: INode, s: string, v: any, scope: Scope, outerChildNodes: INodeArray, outerElement: IHTMLElement[], props: any, part: Part): any;
declare let execTemplateScript: (s: string, node: INode, outerChildNodes: INodeArray, outerElement: any, props: any, part: any) => string;
declare function _getBindObject(scope: any, arrNames: Array<string>): any;
interface IBindInfo {
    name: string;
    target: Object;
    targetName: string;
    event: IBindFunction;
}
declare function addBindInfo(obj: Object, name: string, target: Object, targetName: string, event: IBindFunction): void;
declare function removeBind(obj: any, name: any, targetName: any): boolean;
declare function onPropertyChange(obj: any, name: any, fnOnSet: any): void;
declare function objectPropertyChange(obj: any, name: any, fnOnSet: any): void;
interface Object {
    __bind__: IBindInfo[];
}
interface IBindFunction {
    (name: string): any;
    isBinding: boolean;
    removeObject: Function;
    list: Array<Object>;
}
declare function bindPropertyByName(obj: Object, name: string, obj2: Object, name2: string): IBindFunction;
declare let bindProperty: (obj: Object, name: string, obj2: Object, name2: string, type?: number) => void;
declare function bindElementProperty(obj: Object, name: string, obj2: Object, name2: string): void;
declare function bindNodeProperty(node: INode, proName: string, condition: string): void;
declare function bindElementPropertyByName(node: IHTMLElement, elementValueName: string, condition: string): void;
declare function bindPropertyByOrder(node: any, condition: any): void;
declare function bindExpressionsByOrder(node: any, condition: any): void;
interface Window {
    ActiveXObject?: Object;
}
declare let isIE: boolean;
/**
 * 可躲过一些js压缩库console.log;
 */
declare let log: Function;
/**
 * 可躲过一些js压缩库debugger;
 */
declare let bp: Function;
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
declare function treeEach<T>(array: T[] | IArray, propertyName: string, fn: (node: T, step: ITreeEachStep) => (eTreeEach | void), beginIndex?: number): {
    stack: [IArray | T[], number];
    state: eTreeEach;
    array: IArray | T[];
    index: number;
};
interface ICallBack {
    (this: void, ...arg: any[]): void;
}
declare class EventEmitter {
    protected events: {
        [index: string]: ICallBack | ICallBack[] | undefined;
        error?;
    };
    constructor();
    emit: (type: string, ...args: any[]) => boolean;
    on: (type: string, listener: ICallBack) => this;
    addListener: (type: string, listener: ICallBack) => this;
    once: (type: string, listener: ICallBack) => void;
    removeListener: (type: string, listener: ICallBack) => this;
    removeAllListeners: (type: string) => this;
    listeners: (type: string) => ICallBack[];
}
declare class EventHelper<T extends ICallBack, E extends Function> {
    private target;
    private type;
    constructor(target: EventEmitter, type: string);
    emit: E;
    on(listener: T): void;
    addListener(listener: T): void;
    once(listener: T): void;
    removeListener(listener: T): EventEmitter;
    removeAllListeners(): EventEmitter;
    listeners(): T[];
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
    ["XMP"]: {};
    ["TEMPLATE"]: {};
    ["TITLE"]: {
        getData: (node: IHTMLTitleElement) => string;
    };
    ["STYLE"]: {
        xmp: any;
    };
    ["SCRIPT"]: {
        xmp: any;
    };
    ["TEXTAREA"]: {
        xmp: any;
        getData: (node: IHTMLTextAreaElement) => string;
    };
    toString(): string;
    readonly items: Array<NameItem>;
    findByString(str: string): RegExpMatchArray | undefined;
}
declare let templateConfig: TemplateConfig;
declare let baseUIPath: BasePath;
declare let orderRE: RegExp, orderCaseRE: RegExp, parseForOrderRE: RegExp, parseForOrderRE2: RegExp, SetParseError: IParseError, orderStack: ArrayEx<IOrder>;
interface IParseError {
    isError?: boolean;
    (msg: string): eTreeEach;
}
interface ICommentOrderInfo {
    order?: string;
    orderCase?: string;
    condition: string;
}
interface ITurtle {
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
}
declare function replaceCls(): void;
/**从注释中读取命令 */
declare function getCommentStringInfo(s: any): ICommentOrderInfo | null;
/**从注释中读取字符串 */
declare let getCommentText: (node: IComment) => string;
declare function parseScopeOrder(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseCommentOrderNoScript(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseCommentOrderBlock(node: INode, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
interface INode {
    __order__?: IOrder;
}
interface IOrder {
    name?: string;
    node?: INode;
    endNode?: INode | null;
    condition?: string;
    parseCommentOrderBlockReturnValue?: {
        stack: [IArray | INode[], number];
        state: eTreeEach | undefined;
        array: IArray | INode[];
        index: number;
    } | undefined;
}
declare function addOrderToNode(node: INode, info: any, outerChildNodes: any, outerElement: any, props: any, part: any, fnGetOrder: () => IOrder): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseIfOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseBreakOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function parseWhileOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseAsyncOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseSwitchOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseForOrder(info: any, node: any, outerChildNodes: any, outerElement: any, props: any, part: any): {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
interface IHTMLBreakElement extends IComment {
    source?: {
        run;
    };
}
declare function createBreakElement(nodes: any, order: {
    run;
}): IHTMLBreakElement;
declare function parseCommentOrder(info: ICommentOrderInfo, node: IComment, outerChildNodes: any, outerElement: any, props: any, part: any): void | {
    stack: [INode[] | IArray, number];
    state: eTreeEach;
    array: INode[] | IArray;
    index: number;
};
declare function parseComment(node: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
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
declare let $DOM: any, $node: I$Node, operatorRE: RegExp;
interface I$Node {
    (name: '__break__', nodeType?: number): IHTMLBreakElement;
    (name: string, nodeType?: 1): INode;
    (name: string, nodeType?: 3): IText;
    (name: string, nodeType?: 8): IComment;
    (name: string, nodeType?: number): INode | null;
}
interface ITurtle {
    xhr: XHR;
    refs: IKeyArrayHashObject<IHTMLElement>;
}
declare function getScopeBy(scope: any, node: INode): any;
declare function execByScope(node: INode, s: string, scope: any, outer: any, outerElement: any, props: any, part: any): any;
declare function execScope(s: string, node: INode, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function setNodeProperty(node: any, proName: any, condition: any, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function setQuestionAtrr(node: IHTMLElement, outerChildNodes: any, outerElement: any, props: any, part: any): void;
declare function getTemplate(node: IHTMLElement): string;
declare function defineServiceByNode(node: IHTMLElement): void;
declare function getExtendsByNode(node: IHTMLElement, sortPath: string): any;
declare function defineUIByNode(node: IHTMLElement): void;
declare function defineClasses(node: IHTMLElement): void;
declare function parseDefine(node: IHTMLElement): void;
declare function isDefine(node: IHTMLElement): boolean;
declare function isTemplate(node: IHTMLElement): node is IHTMLElement;
declare function findTemplates(nodes: IHTMLElement[] | IArray): IElement[] | IArray;
declare function parseUITemplate(uiName: string, uiSortPath: string, uiPath: string, sHTML: string): void;
declare function importUIHTML(uiName: string, uiSortPath: string): any;
declare function getExtends(extName: any, sortPath: any): any;
/**从DOM树获取父组件
 * @param {}
 */
declare function getParentPart(node: INode): Part | null;
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
    __BREAK__: typeof parseBreakOrder;
    SCRIPT: typeof parseScript;
}
declare function bindShowHide(node: INode, s: any, isBindShow: any, outer: any, outerElement: any, props: any, part: any): void;
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
declare function getParts(childNodes: INodeArray): Part[];
declare function getService(serviceName: string): any;
declare function nodesToString(nodes: INode[]): string;
declare function _catch(e: any, fn?: Function): void;
declare function throwError(err: string): void;
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
    renderIn(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): Part;
    renderBefore(elem: any, outerChildNodes: any, outerElement: any, props: any, part: any, partName: any, reExtends: any): Part;
    /**
     * 渲染dom
     */
    render(uiNode: IHTMLElement, that: any, outerChildNodes: any, outerElement: any, props: any, part: Part, refPartName: string, reExtends: boolean): Part;
    /**由props构建html字符串
     * @param {Object} props
     * */
    joinDatasByProps(props: Object): string;
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
declare class TemplateList extends EventEmitter {
    onDefine(name: string, fn: ICallBack): void;
    define(name: string, sortPath: string, path: string, s: string, ext: any): any;
    toString(): string;
}
declare let $rootScope: RootScope;
interface ITurtle {
    rootScope: RootScope;
}
declare class RootScope {
    __actionNode__: HTMLElement;
    __children__: Scope[];
    constructor();
}
interface ITurtle {
    domScope: DOMScope;
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
interface INode {
    __scope__?: Scope;
}
declare class Scope {
    __commentNode__: INode;
    __name__: string;
    __actionNode__: INode;
    __parent__: Scope | RootScope | null;
    __children__: Scope[];
    __proto__: Object | Scope;
    constructor(__commentNode__: INode, parent: Scope | RootScope, __name__?: string);
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
declare class Store {
    [index: string]: IHTMLElement;
}
declare class StoreManage {
    static take(data: Store, name: string): INode | INodeArray | null;
    static takeElem(data: Store, name: string): IHTMLElement | IHTMLCollection | null;
}
declare class Service extends TemplateList {
    private __defineCallbacks__;
    constructor(serv?: Service);
    require(n: any): any;
    define(name: any, s: any): void;
    toDefineString(): string;
}
interface IPartRefs {
    [index: string]: INode | undefined;
    resize?: IHTMLElement;
    main?: IHTMLElement;
    begin: IComment;
    end: IComment;
}
declare class Part extends EventEmitter {
    template: PartTemplate;
    props: Object;
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
    protected nodeStore: INode[];
    /**节点命名空间 */
    refs: IPartRefs;
    /**资源路径 */
    resPath: string;
    /**
     * 缓存事件管理器
     */
    private eventHelpers;
    /**
     * 生成或获取一个事件管理器
     */
    getEventHelper<T extends ICallBack, U extends Function>(type: string): EventHelper<T, U>;
    /**resize事件管理器*/
    $resize: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**init事件管理器 */
    $init: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**insert事件管理器 */
    $online: EventHelper<(this: void, part: Part, node: IHTMLElement) => void, (this: void, part: Part, node: IHTMLElement) => boolean>;
    /**remove事件管理器 */
    $offline: EventHelper<(this: void, part: Part) => void, (this: void, part: Part) => boolean>;
    /**初始化对象 */
    constructor(template: PartTemplate, props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection);
    /**即时子Part数组 */
    readonly child: Part[];
    /**子节点数目 */
    readonly elementLength: number;
    /**即时读取子节点 */
    readonly elements: INode[];
    /**读取父组件 */
    readonly parent: Part;
    /**读取组件下所有DOM节点 */
    readonly innerHTML: string;
    /**读取父节点 */
    readonly elemParent: INode;
    readonly scopeNodes: any[];
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
declare class Ready {
    private _isReady;
    on(fn: () => void): void;
    readyFunctions: Function[];
    isReady: boolean;
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
declare function getQueryString(name: string): string | null;
interface String {
    match(regexp: RegExp): RegExpMatchArray;
}
declare let getNameByURL: (url: string) => string;
declare let getFileNameByURL: (url: string) => string;
declare function appendQueryString(name: any, value: any): string;
declare class Turtle extends EventEmitter implements ITurtle {
    domScope: DOMScope;
    rootScope: RootScope;
    config: Config;
    T: TemplateList;
    xhr: XHR;
    service: Service;
    store: Store;
    readyByRenderDocument: Ready;
    /**
     * 缓存事件管理器
     */
    private eventHelpers;
    /**
     * 生成或获取一个事件管理器
     */
    getEventHelper<T extends ICallBack, U extends Function>(type: string): EventHelper<T, U>;
    /**error事件管理器*/
    $error: EventHelper<(this: void, event: any) => void, (this: void, event: any) => boolean>;
    parts: IKeyArrayHashObject<Part>;
    refs: IKeyArrayHashObject<IHTMLElement>;
    replaceClassStore: IHTMLElement[];
    defineClassNames: string[];
    turtleScriptElement: IHTMLScriptElement;
    url: string;
    isCompile: boolean;
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
