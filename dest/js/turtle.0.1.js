var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ArrayEx = (function (_super) {
    __extends(ArrayEx, _super);
    function ArrayEx() {
        return _super.apply(this, arguments) || this;
    }
    ArrayEx.prototype.last = function () {
        if (this.length > 0) {
            return this[this.length - 1];
        }
    };
    ArrayEx.prototype.clear = function () {
        var l = this.length;
        for (var i_1 = 0; i_1 < l; i_1++) {
            this.pop();
        }
    };
    return ArrayEx;
}(Array));
/// <reference path="../lib/ArrayEx.ts"/>
/// <reference path="../lib/lib.ts" />
typeof Node !== "undefined" && (Node.prototype.beDOM = Node.prototype.valueOf =
    function () {
        return this;
    });
var vNodesToDOM = function (nodes) {
    return nodes;
};
function insertNodesBefore(node, nodes) {
    var parent = node.parentNode;
    if (parent == null) {
        return;
    }
    for (var i_2 = 0; i_2 < nodes.length; i_2++) {
        parent.insertBefore2(nodes[i_2], node);
    }
}
function removeNode(node) {
    var p = node.parentNode;
    if (p) {
        return p.removeChild(node);
    }
    else {
        return null;
    }
}
function replaceNodeByNodes(node, nodes) {
    insertNodesBefore(node, nodes);
    removeNode(node);
}
function insertNode(refChilde, newChild) {
    var parent = refChilde.parentNode;
    if (parent == null)
        return 0;
    parent.insertBefore2(newChild, refChilde);
    return 0;
}
function nodesToString(nodes) {
    var s = '';
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === 8) {
            s += '<!--' + nodes[i].data + '-->';
        }
        else if (nodes[i].nodeType === 3) {
            try {
                s += nodes[i].data;
            }
            catch (e) { }
        }
        else if (nodes[i].nodeType === 1) {
            s += nodes[i].outerHTML;
        }
    }
    return s;
}
// function deepClone(node: INode) {
//     let n = node.cloneNode();
//     let ns = node.childNodes;
//     for (let n of ns) {
//         n.appendChild(deepClone(ns[i]));
//     }
//     return n;
// }
function cloneBetween(node1, node2) {
    var nodes = [];
    var l1 = getNodeIndex2(node1);
    var l2 = getNodeIndex2(node2);
    var p1 = node1.parentNode;
    if (!p1) {
        return null;
    }
    for (var i_3 = l1 + 1; i_3 < l2; i_3++) {
        nodes.push(p1.childNodes[i_3].cloneNode(true));
    }
    return nodes;
}
function removeBlockBetween(node1, node2) {
    var p1 = node1.parentNode;
    var l1 = getNodeIndex2(node1) + 1;
    var l2 = getNodeIndex2(node2);
    if (!p1) {
        return null;
    }
    for (var i_4 = l1; i_4 < l2; i_4++) {
        p1.removeChild(p1.childNodes[l1]);
    }
}
function replaceNodeByNode(refChilde, newChild) {
    var parent = refChilde.parentNode;
    if (parent) {
        insertNode(refChilde, newChild);
        parent.removeChild(refChilde);
    }
}
function appendNodes(nodes, parent) {
    var cds = [];
    push.apply(cds, nodes);
    for (var _i = 0, cds_1 = cds; _i < cds_1.length; _i++) {
        var c = cds_1[_i];
        parent.appendChild(c);
    }
}
function takeChildNodes(node) {
    var cds = node.childNodes;
    var length = cds.length;
    var ret = [];
    for (var i_5 = length; i_5 > 0; i_5--) {
        ret.push(node.removeChild(cds[0]));
    }
    return ret;
}
function takeOutChildNodes(node) {
    var parent = node.parentNode;
    if (parent == null) {
        return;
    }
    var c = node.childNodes;
    for (var j = c.length - 1; j > -1; j--) {
        parent.insertBefore2(node.removeChild(c[0]), node);
    }
    parent.removeChild(node);
}
function takeBlockBetween(node1, node2) {
    var p1 = node1.parentNode;
    if (!p1) {
        return null;
    }
    var ns1 = p1.childNodes;
    var l1 = getNodeIndex2(node1) + 1;
    var l2 = getNodeIndex2(node2);
    var ns = [];
    for (var i_6 = l1; i_6 < l2; i_6++) {
        ns.push(p1.removeChild(ns1[l1]));
    }
    return ns;
}
function getNodesLength(node) {
    if (node.parentNode) {
        return node.parentNode.children.length;
    }
    var index = getNodeIndex(node) - 1;
    node = node.nextElementSibling;
    while (node != null) {
        node = node.nextElementSibling;
        index++;
    }
    return index;
}
function getNodeIndex(node) {
    var index = 0;
    node = node.previousElementSibling;
    while (node != null) {
        node = node.previousElementSibling;
        index++;
    }
    return index;
}
function getNodesLength2(node) {
    if (node.parentNode) {
        return node.parentNode.childNodes.length;
    }
    var index = getNodeIndex2(node) - 1;
    var nextNode = node.nextSibling;
    while (nextNode != null) {
        nextNode = nextNode.nextSibling;
        index++;
    }
    return index;
}
function getNodeIndex2(node) {
    var index = 0;
    var preNode = node.previousSibling;
    while (preNode != null) {
        preNode = preNode.previousSibling;
        index++;
    }
    return index;
}
function takeAttr(node, attrName, defaultValue) {
    if (!node.hasAttribute(attrName)) {
        return defaultValue;
    }
    else {
        var s = node.getAttribute(attrName);
        node.removeAttribute(attrName);
        return s;
    }
}
function getAttr(node, attrName, defaultValue) {
    if (!node.hasAttribute(attrName)) {
        return defaultValue;
    }
    else {
        return node.getAttribute(attrName);
    }
}
var addStyleRE = /;\s*$/;
function addStyle(elem, style) {
    if (!style) {
        return;
    }
    var oldStyle = elem.getAttribute('style');
    if (oldStyle) {
        if (addStyleRE.test(oldStyle)) {
            style = oldStyle + style;
        }
        else {
            style = oldStyle + ';' + style;
        }
    }
    elem.setAttribute('style', style);
}
var addClassNameRE = /\s+$/;
function addClassName(elem, className) {
    if (!className) {
        return;
    }
    var oldClass = elem.getAttribute('class');
    if (oldClass) {
        if (addClassNameRE.test(oldClass)) {
            className = oldClass + className;
        }
        else {
            className = oldClass + ' ' + className;
        }
    }
    elem.setAttribute('class', className);
}
function addClass(elem) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    addClasses(elem, arg);
}
function addClasses(elem, clses) {
    var lst;
    if (!elem)
        return;
    lst = elem.classList;
    for (var i = 0; i < clses.length; i++) {
        if (!lst.contains(clses[i]))
            lst.add(clses[i]);
    }
}
function removeClass(elem, cls) {
    var lst;
    if (!elem) {
        return;
    }
    lst = elem.classList;
    if (lst.contains(cls)) {
        lst.remove(cls);
    }
}
function removeClasses(elem, clses) {
    var lst;
    if (!elem)
        return;
    lst = elem.classList;
    for (var i = 0; i < clses.length; i++) {
        if (lst.contains(clses[i]))
            lst.remove(clses[i]);
    }
}
function replaceClass(elem, a, b) {
    if (elem && a && b) {
        elem.className = elem.className.replace(a, b);
    }
}
function toggleClass(elem, a, t, f) {
    if (elem && a)
        if (elem.className.indexOf(a) >= 0) {
            elem.className = elem.className.replace(a, "");
            if (f) {
                f();
            }
        }
        else {
            elem.className += " " + a;
            if (t) {
                t();
            }
        }
}
/**判断是否注释节点 */
function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
/**判断是否文本节点 */
function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
var arrayConstructor = Array.prototype, objectConstructor = Object.prototype, stringConstructor = String.prototype, toStr = objectConstructor.toString, getPrototypeOf = objectConstructor.getPrototypeOf, replace = stringConstructor.replace, slice = arrayConstructor.slice, push = arrayConstructor.push, splice = arrayConstructor.splice, indexOf = arrayConstructor.indexOf;
var last = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
};
function extend(elem, elemEx) {
    for (var e in elemEx) {
        elem[e] = elemEx[e];
    }
    return elem;
}
function merge(elem, elemEx) {
    for (var e in elemEx) {
        if (!elem.hasOwnProperty(e)) {
            elem[e] = elemEx[e];
        }
    }
    return elem;
}
function removeItem(arr, obj) {
    var index = Array.prototype.indexOf.call(arr, obj);
    if (index != -1) {
        Array.prototype.splice.call(arr, index, 1);
    }
}
function persentToFloat(s) {
    var v = persentRE.exec(s);
    if (v) {
        return parseInt(v[1]) / 100;
    }
}
function parseBool(v) {
    if (typeof v == 'string') {
        v = v.replace(/[\s]/g, '').toLowerCase();
        if (v && (v == 'false' || v == '0' || v == 'null' || v == 'undefined')) {
            v = false;
        }
        else if (v) {
            v = true;
        }
    }
    return !!v;
}
function trim(s) { return s.replace(/^\s*|\s*$/g, ""); }
function HTMLTrim(s) { return s.replace(/^[\s\r\n]*|[\s\r\n]*$/g, ""); }
function trimLine(s) { return s.replace(/^\s*/g, "").replace(/\s*$/g, "").replace(/\s*[\r\n]\s*/g, ""); }
var dateFormat = (function () {
    return function (format, d) {
        'use strict';
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
})();
var camelCaseRE = /-(\w)/g, camelizeRE = /-+(.)?/g, deCamelizeRE = /[A-Z]/g;
function camelCase(s) {
    return s.replace(camelCaseRE, function (s, s1) {
        return s1.toUpperCase();
    });
}
function camelize(str) {
    return str.replace(camelizeRE, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}
function decamelize(str) {
    return str.replace(deCamelizeRE, function (match) {
        return '-' + match.toLowerCase();
    });
}
function splitByOnce(s, split) {
    var index = s.indexOf(split), arr = [];
    if (index != -1) {
        arr.push(s.substring(0, index));
        arr.push(s.substring(index + split.length, s.length));
    }
    else {
        arr.push(s);
    }
    return arr;
}
// function newKeyArrayObject<T>(type:string):KeyArrayObject<T>{
//     return create(type,KeyArrayObject);
// }
// function newHashObject(type:string):HashObject<any>{
//     return create(type,HashObject);
// }
// function create(type:string,tsClass?:Constructor):any{
//     let s='let '+type+'=function(){};';
//     if(isObject((tsClass).prototype)){
//         s+=type+'.prototype=proto;';
//     }
//     s+='return new '+type+'();';
//     return Function('proto',s)((<any>tsClass).prototype);
// }
// let newArrayObject=(function(){
//     return function(type:string):ArrayEx<any>{
//         return create(type,ArrayEx);
//     }
// }());
function getBind(obj, fn) {
    return function () {
        return fn.apply(obj, arguments);
    };
}
/**从注释中读取字符串 */
var getCommentText = (function () {
    if (typeof Comment !== 'undefined' && Comment.prototype.hasOwnProperty("text")) {
        var commentDataRE_1 = /^<!--([\s\S]*?)-->$/;
        var commentDataRE2_1 = /^<!([\s\S]*?)>$/;
        var commentDataRE3_1 = /^!-?|-?&/;
        return function (node) {
            var s = node.data;
            if (commentDataRE_1.test(s)) {
                return s.substring(4, s.length - 3);
            }
            else if (commentDataRE2_1.test(s)) {
                return s.substring(2, s.length - 1);
            }
            else {
                return s.replace(commentDataRE3_1, '');
            }
        };
    }
    else {
        return function (node) {
            return node.data;
        };
    }
}());
/// <reference path="../lib/TypeHelper.ts"/>
var persentRE = /^\s*([\d.]+)%\s*$/;
function isNull(p) {
    return p == null;
}
function isUndefined(p) {
    return p === void 0;
}
function isObject(p) {
    var type = typeof p;
    return type === 'function' || type === 'object' && !!p;
}
function isRegExp(a) {
    return "[object RegExp]" === toStr.call(a);
}
function isDate(a) {
    return "[object Date]" === toStr.call(a);
}
function isNumber(a) {
    return "[object Number]" === toStr.call(a);
}
function isString(a) {
    return "[object String]" === toStr.call(a);
}
function isFunction(a) {
    return "[object Function]" === toStr.call(a);
}
// function isFinite(obj) {
//     return isFinite(obj) && !isNaN(parseFloat(obj));
// }
var isArray = Array.isArray || function (arg) {
    return "[object Array]" === toStr.call(arg);
};
function isPersent(s) {
    return persentRE.test(s);
}
function isArrayLike(a) { return typeof a.length == 'number'; }
/// <reference path="../lib/is.ts" />
var EventEmitter = (function () {
    function EventEmitter() {
        this.on = this.addListener;
        this.off = this.removeListener;
    }
    EventEmitter.prototype.emit = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // If there is no 'error' event listener then throw.
        if (type === 'error') {
            if (!this.events || !this.events.error ||
                (isArray(this.events.error) && !this.events.error.length)) {
                if (arguments[1] instanceof Error) {
                    throw arguments[1]; // Unhandled 'error' event
                }
                else {
                    throw new Error("Uncaught, unspecified 'error' event.");
                }
            }
        }
        if (!this.events)
            return false;
        var handler = this.events[type];
        if (!handler) {
            return false;
        }
        else if (isArray(handler)) {
            var listeners = handler.slice();
            for (var i_7 = 0, l = listeners.length; i_7 < l; i_7++) {
                listeners[i_7].apply(this, args);
            }
            return true;
        }
        else {
            handler.apply(this, args);
            return true;
        }
    };
    ;
    // EventEmitter is defined in src/nodeevents.cc
    // EventEmitter.prototype.emit() is also defined there.
    EventEmitter.prototype.addListener = function (type, listener) {
        if ('function' !== typeof listener) {
            throw new Error('addListener only takes instances of Function');
        }
        if (!this.events)
            this.events = {};
        // To avoid recursion in the case that type == "newListeners"! Before
        // adding it to the listeners, first emit "newListeners".
        this.emit('newListener', type, listener);
        var handler = this.events[type];
        if (!handler) {
            // Optimize the case of one listener. Don't need the extra array object.
            this.events[type] = listener;
        }
        else if (isArray(handler)) {
            // If we've already got an array, just append.
            handler.push(listener);
        }
        else {
            // Adding the second element, need to change to array.
            this.events[type] = [handler, listener];
        }
        return this;
    };
    ;
    EventEmitter.prototype.once = function (type, listener) {
        var self = this;
        self.on(type, function g() {
            self.removeListener(type, g);
            listener.apply(this, arguments);
        });
    };
    ;
    EventEmitter.prototype.removeListener = function (type, listener) {
        if ('function' !== typeof listener) {
            throw new Error('removeListener only takes instances of Function');
        }
        // does not use listeners(), so no side effect of creating events[type]
        if (!this.events || !this.events[type])
            return this;
        var list = this.events[type];
        if (isArray(list)) {
            var i_8 = list.indexOf(listener);
            if (i_8 < 0)
                return this;
            list.splice(i_8, 1);
            if (list.length == 0)
                delete this.events[type];
        }
        else if (this.events[type] === listener) {
            delete this.events[type];
        }
        return this;
    };
    ;
    EventEmitter.prototype.removeAllListeners = function (type) {
        // does not use listeners(), so no side effect of creating events[type]
        if (type && this.events && this.events[type]) {
            delete this.events[type];
        }
        return this;
    };
    ;
    EventEmitter.prototype.listeners = function (type) {
        if (!this.events)
            this.events = {};
        var handler = this.events[type];
        if (!handler) {
            this.events[type] = [];
        }
        else if (!isArray(handler)) {
            this.events[type] = [handler];
        }
        return this.events[type];
    };
    ;
    return EventEmitter;
}());
/// <reference path="EventEmitter.ts"/>
var EventHelper = (function () {
    function EventHelper(target, type) {
        this.target = target;
        this.type = type;
        this.emit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args.unshift(this.type);
            return this.target.emit.apply(this.target, args);
        };
    }
    EventHelper.prototype.on = function (listener) {
        this.target.on(this.type, listener);
    };
    EventHelper.prototype.addListener = function (listener) {
        this.target.on(this.type, listener);
    };
    EventHelper.prototype.once = function (listener) {
        this.target.once(this.type, listener);
    };
    EventHelper.prototype.off = function (listener) {
        this.target.off(this.type, listener);
    };
    EventHelper.prototype.removeListener = function (listener) {
        return this.target.removeListener(this.type, listener);
    };
    EventHelper.prototype.removeAllListeners = function () {
        return this.target.removeAllListeners(this.type);
    };
    EventHelper.prototype.listeners = function () {
        return this.target.listeners(this.type);
    };
    return EventHelper;
}());
/// <reference path="EventEmitter.ts"/>
/// <reference path="EventHelper.ts"/>
var EventEmitterEx = (function (_super) {
    __extends(EventEmitterEx, _super);
    function EventEmitterEx() {
        var _this = _super.apply(this, arguments) || this;
        /**
         * 缓存事件管理器
         */
        _this.eventHelpers = {};
        return _this;
    }
    /**
     * 生成或获取一个事件管理器
     */
    EventEmitterEx.prototype.getEventHelper = function (type) {
        var eventHelper = this.eventHelpers[type];
        if (!eventHelper) {
            eventHelper = this.eventHelpers[type] = new EventHelper(this, type);
        }
        return eventHelper;
    };
    return EventEmitterEx;
}(EventEmitter));
/**
 * 遍历树
 * @param {T[]|IArray} array 数组或类数组
 * @param {string} propertyName 数组元素包含的属性名
 * @param {(node:T,step?:ITreeEachStep)=>eTreeEach|undefined} fn 回调函数
 * @param {number} beginIndex 遍历起始位置
 */
function treeEach(array, propertyName, fn, beginIndex) {
    if (beginIndex === void 0) { beginIndex = 0; }
    if (!isArrayLike(array)) {
        return;
    }
    var arr = array, i = beginIndex, state = {
        stack: [array, beginIndex],
        nextStepLength: 1,
        currentIndex: 0
    }, stack = state.stack, obj, obj2, ret;
    while (true) {
        if (i < arr.length) {
            obj = arr[i];
            state.nextStepLength = 1;
            state.currentIndex = i;
            ret = fn(obj, state);
            if (ret == undefined) {
                ret = 0;
            }
            else if (ret == 1 /* c_stopEach */) {
                break;
            }
            obj2 = arr[i];
            if (obj2 && obj2 != obj && !(8 /* c_noRepeat */ & ret)) {
                ret = ret | 2 /* c_repeat */;
            }
            if (obj2 && obj2[propertyName] && obj2[propertyName].length > 0 && !(ret & 4 /* c_noIn */) && propertyName) {
                stack.push(arr);
                stack.push(i + (ret & 2 /* c_repeat */ ? 0 : state.nextStepLength));
                i = 0;
                arr = obj2[propertyName];
            }
            else {
                i += (ret & 2 /* c_repeat */ ? 0 : state.nextStepLength);
            }
        }
        else if (stack.length > 2) {
            i = stack.pop();
            arr = stack.pop();
        }
        else {
            break;
        }
    }
    return { stack: stack, return: ret, array: arr, index: i };
}
var isIE;
try {
    isIE = !!(typeof window !== "undefined" && window.ActiveXObject || "ActiveXObject" in window);
}
catch (e) {
    isIE = false;
}
(function () {
    var insertBefore = Node.prototype.insertBefore;
    if (isIE) {
        var reAppend_1 = [];
        Node.prototype.insertBefore2 = function (newNode, refChild) {
            var n;
            if (isTextNode(newNode)) {
                if (newNode.data === "") {
                    return newNode;
                }
            }
            else if (isCommentNode(newNode)) {
                var node = refChild ? refChild : this.childNodes[0];
                if (!node) {
                    return newNode;
                }
                n = node.nextSibling;
                while (n !== null) {
                    reAppend_1.push(this.removeChild(n));
                    n = node.nextSibling;
                }
                reAppend_1.unshift(this.removeChild(node));
                this.appendChild(newNode);
                for (var i_9 = 0; i_9 < reAppend_1.length; i_9++) {
                    this.appendChild(reAppend_1[i_9]);
                }
                return newNode;
            }
            else {
                var node = refChild ? refChild : this.childNodes[0];
                if (!node) {
                    return newNode;
                }
                return insertBefore.call(this, newNode, node);
            }
            return newNode;
        };
    }
    else {
        Node.prototype.insertBefore2 = insertBefore;
    }
})();
/// <reference path="../core/BrowserHelper.ts"/>
var TemplateList = (function (_super) {
    __extends(TemplateList, _super);
    function TemplateList() {
        return _super.apply(this, arguments) || this;
    }
    TemplateList.prototype.onDefine = function (name, fn) {
        if (name.length === 0) {
            return;
        }
        this.on(name, fn);
        this.emit(name, fn);
    };
    TemplateList.prototype.define = function (name, sortPath, path, s, ext) {
        this[name] = new PartTemplate(name, sortPath, path, s, ext);
        // this.event.emit(name,this[name]);
        this.emit(name, this);
        return this[name];
    };
    TemplateList.prototype.toString = function () {
        var lst = [];
        for (var i_10 in this) {
            if (this.hasOwnProperty(i_10)) {
                lst.push(i_10);
            }
        }
        return lst.join('\n');
    };
    return TemplateList;
}(EventEmitter));
/// <reference path='TemplateList.ts'/>
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(serv) {
        var _this = _super.call(this) || this;
        _this.__defineCallbacks__ = new ArrayEx();
        if (isObject(serv)) {
            for (var i_11 in serv) {
                _this[i_11] = serv[i_11];
                _this.emit(i_11, _this[i_11]);
            }
        }
        return _this;
    }
    Service.prototype.require = function (n) {
        if (!this.hasOwnProperty(n)) {
            this[n] = getService(n);
        }
        return this[n];
    };
    Service.prototype.define = function (name, s) {
        // try{
        this[name] = exec("(" + s + ")");
        // }catch(e){
        //     _catch(e);
        // }
        this.emit(name, this[name]);
        // this.event.emit(name,this[name]);
    };
    Service.prototype.toDefineString = function () {
        var s = 'new $t.Service(';
        var fns = [];
        for (var i_12 in this) {
            if (this.hasOwnProperty(i_12)) {
                fns.push('"' + i_12 + '":' + this[i_12].toString());
            }
        }
        if (fns.length > 0) {
            s += '{' + fns.join(',') + '})';
        }
        else {
            s += ')';
        }
        return s;
    };
    return Service;
}(TemplateList));
var NameItem = (function () {
    function NameItem(name) {
        this.name = name;
    }
    return NameItem;
}());
var BasePath = (function () {
    function BasePath() {
        this.paths = {};
    }
    BasePath.prototype.push = function (v) {
        if (isString(v)) {
            this.parseUIPath(v);
        }
        else if (isArray(v)) {
            for (var i = 0; i < v.length; i++) {
                if (isString(v[i])) {
                    this.parseUIPath(v[i]);
                }
            }
        }
    };
    BasePath.prototype.parseUIPath = function (s) {
        // try{
        var o = exec('(' + s + ')');
        if (isObject(o) && o.hasOwnProperty('name') && o.hasOwnProperty('path')) {
            this.paths[o.name] = o;
            this.push(o);
        }
        // }catch(e){_catch(e);}
    };
    BasePath.prototype.getPathBySortPath = function (sortPath) {
        return this.paths[sortPath].path;
    };
    BasePath.prototype.hasSortPath = function (sortPath) {
        return this.paths.hasOwnProperty(sortPath);
    };
    BasePath.prototype.toString = function () {
        var arr = [];
        for (var i in this.paths) {
            arr.push("{name:'" + this.paths[i].name + "',path:'" + this.paths[i].path + "'}");
        }
        return arr.join(';');
    };
    return BasePath;
}());
var TemplateConfig = (function () {
    function TemplateConfig() {
        this.XMP = {};
        this.TEMPLATE = {};
        this.TITLE = { getData: function (node) { return node.innerText; } };
        this.STYLE = { xmp: undefined };
        this.SCRIPT = { xmp: undefined };
        this.TEXTAREA = { xmp: undefined, getData: function (node) { return node.defaultValue; } };
    }
    TemplateConfig.prototype.toString = function () {
        var arr = [];
        var desc;
        for (var i_13 in this) {
            if (!this.hasOwnProperty(i_13)) {
                continue;
            }
            desc = '<' + i_13.toLowerCase();
            if (this[i_13].hasOwnProperty("xmp")) {
                desc += ' xmp';
            }
            desc += '>';
            arr.push(desc);
        }
        return arr.join("\n");
    };
    Object.defineProperty(TemplateConfig.prototype, "items", {
        get: function () {
            var items = [];
            for (var i_14 in this) {
                if (!this.hasOwnProperty(i_14)) {
                    continue;
                }
                var item = new NameItem(i_14.toLowerCase());
                extend(item, this[i_14]);
                items.push(item);
            }
            return items;
        },
        enumerable: true,
        configurable: true
    });
    TemplateConfig.prototype.findByString = function (str) {
        if (str.length === 0) {
            return;
        }
        var ts = this.items;
        var regExes = [];
        for (var i_15 = 0; i_15 < ts.length; i_15++) {
            var s = '(<' + ts[i_15].name;
            if (ts[i_15].hasOwnProperty('xmp')) {
                s += '[\\s\\S]*? +xmp';
            }
            s += "([\\s\\S]*?)>([\\s\\S]*?)<\\/" + ts[i_15].name + ">";
            s += ')';
            regExes.push(s);
        }
        var re = new RegExp(regExes.join("|"), "g"); //exec(`(/${regExes.join("|")}/g)`);
        return str.match(re);
    };
    return TemplateConfig;
}());
var templateConfig = new TemplateConfig;
var baseUIPath = new BasePath;
var Scope = (function () {
    function Scope(commentNode, parent, __name__) {
        this.__name__ = __name__;
        this.__children__ = [];
        var p = commentNode.parentNode;
        if (!p) {
            throw new Error("Scope必须附加在节点上！");
        }
        this.__actionNode__ = p;
        this.__parent__ = parent;
        this.__proto__ = parent;
        if (p)
            p.__scope__ = this;
        if (parent) {
            parent.__children__.push(this);
            if (__name__) {
                parent[__name__] = this;
            }
        }
    }
    return Scope;
}());
var RootScope = (function () {
    function RootScope(document) {
        this.document = document;
        this.__parent__ = null;
        this.__children__ = [];
        this.__actionNode__ = document;
        document.__scope__ = this;
    }
    return RootScope;
}());
var IAttr = (function () {
    function IAttr(name, value) {
        this.name = name;
        this.value = value;
    }
    return IAttr;
}());
/// <reference path="../../lib/is.ts"/>
/// <reference path="../../lib/IAttr.ts"/>
var VNamedNodeMap = (function () {
    function VNamedNodeMap() {
        this._length = 0;
    }
    VNamedNodeMap.prototype.indexOfName = function (name) {
        var l = this._length;
        for (var i = 0; i < l; i++) {
            if (this[i].name === name) {
                return i;
            }
        }
        return -1;
    };
    VNamedNodeMap.prototype.indexOf = function (o) {
        var l = this._length;
        for (var i = 0; i < l; i++) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
    VNamedNodeMap.prototype.getNamedItem = function (name) {
        var idx = this.indexOfName(name);
        if (idx === -1) {
            return null;
        }
        else {
            return this[idx];
        }
    };
    //getNamedItemNS: getNamedItemNS()
    VNamedNodeMap.prototype.item = function (index) {
        return this[index];
    };
    Object.defineProperty(VNamedNodeMap.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    VNamedNodeMap.prototype.removeNamedItem = function (v) {
        if (isString(v)) {
            var idx = this.indexOfName(v);
        }
        else {
            var idx = this.indexOf(v);
        }
        if (idx !== -1) {
            var l = this._length;
            for (var i = idx; i < l; i++) {
                this[i] = this[i + 1];
            }
            this._length--;
            delete this[this._length];
            var hideValueName = '__' + v + '__';
            if (hideValueName in this) {
                this[hideValueName] = "";
            }
        }
    };
    //removeNamedItemNS: removeNamedItemNS()
    VNamedNodeMap.prototype.setNamedItem = function (arg) {
        var name = arg.name;
        var idx = this.indexOfName(name);
        // if (!isString(value)) {
        //     if (isObject(value)) {
        //         value = value.toString();
        //     } else if (value === undefined) {
        //         value = "";
        //     }
        // }
        if (idx === -1) {
            this[this._length] = arg;
            this._length++;
        }
        else {
            this[idx] = arg;
        }
        var hideValueName = '__' + name + '__';
        if (hideValueName in this) {
            this[hideValueName] = arg;
        }
    };
    //setNamedItemNS: setNamedItemNS()
    VNamedNodeMap.prototype.toJS = function () {
        var sAttr = '';
        if (this.length > 0) {
            for (var i_16 = 0; i_16 < this.length; i_16++) {
                sAttr += '._("' + this[i_16].name;
                if (this[i_16].value) {
                    sAttr += '","' + this[i_16].value + '")';
                }
                else {
                    sAttr += '")';
                }
            }
        }
        return sAttr;
    };
    return VNamedNodeMap;
}());
var styleListRE = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g;
var VStyle = (function () {
    function VStyle(elem) {
        var attrs = elem.attributes;
        var style = "", isLock = 0, __ = {}, t = this;
        for (var i in styleNode) {
            __[i] = "";
        }
        Object.defineProperty(this, '__', {
            value: __,
            writable: false,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(this, 'length', {
            value: 0,
            writable: true,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(this, '__elem__', {
            value: elem,
            writable: false,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(attrs, "__style__", {
            get: function () {
                return style;
            },
            set: function (s) {
                if (isLock === 1 || style === s) {
                    return;
                }
                style = s;
                if (isLock === 2) {
                    return;
                }
                isLock = 1;
                var lst;
                var lst2 = [];
                while ((lst = styleListRE.exec(s)) !== null) {
                    lst2.push(lst);
                }
                if (lst2.length > 0) {
                    for (var i = 0; i < lst2.length - 1; i++) {
                        t[camelize(lst2[i][1])] = lst2[i][2];
                    }
                    isLock = 2;
                    t[camelize(lst2[i][1])] = lst2[i][2];
                }
                isLock = 0;
                //styleListRE.lastIndex=0;
            }
        });
    }
    return VStyle;
}());
function indexOfStyleName(t, name) {
    for (var i_17 = 0; i_17 < t.length; i_17++) {
        if (t[i_17] === name) {
            return i_17;
        }
    }
    return -1;
}
function updateStyleAttribyte(t) {
    var style = "";
    for (var i_18 = 0; i_18 < t.length; i_18++) {
        style += decamelize(t[i_18]) + ':' + t[t[i_18]] + ';';
    }
    t.__elem__.setAttribute('style', style);
}
function setVStyleGetSet(name) {
    Object.defineProperty(VStyleprototype, name, {
        get: function () {
            return this.__[name];
        },
        set: function (s) {
            if (s === this.__[name]) {
                return;
            }
            else if (s === "") {
                if (this.__[name] === s) {
                    return;
                }
                //删除
                this.__[name] = s;
                var idx = indexOfStyleName(this, name);
                //if(idx!==-1){
                for (var i = idx; i < this.length - 1; i++) {
                    this[i] = this[i + 1];
                }
                delete this[i];
                this.length--;
                //}
                //更新标签属性
                updateStyleAttribyte(this);
            }
            else {
                //验证是否有效style
                var s2;
                styleNode[name] = s;
                s2 = styleNode[name];
                styleNode[name] = "";
                if (s !== "") {
                    this.__[name] = s;
                    var style = this.__elem__.getAttribute(style);
                    var idx = indexOfStyleName(this, name);
                    if (idx === -1) {
                        this[this.length] = name;
                        this.length++;
                    }
                    //更新标签属性
                    updateStyleAttribyte(this);
                }
                else {
                    throw new Error(name + "不支持" + s);
                }
            }
        }
    });
}
var VStyleprototype = {};
var styleNode = {};
for (var i in ["alignContent", "alignItems", "alignSelf", "alignmentBaseline", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "backfaceVisibility", "background", "backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPosition", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize", "baselineShift", "border", "borderBottom", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStyle", "borderBottomWidth", "borderCollapse", "borderColor", "borderImage", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRadius", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderSpacing", "borderStyle", "borderTop", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStyle", "borderTopWidth", "borderWidth", "bottom", "boxShadow", "boxSizing", "breakAfter", "breakBefore", "breakInside", "captionSide", "clear", "clip", "clipPath", "clipRule", "color", "colorInterpolationFilters", "columnCount: any;columnFill", "columnGap: any;columnRule", "columnRuleColor: any;columnRuleStyle", "columnRuleWidth: any;columnSpan", "columnWidth: any;columns", "content", "counterIncrement", "counterReset", "cssFloat", "cssText: string;cursor", "direction", "display", "dominantBaseline", "emptyCells", "enableBackground", "fill", "fillOpacity", "fillRule", "filter", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "floodColor", "floodOpacity", "font", "fontFamily", "fontFeatureSettings", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "glyphOrientationHorizontal", "glyphOrientationVertical", "height", "imeMode", "justifyContent", "kerning", "left", "length: number;letterSpacing", "lightingColor", "lineHeight", "listStyle", "listStyleImage", "listStylePosition", "listStyleType", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "marker", "markerEnd", "markerMid", "markerStart", "mask", "maxHeight", "maxWidth", "minHeight", "minWidth", "msContentZoomChaining", "msContentZoomLimit", "msContentZoomLimitMax: any;msContentZoomLimitMin: any;msContentZoomSnap", "msContentZoomSnapPoints", "msContentZoomSnapType", "msContentZooming", "msFlowFrom", "msFlowInto", "msFontFeatureSettings", "msGridColumn: any;msGridColumnAlign", "msGridColumnSpan: any;msGridColumns", "msGridRow: any;msGridRowAlign", "msGridRowSpan: any;msGridRows", "msHighContrastAdjust", "msHyphenateLimitChars", "msHyphenateLimitLines: any;msHyphenateLimitZone: any;msHyphens", "msImeAlign", "msOverflowStyle", "msScrollChaining", "msScrollLimit", "msScrollLimitXMax: any;msScrollLimitXMin: any;msScrollLimitYMax: any;msScrollLimitYMin: any;msScrollRails", "msScrollSnapPointsX", "msScrollSnapPointsY", "msScrollSnapType", "msScrollSnapX", "msScrollSnapY", "msScrollTranslation", "msTextCombineHorizontal", "msTextSizeAdjust: any;msTouchAction", "msTouchSelect", "msUserSelect", "msWrapFlow: string;msWrapMargin: any;msWrapThrough: string;opacity", "order", "orphans", "outline", "outlineColor", "outlineStyle", "outlineWidth", "overflow", "overflowX", "overflowY", "padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "pageBreakAfter", "pageBreakBefore", "pageBreakInside", "parentRule: CSSRule;perspective", "perspectiveOrigin", "pointerEvents", "position", "quotes", "right", "rubyAlign", "rubyOverhang", "rubyPosition", "stopColor", "stopOpacity", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "tableLayout", "textAlign", "textAlignLast", "textAnchor", "textDecoration", "textIndent", "textJustify", "textKashida", "textKashidaSpace", "textOverflow", "textShadow", "textTransform", "textUnderlinePosition", "top", "touchAction", "transform", "transformOrigin", "transformStyle", "transition", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "unicodeBidi", "verticalAlign", "visibility", "webkitAlignContent", "webkitAlignItems", "webkitAlignSelf", "webkitAnimation", "webkitAnimationDelay", "webkitAnimationDirection", "webkitAnimationDuration", "webkitAnimationFillMode", "webkitAnimationIterationCount", "webkitAnimationName", "webkitAnimationPlayState", "webkitAnimationTimingFunction", "webkitAppearance", "webkitBackfaceVisibility", "webkitBackgroundClip", "webkitBackgroundOrigin", "webkitBackgroundSize", "webkitBorderBottomLeftRadius", "webkitBorderBottomRightRadius", "webkitBorderImage", "webkitBorderRadius", "webkitBorderTopLeftRadius", "webkitBorderTopRightRadius", "webkitBoxAlign", "webkitBoxDirection", "webkitBoxFlex", "webkitBoxOrdinalGroup", "webkitBoxOrient", "webkitBoxPack", "webkitBoxSizing", "webkitColumnBreakAfter", "webkitColumnBreakBefore", "webkitColumnBreakInside", "webkitColumnCount: any;webkitColumnGap: any;webkitColumnRule", "webkitColumnRuleColor: any;webkitColumnRuleStyle", "webkitColumnRuleWidth: any;webkitColumnSpan", "webkitColumnWidth: any;webkitColumns", "webkitFilter", "webkitFlex", "webkitFlexBasis", "webkitFlexDirection", "webkitFlexFlow", "webkitFlexGrow", "webkitFlexShrink", "webkitFlexWrap", "webkitJustifyContent", "webkitOrder", "webkitPerspective", "webkitPerspectiveOrigin", "webkitTapHighlightColor", "webkitTextFillColor", "webkitTextSizeAdjust: any;webkitTransform", "webkitTransformOrigin", "webkitTransformStyle", "webkitTransition", "webkitTransitionDelay", "webkitTransitionDuration", "webkitTransitionProperty", "webkitTransitionTimingFunction", "webkitUserModify", "webkitUserSelect", "webkitWritingMode", "whiteSpace", "widows", "width", "wordBreak", "wordSpacing", "wordWrap", "writingMode", "zIndex", "zoom"]) {
    setVStyleGetSet(i);
}
/// <reference path="../lib/ArrayEx.ts"/>
/**
 * 一个普通对象
 * @param {string} s 格式为:xxx,yyy,zzz
 * @param {any} defaultValue 初始化时每个属性的默认值
 */
var HashObject = (function () {
    function HashObject(s, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var arr = s.split(',');
        for (var i_19 in arr) {
            this[arr[i_19]] = defaultValue;
        }
    }
    return HashObject;
}());
var HashObjectManage = (function () {
    function HashObjectManage() {
    }
    HashObjectManage.clean = function (data) {
        for (var i in data) {
            if (!data.hasOwnProperty(i)) {
                delete data[i];
            }
        }
    };
    HashObjectManage.take = function (data, name) {
        if (data.hasOwnProperty(name)) {
            var ret = data[name];
            delete this[name];
            return ret;
        }
        return null;
    };
    return HashObjectManage;
}());
var KeyArrayHashObjectManage = (function () {
    function KeyArrayHashObjectManage() {
    }
    KeyArrayHashObjectManage.isArray = function (p) {
        return typeof p === "array";
    };
    KeyArrayHashObjectManage.clean = function (data) {
        for (var i in data) {
            if (!data.hasOwnProperty(i)) {
                delete data[i];
            }
        }
    };
    KeyArrayHashObjectManage.take = function (data, name) {
        if (data.hasOwnProperty(name)) {
            var ret = data[name];
            delete this[name];
            return ret;
        }
        return null;
    };
    KeyArrayHashObjectManage.getKeyArray = function (data) {
        var arr = new ArrayEx();
        for (var i in data) {
            if (!data.hasOwnProperty(i)) {
                arr.push(data[i]);
            }
        }
        return arr;
    };
    KeyArrayHashObjectManage.pop = function (data, key) {
        var keyObject = data[key];
        if (keyObject) {
            return keyObject.pop();
        }
    };
    KeyArrayHashObjectManage.push = function (data, key, value) {
        if (KeyArrayHashObjectManage.isArray(key)) {
            for (var i = 0; i < key.length; i++) {
                if (!data.hasOwnProperty(key[i])) {
                    data[key[i]] = new ArrayEx();
                }
                data[key[i]].push(value);
            }
        }
        else {
            if (!data.hasOwnProperty(key)) {
                data[key] = new ArrayEx();
            }
            data[key].push(value);
        }
    };
    return KeyArrayHashObjectManage;
}());
// class KeyArrayHashObject<T>{
//     clean(){
//         KeyArrayHashObjectManage.clean(<any>this);
//     }
//     take(name:string):ArrayEx<T>{
//         return <any>KeyArrayHashObjectManage.take(<any>this,name);
//     }
//     getKeyArray():ArrayEx<ArrayEx<T>>{
//         return <any>KeyArrayHashObjectManage.getKeyArray(<any>this);
//     }
//     pop(key:string){
//         KeyArrayHashObjectManage.pop(<any>this,key);
//     }
//     push(key:string|string[],value:T){
//         KeyArrayHashObjectManage.push(<any>this,key,value);
//     }
// }
// function createKeyArrayHashObject<T>():IKeyArrayHashObject<T> & KeyArrayHashObject<T>{
//     return <any>(new KeyArrayHashObject<T>());
// }
//浏览器兼容
var classSplitRE = /\s+/g;
var ClassList = (function () {
    function ClassList(element) {
        this.element = element;
    }
    ClassList.prototype.add = function (value) {
        var classes = this.element.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (!~index) {
            classes.push(value);
            this.element.className = classes.join(' ');
        }
    };
    ClassList.prototype.remove = function (value) {
        var classes = this.element.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
            this.element.className = classes.join(' ');
        }
    };
    ClassList.prototype.toggle = function (value) {
        var classes = this.element.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
        }
        else {
            classes.push(value);
        }
        this.element.className = classes.join(' ');
    };
    ClassList.prototype.contains = function (value) {
        return !!~this.element.className.split(classSplitRE).indexOf(value);
    };
    ClassList.prototype.item = function (i) {
        return this.element.className.split(classSplitRE)[i] || null;
    };
    return ClassList;
}());
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>
var VNodeList = (function () {
    function VNodeList() {
        this.length = 0;
    }
    VNodeList.prototype.item = function (index) {
        return this[index];
    };
    VNodeList.clear = function (vNodeList) {
        for (var i = 0; i < vNodeList.length; i++) {
            vNodeList[i].parentNode = null;
            delete vNodeList[i];
        }
        vNodeList.length = 0;
    };
    return VNodeList;
}());
/// <reference path='.d.ts'/>
var VHTMLCollection = (function () {
    function VHTMLCollection() {
    }
    /**
      * Retrieves an object from various collections.
      */
    VHTMLCollection.prototype.item = function (index) {
        var ret = this[index];
        if (ret) {
            return ret;
        }
        else {
            return null;
        }
    };
    /**
      * Retrieves a select object or an object from an options collection.
      */
    VHTMLCollection.prototype.namedItem = function (name) {
        for (var i_20 = 0; i_20 < this.length; i_20++) {
            var element = this[i_20];
            if (element.getAttribute("name") === name) {
                return element;
            }
        }
        return null;
    };
    return VHTMLCollection;
}());
var VNodeVMData = (function () {
    function VNodeVMData() {
        this.data = "";
        this.__ = {};
        this.domNode = null;
        /**是否闭合 */
        this.isClose = false;
        /**是否自闭合 */
        /** */
        this.closeSelf = false;
    }
    return VNodeVMData;
}());
/// <reference path='.d.ts'/>
/// <reference path='VNamedNodeMap.ts'/>
/// <reference path='VStyle.ts'/>
/// <reference path='../../lib/HashObject.ts'/>
/// <reference path='../../lib/ClassList.ts'/>
/// <reference path='../../lib/Lib.ts'/>
/// <reference path='../../lib/TypeHelper.ts'/>
/// <reference path='VNodeList.ts'/>
/// <reference path='VHTMLCollection.ts'/>
/// <reference path='VNodeVMData.ts'/>
var emptyTextNodeRE = /^\s*$/, stringNode = {
    SCRIPT: /^\/script[>\s]/i,
    TEMPLATE: /^\/template[>\s]/i,
    STYLE: /^\/style[>\s]/i,
    TITLE: /^\/title[>\s]/i,
    TEXTAREA: /^\/textarea[>\s]/i,
    XMP: /^\/xmp[>\s]/i
};
var functionCommentRE = /\/\*([\s\S]*?)\*\//g;
function getFunctionComment(fn) {
    var s = functionCommentRE.exec(fn.toString());
    return s[1];
}
var VNode = (function () {
    function VNode() {
        this.vmData = new VNodeVMData();
        this.childNodes = new VNodeList;
    }
    /**
     * 添加子节点，并返回子节点
     */
    VNode.prototype.$$ = function (vNode) {
        this.appendChild(vNode);
        return vNode;
    };
    /**
     * 添加子节点，并返回自身
     */
    VNode.prototype.$$$ = function (vNode) {
        this.appendChild(vNode);
        return this;
    };
    Object.defineProperty(VNode.prototype, "$", {
        /**
         * 返回父节点，如果无，返回自己
         */
        get: function () {
            var p = this.parentNode;
            this.vmData.isClose = true;
            if (p) {
                return p;
            }
            else {
                throw new Error("parentNode is Null");
            }
        },
        enumerable: true,
        configurable: true
    });
    VNode.prototype.addEventListener = function (type, listener, useCapture) {
    };
    VNode.prototype.dispatchEvent = function (evt) {
        return false;
    };
    VNode.prototype.removeEventListener = function (type, listener, useCapture) {
    };
    VNode.prototype.addText = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var s = args.join('\r\n');
        var t = this(s, 3);
        this.appendChild(t);
        return this;
    };
    VNode.prototype.addText2 = function (fn) {
        // let t = newVNode($t.getFunctionComment(fn), 3, this.nodeName === 'PRE');
        var t = this(getFunctionComment(fn), 3);
        this.appendChild(t);
        return this;
    };
    VNode.prototype.append = function (name, nodeType) {
        return this.doAppendChild($$$(name, nodeType));
    };
    /**
     * 添加子节点，并返回子节点
     */
    VNode.prototype.appendChild = function (vNode) {
        var idx = Array.prototype.indexOf.call(this.childNodes, vNode);
        if (idx === -1) {
            return this.doAppendChild(vNode);
        }
        else {
            return vNode;
        }
    };
    VNode.prototype.doAppendChild = function (vNode) {
        Array.prototype.push.call(this.childNodes, vNode);
        var p = vNode.parentNode;
        if (p) {
            p.removeChild(vNode);
        }
        vNode.parentNode = this;
        return vNode;
    };
    VNode.prototype.insertBefore = function (newNode, refChild) {
        //添加到childNodes里
        var chds = this.childNodes;
        var idx = indexOf.call(chds, refChild);
        if (idx === -1) {
            return newNode;
        }
        var p2 = newNode.parentNode;
        if (p2) {
            p2.removeChild(newNode);
        }
        splice.call(chds, idx, 0, newNode);
        newNode.parentNode = this;
        return newNode;
    };
    VNode.prototype.insertBefore2 = function (newNode, node) {
        return this.insertBefore(newNode, node);
    };
    VNode.prototype.remove = function () {
        var p = this.parentNode;
        if (p) {
            p.removeChild(this);
        }
    };
    VNode.prototype.removeChild = function (vNode) {
        if (!vNode || this.childNodes.length === 0) {
            return vNode;
        }
        removeItem(this.childNodes, vNode);
        vNode.parentNode = null;
        return vNode;
    };
    VNode.prototype.getData = function () {
        return this.vmData.data;
    };
    // createElement(name: string): IVElement;
    // createTextNode(value: string): IVText;
    // createComment(value: string): IVComment;
    // addEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    // removeEventListener(name: string, fn?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    VNode.prototype.toJSString = function (space) {
        if (space === void 0) { space = 0; }
        return "$$$" + this.toJS(space).replace(/^\s*/, '');
    };
    VNode.prototype.beDOM = function () {
        if (this.vmData.domNode) {
            return this.vmData.domNode;
        }
        var elem = this.doToDOM();
        this.copyPropertyToNode(elem);
        this.vmData.domNode = elem;
        this.connectParent(elem);
        this.emulation();
        elem.__vdomNode__ = this;
        return elem;
    };
    VNode.prototype.doToDOM = function () {
        var toHelp = document.createElement('__Turtle__'); //用于创建
        toHelp.innerHTML = this.vmData.data;
        var elem = toHelp.removeChild(toHelp.childNodes[0]);
        return elem;
    };
    VNode.prototype.copyPropertyToNode = function (elem) {
        debugger;
        for (var i_21 in this) {
            switch (i_21) {
                case '__':
                case '__events__':
                case '__isClose__':
                case 'vmData.domNode':
                // case "__closeSelf__":
                case '__proto__':
                case 'children':
                case 'childNodes':
                case 'nodeType':
                case 'nodeName':
                case 'parentNode':
                case "style":
                case "classList":
                case "className":
                case 'attributes':
                    break;
                default:
                    if (!this.hasOwnProperty(i_21)) {
                        continue;
                    }
                    var desc = Object.getOwnPropertyDescriptor(this, i_21);
                    if (desc) {
                        if (!(i_21 in elem)) {
                            Object.defineProperty(elem, i_21, desc);
                        }
                        else {
                            elem[i_21] = this[i_21];
                        }
                    }
                    else {
                        elem[i_21] = this[i_21];
                    }
            }
        }
    };
    /**与真实DOM交互 */
    VNode.prototype.connectParent = function (elem) {
        var p = this.parentNode;
        if (p && p.vmData.domNode) {
            var pE = p.vmData.domNode;
            if (pE.childNodes.length === 0) {
                pE.appendChild(elem);
            }
            else {
                var node = this;
                while (true) {
                    /*
                        * 向前找
                        */
                    node = node.previousSibling;
                    if (node) {
                        var elem2 = node.vmData.domNode;
                        if (elem2) {
                            if (elem2.parentNode) {
                                pE.insertBefore2(elem, elem2);
                                pE.insertBefore2(elem2, elem);
                                break;
                            }
                        }
                    }
                    else {
                        node = this;
                        while (true) {
                            /*
                                * 向后找
                                */
                            node = node.nextSibling;
                            if (node) {
                                var elem2 = node.vmData.domNode;
                                if (elem2) {
                                    if (elem2.parentNode) {
                                        pE.insertBefore2(elem, elem2);
                                        break;
                                    }
                                }
                            }
                            else {
                                pE.appendChild(elem);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
    };
    VNode.prototype.createHomologyFunction = function (name) {
        return function () {
            var objects = [], toDOMs = [];
            for (var i_22 = 0; i_22 < arguments.length; i_22++) {
                //获取对象
                var o = arguments[i_22].valueOf();
                //如果valueOf的值不是自己
                if (o === arguments[i_22] && o instanceof VNode) {
                    toDOMs.push(o);
                    //转换为真实Node
                    objects.push(o.beDOM());
                }
                else {
                    objects.push(o);
                }
            }
            //仍然调用虚拟dom的函数
            this.__proto__[name].apply(this, arguments);
            //调用真实dom的函数
            var ret = this.vmData.domNode[name].apply(this.vmData.domNode, objects);
            //返回值父子关系修正
            for (var i_23 = 0; i_23 < toDOMs.length; i_23++) {
                var chds = toDOMs[i_23].childNodes;
                for (var j = 0; j < chds.length; j++) {
                    var node = chds[j];
                    var chds2 = node.childNodes;
                    if (chds2.length !== this.vmData.domNode.childNodes.length) {
                        for (var k = 0; k < chds2.length; k++) {
                            if (chds2[k].vmData.domNode.parentNode === null) {
                                this.connectParent(chds2[k], chds2[k].vmData.domNode);
                            }
                        }
                    }
                }
            }
            return ret;
        };
    };
    VNode.prototype.createBridgeFunction = function (name) {
        return function () {
            return this.vmData.domNode[name].apply(this.vmData.domNode, arguments);
        };
    };
    VNode.prototype.setBridgeGet = function (name) {
        Object.defineProperty(this, name, {
            get: function () {
                return this.vmData.domNode[name];
            }
        });
    };
    VNode.prototype.setBridgeGetSet = function (name) {
        Object.defineProperty(this, name, {
            get: function () {
                return this.vmData.domNode[name];
            },
            set: function (v) {
                this.vmData.domNode[name] = v;
            }
        });
    };
    Object.defineProperty(VNode.prototype, "previousSibling", {
        get: function () {
            var p = this.parentNode;
            if (!p) {
                return null;
            }
            var chds = p.childNodes;
            var idx = Array.prototype.indexOf.call(chds, this);
            var node = chds[idx - 1];
            return node ? node : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VNode.prototype, "nextSibling", {
        get: function () {
            var p = this.parentNode;
            if (!p) {
                return null;
            }
            var chds = p.childNodes;
            var idx = Array.prototype.indexOf.call(chds, this);
            var node = chds[idx + 1];
            return node ? node : null;
        },
        enumerable: true,
        configurable: true
    });
    return VNode;
}());
function bindClassToFunction(node, nodeName, nodeType) {
    if (nodeType === 21 /* Member */) {
        node.__proto__ = VMember.prototype;
        VMember.call(node, nodeName);
    }
    else if (nodeType === 22 /* Script */) {
        node.__proto__ = VScript.prototype;
        VScript.call(node, nodeName);
    }
    else if (nodeType === 20 /* PlaceHolder */) {
        node.__proto__ = VPlaceHolder.prototype;
        VPlaceHolder.call(node, nodeName);
    }
    else if (nodeType === 10 /* DocumentType */) {
        node.__proto__ = VDocumentType.prototype;
        VDocumentType.call(node);
    }
    else if (nodeType === 8 /* Comment */) {
        node.__proto__ = VComment.prototype;
        VComment.call(node, nodeName);
    }
    else if (nodeType === 3 /* Text */) {
        node.__proto__ = VText.prototype;
        VText.call(node, nodeName);
    }
    else if (nodeType === 9 /* Document */) {
        node.__proto__ = VDocument.prototype;
        VDocument.call(node);
    }
    else if (nodeType === 11 /* DocumentFragment */) {
    }
    else if (nodeType === undefined || nodeType === 1 /* Element */) {
        if (nodeName[0] === '#') {
            nodeName = nodeName.substr(1).toLowerCase();
            switch (nodeName) {
                case "text":
                    node.__proto__ = VText.prototype;
                    VText.call(node, nodeName);
                    break;
                case "comment":
                    node.__proto__ = VComment.prototype;
                    VComment.call(node, nodeName);
                    break;
                case "document":
                    node.__proto__ = VDocument.prototype;
                    VDocument.call(node);
                    break;
                case "document-fragment":
                    //未实现
                    break;
            }
        }
        else {
            nodeName = nodeName.toLowerCase();
            var name_1 = "V" + nodeName[0].toUpperCase() + nodeName.substr(1).toLowerCase() + "Element";
            if (VMElement.hasOwnProperty(name_1)) {
                node.__proto__ = VMElement[name_1].prototype;
                VMElement[name_1].call(node);
            }
            else {
                throw new Error("unknown nodeName:" + nodeName);
            }
        }
    }
    else {
        throw new Error("unknown nodeType:" + nodeType);
    }
}
function getVNodeMethod() {
    var VNode = function (nodeName, nodeType) {
        var fn = getVNodeMethod();
        bindClassToFunction(fn, nodeName, nodeType);
        VNode.appendChild(fn);
        return fn;
    };
    delete VNode.name;
    delete VNode.arguments;
    return VNode;
}
var VNodeHelp = function (nodeName, nodeType) {
    var that = getVNodeMethod();
    bindClassToFunction(that, nodeName, nodeType);
    return that;
};
/// <reference path='VNode.ts'/>
var VElement = (function (_super) {
    __extends(VElement, _super);
    function VElement() {
        var _this = _super.call(this) || this;
        _this.attributes = new VNamedNodeMap;
        _this.style = new VStyle(_this);
        _this.children = new VHTMLCollection();
        _this.vmData.events = [];
        return _this;
    }
    VElement.prototype.removeAttribute = function (name) {
        this.attributes.removeNamedItem(name);
    };
    VElement.prototype.removeAttributeNode = function (item) {
        this.attributes.removeNamedItem(item);
    };
    VElement.prototype.hasAttribute = function (name) {
        return this.attributes.indexOfName(name) !== -1;
    };
    VElement.prototype.setAttribute = function (name, value) {
        if (name && !emptyTextNodeRE.test(name)) {
            this.attributes.setNamedItem(new IAttr(name, value));
            return getBind(this, this.setAttribute);
        }
        else {
            return this;
        }
    };
    VElement.prototype._ = function (name, value) {
        this.setAttribute(name, value ? value : "");
        return this;
    };
    VElement.prototype.getAttribute = function (name) {
        var item = this.attributes.getNamedItem(name);
        if (item) {
            return item.value;
        }
        else {
            return null;
        }
    };
    Object.defineProperty(VElement.prototype, "innerHTML", {
        get: function () {
            var cs = this.childNodes;
            if (cs.length > 0) {
                var data = [];
                for (var i_24 = 0; i_24 < cs.length; i_24++) {
                    push.apply(data, cs[i_24].toHTMLString());
                }
                return data.join('');
            }
            return "";
        },
        set: function (s) {
            this.children.length = 0;
            this.childNodes.length = 0;
            if (this.nodeName in stringNode) {
                this.appendChild($$$(s, 3));
            }
            else {
                VDOM(s, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    VElement.prototype.removeChild = function (vNode) {
        if (!vNode || this.childNodes.length === 0) {
            return vNode;
        }
        removeItem(this.childNodes, vNode);
        if (vNode instanceof VElement) {
            removeItem(this.children, vNode);
        }
        vNode.parentNode = null;
        return vNode;
    };
    VElement.prototype.toHTMLString = function () {
        var ret = [], sAttr = '', arrAttr = [], attr = this.attributes;
        for (var i_25 = 0; i_25 < attr.length; i_25++) {
            if (attr[i_25].value) {
                arrAttr.push(attr[i_25].name + '="' + attr[i_25].value + '"');
            }
            else {
                arrAttr.push(attr[i_25].name);
            }
        }
        if (arrAttr.length > 0) {
            sAttr = ' ' + arrAttr.join(' ');
        }
        var lowCaseName = this.nodeName.toLowerCase();
        ret.push("<" + lowCaseName + sAttr + ">");
        var cs = this.childNodes;
        if (cs.length > 0) {
            var data = [];
            for (var i_26 = 0; i_26 < cs.length; i_26++) {
                push.apply(ret, cs[i_26].toHTMLString());
            }
        }
        if (!this.vmData.closeSelf && (this.vmData.isClose || !this.parentNode)) {
            ret.push("</" + lowCaseName + ">");
        }
        return ret;
    };
    return VElement;
}(VNode));
var encodeHTML = (function () {
    var re = /&lt;|&gt;/g, fn = function (s) {
        switch (s) {
            case "&lt;":
                return '<';
            case "&gt;":
                return '>';
        }
        return s;
    };
    return function (value) {
        return value.replace(re, fn);
    };
}());
var decodeHTML = (function () {
    var re = /<|>/g, fn = function (s) {
        switch (s) {
            case "<":
                return '&lt;';
            case ">":
                return '&gt;';
        }
        return s;
    };
    return function (value) {
        return value.replace(re, fn);
    };
}());
var VMElement;
(function (VMElement) {
    function getAttr(node, name) {
        var ret = node.getAttribute(name);
        if (ret) {
            return ret;
        }
        else {
            return "";
        }
    }
    function setAttr(node, name, value) {
        node.setAttribute(name, value);
    }
    var apNames;
    function mergeClass(v) {
        //不重复创建类装饰器，而是使用外部变量转存参数，因此不支持异步
        apNames = Object.keys(v);
        ;
        return setA_PToClassPrototype;
    }
    VMElement.mergeClass = mergeClass;
    function setA_PToClassPrototype(constructor) {
        var prototype = constructor.prototype;
        var clazzSuperPrototype = prototype.prototype; //这里只是让后面的比较正常,类型并不准
        var _loop_1 = function (name_2) {
            Object.defineProperty(prototype, name_2, {
                get: function () {
                    return getAttr(this, name_2);
                },
                set: function (v) {
                    setAttr(this, name_2, v);
                }
            });
        };
        for (var _i = 0, apNames_1 = apNames; _i < apNames_1.length; _i++) {
            var name_2 = apNames_1[_i];
            _loop_1(name_2);
        }
        prototype.cloneNode = function (deep) {
            var newNode = clazzSuperPrototype.cloneNode(deep);
            for (var _i = 0, apNames_2 = apNames; _i < apNames_2.length; _i++) {
                var name_3 = apNames_2[_i];
                if (this[name_3] !== "") {
                    newNode[name_3] = this[name_3];
                }
            }
            return newNode;
        };
    }
})(VMElement || (VMElement = {}));
// function setGetSetPropertyWithAttribute(o, attributes, name) {
//         let hideValueName = '__' + name + '__';
//         Object.defineProperty(attributes, hideValueName, {
//             value: "",
//             writable: true,
//             enumerable: false,
//             configurable: false
//         }
//         )
//         Object.defineProperty(o, name, {
//             get: function () {
//                 return attributes[hideValueName];
//             },
//             set: function (s) {
//                 this.setAttribute(name, s);
//             }
//         });
//     }
// function setProto(t) {
//     let proto = htmlNodeInfo[t.nodeName];
//     if (isArray(proto)) {
//         // (htmlNodeInfo[t.nodeName] = t.__proto__ = newObject(t.nodeName[0] + t.nodeName.substring(1))).__proto__ = prototype;
//         (htmlNodeInfo[t.nodeName] = t.__proto__ = {}).__proto__ = prototype;
//         for (let i in proto) {
//             setGetSetPropertyWithAttribute(t.__proto__, t.attributes, proto[i]);
//         }
//     } else {
//         t.__proto__ = htmlNodeInfo[t.nodeName];
//     }
// } 
/// <reference path='VNode.ts'/>
/// <reference path='VElement.ts'/>
/// <reference path='../../lib/Encode.ts'/>
/// <reference path='../../core/Node.ts'/>
/// <reference path='Attribute_Property.ts'/>
function isVHTMLElement(node) {
    return node.nodeType === 1 /* Element */;
}
var VMElement;
(function (VMElement) {
    var VHtmlElement = VHtmlElement_1 = (function (_super) {
        __extends(VHtmlElement, _super);
        function VHtmlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeType = 1 /* Element */;
            _this.nodeName = "HTML";
            return _this;
        }
        VHtmlElement.prototype.cloneNode = function (deep) {
            if (deep === void 0) { deep = false; }
            var newNode = $$$('html');
            // newNode.version=this.version;
            for (var _i = 0, _a = ["title", "lang", "accessKey", "webkitdropzone", "id"]; _i < _a.length; _i++) {
                var name_4 = _a[_i];
                if (this[name_4] !== "") {
                    newNode[name_4] = this[name_4];
                }
            }
            var attributes = this.attributes;
            for (var i_27 = 0; i_27 < attributes.length; i_27++) {
                newNode.setAttribute(attributes[i_27].name, attributes[i_27].value);
            }
            if (deep) {
                var childNodes = this.childNodes;
                for (var i_28 = 0; i_28 < childNodes.length; i_28++) {
                    newNode.appendChild(childNodes[i_28].cloneNode(deep));
                }
            }
            return newNode;
        };
        VHtmlElement.prototype.getData = function () {
            return this.outerHTML;
        };
        Object.defineProperty(VHtmlElement.prototype, "innerText", {
            get: function () {
                var s = "";
                var chdns = this.childNodes;
                for (var i_29 = 0; i_29 < chdns.length; i_29++) {
                    var cd = chdns[i_29];
                    if (cd instanceof VHtmlElement_1) {
                        s += encodeHTML(cd.innerText);
                    }
                    else {
                        s += cd.getData();
                    }
                }
                return s;
            },
            set: function (s) {
                var chds = this.children;
                for (var i_30 = chds.length - 1; i_30 >= 0; i_30--) {
                    delete chds[i_30];
                }
                var chdns = this.childNodes;
                for (var i_31 = chdns.length - 1; i_31 >= 0; i_31--) {
                    delete chdns[i_31];
                }
                this.appendChild($$$(decodeHTML(s), 3));
            },
            enumerable: true,
            configurable: true
        });
        VHtmlElement.prototype.insertBefore = function (newNode, refChild) {
            //添加到childNodes里
            var chds = this.childNodes;
            var idx = indexOf.call(chds, refChild);
            if (idx === -1) {
                return newNode;
            }
            var p2 = newNode.parentNode;
            if (p2) {
                p2.removeChild(newNode);
            }
            splice.call(chds, idx, 0, newNode);
            newNode.parentNode = this;
            //添加到children里
            if (idx >= chds.length) {
                push.call(chds, newNode);
            }
            else {
                var chds_1 = this.children;
                // for (let i = idx; i < chds.length; i++) {
                // if ((<VElem<IVNodeMethod>>chds[i]).nodeType === 1) {
                splice.call(chds_1, idx, 0, newNode);
                return newNode;
            }
            return newNode;
        };
        VHtmlElement.prototype.doAppendChild = function (vNode) {
            Array.prototype.push.call(this.childNodes, vNode);
            var p = vNode.parentNode;
            if (p) {
                p.removeChild(vNode);
            }
            vNode.parentNode = this;
            if (isVHTMLElement(vNode)) {
                push.call(this.children, vNode);
            }
            return vNode;
        };
        VHtmlElement.prototype.doBaseToDOM = function () {
            var elem = document.createElement(this.nodeName);
            var attrs = this.attributes;
            for (var j = 0; j < attrs.length; j++) {
                elem.setAttribute(attrs[j].name, attrs[j].value);
            }
            var arr = this.vmData.events;
            for (var j in arr) {
                var e = arr[j];
                elem.addEventListener(e[0], e[1], e[2]);
            }
            var obj = this.vmData.__;
            if (obj) {
                for (var j in obj) {
                    elem[j] = obj[j];
                }
            }
            return elem;
        };
        VHtmlElement.prototype.doToDOM = function () {
            var elem = this.doBaseToDOM();
            var chds = this.childNodes;
            for (var j = 0; j < chds.length; j++) {
                chds[j].beDOM();
            }
            return elem;
        };
        VHtmlElement.prototype.toCreateJS = function (space) {
            if (space === void 0) { space = 0; }
            return (new Array(space + 1)).join(" ") + ("(\"" + this.nodeName.toLowerCase() + "\")");
        };
        VHtmlElement.prototype.childNodesToJS = function (space) {
            if (space === void 0) { space = 0; }
            var sInner = "";
            if (this.vmData.closeSelf) {
                sInner = '.$';
            }
            else {
                //遍历子节点
                var chds = this.childNodes;
                if (chds.length > 0) {
                    for (var i_32 = 0; i_32 < chds.length; i_32++) {
                        sInner += '\n' + chds[i_32].toJS(space + 4);
                    }
                }
                if (this.parentNode) {
                    sInner += '.$';
                }
            }
            return sInner;
        };
        VHtmlElement.prototype.toJS = function (space) {
            if (space === void 0) { space = 0; }
            return this.toCreateJS(space) + this.attributes.toJS() + this.childNodesToJS(space);
        };
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        VHtmlElement.prototype.emulation = function () {
            this.createBridgeFunction("setAttribute");
            this.createBridgeFunction("hasAttribute");
            this.createBridgeFunction("removeAttribute");
            this.createBridgeFunction("removeAttributeNode");
            this.createBridgeFunction("toString");
            this.createBridgeFunction("addEventListener");
            this.createBridgeFunction("removeEventListener");
            this.createHomologyFunction("insertBefore");
            this.createHomologyFunction("insertBefore2");
            this.createHomologyFunction("appendChild");
            this.createHomologyFunction("removeChild");
            debugger;
            this.createHomologyFunction("appendChild");
            this.createHomologyFunction("removeChild");
            this.setBridgeGet("style");
            this.setBridgeGet("classList");
            this.setBridgeGet("attributes");
            this.setBridgeGet("offsetTop");
            this.setBridgeGet("offsetLeft");
            this.setBridgeGet("offsetWidth");
            this.setBridgeGet("offsetHeight");
            this.setBridgeGetSet("onwebkitfullscreenerror");
            this.setBridgeGetSet("onwebkitfullscreenchange");
            this.setBridgeGetSet("ontouchstart");
            this.setBridgeGetSet("ontouchmove");
            this.setBridgeGetSet("ontouchend");
            this.setBridgeGetSet("ontouchcancel");
            this.setBridgeGetSet("onmspointerup");
            this.setBridgeGetSet("onmspointerover");
            this.setBridgeGetSet("onmspointerout");
            this.setBridgeGetSet("onmspointermove");
            this.setBridgeGetSet("onmspointerleave");
            this.setBridgeGetSet("onmspointerenter");
            this.setBridgeGetSet("onmspointerdown");
            this.setBridgeGetSet("onmspointercancel");
            this.setBridgeGetSet("onmslostpointercapture");
            this.setBridgeGetSet("onmsinertiastart");
            this.setBridgeGetSet("onmsgotpointercapture");
            this.setBridgeGetSet("onmsgesturetap");
            this.setBridgeGetSet("onmsgesturestart");
            this.setBridgeGetSet("onmsgesturehold");
            this.setBridgeGetSet("onmsgestureend");
            this.setBridgeGetSet("onmsgesturedoubletap");
            this.setBridgeGetSet("onmsgesturechange");
            this.setBridgeGetSet("onlostpointercapture");
            this.setBridgeGetSet("ongotpointercapture");
            this.setBridgeGetSet("oncommand");
            this.setBridgeGetSet("onariarequest");
            this.setBridgeGetSet("onwheel");
            this.setBridgeGetSet("onpointerup");
            this.setBridgeGetSet("onpointerover");
            this.setBridgeGetSet("onpointerout");
            this.setBridgeGetSet("onpointermove");
            this.setBridgeGetSet("onpointerleave");
            this.setBridgeGetSet("onpointerenter");
            this.setBridgeGetSet("onpointerdown");
            this.setBridgeGetSet("onpointercancel");
        };
        Object.defineProperty(VHtmlElement.prototype, "outerHTML", {
            get: function () {
                var xmlNode = this.toHTMLString(), chds = this.childNodes, data = [xmlNode[0]];
                for (var i_33 = 0; i_33 < chds.length; i_33++) {
                    var chn = chds[i_33];
                    if (isVHTMLElement(chn)) {
                        data.push(chn.outerHTML);
                    }
                    else {
                        data.push(chn.toHTMLString().join(''));
                    }
                }
                if (xmlNode.length === 2) {
                    data.push(xmlNode[1]);
                }
                return data.join('');
            },
            set: function (v) {
                var p = this.parentNode;
                if (!p) {
                    throw new Error("This element has no parent node.");
                }
                var vNodes = VDOM(v);
                if (!isArray(vNodes)) {
                    p.insertBefore(vNodes, this);
                }
                else {
                    insertNodesBefore(this, vNodes);
                }
                p.removeChild(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VHtmlElement.prototype, "outerText", {
            get: function () {
                return this.innerText;
            },
            set: function (v) {
                var p = this.parentNode;
                if (!p) {
                    throw new Error("This element has no parent node.");
                }
                var vText = $$$(v, 3 /* Text */);
                p.insertBefore(vText, this);
                p.removeChild(this);
            },
            enumerable: true,
            configurable: true
        });
        return VHtmlElement;
    }(VElement));
    VHtmlElement = VHtmlElement_1 = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHtmlElement);
    VMElement.VHtmlElement = VHtmlElement;
    var VHtmlElement_1;
})(VMElement || (VMElement = {}));
/// <reference path='VNode.ts'/>
var VCharacterData = (function (_super) {
    __extends(VCharacterData, _super);
    function VCharacterData() {
        return _super.apply(this, arguments) || this;
    }
    VCharacterData.prototype.getData = function () {
        return this.data;
    };
    Object.defineProperty(VCharacterData.prototype, "length", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    VCharacterData.prototype.appendData = function (arg) {
        this.data += arg;
    };
    VCharacterData.prototype.deleteData = function (offset, count) {
        this.data = this.data.substring(0, offset) + this.data.substr(offset);
    };
    VCharacterData.prototype.insertData = function (offset, arg) {
        this.data = this.data.substring(0, offset) + arg + this.data.substr(offset);
    };
    VCharacterData.prototype.replaceData = function (offset, count, arg) {
        this.data = this.data.substring(0, offset) + arg + this.data.substr(offset + count);
    };
    VCharacterData.prototype.substringData = function (offset, count) {
        return this.data.substr(offset, count);
    };
    return VCharacterData;
}(VNode));
/// <reference path='VCharacterData.ts'/>
function isVText(node) {
    return node.nodeType === 3 /* Text */;
}
var getFunctionBlock = (function () {
    var re = /(^.*?(function.*?\(.*?\).*?\{)|(\(.*?\)\=>\{))([\s\S\w\W]*)\}$/;
    return function getFunctionBlock(fn) {
        var ret = fn.toString();
        var match = ret.match(re);
        if (match) {
            return match[4];
        }
        return "";
    };
}());
var VText = (function (_super) {
    __extends(VText, _super);
    function VText(data) {
        var _this = _super.call(this) || this;
        _this.nodeName = "#text";
        _this.nodeType = 3 /* Text */;
        _this.__value__ = "";
        if (isString(data)) {
            _this.__value__ = data;
        }
        else if (isFunction(data)) {
            _this.__value__ = getFunctionBlock(data);
        }
        else {
            _this.__value__ = data.toString();
        }
        return _this;
    }
    VText.prototype.cloneNode = function (deep) {
        return $$$(this.__value__, 3 /* Text */);
    };
    Object.defineProperty(VText.prototype, "data", {
        // wholeText: string;
        // replaceWholeText(content: string): Text;
        // splitText(offset: number): Text;
        get: function () {
            return this.__value__;
        },
        set: function (s) {
            this.__value__ = s;
            if (this.vmData.domNode) {
                this.vmData.domNode.data = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VText.prototype, "value", {
        get: function () {
            return this.__value__;
        },
        set: function (s) {
            this.data = s;
        },
        enumerable: true,
        configurable: true
    });
    VText.prototype.toCreateJS = function (space) {
        if (space === void 0) { space = 0; }
        return (new Array(space + 1)).join(" ") + '(`' + this.__value__ + '`,ENodeType.Text)';
    };
    VText.prototype.toJS = function (space) {
        if (space === void 0) { space = 0; }
        return this.toCreateJS(space) + '.$';
    };
    VText.prototype.toHTMLString = function () {
        return [this.__value__];
    };
    VText.prototype.doToDOM = function () {
        var elem;
        if (this.data !== "") {
            var toHelp = document.createElement('__Turtle__'); //用于创建
            toHelp.innerHTML = this.data;
            elem = toHelp.removeChild(toHelp.childNodes[0]);
        }
        else {
            elem = document.createTextNode('');
        }
        return elem;
    };
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    VText.prototype.emulation = function () { };
    return VText;
}(VCharacterData));
/// <reference path='VCharacterData.ts'/>
function isVComment(node) {
    return node.nodeType === 8 /* Comment */;
}
var VComment = (function (_super) {
    __extends(VComment, _super);
    function VComment(data) {
        var _this = _super.call(this) || this;
        _this.nodeName = "#Comment";
        _this.nodeType = 8 /* Comment */;
        _this.__value__ = "";
        _this.__value__ = data;
        return _this;
    }
    VComment.prototype.cloneNode = function (deep) {
        return $$$(this.__value__, 8 /* Comment */);
    };
    Object.defineProperty(VComment.prototype, "data", {
        get: function () {
            return this.__value__;
        },
        set: function (s) {
            this.__value__ = s;
            if (this.vmData.domNode) {
                this.vmData.domNode.data = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VComment.prototype, "textContent", {
        get: function () {
            return this.__value__;
        },
        set: function (s) {
            this.data = s;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 用自身做环境调用函数,并返回父
     */
    VComment.prototype.__ = function (fn) {
        fn.call(this);
        return this.parentNode;
    };
    VComment.prototype.toCreateJS = function (space) {
        if (space === void 0) { space = 0; }
        return (new Array(space + 1)).join(" ") + '(`' + this.__value__ + '`,ENodeType.Comment)';
    };
    VComment.prototype.toJS = function (space) {
        if (space === void 0) { space = 0; }
        return this.toCreateJS(space) + '.$';
    };
    VComment.prototype.toHTMLString = function () {
        var ret = [];
        if (this.vmData.doubleMinus) {
            ret.push('<!--' + this.data + '-->');
        }
        else {
            ret.push('<!' + this.data + '>');
        }
        return ret;
    };
    VComment.prototype.doToDOM = function () {
        var elem = document.createComment(this.data);
        return elem;
    };
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    VComment.prototype.emulation = function () { };
    return VComment;
}(VCharacterData));
/// <reference path='VNode.ts'/>
function isVDocType(node) {
    return node.nodeType === 10 /* DocumentType */;
}
var VDocumentType = (function (_super) {
    __extends(VDocumentType, _super);
    function VDocumentType() {
        var _this = _super.apply(this, arguments) || this;
        _this.nodeType = 10 /* DocumentType */;
        _this.nodeName = "html";
        return _this;
    }
    VDocumentType.prototype.cloneNode = function (deep) {
        return $$$("", 10 /* DocumentType */);
    };
    VDocumentType.prototype.toCreateJS = function (space) {
        if (space === void 0) { space = 0; }
        return "(\"\"," + 10 /* DocumentType */ + ")";
    };
    VDocumentType.prototype.toJS = function () {
        return this.toCreateJS() + '.$';
    };
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    VDocumentType.prototype.emulation = function () { };
    VDocumentType.prototype.toHTMLString = function () {
        return ['<!DOCTYPE html>'];
    };
    return VDocumentType;
}(VNode));
/// <reference path='VNode.ts'/>
var VDocument = (function (_super) {
    __extends(VDocument, _super);
    function VDocument() {
        var _this = _super.apply(this, arguments) || this;
        _this.nodeType = 1 /* Element */;
        _this.nodeName = "#document";
        return _this;
    }
    VDocument.prototype.cloneNode = function (deep) {
        throw new Error("本标签不支持cloneNode");
    };
    VDocument.prototype.toCreateJS = function (space) {
        if (space === void 0) { space = 0; }
        throw new Error("本标签不支持输出JS");
    };
    VDocument.prototype.toJS = function () {
        throw new Error("本标签不支持输出JS");
    };
    VDocument.prototype.emulation = function () { };
    VDocument.prototype.toHTMLString = function () {
        throw new Error("本标签不支持输出HTML");
    };
    return VDocument;
}(VNode));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VAElement = (function (_super) {
        __extends(VAElement, _super);
        function VAElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "A";
            return _this;
        }
        return VAElement;
    }(VMElement.VHtmlElement));
    VAElement = __decorate([
        VMElement.mergeClass({ target: '', download: '', ping: '', rel: '', hreflang: '', type: '', coords: '', charset: '', name: '', rev: '', shape: '', href: '' })
    ], VAElement);
    VMElement.VAElement = VAElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VAreaElement = (function (_super) {
        __extends(VAreaElement, _super);
        function VAreaElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "AREA";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VAreaElement;
    }(VMElement.VHtmlElement));
    VAreaElement = __decorate([
        VMElement.mergeClass({ alt: '', coords: '', shape: '', target: '', ping: '', noHref: '', href: '' })
    ], VAreaElement);
    VMElement.VAreaElement = VAreaElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBaseElement = (function (_super) {
        __extends(VBaseElement, _super);
        function VBaseElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BASE";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBaseElement;
    }(VMElement.VHtmlElement));
    VBaseElement = __decorate([
        VMElement.mergeClass({ href: '', target: '' })
    ], VBaseElement);
    VMElement.VBaseElement = VBaseElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBasefontElement = (function (_super) {
        __extends(VBasefontElement, _super);
        function VBasefontElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BASEFONT";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBasefontElement;
    }(VMElement.VHtmlElement));
    VBasefontElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VBasefontElement);
    VMElement.VBasefontElement = VBasefontElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBlockquoteElement = (function (_super) {
        __extends(VBlockquoteElement, _super);
        function VBlockquoteElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BLOCKQUOTE";
            return _this;
        }
        return VBlockquoteElement;
    }(VMElement.VHtmlElement));
    VBlockquoteElement = __decorate([
        VMElement.mergeClass({ cite: '' })
    ], VBlockquoteElement);
    VMElement.VBlockquoteElement = VBlockquoteElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBodyElement = (function (_super) {
        __extends(VBodyElement, _super);
        function VBodyElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BODY";
            return _this;
        }
        return VBodyElement;
    }(VMElement.VHtmlElement));
    VBodyElement = __decorate([
        VMElement.mergeClass({ text: '', link: '', vLink: '', aLink: '', bgColor: '', background: '' })
    ], VBodyElement);
    VMElement.VBodyElement = VBodyElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBrElement = (function (_super) {
        __extends(VBrElement, _super);
        function VBrElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BR";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBrElement;
    }(VMElement.VHtmlElement));
    VBrElement = __decorate([
        VMElement.mergeClass({ clear: '' })
    ], VBrElement);
    VMElement.VBrElement = VBrElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VCanvasElement = (function (_super) {
        __extends(VCanvasElement, _super);
        function VCanvasElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CANVAS";
            return _this;
        }
        return VCanvasElement;
    }(VMElement.VHtmlElement));
    VCanvasElement = __decorate([
        VMElement.mergeClass({ width: '', height: '' })
    ], VCanvasElement);
    VMElement.VCanvasElement = VCanvasElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VCaptionElement = (function (_super) {
        __extends(VCaptionElement, _super);
        function VCaptionElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CAPTION";
            return _this;
        }
        return VCaptionElement;
    }(VMElement.VHtmlElement));
    VCaptionElement = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VCaptionElement);
    VMElement.VCaptionElement = VCaptionElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VColElement = (function (_super) {
        __extends(VColElement, _super);
        function VColElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "COL";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VColElement;
    }(VMElement.VHtmlElement));
    VColElement = __decorate([
        VMElement.mergeClass({ span: '', align: '', vAlign: '', width: '' })
    ], VColElement);
    VMElement.VColElement = VColElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VColgroupElement = (function (_super) {
        __extends(VColgroupElement, _super);
        function VColgroupElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "COLGROUP";
            return _this;
        }
        return VColgroupElement;
    }(VMElement.VHtmlElement));
    VColgroupElement = __decorate([
        VMElement.mergeClass({ span: '', align: '', vAlign: '', width: '' })
    ], VColgroupElement);
    VMElement.VColgroupElement = VColgroupElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDialogElement = (function (_super) {
        __extends(VDialogElement, _super);
        function VDialogElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIALOG";
            return _this;
        }
        return VDialogElement;
    }(VMElement.VHtmlElement));
    VDialogElement = __decorate([
        VMElement.mergeClass({ open: '' })
    ], VDialogElement);
    VMElement.VDialogElement = VDialogElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDirElement = (function (_super) {
        __extends(VDirElement, _super);
        function VDirElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIR";
            return _this;
        }
        return VDirElement;
    }(VMElement.VHtmlElement));
    VDirElement = __decorate([
        VMElement.mergeClass({ compact: '' })
    ], VDirElement);
    VMElement.VDirElement = VDirElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDivElement = (function (_super) {
        __extends(VDivElement, _super);
        function VDivElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIV";
            return _this;
        }
        return VDivElement;
    }(VMElement.VHtmlElement));
    VDivElement = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VDivElement);
    VMElement.VDivElement = VDivElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDlElement = (function (_super) {
        __extends(VDlElement, _super);
        function VDlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DL";
            return _this;
        }
        return VDlElement;
    }(VMElement.VHtmlElement));
    VDlElement = __decorate([
        VMElement.mergeClass({ compact: '' })
    ], VDlElement);
    VMElement.VDlElement = VDlElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VFieldsetElement = (function (_super) {
        __extends(VFieldsetElement, _super);
        function VFieldsetElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FIELDSET";
            return _this;
        }
        return VFieldsetElement;
    }(VMElement.VHtmlElement));
    VFieldsetElement = __decorate([
        VMElement.mergeClass({ disabled: '', name: '' })
    ], VFieldsetElement);
    VMElement.VFieldsetElement = VFieldsetElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VFrameElement = (function (_super) {
        __extends(VFrameElement, _super);
        function VFrameElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "FRAME";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VFrameElement;
    }(VMElement.VHtmlElement));
    VFrameElement = __decorate([
        VMElement.mergeClass({ name: '', scrolling: '', frameBorder: '', marginHeight: '', marginWidth: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFrameElement);
    VMElement.VFrameElement = VFrameElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH1Element = (function (_super) {
        __extends(VH1Element, _super);
        function VH1Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H1";
            return _this;
        }
        return VH1Element;
    }(VMElement.VHtmlElement));
    VH1Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH1Element);
    VMElement.VH1Element = VH1Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH2Element = (function (_super) {
        __extends(VH2Element, _super);
        function VH2Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H2";
            return _this;
        }
        return VH2Element;
    }(VMElement.VHtmlElement));
    VH2Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH2Element);
    VMElement.VH2Element = VH2Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH3Element = (function (_super) {
        __extends(VH3Element, _super);
        function VH3Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H3";
            return _this;
        }
        return VH3Element;
    }(VMElement.VHtmlElement));
    VH3Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH3Element);
    VMElement.VH3Element = VH3Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH4Element = (function (_super) {
        __extends(VH4Element, _super);
        function VH4Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H4";
            return _this;
        }
        return VH4Element;
    }(VMElement.VHtmlElement));
    VH4Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH4Element);
    VMElement.VH4Element = VH4Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH5Element = (function (_super) {
        __extends(VH5Element, _super);
        function VH5Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H5";
            return _this;
        }
        return VH5Element;
    }(VMElement.VHtmlElement));
    VH5Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH5Element);
    VMElement.VH5Element = VH5Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VH6Element = (function (_super) {
        __extends(VH6Element, _super);
        function VH6Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H6";
            return _this;
        }
        return VH6Element;
    }(VMElement.VHtmlElement));
    VH6Element = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VH6Element);
    VMElement.VH6Element = VH6Element;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VHeadElement = (function (_super) {
        __extends(VHeadElement, _super);
        function VHeadElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "HEAD";
            return _this;
        }
        return VHeadElement;
    }(VMElement.VHtmlElement));
    VHeadElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHeadElement);
    VMElement.VHeadElement = VHeadElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VHrElement = (function (_super) {
        __extends(VHrElement, _super);
        function VHrElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "HR";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VHrElement;
    }(VMElement.VHtmlElement));
    VHrElement = __decorate([
        VMElement.mergeClass({ align: '', color: '', noShade: '', size: '', width: '' })
    ], VHrElement);
    VMElement.VHrElement = VHrElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VIframeElement = (function (_super) {
        __extends(VIframeElement, _super);
        function VIframeElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "IFRAME";
            return _this;
        }
        return VIframeElement;
    }(VMElement.VHtmlElement));
    VIframeElement = __decorate([
        VMElement.mergeClass({ src: '', srcdoc: '', name: '', sandbox: '', allowFullscreen: '', width: '', height: '', align: '', scrolling: '', frameBorder: '', longDesc: '', marginHeight: '', marginWidth: '' })
    ], VIframeElement);
    VMElement.VIframeElement = VIframeElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VImgElement = (function (_super) {
        __extends(VImgElement, _super);
        function VImgElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "IMG";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VImgElement;
    }(VMElement.VHtmlElement));
    VImgElement = __decorate([
        VMElement.mergeClass({ alt: '', src: '', srcset: '', sizes: '', crossOrigin: '', useMap: '', isMap: '', width: '', height: '', name: '', lowsrc: '', align: '', hspace: '', vspace: '', longDesc: '', border: '' })
    ], VImgElement);
    VMElement.VImgElement = VImgElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VInputElement = (function (_super) {
        __extends(VInputElement, _super);
        function VInputElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "INPUT";
            _this.vmData.closeSelf = true;
            return _this;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        VInputElement.prototype.emulation = function () {
            this.setBridgeGetSet("value");
            this.setBridgeGetSet("checked");
        };
        return VInputElement;
    }(VMElement.VHtmlElement));
    VInputElement = __decorate([
        VMElement.mergeClass({ accept: '', alt: '', autocomplete: '', autofocus: '', checked: '', dirName: '', disabled: '', formAction: '', formEnctype: '', formMethod: '', formNoValidate: '', formTarget: '', height: '', max: '', maxLength: '', min: '', minLength: '', multiple: '', name: '', pattern: '', placeholder: '', readOnly: '', required: '', size: '', src: '', step: '', type: '', value: '', width: '', align: '', useMap: '', autocapitalize: '', webkitdirectory: '', incremental: '' })
    ], VInputElement);
    VMElement.VInputElement = VInputElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VInsElement = (function (_super) {
        __extends(VInsElement, _super);
        function VInsElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "INS";
            return _this;
        }
        return VInsElement;
    }(VMElement.VHtmlElement));
    VInsElement = __decorate([
        VMElement.mergeClass({ cite: '', dateTime: '' })
    ], VInsElement);
    VMElement.VInsElement = VInsElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VKeygenElement = (function (_super) {
        __extends(VKeygenElement, _super);
        function VKeygenElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "KEYGEN";
            return _this;
        }
        return VKeygenElement;
    }(VMElement.VHtmlElement));
    VKeygenElement = __decorate([
        VMElement.mergeClass({ autofocus: '', challenge: '', disabled: '', keytype: '', name: '' })
    ], VKeygenElement);
    VMElement.VKeygenElement = VKeygenElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VLegendElement = (function (_super) {
        __extends(VLegendElement, _super);
        function VLegendElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LEGEND";
            return _this;
        }
        return VLegendElement;
    }(VMElement.VHtmlElement));
    VLegendElement = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VLegendElement);
    VMElement.VLegendElement = VLegendElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VLiElement = (function (_super) {
        __extends(VLiElement, _super);
        function VLiElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LI";
            return _this;
        }
        return VLiElement;
    }(VMElement.VHtmlElement));
    VLiElement = __decorate([
        VMElement.mergeClass({ value: '', type: '' })
    ], VLiElement);
    VMElement.VLiElement = VLiElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VLinkElement = (function (_super) {
        __extends(VLinkElement, _super);
        function VLinkElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "LINK";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VLinkElement;
    }(VMElement.VHtmlElement));
    VLinkElement = __decorate([
        VMElement.mergeClass({ disabled: '', href: '', crossOrigin: '', rel: '', media: '', hreflang: '', type: '', charset: '', rev: '', target: '', integrity: '' })
    ], VLinkElement);
    VMElement.VLinkElement = VLinkElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VMapElement = (function (_super) {
        __extends(VMapElement, _super);
        function VMapElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "MAP";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VMapElement;
    }(VMElement.VHtmlElement));
    VMapElement = __decorate([
        VMElement.mergeClass({ name: '' })
    ], VMapElement);
    VMElement.VMapElement = VMapElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VMenuElement = (function (_super) {
        __extends(VMenuElement, _super);
        function VMenuElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "MENU";
            return _this;
        }
        return VMenuElement;
    }(VMElement.VHtmlElement));
    VMenuElement = __decorate([
        VMElement.mergeClass({ compact: '' })
    ], VMenuElement);
    VMElement.VMenuElement = VMenuElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VMetaElement = (function (_super) {
        __extends(VMetaElement, _super);
        function VMetaElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "META";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VMetaElement;
    }(VMElement.VHtmlElement));
    VMetaElement = __decorate([
        VMElement.mergeClass({ name: '', content: '', scheme: '' })
    ], VMetaElement);
    VMElement.VMetaElement = VMetaElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VMeterElement = (function (_super) {
        __extends(VMeterElement, _super);
        function VMeterElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "METER";
            return _this;
        }
        return VMeterElement;
    }(VMElement.VHtmlElement));
    VMeterElement = __decorate([
        VMElement.mergeClass({ value: '', min: '', max: '', low: '', high: '', optimum: '' })
    ], VMeterElement);
    VMElement.VMeterElement = VMeterElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VOlElement = (function (_super) {
        __extends(VOlElement, _super);
        function VOlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OL";
            return _this;
        }
        return VOlElement;
    }(VMElement.VHtmlElement));
    VOlElement = __decorate([
        VMElement.mergeClass({ reversed: '', start: '', type: '', compact: '' })
    ], VOlElement);
    VMElement.VOlElement = VOlElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VOptgroupElement = (function (_super) {
        __extends(VOptgroupElement, _super);
        function VOptgroupElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OPTGROUP";
            return _this;
        }
        return VOptgroupElement;
    }(VMElement.VHtmlElement));
    VOptgroupElement = __decorate([
        VMElement.mergeClass({ disabled: '', label: '' })
    ], VOptgroupElement);
    VMElement.VOptgroupElement = VOptgroupElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VOptionElement = (function (_super) {
        __extends(VOptionElement, _super);
        function VOptionElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OPTION";
            return _this;
        }
        return VOptionElement;
    }(VMElement.VHtmlElement));
    VOptionElement = __decorate([
        VMElement.mergeClass({ disabled: '', label: '', selected: '', value: '' })
    ], VOptionElement);
    VMElement.VOptionElement = VOptionElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VOutputElement = (function (_super) {
        __extends(VOutputElement, _super);
        function VOutputElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OUTPUT";
            return _this;
        }
        return VOutputElement;
    }(VMElement.VHtmlElement));
    VOutputElement = __decorate([
        VMElement.mergeClass({ name: '' })
    ], VOutputElement);
    VMElement.VOutputElement = VOutputElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VParamElement = (function (_super) {
        __extends(VParamElement, _super);
        function VParamElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "PARAM";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VParamElement;
    }(VMElement.VHtmlElement));
    VParamElement = __decorate([
        VMElement.mergeClass({ name: '', value: '', type: '', valueType: '' })
    ], VParamElement);
    VMElement.VParamElement = VParamElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VPElement = (function (_super) {
        __extends(VPElement, _super);
        function VPElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "P";
            return _this;
        }
        return VPElement;
    }(VMElement.VHtmlElement));
    VPElement = __decorate([
        VMElement.mergeClass({ align: '' })
    ], VPElement);
    VMElement.VPElement = VPElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VPreElement = (function (_super) {
        __extends(VPreElement, _super);
        function VPreElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "PRE";
            return _this;
        }
        return VPreElement;
    }(VMElement.VHtmlElement));
    VPreElement = __decorate([
        VMElement.mergeClass({ width: '' })
    ], VPreElement);
    VMElement.VPreElement = VPreElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VProgressElement = (function (_super) {
        __extends(VProgressElement, _super);
        function VProgressElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "PROGRESS";
            return _this;
        }
        return VProgressElement;
    }(VMElement.VHtmlElement));
    VProgressElement = __decorate([
        VMElement.mergeClass({ value: '', max: '' })
    ], VProgressElement);
    VMElement.VProgressElement = VProgressElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VQElement = (function (_super) {
        __extends(VQElement, _super);
        function VQElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "Q";
            return _this;
        }
        return VQElement;
    }(VMElement.VHtmlElement));
    VQElement = __decorate([
        VMElement.mergeClass({ cite: '' })
    ], VQElement);
    VMElement.VQElement = VQElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
/// <reference path="../../core/node.ts"/>
var VMElement;
(function (VMElement) {
    var VScriptElement = (function (_super) {
        __extends(VScriptElement, _super);
        function VScriptElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SCRIPT";
            return _this;
        }
        VScriptElement.prototype.toJS = function (space) {
            if (space === void 0) { space = 0; }
            var sSpace = (new Array(space + 1)).join(" ");
            var sFn = '\n' + sSpace + ("(\"" + this.nodeName + "\")");
            var sAttr = "";
            var sInner = "";
            var attrs = this.attributes;
            if (attrs.length > 0) {
                sAttr = '';
                for (var i_34 = 0; i_34 < attrs.length; i_34++) {
                    sAttr += '._("' + attrs[i_34].name;
                    if (attrs[i_34].value) {
                        sAttr += '","' + attrs[i_34].value + '")';
                    }
                    else {
                        sAttr += '")';
                    }
                }
            }
            if (this.vmData.closeSelf) {
                sInner = '.$';
            }
            else {
                sInner += this.toScriptText();
                if (this.parentNode) {
                    sInner += '.$';
                }
            }
            return sFn + sAttr + sInner;
        };
        VScriptElement.prototype.toScriptText = function () {
            var s = '()=>{' + nodesToString(this.childNodes) + '}';
            return "(" + s + "," + 3 /* Text */ + ").$";
        };
        return VScriptElement;
    }(VMElement.VHtmlElement));
    VScriptElement = __decorate([
        VMElement.mergeClass({ src: '', type: '', charset: '', async: '', defer: '', crossOrigin: '', event: '', integrity: '' })
    ], VScriptElement);
    VMElement.VScriptElement = VScriptElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VSelectElement = (function (_super) {
        __extends(VSelectElement, _super);
        function VSelectElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SELECT";
            return _this;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        VSelectElement.prototype.emulation = function () {
            this.setBridgeGetSet("value");
        };
        return VSelectElement;
    }(VMElement.VHtmlElement));
    VSelectElement = __decorate([
        VMElement.mergeClass({ autofocus: '', disabled: '', multiple: '', name: '', required: '', size: '' })
    ], VSelectElement);
    VMElement.VSelectElement = VSelectElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VSourceElement = (function (_super) {
        __extends(VSourceElement, _super);
        function VSourceElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SOURCE";
            return _this;
        }
        return VSourceElement;
    }(VMElement.VHtmlElement));
    VSourceElement = __decorate([
        VMElement.mergeClass({ src: '', type: '', srcset: '', sizes: '', media: '' })
    ], VSourceElement);
    VMElement.VSourceElement = VSourceElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VStyleElement = (function (_super) {
        __extends(VStyleElement, _super);
        function VStyleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "STYLE";
            return _this;
        }
        return VStyleElement;
    }(VMElement.VHtmlElement));
    VStyleElement = __decorate([
        VMElement.mergeClass({ media: '', type: '' })
    ], VStyleElement);
    VMElement.VStyleElement = VStyleElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTableElement = (function (_super) {
        __extends(VTableElement, _super);
        function VTableElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TABLE";
            return _this;
        }
        return VTableElement;
    }(VMElement.VHtmlElement));
    VTableElement = __decorate([
        VMElement.mergeClass({ align: '', border: '', frame: '', rules: '', summary: '', width: '', bgColor: '', cellPadding: '', cellSpacing: '' })
    ], VTableElement);
    VMElement.VTableElement = VTableElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTbodyElement = (function (_super) {
        __extends(VTbodyElement, _super);
        function VTbodyElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TBODY";
            return _this;
        }
        return VTbodyElement;
    }(VMElement.VHtmlElement));
    VTbodyElement = __decorate([
        VMElement.mergeClass({ align: '', vAlign: '' })
    ], VTbodyElement);
    VMElement.VTbodyElement = VTbodyElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTdElement = (function (_super) {
        __extends(VTdElement, _super);
        function VTdElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TD";
            return _this;
        }
        return VTdElement;
    }(VMElement.VHtmlElement));
    VTdElement = __decorate([
        VMElement.mergeClass({ colSpan: '', rowSpan: '', headers: '', align: '', axis: '', height: '', width: '', noWrap: '', vAlign: '', bgColor: '', abbr: '', scope: '' })
    ], VTdElement);
    VMElement.VTdElement = VTdElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTextareaElement = (function (_super) {
        __extends(VTextareaElement, _super);
        function VTextareaElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TEXTAREA";
            return _this;
        }
        Object.defineProperty(VTextareaElement.prototype, "value", {
            get: function () {
                return this.innerText;
            },
            set: function (v) {
                this.innerText = v;
            },
            enumerable: true,
            configurable: true
        });
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        VTextareaElement.prototype.emulation = function () { };
        return VTextareaElement;
    }(VMElement.VHtmlElement));
    VTextareaElement = __decorate([
        VMElement.mergeClass({ autofocus: '', cols: '', dirName: '', disabled: '', maxLength: '', minLength: '', name: '', placeholder: '', readOnly: '', required: '', rows: '', wrap: '', autocapitalize: '' })
    ], VTextareaElement);
    VMElement.VTextareaElement = VTextareaElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTfootElement = (function (_super) {
        __extends(VTfootElement, _super);
        function VTfootElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TFOOT";
            return _this;
        }
        return VTfootElement;
    }(VMElement.VHtmlElement));
    VTfootElement = __decorate([
        VMElement.mergeClass({ align: '', vAlign: '' })
    ], VTfootElement);
    VMElement.VTfootElement = VTfootElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTheadElement = (function (_super) {
        __extends(VTheadElement, _super);
        function VTheadElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "THREAD";
            return _this;
        }
        return VTheadElement;
    }(VMElement.VHtmlElement));
    VTheadElement = __decorate([
        VMElement.mergeClass({ align: '', vAlign: '' })
    ], VTheadElement);
    VMElement.VTheadElement = VTheadElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VThElement = (function (_super) {
        __extends(VThElement, _super);
        function VThElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TH";
            return _this;
        }
        return VThElement;
    }(VMElement.VHtmlElement));
    VThElement = __decorate([
        VMElement.mergeClass({ colSpan: '', rowSpan: '', headers: '', align: '', axis: '', height: '', width: '', noWrap: '', vAlign: '', bgColor: '', abbr: '', scope: '' })
    ], VThElement);
    VMElement.VThElement = VThElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTrackElement = (function (_super) {
        __extends(VTrackElement, _super);
        function VTrackElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TRACK";
            return _this;
        }
        return VTrackElement;
    }(VMElement.VHtmlElement));
    VTrackElement = __decorate([
        VMElement.mergeClass({ kind: '', src: '', srclang: '', label: '', default: '' })
    ], VTrackElement);
    VMElement.VTrackElement = VTrackElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTrElement = (function (_super) {
        __extends(VTrElement, _super);
        function VTrElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TR";
            return _this;
        }
        return VTrElement;
    }(VMElement.VHtmlElement));
    VTrElement = __decorate([
        VMElement.mergeClass({ align: '', vAlign: '', bgColor: '' })
    ], VTrElement);
    VMElement.VTrElement = VTrElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VUlElement = (function (_super) {
        __extends(VUlElement, _super);
        function VUlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "UL";
            return _this;
        }
        return VUlElement;
    }(VMElement.VHtmlElement));
    VUlElement = __decorate([
        VMElement.mergeClass({ compact: '', type: '' })
    ], VUlElement);
    VMElement.VUlElement = VUlElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VVideoElement = (function (_super) {
        __extends(VVideoElement, _super);
        function VVideoElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "VIDEO";
            return _this;
        }
        return VVideoElement;
    }(VMElement.VHtmlElement));
    VVideoElement = __decorate([
        VMElement.mergeClass({ width: '', height: '', poster: '' })
    ], VVideoElement);
    VMElement.VVideoElement = VVideoElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VXmpElement = (function (_super) {
        __extends(VXmpElement, _super);
        function VXmpElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "XMP";
            return _this;
        }
        return VXmpElement;
    }(VMElement.VHtmlElement));
    VXmpElement = __decorate([
        VMElement.mergeClass({ width: '' })
    ], VXmpElement);
    VMElement.VXmpElement = VXmpElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VTitleElement = (function (_super) {
        __extends(VTitleElement, _super);
        function VTitleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TITLE";
            return _this;
        }
        return VTitleElement;
    }(VMElement.VHtmlElement));
    VTitleElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VTitleElement);
    VMElement.VTitleElement = VTitleElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VSpanElement = (function (_super) {
        __extends(VSpanElement, _super);
        function VSpanElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SPAN";
            return _this;
        }
        return VSpanElement;
    }(VMElement.VHtmlElement));
    VSpanElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VSpanElement);
    VMElement.VSpanElement = VSpanElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VEmElement = (function (_super) {
        __extends(VEmElement, _super);
        function VEmElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "EM";
            return _this;
        }
        return VEmElement;
    }(VMElement.VHtmlElement));
    VEmElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VEmElement);
    VMElement.VEmElement = VEmElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VIElement = (function (_super) {
        __extends(VIElement, _super);
        function VIElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "I";
            return _this;
        }
        return VIElement;
    }(VMElement.VHtmlElement));
    VIElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VIElement);
    VMElement.VIElement = VIElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VBElement = (function (_super) {
        __extends(VBElement, _super);
        function VBElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "B";
            return _this;
        }
        return VBElement;
    }(VMElement.VHtmlElement));
    VBElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VBElement);
    VMElement.VBElement = VBElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VFormElement = (function (_super) {
        __extends(VFormElement, _super);
        function VFormElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FORM";
            return _this;
        }
        return VFormElement;
    }(VMElement.VHtmlElement));
    VFormElement = __decorate([
        VMElement.mergeClass({ name: '', target: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFormElement);
    VMElement.VFormElement = VFormElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VLabelElement = (function (_super) {
        __extends(VLabelElement, _super);
        function VLabelElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LABEL";
            return _this;
        }
        return VLabelElement;
    }(VMElement.VHtmlElement));
    VLabelElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VLabelElement);
    VMElement.VLabelElement = VLabelElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDtElement = (function (_super) {
        __extends(VDtElement, _super);
        function VDtElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DT";
            return _this;
        }
        return VDtElement;
    }(VMElement.VHtmlElement));
    VDtElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VDtElement);
    VMElement.VDtElement = VDtElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VDdElement = (function (_super) {
        __extends(VDdElement, _super);
        function VDdElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DD";
            return _this;
        }
        return VDdElement;
    }(VMElement.VHtmlElement));
    VDdElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VDdElement);
    VMElement.VDdElement = VDdElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VEmbedElement = (function (_super) {
        __extends(VEmbedElement, _super);
        function VEmbedElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "EMBED";
            return _this;
        }
        return VEmbedElement;
    }(VMElement.VHtmlElement));
    VEmbedElement = __decorate([
        VMElement.mergeClass({ type: '', width: '', height: '', align: '', name: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VEmbedElement);
    VMElement.VEmbedElement = VEmbedElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VStrongElement = (function (_super) {
        __extends(VStrongElement, _super);
        function VStrongElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "STRONG";
            return _this;
        }
        return VStrongElement;
    }(VMElement.VHtmlElement));
    VStrongElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VStrongElement);
    VMElement.VStrongElement = VStrongElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VButtonElement = (function (_super) {
        __extends(VButtonElement, _super);
        function VButtonElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BUTTON";
            return _this;
        }
        return VButtonElement;
    }(VMElement.VHtmlElement));
    VButtonElement = __decorate([
        VMElement.mergeClass({ formTarget: '', name: '', value: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VButtonElement);
    VMElement.VButtonElement = VButtonElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VObjectElement = (function (_super) {
        __extends(VObjectElement, _super);
        function VObjectElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OBJECT";
            return _this;
        }
        return VObjectElement;
    }(VMElement.VHtmlElement));
    VObjectElement = __decorate([
        VMElement.mergeClass({ type: '', name: '', useMap: '', width: '', height: '', align: '', archive: '', code: '', standby: '', codeType: '', border: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VObjectElement);
    VMElement.VObjectElement = VObjectElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VSvgElement = (function (_super) {
        __extends(VSvgElement, _super);
        function VSvgElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SVG";
            return _this;
        }
        return VSvgElement;
    }(VMElement.VHtmlElement));
    VSvgElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VSvgElement);
    VMElement.VSvgElement = VSvgElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VCircleElement = (function (_super) {
        __extends(VCircleElement, _super);
        function VCircleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CIRCLE";
            return _this;
        }
        return VCircleElement;
    }(VMElement.VHtmlElement));
    VCircleElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VCircleElement);
    VMElement.VCircleElement = VCircleElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VHeaderElement = (function (_super) {
        __extends(VHeaderElement, _super);
        function VHeaderElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "HEADER";
            return _this;
        }
        return VHeaderElement;
    }(VMElement.VHtmlElement));
    VHeaderElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHeaderElement);
    VMElement.VHeaderElement = VHeaderElement;
})(VMElement || (VMElement = {}));
/// <reference path="../node/Attribute_Property.ts"/>
var VMElement;
(function (VMElement) {
    var VFooterElement = (function (_super) {
        __extends(VFooterElement, _super);
        function VFooterElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FOOTER";
            return _this;
        }
        return VFooterElement;
    }(VMElement.VHtmlElement));
    VFooterElement = __decorate([
        VMElement.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFooterElement);
    VMElement.VFooterElement = VFooterElement;
})(VMElement || (VMElement = {}));
/// <reference path='../node/VHtmlElement.ts'/>
/// <reference path='../node/VText.ts'/>
/// <reference path='../node/VComment.ts'/>
/// <reference path='../node/VDocumentType.ts'/>
/// <reference path='../node/VDocument.ts'/>
/// <reference path='../element/VAElement.ts'/>
/// <reference path='../element/VAreaElement.ts'/>
/// <reference path='../element/VBaseElement.ts'/>
/// <reference path='../element/VBasefontElement.ts'/>
/// <reference path='../element/VBlockquoteElement.ts'/>
/// <reference path='../element/VBodyElement.ts'/>
/// <reference path='../element/VBrElement.ts'/>
/// <reference path='../element/VCanvasElement.ts'/>
/// <reference path='../element/VCaptionElement.ts'/>
/// <reference path='../element/VColElement.ts'/>
/// <reference path='../element/VColgroupElement.ts'/>
/// <reference path='../element/VDialogElement.ts'/>
/// <reference path='../element/VDirElement.ts'/>
/// <reference path='../element/VDivElement.ts'/>
/// <reference path='../element/VDlElement.ts'/>
/// <reference path='../element/VFieldsetElement.ts'/>
/// <reference path='../element/VFrameElement.ts'/>
/// <reference path='../element/VH1Element.ts'/>
/// <reference path='../element/VH2Element.ts'/>
/// <reference path='../element/VH3Element.ts'/>
/// <reference path='../element/VH4Element.ts'/>
/// <reference path='../element/VH5Element.ts'/>
/// <reference path='../element/VH6Element.ts'/>
/// <reference path='../element/VHeadElement.ts'/>
/// <reference path='../element/VHrElement.ts'/>
/// <reference path='../element/VIframeElement.ts'/>
/// <reference path='../element/VImgElement.ts'/>
/// <reference path='../element/VInputElement.ts'/>
/// <reference path='../element/VInsElement.ts'/>
/// <reference path='../element/VKeygenElement.ts'/>
/// <reference path='../element/VLegendElement.ts'/>
/// <reference path='../element/VLiElement.ts'/>
/// <reference path='../element/VLinkElement.ts'/>
/// <reference path='../element/VMapElement.ts'/>
/// <reference path='../element/VMenuElement.ts'/>
/// <reference path='../element/VMetaElement.ts'/>
/// <reference path='../element/VMeterElement.ts'/>
/// <reference path='../element/VOlElement.ts'/>
/// <reference path='../element/VOptgroupElement.ts'/>
/// <reference path='../element/VOptionElement.ts'/>
/// <reference path='../element/VOutputElement.ts'/>
/// <reference path='../element/VParamElement.ts'/>
/// <reference path='../element/VPElement.ts'/>
/// <reference path='../element/VPreElement.ts'/>
/// <reference path='../element/VProgressElement.ts'/>
/// <reference path='../element/VQElement.ts'/>
/// <reference path='../element/VScriptElement.ts'/>
/// <reference path='../element/VSelectElement.ts'/>
/// <reference path='../element/VSourceElement.ts'/>
/// <reference path='../element/VStyleElement.ts'/>
/// <reference path='../element/VTableElement.ts'/>
/// <reference path='../element/VTbodyElement.ts'/>
/// <reference path='../element/VTdElement.ts'/>
/// <reference path='../element/VTextareaElement.ts'/>
/// <reference path='../element/VTfootElement.ts'/>
/// <reference path='../element/VTheadElement.ts'/>
/// <reference path='../element/VThElement.ts'/>
/// <reference path='../element/VTrackElement.ts'/>
/// <reference path='../element/VTrElement.ts'/>
/// <reference path='../element/VUlElement.ts'/>
/// <reference path='../element/VVideoElement.ts'/>
/// <reference path='../element/VXmpElement.ts'/>
/// <reference path='../element/VTitleElement.ts'/>
/// <reference path='../element/VSpanElement.ts'/>
/// <reference path='../element/VEmElement.ts'/>
/// <reference path='../element/VIElement.ts'/>
/// <reference path='../element/VBElement.ts'/>
/// <reference path='../element/VFormElement.ts'/>
/// <reference path='../element/VLabelElement.ts'/>
/// <reference path='../element/VDtElement.ts'/>
/// <reference path='../element/VDdElement.ts'/>
/// <reference path='../element/VEmbedElement.ts'/>
/// <reference path='../element/VStrongElement.ts'/>
/// <reference path='../element/VButtonElement.ts'/>
/// <reference path='../element/VObjectElement.ts'/>
/// <reference path='../element/VSvgElement.ts'/>
/// <reference path='../element/VCircleElement.ts'/>
/// <reference path='../element/VHeaderElement.ts'/>
/// <reference path='../element/VFooterElement.ts'/>
/// <reference path="Scope.ts"/>
/// <reference path="../virtual/UIHelper/BaseVNode.ts"/>
typeof document === "undefined" && (document = $$$('#document'));
var $rootScope = new RootScope(document);
var DOMScope = (function () {
    function DOMScope() {
    }
    /**
     * 在dom节点上创建变量作用域对象
     * @param {INode} node - dom节点
     * @param {string} name - 名称
     */
    DOMScope.create = function (node, name) {
        var scope = this.get(node);
        if (node.parentNode !== scope.__actionNode__) {
            scope = new Scope(node, scope, name);
            this.stack.push(scope);
        }
        else {
            throw new Error('当前层不允许重复定义scope:' + name);
        }
        return scope;
    };
    /**
     * 获取变量作用域对象
     * @param {INode} node - dom节点
     */
    DOMScope.get = function (node) {
        var nd;
        if (!node) {
            return $rootScope;
        }
        nd = node;
        while (nd != null) {
            if (nd.__scope__) {
                return nd.__scope__;
            }
            nd = nd.parentNode;
        }
        return $rootScope;
    };
    /**
     * 切断dom节点和变量作用域对象的链接
     * @param {Scope} scopeVarObject - 变量作用域对象
     */
    DOMScope.unlink = function (scope) {
        var p = scope.__parent__;
        if (p) {
            scope.__parent__ = null;
            removeItem(p.__children__, scope);
            var name = scope.__name__;
            if (!isUndefined(name)) {
                delete p[name];
            }
        }
    };
    /**
     * 链接dom节点和变量作用域对象
     * @param {Scope} scopeVarObject - 变量作用域对象
     * @param {INode} node - dom节点
     */
    DOMScope.link = function (scope, node) {
        var p = this.get(node);
        if (!p) {
            return;
        }
        scope.__parent__ = p;
        p.__children__.push(scope);
        if (scope.__name__) {
            p[scope.__name__] = scope;
        }
    };
    return DOMScope;
}());
DOMScope.stack = [$rootScope];
/// <reference path='../../scope/DOMScope.ts'/>
var Order;
(function (Order) {
    var subOrderNames = [], subOrderRE, //=/^\s*()(?:\s|$)/,// = /^\s?(else if|else|case break|case|default|end)(\s|$)/g,
    orderNames = [], orderRE;
    //if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=
    function addSubOrderName(name) {
        if (subOrderNames.indexOf(name) === -1) {
            subOrderNames.push(name);
        }
    }
    Order.addSubOrderName = addSubOrderName;
    /**从注释中读取命令 */
    function getCommentStringInfo(s) {
        var order = s.match(orderRE);
        if (order) {
            return { order: trim(order[0]), condition: s.substring(order[0].length, s.length) };
        }
        else {
            var subOrder = s.match(subOrderRE);
            if (subOrder) {
                return { subOrder: trim(subOrder[0]), condition: s.substring(subOrder[0].length, s.length) };
            }
        }
        return null;
    }
    Order.getCommentStringInfo = getCommentStringInfo;
    Order.orders = {};
    function makeOrderRegExp(names) {
        return new RegExp("^\\s*(" + names.join("|") + ")(?:\\s*|$)");
    }
    function register(order) {
        var name = order.orderName.toLowerCase();
        Order.orders[name] = order;
        orderNames.push(name);
        orderRE = makeOrderRegExp(orderNames);
        if (isArray(order.subOrder) && order.subOrder.length > 0) {
            for (var _i = 0, _a = order.subOrder; _i < _a.length; _i++) {
                var subOrder = _a[_i];
                addSubOrderName(subOrder);
            }
            // subOrderNames.push(order.subOrder.join("|"));
            subOrderRE = makeOrderRegExp(subOrderNames);
        }
    }
    Order.register = register;
    function parseComment(node) {
        if (node.__order__) {
            return node.__order__;
        }
        var info = getCommentStringInfo(node.data);
        if (!info) {
            return;
        }
        if (!info.order) {
            throw new Error("语法错误：不恰当的" + info.subOrder);
        }
        var orderName = info.order.toLowerCase();
        if (!(orderName in Order.orders)) {
            return;
        }
        var order = new Order.orders[orderName](node, info.condition);
        return order;
    }
    Order.parseComment = parseComment;
    var _exec = Function('$$turtle$$,node', 'with(this){return eval($$turtle$$)};');
    function registerEnvVar(name, value) {
        if (name in $rootScope) {
            throw new Error(name + "无法重复注册到环境！");
        }
        $rootScope[name] = value;
    }
    Order.registerEnvVar = registerEnvVar;
    function exec(node, script) {
        var that = DOMScope.get(node);
        var ret = _exec.call(that, script, node);
        return ret;
    }
    Order.exec = exec;
    //test    
    var replaceScopes = {
        scopes: [],
        oldScopes: []
    };
    /**取消scope保护 */
    function resetTest() {
        //倒序还原
        for (var i_35 = replaceScopes.oldScopes.length - 1; i_35 >= 0; i_35--) {
            var oldScope = replaceScopes.oldScopes.pop();
            var scope = replaceScopes.scopes.pop();
            scope.__actionNode__.__scope__ = oldScope;
        }
    }
    Order.resetTest = resetTest;
    /**测试时保护原来的scope */
    function replaceScope(scope) {
        var idx = replaceScopes.oldScopes.indexOf(scope);
        if (idx !== -1) {
            return replaceScopes.scopes[idx];
        }
        else {
            idx = replaceScopes.scopes.indexOf(scope);
            if (idx !== -1) {
                return scope;
            }
            var newScope = createFakeObject(scope);
            scope.__actionNode__.__scope__ = newScope;
            replaceScopes.oldScopes.push(scope);
            replaceScopes.scopes.push(newScope);
            return newScope;
        }
    }
    function test(node, script) {
        var that = DOMScope.get(node);
        that = replaceScope(that);
        return _exec.call(that, script, node);
    }
    Order.test = test;
    function testSet(node, name, script) {
        var that = DOMScope.get(node);
        that = replaceScope(that);
        that[name] = _exec.call(that, script, node);
    }
    Order.testSet = testSet;
    function testSetValue(node, name, value) {
        var that = DOMScope.get(node);
        that = replaceScope(that);
        that[name] = value;
    }
    Order.testSetValue = testSetValue;
    function createFakeObject(that) {
        var obj = {};
        for (var name_5 in that) {
            if (that.hasOwnProperty(name_5)) {
                defineCloneProperty(obj, name_5, that);
            }
        }
        if (that.__proto__ !== Object.prototype) {
            obj.__proto__ = createFakeObject(that.__proto__);
        }
        return obj;
    }
    function emptyFunction() { }
    function defineCloneProperty(that, name, source) {
        var created = null;
        Object.defineProperty(that, name, {
            get: function () {
                var ret = source[name];
                if (isObject(ret)) {
                    if (!created) {
                        created = createFakeObject(ret);
                    }
                    return created;
                }
                else {
                    return ret;
                }
            },
            set: emptyFunction
        });
    }
})(Order || (Order = {}));
/// <reference path='Lib.ts'/>
var Order;
(function (Order) {
    var VOrder = (function () {
        function VOrder(node, condition) {
            this.data = {};
            this.node = node;
            this.condition = condition;
            this.data.placeholder = node;
        }
        VOrder.eachOrder = function (array, fn, beginIndex) {
            if (beginIndex === void 0) { beginIndex = 0; }
            return treeEach(array, 'childNodes', function (node, state) {
                if (!(node instanceof VComment)) {
                    return;
                }
                var info = Order.getCommentStringInfo(node.data);
                if (!info) {
                    return;
                }
                return fn(node, info, state);
            }, beginIndex);
        };
        return VOrder;
    }());
    Order.VOrder = VOrder;
})(Order || (Order = {}));
var XHR = (function () {
    function XHR() {
    }
    XHR.prototype.send = function (type, url, data, async, fn, fnerror) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, !!async);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    if (xhr.responseText.length > 0) {
                        fn(xhr.responseText);
                    }
                }
            }
        };
        type == 'POST' && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onerror = fnerror;
        xhr.send(data);
    };
    XHR.prototype.get = function (url, async, fn, fnerror) {
        this.send('GET', url, undefined, async, fn, fnerror);
    };
    XHR.prototype.post = function (url, data, async, fn, fnerror) {
        this.send('POST', url, data, async, fn, fnerror);
    };
    return XHR;
}());
var _util;
(function (_util) {
    _util.DI_TARGET = '$di$target';
    _util.DI_DEPENDENCIES = '$di$dependencies';
    function getServiceDependencies(ctor) {
        return ctor[_util.DI_DEPENDENCIES] || [];
    }
    _util.getServiceDependencies = getServiceDependencies;
})(_util || (_util = {}));
function storeServiceDependency(id, target, index, optional) {
    if (target[_util.DI_TARGET] === target) {
        target[_util.DI_DEPENDENCIES].push({ id: id, index: index, optional: optional });
    }
    else {
        target[_util.DI_DEPENDENCIES] = [{ id: id, index: index, optional: optional }];
        target[_util.DI_TARGET] = target;
    }
}
/**
 * A *only* valid way to create a {{ServiceIdentifier}}.
 */
function createDecorator(serviceId) {
    var id = function (target, key, index) {
        if (arguments.length !== 3) {
            throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
        }
        storeServiceDependency(id, target, index, false);
    };
    id.toString = function () { return serviceId; };
    return id;
}
/// <reference path='../lib/lib.ts'/>
var Store = (function () {
    function Store() {
    }
    return Store;
}());
var StoreManage = (function () {
    function StoreManage() {
    }
    StoreManage.take = function (data, name) {
        if (data.hasOwnProperty(name)) {
            var ret = data[name];
            delete data[name];
            if (ret.childNodes.length > 1) {
                return ret.childNodes;
            }
            else {
                return ret.childNodes[0];
            }
        }
    };
    StoreManage.takeElem = function (data, name) {
        if (data.hasOwnProperty(name)) {
            var ret = data[name];
            delete data[name];
            if (ret.children.length > 1) {
                return ret.children;
            }
            else {
                return ret.children[0];
            }
        }
        return undefined;
    };
    return StoreManage;
}());
var Config = (function () {
    function Config() {
        this.baseUIPath = baseUIPath;
        this.baseServicePath = 'service';
        this.debugMode = 2;
    }
    return Config;
}());
/// <reference path='TemplateConfig.ts'/>
/// <reference path='../virtual/order/VOrder.ts'/>
/// <reference path='../core/XHR.ts'/>
/// <reference path='../lib/instantiation.ts'/>
/// <reference path='../lib/treeEach.ts'/>
/// <reference path='Part.ts'/>
/// <reference path='Store.ts'/>
/// <reference path='../main/Config.ts'/>
var $DOM, $node, operatorRE = /\!=|==|=|<|>|\|/;
function replaceCls() {
    var arr = $t.replaceClassStore;
    for (var i_36 = 0; i_36 < arr.length; i_36++) {
        var cls = arr[i_36].getAttribute('cls');
        arr[i_36].removeAttribute('cls');
        if ($t.defineClassNames[cls]) {
            arr[i_36].className += ' ' + $t.defineClassNames[cls].join(" ");
        }
    }
    arr.length = 0;
}
function getScopeBy(scope, node) {
    if (!scope)
        return DOMScope.get(node);
    else
        return scope;
}
// function execByScope(node: INode, s: string, scope, outer, outerElement, props, part) {
//     return _execByScope.call(getScopeBy(scope, node), s, node, outer, outerElement, props, part);
// }
// function execScope(s: string, node: INode, outerChildNodes, outerElement, props, part) {
//     execByScope(node, '$t.extend(this,{' + s + '});', null, outerChildNodes, outerElement, props, part);
// }
function setNodeProperty(node, proName, condition, outerChildNodes, outerElement, props, part) {
    var v = execByScope(node, condition, null, outerChildNodes, outerElement, props, part);
    var name = camelCase(proName.substr(0, proName.length - 1));
    if (name.indexOf(".") != -1) {
        var obj2 = node;
        name = name.split(".");
        for (var i_37 = 0; i_37 < name.length - 1; i_37++) {
            obj2 = obj2[name[i_37]];
            if (!obj2)
                return;
        }
        name = name[name.length - 1];
        obj2[name] = v;
    }
    else {
        node.setAttribute(name, v);
    }
}
function setQuestionAtrr(node, outerChildNodes, outerElement, props, part) {
    var attrs = slice.call(node.attributes);
    for (var i_38 = 0; i_38 < attrs.length; i_38++) {
        var name_6 = attrs[i_38].name;
        if (name_6.length > 1) {
            if (name_6[name_6.length - 1] === ':') {
                setNodeProperty(node, name_6, takeAttr(node, name_6), outerChildNodes, outerElement, props, part);
            }
            else if (name_6[0] === ':') {
                var v = takeAttr(node, name_6, "");
                if (v) {
                    bindNodeProperty(node, name_6.substring(1, name_6.length), v);
                }
            }
        }
    }
}
function getTemplate(node) {
    var nodeName = node.nodeName;
    if (templateConfig.hasOwnProperty(nodeName)) {
        debugger;
        if (templateConfig[nodeName].hasOwnProperty('getData')) {
            return templateConfig[nodeName].getData(node);
        }
        else {
            return node.innerHTML;
        }
    }
    return "";
}
function defineServiceByNode(node) {
    var name = node.getAttribute('service');
    if (name) {
        var partType = node.getAttribute('ui');
        if (partType) {
            if ($t.T.hasOwnProperty(partType)) {
                /*把服务定义到组件*/
                $t.T[partType].service.define(name, getTemplate(node));
            }
            else {
                throw new Error('不能定义service：' + name + '到' + partType + '上');
            }
        }
        else {
            if (!$t.service.hasOwnProperty(name)) {
                $t.service.define(name, getTemplate(node));
            }
            else {
                throw new Error('不能重复定义service：' + name);
            }
        }
    }
    removeNode(node);
}
function getExtendsByNode(node, sortPath) {
    var ext = getAttr(node, 'extends', null);
    if (isString(ext)) {
        return getExtends(ext, sortPath);
    }
}
function defineUIByNode(node) {
    var name = getAttr(node, 'ui');
    var ext = getExtendsByNode(node, 'ui');
    if (name) {
        $t.T.define(name, '', '', getTemplate(node), ext);
    }
    removeNode(node);
}
function defineClasses(node) {
    var v = getAttr(node, 'class');
    if (v) {
        $t.defineClassNames.push(v, trimLine(getTemplate(node)));
    }
    removeNode(node);
}
function parseDefine(node) {
    switch (true) {
        case node.hasAttribute('service'):
            defineServiceByNode(node);
            break;
        case node.hasAttribute('ui'):
            defineUIByNode(node);
            break;
        case node.hasAttribute('class'):
            defineClasses(node);
            break;
    }
}
function isDefine(node) {
    switch (true) {
        case node.hasAttribute('service'):
        case node.hasAttribute('ui'):
        case node.hasAttribute('class'):
            return true;
    }
    return false;
}
function isTemplate(node) {
    var nodeName = node.nodeName;
    if (templateConfig.hasOwnProperty(nodeName)) {
        if (templateConfig[nodeName].hasOwnProperty('type')) {
            return getAttr(node, 'type') === 'xmp';
        }
        else {
            return true;
        }
    }
    return false;
}
function findTemplates(nodes) {
    var temps = [];
    treeEach(nodes, 'children', function (node) {
        if (isTemplate(node)) {
            temps.push(node);
        }
    });
    return temps;
}
function parseUITemplate(uiName, uiSortPath, uiPath, sHTML) {
    var vDOM = $DOM(sHTML), cs = vDOM.children, i = 0, node, s, name, nodeName;
    for (; i < cs.length; i++) {
        node = cs[i];
        if (!isTemplate(node)) {
            alert('最上层必须是ui/service模板标签');
            return;
        }
        if (node.hasAttribute('service')) {
            defineServiceByNode(node);
            i--;
        }
        else {
            nodeName = node.getAttribute('ui');
            if (!nodeName)
                nodeName = uiName;
            if (!$t.T.hasOwnProperty(nodeName)) {
                s = getTemplate(node);
                $t.T.define(nodeName, uiSortPath, uiPath, s, getExtendsByNode(node, uiSortPath));
            }
            else {
                alert('不能重复定义ui：' + nodeName);
            }
        }
    }
}
function importUIHTML(uiName, uiSortPath) {
    if (!$t.T.hasOwnProperty(uiName)) {
        var uiPath_1 = baseUIPath.getPathBySortPath(uiSortPath);
        $t.xhr.get(uiPath_1 + '/' + (uiName + '.html').toLowerCase(), false, function (text) {
            parseUITemplate(uiName, uiSortPath, uiPath_1, text);
        });
    }
    return $t.T[uiName];
}
function getExtends(extName, sortPath) {
    var ext;
    if (extName.indexOf(':') !== -1) {
        extName = extName.split(':');
        sortPath = extName[0] ? extName[0] : sortPath;
        extName = extName[1];
    }
    if (!isObject(importUIHTML(extName, sortPath))) {
        throw new Error('找不到可继承的模板：' + extName);
    }
    ext = $t.T[extName];
    return ext;
}
/**从DOM树获取父组件
 * @param {}
 */
function getParentPart(node) {
    while (1) {
        if (node.previousSibling !== null) {
            node = node.previousSibling;
        }
        else if (node.parentNode !== null) {
            node = node.parentNode;
        }
        else {
            return null;
        }
        if (isCommentNode(node) && node.__part__) {
            if (node.__sign__ === 0) {
                node = node.__part__.refs.begin;
            }
            else {
                return node.__part__;
            }
        }
    }
    return null;
}
function parseAsync(node, outerChildNodes, outerElement, props, part) {
    var delay = parseInt(execByScope(node, node.getAttribute('async'), null, outerChildNodes, outerElement, props, part));
    node.removeAttribute('async');
    var mark = $node('async', 8);
    replaceNodeByNode(node, mark);
    if (delay === NaN) {
        delay = 0;
    }
    setTimeout(function () {
        replaceNodeByNode(mark, node);
        initHTML([node], outerChildNodes, outerElement, props, part);
        replaceCls();
    }, delay);
}
function parseLazy(node, outerChildNodes, outerElement, props, part) {
    node.removeAttribute('lazy');
    initHTML(node.childNodes, outerChildNodes, outerElement, props, part);
}
function getUIInfo(node) {
    var nodeName = node.nodeName;
    if (nodeName === 'SCRIPT' && getAttr(node, 'type') === 'ui') {
        return node.getAttribute('name').toLowerCase();
    }
    else if (nodeName.indexOf(':')) {
        var c = nodeName.split(':');
        var sortPath = c[0].toLowerCase();
        if (baseUIPath.hasSortPath(sortPath)) {
            return { sortPath: sortPath, name: c[1].toLowerCase() };
        }
    }
}
function parseUI(node, uiInfo, step, part) {
    var partName, reExtends, outerChildNodes, outerElement, cpn, ui = importUIHTML(uiInfo.name, uiInfo.sortPath);
    if (!ui) {
        removeNode(node);
        throw new Error(uiInfo.name + '组件不存在！');
    }
    partName = takeAttr(node, 'p-name');
    reExtends = takeAttr(node, 're-extends');
    outerChildNodes = slice.call(node.childNodes);
    outerElement = slice.call(node.children);
    var chds = node.childNodes;
    for (var i_39 = chds.length; i_39 > 0; i_39--) {
        node.removeChild(chds[0]);
    }
    cpn = ui.render(node, node.parentNode, outerChildNodes, outerElement, null, part, partName, reExtends);
    if (cpn) {
        step.next = cpn.elementLength;
    }
}
function parseGet(node, outerChildNodes, outerElement, props, part) {
    removeNode(node);
    var name = getAttr(node, 'name');
    if (name) {
        initHTML(node.childNodes, outerChildNodes, outerElement, props, part);
        $t.store[name] = node;
        return 4 /* c_noIn */;
    }
    var toRef = getAttr(node, 'to-p-ref');
    if (toRef && part) {
        toRef = '$' + toRef;
        if (part[toRef]) {
            appendNodes(node.childNodes, part[toRef]);
            initHTML(part[toRef].childNodes, outerChildNodes, outerElement, props, part);
            node.innerHTML = '';
        }
    }
}
function isHTMLElement(p) {
    return typeof p === "IHTMLElement";
}
function parseSet(node, outerChildNodes, outerElement, props, part) {
    var link = takeAttr(node, 'link', "");
    if (link) {
        /*设置关联子对象*/
        var chds = StoreManage.takeElem($t.store, link);
        if (chds) {
            if (isHTMLElement(chds)) {
                node.appendChild(chds);
            }
            else {
                var n = node.children[0];
                if (n)
                    appendNodes(chds, n);
            }
            takeOutChildNodes(node);
        }
        else {
            removeNode(node);
        }
    }
    else {
        var ns = void 0;
        /*设置属性*/
        if (node.children.length > 0) {
            /*设置子对象*/
            ns = node.children;
        }
        else if (node.parentNode) {
            /*设置父对象*/
            ns = [node.parentNode];
        }
        else {
            return;
        }
        var isAppend = !node.hasAttribute('append');
        node.removeAttribute('append');
        var attr = node.attributes;
        for (var j = 0; j < ns.length; j++) {
            var nd = ns[j];
            if (isAppend) {
                for (var i_40 = 0; i_40 < attr.length; i_40++) {
                    nd.setAttribute(attr[i_40].name, attr[i_40].value);
                }
            }
            else {
                for (var i_41 = 0; i_41 < attr.length; i_41++) {
                    var value = attr[i_41].value;
                    var value2 = void 0;
                    switch (attr[i_41].name) {
                        case 'class':
                            value2 = nd.getAttribute(attr[i_41].name);
                            if (value2) {
                                value += (/ $/.test(value) ? '' : ' ') + value2;
                            }
                            break;
                        case 'style':
                            value2 = nd.getAttribute(attr[i_41].name);
                            if (value2) {
                                value += (/; *$/.test(value) ? '' : ';') + value2;
                            }
                            break;
                    }
                    nd.setAttribute(attr[i_41].name, value);
                }
            }
        }
        takeOutChildNodes(node);
    }
    return 4 /* c_noIn */;
}
var includeJSFiles = (function () {
    var IncludeTask = (function () {
        function IncludeTask(parent, files, callback) {
            this.parent = parent;
            this.callback = callback;
            this.child = null;
            this.isallload = false;
            this.count = 0;
            if (parent) {
                parent.child = this;
            }
            var arr;
            var data = IncludeTask.jsScript;
            if (isArray(files)) {
                arr = files;
                for (var i_42 in arr) {
                    var url = files[i_42];
                    if (isString(url) && !(url in data)) {
                        arr.push(url);
                        data[url] = $node("script");
                    }
                }
            }
            else if (files) {
                arr = [];
                var url = files;
                if (isString(url) && !(url in data)) {
                    arr.push(url);
                    data[url] = $node("script");
                }
            }
            else {
                arr = [];
            }
            this.files = arr;
        }
        IncludeTask.prototype.onallload = function () {
            this.isallload = true;
            if (this.child == null) {
                setIncludeTaskDone(this, this.callback);
            }
            else if (this.child.isallload) {
                setIncludeTaskDone(this, this.callback);
            }
            if (this.parent != null) {
                this.parent.onchildallload();
            }
        };
        IncludeTask.prototype.onchildallload = function () {
            if (this.isallload) {
                setIncludeTaskDone(this, this.callback);
            }
        };
        return IncludeTask;
    }());
    IncludeTask.jsScript = {};
    var includeTask;
    function setIncludeTaskDone(task, fn) {
        includeTask = task.parent;
        if (includeTask != null)
            includeTask.child = null;
        task.child = null;
        if (isFunction(fn))
            fn();
    }
    function includeJSFile(task) {
        if (task.files.length > 0) {
            var url = task.files.shift();
            var scriptNode = IncludeTask.jsScript[url];
            scriptNode.src = url;
            task.count++;
            scriptNode.onload = function () {
                task.count--;
                includeJSFile(task);
            };
            document.head.appendChild(scriptNode);
        }
        else if (task.count == 0) {
            task.onallload();
        }
    }
    return function (files, callback) {
        includeTask = new IncludeTask(includeTask, files, callback);
        includeJSFile(includeTask);
    };
}());
var exec = eval;
function execOnScript(node, outerChildNodes, outerElement, props, part) {
    var p = node.parentNode;
    if (p) {
        var script = node.innerHTML;
        if (script.length > 0) {
            /*设置父对象事件*/
            var events = exec('({' + script + '})');
            for (var i in events) {
                if (isFunction(events[i])) {
                    p.addEventListener(i, events[i]);
                }
            }
        }
    }
}
function execScript(node, outerChildNodes, outerElement, props, part) {
    var script = node.innerHTML;
    if (script.length > 0) {
        var fn;
        var keyVar = String(getAttr(node, 'var', ''));
        var arrKeyVar;
        fn = Function('outer,outerElement,props,part' + (keyVar ? ',' : '') + keyVar, script);
        var args = [outerChildNodes, outerElement, props, part];
        if (keyVar.length > 0) {
            arrKeyVar = keyVar.split(',');
            for (var i = 0; i < arrKeyVar.length; i++) {
                var ui = $t.refs[arrKeyVar[i]];
                if (ui) {
                    args.push(ui[ui.length - 1]);
                }
                else {
                    args.push(null);
                }
            }
        }
        // try {
        fn.apply(node.parentNode, args);
        // } catch (e) {
        //     _catch(e);
        // }
        fn = null;
    }
}
function execTurtleScript(node, outerChildNodes, outerElement, props, part) {
    var type = getAttr(node, 'type', null);
    if (type == 'on') {
        execOnScript(node, outerChildNodes, outerElement, props, part);
    }
    else {
        execScript(node, outerChildNodes, outerElement, props, part);
    }
}
function parseScript(node, outerChildNodes, outerElement, props, part) {
    if (node.type === "" || node.type === "on" || node.type === "text/javascript") {
        var src = getAttr(node, 'src', '');
        if (src) {
            includeJSFiles(src);
        }
        else {
            execTurtleScript(node, outerChildNodes, outerElement, props, part);
        }
        removeNode(node);
    }
}
function execNodeQuestion(node, outerChildNodes, outerElement, props, part) {
    var v = takeAttr(node, ':', "");
    if (v && v.length > 0) {
        execByScope(node, v, null, outerChildNodes, outerElement, props, part);
    }
}
function bindNode(node, obj, name) {
    var elementValueName, eventName;
    switch (node.nodeName) {
        case "SELECT":
            elementValueName = "value";
            eventName = "change";
            break;
        case "TEXTAREA":
            elementValueName = "value";
            eventName = "input";
            break;
        case "INPUT":
            switch (node.type) {
                case "checkbox":
                    elementValueName = "checked";
                    eventName = "click";
                    break;
                default:
                    elementValueName = "value";
                    eventName = "input";
                    break;
            }
            break;
        case "#text":
            elementValueName = "data";
            break;
        case "BUTTON":
        case "DIV":
        default:
            elementValueName = "innerHTML";
            break;
    }
    if (!node.__bind__) {
        node[elementValueName] = obj[name];
    }
    bindElementProperty(obj, name, node, elementValueName);
    if (eventName) {
        node.addEventListener(eventName, function () {
            obj[name] = node[elementValueName];
        });
    }
}
function bindNodeByCondition(node, condition) {
    var cdtn = splitByOnce(condition, "|"), name = cdtn[0], arrName, scope, obj, exp;
    if (!name) {
        return;
    }
    scope = DOMScope.get(node);
    if (name.indexOf(".") != -1) {
        arrName = name.split(".");
        obj = _getBindObject(scope, arrName);
        name = arrName[arrName.length - 1];
    }
    else {
        obj = _getBindObject(scope, [name]);
    }
    if (obj === null) {
        throw new Error('不能获取绑定属性:' + cdtn[0]);
    }
    if (cdtn.length === 2) {
        exp = function (v) {
            _execExpressionsByScope(cdtn[1], v, node);
        };
        exp.__me__ = exp;
        bindProperty(obj, name, exp, "__me__");
    }
    else {
        bindNode(node, obj, name);
    }
}
function bindNodeFunction(node, bindVar, fn) {
    var name, scope, obj;
    if (bindVar.indexOf(".") != -1) {
        bindVar = bindVar.split(".");
    }
    else {
        bindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = DOMScope.get(node);
    obj = _getBindObject(scope, bindVar);
    fn.__me__ = fn;
    bindProperty(obj, name, fn, "__me__");
    return { object: obj, name: name, targetObject: fn, targetName: "__me__" };
}
function bindEval(node, s, outer, outerElement, props, part, fn) {
    var operator = s.match(operatorRE)[0], bindVar = splitByOnce(s, operator), sfn;
    if (bindVar.length < 2)
        return;
    switch (operator) {
        case "|":
            sfn = bindVar[1];
            break;
        case "=":
            operator = "==";
        default:
            sfn = 'v' + operator + bindVar[1];
            break;
    }
    return bindNodeFunction(node, bindVar[0], function (v) {
        fn.call(this, execValueByScope(node, sfn, v, this, outer, outerElement, props, part));
    });
}
var ElementParser = (function () {
    function ElementParser() {
        this.GET = parseGet;
        this.SET = parseSet;
        this.__BREAK__ = parseBreakOrder;
        this.SCRIPT = parseScript;
    }
    return ElementParser;
}());
function bindShowHide(node, s, isBindShow, outer, outerElement, props, part) {
    bindEval(node, s, outer, outerElement, props, part, function (v) {
        if (v) {
            if (isBindShow) {
                removeClass(node, 'uhide');
            }
            else {
                addClass(node, 'uhide');
            }
        }
        else {
            if (isBindShow) {
                addClass(node, 'uhide');
            }
            else {
                removeClass(node, 'uhide');
            }
        }
    });
}
var AttributeParser = (function () {
    function AttributeParser() {
    }
    AttributeParser.prototype.ref = function (node, outerChildNodes, outerElement, props, part) {
        var refName = node.getAttribute('ref');
        node.removeAttribute('ref');
        KeyArrayHashObjectManage.push($t.refs, refName.split(','), node);
    };
    AttributeParser.prototype[":"] = function (node, outerChildNodes, outerElement, props, part) {
        execNodeQuestion(node, outerChildNodes, outerElement, props, part);
        setQuestionAtrr(node, outerChildNodes, outerElement, props, part);
    };
    AttributeParser.prototype['p-ref'] = function (node, outerChildNodes, outerElement, props, part) {
        var refName = takeAttr(node, 'p-ref');
        var arrRefName;
        if (part && refName) {
            arrRefName = refName.split(',');
            for (var i = 0; i < arrRefName.length; i++) {
                part['$' + arrRefName[i]] = node;
            }
        }
    };
    AttributeParser.prototype.bind = function (node, outerChildNodes, outerElement, props, part) {
        var v = takeAttr(node, 'bind');
        if (v) {
            bindNodeByCondition(node, v);
        }
    };
    AttributeParser.prototype.remove = function (node, outerChildNodes, outerElement, props, part) {
        var bindInfo = bindEval(node, takeAttr(node, 'remove'), outerChildNodes, outerElement, props, part, function (v) {
            if (!v)
                return;
            if (!bindInfo)
                return;
            removeBind(this, bindInfo.targetName, bindInfo.name);
            removeNode(node);
        });
    };
    AttributeParser.prototype.add = function (node, outerChildNodes, outerElement, props, part) {
        var placeholder = $node('', 8);
        replaceNodeByNode(node, placeholder);
        var bindInfo = bindEval(node, takeAttr(node, 'add'), outerChildNodes, outerElement, props, part, function (v) {
            if (!v)
                return;
            if (!bindInfo)
                return;
            removeBind(this, bindInfo.targetName, bindInfo.name);
            replaceNodeByNode(placeholder, node);
        });
    };
    AttributeParser.prototype.show = function (node, outerChildNodes, outerElement, props, part) {
        bindShowHide(node, takeAttr(node, 'show'), true, outerChildNodes, outerElement, props, part);
    };
    AttributeParser.prototype.hide = function (node, outerChildNodes, outerElement, props, part) {
        bindShowHide(node, takeAttr(node, 'hide'), false, outerChildNodes, outerElement, props, part);
    };
    AttributeParser.prototype.cls = function (node, outerChildNodes, outerElement, props, part) {
        $t.replaceClassStore.push(node);
        /*不要删node.removeAttribute('cls');*/
    };
    AttributeParser.prototype['p-main'] = function (node, outerChildNodes, outerElement, props, part) {
        if (part && !part.partMain) {
            part.partMain = node;
        }
    };
    return AttributeParser;
}());
;
var elementParser = new ElementParser;
var attributeParser = new AttributeParser;
function initHTML(arr, outerChildNodes, outerElement, props, part) {
    treeEach(arr, 'childNodes', function (node, step) {
        if (node.nodeType === 8) {
            // try {
            parseComment(node, outerChildNodes, outerElement, props, part);
            // } catch (e) { _catch(e) }
            return 4 /* c_noIn */;
        }
        if (node.nodeType !== 1) {
            return;
        }
        if (node.hasAttribute('async')) {
            parseAsync(node, outerChildNodes, outerElement, props, part);
            return 2 /* c_repeat */;
        }
        if (node.hasAttribute('lazy')) {
            parseLazy(node, outerChildNodes, outerElement, props, part);
            return 4 /* c_noIn */ | 2 /* c_repeat */;
        }
        var uiInfo = getUIInfo(node);
        if (uiInfo) {
            parseUI(node, uiInfo, step, part);
            return 4 /* c_noIn */ | 8 /* c_noRepeat */;
        }
        /*if(isTemplate(node)){
            parseTemp(node);
            return;
        }*/
        if (elementParser.hasOwnProperty(node.nodeName)) {
            /* let ret=*/ return elementParser[node.nodeName](node, outerChildNodes, outerElement, props, part);
        }
        var attrs = slice.call(node.attributes);
        for (var i_43 = 0; i_43 < attrs.length; i_43++) {
            if (attributeParser.hasOwnProperty(attrs[i_43].name)) {
                attributeParser[attrs[i_43].name](node, outerChildNodes, outerElement, props, part);
            }
        }
    });
}
function getParts(childNodes) {
    var child = [];
    var cpn;
    treeEach(childNodes, "childNodes", function (node) {
        if (node.nodeType === 8 && node.__part__) {
            var part = node.__part__;
            if (cpn) {
                if (part === cpn && node.__sign__ === 0) {
                    child.push(part);
                    cpn = undefined;
                }
            }
            else {
                cpn = part;
            }
            return;
        }
        if (cpn) {
            return 4 /* c_noIn */;
        }
    });
    return child;
}
function getService(serviceName) {
    if (!$t.service.hasOwnProperty(serviceName)) {
        $t.xhr.get($t.config.baseServicePath + '/' + (serviceName + '.js').toLowerCase(), false, function (text) {
            $t.service.define(serviceName, text);
        });
    }
    return $t.service[serviceName];
}
/**
 * 可躲过一些js压缩库console.log;
 */
var log = Function('s', 'console.log(s)');
/**
 * 可躲过一些js压缩库debugger;
 */
var bp = Function('debugger');
// function _catch(e, fn?: Function) {
//     if (fn) {
//         fn(e);
//     } else {
//         $t.$error.emit(e);
//     }
// }
// function throwError(err: string) {
//     try {
//         throw new Error('turtle:\n' + err);
//     } catch (e) {
//         _catch(e);
//     }
// }
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
var getNameByURL = (function () {
    var RE1 = /[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    var RE2 = /\.[a-zA-Z\d]+$/;
    return function (url) {
        return url.match(RE1)[0].replace(RE2, '');
    };
}());
var getFileNameByURL = (function () {
    var RE = /[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/;
    return function (url) {
        return url.match(RE)[0];
    };
}());
function appendQueryString(name, value) {
    if (location.search) {
        return location.href + '&' + name + '=' + value;
    }
    else {
        return location.href + '?' + name + '=' + value;
    }
}
var PartParamFilter = (function () {
    function PartParamFilter() {
    }
    PartParamFilter.bool = function (v) {
        return parseBool(v);
    };
    PartParamFilter.intmin = function (v, p) {
        v = parseInt(v);
        p = parseInt(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    };
    PartParamFilter.string = function (v) {
        return '"' + v + '"';
    };
    PartParamFilter.floatmin = function (v, p) {
        v = parseFloat(v);
        p = parseFloat(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    };
    PartParamFilter.int = function (v) {
        return parseInt(v);
    };
    PartParamFilter.float = function (v) {
        return parseFloat(v);
    };
    PartParamFilter.pxtoem = function (v, p) {
        p = parseFloat(p);
        if (isNaN(p)) {
            p = 0;
        }
        return (parseFloat(v) / 16 + p) + 'em';
    };
    PartParamFilter.color = function (v) {
        if (colorRE.test(v)) {
            return v;
        }
        else {
            return 'transparent';
        }
    };
    PartParamFilter.date = function (v, p) {
        var d = new Date(v);
        if (d.toDateString() === 'Invalid Date') {
            d = new Date();
        }
        return dateFormat(p, d);
    };
    PartParamFilter.only = function (v, p) {
        if (p.indexOf(';') === -1) {
            return v;
        }
        var arr = p.split(';'), datas = arr[0].split(','), filter;
        if (arr.length > 0) {
            filter = arr[1];
        }
        else {
            filter = '';
        }
        if (datas.indexOf(v) !== -1) {
            return v;
        }
        else {
            return filter;
        }
    };
    PartParamFilter.udftotrue = function (v) {
        return v === undefined ? true : v;
    };
    PartParamFilter.anytotrue = function (v) {
        return v !== undefined ? true : v;
    };
    PartParamFilter.udftofalse = function (v) {
        return v === undefined ? false : v;
    };
    PartParamFilter.anytofalse = function (v) {
        return v !== undefined ? false : v;
    };
    PartParamFilter.udftonull = function (v) {
        return v === undefined ? null : v;
    };
    PartParamFilter.anytonull = function (v) {
        return v !== undefined ? null : v;
    };
    PartParamFilter.udftoemptystr = function (v) {
        return v === undefined ? "" : v;
    };
    PartParamFilter.anytoemptystr = function (v) {
        return v !== undefined ? "" : v;
    };
    return PartParamFilter;
}());
/// <reference path='../core/EventEmitter.ts'/>
/// <reference path='partcore.ts'/>
/// <reference path='../lib/debughelper.ts'/>
/// <reference path='../main/lib.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='TemplateList.ts'/>
/// <reference path='PartParamFilter.ts'/>
var colorRE = /^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/;
var PartParam = (function () {
    function PartParam(name, hasDefault, filter, filterParam, defaultValue, limitValue) {
        this.name = name;
        this.hasDefault = hasDefault;
        this.filter = filter;
        this.filterParam = filterParam;
        this.defaultValue = defaultValue;
        this.limitValue = limitValue;
    }
    return PartParam;
}());
// class ExtendsPart extends PartBase{
//     constructor(template:PartTemplate,extPart:PartBase|undefined,public props:Object,html:string,outerChildNodes:INodeArray,outerElement:IHTMLCollection){
//         super(template,props,html,outerChildNodes,outerElement);
//         // this.isExtends=true;
//     }
//     to(part:PartBase){
//         /**剪切厡型链 */
//         let proto=part.$.__proto__;
//         this.$.__proto__=proto;
//         part.$.__proto__=this.$;
//         if(this.super){
//             (<ExtendsPart>this.super).to(part);
//         }
//         push.apply(part.store,this.store);
//     }
// }
/// <reference path="PartParam.ts"/>
var memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;
var PartTemplate = (function () {
    function PartTemplate(name, sortPath, path, s, ext) {
        this.name = name;
        this.sortPath = sortPath;
        this.path = path;
        this.Instance = new ArrayEx();
        this.isJSDefine = true;
        this.parts = [];
        this.partName = name.replace(/[\.]/g, "_");
        if (isObject(s)) {
            var obj = s;
            if (!isArray(obj.params)) {
                this.params = new ArrayEx();
            }
            else {
                this.params = obj.params;
            }
            if (!isArray(obj.datas)) {
                this.datas = new ArrayEx();
            }
            else {
                this.datas = obj.datas;
            }
            if (isObject(obj.extends)) {
                this.extends = obj.extends;
            }
            if (isObject(obj.service)) {
                if (!(obj.service instanceof Service)) {
                    this.service = new Service(obj.service);
                }
                else {
                    this.service = obj.service;
                }
            }
            else {
                this.service = new Service();
            }
        }
        else {
            this.params = new ArrayEx();
            this.datas = new ArrayEx();
            this.isJSDefine = false;
            this.service = new Service();
            if (ext) {
                this.extends = ext;
            }
            var start_1 = 0, idx_1 = 0, str = s;
            str.replace(memberRE, function (s0, name, s1, dft, s2, s3, limit, s4, s5, s6, filter, filterParam, index, sSource) {
                var hasDefault;
                if (s1 === "!") {
                    if (s1 !== s3) {
                        dft = limit;
                        limit = "";
                    }
                    hasDefault = true;
                }
                else {
                    hasDefault = false;
                }
                if (filterParam) {
                    filterParam = filterParam.substring(1, filterParam.length - 1);
                }
                idx_1++;
                this.params.push(new PartParam(name, hasDefault, filter, filterParam, dft, limit));
                this.datas.push(sSource.substring(start_1, index));
                start_1 = index + s0.length;
                return '';
            });
            this.datas.push(str.substring(start_1, str.length));
        }
    }
    /*调用render*/
    PartTemplate.prototype.renderIn = function (elem, outerChildNodes, outerElement, props, part, partName, reExtends) {
        var uiNode;
        if (!isArray(outerChildNodes)) {
            outerChildNodes = [];
        }
        if (!isArray(outerElement)) {
            outerElement = [];
        }
        uiNode = $node('ui:render'); //document.createElement("ui:render");
        if (elem) {
            elem.appendChild(uiNode);
        }
        return this.render(uiNode, elem, outerChildNodes, outerElement, props, part, partName, reExtends);
    };
    /*调用render*/
    PartTemplate.prototype.renderBefore = function (elem, outerChildNodes, outerElement, props, part, partName, reExtends) {
        var uiNode;
        if (!isArray(outerChildNodes)) {
            outerChildNodes = [];
        }
        if (!isArray(outerElement)) {
            outerElement = [];
        }
        uiNode = $node('ui:render'); //document.createElement("ui:render");
        if (elem && elem.parentNode) {
            elem.parentNode.insertBefore2(uiNode, elem);
        }
        return this.render(uiNode, elem, outerChildNodes, outerElement, props, part, partName, reExtends);
    };
    /**
     * 渲染dom
     */
    PartTemplate.prototype.render = function (uiNode, that, outerChildNodes, outerElement, props, part, refPartName, reExtends) {
        var ext, attrs, len, html;
        if (!isObject(props)) {
            props = {};
        }
        if (!uiNode) {
            uiNode = $node('ui:render'); //document.createElement("ui:render");
        }
        else {
            setQuestionAtrr(uiNode, outerChildNodes, outerElement, part ? part.props : props, part);
            attrs = uiNode.attributes;
            len = attrs.length;
            for (var i_44 = 0; i_44 < len; i_44++) {
                var name_7 = attrs[0].name;
                if (!props.hasOwnProperty(name_7)) {
                    props[name_7] = attrs[0].value;
                }
                uiNode.removeAttributeNode(attrs[0]);
            }
        }
        html = this.joinDatasByProps(props);
        if (html === undefined) {
            return;
        }
        if (reExtends) {
            ext = getExtends(reExtends, this.sortPath);
        }
        if (!ext) {
            ext = this.extends;
        }
        // if(ext instanceof PartTemplate){
        //     ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
        // }
        // let newPart=new Part(this,ext,props,html,outerChildNodes,outerElement);
        var newPart = new Part(this, props, html, outerChildNodes, outerElement);
        if (refPartName) {
            /**放置到全局引用 */
            KeyArrayHashObjectManage.push($t.parts, refPartName, newPart);
        }
        this.parts.push(newPart);
        if (uiNode.parentNode !== null) {
            //let p=uiNode.parentNode.__domNode__;
            newPart.insertBefore(uiNode);
            removeNode(uiNode);
        }
        return newPart;
    };
    /**由props构建html字符串
     * @param {Object} props
     * */
    PartTemplate.prototype.joinDatasByProps = function (props) {
        var err = [];
        var d = slice.call(this.datas);
        for (var i_45 = 0; i_45 < d.length - 1; i_45 += 2) {
            var v = void 0;
            var p = this.params[i_45 / 2];
            if (props.hasOwnProperty(p.name)) {
                if (p.limitValue) {
                    v = p.limitValue;
                }
                else {
                    v = props[p.name];
                }
            }
            else if (p.hasDefault) {
                v = p.defaultValue;
            }
            else {
                err.push(this.name + '不可缺少' + p.name + '参数');
                v = undefined;
            }
            if (p.filter && PartParamFilter.hasOwnProperty(p.filter)) {
                v = PartParamFilter[p.filter](v, p.filterParam);
            }
            d.splice(i_45 + 1, 0, v);
        }
        if (err.length > 0) {
            if ($t.config.debugMode == 2) {
                alert(err.join('\n'));
            }
            log(err.join('\n'));
            bp();
            return "";
        }
        return d.join('');
    };
    // /*变成别人的扩展*/
    // beExtends(node:INode,that,outerChildNodes:INodeArray,outerElement:IHTMLCollection,props,part):ExtendsPart{
    //     let ext;
    //     if(this.extends instanceof PartTemplate){
    //         ext=this.extends.beExtends(node,that,outerChildNodes,outerElement,props,part);
    //     }
    //     let html=this.joinDatasByProps(props);
    //     return new ExtendsPart(
    //         this,
    //         ext,
    //         props,
    //         execTemplateScript(html,that,outerChildNodes,outerElement,props,part),
    //         outerChildNodes,
    //         outerElement
    //     );
    // }
    PartTemplate.prototype.toDefineString = function () {
        var s = '$this.ui.define("' + this.name + '","' + this.sortPath + '","' + this.path + '",{datas:';
        s += JSON.stringify(this.datas).replace(/<\/script>/g, '</scr"+"ipt>');
        s += ',params:[';
        var params = [];
        var ps = this.params;
        for (var i_46 = 0; i_46 < ps.length; i_46++) {
            var dft = JSON.stringify(ps[i_46].defaultValue);
            var limitValue = JSON.stringify(ps[i_46].limitValue);
            if (limitValue === undefined) {
                limitValue = "";
            }
            else {
                limitValue = ',' + limitValue;
            }
            if (dft === undefined) {
                if (limitValue !== "") {
                    dft = ",undefined";
                }
                else {
                    dft = "";
                }
            }
            else {
                dft = ',' + dft;
            }
            params.push('new $t.UIParam("' + ps[i_46].name + '",' + ps[i_46].hasDefault + ',"' + ps[i_46].filter + '","' + ps[i_46].filterParam + '"' + dft + limitValue + ')');
        }
        s += params.join(',');
        s += '],service:' + this.service.toDefineString();
        s += "});";
        return s;
    };
    PartTemplate.prototype.parseParamsHelp = function (p) {
        var params = this.params;
        for (var i_47 = 0; i_47 < params.length; i_47++) {
            var name_8 = params[i_47].name;
            if (p.hasOwnProperty(name_8)) {
                p[name_8] = p[name_8] || !params[i_47].hasDefault;
            }
            else {
                p[name_8] = !params[i_47].hasDefault;
            }
        }
        if (this.extends) {
            this.extends.parseParamsHelp(p);
        }
    };
    PartTemplate.prototype.getParamsHelp = function () {
        var p = {};
        this.parseParamsHelp(p);
        var arr = [];
        for (var i_48 in p) {
            arr.push({ name: i_48, necessary: p[i_48] });
        }
        return arr;
    };
    return PartTemplate;
}());
/// <reference path='../core/EventEmitterEx.ts'/>
/// <reference path='../lib/ArrayEx.ts'/>
/// <reference path='../lib/TreeEach.ts'/>
/// <reference path='../lib/lib.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path="Server.ts"/>
/// <reference path="PartTemplate.ts"/>
var Part = (function (_super) {
    __extends(Part, _super);
    /**初始化对象 */
    function Part(template, props, html, outerChildNodes, outerElement) {
        var _this = 
        // constructor(public template: PartTemplate, extPart: Part | undefined, public props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection) {
        _super.call(this) || this;
        _this.template = template;
        _this.props = props;
        /** DOM节点存储数组 */
        _this.nodeStore = [];
        //事件管理器
        /**resize事件管理器*/
        _this.$resize = _this.getEventHelper("resize");
        /**init事件管理器 */
        _this.$init = _this.getEventHelper("init");
        /**insert事件管理器 */
        _this.$online = _this.getEventHelper("online");
        /**remove事件管理器 */
        _this.$offline = _this.getEventHelper("offline");
        _this.$ = new Service(template.service);
        _this.partName = template.partName;
        // if(extPart){
        //     /**继承 */
        //     this.__proto__=extPart;   
        // }
        // if(!isUndefined(extPart)){
        //     this.super=extPart;
        // }
        var dom = $DOM(html);
        var nodes = dom.childNodes;
        initHTML(nodes, outerChildNodes, outerElement, props, _this);
        for (var i_49 = nodes.length; i_49 > 0; i_49--) {
            _this.nodeStore.push(dom.removeChild(nodes[0]));
        }
        var name = template.name;
        var begin = $node(name, 8); // document.createComment('<'+name+'>');
        var end = $node('/' + name, 8); //document.createComment('</'+name+'>')
        end.__part__ = begin.__part__ = _this;
        begin.__sign__ = 1;
        end.__sign__ = 0;
        _this.refs = {
            begin: begin,
            end: end
        };
        // this.super=extPart;
        _this.resPath = template.path + '/' + template.name + '.res';
        // let sp:PartBase=this;
        // while(sp.super){
        //     sp=sp.super
        // }
        // this.basePart=sp?sp:this;
        // this.basePart.isInDOM=false;
        initHTML(nodes, outerChildNodes, outerElement, props, _this);
        // if(extPart){
        //     (<ExtendsPart>extPart).to(this);
        // }
        var store = _this.nodeStore;
        store.push.apply(store, nodes);
        for (var i_50 = nodes.length; i_50 > 0; i_50--) {
            dom.removeChild(nodes[0]);
        }
        store.unshift(begin);
        store.push(end);
        _this.$init.emit(_this);
        return _this;
    }
    Object.defineProperty(Part.prototype, "child", {
        /**即时子Part数组 */
        get: function () { return getParts(this.elements); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "elementLength", {
        /**子节点数目 */
        get: function () {
            if (this.isInDOM) {
                return this.nodeStore.length;
            }
            else {
                return 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "elements", {
        /**即时读取子节点 */
        get: function () {
            // if(this.isExtends){
            //     return new ArrayEx<INode>();
            // }
            if (this.isInDOM) {
                try {
                    var elements = new ArrayEx();
                    var node = this.refs.begin.nextSibling;
                    var end = this.refs.end;
                    while (node && node !== end) {
                        elements.push(node);
                        node = node.nextSibling;
                    }
                    return elements;
                }
                catch (e) {
                    // _catch(e);
                    return new ArrayEx();
                }
            }
            if (isArray(this.nodeStore)) {
                return this.nodeStore.slice().splice(1, this.nodeStore.length - 2);
            }
            else {
                return new ArrayEx();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "parent", {
        /**读取父组件 */
        get: function () {
            return getParentPart(this.refs.begin);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "innerHTML", {
        /**读取组件下所有DOM节点 */
        get: function () {
            return nodesToString(this.elements);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "elemParent", {
        /**读取父节点 */
        get: function () {
            return this.refs.begin.parentNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "scopeNodes", {
        get: function () {
            var scopeNodes = [];
            treeEach(this.elements, "children", function (node) {
                if (node.hasOwnProperty("scope")) {
                    scopeNodes.push(node);
                    return 4 /* c_noIn */;
                }
            });
            return scopeNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "size", {
        /**获取组件区块（试验） */
        get: function () {
            if (this.isInDOM) {
                var rects = [];
                var rt = void 0;
                //let recalNode           = document.createElement('div');
                //recalNode.setAttribute('style',"width:0 !important;height:0 !important;margin-left:0 !important;margin-right:0 !important;");
                // insertNodeBefore(this.begin,recalNode);
                // rt=[recalNode.offsetLeft,recalNode.offsetTop];
                // insertNodeBefore(this.end,recalNode);
                // rt.push(recalNode.offsetLeft,recalNode.offsetTop);
                // removeNode(recalNode);
                // rects.push(rt);
                var cs = this.elements;
                var elem = void 0;
                var dom = document.documentElement;
                for (var i_51 = 0; i_51 < cs.length; i_51++) {
                    elem = cs[i_51].valueOf();
                    if (elem.nodeType === 1) {
                        var l = 0, t = 0;
                        var elem2 = elem;
                        while (elem2 !== dom) {
                            t += elem2.offsetTop;
                            l += elem2.offsetLeft;
                            elem2 = elem2.parentNode;
                        }
                        rects.push([l, t, elem.offsetWidth, elem.offsetHeight]);
                    }
                }
                var rect = { left: 0x7fffffff, top: 0x7fffffff, width: 0, height: 0, right: 0, bottom: 0 };
                for (var i_52 = 0; i_52 < rects.length; i_52++) {
                    rt = rects[i_52];
                    if (rt[0] < rect.left) {
                        rect.left = rt[0];
                    }
                    if (rt[1] < rect.top) {
                        rect.top = rt[1];
                    }
                    var right = rt[0] + rt[2];
                    var bottom = rt[1] + rt[3];
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
            }
            else {
                return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };
            }
        },
        /**设置组件宽高
         * @param {ClientRect} rect 区块
        */
        set: function (rect) {
            if (this.refs.resize) {
                var style = this.refs.resize.style;
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
        },
        enumerable: true,
        configurable: true
    });
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
    Part.prototype.toString = function () {
        return this.template.partName + ":" + JSON.stringify(this.props);
    };
    Part.prototype.treeDiagram = function (tabSpace) {
        if (tabSpace === undefined) {
            tabSpace = 0;
        }
        var s = "\r\n" + new Array(tabSpace + 1).join(" ") + this.toString();
        var child = this.child;
        for (var i_53 = 0; i_53 < child.length; i_53++) {
            s += child[i_53].treeDiagram(tabSpace + 8);
        }
        return s;
    };
    Part.prototype.insertTo = function (elem) {
        if (this.isInDOM) {
            var elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            /*cut scope*/
            var scopeNodes = this.scopeNodes;
            for (var i_54 = 0; i_54 < scopeNodes.length; i_54++) {
                DOMScope.unlink(scopeNodes[i_54].__scope__);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (var i_55 = 0; i_55 < scopeNodes.length; i_55++) {
                DOMScope.link(scopeNodes[i_55].__scope__, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            appendNodes(this.nodeStore, elem);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i_56 = 0; i_56 < scopeNodes.length; i_56++) {
                DOMScope.link(scopeNodes[i_56].__scope__, elem);
            }
            this.$online.emit(this, elem);
            this.isInDOM = true;
        }
    };
    Part.prototype.insertBefore = function (elem) {
        if (this.isInDOM) {
            var elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            /*cut scope*/
            var scopeNodes = this.scopeNodes;
            for (var i_57 = 0; i_57 < scopeNodes.length; i_57++) {
                DOMScope.unlink(scopeNodes[i_57].__scope__);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (var i_58 = 0; i_58 < scopeNodes.length; i_58++) {
                DOMScope.link(scopeNodes[i_58].__scope__, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            insertNodesBefore(elem, this.nodeStore);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i_59 = 0; i_59 < scopeNodes.length; i_59++) {
                DOMScope.link(scopeNodes[i_59].__scope__, elem);
            }
            this.$online.emit(this, elem);
        }
    };
    Part.prototype.remove = function () {
        if (this.isInDOM) {
            var elems = this.elements;
            elems.unshift(this.refs.begin);
            elems.push(this.refs.end);
            var scopeNodes = this.scopeNodes;
            /*cut scope*/
            for (var i_60 = 0; i_60 < scopeNodes.length; i_60++) {
                DOMScope.unlink(scopeNodes[i_60].__scope__);
            }
            var p = this.refs.begin.parentNode;
            if (p !== null) {
                for (var i_61 = 0; i_61 < elems.length; i_61++) {
                    p.removeChild(elems[i_61]);
                }
            }
            this.nodeStore = elems;
            // this.basePart.isInsert=false;
            this.$offline.emit(this);
            if (this.parent) {
                this.parent.$resize.emit(this);
            }
        }
    };
    return Part;
}(EventEmitterEx));
var ClientHelper = (function () {
    function ClientHelper() {
        this.data = {};
        this.isListen = false;
        this.events = [];
        this.setSizeProperty('onResize', function () {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        });
        this.setSizeProperty('width', function () {
            return document.documentElement.clientWidth;
        });
        this.setSizeProperty('height', function () {
            return document.documentElement.clientHeight;
        });
        this.setSizeProperty('left', function () {
            return document.documentElement.clientLeft;
        });
        this.setSizeProperty('top', function () {
            return document.documentElement.clientTop;
        });
        this.setSizeProperty('right', function () {
            return document.documentElement.clientLeft + document.documentElement.clientWidth;
        });
        this.setSizeProperty('bottom', function () {
            return document.documentElement.clientTop + document.documentElement.clientHeight;
        });
    }
    ClientHelper.prototype.emit = function () {
        for (var i = 0; i < this.events.length; i++) {
            this.events[i]();
        }
    };
    ClientHelper.prototype.setSizeProperty = function (name, fn) {
        this.data[name] = undefined;
        this[name] = function (v) {
            /*此属性用于被绑定*/
            if (this.data[name] === undefined && this.__bind__) {
                if (this.isListen === false) {
                    this.isListen = true;
                    window.addEventListener('resize', this.emit);
                }
                var bind = this.__bind__;
                var getV = function () {
                    this[name] = fn();
                };
                this.data[name] = fn();
                this.events.push(getV);
            }
            if (v) {
                this.data[name] = v;
            }
            return this.data[name];
        };
    };
    return ClientHelper;
}());
var $clientHelper = new ClientHelper;
/// <reference path='../lib/is.ts'/>
var Ready = (function () {
    function Ready() {
        this._isReady = false;
        this.readyFunctions = [];
    }
    Ready.prototype.on = function (fn) {
        if (!isFunction(fn)) {
            return;
        }
        if (this._isReady) {
            fn();
        }
        else {
            this.readyFunctions.push(fn);
        }
    };
    Object.defineProperty(Ready.prototype, "isReady", {
        get: function () {
            return this._isReady;
        },
        set: function (v) {
            this._isReady = v;
            while (this.readyFunctions.length > 0) {
                this.readyFunctions.shift()();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Ready;
}());
/// <reference path="../core/Node.ts"/>
/// <reference path='../part/Part.ts'/>
/// <reference path='../scope/Scope.ts'/>
/// <reference path='ClientHelper.ts'/>
/// <reference path='Ready.ts'/>
/// <reference path='../lib/is.ts'/>
/// <reference path='Config.ts'/>
/// <reference path='lib.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='../lib/Encode.ts'/>
var readyRE = /complete|loaded|interactive/;
function renderTemplate(tp) {
    var sHTML = getTemplate(tp);
    var vDOM = $DOM(sHTML);
    initHTML(vDOM.childNodes);
    if (isFunction(vDOM)) {
        var p = tp.parentNode;
        replaceNodeByNodes(tp, takeChildNodes(vDOM.beDOM()));
        vDOM.__domNode__ = p;
        return;
    }
    replaceNodeByNodes(tp, takeChildNodes(vDOM.beDOM()));
    //vDOM.innerHTML='';
}
var Turtle = (function (_super) {
    __extends(Turtle, _super);
    function Turtle() {
        var _this = _super.call(this) || this;
        // domScope                                =new DOMScope;
        // rootScope                               =new Scope;
        _this.config = new Config;
        _this.T = new TemplateList;
        _this.xhr = new XHR;
        _this.service = new Service;
        _this.store = new Store;
        _this.readyByRenderDocument = new Ready;
        /**error事件管理器*/
        _this.$error = _this.getEventHelper("error");
        _this.parts = {};
        _this.refs = {};
        // private fn                              ={}
        _this.replaceClassStore = [];
        _this.getBind = getBind;
        _this.renderDocument = function () {
            _this.renderDocument.beginTime = new Date();
            var xmps = findTemplates(document.body.children), i, templateXMP = [];
            /*优先处理定义相关的模板*/
            for (i = 0; i < xmps.length; i++) {
                if (isDefine(xmps[i])) {
                    parseDefine(xmps[i]);
                }
                else {
                    templateXMP.push(xmps[i]);
                }
            }
            /*处理逻辑模板*/
            for (i = 0; i < templateXMP.length; i++) {
                renderTemplate(templateXMP[i]);
            }
            replaceCls();
            /*initLink();*/
            _this.renderDocument.endTime = new Date();
        };
        _this.$error.on(function (e) {
            log(e);
            bp();
            alert(e);
        });
        var scriptNode = _this.getScriptNode(), compile = getAttr(scriptNode, 'compile', ""), load = getAttr(scriptNode, 'load', ""), baseuipath = getAttr(scriptNode, 'baseuipath', ""), 
        // isExtend                                                =getAttr(scriptNode,'extend',null),
        compileName = getAttr(scriptNode, 'compilename', ""), compileuilist = getAttr(scriptNode, 'compileuilist', ""), script = scriptNode.innerHTML, compileInfo;
        _this.turtleScriptElement = scriptNode;
        //初始化组件配置
        if (baseuipath) {
            baseUIPath.push(baseuipath.split(";"));
        }
        else {
            baseUIPath.push('{path:"ui",name:"ui"}');
        }
        // if(isExtend){
        //     extend(window,this.fn);
        // }
        //初始化预编译输出路径
        _this.url = scriptNode.getAttribute("src");
        if (compile !== "") {
            if (getQueryString("turtle_nocompile") != "1") {
                _this.xhr.get(scriptNode.src + '.setup', false, function (text) {
                    // try{
                    compileInfo = exec('(' + text + ')');
                    // }catch(e){
                    //     _catch(e);
                    // }
                });
            }
            _this.isCompile = true;
        }
        //预加载依赖项
        if (load) {
            var loads_1 = load.split(",");
            var i_62 = 0;
            var fnLoad_1 = function () {
                i_62++;
                if (i_62 < loads_1.length) {
                    includeJSFiles(loads_1[i_62], fnLoad_1);
                }
                else {
                    if (compileInfo && compileInfo.isOn && compileInfo.url) {
                        _this.r1(scriptNode, compileuilist, compileName, compileInfo, compile);
                    }
                    else {
                        _this.r2();
                    }
                }
            };
            includeJSFiles(loads_1[0], fnLoad_1);
        }
        else {
            if (compileInfo && compileInfo.isOn && compileInfo.url) {
                _this.r1(scriptNode, compileuilist, compileName, compileInfo, compile);
            }
            else {
                _this.r2();
            }
        }
        if (script.length > 0) {
            execScript(scriptNode);
        }
        return _this;
    }
    Turtle.prototype.getScriptNode = function () {
        return document.scripts[document.scripts.length - 1];
    };
    Object.defineProperty(Turtle.prototype, "rootParts", {
        get: function () {
            var t = getParts(document.body.childNodes);
            Object.defineProperty(t, "treeDiagram", {
                get: function () {
                    var tabSpace = 0;
                    var s = "";
                    for (var i = 0; i < t.length; i++) {
                        s += t[i].treeDiagram(tabSpace + 2);
                    }
                    return s;
                }
            });
            return t;
        },
        enumerable: true,
        configurable: true
    });
    Turtle.prototype.emitResize = function () {
        var parts = this.rootParts;
        for (var i = 0; i < parts.length; i++) {
            parts[i].$resize.emit(parts[i]);
        }
    };
    Turtle.prototype.r1 = function (scriptNode, compileuilist, compileName, compileInfo, compile) {
        this.ready(function () {
            this.compileDocument(scriptNode, compileuilist, function (html, compileJS, importScripts) {
                if (compileName === "") {
                    compileName = getNameByURL(getFileNameByURL(location.href));
                    if (/\./.test(compileName)) {
                        compileName = compileName.split('.')[0];
                    }
                    console.log('未提供compileName，自动设置为“' + compileName + '”');
                }
                var url = compileInfo.url + "?htmlName=" + compileName;
                var b = document.body;
                b.innerHTML = '<div style="background-color:#fff;position:absolute;left:0;right:0;bottom:0;top:0;">开始编译页面</div>';
                var c = b.children[0];
                switch (compile) {
                    case 'onlyBody':
                        html = '<xmp><script>' + importScripts + '</script></xmp>' + html.match(/(<body[\s\S]*?>)([\s\S]*?)(<\/body>)/)[2];
                        break;
                }
                this.xhr.post(url, html, false, function (text) {
                    var br = document.createElement('br');
                    var sec = document.createElement('span');
                    var timeout = 1000;
                    sec.innerHTML = "?";
                    sec.style.color = "#f00";
                    c.appendChild(br);
                    c.appendChild(br.cloneNode());
                    c.appendChild(document.createTextNode('刷新页面剩余时间：'));
                    c.appendChild(sec);
                    c.appendChild(br.cloneNode());
                    c.appendChild(br.cloneNode());
                    c.appendChild(document.createTextNode(text));
                    for (var i_63 = 0; i_63 < compileJS.length; i_63++) {
                        var url_1 = compileInfo.url + "?uiName=" + compileJS[i_63].name + "&uiPath=" + compileJS[i_63].path;
                        this.xhr.post(url_1, compileJS[i_63].script, false, function (text) {
                            c.appendChild(br.cloneNode());
                            c.appendChild(document.createTextNode(text));
                        });
                    }
                    setTimeout(function () {
                        window.location.href = appendQueryString("turtle_nocompile", "1");
                    }, timeout);
                    setInterval(function () {
                        timeout = timeout - 100;
                        sec.innerHTML = '' + timeout / 1000;
                    }, 100);
                });
            });
        });
    };
    Turtle.prototype.r2 = function () {
        var _this = this;
        this.ready(function () {
            _this.renderDocument();
            _this.readyByRenderDocument.isReady = true;
            _this.emitResize();
        });
    };
    Turtle.prototype.ready = function (fn) {
        var _this = this;
        if (this.readyByRenderDocument.isReady || (readyRE.test(document.readyState) && document.body !== null)) {
            fn();
        }
        else {
            var onLoaded_1 = function () {
                if (document.body !== null) {
                    window.removeEventListener('DOMContentLoaded', onLoaded_1);
                    clearInterval(tid);
                    fn();
                }
            };
            var tid = setInterval(function () {
                if (_this.readyByRenderDocument.isReady || (readyRE.test(document.readyState) && document.body !== null)) {
                    clearInterval(tid);
                    window.removeEventListener('DOMContentLoaded', onLoaded_1);
                    fn();
                }
            }, 10);
            window.addEventListener('DOMContentLoaded', onLoaded_1, false);
        }
        return this;
    };
    return Turtle;
}(EventEmitterEx));
/// <reference path='./main/Turtle.ts'/>
if (!$DOM) {
    $DOM = function (html) {
        var elem = document.createElement('ui:dom');
        elem.innerHTML = html;
        return elem;
    };
    $node = function (name, nodeType) {
        switch (nodeType) {
            case 3:
                return document.createTextNode(name);
            case 8:
                return document.createComment(name);
            case 1:
            case undefined:
                return document.createElement(name);
            case 10:
                return null;
            default:
                return null;
        }
    };
}
var turtle = $t = new Turtle();
