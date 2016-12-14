var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
        for (var i = 0; i < l; i++) {
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
    for (var i = 0; i < nodes.length; i++) {
        parent.insertBefore2(nodes[i], node);
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
    for (var i = l1 + 1; i < l2; i++) {
        nodes.push(p1.childNodes[i].cloneNode(true));
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
    for (var i = l1; i < l2; i++) {
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
    for (var i = length; i > 0; i--) {
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
    for (var i = l1; i < l2; i++) {
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
            for (var i = 0, l = listeners.length; i < l; i++) {
                listeners[i].apply(this, args);
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
            var i = list.indexOf(listener);
            if (i < 0)
                return this;
            list.splice(i, 1);
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
/// <reference path='TemplateList.ts'/>
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(serv) {
        var _this = _super.call(this) || this;
        _this.__defineCallbacks__ = new ArrayEx();
        if (isObject(serv)) {
            for (var i in serv) {
                _this[i] = serv[i];
                _this.emit(i, _this[i]);
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
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                fns.push('"' + i + '":' + this[i].toString());
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
var PartParamFilter;
(function (PartParamFilter) {
    var colorRE = /^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/;
    function bool(v) {
        return parseBool(v);
    }
    PartParamFilter.bool = bool;
    function intmin(v, p) {
        v = parseInt(v);
        p = parseInt(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    }
    PartParamFilter.intmin = intmin;
    function string(v) {
        return '`' + v + '`';
    }
    PartParamFilter.string = string;
    function floatmin(v, p) {
        v = parseFloat(v);
        p = parseFloat(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    }
    PartParamFilter.floatmin = floatmin;
    function int(v) {
        return parseInt(v);
    }
    PartParamFilter.int = int;
    function float(v) {
        return parseFloat(v);
    }
    PartParamFilter.float = float;
    function pxtoem(v, p) {
        p = parseFloat(p);
        if (isNaN(p)) {
            p = 0;
        }
        return (parseFloat(v) / 16 + p) + 'em';
    }
    PartParamFilter.pxtoem = pxtoem;
    function color(v) {
        if (colorRE.test(v)) {
            return v;
        }
        else {
            return 'transparent';
        }
    }
    PartParamFilter.color = color;
    function date(v, p) {
        var d = new Date(v);
        if (d.toDateString() === 'Invalid Date') {
            d = new Date();
        }
        return dateFormat(p, d);
    }
    PartParamFilter.date = date;
    function only(v, p) {
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
    }
    PartParamFilter.only = only;
    /**undefined to true */
    function udftotrue(v) {
        return v === undefined ? true : v;
    }
    PartParamFilter.udftotrue = udftotrue;
    /**any to true */
    function anytotrue(v) {
        return v !== undefined ? true : v;
    }
    PartParamFilter.anytotrue = anytotrue;
    /**undefined to false */
    function udftofalse(v) {
        return v === undefined ? false : v;
    }
    PartParamFilter.udftofalse = udftofalse;
    /**any to false */
    function anytofalse(v) {
        return v !== undefined ? false : v;
    }
    PartParamFilter.anytofalse = anytofalse;
    /**undefined to null */
    function udftonull(v) {
        return v === undefined ? null : v;
    }
    PartParamFilter.udftonull = udftonull;
    /**any to null */
    function anytonull(v) {
        return v !== undefined ? null : v;
    }
    PartParamFilter.anytonull = anytonull;
    function udftoemptystr(v) {
        return v === undefined ? "" : v;
    }
    PartParamFilter.udftoemptystr = udftoemptystr;
    function anytoemptystr(v) {
        return v !== undefined ? "" : v;
    }
    PartParamFilter.anytoemptystr = anytoemptystr;
})(PartParamFilter || (PartParamFilter = {}));
/// <reference path='PartParamFilter.ts'/>
var PartParam = (function () {
    function PartParam(name) {
        this.name = name;
    }
    return PartParam;
}());
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
            for (var i = 0; i < len; i++) {
                var name_1 = attrs[0].name;
                if (!props.hasOwnProperty(name_1)) {
                    props[name_1] = attrs[0].value;
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
        for (var i = 0; i < d.length - 1; i += 2) {
            var v = void 0;
            var p = this.params[i / 2];
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
            d.splice(i + 1, 0, v);
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
        for (var i = 0; i < ps.length; i++) {
            var dft = JSON.stringify(ps[i].defaultValue);
            var limitValue = JSON.stringify(ps[i].limitValue);
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
            params.push('new $t.UIParam("' + ps[i].name + '",' + ps[i].hasDefault + ',"' + ps[i].filter + '","' + ps[i].filterParam + '"' + dft + limitValue + ')');
        }
        s += params.join(',');
        s += '],service:' + this.service.toDefineString();
        s += "});";
        return s;
    };
    PartTemplate.prototype.parseParamsHelp = function (p) {
        var params = this.params;
        for (var i = 0; i < params.length; i++) {
            var name_2 = params[i].name;
            if (p.hasOwnProperty(name_2)) {
                p[name_2] = p[name_2] || !params[i].hasDefault;
            }
            else {
                p[name_2] = !params[i].hasDefault;
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
        for (var i in p) {
            arr.push({ name: i, necessary: p[i] });
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
/// <reference path="View.ts"/>
var Part = (function (_super) {
    __extends(Part, _super);
    /**初始化对象 */
    function Part(template, props, outerChildNodes, outerElement) {
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
        var nodes = _this.dom.tops;
        initHTML(nodes, outerChildNodes, outerElement, props, _this);
        for (var i = nodes.length; i > 0; i--) {
            _this.nodeStore.push(nodes[0]);
        }
        var name = template.name;
        var begin = $$$(name, ENodeType.Comment); // document.createComment('<'+name+'>');
        var end = $$$('/' + name, ENodeType.Comment); //document.createComment('</'+name+'>')
        end.vmData.part = begin.vmData.part = _this;
        begin.vmData.sign = 1;
        end.vmData.sign = 0;
        // end.__part__ = begin.__part__ = this;
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
        // initHTML(nodes, outerChildNodes, outerElement, props, this);
        // if(extPart){
        //     (<ExtendsPart>extPart).to(this);
        // }
        var store = _this.nodeStore;
        push.apply(store, nodes);
        // for (let i = nodes.length; i > 0; i--) {
        //     dom.removeChild(nodes[0]);
        // }
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
                    var elements = [];
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
                    return [];
                }
            }
            if (isArray(this.nodeStore)) {
                return this.nodeStore.slice().splice(1, this.nodeStore.length - 2);
            }
            else {
                return [];
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
                for (var i = 0; i < cs.length; i++) {
                    elem = cs[i].valueOf();
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
                for (var i = 0; i < rects.length; i++) {
                    rt = rects[i];
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
        for (var i = 0; i < child.length; i++) {
            s += child[i].treeDiagram(tabSpace + 8);
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
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].__scope__);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].__scope__, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            appendNodes(this.nodeStore, elem);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].__scope__, elem);
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
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].__scope__);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].__scope__, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            insertNodesBefore(elem, this.nodeStore);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.link(scopeNodes[i].__scope__, elem);
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
            for (var i = 0; i < scopeNodes.length; i++) {
                DOMScope.unlink(scopeNodes[i].__scope__);
            }
            var p = this.refs.begin.parentNode;
            if (p !== null) {
                for (var i = 0; i < elems.length; i++) {
                    p.removeChild(elems[i]);
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
var Config = (function () {
    function Config() {
        this.baseUIPath = baseUIPath;
        this.baseServicePath = 'service';
        this.debugMode = 2;
    }
    return Config;
}());
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
        for (var i in arr) {
            this[arr[i]] = defaultValue;
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
                _this.renderTemplate(templateXMP[i]);
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
            var i_1 = 0;
            var fnLoad_1 = function () {
                i_1++;
                if (i_1 < loads_1.length) {
                    includeJSFiles(loads_1[i_1], fnLoad_1);
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
    Turtle.prototype.renderTemplate = function (tp) {
        var sHTML = getTemplate(tp);
        var vDOM = VDOM(sHTML);
        var vDOMs;
        if (isArray(vDOM)) {
            vDOMs = vDOM;
        }
        else {
            vDOMs = [vDOM];
            vDOM.beDOM;
        }
        initHTML(vDOMs);
        // if(isFunction(vDOM)){
        var p = tp.parentNode;
        var doms = [];
        for (var _i = 0, vDOMs_1 = vDOMs; _i < vDOMs_1.length; _i++) {
            var node = vDOMs_1[_i];
            doms.push(node.beDOM());
        }
        replaceNodeByNodes(tp, doms);
        // vDOM.__domNode__=p;debugger;
        // return;   
        // }
        // replaceNodeByNodes(tp,takeChildNodes(vDOM.beDOM()));
        //vDOM.innerHTML='';
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
                    for (var i = 0; i < compileJS.length; i++) {
                        var url_1 = compileInfo.url + "?uiName=" + compileJS[i].name + "&uiPath=" + compileJS[i].path;
                        this.xhr.post(url_1, compileJS[i].script, false, function (text) {
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
// if(!$DOM){
//     $DOM=function(html){
//         var elem=document.createElement('ui:dom');elem.innerHTML=html;return elem;
//     }
//     $node=<any>function(name:string,nodeType?:number):INode|null{
//         switch(nodeType){
//             case 3:
//                 return <any>document.createTextNode(name);
//             case 8:
//                 return <any>document.createComment(name);
//             case 1:
//             case undefined:
//                 return <any>document.createElement(name);
//             case 10:
//                 return null;
//             default:
//                 return null;
//         }
//     };
// }
var turtle = $t = new Turtle();
