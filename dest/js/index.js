var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $t, $rootScope, $client, $DOM, $node, $VDOM, $VNode, VTemplate;
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
    return ArrayEx;
}(Array));
var exec = eval, toStr = Object.prototype.toString, arrayPrototype = Array.prototype, Objectprototype = Object.prototype, slice = arrayPrototype.slice, push = arrayPrototype.push, splice = arrayPrototype.splice, getPrototypeOf = Object.getPrototypeOf, replace = String.prototype.replace, persentRE = /^\s*([\d.]+)%\s*$/, camelCaseRE = /-(\w)/g, camelizeRE = /-+(.)?/g, deCamelizeRE = /[A-Z]/g, classSplitRE = /\s+/g, rte = new $Event;
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
function newObject(type, prototype) {
    var s = 'var ' + type + '=function(){};';
    if (isObject(prototype)) {
        s += type + '.prototype=proto;';
    }
    s += 'return new ' + type + '();';
    return Function('proto', s)(prototype);
}
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
    scope = $t.uiScope.get(node);
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
    scope = $t.uiScope.get(node);
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
/// <reference path='TemplateConfig.ts'/>
function getScopeBy(scope, node) {
    if (!scope)
        return $t.uiScope.get(node);
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
            if (!$t.ui.hasOwnProperty(nodeName)) {
                s = getTemplate(node);
                $t.ui.define(nodeName, uiSortPath, uiPath, s, getExtendsByNode(node, uiSortPath));
            }
            else {
                alert('不能重复定义ui：' + nodeName);
            }
        }
    }
}
function importUIHTML(uiName, uiSortPath) {
    if (!$t.ui.hasOwnProperty(uiName)) {
        var uiPath = baseUIPath.getPathBySortPath(uiSortPath);
        $t.xhr.get(uiPath + '/' + (uiName + '.html').toLowerCase(), false, function (text) {
            parseUITemplate(uiName, uiSortPath, uiPath, text);
        });
    }
    return $t.ui[uiName];
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
    ext = $t.ui[extName];
    return ext;
}
/// <reference path='core.ts'/>
/// <reference path='PartCore.ts'/>
var memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g;
var colorRE = /^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/;
var Service = (function () {
    function Service(serv) {
    }
    return Service;
}());
var PartParamFilter = (function () {
    function PartParamFilter() {
    }
    PartParamFilter.prototype.bool = function (v) {
        return parseBool(v);
    };
    PartParamFilter.prototype.intmin = function (v, p) {
        v = parseInt(v);
        p = parseInt(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    };
    PartParamFilter.prototype.string = function (v) {
        return '"' + v + '"';
    };
    PartParamFilter.prototype.floatmin = function (v, p) {
        v = parseFloat(v);
        p = parseFloat(p);
        if (v < p || isNaN(v)) {
            v = p;
        }
        return v;
    };
    PartParamFilter.prototype.int = function (v) {
        return parseInt(v);
    };
    PartParamFilter.prototype.float = function (v) {
        return parseFloat(v);
    };
    PartParamFilter.prototype.pxtoem = function (v, p) {
        p = parseFloat(p);
        if (isNaN(p)) {
            p = 0;
        }
        return (parseFloat(v) / 16 + p) + 'em';
    };
    PartParamFilter.prototype.color = function (v) {
        if (colorRE.test(v)) {
            return v;
        }
        else {
            return 'transparent';
        }
    };
    PartParamFilter.prototype.date = function (v, p) {
        var d = new Date(v);
        if (d.toDateString() === 'Invalid Date') {
            d = new Date();
        }
        return dateFormat(p, d);
    };
    PartParamFilter.prototype.only = function (v, p) {
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
    PartParamFilter.prototype.udftotrue = function (v) {
        return v === undefined ? true : v;
    };
    PartParamFilter.prototype.anytotrue = function (v) {
        return v !== undefined ? true : v;
    };
    PartParamFilter.prototype.udftofalse = function (v) {
        return v === undefined ? false : v;
    };
    PartParamFilter.prototype.anytofalse = function (v) {
        return v !== undefined ? false : v;
    };
    PartParamFilter.prototype.udftonull = function (v) {
        return v === undefined ? null : v;
    };
    PartParamFilter.prototype.anytonull = function (v) {
        return v !== undefined ? null : v;
    };
    PartParamFilter.prototype.udftoemptystr = function (v) {
        return v === undefined ? "" : v;
    };
    PartParamFilter.prototype.anytoemptystr = function (v) {
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
                return [];
            }
            if (this.isInsert) {
                try {
                    var elements = [];
                    var node = this.begin.nextSibling;
                    var end = this.end;
                    while (node !== end) {
                        elements.push(node);
                        var node = node.nextSibling;
                    }
                    return elements;
                }
                catch (e) {
                    _catch(e);
                    return [];
                }
            }
            if (isArray(this.store)) {
                return this.store.slice().splice(1, this.store.length - 2);
            }
            else {
                return [];
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
            var rt;
            //var recalNode           = document.createElement('div');
            //recalNode.setAttribute('style',"width:0 !important;height:0 !important;margin-left:0 !important;margin-right:0 !important;");
            // insertNodeBefore(this.begin,recalNode);
            // rt=[recalNode.offsetLeft,recalNode.offsetTop];
            // insertNodeBefore(this.end,recalNode);
            // rt.push(recalNode.offsetLeft,recalNode.offsetTop);
            // removeNode(recalNode);
            // rects.push(rt);
            var cs = this.elements;
            var elem;
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
                $t.uiScope.cut(scopeNodes[i].scope);
            }
            appendNodes(elems, elem);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.uiScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.onInsert)) {
                this.onInsert(elem);
            }
        }
        else {
            appendNodes(this.store, elem);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.uiScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.onInsert)) {
                this.onInsert(elem);
            }
            this.isInsert = true;
            if (isFunction(this.oninsert)) {
                this.oninsert();
            }
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
                $t.uiScope.cut(scopeNodes[i].scope);
            }
            insertNodesBefore(elem, elems);
            /*link scope*/
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.uiScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.onInsert)) {
                this.onInsert(elem);
            }
        }
        else {
            insertNodesBefore(elem, this.store);
            /*link scope*/
            var scopeNodes = this.scopeNodes;
            for (var i = 0; i < scopeNodes.length; i++) {
                $t.uiScope.link(scopeNodes[i].scope, elem);
            }
            if (isFunction(this.onInsert)) {
                this.onInsert(elem);
            }
            this.basePart.isInsert = true;
            if (isFunction(this.oninsert)) {
                this.oninsert();
            }
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
        if (this.hasOwnProperty('onInit') && isFunction(this.onInit)) {
            this.onInit(finalPart);
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
                $t.uiScope.cut(scopeNodes[i].scope);
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
            var p = this.parent;
            if (p) {
                p.emitResize();
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
function newPart(template, node, extPart, s, outerChildNodes, outerElement, props, part, partName) {
    if (extPart) {
        var t = newObject(template.partName, extPart);
    }
    else {
        var t = newObject(template.partName, newPart.prototype);
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
        this.Instance = new ArrayEx;
        this.isJSDefine = true;
        this.partName = name.replace(/[\.]/g, "_");
        if (isObject(s)) {
            if (isObject(s)) {
                var obj = s;
                if (!isArray(obj.params)) {
                    this.params = new ArrayEx;
                }
                else {
                    this.params = obj.params;
                }
                if (!isArray(obj.datas)) {
                    this.datas = new ArrayEx;
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
                this.params = new ArrayEx;
                this.datas = new ArrayEx;
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
            if (p.filter && hasOwnProperty(p.filter)) {
                v = paramFilter[p.filter](v, p.filterParam);
            }
            d.splice(i + 1, 0, v);
        }
        if (err.length > 0) {
            if ($this.config.debugMode == 2) {
                alert(err.join('\r\n'));
            }
            log(err.join('\r\n'));
            bp();
            return;
        }
        return d.join('');
    };
    /*变成别人的扩展*/
    PartTemplate.prototype.beExtends = function (uiNode, that, outerChildNodes, outerElement, props, part) {
        if (this.extends instanceof UITemplate) {
            var ext = this.extends.beExtends(uiNode, that, outerChildNodes, outerElement, props, part);
        }
        var html;
        html = this.joinDatasByProps(props);
        return newExtendsPart(this, uiNode, ext, execTemplateScript(html, that, outerChildNodes, outerElement, props, part), outerChildNodes, outerElement, props, part);
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
            if (p.hasOwnProperty(params[i].name)) {
                p[params[i].name] |= !params[i].hasDefault;
            }
            else {
                p[params[i].name] = !params[i].hasDefault;
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
/// <reference path='core.ts'/>
/// <reference path='Template.ts'/>
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
var Turtle = (function () {
    function Turtle() {
        this.isTemplate = isTemplate;
        this.config = new Config;
        rte.on("error", function (e) { log(e); bp(); alert(e); });
    }
    return Turtle;
}());
/// <reference path='turtle.ts'/>
var turtle = new Turtle();
$t = turtle;
