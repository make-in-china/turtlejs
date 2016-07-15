var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $t, $client, $DOM, $INode, $VDOM, $VNode, $node, VTemplate;
/// <reference path="global.ts" />
var $Event = (function () {
    function $Event() {
        this.eventsCol = {};
    }
    $Event.prototype.on = function (name, fn) {
        var lst;
        if (this.eventsCol.hasOwnProperty(name)) {
            lst = this.eventsCol[name];
        }
        else {
            lst = [];
            this.eventsCol[name] = lst;
        }
        lst.push(fn);
    };
    $Event.prototype.off = function (name, fn) {
        var lst;
        if (this.eventsCol.hasOwnProperty(name)) {
            lst = this.eventsCol[name];
            lst.forEach(function (item, index, array) {
                if (item == fn) {
                    lst.splice(index);
                }
            });
            return true;
        }
        else {
            return false;
        }
    };
    $Event.prototype.emit = function (name, event) {
        var lst;
        if (this.eventsCol.hasOwnProperty(name)) {
            lst = this.eventsCol[name];
            for (var i = 0; i < lst.length; i++) {
                lst[i](event);
            }
        }
    };
    $Event.prototype.events = function (name) {
        if (this.eventsCol.hasOwnProperty(name)) {
            return this.eventsCol[name];
        }
    };
    return $Event;
}());
/// <reference path="global.ts" />
/// <reference path="$Event.ts"/>
var ArrayEx = (function (_super) {
    __extends(ArrayEx, _super);
    function ArrayEx() {
        _super.apply(this, arguments);
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
var exec = eval, toStr = Object.prototype.toString, arrayPrototype = Array.prototype, Objectprototype = Object.prototype, slice = arrayPrototype.slice, push = arrayPrototype.push, splice = arrayPrototype.splice, getPrototypeOf = Object.getPrototypeOf, replace = String.prototype.replace, persentRE = /^\s*([\d.]+)%\s*$/, camelCaseRE = /-(\w)/g, camelizeRE = /-+(.)?/g, deCamelizeRE = /[A-Z]/g, classSplitRE = /\s+/g, addStyleRE = /;\s*$/, addClassNameRE = /\s+$/, rte = new $Event;
/**
 * 压缩js后保留此函数用于console.log;
 */
var log = Function('s', 'console.log(s)');
/**
 * 压缩js后保留此函数用于debugger;
 */
var bp = Function('debugger');
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
function isObject(a) {
    var type = typeof a;
    return type === 'function' || type === 'object' && !!a;
}
function isFinite(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
}
function isUndefined(a) {
    return a === void 0;
}
var isArray = Array.isArray || function (a) {
    return "[object Array]" === toStr.call(a);
};
function isPersent(s) {
    return persentRE.test(s);
}
function persentToFloat(s) {
    var v = persentRE.exec(s);
    if (v) {
        return parseInt(v[1]) / 100;
    }
}
function isArrayLike(a) { return typeof a.length == 'number'; }
function _catch(e, fn) {
    if (fn) {
        fn(e);
    }
    else {
        rte.emit("error", e);
    }
}
function throwError(err) {
    try {
        throw new Error('turtle:\n' + err);
    }
    catch (e) {
        _catch(e);
    }
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
var HashObject = (function () {
    function HashObject() {
    }
    HashObject.prototype.clean = function () {
        for (var i in this) {
            delete this[i];
        }
    };
    return HashObject;
}());
var KeyArrayObject = (function (_super) {
    __extends(KeyArrayObject, _super);
    function KeyArrayObject() {
        _super.apply(this, arguments);
    }
    KeyArrayObject.prototype.push = function (key, value) {
        if (isArray(key)) {
            for (var i = 0; i < key.length; i++) {
                if (!this.hasOwnProperty(key[i])) {
                    this[key[i]] = new ArrayEx();
                }
                this[key[i]].push(value);
            }
        }
        else {
            if (!this.hasOwnProperty(key)) {
                this[key] = new ArrayEx();
            }
            this[key].push(value);
        }
    };
    KeyArrayObject.prototype.getKeyArray = function () {
        var arr = new ArrayEx();
        for (var i in this) {
            if (!this.hasOwnProperty(i)) {
                arr.push(this[i]);
            }
        }
        return arr;
    };
    KeyArrayObject.prototype.pop = function (key) {
        var keyObject = this[key];
        if (keyObject) {
            return keyObject.pop();
        }
    };
    return KeyArrayObject;
}(HashObject));
function newKeyArrayObject(type) {
    return create(type, KeyArrayObject);
}
function newHashObject(type) {
    return create(type, HashObject);
}
function create(type, tsClass) {
    var s = 'let ' + type + '=function(){};';
    if (isObject((tsClass).prototype)) {
        s += type + '.prototype=proto;';
    }
    s += 'return new ' + type + '();';
    return Function('proto', s)(tsClass.prototype);
}
var newArrayObject = (function () {
    return function (type) {
        return create(type, ArrayEx);
    };
}());
function NullValueHash(s) {
    var arr = s.split(',');
    for (var i in arr) {
        this[arr[i]] = null;
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
function replaceClass(sel, a, b) { if (sel && a && b)
    sel.className = sel.className.replace(a, b); }
function toggleClass(sel, a, t, f) {
    if (sel && a)
        if (sel.className.indexOf(a) >= 0) {
            sel.className = sel.className.replace(a, "");
            if (f)
                f();
        }
        else {
            sel.className += " " + a;
            if (t)
                t();
        }
}
function removeItem(arr, obj) {
    var index = arr.indexOf(obj);
    if (index != -1) {
        arr.splice(index, 1);
    }
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
function camelCase(s) {
    return s.replace(camelCaseRE, function (s, s1) {
        return s1.toUpperCase();
    });
}
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
function insertNode(node, childNode) {
    var parent = node.parentNode;
    if (parent == null)
        return 0;
    parent.insertBefore2(childNode, node);
    return 0;
}
function deepClone(node) {
    var n = node.cloneNode();
    var ns = node.childNodes;
    for (var i = 0; i < ns.length; i++) {
        n.appendChild(deepClone(ns[i]));
    }
    return n;
}
function cloneBetween(node1, node2) {
    var nodes = [];
    var l1 = getNodeIndex2(node1);
    var l2 = getNodeIndex2(node2);
    var p1 = node1.parentNode;
    for (var i = l1 + 1; i < l2; i++) {
        nodes.push(deepClone(p1.childNodes[i]));
    }
    return nodes;
}
function removeBlockBetween(node1, node2) {
    var p1 = node1.parentNode;
    var l1 = getNodeIndex2(node1) + 1;
    var l2 = getNodeIndex2(node2);
    for (var i = l1; i < l2; i++) {
        p1.removeChild(p1.childNodes[l1]);
    }
}
function replaceNodeByNode(node, node2) {
    var parent = node.parentNode;
    if (parent == null) {
        return;
    }
    insertNode(node, node2);
    parent.removeChild(node);
}
function appendNodes(nodes, parent) {
    var c = slice.call(nodes);
    for (var i = 0; i < c.length; i++) {
        parent.appendChild(c[i]);
    }
}
function takeChildNodes(node) {
    var c = node.childNodes;
    var length = c.length;
    var ret = [];
    for (var i = length; i > 0; i--) {
        ret.push(node.removeChild(c[0]));
    }
    return ret;
}
function takeOutChildNodes(node) {
    var parent = node.parentNode;
    if (parent == null) {
        return 0;
    }
    var c = node.childNodes;
    var i = 0;
    for (var j = c.length - 1; j > -1; j--) {
        parent.insertBefore2(node.removeChild(c[0]), node);
    }
    parent.removeChild(node);
    return i;
}
function takeBlockBetween(node1, node2) {
    var p1 = node1.parentNode;
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
    node = node.nextSibling;
    while (node != null) {
        node = node.nextSibling;
        index++;
    }
    return index;
}
function getNodeIndex2(node) {
    var index = 0;
    node = node.previousSibling;
    while (node != null) {
        node = node.previousSibling;
        index++;
    }
    return index;
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
function treeEach(array, property, fn, beginIndex) {
    if (beginIndex === void 0) { beginIndex = 0; }
    if (!isArrayLike(array)) {
        return;
    }
    var arr = array, i = beginIndex, stack = [], obj, obj2, state, step = { next: 1 };
    while (true) {
        if (i < arr.length) {
            obj = arr[i];
            step.next = 1;
            state = fn(obj, step);
            if (state == undefined) {
                state = 0;
            }
            else if (state == 1 /* c_stopEach */) {
                break;
            }
            obj2 = arr[i];
            if (obj2 && obj2 != obj && !(8 /* c_noRepeat */ & state)) {
                state = state | 2 /* c_repeat */;
            }
            if (obj2 && obj2[property] && obj2[property].length > 0 && !(state & 4 /* c_noIn */) && property) {
                stack.push(arr);
                stack.push(i + (state & 2 /* c_repeat */ ? 0 : step.next));
                i = 0;
                arr = obj2[property];
            }
            else {
                i += (state & 2 /* c_repeat */ ? 0 : step.next);
            }
        }
        else if (stack.length > 0) {
            i = stack.pop();
            arr = stack.pop();
        }
        else {
            break;
        }
    }
    return { stack: stack, state: state, array: arr, index: i };
}
/**浏览器兼容 */
var ClassList = (function () {
    function ClassList(__elem__) {
        this.__elem__ = __elem__;
    }
    ClassList.prototype.add = function (value) {
        var classes = this.__elem__.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (!~index) {
            classes.push(value);
            this.__elem__.className = classes.join(' ');
        }
    };
    ClassList.prototype.remove = function (value) {
        var classes = this.__elem__.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
            this.__elem__.className = classes.join(' ');
        }
    };
    ClassList.prototype.toggle = function (value) {
        var classes = this.__elem__.className.split(classSplitRE);
        var index = classes.indexOf(value);
        if (~index) {
            classes.splice(index, 1);
        }
        else {
            classes.push(value);
        }
        this.__elem__.className = classes.join(' ');
    };
    ClassList.prototype.contains = function (value) {
        return !!~this.__elem__.className.split(classSplitRE).indexOf(value);
    };
    ClassList.prototype.item = function (i) {
        return this.__elem__.className.split(classSplitRE)[i] || null;
    };
    return ClassList;
}());
function defineClassList(object) {
    Object.defineProperty(object, 'classList', {
        enumerable: true,
        configurable: true,
        get: function () {
            if (this.__classList__) {
                return this.__classList__;
            }
            else {
                Object.defineProperty(this, '__classList__', {
                    writable: false,
                    enumerable: false,
                    configurable: false,
                    value: new ClassList(this)
                });
                return this.__classList__;
            }
        }
    });
}
var withthis = 'with(this){return eval($$turtle$$)};' /*eval支持返回最后一个表达式的值*/, _execValueByScope = Function('$$turtle$$,v,node,outer,outerElement,props,part', withthis), _execByScope = Function('$$turtle$$,node,outer,outerElement,props,part', withthis), _execExpressionsByScope = Function('$$turtle$$,v,node', withthis);
function execValueByScope(node, s, v, scope, outerChildNodes, outerElement, props, part) {
    return _execValueByScope.call(getScopeBy(scope, node), s, v, node, outerChildNodes, outerElement, props, part);
}
var execTemplateScript = (function () {
    var replaceRE = /{%.+?%}/g;
    return function (s, node, outerChildNodes, outerElement, props, part) {
        s = s.replace(replaceRE, function (s) {
            return execByScope(node, s.substring(2, s.length - 2), null, outerChildNodes, outerElement, props, part);
        });
        return s;
    };
}());
/// <reference path="core.ts"/>
/// <reference path="Execute.ts"/>
function _getBindObject(scope, arrNames) {
    var i, obj, length = arrNames.length;
    ;
    while (scope) {
        obj = scope;
        for (i = 0; i < length; i++) {
            if (obj.hasOwnProperty(arrNames[i])) {
                if (i < length - 1) {
                    obj = obj[arrNames[i]];
                    continue;
                }
                else {
                    return obj;
                }
            }
        }
        scope = scope.__parent__;
    }
    obj = window[arrNames[0]];
    if (obj) {
        for (i = 1; i < length; i++) {
            if (obj.hasOwnProperty(arrNames[i])) {
                if (i < length - 1) {
                    obj = obj[arrNames[i]];
                    continue;
                }
                else {
                    return obj;
                }
            }
        }
    }
    return null;
}
function addBindInfo(obj, name, target, targetName, event) {
    var bindInfoHash = obj.__bind__;
    if (!bindInfoHash) {
        bindInfoHash = [];
        obj.__bind__ = bindInfoHash;
    }
    bindInfoHash.push({ name: name, target: target, targetName: targetName, event: event });
}
function removeBind(obj, name, targetName) {
    if (!obj.__bind__)
        return false;
    var bindInfoHash = obj.__bind__;
    for (var i in bindInfoHash) {
        if (bindInfoHash[i].name === name && bindInfoHash[i].targetName === targetName) {
            if (bindInfoHash.length == 1) {
                bindInfoHash.length = 0;
                delete obj.__bind__;
            }
            else {
                bindInfoHash.splice(i, 1);
            }
            return true;
        }
    }
    return false;
}
function onPropertyChange(obj, name, fnOnSet) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    if (!desc)
        return;
    if (desc.configurable === false)
        throwError('绑定失败：原属性' + name + '替换失败');
    if (desc.writable === false)
        throwError('绑定失败：原属性' + name + '不可写');
    delete obj[name];
    var newProperty = { enumerable: desc.enumerable, configurable: true };
    var value;
    if (desc.hasOwnProperty('value')) {
        var _value_1 = desc.value;
        if (isFunction(_value_1)) {
            newProperty.get = function () {
                return _value_1.call(this, value);
            };
            newProperty.set = function (newValue) {
                value = newValue;
                _value_1.call(this, value);
                fnOnSet.call(obj, name);
            };
        }
        else {
            newProperty.get = function () {
                return _value_1;
            };
            newProperty.set = function (newValue) {
                _value_1 = newValue;
                fnOnSet.call(obj, name);
            };
        }
    }
    else {
        if (desc.hasOwnProperty('get')) {
            var _get_1 = desc.get;
            newProperty.get = function () {
                return _get_1.call(this);
            };
        }
        if (desc.hasOwnProperty('set')) {
            var _set_1 = desc.set;
            newProperty.set = function (newValue) {
                _set_1.call(this, newValue);
                fnOnSet.call(obj, name);
            };
        }
    }
    Object.defineProperty(obj, name, newProperty);
    desc = null;
}
function objectPropertyChange(obj, name, fnOnSet) {
    if (obj.hasOwnProperty(name)) {
        onPropertyChange(obj, name, fnOnSet);
    }
}
function bindPropertyByName(obj, name, obj2, name2) {
    var t = function (name) {
        if (!t.isBinding) {
            t.isBinding = true;
            for (var i = 0; i < t.list.length; i++) {
                var obj_1 = t.list[i];
                if (obj_1 !== this) {
                    var o = obj_1.__bind__;
                    for (var j in o) {
                        if (o[j].targetName === name) {
                            if (obj_1[o[j].name] != this[name]) {
                                obj_1[o[j].name] = this[name];
                            }
                        }
                    }
                }
            }
            t.isBinding = false;
        }
    };
    t.isBinding = false;
    t.removeObject = function (obj) {
        removeItem(t.list, obj);
    };
    t.list = [obj, obj2];
    addBindInfo(obj, name, obj2, name2, t);
    addBindInfo(obj2, name2, obj, name, t);
    return t;
}
var bindProperty = (function () {
    function getBindInfo(obj, name, targetName) {
        if (!obj.__bind__)
            return;
        var bindInfoHash = obj.__bind__;
        for (var i in bindInfoHash) {
            if (bindInfoHash[i].name === name && bindInfoHash[i].targetName === targetName) {
                return bindInfoHash[i];
            }
        }
    }
    return function (obj, name, obj2, name2, type) {
        var bindInfo1 = getBindInfo(obj, name, name2);
        var bindInfo2 = getBindInfo(obj2, name2, name);
        if (bindInfo1 && bindInfo2 && bindInfo1.event !== bindInfo2.event) {
            throwError("不能混合不同的绑定链");
            return;
        }
        else if (bindInfo1) {
            var e = bindInfo1.event;
            addBindInfo(obj2, name2, obj, name, e);
            e.list.push(obj2);
            if (type != 2) {
                onPropertyChange(obj2, name2, e);
                e.isBinding = true;
                obj2[name2] = obj[name];
                e.isBinding = false;
            }
        }
        else if (bindInfo2) {
            var e = bindInfo2.event;
            addBindInfo(obj, name, obj2, name2, e);
            e.list.push(obj);
            //if(type!=2){
            onPropertyChange(obj, name, e);
            e.isBinding = true;
            obj[name] = obj2[name2];
            e.isBinding = false;
        }
        else {
            var fn = bindPropertyByName(obj, name, obj2, name2);
            onPropertyChange(obj, name, fn);
            if (type != 2) {
                onPropertyChange(obj2, name2, fn);
                fn.isBinding = true;
                obj2[name2] = obj[name];
                fn.isBinding = false;
            }
        }
    };
}());
function bindElementProperty(obj, name, obj2, name2) {
    bindProperty(obj, name, obj2, name2, 2);
}
/*绑定属性与描述*/
function bindNodeProperty(node, proName, condition) {
    var cdtn = splitByOnce(condition, "|"), name, scope, obj, obj2 = node, bindVar = cdtn[0], arrBindVar, exp, name2 = camelCase(proName);
    if (name2.indexOf(".") != -1) {
        name2 = name2.split(".");
        for (var i = 0; i < name2.length - 1; i++) {
            obj2 = obj2[name2[i]];
            if (!obj2)
                return;
        }
        name2 = name2[name2.length - 1];
    }
    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    }
    else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = $t.domScope.get(node);
    obj = _getBindObject(scope, arrBindVar);
    if (obj === null) {
        throwError('不能获取绑定属性:' + cdtn[0]);
        return;
    }
    if (cdtn.length == 2) {
        exp = function (v) {
            obj2[name2] = _execExpressionsByScope(cdtn[1], v, node);
        };
        exp.__me__ = exp;
        bindProperty(obj, name, exp, '__me__');
    }
    else {
        bindElementProperty(obj, name, obj2, name2);
        obj2[name2] = obj[name];
    }
}
/*
    * 绑定标签属性
    */
function bindElementPropertyByName(node, elementValueName, condition) {
    var cdtn = splitByOnce(condition, "|"), name = cdtn[0], arrName, scope, exp, obj;
    if (!name)
        return;
    scope = $t.domScope.get(node);
    if (name.indexOf(".") != -1) {
        arrName = name.split(".");
        obj = _getBindObject(scope, arrName);
        name = arrName[arrName.length - 1];
    }
    else {
        obj = _getBindObject(scope, [name]);
    }
    if (obj === null) {
        throwError('不能获取绑定属性:' + cdtn[0]);
        return;
    }
    if (cdtn.length == 2) {
        exp = function (v) {
            _execExpressionsByScope(cdtn[1], v, node);
        };
        exp.__me__ = exp;
        bindProperty(obj, name, exp, "__me__");
    }
    else {
        if (!node.__bind__)
            node[elementValueName] = obj[name];
        bindProperty(obj, name, node, elementValueName);
    }
}
function bindPropertyByOrder(node, condition) {
    var cdtn = splitByOnce(condition, '|');
    if (cdtn.length < 2)
        return;
    var name, scope, obj, bindVar = cdtn[0], arrBindVar, name2, scope2, obj2, bindVar2 = cdtn[1], arrBindVar2;
    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    }
    else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = $t.domScope.get(node);
    obj = _getBindObject(scope, arrBindVar);
    if (bindVar2.indexOf(".") != -1) {
        arrBindVar2 = bindVar2.split(".");
    }
    else {
        arrBindVar2 = [bindVar2];
    }
    name2 = bindVar2[bindVar2.length - 1];
    scope2 = $t.domScope.get(node);
    obj2 = _getBindObject(scope2, arrBindVar2);
    bindProperty(obj, name, obj2, name2);
    obj2[name2] = obj[name];
}
function bindExpressionsByOrder(node, condition) {
    var cdtn = splitByOnce(condition, '|');
    if (cdtn.length < 2)
        cdtn.push('v');
    var name, scope, obj, bindVar = cdtn[0], arrBindVar, exp, textNode = $node(' ', 3);
    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    }
    else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = $t.domScope.get(node);
    obj = _getBindObject(scope, arrBindVar);
    if (obj === null) {
        throwError('不能获取绑定属性:' + cdtn[0]);
        return;
    }
    exp = function (v) {
        try {
            return _execExpressionsByScope.call(scope, cdtn[1], v, node);
        }
        catch (e) {
            _catch(e);
        }
    };
    exp.__me__ = exp;
    bindProperty(obj, name, exp, '__me__');
    replaceNodeByNode(node, textNode);
    bindElementProperty(exp, '__me__', textNode, 'data');
    textNode['data'] = exp.__me__;
}
/// <reference path='core.ts'/>
var NameItem = (function () {
    function NameItem(name) {
        this.name = name;
    }
    return NameItem;
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
        for (var i in this) {
            if (!this.hasOwnProperty(i)) {
                continue;
            }
            desc = '<' + i.toLowerCase();
            if (this[i].hasOwnProperty("xmp")) {
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
            for (var i in this) {
                if (!this.hasOwnProperty(i)) {
                    continue;
                }
                var item = new NameItem(i.toLowerCase());
                extend(item, this[i]);
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
        for (var i = 0; i < ts.length; i++) {
            var s = '(<' + ts[i].name;
            if (ts[i].hasOwnProperty('xmp')) {
                s += '[\\s\\S]*? +xmp';
            }
            s += "([\\s\\S]*?)>([\\s\\S]*?)<\\/" + ts[i].name + ">";
            s += ')';
            regExes.push(s);
        }
        var re = new RegExp(regExes.join("|"), "g"); //exec(`(/${regExes.join("|")}/g)`);
        return str.match(re);
    };
    return TemplateConfig;
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
            v.length = 0;
            this.paths = {};
            for (var i = 0; i < v.length; i++) {
                if (isString(v[i])) {
                    this.parseUIPath(v[i]);
                }
            }
        }
    };
    BasePath.prototype.parseUIPath = function (s) {
        try {
            var o = exec('(' + s + ')');
            if (isObject(o) && o.hasOwnProperty('name') && o.hasOwnProperty('path')) {
                this.paths[o.name] = o;
                this.push(o);
            }
        }
        catch (e) {
            _catch(e);
        }
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
var templateConfig = new TemplateConfig;
var baseUIPath = new BasePath;
/// <reference path="core.ts"/>
/// <reference path="Execute.ts"/>
/// <reference path="bind.ts"/>
var orderRE = /^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=)(\s|$)/g, orderCaseRE = /^\s?(else if|else|case break|case|default|end)(\s|$)/g, parseForOrderRE = /[a-zA-Z\d] in .*/, parseForOrderRE2 = /^.*;.*;.*$/, SetParseError = function (msg) {
    SetParseError.isError = true;
    alert(msg);
    return 1 /* c_stopEach */;
}, orderStack = new ArrayEx;
SetParseError.isError = false;
function replaceCls() {
    var arr = $t.replaceClassStore;
    for (var i = 0; i < arr.length; i++) {
        var cls = arr[i].getAttribute('cls');
        arr[i].removeAttribute('cls');
        if ($t.defineClassNames[cls]) {
            arr[i].className += ' ' + $t.defineClassNames[cls].join(" ");
        }
    }
    arr.length = 0;
}
function getCommentStringInfo(s) {
    var order = s.match(orderRE);
    if (order) {
        return { order: trim(order[0]), condition: s.substring(order[0].length, s.length) };
    }
    else {
        var orderCase = s.match(orderCaseRE);
        if (orderCase) {
            return { orderCase: trim(orderCase[0]), condition: s.substring(orderCase[0].length, s.length) };
        }
    }
}
var getCommentText = (function () {
    if (Comment.prototype.hasOwnProperty("text")) {
        var commentDataRE_1 = /^<!--([\s\S]*?)-->$/;
        var commentDataRE2_1 = /^<!([\s\S]*?)>$/;
        var commentDataRE3_1 = /^!-?|-?&/;
        return function (node) {
            var s = node.text;
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
function parseScopeOrder(info, node, outerChildNodes, outerElement, props, part) {
    var condition = splitByOnce(info.condition, "|");
    if (condition.length == 2) {
        $t.domScope.create(node, condition[0]);
        execScope(condition[1], node, outerChildNodes, outerElement, props, part);
    }
    else {
        $t.domScope.create(node, condition[0]);
    }
    removeNode(node);
}
function parseCommentOrderNoScript(info, node, outerChildNodes, outerElement, props, part) {
    /*不渲染，纯找结构*/
    switch (info.order) {
        case 'while':
            return parseWhileOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'if':
            return parseIfOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'for':
            return parseForOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'switch':
            return parseSwitchOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'async':
            return parseAsyncOrder(info, node, outerChildNodes, outerElement, props, part);
    }
}
function parseCommentOrderBlock(node, outerChildNodes, outerElement, props, part) {
    var i = getNodeIndex2(node);
    var isError = false;
    var error = function (msg) {
        isError = true;
        alert(msg);
        return 1 /* c_stopEach */;
    };
    return treeEach(node.parentNode.childNodes, 'childNodes', function (node, step) {
        if (node.nodeType != 8)
            return;
        var info = getCommentStringInfo(getCommentText(node));
        if (!info)
            return;
        if (info.order) {
            var ret = parseCommentOrderNoScript(info, node, outerChildNodes, outerElement, props, part);
            if (ret) {
                step.next = ret.index - getNodeIndex2(node) + 1;
            }
            return 8 /* c_noRepeat */ & 4 /* c_noIn */;
        }
        if (info.orderCase == 'end') {
            if (orderStack.length > 0) {
                orderStack.pop().__endNode__ = node;
                return 1 /* c_stopEach */;
            }
            else {
                return error('语法错误：多余的end');
            }
        }
        return 4 /* c_noIn */;
    }, i + 1);
}
function addOrderToNode(node, info, outerChildNodes, outerElement, props, part, fnGetOrder) {
    var order;
    if (!node.order) {
        order = fnGetOrder();
        node.order = order;
        order.name = info.order;
        order.node = node;
        order.endNode = null;
        order.condition = info.condition;
        orderStack.push(order);
        order.parseCommentOrderBlockReturnValue = parseCommentOrderBlock(node, outerChildNodes, outerElement, props, part);
    }
    else {
        order = node.order;
    }
    return order.parseCommentOrderBlockReturnValue;
}
function parseIfOrder(info, node, outerChildNodes, outerElement, props, part) {
    return addOrderToNode(node, info, outerChildNodes, outerElement, props, part, function () {
        var scope = $t.domScope.get(node);
        return {
            endHit: null,
            hit: null,
            hasElse: false,
            run: function () {
                var order = this;
                order.hit = parseBool(execByScope(node, this.condition, scope, outerChildNodes, outerElement, props, part)) ? this.node : null;
                treeEach(node.parentNode.childNodes, 'childNodes', function (node, step) {
                    if (node.nodeType != 8)
                        return;
                    var info = getCommentStringInfo(getCommentText(node));
                    if (!info)
                        return;
                    if (node.__order__) {
                        step.next = getNodeIndex2(node.__order__.__endNode__) - getNodeIndex2(node);
                        return;
                    }
                    switch (info.orderCase) {
                        case 'else':
                        case 'else if':
                            if (!order.hasElse) {
                                if (info.orderCase == 'else') {
                                    order.hasElse = true;
                                }
                                if (!order.endHit) {
                                    if (order.hit) {
                                        order.endHit = node;
                                    }
                                    else {
                                        if (info.orderCase == 'else' || parseBool(execByScope(node, this.condition, scope, outerChildNodes, outerElement, props, part))) {
                                            order.hit = node;
                                        }
                                        else {
                                            /*删除else if*/
                                            removeNode(node);
                                        }
                                    }
                                }
                            }
                            else {
                                return SetParseError('语法错误：else或else if不能出现在else后');
                            }
                            break;
                    }
                }, getNodeIndex2(node) + 1);
                var p = this.node.parentNode;
                if (!this.hit) {
                    /*全部删除*/
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
                else {
                    if (!this.endHit) {
                        this.endHit = this.endNode;
                    }
                    /*保留hit到break之间的内容*/
                    var ns = takeBlockBetween(this.hit, this.endHit);
                    insertNodesBefore(this.node, ns);
                    /*全部删除*/
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
            }
        };
    });
}
function parseBreakOrder(info, node, outerChildNodes, outerElement, props, part) {
    /*删除后面节点,父节点后面节点,父父节点后面节点直至__break__*/
    var _node = node.previousSibling;
    if (!_node)
        _node = node.parentNode;
    removeNode(node);
    var p = _node.parentNode;
    while (_node.nodeName != '__BREAK__') {
        var cs = p.childNodes;
        var length_1 = cs.length;
        var index = getNodeIndex2(_node) + 1;
        for (var i = index; i < length_1; i++) {
            p.removeChild(cs[index]);
        }
        _node = p;
        p = p.parentNode;
    }
    _node.source.onBreak();
}
function parseWhileOrder(info, node, outerChildNodes, outerElement, props, part) {
    return addOrderToNode(node, info, outerChildNodes, outerElement, props, part, function () {
        return {
            run: function () {
                var p = this.node.parentNode;
                if (this.isBreak || !parseBool(execByScope(this.node, this.condition, null, outerChildNodes, outerElement, props, part))) {
                    //全部删除
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
                else {
                    var nodes = cloneBetween(this.node, this.endNode);
                    this.node.parentNode.insertBefore2(createBreakElement(nodes, this), this.node);
                }
            },
            onBreak: function () {
                this.isBreak = true;
            },
            isBreak: false
        };
    });
}
function parseAsyncOrder(info, node, outerChildNodes, outerElement, props, part) {
    return addOrderToNode(node, info, outerChildNodes, outerElement, props, part, function () {
        return {
            run: function () {
                var order = this;
                var ns = takeBlockBetween(this.node, this.endNode);
                var delay = parseInt(this.condition);
                if (delay === NaN) {
                    delay = 0;
                }
                removeNode(this.endNode);
                var mark = $node('async', 8);
                replaceNodeByNode(this.node, mark);
                this.endNode = null;
                this.node = null;
                setTimeout(function () {
                    var elem = $node('div');
                    var p = mark.parentNode;
                    replaceNodeByNode(mark, elem);
                    mark = null;
                    appendNodes(ns, elem);
                    var chds = elem.childNodes;
                    initHTML(chds, outerChildNodes, outerElement, props, part);
                    takeOutChildNodes(elem);
                    elem = null;
                    replaceCls();
                }, delay);
            }
        };
    });
}
function parseSwitchOrder(info, node, outerChildNodes, outerElement, props, part) {
    return addOrderToNode(node, info, outerChildNodes, outerElement, props, part, function () {
        return {
            value: execByScope(node, info.condition, null, outerChildNodes, outerElement, props, part),
            hit: null,
            needBreak: false,
            endHit: null,
            hasDefault: false,
            run: function () {
                var order = this;
                var scope = $t.domScope.get(node);
                treeEach(node.parentNode.childNodes, 'childNodes', function (node, step) {
                    if (node.nodeType != 8)
                        return;
                    var info = getCommentStringInfo(getCommentText(node));
                    if (!info)
                        return;
                    if (node.__order__) {
                        step.next = getNodeIndex2(node.__order__.__endNode__) - getNodeIndex2(node);
                        return;
                    }
                    switch (info.orderCase) {
                        case 'case':
                        case 'case break':
                            if (order.hasDefault) {
                                return SetParseError('语法错误：default后不应出现case/case break');
                            }
                            else if (!order.hit) {
                                var isPass = order.value == execByScope(node, info.condition, scope, outerChildNodes, outerElement, props, part);
                                if (isPass) {
                                    order.hit = node;
                                    node.__order__ = info.orderCase;
                                }
                            }
                            else if (!order.endHit) {
                                order.endHit = node;
                            }
                            break;
                        case 'default':
                            if (order.hasDefault) {
                                return SetParseError('语法错误：多余的default');
                            }
                            else {
                                order.hasDefault = true;
                                if (!order.hit) {
                                    order.hit = node;
                                    node.__order__ = info.orderCase;
                                }
                                else if (!order.endHit) {
                                    order.endHit = node;
                                }
                            }
                            break;
                    }
                }, getNodeIndex2(node) + 1);
                var p = this.node.parentNode;
                if (!this.hit) {
                    /*全部删除*/
                    removeBlockBetween(this.node, node);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
                else {
                    if (!this.endHit) {
                        this.endHit = this.endNode;
                    }
                    //删除hit前的数据
                    removeBlockBetween(this.node, this.hit);
                    //外置hit的数据
                    var ns = takeBlockBetween(this.hit, this.endHit);
                    insertNodesBefore(this.node, ns);
                    removeNode(this.hit);
                    if (this.hit.order === 'case break' /*已终止选择*/ || this.endHit === this.endNode /*已结束*/) {
                        /*全部删除*/
                        removeBlockBetween(this.node, this.endNode);
                        p.removeChild(this.node);
                        p.removeChild(this.endNode);
                    }
                }
                delete this.node.order;
            }
        };
    });
}
function parseForOrder(info, node, outerChildNodes, outerElement, props, part) {
    return addOrderToNode(node, info, outerChildNodes, outerElement, props, part, function () {
        var check;
        if (parseForOrderRE.test(info.condition)) {
            check = (function () {
                var s = info.condition.split(' in '), index = 0, names = [], source;
                return function () {
                    if (!source) {
                        source = execByScope(node, s[1], null, outerChildNodes, outerElement, props, part);
                        if (!source) {
                            return { result: false, params: null };
                        }
                        for (var i in source) {
                            names.push(i);
                        }
                        if (names.length == 0) {
                            return { result: false, params: null };
                        }
                    }
                    if (index < names.length) {
                        execByScope(node, s[0] + '=\'' + names[index] + '\';', null, outerChildNodes, outerElement, props, part);
                        index++;
                        return { result: true, params: null };
                    }
                    else {
                        return { result: false, params: null };
                    }
                };
            }());
        }
        else if (parseForOrderRE2.test(info.condition)) {
            check = (function () {
                var isFirst = true;
                var s = info.condition.split(';');
                if (s.length == 2) {
                    return function () {
                        return { result: false, params: null };
                    };
                }
                return function () {
                    if (isFirst) {
                        isFirst = false;
                        execByScope(node, s[0], null, outerChildNodes, outerElement, props, part);
                    }
                    else {
                        execByScope(node, s[2], null, outerChildNodes, outerElement, props, part);
                    }
                    return { result: execByScope(node, s[1], null, outerChildNodes, outerElement, props, part), params: null };
                };
            }());
        }
        else {
            check = function () {
                return { result: false, params: null };
            };
        }
        return {
            check: check,
            run: function () {
                var p = this.node.parentNode;
                var ret = this.check();
                if (this.isBreak || !ret.result) {
                    //全部删除
                    removeBlockBetween(this.node, this.endNode);
                    p.removeChild(this.node);
                    p.removeChild(this.endNode);
                }
                else {
                    var nodes = cloneBetween(this.node, this.endNode);
                    this.node.parentNode.insertBefore2(createBreakElement(nodes, this), this.node);
                }
            },
            onBreak: function () {
                this.isBreak = true;
            },
            isBreak: false
        };
    });
}
function createBreakElement(nodes, order) {
    var breakElement = $node('__break__');
    for (var i = 0; i < nodes.length; i++) {
        breakElement.appendChild(nodes[i]);
    }
    breakElement.source = order;
    return breakElement;
}
function parseCommentOrder(info, node, outerChildNodes, outerElement, props, part) {
    switch (info.order) {
        case 'scope':
            parseScopeOrder(info, node, outerChildNodes, outerElement, props, part);
            break;
        case 'let':
            execScope(info.condition, node, outerChildNodes, outerElement, props, part);
            removeNode(node);
            break;
        case 'bind':
            bindPropertyByOrder(node, info.condition);
            break;
        case '-':
            bindExpressionsByOrder(node, info.condition);
            break;
        case '!':
            execByScope(node, info.condition, null, outerChildNodes, outerElement, props, part);
            removeNode(node);
            break;
        case '=':
            var v = execByScope(node, info.condition, null, outerChildNodes, outerElement, props, part);
            if (isObject(v) && v.nodeType) {
                replaceNodeByNode(node, v);
            }
            else {
                replaceNodeByNode(node, $node(v, 3));
            }
            break;
        case 'content':
            replaceNodeByNodes(node, outerChildNodes);
            break;
        case 'elements':
            replaceNodeByNodes(node, outerElement);
            break;
        case 'while':
            return parseWhileOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'if':
            return parseIfOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'break':
            return parseBreakOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'for':
            return parseForOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'switch':
            return parseSwitchOrder(info, node, outerChildNodes, outerElement, props, part);
        case 'async':
            return parseAsyncOrder(info, node, outerChildNodes, outerElement, props, part);
    }
}
function parseComment(node, outerChildNodes, outerElement, props, part) {
    var info = getCommentStringInfo(getCommentText(node));
    if (!info)
        return;
    if (!info.order) {
        alert("语法错误：不恰当的" + info.orderCase);
        return;
    }
    parseCommentOrder(info, node, outerChildNodes, outerElement, props, part);
    if (node.order) {
        if (node.order.endNode) {
            node.order.run();
        }
    }
}
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
/// <reference path="global.ts"/>
/// <reference path="core.ts"/>
/// <reference path="Execute.ts"/>
/// <reference path="bind.ts"/>
/// <reference path='TemplateConfig.ts'/>
/// <reference path='PartOrderCore.ts'/>
/// <reference path='XHR.ts'/>
var operatorRE = /\!=|==|=|<|>|\|/;
function getScopeBy(scope, node) {
    if (!scope)
        return $t.domScope.get(node);
    else
        return scope;
}
function execByScope(node, s, scope, outer, outerElement, props, part) {
    return _execByScope.call(getScopeBy(scope, node), s, node, outer, outerElement, props, part);
}
function execScope(s, node, outerChildNodes, outerElement, props, part) {
    execByScope(node, '$t.extend(this,{' + s + '});', null, outerChildNodes, outerElement, props, part);
}
function setNodeProperty(node, proName, condition, outerChildNodes, outerElement, props, part) {
    var v = execByScope(node, condition, null, outerChildNodes, outerElement, props, part);
    var name = camelCase(proName.substr(0, proName.length - 1));
    if (name.indexOf(".") != -1) {
        var obj2 = node;
        name = name.split(".");
        for (var i = 0; i < name.length - 1; i++) {
            obj2 = obj2[name[i]];
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
    for (var i = 0; i < attrs.length; i++) {
        var name_1 = attrs[i].name;
        if (name_1.length > 1) {
            if (name_1[name_1.length - 1] === ':') {
                setNodeProperty(node, name_1, takeAttr(node, name_1), outerChildNodes, outerElement, props, part);
            }
            else if (name_1[0] === ':') {
                bindNodeProperty(node, name_1.substring(1, name_1.length), takeAttr(node, name_1));
            }
        }
    }
}
function getTemplate(node) {
    var nodeName = node.nodeName;
    if (templateConfig.hasOwnProperty(nodeName)) {
        if (templateConfig[nodeName].hasOwnProperty('getData')) {
            return templateConfig[nodeName].getData(node);
        }
        else {
            return node.innerHTML;
        }
    }
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
                throwError('不能定义service：' + name + '到' + partType + '上');
            }
        }
        else {
            if (!$t.service.hasOwnProperty(name)) {
                $t.service.define(name, getTemplate(node));
            }
            else {
                throwError('不能重复定义service：' + name);
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
    $t.defineClassNames.push(getAttr(node, 'class'), trimLine(getTemplate(node)));
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
        if (isTemplate(node))
            temps.push(node);
    });
    return temps;
}
function parseUITemplate(uiName, uiSortPath, uiPath, sHTML) {
    VTemplate(sHTML);
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
        throwError('找不到可继承的模板：' + extName);
    }
    ext = $t.T[extName];
    return ext;
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
        mark = null;
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
        throwError(uiInfo.name + '组件不存在！');
        return;
    }
    partName = takeAttr(node, 'p-name');
    reExtends = takeAttr(node, 're-extends');
    outerChildNodes = slice.call(node.childNodes);
    outerElement = slice.call(node.children);
    var chds = node.childNodes;
    for (var i = chds.length; i > 0; i--) {
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
function parseSet(node, outerChildNodes, outerElement, props, part) {
    if (node.hasAttribute('link')) {
        /*设置关联子对象*/
        var link = takeAttr(node, 'link');
        var chds = $t.store.takeElem(link);
        if (chds !== null) {
            if (typeof chds === 'IHTMLElement') {
                node.appendChild(chds);
            }
            else {
                appendNodes(chds, node.children[0]);
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
            if (isAppend) {
                for (var i = 0; i < attr.length; i++) {
                    ns[j].setAttribute(attr[i].name, attr[i].value);
                }
            }
            else {
                for (var i = 0; i < attr.length; i++) {
                    var value = attr[i].value;
                    var value2 = void 0;
                    switch (attr[i].name) {
                        case 'class':
                            value2 = ns[j].getAttribute(attr[i].name);
                            if (value2) {
                                value += (/ $/.test(value) ? '' : ' ') + value2;
                            }
                            break;
                        case 'style':
                            value2 = ns[j].getAttribute(attr[i].name);
                            if (value2) {
                                value += (/; *$/.test(value) ? '' : ';') + value2;
                            }
                            break;
                    }
                    ns[j].setAttribute(attr[i].name, value);
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
            if (isArray(files)) {
                arr = files;
                for (var i in arr) {
                    var url = files[i];
                    if (isString(url) && !(url in IncludeTask.jsScript)) {
                        arr.push(url);
                        IncludeTask.jsScript[url] = $node("script");
                    }
                }
            }
            else if (files) {
                arr = [];
                var url = files;
                if (isString(url) && !(url in IncludeTask.jsScript)) {
                    arr.push(url);
                    IncludeTask.jsScript[url] = $node("script");
                }
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
        IncludeTask.jsScript = newHashObject('JSHash');
        return IncludeTask;
    }());
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
        try {
            fn.apply(node.parentNode, args);
        }
        catch (e) {
            _catch(e);
        }
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
    if (node.type == "" || node.type == "on" || node.type == "text/javascript") {
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
    var v = takeAttr(node, ':');
    if (v.length > 0) {
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
    scope = $t.domScope.get(node);
    if (name.indexOf(".") != -1) {
        arrName = name.split(".");
        obj = _getBindObject(scope, arrName);
        name = arrName[arrName.length - 1];
    }
    else {
        obj = _getBindObject(scope, [name]);
    }
    if (obj === null) {
        throwError('不能获取绑定属性:' + cdtn[0]);
        return;
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
    scope = $t.domScope.get(node);
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
        $t.refs.push(refName.split(','), node);
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
        bindNodeByCondition(node, takeAttr(node, 'bind'));
    };
    AttributeParser.prototype.remove = function (node, outerChildNodes, outerElement, props, part) {
        var bindInfo = bindEval(node, takeAttr(node, 'remove'), outerChildNodes, outerElement, props, part, function (v) {
            if (!v)
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
            try {
                parseComment(node, outerChildNodes, outerElement, props, part);
            }
            catch (e) {
                _catch(e);
            }
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
        for (var i = 0; i < attrs.length; i++) {
            if (attributeParser.hasOwnProperty(attrs[i].name)) {
                attributeParser[attrs[i].name](node, outerChildNodes, outerElement, props, part);
            }
        }
    });
}
function getParts(childNodes) {
    var child = [];
    var cpn = null;
    treeEach(childNodes, "childNodes", function (node) {
        if (node.nodeType === 8 && node.__part__) {
            if (cpn !== null) {
                if (node.__part__ === cpn && node.__sign__ === 0) {
                    child.push(node.__part__);
                    cpn = null;
                }
            }
            else {
                cpn = node.__part__;
            }
            return;
        }
        if (cpn !== null) {
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
/// <reference path='core.ts'/>
/// <reference path='PartCore.ts'/>
var memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;
var colorRE = /^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/;
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
var Part = (function () {
    function Part() {
        this.store = new ArrayEx();
    }
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
    Object.defineProperty(Part.prototype, "elementLength", {
        get: function () {
            if (this.isInsert) {
                return this.store.length;
            }
            else {
                return 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "elements", {
        get: function () {
            if (this.isExtend) {
                return new ArrayEx();
            }
            if (this.isInsert) {
                try {
                    var elements = new ArrayEx();
                    var node = this.begin.nextSibling;
                    var end = this.end;
                    while (node !== end) {
                        elements.push(node);
                        node = node.nextSibling;
                    }
                    return elements;
                }
                catch (e) {
                    _catch(e);
                    return new ArrayEx();
                }
            }
            if (isArray(this.store)) {
                return this.store.slice().splice(1, this.store.length - 2);
            }
            else {
                return new ArrayEx();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "child", {
        get: function () {
            return getParts(this.elements);
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.getParentPart = function (node) {
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
            if (node.nodeType === 8 && node.part) {
                if (node.sign === 0) {
                    node = node.part.begin;
                }
                else {
                    return node.part;
                }
            }
        }
    };
    Object.defineProperty(Part.prototype, "parent", {
        get: function () {
            return this.getParentPart(this.begin);
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.getRect = function () {
        if (this.isInsert) {
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
    };
    Part.prototype.emitResize = function () {
        try {
            if (!this.isInsert) {
                return;
            }
            if (this.onresize) {
                if (this.onresize()) {
                    return;
                }
            }
            var cs = this.child;
            for (var i = 0; i < cs.length; i++) {
                cs[i].emitResize();
            }
        }
        catch (e) {
            _catch(e);
        }
    };
    Part.prototype.onSetSize = function (rect) {
        if (this.partMain) {
            var style = this.partMain.style;
            style.left = rect.left + 'px';
            style.top = rect.top + 'px';
            style.width = rect.width + 'px';
            style.height = rect.height + 'px';
            style.boxSizing = 'border-box';
            this.emitResize();
        }
    };
    Part.prototype.setSize = function (rect) {
        if (this.onSetSize) {
            return this.onSetSize(rect);
        }
        if (this.super) {
            this.super.setSize(rect);
        }
    };
    Object.defineProperty(Part.prototype, "innerHTML", {
        get: function () {
            return nodesToString(this.elements);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Part.prototype, "elemParent", {
        get: function () {
            return this.begin.parentNode;
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.insertTo = function (elem) {
        if (this.isInsert) {
            var elems = this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.cut(scopeNodes[i].scope);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.oninsert)) {
                this.oninsert(elem);
            }
        }
        else {
            appendNodes(this.store, elem);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.oninsert)) {
                this.oninsert(elem);
            }
            this.isInsert = true;
        }
    };
    Part.prototype.insertBefore = function (elem) {
        if (this.isInsert) {
            var elems = this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            /*cut scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.cut(scopeNodes[i].scope);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.oninsert)) {
                this.oninsert(elem);
            }
        }
        else {
            insertNodesBefore(elem, this.store);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.oninsert)) {
                this.oninsert(elem);
            }
            this.basePart.isInsert = true;
        }
    };
    Part.prototype.getSuper = function (name) {
        if (this.super) {
            if (this.super.template.name === name) {
                return this.super;
            }
            else {
                return this.super.getSuper(name);
            }
        }
    };
    Part.prototype.emitInit = function (finalPart) {
        if (this.super) {
            this.super.emitInit(finalPart);
        }
        if (isFunction(this.oninit)) {
            this.oninit(finalPart);
        }
    };
    Part.prototype.remove = function () {
        if (this.isInsert) {
            var elems = this.elements;
            elems.unshift(this.begin);
            elems.push(this.end);
            var scopeNodes = this.scopeNodes;
            /*cut scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.cut(scopeNodes[i].scope);
            }
            var p = this.begin.parentNode;
            if (p !== null) {
                for (var i = 0; i < elems.length; i++) {
                    p.removeChild(elems[i]);
                }
            }
            this.store = elems;
            this.basePart.isInsert = false;
            if (isFunction(this.onremove)) {
                this.onremove();
            }
            if (this.parent) {
                this.parent.emitResize();
            }
        }
    };
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
    return Part;
}());
function newExtendsPart(template, node, extPart, s, outerChildNodes, outerElement, props, part) {
    var t;
    if (extPart) {
        t = newObject(template.partName, extPart);
    }
    else {
        t = newObject(template.partName, newPart.prototype);
    }
    var name = template.name;
    var dom = $DOM(s);
    //node.innerHTML=s;
    t.template = template;
    t.super = extPart;
    t.isExtend = true;
    var nodes = dom.childNodes;
    t.$ = new Service(template.service);
    initHTML(nodes, outerChildNodes, outerElement, props, t);
    t.store = [];
    for (var i = nodes.length; i > 0; i--) {
        t.store.push(dom.removeChild(nodes[0]));
    }
    t.to = function (part) {
        var proto = part.$.__proto__;
        t.$.__proto__ = proto;
        part.$.__proto__ = t.$;
        if (extPart) {
            extPart.to(part);
        }
        push.apply(part.store, t.store);
    };
    return t;
}
function newPart(template, node, extPart, s, outerChildNodes, outerElement, props, part, partName) {
    var t;
    if (extPart) {
        t = newObject(template.partName, extPart);
    }
    else {
        t = newObject(template.partName, newPart.prototype);
    }
    if (partName) {
        $t.parts.push(partName, t);
    }
    var name = template.name;
    var dom = $DOM(s);
    //node.innerHTML=s;
    var begin = t.begin = $node(name, 8); // document.createComment('<'+name+'>');
    var end = t.end = $node('/' + name, 8); //document.createComment('</'+name+'>')
    end.part = begin.part = t;
    begin.sign = 1;
    end.sign = 0;
    t.props = props;
    t.template = template;
    t.onInsert = null;
    t.super = extPart;
    t.isExtend = false;
    t.resPath = template.path + '/' + template.name + '.res';
    var sp = t;
    while (sp.super) {
        sp = sp.super;
    }
    t.basePart = sp ? sp : t;
    t.basePart.isInsert = false;
    t.$ = new Service(template.service);
    t.store = [];
    var nodes = dom.childNodes;
    initHTML(nodes, outerChildNodes, outerElement, props, t);
    if (extPart) {
        extPart.to(t);
    }
    t.store.push.apply(t.store, nodes);
    for (var i = nodes.length; i > 0; i--) {
        dom.removeChild(nodes[0]);
    }
    t.store.unshift(begin);
    t.store.push(end);
    t.emitInit(t);
    return t;
}
var PartTemplate = (function () {
    function PartTemplate(name, sortPath, path, s, ext) {
        this.name = name;
        this.sortPath = sortPath;
        this.path = path;
        this.Instance = new ArrayEx();
        this.isJSDefine = true;
        this.partName = name.replace(/[\.]/g, "_");
        if (isObject(s)) {
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
    /*渲染dom*/
    PartTemplate.prototype.render = function (uiNode, that, outerChildNodes, outerElement, props, part, partName, reExtends) {
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
                var name_2 = attrs[0].name;
                if (!props.hasOwnProperty(name_2)) {
                    props[name_2] = attrs[0].value;
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
        if (ext instanceof PartTemplate) {
            ext = ext.beExtends(uiNode, that, outerChildNodes, outerElement, props, part);
        }
        part = newPart(this, uiNode, ext, execTemplateScript(html, that, outerChildNodes, outerElement, props, part), outerChildNodes, outerElement, props, part, partName);
        this.parts.push(part);
        if (uiNode.parentNode !== null) {
            //let p=uiNode.parentNode.__domNode__;
            part.insertBefore(uiNode);
            removeNode(uiNode);
        }
        return part;
    };
    /*由props构建html字符串*/
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
            return;
        }
        return d.join('');
    };
    /*变成别人的扩展*/
    PartTemplate.prototype.beExtends = function (node, that, outerChildNodes, outerElement, props, part) {
        var ext;
        if (this.extends instanceof PartTemplate) {
            ext = this.extends.beExtends(node, that, outerChildNodes, outerElement, props, part);
        }
        var html = this.joinDatasByProps(props);
        return newExtendsPart(this, node, ext, execTemplateScript(html, that, outerChildNodes, outerElement, props, part), outerChildNodes, outerElement, props, part);
    };
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
            var name_3 = params[i].name;
            if (p.hasOwnProperty(name_3)) {
                p[name_3] = p[name_3] || !params[i].hasDefault;
            }
            else {
                p[name_3] = !params[i].hasDefault;
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
var ITemplateList = (function () {
    function ITemplateList() {
    }
    return ITemplateList;
}());
var TemplateList = (function () {
    function TemplateList() {
        this.event = new $Event;
    }
    TemplateList.prototype.onDefine = function (name, fn) {
        if (name.length === 0) {
            return;
        }
        this.event.on('name', fn);
        if (this.event.events.length > 1) {
            this[name];
        }
    };
    TemplateList.prototype.define = function (name, sortPath, path, s, ext) {
        this[name] = new PartTemplate(name, sortPath, path, s, ext);
        this.event.emit(name, this[name]);
        return this[name];
    };
    TemplateList.prototype.toString = function () {
        var lst = [];
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                lst.push(i);
            }
        }
        return lst.join('\n');
    };
    return TemplateList;
}());
var Service = (function () {
    function Service(serv) {
        this.__defineCallbacks__ = new ArrayEx();
        if (isObject(serv)) {
            for (var i in serv) {
                this[i] = serv[i];
                this.emitOnDefine(i, this[i]);
            }
        }
    }
    Service.prototype.require = function (n) {
        if (!this.hasOwnProperty(n)) {
            this[n] = getService(n);
        }
        return this[n];
    };
    Service.prototype.define = function (name, s) {
        try {
            this[name] = exec("(" + s + ")");
        }
        catch (e) {
            _catch(e);
        }
        this.emitOnDefine(name, this[name]);
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
}());
/// <reference path="core.ts" />
var $rootScope;
var Scope = (function () {
    function Scope(__commentNode__, parent, __name__) {
        this.__commentNode__ = __commentNode__;
        this.__name__ = __name__;
        this.__children__ = [];
        this.__actionNode__ = __commentNode__.parentNode;
        this.__parent__ = parent;
        this.__proto__ = parent;
        __commentNode__.parentNode.__scope__ = this;
        parent.__children__.push(this);
        if (__name__) {
            parent[__name__] = this;
        }
    }
    return Scope;
}());
var DOMScope = (function () {
    function DOMScope() {
        this.stack = [$rootScope];
    }
    DOMScope.prototype.create = function (node, name) {
        var scope = this.get(node);
        if (node.parentNode !== scope.__actionNode__) {
            scope = new Scope(node, scope, name);
            this.stack.push(scope);
        }
        else {
            throwError('当前层不允许重复定义scope:' + name);
        }
        return scope;
    };
    DOMScope.prototype.get = function (node) {
        if (!node)
            return $rootScope;
        while (node != null) {
            if (node.scope) {
                return node.scope;
            }
            node = node.parentNode;
        }
        return $rootScope;
    };
    DOMScope.prototype.cut = function (scope) {
        var p = scope.__parent__;
        scope.__parent__ = null;
        removeItem(p.__children__, scope);
        delete p[scope.name];
    };
    DOMScope.prototype.link = function (scope, node) {
        var p = $t.domScope.get(node);
        if (!p) {
            return;
        }
        scope.__parent__ = p;
        p.__children__.push(scope);
        if (name) {
            p[name] = scope;
        }
    };
    return DOMScope;
}());
/// <reference path='core.ts'/>
/// <reference path='Template.ts'/>
/// <reference path='scope.ts'/>
function renderTemplate(tp) {
    var sHTML = getTemplate(tp);
    var vDOM = $DOM(sHTML);
    initHTML(vDOM.childNodes);
    if (isFunction(vDOM)) {
        var p = tp.parentNode;
        replaceNodeByNodes(tp, takeChildNodes(vDOM.toDOM()));
        vDOM.__domNode__ = p;
        return;
    }
    replaceNodeByNodes(tp, takeChildNodes(vDOM.toDOM()));
    //vDOM.innerHTML='';
}
var renderDocument = function (noAppend) {
    renderDocument.beginTime = new Date();
    var xmps = findTemplates(document.body.children), i, templateXMP = [];
    /*优先处理定义先关的模板*/
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
    renderDocument.endTime = new Date();
};
var Config = (function () {
    function Config() {
        this.baseUIPath = baseUIPath;
        this.baseServicePath = 'service';
        this.debugMode = 2;
    }
    return Config;
}());
var Store = (function (_super) {
    __extends(Store, _super);
    function Store() {
        _super.apply(this, arguments);
    }
    Store.prototype.take = function (name) {
        if (this.hasOwnProperty(name)) {
            var ret = this[name];
            delete this[name];
            if (ret.childNodes.length > 1) {
                return ret.childNodes;
            }
            else {
                return ret.childNodes[0];
            }
        }
    };
    Store.prototype.takeElem = function (name) {
        if (this.hasOwnProperty(name)) {
            var ret = this[name];
            delete this[name];
            if (ret.children.length > 1) {
                return ret.children;
            }
            else {
                return ret.children[0];
            }
        }
    };
    return Store;
}(HashObject));
var Turtle = (function () {
    function Turtle() {
        this.isTemplate = isTemplate;
        this.config = new Config;
        this.domScope = new DOMScope;
        this.T = new TemplateList;
        this.parts = newKeyArrayObject('Parts');
        this.xhr = new XHR;
        this.service = new Service;
        this.store = new Store;
        this.refs = newKeyArrayObject("RefElements");
        rte.on("error", function (e) { log(e); bp(); alert(e); });
    }
    return Turtle;
}());
/// <reference path='turtle.ts'/>
var turtle = new Turtle();
$t = turtle;
