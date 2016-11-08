var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var arrayConstructor = Array.prototype, objectConstructor = Object.prototype, stringConstructor = String.prototype, toStr = objectConstructor.toString, slice = arrayConstructor.slice, push = arrayConstructor.push, splice = arrayConstructor.splice, getPrototypeOf = objectConstructor.getPrototypeOf, replace = stringConstructor.replace;
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
    var index = arr.indexOf(obj);
    if (index != -1) {
        arr.splice(index, 1);
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
var isArray = Array.isArray || function (a) {
    return "[object Array]" === toStr.call(a);
};
function isPersent(s) {
    return persentRE.test(s);
}
function isArrayLike(a) { return typeof a.length == 'number'; }
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
/// <reference path="../lib/lib.d.ts" />
Node.prototype.toDOM =
    Node.prototype.valueOf = function () {
        return this;
    };
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
/**判断是否注释节点 */
function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
/**判断是否文本节点 */
function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
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
/// <reference path="../scope/execute.ts"/>
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
    if (!obj.__bind__) {
        return false;
    }
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
            var get_1 = desc.get;
            newProperty.get = function () {
                return get_1.call(this);
            };
        }
        if (desc.hasOwnProperty('set')) {
            var set_1 = desc.set;
            newProperty.set = function (newValue) {
                set_1.call(this, newValue);
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
        if (!node.__bind__) {
            node[elementValueName] = obj[name];
        }
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
var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
(function () {
    var insertBefore = Node.prototype.insertBefore;
    if (isIE) {
        Node.prototype.insertBefore2 = function (newNode, node) {
            var reAppend = [];
            var n;
            if (isTextNode(newNode)) {
                if (newNode.data === "") {
                    return;
                }
            }
            else if (isCommentNode(newNode)) {
                n = node.nextSibling;
                while (n !== null) {
                    reAppend.push(this.removeChild(n));
                    n = node.nextSibling;
                }
                reAppend.unshift(this.removeChild(node));
                this.appendChild(newNode);
                for (var i = 0; i < reAppend.length; i++) {
                    this.appendChild(reAppend[i]);
                }
                return newNode;
            }
            else {
                return insertBefore.call(this, newNode, node);
            }
        };
    }
    else {
        Node.prototype.insertBefore2 = insertBefore;
    }
})();
/**
 * 可躲过一些js压缩库console.log;
 */
var log = Function('s', 'console.log(s)');
/**
 * 可躲过一些js压缩库debugger;
 */
var bp = Function('debugger');
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
            if (obj2 && obj2[propertyName] && obj2[propertyName].length > 0 && !(state & 4 /* c_noIn */) && propertyName) {
                stack.push(arr);
                stack.push(i + (state & 2 /* c_repeat */ ? 0 : step.next));
                i = 0;
                arr = obj2[propertyName];
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
/// <reference path="is.ts" />
var EventEmitter = (function () {
    function EventEmitter() {
        this.emit = function (type) {
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
            if (!handler)
                return false;
            if (!isArray(handler)) {
                handler.apply(this, args);
                return true;
            }
            else if (isArray(handler)) {
                var listeners = handler.slice();
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(this, args);
                }
                return true;
            }
            else {
                return false;
            }
        };
        // EventEmitter is defined in src/nodeevents.cc
        // EventEmitter.prototype.emit() is also defined there.
        this.addListener = function (type, listener) {
            if ('function' !== typeof listener) {
                throw new Error('addListener only takes instances of Function');
            }
            if (!this.events)
                this.events = {};
            // To avoid recursion in the case that type == "newListeners"! Before
            // adding it to the listeners, first emit "newListeners".
            this.emit('newListener', type, listener);
            var hanlder = this.events[type];
            if (!hanlder) {
                // Optimize the case of one listener. Don't need the extra array object.
                this.events[type] = listener;
            }
            else if (isArray(hanlder)) {
                // If we've already got an array, just append.
                hanlder.push(listener);
            }
            else {
                // Adding the second element, need to change to array.
                this.events[type] = [hanlder, listener];
            }
            return this;
        };
        this.once = function (type, listener) {
            var self = this;
            self.on(type, function g() {
                self.removeListener(type, g);
                listener.apply(this, arguments);
            });
        };
        this.removeListener = function (type, listener) {
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
        this.removeAllListeners = function (type) {
            // does not use listeners(), so no side effect of creating events[type]
            if (type && this.events && this.events[type]) {
                delete this.events[type];
            }
            return this;
        };
        this.listeners = function (type) {
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
        this.on = this.addListener;
    }
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
                args[_i - 0] = arguments[_i];
            }
            args.unshift(this.type);
            return this.part.emit.apply(this.part, args);
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
/// <reference path="../lib/lib.d.ts" />
/// <reference path="typehelper.ts" />
/// <reference path="is.ts" />
/// <reference path="hashobject.ts"/>
/// <reference path="node.ts"/>
/// <reference path="bind.ts"/>
/// <reference path="browserhelper.ts"/>
/// <reference path="debughelper.ts"/>
/// <reference path="treeeach.ts"/>
/// <reference path="EventHelper.ts"/>
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
/// <reference path='../core/core.ts'/>
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
var TemplateConfig = (function () {
    function TemplateConfig() {
        this["XMP"] = {};
        this["TEMPLATE"] = {};
        this["TITLE"] = { getData: function (node) { return node.innerText; } };
        this["STYLE"] = { xmp: undefined };
        this["SCRIPT"] = { xmp: undefined };
        this["TEXTAREA"] = { xmp: undefined, getData: function (node) { return node.defaultValue; } };
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
var templateConfig = new TemplateConfig;
var baseUIPath = new BasePath;
/// <reference path="../core/core.ts"/>
/// <reference path="../scope/execute.ts"/>
/// <reference path="../core/bind.ts"/>
var orderRE = /^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|let|=)(\s|$)/g, orderCaseRE = /^\s?(else if|else|case break|case|default|end)(\s|$)/g, parseForOrderRE = /[a-zA-Z\d] in .*/, parseForOrderRE2 = /^.*;.*;.*$/, SetParseError = function (msg) {
    SetParseError.isError = true;
    alert(msg);
    return 1 /* c_stopEach */;
}, orderStack = new ArrayEx();
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
/**从注释中读取命令 */
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
    return null;
}
/**从注释中读取字符串 */
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
        if (!isCommentNode(node)) {
            return;
        }
        var info = getCommentStringInfo(getCommentText(node));
        if (!info) {
            return;
        }
        if (info.order) {
            var ret = parseCommentOrderNoScript(info, node, outerChildNodes, outerElement, props, part);
            if (ret) {
                step.next = ret.index - getNodeIndex2(node) + 1;
            }
            return 8 /* c_noRepeat */ & 4 /* c_noIn */;
        }
        if (info.orderCase === 'end') {
            if (orderStack.length > 0) {
                orderStack.pop().endNode = node;
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
    if (!node.__order__) {
        order = fnGetOrder();
        node.__order__ = order;
        order.name = info.order;
        order.node = node;
        order.endNode = null;
        order.condition = info.condition;
        orderStack.push(order);
        order.parseCommentOrderBlockReturnValue = parseCommentOrderBlock(node, outerChildNodes, outerElement, props, part);
    }
    else {
        order = node.__order__;
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
                    if (!isCommentNode(node)) {
                        return;
                    }
                    var info = getCommentStringInfo(getCommentText(node));
                    if (!info)
                        return;
                    if (node.__order__ && node.__order__.node) {
                        step.next = getNodeIndex2(node.__order__.node) - getNodeIndex2(node);
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
                    // mark=null;
                    appendNodes(ns, elem);
                    var chds = elem.childNodes;
                    initHTML(chds, outerChildNodes, outerElement, props, part);
                    takeOutChildNodes(elem);
                    // elem=null;
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
                    if (!isCommentNode(node)) {
                        return;
                    }
                    var info = getCommentStringInfo(getCommentText(node));
                    if (!info) {
                        return;
                    }
                    if (node.__order__ && node.__order__.endNode) {
                        step.next = getNodeIndex2(node.__order__.endNode) - getNodeIndex2(node);
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
/// <reference path="../core/core.ts"/>
/// <reference path='TemplateConfig.ts'/>
/// <reference path='PartOrderCore.ts'/>
/// <reference path='../core/XHR.ts'/>
/// <reference path='../core/instantiation.ts'/>
var $DOM, $node, operatorRE = /\!=|==|=|<|>|\|/;
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
                var v = takeAttr(node, name_1, "");
                if (v) {
                    bindNodeProperty(node, name_1.substring(1, name_1.length), v);
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
        throwError('找不到可继承的模板：' + extName);
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
function isHTMLElement(p) {
    return typeof p === "IHTMLElement";
}
function parseSet(node, outerChildNodes, outerElement, props, part) {
    var link = takeAttr(node, 'link', "");
    if (link) {
        /*设置关联子对象*/
        var chds = StoreManage.takeElem($t.store, link);
        if (chds !== null) {
            if (isHTMLElement(chds)) {
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
            var data = IncludeTask.jsScript;
            if (isArray(files)) {
                arr = files;
                for (var i in arr) {
                    var url = files[i];
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
function _catch(e, fn) {
    if (fn) {
        fn(e);
    }
    else {
        $t.$error.emit(e);
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
/// <reference path='../core/core.ts'/>
/// <reference path='partcore.ts'/>
/// <reference path='../turtle.lib.ts'/>
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
        this.emit(name);
    };
    TemplateList.prototype.define = function (name, sortPath, path, s, ext) {
        this[name] = new PartTemplate(name, sortPath, path, s, ext);
        // this.event.emit(name,this[name]);
        this.emit(name);
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
}(EventEmitter));
var $rootScope;
var RootScope = (function () {
    function RootScope() {
        this.__actionNode__ = document.documentElement;
        this.__children__ = [];
        document['scope'] = this;
    }
    return RootScope;
}());
var DOMScope = (function () {
    function DOMScope() {
        this.stack = [$rootScope];
    }
    /**
     * 在dom节点上创建变量作用域对象
     * @param {INode} node - dom节点
     * @param {string} name - 名称
     */
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
    /**
     * 获取变量作用域对象
     * @param {INode} node - dom节点
     */
    DOMScope.prototype.get = function (node) {
        if (!node) {
            return $rootScope;
        }
        while (node != null) {
            if (node.__scope__) {
                return node.__scope__;
            }
            node = node.parentNode;
        }
        return $rootScope;
    };
    /**
     * 切断dom节点和变量作用域对象的链接
     * @param {Scope} scopeVarObject - 变量作用域对象
     */
    DOMScope.prototype.unlink = function (scope) {
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
    DOMScope.prototype.link = function (scope, node) {
        var p = $t.domScope.get(node);
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
/// <reference path='RootScope.ts'/>
/// <reference path='DOMScope.ts'/>
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
        return null;
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
        return null;
    };
    return StoreManage;
}());
var Service = (function (_super) {
    __extends(Service, _super);
    function Service(serv) {
        var _this = _super.call(this) || this;
        _this.__defineCallbacks__ = new ArrayEx();
        if (isObject(serv)) {
            for (var i in serv) {
                _this[i] = serv[i];
                _this.event.emit(i, _this[i]);
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
        try {
            this[name] = exec("(" + s + ")");
        }
        catch (e) {
            _catch(e);
        }
        this.event.emit(name, this[name]);
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
/// <reference path="../core/core.ts"/>
/// <reference path="Server.ts"/>
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
        /**
         * 缓存事件管理器
         */
        _this.eventHelpers = {};
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
        for (var i = nodes.length; i > 0; i--) {
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
        for (var i = nodes.length; i > 0; i--) {
            dom.removeChild(nodes[0]);
        }
        store.unshift(begin);
        store.push(end);
        _this.$init.emit(_this);
        return _this;
    }
    /**
     * 生成或获取一个事件管理器
     */
    Part.prototype.getEventHelper = function (type) {
        var eventHelper = this.eventHelpers[type];
        if (!eventHelper) {
        }
        else {
            eventHelper = this.eventHelpers[type] = new EventHelper(this, type);
        }
        return eventHelper;
    };
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
                $t.domScope.unlink(scopeNodes[i].scope);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            appendNodes(this.nodeStore, elem);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
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
                $t.domScope.unlink(scopeNodes[i].scope);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
            }
            this.$online.emit(this, elem);
        }
        else {
            insertNodesBefore(elem, this.nodeStore);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.domScope.link(scopeNodes[i].scope, elem);
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
                $t.domScope.unlink(scopeNodes[i].scope);
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
}(EventEmitter));
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
/// <reference path='./core/core.ts'/>
/// <reference path='./part/Template.ts'/>
/// <reference path='./scope/Scope.ts'/>
/// <reference path='ClientHelper.ts'/>
/// <reference path='store.ts'/>
/// <reference path='./part/Part.ts'/>
/// <reference path='Ready.ts'/>
var readyRE = /complete|loaded|interactive/;
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
var Config = (function () {
    function Config() {
        this.baseUIPath = baseUIPath;
        this.baseServicePath = 'service';
        this.debugMode = 2;
    }
    return Config;
}());
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
var Turtle = (function (_super) {
    __extends(Turtle, _super);
    function Turtle() {
        var _this = _super.call(this) || this;
        _this.domScope = new DOMScope;
        _this.rootScope = new RootScope;
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
        /**
         * 缓存事件管理器
         */
        _this.eventHelpers = {};
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
                    try {
                        compileInfo = exec('(' + text + ')');
                    }
                    catch (e) {
                        _catch(e);
                    }
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
    /**
     * 生成或获取一个事件管理器
     */
    Turtle.prototype.getEventHelper = function (type) {
        var eventHelper = this.eventHelpers[type];
        if (!eventHelper) {
        }
        else {
            eventHelper = this.eventHelpers[type] = new EventHelper(this, type);
        }
        return eventHelper;
    };
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
}(EventEmitter));
/// <reference path='turtle.ts'/>
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
