declare let isNodeJS: boolean;
declare var global: {
    $t: turtleNS.Turtle;
} & NodeJS.Global;
interface Array<T> {
    last?(): T;
}
declare type StringSource = string | number | {
    toString: Object["toString"];
};
interface Window {
    ActiveXObject?: Object;
}
interface Node {
    insertBefore2: (newNode: Node, node: Node) => void;
    uiLinkUUID: string;
    [index: string]: any;
}
declare let unescape: any;
interface Document {
    scope: any;
}
interface Function {
    [index: number]: any;
    [index: string]: any;
}
interface Object {
    [index: number]: any;
    [index: string]: any;
    forEach: any;
    __bind__: any;
    __parent__: any;
    __me__: any;
}
interface HTMLXMPElement extends HTMLElement {
}
declare namespace turtleNS {
    class ReadyObject {
        private _isReady;
        readyFunctions: Function[];
        isReady: boolean;
        on(fn: Function): void;
    }
    class Team {
        constructor(group: any[], check: Function, missingCheck: Function);
        getCall(): (this: HTMLElement) => void;
        checkEvents: Function[];
        missingCheckEvents: Function[];
        groups: any[][];
    }
    class UITeam {
        map: {
            [index: string]: Team;
        };
        push(name: string, group: any[], check: Function, missingCheck: Function): (this: HTMLElement) => void;
    }
    class ArrayObject<T> {
    }
    interface ArrayObject<T> {
        clear(): void;
        concat(...items: T[][]): T[];
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
        indexOf(searchElement: T, fromIndex?: number): number;
        join(separator?: string): string;
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        map<U>(this: [T, T, T, T, T], callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): [U, U, U, U, U];
        push(...items: T[]): number;
        pop(): T | undefined;
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reverse(): T[];
        shift(): T | undefined;
        slice(start?: number, end?: number): T[];
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        sort(compareFn?: (a: T, b: T) => number): this;
        splice(start: number, deleteCount?: number): T[];
        unshift(...items: T[]): number;
    }
    enum EOrder {
        Scope,
        Var,
        Bind,
        Dashes,
        Bang,
        Equals,
        Content,
        Elements,
        While,
        If,
        Break,
        For,
        Switch,
        Async,
    }
    enum EOrderCase {
        Else,
        Else_If,
        Case,
        Case_Break,
        Default,
        End,
    }
    class BaseUIPath extends ArrayObject<any> {
        private _paths;
        jsUIPath: string[];
        push(v: string[] | string): number;
        parseUIPath(s: string): void;
        getPathBySortPath(sortPath: string): string;
        hasSortPath(sortPath: string): boolean;
        getSortPathByPath(path: string): string | undefined;
        hasPath(path: string): boolean;
        toString(): string;
    }
    interface TreeEach {
        (array: any, property: string, fn: (node: Node, step: {
            next: number;
        }) => void, beginIndex?: number): {
            stack: any[];
            state: number;
            array: any[];
            index: number;
        };
        c_stopEach: 1;
        c_repeat: 2;
        c_noIn: 4;
        c_noRepeat: 8;
    }
    let treeEach: TreeEach;
    interface ICallBack {
        (...arg: any[]): void;
    }
    interface IEventEmitterType {
        error?: ICallBack | ICallBack[];
        newListener?: ICallBack | ICallBack[];
    }
    interface EventEmitter<T extends IEventEmitterType> {
        on(type: keyof T, listener: ICallBack): this;
        off(type: keyof T, listener: ICallBack): this;
    }
    class EventEmitter<T extends IEventEmitterType> {
        protected events: {
            [P in keyof T]: ICallBack | ICallBack[] | undefined;
        };
        emit(type: keyof T, ...args: any[]): boolean;
        addListener(type: keyof T, listener: ICallBack): this;
        once(type: keyof T, listener: ICallBack): void;
        removeListener(type: keyof T, listener: ICallBack): this;
        removeAllListeners(type: keyof T): this;
        listeners(type: keyof T): ICallBack | ICallBack[] | undefined;
    }
    class TurtleFunction {
        setNodeProperty(node: Node, proName: string, condition: string, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        setQuestionAtrr(node: HTMLElement, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindPropertyByOrder(node: Node, condition: string): void;
        private getBindInfo(obj, name, targetName);
        private getBindObject(scope, name);
        bindNodeFunction(node: Node, bindlet: string, fn: Function): {
            object: {
                [index: string]: any;
            };
            name: string;
            targetObject: Function;
            targetName: string;
        } | undefined;
        bindExpressionsByOrder(node: Node, condition: string): void;
        bindProperty(obj: {
            [index: string]: any;
        }, name: string, obj2: {
            [index: string]: any;
        }, name2: string, type?: 1 | 2): void;
        onViewOnce(elem: HTMLElement, elemScroll: HTMLElement, fn: Function): void;
        addStyles(elem: HTMLElement, styleRoots: {
            name: keyof CSSStyleDeclaration;
            value: string;
        }[]): void;
        removeStyles(elem: HTMLElement, styleRoots: {
            name: keyof CSSStyleDeclaration;
            value: string;
        }[]): void;
        bindStyleToggle(elem: HTMLElement, expressionEx: string, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindStyleShowHide(elem: HTMLElement, expressionEx: string, isBindShow: boolean, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindClassToggle(node: HTMLElement, expressionEx: string, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindClassShowHide(node: HTMLElement, expressionEx: string, isBindShow: boolean, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindShowHide(node: HTMLElement, s: string, isBindShow: boolean, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        merge(elem: Object, elemEx: Object): Object;
        slice: (start?: number | undefined, end?: number | undefined) => any[];
        $$$(name: string, nodeType?: 3 | 8 | 1 | 10 | any): HTMLElement | Text | Comment | null;
        getDPI(): number;
        $$(id: string): HTMLElement | null;
        getOnTry<T extends Function>(fn: T): T;
        hasCustomToString(obj: Object): boolean;
        each<T, U extends {}>(elements: T[] | U, callback: ((this: T, idx: number, data: T) => boolean) | ((this: U, key: keyof U, data: U[keyof U]) => boolean)): U | T[];
        map<T, U extends {}>(elements: T[] | U, callback: ((t: T, idx: number) => null | T) | ((t: U[keyof U], key: keyof U) => null | T)): T[] | U[keyof U][];
        hasAttrOnce(node: HTMLElement, attr: string): boolean;
        getClosure(fn: Function): (this: any) => any;
        getStep(fn: Function, count: number): Function;
        extend(elem: Object, elemEx: Object): Object;
        addStyle(elem: HTMLElement, style: string): void;
        addClassName(elem: HTMLElement, className: string): void;
        addClass(elem: Element, ...arg: string[]): void;
        addClasses(elem: Element, clses: string[]): void;
        removeClass(elem: HTMLElement, cls: string): void;
        removeClasses(elem: HTMLElement, clses: string[]): void;
        replaceClass(sel: HTMLElement, a: string, b: string): void;
        toggleClass(sel: HTMLElement, a: string, fnAddA?: Function, fnRemoveA?: Function): void;
        is<T>(data: any, fn: () => boolean): data is T;
        isRegExp(a: any): boolean;
        isDate(a: any): boolean;
        isNumber(a: any): a is Number;
        isString(a: any): a is string;
        isFunction(a: any): a is Function;
        isObject(a: any): a is Object;
        isFinite(obj: any): boolean;
        isUndefined(a: any): a is undefined;
        isArray(a: any): a is Array<any>;
        isRepeat(arr: any): boolean;
        isArrayLike(obj: any): obj is Object & {
            length: number;
        };
        isPersent(s: any): boolean;
        persentToFloat(s: string): number;
        toArray(obj: any): any;
        moveArray(s: any[], d: any[]): void;
        getRect(e: HTMLElement): {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        getOffsetPos(elem1: HTMLElement, elem2: HTMLElement): {
            x: number;
            y: number;
        };
        idle(cb: Function): (delay: number) => void;
        elementDOMdistance(borderElem: HTMLElement, elem1: HTMLElement, elem2: HTMLElement): number;
        elementInElement(elem1: Node, elem2: Node, borderElem: HTMLElement): boolean;
        getDebounce(fn: Function): (this: any, delay: number) => void;
        getReTimeout(fn: Function): (this: any, delay?: number) => void;
        getAttr(node: Node, attrName: string, defaultValue?: string | null): any;
        extendConst(elem: Object, elemEx: Object): Object;
        lockObject(obj: Object): void;
        lockObject2(obj: Object): void;
        getBind(obj: any, fn: Function): () => any;
        compact<T>(array: T[]): T[];
        flatten<T>(array: T[]): T[];
        camelize(str: string): string;
        decamelize(str: string): string;
        takeOutChildNodes(node: Node): number;
        takeChildNodes(node: Node): Node[];
        trim(s: string): string;
        HTMLTrim(s: string): string;
        trimLine(s: string): string;
        forEach<T>(obj: Object | Object[] | Function, iterator: (this: T, value: any, key: string, obj: Object) => void, context?: T, eachValue?: boolean): Object;
        forEachSorted(obj: Object, iterator: Function, context: any): string[];
        scriptToJSON(script: string): any;
        replaceNodeByNodes(node: Node, nodes: Node[]): void;
        replaceNodeByNode(node: Node, node2: Node): void;
        replaceNodeByString(node: Node, s: string): void;
        insertNodesBefore(node: Node, nodes: Node[]): void;
        insertNodeBefore(node: Node, node2: Node): void;
        appendNodes(nodes: Node[] | NodeList, parent: HTMLElement): void;
        parseBool(v: any): boolean;
        getUUID(len: number): string;
        handleWebkitRrror(e: Error): string;
        getNodeIndex(node: Element): number;
        getNodeIndex2(node: Node): number;
        getNameByURL(url: string): string;
        getFileNameByURL(url: string): string;
        getNameByLocation(): string;
        execTurtleScript(node: HTMLElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart: BasePart): void;
        readonly parseScript: (node: HTMLScriptElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart: BasePart) => void;
        execScriptNode(node: HTMLElement, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: {}, pPart?: BasePart): void;
        execScriptString(script: string, keylet: string, that: any, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: {}, pPart?: BasePart): void;
        nodesToString(nodes: Node[]): string;
        removeNode(node: Node): Node | null;
        objectChange(obj: Object, fnOnSet: Function): void;
        objectPropertyChange(obj: Object, name: string, fnOnSet: Function): void;
        bindNodeByCondition(node: Node, condition: string): void;
        bindNode(node: Node, obj: Object, name: string): void;
        bindEval(node: HTMLElement, expression: string, outer: Node[] | undefined, outerElement: HTMLElement[] | undefined, props: Object | undefined, pPart: BasePart | undefined, fn: Function): {
            object: {
                [index: string]: any;
            };
            name: string;
            targetObject: Function;
            targetName: string;
        } | undefined;
        bindRemove(node: HTMLElement, s: string, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindAdd(node: HTMLElement, s: string, outer?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        bindElementProperty(obj: Object, name: string, obj2: Object, name2: string): void;
        getUIInfoByString(name: string): {
            sortPath: string;
            name: string;
        } | null;
        getUIInfo(node: Node): {
            sortPath: string;
            name: string;
        } | null;
        repeatCall(delay: number, repeat: number, fn: Function): void;
        removeItem(arr: any[], obj: Object): void;
        onPropertyChange(obj: Object, name: string, fnOnSet: Function): void;
        bindNodeProperty(node: Node, proName: string, condition: string): void;
        bindFunction(obj: Object, bindlet: string, fn: Function): void;
        includeJSFiles(files: string[] | string, fn?: Function): void;
        includeJSFile(task: IncludeTask): void;
        bindElementPropertyByName(node: Node, elementValueName: string, condition: string): void;
        camelCase(s: string): string;
        execByScope(node: Node, s: string, scope: Object | null, outer?: Node[], outerElement?: HTMLElement[], props?: {}, pPart?: BasePart): any;
        execTemplateScript(s: string, node: Node, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: {}, pPart?: BasePart): string;
        toPercent(s: number): string;
        getStateFunction(fn: Function): any;
        removeBlockBetween(node1: Node, node2: Node): void;
        takeBlockBetween(node1: Node, node2: Node): Node[];
        getElementsBetween(node1: Node, node2: Node): Node[];
        cloneBetween(node1: Node, node2: Node): Node[];
        dropMove(elemTarget: HTMLElement, elemMove: HTMLElement, arrow: 1 | 2 | 3 | 4 | any, noOut: boolean, fn: Function): void;
        DropRect: typeof DropRect;
    }
    interface Point {
        x: number;
        y: number;
    }
    interface IDropRect {
        left: number;
        top: number;
        width: number;
        height: number;
        screenLeft: number;
        screenTop: number;
    }
    class DropRect {
        private elem;
        private fnbegin;
        private fn;
        private fnend;
        start: MouseEvent & TouchEvent | null;
        offsetLeft: number;
        offsetTop: number;
        constructor(elem: Node, fnbegin: (offsetLeft: number, offsetTop: number) => void, fn: (rect: IDropRect) => void, fnend: (rect: IDropRect) => void);
        on(): void;
        off(): void;
        private setOffset();
        private getRectByPoint(x1, y1, x2, y2);
        private md;
        private mm;
        private td;
        private tm;
        private mu;
        private tu;
    }
    let requireHash: {
        [index: string]: RequireFile;
    };
    class RequireFile {
        file: string;
        injectInvoke: (letiable?: string) => any;
        constructor(file: string);
        init(): void;
    }
    function loadJS(path: string | string[], letiable?: string): any;
    function runJS(path: string | string[], letiable?: string): any;
    function runJSNoCache(path: string | string[], letiable?: string): any;
    interface TurtleFunction {
        encodeHTML(value: string): string;
        decodeHTML(value: string): string;
        dasherize(str: string): string;
        log(...agr: any[]): void;
        bp(): void;
        dateFormat(format: string, d: Date): string;
        ReadyObject: typeof ReadyObject;
        treeEach: TreeEach;
    }
    class ViewWatchCallBackGroup {
        viewWatch: ViewWatch;
        target: HTMLElement;
        fn: Function[];
        constructor(viewWatch: ViewWatch, target: HTMLElement, fn: Function);
    }
    class ViewWatch {
        elemScroll: HTMLElement;
        onceItems: ViewWatchCallBackGroup[];
        constructor(elemScroll: HTMLElement);
        on(elem: HTMLElement, fn: Function): void;
        static getScroll(watch: ViewWatch): () => void;
        static get(elemScroll: HTMLElement): ViewWatch;
        static viewWatchs: ViewWatchCallBackGroup[];
        static indexOfTarget(watches: ViewWatchCallBackGroup[], o: any): number;
    }
    class IncludeTask {
        files: string[];
        parent: IncludeTask | null;
        child: IncludeTask | null;
        isallload: boolean;
        onallload: () => void;
        onchildallload: () => void;
        count: number;
        static jsScript: any;
        constructor(creater: Function, parentTask: IncludeTask, files: string[] | string, fn?: Function);
    }
    interface IUILinks {
        [index: string]: Function[];
    }
    class UILink {
        static pushToLinks(uuid: string, v: Function, uiLinks: IUILinks): void;
        uiLinks: IUILinks;
        on(o: string | Node): void;
        create(node: Node, fn: Function): void;
        appendByTree(nod: Node): void;
        appendByName(name: string, fn: Function): string;
    }
    class Store {
        [index: string]: HTMLElement;
        static take(this: void, store: Store, name: string): Node | NodeList | undefined;
        static takeElem(this: void, store: Store, name: string): Element | HTMLCollection | undefined;
    }
    class XHR {
        send(type: 'POST' | 'GET', url: string, data: string | undefined | null, async: boolean, fn: Function, fnerror?: XMLHttpRequestEventTarget['onerror']): void;
        get(url: string, async: boolean, fn: (text: string) => void, fnerror?: XMLHttpRequestEventTarget['onerror']): void;
        post(url: string, data: string, async: boolean, fn: (text: string) => void, fnerror?: XMLHttpRequestEventTarget['onerror']): void;
    }
    class Resource {
        protected __defineCallbacks__: {
            name: string;
            fn: Function;
        }[];
        emitOnDefine(name: string, tp: UITemplate): void;
    }
    class UI extends Resource {
        list: {
            [index: string]: UITemplate;
        };
        onDefine(name: string, fn: Function): void;
        toString(): string;
        define(name: string, sortPath: string, path: string, s: string | {
            params: UIParam[];
            datas: string[];
            extends?: UITemplate;
            service?: Service;
        }, ext?: UITemplate): UITemplate;
    }
    class Service extends Resource {
        [index: string]: any;
        constructor(fns?: Object);
        require(n: string): any;
        define(name: string, s: string): void;
        toDefineString(): string;
    }
    function throwError(err: string): void;
    type CommentStringInfo = {
        order: EOrder;
        condition: string;
        orderCase?: EOrderCase;
    } | {
        order?: EOrder;
        orderCase: EOrderCase;
        condition: string;
    };
    class UIParam {
        name: string;
        hasDefault: boolean;
        filter: any;
        filterParam: any;
        defaultValue: any;
        limitValue: any;
        constructor(name: string, hasDefault: boolean, filter: any, filterParam: any, defaultValue: any, limitValue: any);
    }
    class UITemplate {
        name: string;
        sortPath: string;
        path: string;
        parts: Part[];
        partName: string;
        params: UIParam[];
        datas: string[];
        extends: UITemplate;
        isJSDefine: boolean;
        service: Service;
        constructor(name: string, sortPath: string, path: string, d: string | {
            params: UIParam[];
            datas: string[];
            extends?: UITemplate;
            service?: Service;
        }, ext?: UITemplate);
        renderIn(elem?: HTMLElement | null, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        renderBefore(elem?: Node | null, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        render(uiNode: HTMLElement | undefined | null, that: any, outerChildNodes: Node[], outerElement: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        joinDatasByProps(props: Object): any;
        beExtends(uiNode: Node, that: any, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart?: BasePart): ExtendsPart;
        toDefineString(): string;
        parseParamsHelp(p: any): void;
        getParamsHelp(): any[];
    }
    class BasePart {
        [index: string]: any;
        toString(): string;
        runScript(...args: any[]): any;
        treeDiagram(tabSpace?: number): string;
        readonly elementLength: number;
        readonly elements: Node[];
        readonly child: Part[];
        getParentPart(node: Node): any;
        readonly parent: any;
        getRect(): {
            left: number;
            top: number;
            width: number;
            height: number;
            right: number;
            bottom: number;
        };
        emitResize(): void;
        onSetSize(rect: ClientRect): void;
        setSize(rect: ClientRect): void;
        readonly innerHTML: string;
        readonly elemParent: Node | null;
        insertTo(elem: HTMLElement): void;
        insertBefore(elem: Node): void;
        getSuper(name: string): Part | null;
        emitInit(finalPart: Part): void;
        private hideElements;
        private isHide;
        hide(): void;
        show(): void;
        _cutAndRemove(elems: Node[]): void;
        remove(): void;
        destoryChildren(): void;
        reinit(): void;
        destory(): void;
        clearPart(): void;
        clear(): void;
        readonly scopeNodes: any[];
        begin: Comment;
        end: Comment;
        onclear?: () => void;
        onInsert?: (elem: Node) => void;
        onInit?: (finalPart: Part) => void;
        init?: () => void;
        onremove?: () => void;
        oninsert?: () => void;
        onresize?: () => void;
        store: Node[];
        isInsert: boolean;
        template: UITemplate;
        basePart: BasePart;
        super?: BasePart;
        props: Object;
        partMain?: HTMLElement;
        extPart: ExtendsPart;
        isExtend: boolean;
        $: Service;
    }
    interface ExtendsPart extends BasePart {
    }
    class ExtendsPart {
        protected _extPart?: ExtendsPart;
        constructor(template: UITemplate, node: Node, extPart: ExtendsPart | undefined, s: string, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object);
        to(part: Part): void;
    }
    interface Part extends BasePart {
    }
    class Part {
        constructor(template: UITemplate, extPart: ExtendsPart, s: string, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, partName?: string);
    }
    class ParamFilter {
        bool(v: any): boolean;
        intmin(v: any, p: any): any;
        string(v: any): string;
        floatmin(v: any, p: any): any;
        int(v: any): number;
        float(v: any): number;
        pxtoem(v: any, p: any): string;
        color(v: any): any;
        date(v: any, p: any): string;
        only(v: any, p: any): any;
        udftotrue(v: any): any;
        anytotrue(v: any): any;
        udftofalse(v: any): any;
        anytofalse(v: any): any;
        udftonull(v: any): any;
        anytonull(v: any): any;
        udftoemptystr(v: any): any;
        anytoemptystr(v: any): any;
    }
    class Templates {
        [index: string]: {
            getData(node: Node): string;
        } | {
            xmp: undefined;
        } | {};
        XMP: {};
        TEMPLATE: {};
        TITLE: {
            getData: (node: Node) => any;
        };
        STYLE: {
            xmp: undefined;
        };
        SCRIPT: {
            xmp: undefined;
        };
        TEXTAREA: {
            xmp: undefined;
            getData: (node: Node) => any;
        };
        toString(): string;
        static getItems(this: void, t: Templates): any[];
        static findByString(this: void, t: Templates, str: string): RegExpMatchArray | null | undefined;
    }
    class Client {
        [index: string]: (v: any) => void;
        constructor();
    }
    class RootScope {
        __actionNode__: any;
        __children__: any[];
        constructor();
    }
    class UIScope {
        create(node: Node, name: string): any;
        get(node: Node | null): any;
        stack: RootScope[];
        cut(scope: Object): void;
        link(scope: Object, node: Node): void;
    }
    class NullValueHash {
        [index: string]: null;
        constructor(s: string);
    }
    class KeyArrayObject<P> {
        [index: string]: P[];
        static push<P>(this: void, that: KeyArrayObject<P>, key: string | string[], node: P): void;
        static clear<P>(this: void, that: KeyArrayObject<P>): void;
        static getKeyArray<P>(this: void, that: KeyArrayObject<P>): any[];
        static pop<P>(this: void, that: KeyArrayObject<P>, key: string): P | undefined;
    }
    class Config {
        baseUIPath: BaseUIPath;
        baseServicePath: string;
        debugMode: number;
    }
    interface IRenderNamespace {
        [index: string]: {
            [index: string]: Part;
        };
    }
    class Turtle extends TurtleFunction {
        KeyArrayObject: typeof KeyArrayObject;
        Store: typeof Store;
        NullValueHash: typeof NullValueHash;
        fn: TurtleFunction;
        exec: typeof eval;
        defineUIByNode(node: HTMLElement): void;
        getExtendsByNode(node: HTMLElement, sortPath: string): UITemplate | undefined;
        parseComment(node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        parseAsyncOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        parseSwitchOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        parseBreakOrder(node: Comment): void;
        parseCommentOrderBlock(node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): {
            stack: any[];
            state: number;
            array: any[];
            index: number;
        };
        parseIfOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        addOrderToNode(node: Comment, info: Object, outerChildNodes: Node[] | undefined, outerElement: HTMLElement[] | undefined, props: Object | undefined, pPart: BasePart | undefined, fnGetOrder: Function): any;
        parseWhileOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        parseForOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        createBreakElement(nodes: Node[], order: any): HTMLElement | Text | Comment;
        parseCommentOrderNoScript(info: CommentStringInfo, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        parseScopeOrder(info: Object, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        parseCommentOrder(info: CommentStringInfo, node: Comment, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): any;
        readonly parseBreak: (node: HTMLElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart?: BasePart | undefined) => void;
        readonly parseGet: (node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined) => 4 | undefined;
        readonly parseReplace: (node: HTMLElement) => 4;
        readonly parseSet: (node: HTMLElement) => 4 | undefined;
        parseLazy(node: Node, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        parseAsync(node: Node, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        parseAsyncRemove(node: Node, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        initHTML(c: Node[] | NodeList, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart): void;
        getLastOrder(name: string): any;
        parseTemp(node: HTMLElement): void;
        parseXMP2(node: HTMLElement): void;
        isTemplate(node: HTMLElement): boolean;
        config: Config;
        event: {
            onerror: (e: any) => void;
        };
        getUI(uiName: string, uiSortPath: string, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        renderIn<T extends keyof IRenderNamespace, U extends keyof IRenderNamespace[T]>(uiName: U, uiSortPath: T, elem?: HTMLElement, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): IRenderNamespace[T][U] | undefined;
        render(renderBefore: boolean, uiName: string, uiSortPath: string, elem?: HTMLElement | Node | null, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        renderBefore(uiName: string, uiSortPath: string, elem?: Node, outerChildNodes?: Node[], outerElement?: HTMLElement[], props?: Object, pPart?: BasePart, partName?: string, reExtends?: string): Part | undefined;
        parseHTML(sHTML: string): Node[];
        getExtends(extName: string, sortPath: string): UITemplate;
        $DOM(html: string): HTMLElement;
        parseXMP(node: HTMLElement): Node[] | undefined;
        findTemplates(nodes: HTMLElement[] | HTMLCollection): HTMLElement[];
        importUIHTML(uiName: string, uiSortPath: string): UITemplate;
        getNodesLength(node: Element): any;
        getNodesLength2(node: Node): number;
        isDefine(node: Node): boolean;
        parseDefine(node: HTMLElement): void;
        defineClasses(node: HTMLElement): void;
        parseUITemplate(uiName: string, uiSortPath: string, uiPath: string, sHTML: string): void;
        getTemplate(node: Node): string;
        elementParser: {
            GET: (node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined) => 4 | undefined;
            SET: (node: HTMLElement) => 4 | undefined;
            REPLACE: (node: HTMLElement) => 4;
            __BREAK__: (node: HTMLElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart?: BasePart | undefined) => void;
            SCRIPT: (node: HTMLScriptElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart: BasePart) => void;
        };
        renderTemplate(tp: HTMLElement): void;
        replaceCls(): void;
        defineServiceByNode(node: HTMLElement): void;
        ui: UI;
        styleClasses: KeyArrayObject<string>;
        refs: KeyArrayObject<HTMLElement>;
        parts: KeyArrayObject<Part>;
        clsNode: any[];
        store: Store;
        service: Service;
        uiTeam: UITeam;
        uiLink: UILink;
        uiScope: UIScope;
        xhr: XHR;
        ready(fn: Function): this;
        renderDocument(): void;
        readyByRenderDocument: ReadyObject;
        turtleScriptElement: HTMLElement | null;
        Service: typeof Service;
        UIParam: typeof UIParam;
        EventEmitter: typeof EventEmitter;
        renderParser: {
            attributeParser: {
                ref(node: HTMLElement): void;
                ":"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                'p-ref'(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                bind(node: HTMLElement): void;
                remove(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                'async-remove'(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                add(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                show(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                hide(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "class.show"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "class.hide"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "class.toggle"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "style.show"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "style.hide"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                "style.toggle"(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
                cls(node: HTMLElement): void;
                'p-main'(node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined): void;
            };
            elementParser: {
                GET: (node: HTMLElement, outerChildNodes?: Node[] | undefined, outerElement?: HTMLElement[] | undefined, props?: Object | undefined, pPart?: BasePart | undefined) => 4 | undefined;
                SET: (node: HTMLElement) => 4 | undefined;
                REPLACE: (node: HTMLElement) => 4;
                __BREAK__: (node: HTMLElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart?: BasePart | undefined) => void;
                SCRIPT: (node: HTMLScriptElement, outerChildNodes: Node[], outerElement: HTMLElement[], props: Object, pPart: BasePart) => void;
            };
        };
        require: typeof loadJS;
        runJS: typeof runJS;
        runJSNoCache: typeof runJSNoCache;
        isIE: boolean;
        templates: Templates;
        url: string;
        catch(e: Event, onerror?: (e: Event) => void): void;
        paramFilter: ParamFilter;
        locStorage: {
            getVal: (key: string) => string | null | undefined;
            setVal: (...args: any[]) => void;
            leaveSpace: () => number;
            remove: (key: string) => void;
            keys: () => string[];
            val: (key: string, value: string) => string | null | undefined;
            contains: (key: string) => boolean;
            popVal: (key: string) => string | null | undefined;
        } | undefined;
        throwError: typeof throwError;
        onResize: (fn: (rect: ClientRect) => void) => void;
        emitResize: () => void;
        Templates: typeof Templates;
        readonly rootParts: Part[];
        private doImportUIJS(uiName, uiPath);
        importUIJS(uiName: string, uiSortPath: string): UITemplate;
        constructor();
    }
}
declare const $rootScope: turtleNS.RootScope;
declare const $_: turtleNS.RootScope;
declare const $client: turtleNS.Client;
declare const $$: (id: string) => HTMLElement | null;
declare let turtle: turtleNS.Turtle;
declare let $t: turtleNS.Turtle;
