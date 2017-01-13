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
        //setNamedItemNS: setNamedItemNS()
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
    return VNamedNodeMap;
}());
var VMDOM;
(function (VMDOM) {
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
    VMDOM.VStyle = VStyle;
    function indexOfStyleName(t, name) {
        for (var i_1 = 0; i_1 < t.length; i_1++) {
            if (t[i_1] === name) {
                return i_1;
            }
        }
        return -1;
    }
    function updateStyleAttribyte(t) {
        var style = "";
        for (var i_2 = 0; i_2 < t.length; i_2++) {
            style += decamelize(t[i_2]) + ':' + t[t[i_2]] + ';';
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
})(VMDOM || (VMDOM = {}));
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
/// <reference path="../lib/ArrayEx.ts"/>
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>
var VMDOM;
(function (VMDOM) {
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
    VMDOM.VNodeList = VNodeList;
})(VMDOM || (VMDOM = {}));
/// <reference path='.d.ts'/>
var VMDOM;
(function (VMDOM) {
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
            for (var i = 0; i < this.length; i++) {
                var element = this[i];
                if (element.getAttribute("name") === name) {
                    return element;
                }
            }
            return null;
        };
        return VHTMLCollection;
    }());
    VMDOM.VHTMLCollection = VHTMLCollection;
})(VMDOM || (VMDOM = {}));
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
var VMDOM;
(function (VMDOM) {
    VMDOM.bindClassToFunctionHelper = {};
    VMDOM.bindClassToFunction2Helper = {};
    function register(nodeName, nodeType) {
        return function (constructor) {
            VMDOM.bindClassToFunction2Helper[nodeName] = VMDOM.bindClassToFunctionHelper[nodeType] = function (node) {
                node.__proto__ = constructor.prototype;
                constructor.call(node, arguments[1]);
            };
        };
    }
    VMDOM.register = register;
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
    VMDOM.mergeClass = mergeClass;
    function setA_PToClassPrototype(constructor) {
        var prototype = constructor.prototype;
        var clazzSuperPrototype = prototype.prototype; //这里只是让后面的比较正常,类型并不准
        var _loop_1 = function (name_1) {
            Object.defineProperty(prototype, name_1, {
                get: function () {
                    return getAttr(this, name_1);
                },
                set: function (v) {
                    setAttr(this, name_1, v);
                }
            });
        };
        for (var _i = 0, apNames_1 = apNames; _i < apNames_1.length; _i++) {
            var name_1 = apNames_1[_i];
            _loop_1(name_1);
        }
        prototype.cloneNode = function (deep) {
            var newNode = clazzSuperPrototype.cloneNode(deep);
            for (var _i = 0, apNames_2 = apNames; _i < apNames_2.length; _i++) {
                var name_2 = apNames_2[_i];
                if (this[name_2] !== "") {
                    newNode[name_2] = this[name_2];
                }
            }
            return newNode;
        };
    }
})(VMDOM || (VMDOM = {}));
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
/// <reference path='Lib.ts'/>
var VMDOM;
(function (VMDOM) {
    VMDOM.emptyTextNodeRE = /^\s*$/;
    VMDOM.stringNode = {
        SCRIPT: /^\/script[>\s]/i,
        TEMPLATE: /^\/template[>\s]/i,
        STYLE: /^\/style[>\s]/i,
        TITLE: /^\/title[>\s]/i,
        TEXTAREA: /^\/textarea[>\s]/i,
        XMP: /^\/xmp[>\s]/i
    };
    var VNode = (function () {
        function VNode() {
            this.vmData = new VNodeVMData();
            this.childNodes = new VMDOM.VNodeList;
        }
        /**
         * 用自身做环境调用函数,并返回父
         */
        VNode.prototype.__ = function (fn) {
            fn.call(this);
            return this.parentNode;
        };
        /**
         * 添加ENodeType.PlaceHolder子节点，用子节点做环境调用函数,并返回自身
         */
        VNode.prototype.$$__ = function (fn) {
            this('', 100 /* PlaceHolder */).__(fn);
            return this;
        };
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
        /**
         * 添加子节点，并返回子节点
         */
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
        /**
         * 添加子节点，并返回子节点
         */
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
            var elem = this.doBeDOM();
            this.copyPropertyToNode(elem);
            this.vmData.domNode = elem;
            this.connectParent(elem);
            this.emulation();
            elem.__vdomNode__ = this;
            return elem;
        };
        VNode.prototype.doBeDOM = function () {
            var toHelp = document.createElement('__Turtle__'); //用于创建
            toHelp.innerHTML = this.vmData.data;
            var elem = toHelp.removeChild(toHelp.childNodes[0]);
            return elem;
        };
        VNode.prototype.copyPropertyToNode = function (elem) {
            debugger;
            for (var i in this) {
                switch (i) {
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
                        if (!this.hasOwnProperty(i)) {
                            continue;
                        }
                        var desc = Object.getOwnPropertyDescriptor(this, i);
                        if (desc) {
                            if (!(i in elem)) {
                                Object.defineProperty(elem, i, desc);
                            }
                            else {
                                elem[i] = this[i];
                            }
                        }
                        else {
                            elem[i] = this[i];
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
                for (var i = 0; i < arguments.length; i++) {
                    //获取对象
                    var o = arguments[i].valueOf();
                    //如果valueOf的值不是自己
                    if (o === arguments[i] && o instanceof VNode) {
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
                for (var i = 0; i < toDOMs.length; i++) {
                    var chds = toDOMs[i].childNodes;
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
    VMDOM.VNode = VNode;
    var functionCommentRE = /\/\*([\s\S]*?)\*\//g;
    function getFunctionComment(fn) {
        var s = functionCommentRE.exec(fn.toString());
        return s[1];
    }
    VMDOM.getFunctionComment = getFunctionComment;
})(VMDOM || (VMDOM = {}));
// bindClassToFunction2Helper["#documenttype"]=bindClassToFunctionHelper[ENodeType.DocumentType]=function(node:IVNodeMethod & VMDOM.VNode,nodeName: string){
//     node.__proto__=VMDOM.VDocumentType.prototype;
//     VMDOM.VDocumentType.call(node);
// }
// bindClassToFunction2Helper["#comment"]=bindClassToFunctionHelper[ENodeType.Comment]=function(node:IVNodeMethod & VMDOM.VNode,nodeName: string){
//     node.__proto__=VMDOM.VComment.prototype;
//     VMDOM.VComment.call(node,nodeName);
// }
// bindClassToFunction2Helper["#text"]=bindClassToFunctionHelper[ENodeType.Text]=function(node:IVNodeMethod & VMDOM.VNode,nodeName: string){
//     node.__proto__=VMDOM.VText.prototype;
//     VMDOM.VText.call(node,nodeName);
// }
// bindClassToFunction2Helper["#document"]=bindClassToFunctionHelper[ENodeType.Document]=function(node:IVNodeMethod & VMDOM.VNode,nodeName: string){
//     node.__proto__=VMDOM.VDocument.prototype;
//     VMDOM.VDocument.call(node);
// }
function bindClassToFunction(node, nodeName, nodeType) {
    if (nodeType !== undefined) {
        var fn = VMDOM.bindClassToFunctionHelper[nodeType];
        if (fn) {
            fn(node, nodeName);
            return '';
        }
    }
    if (nodeType === undefined || nodeType === 1 /* Element */) {
        if (nodeName[0] === '#') {
            var fn = VMDOM.bindClassToFunction2Helper[nodeName];
            if (fn) {
                fn(node, nodeName);
                return '';
            }
        }
        else {
            nodeName = nodeName.toLowerCase();
            var name_3 = "V" + nodeName[0].toUpperCase() + nodeName.substr(1).toLowerCase() + "Element";
            if (VMDOM.hasOwnProperty(name_3)) {
                node.__proto__ = VMDOM[name_3].prototype;
                VMDOM[name_3].call(node);
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
    return VNode;
}
var VNodeHelp = function (nodeName, nodeType) {
    var that = getVNodeMethod();
    bindClassToFunction(that, nodeName, nodeType);
    return that;
};
/// <reference path='VNode.ts'/>
var VMDOM;
(function (VMDOM) {
    var VElement = (function (_super) {
        __extends(VElement, _super);
        function VElement() {
            var _this = _super.call(this) || this;
            _this.attributes = new VNamedNodeMap;
            _this.style = new VMDOM.VStyle(_this);
            _this.children = new VMDOM.VHTMLCollection();
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
            if (name && !VMDOM.emptyTextNodeRE.test(name)) {
                this.attributes.setNamedItem(new IAttr(name, value));
                return getBind(this, this.setAttribute);
            }
            else {
                return this;
            }
        };
        /**添加attribute */
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
                    for (var i = 0; i < cs.length; i++) {
                        push.apply(data, cs[i].toHTMLString());
                    }
                    return data.join('');
                }
                return "";
            },
            set: function (s) {
                this.children.length = 0;
                this.childNodes.length = 0;
                if (this.nodeName in VMDOM.stringNode) {
                    this.appendChild($$$(s, 3));
                }
                else {
                    VDOM.parseStructor(s, this);
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
            for (var i = 0; i < attr.length; i++) {
                if (attr[i].value) {
                    arrAttr.push(attr[i].name + '="' + attr[i].value + '"');
                }
                else {
                    arrAttr.push(attr[i].name);
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
                for (var i = 0; i < cs.length; i++) {
                    push.apply(ret, cs[i].toHTMLString());
                }
            }
            if (!this.vmData.closeSelf && (this.vmData.isClose || !this.parentNode)) {
                ret.push("</" + lowCaseName + ">");
            }
            return ret;
        };
        return VElement;
    }(VMDOM.VNode));
    VMDOM.VElement = VElement;
})(VMDOM || (VMDOM = {}));
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
/// <reference path='VNode.ts'/>
/// <reference path='VElement.ts'/>
/// <reference path='../../lib/Encode.ts'/>
/// <reference path='../../core/Node.ts'/>
/// <reference path='Lib.ts'/>
function isVHTMLElement(node) {
    return node.nodeType === 1 /* Element */;
}
var VMDOM;
(function (VMDOM) {
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
            for (var i = 0; i < attributes.length; i++) {
                newNode.setAttribute(attributes[i].name, attributes[i].value);
            }
            if (deep) {
                var childNodes = this.childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    newNode.appendChild(childNodes[i].cloneNode(deep));
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
                for (var i = 0; i < chdns.length; i++) {
                    var cd = chdns[i];
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
                for (var i = chds.length - 1; i >= 0; i--) {
                    delete chds[i];
                }
                var chdns = this.childNodes;
                for (var i = chdns.length - 1; i >= 0; i--) {
                    delete chdns[i];
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
        VHtmlElement.prototype.doBeDOM = function () {
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
                    for (var i = 0; i < chds.length; i++) {
                        sInner += '\n' + chds[i].toJS(space + 4);
                    }
                }
                if (this.parentNode) {
                    sInner += '.$';
                }
            }
            return sInner;
        };
        VHtmlElement.prototype.attributesToJS = function () {
            var sAttr = '';
            var attrs = this.attributes;
            if (attrs.length > 0) {
                for (var i = 0; i < attrs.length; i++) {
                    sAttr += '._("' + attrs[i].name;
                    if (attrs[i].value) {
                        sAttr += '","' + attrs[i].value + '")';
                    }
                    else {
                        sAttr += '")';
                    }
                }
            }
            return sAttr;
        };
        VHtmlElement.prototype.toJS = function (space) {
            if (space === void 0) { space = 0; }
            return this.toCreateJS(space) + this.attributesToJS() + this.childNodesToJS(space);
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
                for (var i = 0; i < chds.length; i++) {
                    var chn = chds[i];
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
                var vNodes = VDOM.parseStructor(v);
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
    }(VMDOM.VElement));
    VHtmlElement = VHtmlElement_1 = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHtmlElement);
    VMDOM.VHtmlElement = VHtmlElement;
    var VHtmlElement_1;
})(VMDOM || (VMDOM = {}));
/// <reference path='VNode.ts'/>
var VMDOM;
(function (VMDOM) {
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
    }(VMDOM.VNode));
    VMDOM.VCharacterData = VCharacterData;
})(VMDOM || (VMDOM = {}));
/// <reference path='VCharacterData.ts'/>
function isVText(node) {
    return node.nodeType === 3 /* Text */;
}
var VMDOM;
(function (VMDOM) {
    VMDOM.getFunctionBlock = (function () {
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
                _this.__value__ = VMDOM.getFunctionBlock(data);
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
        VText.prototype.doBeDOM = function () {
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
    }(VMDOM.VCharacterData));
    VText = __decorate([
        VMDOM.register('#text', 3 /* Text */)
    ], VText);
    VMDOM.VText = VText;
})(VMDOM || (VMDOM = {}));
/// <reference path='VCharacterData.ts'/>
function isVComment(node) {
    return node.nodeType === 8 /* Comment */;
}
var VMDOM;
(function (VMDOM) {
    var VComment = (function (_super) {
        __extends(VComment, _super);
        function VComment(data) {
            var _this = _super.call(this) || this;
            _this.nodeName = "#comment";
            _this.nodeType = 8 /* Comment */;
            _this.__value__ = "";
            if (isString(data)) {
                _this.__value__ = data;
            }
            else if (isFunction(data)) {
                _this.__value__ = VMDOM.getFunctionBlock(data);
            }
            else {
                _this.__value__ = data.toString();
            }
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
        VComment.prototype.doBeDOM = function () {
            var elem = document.createComment(this.data);
            return elem;
        };
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        VComment.prototype.emulation = function () { };
        return VComment;
    }(VMDOM.VCharacterData));
    VComment = __decorate([
        VMDOM.register('#comment', 8 /* Comment */)
    ], VComment);
    VMDOM.VComment = VComment;
})(VMDOM || (VMDOM = {}));
/// <reference path='VNode.ts'/>
function isVDocType(node) {
    return node.nodeType === 10 /* DocumentType */;
}
var VMDOM;
(function (VMDOM) {
    // @register('html',ENodeType.DocumentType)
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
    }(VMDOM.VNode));
    VMDOM.VDocumentType = VDocumentType;
})(VMDOM || (VMDOM = {}));
/// <reference path='VNode.ts'/>
var VMDOM;
(function (VMDOM) {
    var VDocument = (function (_super) {
        __extends(VDocument, _super);
        function VDocument() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeType = 9 /* Document */;
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
    }(VMDOM.VNode));
    VDocument = __decorate([
        VMDOM.register('#document', 9 /* Document */)
    ], VDocument);
    VMDOM.VDocument = VDocument;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VAElement = (function (_super) {
        __extends(VAElement, _super);
        function VAElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "A";
            return _this;
        }
        return VAElement;
    }(VMDOM.VHtmlElement));
    VAElement = __decorate([
        VMDOM.mergeClass({ target: '', download: '', ping: '', rel: '', hreflang: '', type: '', coords: '', charset: '', name: '', rev: '', shape: '', href: '' })
    ], VAElement);
    VMDOM.VAElement = VAElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VAreaElement = (function (_super) {
        __extends(VAreaElement, _super);
        function VAreaElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "AREA";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VAreaElement;
    }(VMDOM.VHtmlElement));
    VAreaElement = __decorate([
        VMDOM.mergeClass({ alt: '', coords: '', shape: '', target: '', ping: '', noHref: '', href: '' })
    ], VAreaElement);
    VMDOM.VAreaElement = VAreaElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBaseElement = (function (_super) {
        __extends(VBaseElement, _super);
        function VBaseElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BASE";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBaseElement;
    }(VMDOM.VHtmlElement));
    VBaseElement = __decorate([
        VMDOM.mergeClass({ href: '', target: '' })
    ], VBaseElement);
    VMDOM.VBaseElement = VBaseElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBasefontElement = (function (_super) {
        __extends(VBasefontElement, _super);
        function VBasefontElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BASEFONT";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBasefontElement;
    }(VMDOM.VHtmlElement));
    VBasefontElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VBasefontElement);
    VMDOM.VBasefontElement = VBasefontElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBlockquoteElement = (function (_super) {
        __extends(VBlockquoteElement, _super);
        function VBlockquoteElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BLOCKQUOTE";
            return _this;
        }
        return VBlockquoteElement;
    }(VMDOM.VHtmlElement));
    VBlockquoteElement = __decorate([
        VMDOM.mergeClass({ cite: '' })
    ], VBlockquoteElement);
    VMDOM.VBlockquoteElement = VBlockquoteElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBodyElement = (function (_super) {
        __extends(VBodyElement, _super);
        function VBodyElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BODY";
            return _this;
        }
        return VBodyElement;
    }(VMDOM.VHtmlElement));
    VBodyElement = __decorate([
        VMDOM.mergeClass({ text: '', link: '', vLink: '', aLink: '', bgColor: '', background: '' })
    ], VBodyElement);
    VMDOM.VBodyElement = VBodyElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBrElement = (function (_super) {
        __extends(VBrElement, _super);
        function VBrElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "BR";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VBrElement;
    }(VMDOM.VHtmlElement));
    VBrElement = __decorate([
        VMDOM.mergeClass({ clear: '' })
    ], VBrElement);
    VMDOM.VBrElement = VBrElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VCanvasElement = (function (_super) {
        __extends(VCanvasElement, _super);
        function VCanvasElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CANVAS";
            return _this;
        }
        return VCanvasElement;
    }(VMDOM.VHtmlElement));
    VCanvasElement = __decorate([
        VMDOM.mergeClass({ width: '', height: '' })
    ], VCanvasElement);
    VMDOM.VCanvasElement = VCanvasElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VCaptionElement = (function (_super) {
        __extends(VCaptionElement, _super);
        function VCaptionElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CAPTION";
            return _this;
        }
        return VCaptionElement;
    }(VMDOM.VHtmlElement));
    VCaptionElement = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VCaptionElement);
    VMDOM.VCaptionElement = VCaptionElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VColElement = (function (_super) {
        __extends(VColElement, _super);
        function VColElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "COL";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VColElement;
    }(VMDOM.VHtmlElement));
    VColElement = __decorate([
        VMDOM.mergeClass({ span: '', align: '', vAlign: '', width: '' })
    ], VColElement);
    VMDOM.VColElement = VColElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VColgroupElement = (function (_super) {
        __extends(VColgroupElement, _super);
        function VColgroupElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "COLGROUP";
            return _this;
        }
        return VColgroupElement;
    }(VMDOM.VHtmlElement));
    VColgroupElement = __decorate([
        VMDOM.mergeClass({ span: '', align: '', vAlign: '', width: '' })
    ], VColgroupElement);
    VMDOM.VColgroupElement = VColgroupElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDialogElement = (function (_super) {
        __extends(VDialogElement, _super);
        function VDialogElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIALOG";
            return _this;
        }
        return VDialogElement;
    }(VMDOM.VHtmlElement));
    VDialogElement = __decorate([
        VMDOM.mergeClass({ open: '' })
    ], VDialogElement);
    VMDOM.VDialogElement = VDialogElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDirElement = (function (_super) {
        __extends(VDirElement, _super);
        function VDirElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIR";
            return _this;
        }
        return VDirElement;
    }(VMDOM.VHtmlElement));
    VDirElement = __decorate([
        VMDOM.mergeClass({ compact: '' })
    ], VDirElement);
    VMDOM.VDirElement = VDirElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDivElement = (function (_super) {
        __extends(VDivElement, _super);
        function VDivElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DIV";
            return _this;
        }
        return VDivElement;
    }(VMDOM.VHtmlElement));
    VDivElement = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VDivElement);
    VMDOM.VDivElement = VDivElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDlElement = (function (_super) {
        __extends(VDlElement, _super);
        function VDlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DL";
            return _this;
        }
        return VDlElement;
    }(VMDOM.VHtmlElement));
    VDlElement = __decorate([
        VMDOM.mergeClass({ compact: '' })
    ], VDlElement);
    VMDOM.VDlElement = VDlElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VFieldsetElement = (function (_super) {
        __extends(VFieldsetElement, _super);
        function VFieldsetElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FIELDSET";
            return _this;
        }
        return VFieldsetElement;
    }(VMDOM.VHtmlElement));
    VFieldsetElement = __decorate([
        VMDOM.mergeClass({ disabled: '', name: '' })
    ], VFieldsetElement);
    VMDOM.VFieldsetElement = VFieldsetElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VFrameElement = (function (_super) {
        __extends(VFrameElement, _super);
        function VFrameElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "FRAME";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VFrameElement;
    }(VMDOM.VHtmlElement));
    VFrameElement = __decorate([
        VMDOM.mergeClass({ name: '', scrolling: '', frameBorder: '', marginHeight: '', marginWidth: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFrameElement);
    VMDOM.VFrameElement = VFrameElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH1Element = (function (_super) {
        __extends(VH1Element, _super);
        function VH1Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H1";
            return _this;
        }
        return VH1Element;
    }(VMDOM.VHtmlElement));
    VH1Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH1Element);
    VMDOM.VH1Element = VH1Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH2Element = (function (_super) {
        __extends(VH2Element, _super);
        function VH2Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H2";
            return _this;
        }
        return VH2Element;
    }(VMDOM.VHtmlElement));
    VH2Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH2Element);
    VMDOM.VH2Element = VH2Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH3Element = (function (_super) {
        __extends(VH3Element, _super);
        function VH3Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H3";
            return _this;
        }
        return VH3Element;
    }(VMDOM.VHtmlElement));
    VH3Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH3Element);
    VMDOM.VH3Element = VH3Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH4Element = (function (_super) {
        __extends(VH4Element, _super);
        function VH4Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H4";
            return _this;
        }
        return VH4Element;
    }(VMDOM.VHtmlElement));
    VH4Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH4Element);
    VMDOM.VH4Element = VH4Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH5Element = (function (_super) {
        __extends(VH5Element, _super);
        function VH5Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H5";
            return _this;
        }
        return VH5Element;
    }(VMDOM.VHtmlElement));
    VH5Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH5Element);
    VMDOM.VH5Element = VH5Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VH6Element = (function (_super) {
        __extends(VH6Element, _super);
        function VH6Element() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "H6";
            return _this;
        }
        return VH6Element;
    }(VMDOM.VHtmlElement));
    VH6Element = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VH6Element);
    VMDOM.VH6Element = VH6Element;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VHeadElement = (function (_super) {
        __extends(VHeadElement, _super);
        function VHeadElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "HEAD";
            return _this;
        }
        return VHeadElement;
    }(VMDOM.VHtmlElement));
    VHeadElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHeadElement);
    VMDOM.VHeadElement = VHeadElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VHrElement = (function (_super) {
        __extends(VHrElement, _super);
        function VHrElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "HR";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VHrElement;
    }(VMDOM.VHtmlElement));
    VHrElement = __decorate([
        VMDOM.mergeClass({ align: '', color: '', noShade: '', size: '', width: '' })
    ], VHrElement);
    VMDOM.VHrElement = VHrElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VIframeElement = (function (_super) {
        __extends(VIframeElement, _super);
        function VIframeElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "IFRAME";
            return _this;
        }
        return VIframeElement;
    }(VMDOM.VHtmlElement));
    VIframeElement = __decorate([
        VMDOM.mergeClass({ src: '', srcdoc: '', name: '', sandbox: '', allowFullscreen: '', width: '', height: '', align: '', scrolling: '', frameBorder: '', longDesc: '', marginHeight: '', marginWidth: '' })
    ], VIframeElement);
    VMDOM.VIframeElement = VIframeElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VImgElement = (function (_super) {
        __extends(VImgElement, _super);
        function VImgElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "IMG";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VImgElement;
    }(VMDOM.VHtmlElement));
    VImgElement = __decorate([
        VMDOM.mergeClass({ alt: '', src: '', srcset: '', sizes: '', crossOrigin: '', useMap: '', isMap: '', width: '', height: '', name: '', lowsrc: '', align: '', hspace: '', vspace: '', longDesc: '', border: '' })
    ], VImgElement);
    VMDOM.VImgElement = VImgElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
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
    }(VMDOM.VHtmlElement));
    VInputElement = __decorate([
        VMDOM.mergeClass({ accept: '', alt: '', autocomplete: '', autofocus: '', checked: '', dirName: '', disabled: '', formAction: '', formEnctype: '', formMethod: '', formNoValidate: '', formTarget: '', height: '', max: '', maxLength: '', min: '', minLength: '', multiple: '', name: '', pattern: '', placeholder: '', readOnly: '', required: '', size: '', src: '', step: '', type: '', value: '', width: '', align: '', useMap: '', autocapitalize: '', webkitdirectory: '', incremental: '' })
    ], VInputElement);
    VMDOM.VInputElement = VInputElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VInsElement = (function (_super) {
        __extends(VInsElement, _super);
        function VInsElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "INS";
            return _this;
        }
        return VInsElement;
    }(VMDOM.VHtmlElement));
    VInsElement = __decorate([
        VMDOM.mergeClass({ cite: '', dateTime: '' })
    ], VInsElement);
    VMDOM.VInsElement = VInsElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VKeygenElement = (function (_super) {
        __extends(VKeygenElement, _super);
        function VKeygenElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "KEYGEN";
            return _this;
        }
        return VKeygenElement;
    }(VMDOM.VHtmlElement));
    VKeygenElement = __decorate([
        VMDOM.mergeClass({ autofocus: '', challenge: '', disabled: '', keytype: '', name: '' })
    ], VKeygenElement);
    VMDOM.VKeygenElement = VKeygenElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VLegendElement = (function (_super) {
        __extends(VLegendElement, _super);
        function VLegendElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LEGEND";
            return _this;
        }
        return VLegendElement;
    }(VMDOM.VHtmlElement));
    VLegendElement = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VLegendElement);
    VMDOM.VLegendElement = VLegendElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VLiElement = (function (_super) {
        __extends(VLiElement, _super);
        function VLiElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LI";
            return _this;
        }
        return VLiElement;
    }(VMDOM.VHtmlElement));
    VLiElement = __decorate([
        VMDOM.mergeClass({ value: '', type: '' })
    ], VLiElement);
    VMDOM.VLiElement = VLiElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VLinkElement = (function (_super) {
        __extends(VLinkElement, _super);
        function VLinkElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "LINK";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VLinkElement;
    }(VMDOM.VHtmlElement));
    VLinkElement = __decorate([
        VMDOM.mergeClass({ disabled: '', href: '', crossOrigin: '', rel: '', media: '', hreflang: '', type: '', charset: '', rev: '', target: '', integrity: '' })
    ], VLinkElement);
    VMDOM.VLinkElement = VLinkElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VMapElement = (function (_super) {
        __extends(VMapElement, _super);
        function VMapElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "MAP";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VMapElement;
    }(VMDOM.VHtmlElement));
    VMapElement = __decorate([
        VMDOM.mergeClass({ name: '' })
    ], VMapElement);
    VMDOM.VMapElement = VMapElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VMenuElement = (function (_super) {
        __extends(VMenuElement, _super);
        function VMenuElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "MENU";
            return _this;
        }
        return VMenuElement;
    }(VMDOM.VHtmlElement));
    VMenuElement = __decorate([
        VMDOM.mergeClass({ compact: '' })
    ], VMenuElement);
    VMDOM.VMenuElement = VMenuElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VMetaElement = (function (_super) {
        __extends(VMetaElement, _super);
        function VMetaElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "META";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VMetaElement;
    }(VMDOM.VHtmlElement));
    VMetaElement = __decorate([
        VMDOM.mergeClass({ name: '', content: '', scheme: '' })
    ], VMetaElement);
    VMDOM.VMetaElement = VMetaElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VMeterElement = (function (_super) {
        __extends(VMeterElement, _super);
        function VMeterElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "METER";
            return _this;
        }
        return VMeterElement;
    }(VMDOM.VHtmlElement));
    VMeterElement = __decorate([
        VMDOM.mergeClass({ value: '', min: '', max: '', low: '', high: '', optimum: '' })
    ], VMeterElement);
    VMDOM.VMeterElement = VMeterElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VOlElement = (function (_super) {
        __extends(VOlElement, _super);
        function VOlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OL";
            return _this;
        }
        return VOlElement;
    }(VMDOM.VHtmlElement));
    VOlElement = __decorate([
        VMDOM.mergeClass({ reversed: '', start: '', type: '', compact: '' })
    ], VOlElement);
    VMDOM.VOlElement = VOlElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VOptgroupElement = (function (_super) {
        __extends(VOptgroupElement, _super);
        function VOptgroupElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OPTGROUP";
            return _this;
        }
        return VOptgroupElement;
    }(VMDOM.VHtmlElement));
    VOptgroupElement = __decorate([
        VMDOM.mergeClass({ disabled: '', label: '' })
    ], VOptgroupElement);
    VMDOM.VOptgroupElement = VOptgroupElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VOptionElement = (function (_super) {
        __extends(VOptionElement, _super);
        function VOptionElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OPTION";
            return _this;
        }
        return VOptionElement;
    }(VMDOM.VHtmlElement));
    VOptionElement = __decorate([
        VMDOM.mergeClass({ disabled: '', label: '', selected: '', value: '' })
    ], VOptionElement);
    VMDOM.VOptionElement = VOptionElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VOutputElement = (function (_super) {
        __extends(VOutputElement, _super);
        function VOutputElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OUTPUT";
            return _this;
        }
        return VOutputElement;
    }(VMDOM.VHtmlElement));
    VOutputElement = __decorate([
        VMDOM.mergeClass({ name: '' })
    ], VOutputElement);
    VMDOM.VOutputElement = VOutputElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VParamElement = (function (_super) {
        __extends(VParamElement, _super);
        function VParamElement() {
            var _this = _super.call(this) || this;
            _this.nodeName = "PARAM";
            _this.vmData.closeSelf = true;
            return _this;
        }
        return VParamElement;
    }(VMDOM.VHtmlElement));
    VParamElement = __decorate([
        VMDOM.mergeClass({ name: '', value: '', type: '', valueType: '' })
    ], VParamElement);
    VMDOM.VParamElement = VParamElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VPElement = (function (_super) {
        __extends(VPElement, _super);
        function VPElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "P";
            return _this;
        }
        return VPElement;
    }(VMDOM.VHtmlElement));
    VPElement = __decorate([
        VMDOM.mergeClass({ align: '' })
    ], VPElement);
    VMDOM.VPElement = VPElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VPreElement = (function (_super) {
        __extends(VPreElement, _super);
        function VPreElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "PRE";
            return _this;
        }
        return VPreElement;
    }(VMDOM.VHtmlElement));
    VPreElement = __decorate([
        VMDOM.mergeClass({ width: '' })
    ], VPreElement);
    VMDOM.VPreElement = VPreElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VProgressElement = (function (_super) {
        __extends(VProgressElement, _super);
        function VProgressElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "PROGRESS";
            return _this;
        }
        return VProgressElement;
    }(VMDOM.VHtmlElement));
    VProgressElement = __decorate([
        VMDOM.mergeClass({ value: '', max: '' })
    ], VProgressElement);
    VMDOM.VProgressElement = VProgressElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VQElement = (function (_super) {
        __extends(VQElement, _super);
        function VQElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "Q";
            return _this;
        }
        return VQElement;
    }(VMDOM.VHtmlElement));
    VQElement = __decorate([
        VMDOM.mergeClass({ cite: '' })
    ], VQElement);
    VMDOM.VQElement = VQElement;
})(VMDOM || (VMDOM = {}));
/// <reference path="../../core/node.ts"/>
var VMDOM;
(function (VMDOM) {
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
                for (var i = 0; i < attrs.length; i++) {
                    sAttr += '._("' + attrs[i].name;
                    if (attrs[i].value) {
                        sAttr += '","' + attrs[i].value + '")';
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
    }(VMDOM.VHtmlElement));
    VScriptElement = __decorate([
        VMDOM.mergeClass({ src: '', type: '', charset: '', async: '', defer: '', crossOrigin: '', event: '', integrity: '' })
    ], VScriptElement);
    VMDOM.VScriptElement = VScriptElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
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
    }(VMDOM.VHtmlElement));
    VSelectElement = __decorate([
        VMDOM.mergeClass({ autofocus: '', disabled: '', multiple: '', name: '', required: '', size: '' })
    ], VSelectElement);
    VMDOM.VSelectElement = VSelectElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VSourceElement = (function (_super) {
        __extends(VSourceElement, _super);
        function VSourceElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SOURCE";
            return _this;
        }
        return VSourceElement;
    }(VMDOM.VHtmlElement));
    VSourceElement = __decorate([
        VMDOM.mergeClass({ src: '', type: '', srcset: '', sizes: '', media: '' })
    ], VSourceElement);
    VMDOM.VSourceElement = VSourceElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VStyleElement = (function (_super) {
        __extends(VStyleElement, _super);
        function VStyleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "STYLE";
            return _this;
        }
        return VStyleElement;
    }(VMDOM.VHtmlElement));
    VStyleElement = __decorate([
        VMDOM.mergeClass({ media: '', type: '' })
    ], VStyleElement);
    VMDOM.VStyleElement = VStyleElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTableElement = (function (_super) {
        __extends(VTableElement, _super);
        function VTableElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TABLE";
            return _this;
        }
        return VTableElement;
    }(VMDOM.VHtmlElement));
    VTableElement = __decorate([
        VMDOM.mergeClass({ align: '', border: '', frame: '', rules: '', summary: '', width: '', bgColor: '', cellPadding: '', cellSpacing: '' })
    ], VTableElement);
    VMDOM.VTableElement = VTableElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTbodyElement = (function (_super) {
        __extends(VTbodyElement, _super);
        function VTbodyElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TBODY";
            return _this;
        }
        return VTbodyElement;
    }(VMDOM.VHtmlElement));
    VTbodyElement = __decorate([
        VMDOM.mergeClass({ align: '', vAlign: '' })
    ], VTbodyElement);
    VMDOM.VTbodyElement = VTbodyElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTdElement = (function (_super) {
        __extends(VTdElement, _super);
        function VTdElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TD";
            return _this;
        }
        return VTdElement;
    }(VMDOM.VHtmlElement));
    VTdElement = __decorate([
        VMDOM.mergeClass({ colSpan: '', rowSpan: '', headers: '', align: '', axis: '', height: '', width: '', noWrap: '', vAlign: '', bgColor: '', abbr: '', scope: '' })
    ], VTdElement);
    VMDOM.VTdElement = VTdElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
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
    }(VMDOM.VHtmlElement));
    VTextareaElement = __decorate([
        VMDOM.mergeClass({ autofocus: '', cols: '', dirName: '', disabled: '', maxLength: '', minLength: '', name: '', placeholder: '', readOnly: '', required: '', rows: '', wrap: '', autocapitalize: '' })
    ], VTextareaElement);
    VMDOM.VTextareaElement = VTextareaElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTfootElement = (function (_super) {
        __extends(VTfootElement, _super);
        function VTfootElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TFOOT";
            return _this;
        }
        return VTfootElement;
    }(VMDOM.VHtmlElement));
    VTfootElement = __decorate([
        VMDOM.mergeClass({ align: '', vAlign: '' })
    ], VTfootElement);
    VMDOM.VTfootElement = VTfootElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTheadElement = (function (_super) {
        __extends(VTheadElement, _super);
        function VTheadElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "THREAD";
            return _this;
        }
        return VTheadElement;
    }(VMDOM.VHtmlElement));
    VTheadElement = __decorate([
        VMDOM.mergeClass({ align: '', vAlign: '' })
    ], VTheadElement);
    VMDOM.VTheadElement = VTheadElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VThElement = (function (_super) {
        __extends(VThElement, _super);
        function VThElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TH";
            return _this;
        }
        return VThElement;
    }(VMDOM.VHtmlElement));
    VThElement = __decorate([
        VMDOM.mergeClass({ colSpan: '', rowSpan: '', headers: '', align: '', axis: '', height: '', width: '', noWrap: '', vAlign: '', bgColor: '', abbr: '', scope: '' })
    ], VThElement);
    VMDOM.VThElement = VThElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTrackElement = (function (_super) {
        __extends(VTrackElement, _super);
        function VTrackElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TRACK";
            return _this;
        }
        return VTrackElement;
    }(VMDOM.VHtmlElement));
    VTrackElement = __decorate([
        VMDOM.mergeClass({ kind: '', src: '', srclang: '', label: '', default: '' })
    ], VTrackElement);
    VMDOM.VTrackElement = VTrackElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTrElement = (function (_super) {
        __extends(VTrElement, _super);
        function VTrElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TR";
            return _this;
        }
        return VTrElement;
    }(VMDOM.VHtmlElement));
    VTrElement = __decorate([
        VMDOM.mergeClass({ align: '', vAlign: '', bgColor: '' })
    ], VTrElement);
    VMDOM.VTrElement = VTrElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VUlElement = (function (_super) {
        __extends(VUlElement, _super);
        function VUlElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "UL";
            return _this;
        }
        return VUlElement;
    }(VMDOM.VHtmlElement));
    VUlElement = __decorate([
        VMDOM.mergeClass({ compact: '', type: '' })
    ], VUlElement);
    VMDOM.VUlElement = VUlElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VVideoElement = (function (_super) {
        __extends(VVideoElement, _super);
        function VVideoElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "VIDEO";
            return _this;
        }
        return VVideoElement;
    }(VMDOM.VHtmlElement));
    VVideoElement = __decorate([
        VMDOM.mergeClass({ width: '', height: '', poster: '' })
    ], VVideoElement);
    VMDOM.VVideoElement = VVideoElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VXmpElement = (function (_super) {
        __extends(VXmpElement, _super);
        function VXmpElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "XMP";
            return _this;
        }
        return VXmpElement;
    }(VMDOM.VHtmlElement));
    VXmpElement = __decorate([
        VMDOM.mergeClass({ width: '' })
    ], VXmpElement);
    VMDOM.VXmpElement = VXmpElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VTitleElement = (function (_super) {
        __extends(VTitleElement, _super);
        function VTitleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "TITLE";
            return _this;
        }
        return VTitleElement;
    }(VMDOM.VHtmlElement));
    VTitleElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VTitleElement);
    VMDOM.VTitleElement = VTitleElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VSpanElement = (function (_super) {
        __extends(VSpanElement, _super);
        function VSpanElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SPAN";
            return _this;
        }
        return VSpanElement;
    }(VMDOM.VHtmlElement));
    VSpanElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VSpanElement);
    VMDOM.VSpanElement = VSpanElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VEmElement = (function (_super) {
        __extends(VEmElement, _super);
        function VEmElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "EM";
            return _this;
        }
        return VEmElement;
    }(VMDOM.VHtmlElement));
    VEmElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VEmElement);
    VMDOM.VEmElement = VEmElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VIElement = (function (_super) {
        __extends(VIElement, _super);
        function VIElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "I";
            return _this;
        }
        return VIElement;
    }(VMDOM.VHtmlElement));
    VIElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VIElement);
    VMDOM.VIElement = VIElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VBElement = (function (_super) {
        __extends(VBElement, _super);
        function VBElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "B";
            return _this;
        }
        return VBElement;
    }(VMDOM.VHtmlElement));
    VBElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VBElement);
    VMDOM.VBElement = VBElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VFormElement = (function (_super) {
        __extends(VFormElement, _super);
        function VFormElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FORM";
            return _this;
        }
        return VFormElement;
    }(VMDOM.VHtmlElement));
    VFormElement = __decorate([
        VMDOM.mergeClass({ name: '', target: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFormElement);
    VMDOM.VFormElement = VFormElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VLabelElement = (function (_super) {
        __extends(VLabelElement, _super);
        function VLabelElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "LABEL";
            return _this;
        }
        return VLabelElement;
    }(VMDOM.VHtmlElement));
    VLabelElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VLabelElement);
    VMDOM.VLabelElement = VLabelElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDtElement = (function (_super) {
        __extends(VDtElement, _super);
        function VDtElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DT";
            return _this;
        }
        return VDtElement;
    }(VMDOM.VHtmlElement));
    VDtElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VDtElement);
    VMDOM.VDtElement = VDtElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VDdElement = (function (_super) {
        __extends(VDdElement, _super);
        function VDdElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DD";
            return _this;
        }
        return VDdElement;
    }(VMDOM.VHtmlElement));
    VDdElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VDdElement);
    VMDOM.VDdElement = VDdElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VEmbedElement = (function (_super) {
        __extends(VEmbedElement, _super);
        function VEmbedElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "EMBED";
            return _this;
        }
        return VEmbedElement;
    }(VMDOM.VHtmlElement));
    VEmbedElement = __decorate([
        VMDOM.mergeClass({ type: '', width: '', height: '', align: '', name: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VEmbedElement);
    VMDOM.VEmbedElement = VEmbedElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VStrongElement = (function (_super) {
        __extends(VStrongElement, _super);
        function VStrongElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "STRONG";
            return _this;
        }
        return VStrongElement;
    }(VMDOM.VHtmlElement));
    VStrongElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VStrongElement);
    VMDOM.VStrongElement = VStrongElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VButtonElement = (function (_super) {
        __extends(VButtonElement, _super);
        function VButtonElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "BUTTON";
            return _this;
        }
        return VButtonElement;
    }(VMDOM.VHtmlElement));
    VButtonElement = __decorate([
        VMDOM.mergeClass({ formTarget: '', name: '', value: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VButtonElement);
    VMDOM.VButtonElement = VButtonElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VObjectElement = (function (_super) {
        __extends(VObjectElement, _super);
        function VObjectElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "OBJECT";
            return _this;
        }
        return VObjectElement;
    }(VMDOM.VHtmlElement));
    VObjectElement = __decorate([
        VMDOM.mergeClass({ type: '', name: '', useMap: '', width: '', height: '', align: '', archive: '', code: '', standby: '', codeType: '', border: '', title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VObjectElement);
    VMDOM.VObjectElement = VObjectElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VSvgElement = (function (_super) {
        __extends(VSvgElement, _super);
        function VSvgElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "SVG";
            return _this;
        }
        return VSvgElement;
    }(VMDOM.VHtmlElement));
    VSvgElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VSvgElement);
    VMDOM.VSvgElement = VSvgElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VCircleElement = (function (_super) {
        __extends(VCircleElement, _super);
        function VCircleElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "CIRCLE";
            return _this;
        }
        return VCircleElement;
    }(VMDOM.VHtmlElement));
    VCircleElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VCircleElement);
    VMDOM.VCircleElement = VCircleElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VHeaderElement = (function (_super) {
        __extends(VHeaderElement, _super);
        function VHeaderElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "HEADER";
            return _this;
        }
        return VHeaderElement;
    }(VMDOM.VHtmlElement));
    VHeaderElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VHeaderElement);
    VMDOM.VHeaderElement = VHeaderElement;
})(VMDOM || (VMDOM = {}));
var VMDOM;
(function (VMDOM) {
    var VFooterElement = (function (_super) {
        __extends(VFooterElement, _super);
        function VFooterElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "FOOTER";
            return _this;
        }
        return VFooterElement;
    }(VMDOM.VHtmlElement));
    VFooterElement = __decorate([
        VMDOM.mergeClass({ title: '', lang: '', accessKey: '', webkitdropzone: '', id: '' })
    ], VFooterElement);
    VMDOM.VFooterElement = VFooterElement;
})(VMDOM || (VMDOM = {}));
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
var VMDOM;
(function (VMDOM) {
    var VDomhelperElement = (function (_super) {
        __extends(VDomhelperElement, _super);
        function VDomhelperElement() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "DOMHELPER";
            return _this;
        }
        return VDomhelperElement;
    }(VMDOM.VHtmlElement));
    VMDOM.VDomhelperElement = VDomhelperElement;
})(VMDOM || (VMDOM = {}));
/// <reference path='BaseVNode.ts'/>
/// <reference path='VDomhelperElement.ts'/>
var VDOM = (function () {
    function VDOM() {
    }
    VDOM[''] = function (html, m) {
        var nodeName = m.node.nodeName;
        if (m.node.vmData.closeSelf) {
            m.node = m.node.parentNode;
            m.action = 'textNode';
            m.textNodeStart = m.index;
        }
        else if (VMDOM.stringNode.hasOwnProperty(nodeName)) {
            m.action = 'stringNode';
            m.stringNodeRegExp = VMDOM.stringNode[nodeName];
            m.stringNodeKeyLength = nodeName.length + 2;
            m.stringNodeStart = m.index;
            return;
        }
        else {
            m.action = 'textNode';
            m.textNodeStart = m.index;
        }
    };
    VDOM.textNode = function (html, m) {
        var data;
        switch (html[m.index]) {
            case '<':
                if (m.index < m.length + 1 && this.htmlwordRE.test(html[m.index + 1])) {
                    if (m.textNodeStart !== m.index) {
                        data = html.substring(m.textNodeStart, m.index);
                        if (!VMDOM.emptyTextNodeRE.test(data)) {
                            m.node(data, 3);
                        }
                        m.textNodeStart = 0;
                    }
                    m.htmlNodeStart = m.index;
                    m.index++;
                    m.action = 'htmlNode';
                }
                else {
                    m.index++;
                }
                break;
            default:
                m.index++;
        }
    };
    VDOM.createHTMLNode = function (html, m) {
        m.htmlNodeStart = 0;
        if (m.htmlNodeNameStart > 0) {
            //无属性标签
            var nodeName = html.substring(m.htmlNodeNameStart, m.index);
            m.node = m.node(nodeName);
            m.htmlNodeNameStart = 0;
            m.index++;
        }
        m.action = '';
    };
    VDOM.setHTMLNodeClose = function (html, m) {
        var n = m.node;
        var name = trim(html.substring(m.htmlNodeNameStart, m.index)).toUpperCase();
        while (n) {
            if (n.nodeName === name) {
                n.vmData.isClose = true;
                m.node = n.parentNode;
                m.action = '';
                m.htmlNodeNameStart = 0;
                return;
            }
            n = n.parentNode;
        }
        throw new Error("Tag is not closed!");
        //console.log('Tag is not closed!', name,m.htmlNodeNameStart,html.substring(m.htmlNodeNameStart-20, m.index+20));
        //m.node(name, 8);
    };
    VDOM.setAttrStart = function (m) {
        m.action = 'attributes';
        m.attrStart = 0;
        m.attrNameEnd = 0;
        m.equlIndex = 0;
        m.stringStart = 0;
        m.stringStartChar = '';
    };
    VDOM.htmlNode = function (html, m) {
        switch (html[m.index]) {
            case '>':
                this.createHTMLNode(html, m);
                break;
            case ' ':
                this.createHTMLNode(html, m);
                m.action = 'attributes';
                break;
            case '!':
                if (m.htmlNodeStart === m.index - 1) {
                    m.action = 'comment';
                }
                m.index++;
                break;
            case '/':
                if (m.htmlNodeStart === m.index - 1) {
                    m.action = 'endXmlNode';
                    m.index++;
                    m.htmlNodeNameStart = m.index;
                    return;
                }
                else if (m.length >= m.index + 1) {
                    if (html.substr(m.index + 1, 1) === '>') {
                        this.createHTMLNode(html, m);
                        m.index++;
                        return;
                    }
                }
                break;
            default:
                if (m.htmlNodeNameStart === 0) {
                    m.htmlNodeNameStart = m.index;
                }
                m.index++;
        }
    };
    VDOM.endXmlNode = function (html, m) {
        switch (html[m.index]) {
            case '>':
                this.setHTMLNodeClose(html, m);
                m.index++;
                break;
            default:
                m.index++;
        }
    };
    VDOM.comment = function (html, m) {
        switch (html[m.index]) {
            case '>':
                m.node('', 8);
                m.index++;
                break;
            case '-':
                if (m.length >= m.index + 2) {
                    if (html.substr(m.index + 1, 1) === '-') {
                        m.commentStart = m.index + 2;
                        m.action = 'comment3';
                        m.index += 2;
                    }
                    else {
                        m.commentStart = m.index;
                        m.action = 'comment2';
                        m.index++;
                    }
                }
                else {
                    m.index++;
                }
                break;
            case 'd':
            case 'D':
                if (m.length >= m.index + 7) {
                    if (html.substr(m.index + 1, 6).toUpperCase() === 'OCTYPE') {
                        m.node('', 10);
                        m.index += 13;
                        m.action = '';
                        break;
                    }
                }
            default:
                m.commentStart = m.index;
                m.action = 'comment2';
                m.index++;
        }
    };
    VDOM.comment2 = function (html, m) {
        if (html[m.index] === '>') {
            var vNode = m.node(html.substring(m.commentStart, m.index), 8);
            vNode.vmData.doubleMinus = false;
            m.commentStart = 0;
            m.action = '';
        }
        m.index++;
    };
    VDOM.comment3 = function (html, m) {
        if (html[m.index] === '-') {
            if (m.length >= m.index + 3) {
                if (html.substr(m.index + 1, 2) === '->') {
                    var vNode = m.node(html.substring(m.commentStart, m.index), 8);
                    vNode.vmData.doubleMinus = true;
                    m.commentStart = 0;
                    m.action = '';
                    m.index += 3;
                    return;
                }
            }
        }
        m.index++;
    };
    VDOM.setAttr = function (html, m) {
        m.node._(html.substring(m.attrStart, m.attrNameEnd));
        m.attrStart = m.attrNameEnd = 0;
    };
    VDOM.attributes = function (html, m) {
        switch (html[m.index]) {
            case '/':
                if (m.length >= m.index + 2) {
                    if (html.substr(m.index + 1, 1) === '>') {
                        if (m.attrStart !== m.attrNameEnd) {
                            if (m.attrNameEnd === 0) {
                                m.attrNameEnd = m.index;
                            }
                            this.setAttr(html, m);
                        }
                        m.action = '';
                        m.index += 2;
                        break;
                    }
                }
                m.action = '';
                m.index++;
                break;
            case '>':
                if (m.attrStart !== m.attrNameEnd) {
                    if (m.attrNameEnd === 0) {
                        m.attrNameEnd = m.index;
                    }
                    this.setAttr(html, m);
                }
                m.action = '';
                m.index++;
                break;
            case '=':
                if (m.attrStart > 0 && m.attrNameEnd === 0) {
                    m.attrNameEnd = m.index;
                }
                m.equlIndex = m.index;
                m.action = 'attrValue';
                m.index++;
                break;
            case '\r':
            case '\n':
            case ' ':
                if (m.attrStart > 0 && m.attrNameEnd === 0) {
                    m.attrNameEnd = m.index;
                }
                m.index++;
                break;
            default:
                if (m.attrStart === 0) {
                    m.attrStart = m.index;
                }
                else if (m.equlIndex > 0 || m.attrNameEnd !== 0) {
                    this.setAttr(html, m);
                    this.setAttrStart(m);
                    m.attrStart = m.index;
                }
                m.index++;
        }
    };
    VDOM.attrValue = function (html, m) {
        switch (html[m.index]) {
            case '\r':
            case '\n':
            case ' ':
                m.index++;
                break;
            case '"':
                m.stringStartChar = '"';
                m.action = 'atvstring';
                m.index++;
                m.stringStart = m.index;
                break;
            case "'":
                m.stringStartChar = '\'';
                m.action = 'atvstring';
                m.index++;
                m.stringStart = m.index;
                break;
            case '>':
                /*忽略等号*/
                this.setAttr(html, m);
                m.action = '';
                m.index++;
                break;
            case "/":
                if (m.length >= m.index + 2) {
                    if (html.substring(m.index + 1, 1) === '>') {
                        this.setAttr(html, m);
                        m.action = '';
                        m.index += 2;
                        return;
                    }
                }
                m.index++;
                break;
            default:
                m.action = 'atvbetweenSpace';
                m.betweenSpaceStart = m.index;
                m.index++;
        }
    };
    VDOM.atvbetweenSpace = function (html, m) {
        switch (html[m.index]) {
            case ' ':
                m.node._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                this.setAttrStart(m);
                m.index++;
                break;
            case '>':
                m.node._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                this.setAttrStart(m);
                break;
            case "/":
                if (m.length >= m.index + 2) {
                    m.node._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                    if (html.substring(m.index + 1, 1) === '>') {
                        this.setAttrStart(m);
                        m.index++;
                        return;
                    }
                }
                m.index++;
            default:
                m.index++;
        }
    };
    VDOM.atvstring = function (html, m) {
        switch (html[m.index]) {
            case '\\':
                m.index += 2;
                break;
            case m.stringStartChar:
                m.node._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.stringStart, m.index));
                this.setAttrStart(m);
                m.index++;
                break;
            default:
                m.index++;
        }
    };
    VDOM.stringNode = function (html, m) {
        if (html[m.index] === '<') {
            if (m.length >= m.index + m.stringNodeKeyLength + 1) {
                if (m.stringNodeRegExp && m.stringNodeRegExp.test(html.substr(m.index + 1, m.stringNodeKeyLength))) {
                    var s = html.substring(m.stringNodeStart, m.index);
                    if (!VMDOM.emptyTextNodeRE.test(s)) {
                        m.node.addText(s);
                    }
                    m.stringNodeStart = 0;
                    m.stringNodeRegExp = null;
                    m.action = 'stringNode2';
                    m.node.vmData.isClose = true;
                    if (!m.node.parentNode) {
                        throw new Error("渲染出错！");
                    }
                    m.node = m.node.parentNode;
                    m.index += m.stringNodeKeyLength;
                    m.stringNodeKeyLength = 0;
                    return;
                }
            }
        }
        m.index++;
    };
    VDOM.stringNode2 = function (html, m) {
        if (html[m.index] === '>') {
            m.action = '';
        }
        m.index++;
    };
    VDOM.checkEnd = function (html, m) {
        if (m.action === 'textNode') {
            if (m.textNodeStart !== m.index) {
                var data = html.substring(m.textNodeStart, m.index);
                if (!VMDOM.emptyTextNodeRE.test(data)) {
                    m.node(data, 3);
                }
                m.textNodeStart = 0;
            }
        }
        else if (m.action !== "") {
            console.log(m.action);
            debugger;
        }
    };
    VDOM.getInitData = function (vNode, length) {
        if (!vNode) {
            vNode = $$$('domhelper');
            vNode.vmData.isClose = true;
        }
        return {
            index: 0,
            node: vNode,
            action: '',
            length: length,
            textNodeStart: 0,
            htmlNodeStart: 0,
            htmlNodeNameStart: 0,
            attrStart: 0,
            attrNameEnd: 0,
            equlIndex: 0,
            stringStart: 0,
            stringStartChar: '',
            betweenSpaceStart: 0,
            stringNodeStart: 0,
            stringNodeRegExp: null,
            stringNodeKeyLength: 0,
            commentStart: 0
        };
    };
    return VDOM;
}());
VDOM.htmlwordRE = /[a-zA-Z\/\!]/;
VDOM.parseStructor = function (html, vNode) {
    var m = this.getInitData(vNode, html.length);
    var parent = m.node;
    while (m.index < html.length) {
        this[m.action](html, m);
    }
    this.checkEnd(html, m);
    if (vNode) {
        return vNode;
    }
    else {
        var ret = void 0;
        if (parent.childNodes.length === 1) {
            ret = parent.childNodes[0];
            VMDOM.VNodeList.clear(parent.childNodes);
            return ret;
        }
        else {
            ret = slice.call(parent.childNodes);
            VMDOM.VNodeList.clear(parent.childNodes);
            return ret;
        }
    }
};
var $$$ = VNodeHelp;
/// <reference path='VDOM.ts'/>
var AttrValueFilter = (function () {
    function AttrValueFilter() {
        this.nameStart = 0;
        this.nameEnd = 0;
    }
    return AttrValueFilter;
}());
var VDOM2 = (function (_super) {
    __extends(VDOM2, _super);
    function VDOM2() {
        return _super.apply(this, arguments) || this;
    }
    VDOM2.attrVarNameFilterParamBlock = function (html, m) {
        var keyWord = html[m.index];
        switch (keyWord) {
            case '(':
                var _a = JS.Parser.parseBlock(html, m.index), length_1 = _a.length, block = _a.block;
                debugger;
                //block.toString().length;
                JS.deleteSpace(block, true);
                if (block.children.length > 1) {
                    throw new Error('不支持：' + block.toString());
                }
                m.currentAttrValueFilter.params = block.children[0];
                m.index += length_1;
                m.action = 'attributes';
                return;
            case ' ':
            case '\r':
            case '\n':
                m.index++;
                return;
            default:
                throw new Error('错误的标识符:' + keyWord);
        }
    };
    VDOM2.attrVarNameFilter = function (html, m) {
        var keyWord = html[m.index];
        if (m.currentAttrValueFilter.nameStart === 0) {
            if (this.varNameKeyWordFirst.indexOf(keyWord) !== -1) {
                m.currentAttrValueFilter.nameStart = m.index;
                m.index++;
                return;
            }
        }
        else if (this.varNameKeyWord.indexOf(keyWord) === -1) {
            //结束
            m.currentAttrValueFilter.nameEnd = m.index;
            m.action = 'attrVarNameFilterParamBlock';
            // m.index++;
            return;
        }
        m.index++;
    };
    VDOM2.dot = function (html, m) {
        var keyWord = html[m.index];
        switch (keyWord) {
            case '\r':
            case '\n':
            case ' ':
                m.index++;
                return;
            case '.':
                m.currentAttrValueFilter = new AttrValueFilter;
                m.attrValueFilters.push(m.currentAttrValueFilter);
                m.action = 'attrVarNameFilter';
                m.index++;
                return;
        }
        m.action = 'attributes';
    };
    VDOM2.attrValue2 = function (html, m) {
        switch (html[m.index]) {
            case '}':
                m.attrValueEnd = m.index;
                m.action = 'dot';
        }
        m.index++;
    };
    // protected static attrVarNameStart(html:string,m:IMember2){
    //     switch (html[m.index]) {
    //         case '}':
    //             m.attrVarNameEnd=m.index;
    //             m.action='attributes';
    //     }
    //     m.index++;
    // }
    // static stringNode(html: string, m: IMember2) {
    //     if (!this.checkTemplate(html, m)) {
    //         super.stringNode(html, m);
    //     }
    // }
    VDOM2.setAttr = function (html, m) {
        var name;
        var defaultValue = undefined;
        // if(m.attrVarNameStart!==0&&m.attrVarNameStart<m.attrVarNameEnd){
        //     let directives=m.node.vmData.directives;
        //     if(directives===undefined){
        //         directives= m.node.vmData.directives=[];
        //     }
        //     name=html.substring(m.attrVarNameStart, m.attrVarNameEnd);
        //     let nameArr=splitByOnce(name,'?');
        //     if(nameArr.length===2){
        //         throw new Error('')
        //     }
        //     directives.push({
        //         name:name,
        //         defaultValue:undefined,
        //         filters:null
        //     });
        // }else 
        if (m.attrValueStart !== 0 && m.attrValueEnd > m.attrValueStart) {
            var directives = m.node.vmData.directives;
            if (directives === undefined) {
                directives = m.node.vmData.directives = [];
            }
            var filters = [];
            for (var _i = 0, _a = m.attrValueFilters; _i < _a.length; _i++) {
                var filter = _a[_i];
                var params = void 0;
                if (filter.params) {
                    params = filter.params.split(',');
                    for (var _b = 0, params_1 = params; _b < params_1.length; _b++) {
                        var param = params_1[_b];
                        if (!isConst(param)) {
                            throw new Error('filter参数仅支持常量！');
                        }
                    }
                }
                else {
                    params = [];
                }
                var filterInfo = {
                    name: html.substring(filter.nameStart, filter.nameEnd),
                    params: params
                };
                filters.push(filterInfo);
            }
            name = html.substring(m.attrValueStart, m.attrValueEnd);
            var nameArr = splitByOnce(name, '?');
            if (nameArr.length === 2) {
                name = nameArr[0];
                defaultValue = nameArr[1];
                var v = JS.toConst(defaultValue);
                if (isString(v)) {
                    if (!isStringConst(defaultValue)) {
                        throw new Error('默认值仅支持常量！');
                    }
                }
                else {
                    defaultValue = "'" + defaultValue + "'";
                }
            }
            directives.push({
                attrName: html.substring(m.attrStart, m.attrNameEnd),
                name: name,
                defaultValue: defaultValue,
                filters: filters
            });
            m.attrValueFilters = [];
            m.attrValueStart = 0;
            m.attrValueEnd = 0;
            m.attrStart = 0;
            m.attrNameEnd = 0;
            m.equlIndex = 0;
        }
        else {
            _super.setAttr.call(this, html, m);
        }
    };
    VDOM2.attributes = function (html, m) {
        switch (html[m.index]) {
            case '=':
                if (html[m.index + 1] === '$' && m.length > m.index + 2 && html[m.index + 2] === '{') {
                    if (m.attrStart > 0 && m.attrNameEnd === 0) {
                        m.attrNameEnd = m.index;
                    }
                    m.equlIndex = m.index;
                    if (m.attrValueStart === 0) {
                        m.action = 'attrValue2';
                        m.index += 3;
                        m.attrValueStart = m.index;
                        m.attrValueFilters = [];
                        break;
                    }
                    else {
                        throw new Error('之前的${未闭合');
                    }
                }
            default:
                _super.attributes.call(this, html, m);
        }
    };
    VDOM2.textNode = function (html, m) {
        var data;
        switch (html[m.index]) {
            case '@':
                if (m.index < m.length - 2 && html[m.index + 1] === '{') {
                    var data_1;
                    if (m.textNodeStart !== m.index) {
                        data_1 = html.substring(m.textNodeStart, m.index);
                        if (!VMDOM.emptyTextNodeRE.test(data_1)) {
                            m.node(data_1, 3);
                        }
                    }
                    m.index++;
                    var _a = JS.Parser.parseBlock(html, m.index), length_2 = _a.length, block = _a.block;
                    m.index += length_2;
                    var order = $$$(block, 102 /* Order */);
                    m.node.appendChild(order);
                    m.textNodeStart = m.index;
                    break;
                }
            default:
                _super.textNode.call(this, html, m);
        }
    };
    VDOM2.getInitData = function (vNode, length) {
        var data = _super.getInitData.call(this, vNode, length);
        data.attrValueStart = 0;
        data.attrValueEnd = 0;
        return data;
    };
    return VDOM2;
}(VDOM));
VDOM2.varNameKeyWordFirst = "$abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
VDOM2.varNameKeyWord = "$abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789?";
//修改attributesToJS;   
//tag:hook
var VHtmlElement_attributesToJS = VMDOM.VHtmlElement.prototype.attributesToJS;
VMDOM.VHtmlElement.prototype.attributesToJS = function () {
    var s = VHtmlElement_attributesToJS.call(this);
    //解析directive
    var directives = this.vmData.directives;
    if (directives) {
        var fn = '';
        for (var _i = 0, directives_1 = directives; _i < directives_1.length; _i++) {
            var directive = directives_1[_i];
            fn += "\n                let $" + directive.name + ":any=props." + directive.name + ";";
            if (directive.defaultValue) {
                fn += "\n                if($" + directive.name + "===undefined){\n                    $" + directive.name + "=" + directive.defaultValue + ";\n                }";
            }
            var paramInfo = new PartParam(directive.name);
            if (directive.filters !== null) {
                for (var _a = 0, _b = directive.filters; _a < _b.length; _a++) {
                    var filter = _b[_a];
                    fn += "\n                $" + directive.name + "=PartParamFilter." + filter.name + "($" + directive.name + (filter.params.length > 0 ? ',' : '') + filter.params.join(',') + ");";
                }
            }
            fn += "\n                this._('" + directive.attrName + "',$" + directive.name + ".toString());";
        }
        s += ".___(function(this:" + toClassName(this) + "){" + fn + "\n            })";
    }
    return s;
};
function toClassName(node) {
    if (isVComment(node)) {
        return "VComment&IVNodeMethod";
    }
    else if (isVText(node)) {
        return "VText&IVNodeMethod";
    }
    else if (isVDocType(node)) {
        return "VDocumentType&IVNodeMethod";
    }
    else {
        var nodeName = node.nodeName;
        nodeName = nodeName[0] + nodeName.substr(1).toLowerCase();
        return 'VMDOM.V' + nodeName + 'Element&IVNodeMethod';
    }
}
function isConst(value) {
    var v = JS.toConst(value);
    if (isString(v)) {
        return isStringConst(value);
    }
    return true;
}
function isStringConst(value) {
    if (value.length >= 2) {
        switch (value[0]) {
            case "'":
            case '"':
            case '`':
                if (value[value.length - 1] === value[0]) {
                    return true;
                }
            default:
                return false;
        }
    }
    return false;
}
/// <reference path='VNode.ts'/>
var VMDOM;
(function (VMDOM) {
    var VPlaceHolder = (function (_super) {
        __extends(VPlaceHolder, _super);
        function VPlaceHolder() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "#placeholder";
            _this.nodeType = 100 /* PlaceHolder */;
            return _this;
        }
        VPlaceHolder.prototype.toHTMLString = function () {
            throw new Error("Can't toHTMLString");
        };
        VPlaceHolder.prototype.remove = function () {
            if (!this.parentNode) {
                return;
            }
            this.parentNode.removeChild(this);
        };
        return VPlaceHolder;
    }(VMDOM.VComment));
    VMDOM.VPlaceHolder = VPlaceHolder;
    VMDOM.bindClassToFunctionHelper[100 /* PlaceHolder */] = function (node, nodeName) {
        node.__proto__ = VPlaceHolder.prototype;
        VPlaceHolder.call(node, nodeName);
    };
})(VMDOM || (VMDOM = {}));
/// <reference path='../node/VPlaceHolder.ts'/>
var VMDOM;
(function (VMDOM) {
    var VMember = (function (_super) {
        __extends(VMember, _super);
        function VMember() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "#member";
            _this.nodeType = 101 /* Member */;
            _this.isVar = false;
            return _this;
        }
        VMember.prototype.toJS = function (space) {
            if (space === void 0) { space = 0; }
            return (new Array(space + 1)).join(" ") + (".$$$(" + (this.isVar ? "" : "this.") + this.data + ")");
        };
        return VMember;
    }(VMDOM.VPlaceHolder));
    VMember = __decorate([
        VMDOM.register('#member', 101 /* Member */)
    ], VMember);
    VMDOM.VMember = VMember;
    // bindClassToFunction2Helper['#member']=bindClassToFunctionHelper[ENodeType.Member]=function(node:IVNodeMethod & VNode,nodeName: string){
    //     node.__proto__=VMember.prototype;
    //     VMember.call(node,nodeName);
    // }
})(VMDOM || (VMDOM = {}));
/// <reference path='../node/VPlaceHolder.ts'/>
var VMDOM;
(function (VMDOM) {
    var VScript = (function (_super) {
        __extends(VScript, _super);
        function VScript() {
            var _this = _super.apply(this, arguments) || this;
            _this.nodeName = "#script";
            _this.nodeType = 103 /* Script */;
            return _this;
        }
        VScript.prototype.toJS = function () {
            return ".$$__(" + this.propertyName + ")";
        };
        VScript.prototype.toFunction = function () {
            return "function " + this.propertyName + "(this:VMDOM.VPlaceHolder){" + this.data + "\n    }";
        };
        return VScript;
    }(VMDOM.VPlaceHolder));
    VScript = __decorate([
        VMDOM.register('#script', 103 /* Script */)
    ], VScript);
    VMDOM.VScript = VScript;
    // bindClassToFunction2Helper['#script'] = bindClassToFunctionHelper[ENodeType.Script] = function (node: IVNodeMethod & VNode, nodeName: string) {
    //     node.__proto__ = VScript.prototype;
    //     VScript.call(node, nodeName);
    // }
})(VMDOM || (VMDOM = {}));
/// <reference path='../node/VPlaceHolder.ts'/>
var VMDOM;
(function (VMDOM) {
    var VOrder = (function (_super) {
        __extends(VOrder, _super);
        function VOrder(block) {
            var _this = _super.call(this, '') || this;
            _this.block = block;
            _this.nodeName = "#order";
            _this.nodeType = 102 /* Order */;
            return _this;
        }
        VOrder.prototype.cloneNode = function (deep) {
            return $$$(this.block.clone(), 102 /* Order */);
        };
        VOrder.prototype.toJS = function (space) {
            if (space === void 0) { space = 0; }
            return '';
        };
        return VOrder;
    }(VMDOM.VPlaceHolder));
    VOrder = __decorate([
        VMDOM.register('#order', 102 /* Order */)
    ], VOrder);
    VMDOM.VOrder = VOrder;
    // bindClassToFunction2Helper['#order']=bindClassToFunctionHelper[ENodeType.Order]=function(node:IVNodeMethod & VNode,block: JS.JavaScriptBlock){
    //     node.__proto__=VOrder.prototype;
    //     VOrder.call(node,block);
    // }
})(VMDOM || (VMDOM = {}));
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
var VElementHelper = (function () {
    function VElementHelper() {
    }
    VElementHelper.build = function (name, datas) {
        var decorates = [];
        for (var i in datas) {
            decorates.push(datas[i]);
        }
        var className = "V" + (name[0] + name.substr(1).toLowerCase()) + "Element";
        var propertys = decorates.join(":string\n        ") + ':string';
        return "\ninterface IVNodeMethod{\n    (nodeName: \"" + name.toLowerCase() + "\", nodeType?: 1): VMDOM." + className + "&IVNodeMethod;\n}\nnamespace VMDOM{\n    export class " + className + " extends VHtmlElement{\n        nodeName=\"" + name.toUpperCase() + "\"\n        " + propertys + "\n    }\n    VAP.decorate(" + className + ",[" + ('"' + decorates.join('","') + '"') + "]);\n}";
    };
    VElementHelper.checkAttr_Prop = function (name) {
        var elem = document.createElement(name);
        var names = [];
        for (var i in elem) {
            elem.setAttribute(i, "1");
            if (elem[i] === "1") {
                names.push(i);
            }
        }
        return names;
    };
    VElementHelper.buildByName = function (name) {
        return this.build(name.toUpperCase(), this.checkAttr_Prop(name));
    };
    return VElementHelper;
}());
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
/// <reference path="Scope.ts"/>
/// <reference path='../virtual/UIHelper/VDOM.ts'/>
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
    function getOrderInfoByString(s) {
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
    Order.getOrderInfoByString = getOrderInfoByString;
    /**从VOrder中读取命令 */
    function getOrderInfo(vOrder) {
        var block = vOrder.block.clone();
        var statements = block.children;
        if (statements.length === 0) {
            return null;
        }
        //无论是否有多个statement，order name 都只会出现在第一个statement里
        var statement = statements[0];
        var keyWords = statement.children;
        var keyWord = keyWords[0];
        if (keyWords[0] === ' ') {
            keyWords.shift();
            keyWord = keyWords[0];
        }
        if (isString(keyWord)) {
            var order = keyWord.match(orderRE);
            if (order) {
                keyWords.shift();
                return { order: order[0], condition: block.innerText };
            }
            else {
                var subOrder = keyWord.match(subOrderRE);
                if (subOrder) {
                    keyWords.shift();
                    return { subOrder: subOrder[0], condition: block.innerText };
                }
            }
        }
        return null;
    }
    Order.getOrderInfo = getOrderInfo;
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
    function parseOrder(node) {
        var info = getOrderInfo(node);
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
    Order.parseOrder = parseOrder;
    function parseComment(node) {
        var info = getOrderInfoByString(node.data);
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
    var _exec = newScopeFunction([]);
    function newScopeFunction(params) {
        var paramsInfo = params.join(',');
        if (paramsInfo.length > 0) {
            paramsInfo += ',';
        }
        return Function(paramsInfo + '$$turtle$$,node', 'with(this){return eval("("+$$turtle$$+")")};');
    }
    Order.newScopeFunction = newScopeFunction;
    function registerEnvVar(name, value) {
        if (name in $rootScope) {
            throw new Error(name + "无法重复注册到环境！");
        }
        $rootScope[name] = value;
    }
    Order.registerEnvVar = registerEnvVar;
    function exec(node, script) {
        //标记操作过程
        insertNode(node, $$$("\n        Order.exec(this,'" + script + "');", 103 /* Script */));
        var that = DOMScope.get(node);
        return _exec.call(that, script, node);
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
        for (var i = replaceScopes.oldScopes.length - 1; i >= 0; i--) {
            var oldScope = replaceScopes.oldScopes.pop();
            var scope = replaceScopes.scopes.pop();
            // debugger;
            // Object.defineProperty(scope.__actionNode__,'__scope__',{
            //     value:oldScope
            // });
            delete scope.__actionNode__.__scope__;
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
    // function emptyFunction(){}
    function defineCloneProperty(that, name, source) {
        var created = null;
        Object.defineProperty(that, name, {
            configurable: true,
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
            set: function (v) {
                debugger;
                // delete that[name];
                // that[name]=v;
            }
        });
    }
    function onPropertyChange(obj, name, fnOnSet) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        if (!desc)
            return;
        if (desc.configurable === false)
            throw new Error('绑定失败：原属性' + name + '替换失败');
        if (desc.writable === false)
            throw new Error('绑定失败：原属性' + name + '不可写');
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
    function bindElementProperty(obj, name, obj2, name2) {
        bindProperty(obj, name, obj2, name2, 2);
    }
    Order.bindElementProperty = bindElementProperty;
    function addBindInfo(obj, name, target, targetName, event) {
        var bindInfoHash = obj.__bind__;
        if (!bindInfoHash) {
            bindInfoHash = [];
            obj.__bind__ = bindInfoHash;
        }
        bindInfoHash.push({ name: name, target: target, targetName: targetName, event: event });
    }
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
    function bindProperty(obj, name, obj2, name2, type) {
        var bindInfo1 = getBindInfo(obj, name, name2);
        var bindInfo2 = getBindInfo(obj2, name2, name);
        if (bindInfo1 && bindInfo2 && bindInfo1.event !== bindInfo2.event) {
            throw new Error("不能混合不同的绑定链");
        }
        else if (bindInfo1) {
            var e = bindInfo1.event;
            addBindInfo(obj2, name2, obj, name, e);
            Array.prototype.push.call(e.list, obj2);
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
            Array.prototype.push.call(e.list, obj);
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
    }
    Order.bindProperty = bindProperty;
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
        VOrder.prototype.run = function () {
            this.constructor.run(this.data);
        };
        VOrder.eachOrder = function (array, fn, beginIndex) {
            if (beginIndex === void 0) { beginIndex = 0; }
            return treeEach(array, 'childNodes', function (node, state) {
                if (!(node instanceof VMDOM.VComment)) {
                    return;
                }
                var info;
                if (node instanceof VMDOM.VOrder) {
                    info = Order.getOrderInfo(node);
                }
                else {
                    info = Order.getOrderInfoByString(node.data);
                }
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
/// <reference path='VOrder.ts'/>
var Order;
(function (Order) {
    /**仅作其他命令的辅助标记 */
    var Break = (function (_super) {
        __extends(Break, _super);
        function Break() {
            return _super.apply(this, arguments) || this;
        }
        Break.run = function () { };
        return Break;
    }(Order.VOrder));
    Break.orderName = "break";
    Break = __decorate([
        Order.register
    ], Break);
})(Order || (Order = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='Break.ts'/>
var Order;
(function (Order) {
    var BlockOrder = (function (_super) {
        __extends(BlockOrder, _super);
        function BlockOrder(node, condition, orderName, isBlockStart) {
            var _this = _super.call(this, node, condition) || this;
            var data = _this.data;
            data.blocks = [];
            var i = getNodeIndex2(node);
            // let orderStack:VOrder[]=[this];
            var preOrderNode = node;
            var preNode = node;
            var preCondition = condition;
            var blockNodes = [];
            parseOrders(data, isBlockStart, node.parentNode.childNodes, false, function (node, subOrder, condition, state) {
                switch (subOrder) {
                    case 'end':
                        blockNodes.push(preNode);
                        data.blocks.push({ order: orderName, condition: preCondition, nodes: takeBlockBetween(preOrderNode, node) });
                        _this.endNode = node;
                        return 1 /* c_stopEach */;
                    case 'break':
                        return;
                    default:
                        blockNodes.push(preNode);
                        data.blocks.push({ order: orderName, condition: preCondition, nodes: takeBlockBetween(preOrderNode, node) });
                        preOrderNode = node;
                        preCondition = condition;
                        preNode = node;
                        orderName = subOrder;
                        return 4 /* c_noIn */;
                }
            }, i + 1);
            for (var _i = 0, blockNodes_1 = blockNodes; _i < blockNodes_1.length; _i++) {
                var blockNode = blockNodes_1[_i];
                blockNode.parentNode.removeChild(blockNode);
            }
            data.placeholder = $$$("PlaceHolder", 100 /* PlaceHolder */);
            replaceNodeByNode(_this.endNode, data.placeholder);
            return _this;
        }
        return BlockOrder;
    }(Order.VOrder));
    Order.BlockOrder = BlockOrder;
    //必须注册end；
    Order.addSubOrderName('end');
    function parseOrders(data, isBlockStart, array, run, fn, beginIndex) {
        if (beginIndex === void 0) { beginIndex = 0; }
        return Order.VOrder.eachOrder(array, function (node, info, state) {
            if (info.order) {
                if (info.order === 'break' && fn) {
                    return fn(node, 'break', "", state);
                }
                else {
                    if (run) {
                        runOrder(info, node);
                    }
                    else {
                        var innerBlock = parseBlock(info, node);
                        if (innerBlock) {
                            state.nextStepLength = getNodeIndex2(innerBlock.data.placeholder) - getNodeIndex2(node) + 1;
                        }
                        return 8 /* c_noRepeat */ & 4 /* c_noIn */;
                    }
                }
            }
            if (fn) {
                var subOrder = info.subOrder;
                if (subOrder === 'end' || isBlockStart(subOrder)) {
                    return fn(node, subOrder, info.condition, state);
                }
            }
            return 4 /* c_noIn */;
        }, beginIndex);
    }
    function runOrder(info, node) {
        var orderName = info.order;
        if (orderName in Order.orders) {
            var order = new Order.orders[orderName](node, info.condition);
            if (order.run && OrderEx.canRunAtService(order)) {
                order.run();
            }
        }
    }
    function parseBlock(info, node) {
        var orderName = info.order;
        if (orderName in Order.orders) {
            var order = Order.orders[orderName];
            if (order.prototype instanceof BlockOrder) {
                return new order(node, info.condition);
            }
        }
        return null;
    }
    function parseBreakOrder(data, isBlockStart, blocks, p) {
        parseOrders(data, isBlockStart, blocks, true, function (node, subOrder, condition, step) {
            if (subOrder === 'break') {
                data.isBreak = true;
                //级联删除break后面的数据直至当前层；
                var node1 = node;
                var pNode = node.parentNode;
                var level = step.stack.length / 2;
                while (level > 1) {
                    var cs = pNode.childNodes;
                    var length_3 = cs.length;
                    var index = getNodeIndex2(node1) + 1;
                    for (var i_3 = index; i_3 < length_3; i_3++) {
                        //删除后面的数据；
                        pNode.removeChild(cs[index]);
                    }
                    node1 = pNode;
                    pNode = pNode.parentNode;
                    level--;
                }
                for (var i = step.currentIndex + 1; i < blocks.length; i++) {
                    // pNode=<INode>blocks[i].parentNode;
                    pNode.removeChild(blocks[i]);
                }
                node.remove();
                return 1 /* c_stopEach */;
            }
        });
    }
    Order.parseBreakOrder = parseBreakOrder;
})(Order || (Order = {}));
/// <reference path='BlockOrder.ts'/>
var Order;
(function (Order) {
    var If = If_1 = (function (_super) {
        __extends(If, _super);
        function If(node, condition) {
            var _this = _super.call(this, node, condition, 'if', If_1.isBlockStart) || this;
            _this.data.condition = condition;
            return _this;
        }
        If.isBlockStart = function (subOrder) {
            switch (subOrder) {
                case 'else':
                case 'else if':
                    return true;
            }
            return false;
        };
        If.run = function (data) {
            var hit = -1;
            if (parseBool(Order.exec(data.placeholder, data.condition))) {
                hit = 0;
            }
            var blocks = data.blocks;
            for (var i = 1; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.order === 'else' || parseBool(Order.exec(data.placeholder, block.condition))) {
                    hit = i;
                    break;
                }
            }
            if (hit !== -1) {
                replaceNodeByNodes(data.placeholder, data.blocks[hit].nodes);
            }
        };
        return If;
    }(Order.BlockOrder));
    If.orderName = "if";
    If.subOrder = ["else if", "else"];
    If = If_1 = __decorate([
        Order.register
    ], If);
    Order.If = If;
    var If_1;
})(Order || (Order = {}));
/// <reference path='BlockOrder.ts'/>
var Order;
(function (Order) {
    var RepeatBlockOrder = (function (_super) {
        __extends(RepeatBlockOrder, _super);
        function RepeatBlockOrder(node, condition, orderName) {
            return _super.call(this, node, condition, orderName, RepeatBlockOrder.isBlockStart) || this;
        }
        RepeatBlockOrder.run = function (data, canRepeat) {
            if (canRepeat(data)) {
                var runData = data;
                runData.isBreak = false;
                parseRepeatBlock(runData, canRepeat);
            }
            data.placeholder.remove();
        };
        RepeatBlockOrder.isBlockStart = function (subOrder) {
            return subOrder === 'end';
        };
        return RepeatBlockOrder;
    }(Order.BlockOrder));
    Order.RepeatBlockOrder = RepeatBlockOrder;
    function parseRepeatBlock(data, canRepeat) {
        var nodes = data.blocks[0].nodes;
        var cloneBlocks = [];
        for (var i = 0; i < nodes.length; i++) {
            cloneBlocks.push(nodes[i].cloneNode(true));
        }
        insertNodesBefore(data.placeholder, cloneBlocks);
        var p = data.placeholder.parentNode;
        //执行order
        Order.parseBreakOrder(data, RepeatBlockOrder.isBlockStart, cloneBlocks, p);
        if (!data.isBreak && canRepeat(data)) {
            parseRepeatBlock(data, canRepeat);
        }
    }
})(Order || (Order = {}));
var JS;
(function (JS) {
    var logics = {};
    var logicNames = [];
    function registerLogic(logic) {
        var name = logic.logicName;
        if (name in logics) {
            throw new Error("不能重复注册：" + name);
        }
        logics[name] = logic;
        logicNames.push(name);
    }
    JS.registerLogic = registerLogic;
    var isVarNameRegExp = /^[$_a-zA-Z][$_a-zA-Z\d]*$/;
    function isVarName(keyWord) {
        return isVarNameRegExp.test(keyWord);
    }
    JS.isVarName = isVarName;
    var isNumberRegExp = /^(\d+)|(\de3)|([1-9]\d+e\d+)$/;
    function toConst(value) {
        switch (value) {
            case "NaN":
                return NaN;
            case "null":
                return null;
            case 'false':
                return false;
            case 'true':
                return true;
        }
        if (isNumberRegExp.test(value)) {
            return eval.call(null, value);
        }
        return value;
    }
    JS.toConst = toConst;
    function getLogic(statement, firstTryNames) {
        if (firstTryNames) {
            for (var _i = 0, firstTryNames_1 = firstTryNames; _i < firstTryNames_1.length; _i++) {
                var name_6 = firstTryNames_1[_i];
                if (name_6 in logics) {
                    var Logic = logics[name_6];
                    var logic = Logic.new(statement);
                    if (logic) {
                        return logic;
                    }
                }
            }
            for (var _a = 0, logicNames_1 = logicNames; _a < logicNames_1.length; _a++) {
                var name_7 = logicNames_1[_a];
                if (name_7 in logics) {
                    var Logic = logics[name_7];
                    var logic = Logic.new(statement);
                    if (logic) {
                        return logic;
                    }
                }
            }
        }
        else {
            for (var _b = 0, logicNames_2 = logicNames; _b < logicNames_2.length; _b++) {
                var name_8 = logicNames_2[_b];
                if (name_8 in logics) {
                    var Logic = logics[name_8];
                    var logic = Logic.new(statement);
                    if (logic) {
                        return logic;
                    }
                }
            }
        }
        return null;
    }
    JS.getLogic = getLogic;
    /**合并连续空格
     * @param {JavaScriptBlock} block 语句块
     * @param {boolean=false} deep 递归
     */
    function mergeSpace(block, deep) {
        if (deep === void 0) { deep = false; }
        for (var _i = 0, _a = block.children; _i < _a.length; _i++) {
            var statement = _a[_i];
            mergeStatementSpace(statement, deep);
        }
    }
    JS.mergeSpace = mergeSpace;
    /**合并连续空格
     * @param {JavaScriptStatement} statement 语句
     * @param {boolean=false} deep 递归
     */
    function mergeStatementSpace(statement, deep) {
        if (deep === void 0) { deep = false; }
        var hasSpace = false;
        var chds = statement.children;
        for (var i = 0; i < chds.length; i++) {
            var keyWord = chds[i];
            if (keyWord instanceof JS.JavaScriptBlock) {
                if (deep) {
                    mergeSpace(keyWord, true);
                }
                hasSpace = true;
            }
            else {
                switch (keyWord) {
                    case " ":
                    case "\r":
                    case "\n":
                    case "\t":
                        if (hasSpace) {
                            //删掉一个；
                            chds.splice(i, 1);
                            i--;
                        }
                        else {
                            //换成空格
                            chds[i] = ' ';
                            hasSpace = true;
                        }
                        break;
                    default:
                        hasSpace = false;
                }
            }
        }
    }
    JS.mergeStatementSpace = mergeStatementSpace;
    /**删除所有空格
     * @param {JavaScriptBlock} block 语句块
     * @param {boolean=false} deep 递归
     */
    function deleteSpace(block, deep) {
        if (deep === void 0) { deep = false; }
        for (var _i = 0, _a = block.children; _i < _a.length; _i++) {
            var statement = _a[_i];
            deleteStatementSpace(statement, deep);
        }
    }
    JS.deleteSpace = deleteSpace;
    /**删除所有空格
     * @param {JavaScriptStatement} statement 语句
     * @param {boolean=false} deep 递归
     */
    function deleteStatementSpace(statement, deep) {
        if (deep === void 0) { deep = false; }
        var chds = statement.children;
        for (var i = 0; i < chds.length; i++) {
            var keyWord = chds[i];
            if (keyWord instanceof JS.JavaScriptBlock) {
                if (deep) {
                    deleteSpace(keyWord, true);
                }
            }
            else {
                switch (keyWord) {
                    case " ":
                    case "\r":
                    case "\n":
                    case "\t":
                        chds.shift();
                        i--;
                        break;
                }
            }
        }
    }
    JS.deleteStatementSpace = deleteStatementSpace;
})(JS || (JS = {}));
/// <reference path='Lib.ts'/>
var JS;
(function (JS) {
    var JavaScriptLogic = (function () {
        function JavaScriptLogic() {
        }
        return JavaScriptLogic;
    }());
    JS.JavaScriptLogic = JavaScriptLogic;
})(JS || (JS = {}));
/// <reference path='../JavaScriptLogic.ts'/>
var JS;
(function (JS) {
    var Var = (function (_super) {
        __extends(Var, _super);
        function Var(varInfos) {
            var _this = _super.call(this) || this;
            _this.varInfos = varInfos;
            return _this;
        }
        Var.new = function (statement) {
            JS.mergeStatementSpace(statement, true);
            var keyWords = statement.children;
            if (keyWords.length === 0) {
                return null;
            }
            var varInfos = [];
            if (keyWords[0] !== 'var') {
                return null;
            }
            var step = 0;
            var varName = "";
            for (var i = 1; i < keyWords.length; i++) {
                var keyWord = keyWords[i];
                if (keyWord === " ") {
                    continue;
                }
                switch (step) {
                    case 0:
                        if (isString(keyWord)) {
                            //声明变量
                            varName = keyWord;
                            step++;
                        }
                        else {
                            // throw new Error("此处不该出现："+keyWord);
                            return null;
                        }
                        break;
                    case 1:
                        if (keyWord === ',') {
                            varInfos.push([varName, undefined, false]);
                            step = 0;
                        }
                        else if (keyWord === '=') {
                            step++;
                        }
                        else {
                            // throw new Error('keyword后只能出现"="或","');
                            return null;
                        }
                        break;
                    case 2:
                        if (isString(keyWord)) {
                            var v = JS.toConst(keyWord);
                            varInfos.push([varName, v, isString(v)]);
                        }
                        else {
                            varInfos.push([varName, keyWord.toString(), true]);
                        }
                        step++;
                        break;
                    case 3:
                        if (keyWord !== ',' && keyWord !== ';') {
                            //value后只能出现","、";"'
                            return null;
                        }
                        step = 0;
                        break;
                }
            }
            return new this(varInfos);
        };
        Var.prototype.getVars = function () {
            var vars = [];
            for (var _i = 0, _a = this.varInfos; _i < _a.length; _i++) {
                var info = _a[_i];
                vars.push(info[0]);
            }
            return vars;
        };
        return Var;
    }(JS.JavaScriptLogic));
    Var.logicName = 'var';
    JS.Var = Var;
    JS.registerLogic(Var);
})(JS || (JS = {}));
/// <reference path='../JavaScriptLogic.ts'/>
/// <reference path='Var.ts'/>
var JS;
(function (JS) {
    var For = (function (_super) {
        __extends(For, _super);
        function For(mode, info) {
            var _this = _super.call(this) || this;
            _this.mode = mode;
            _this.info = info;
            return _this;
        }
        For.new = function (statement) {
            JS.mergeStatementSpace(statement, true);
            var keyWords = statement.children;
            var count = 3;
            if (keyWords.length < count) {
                //至少3个空格
                return null;
            }
            if (keyWords[0] !== 'for') {
                return null;
            }
            var index = 1;
            if (keyWords[index] === ' ') {
                index++;
                count++;
            }
            var keyWord = keyWords[index];
            if (!(keyWord instanceof JS.JavaScriptBlock)) {
                //应该是一个block;
                return null;
            }
            if (keyWord.begin !== '(') {
                //应该是一个(...)
                return null;
            }
            var controlParamsBlock = keyWord;
            index++;
            if (keyWords[index] === ' ') {
                index++;
                count++;
            }
            keyWord = keyWords[index];
            if (!(keyWord instanceof JS.JavaScriptBlock)) {
                //应该是一个block;
                return null;
            }
            if (keyWord.begin !== '{') {
                //应该是一个{...}
                return null;
            }
            //判断controlParamsBlock内容是否有效;
            var conditionsInfo = this.parseConditions(controlParamsBlock);
            if (conditionsInfo) {
                return new this(conditionsInfo.mode, conditionsInfo);
            }
            return null;
        };
        For.parseConditions = function (block) {
            var paramStatements = block.children;
            if (paramStatements.length === 3) {
                //可能是step for
                return this.parseStep(paramStatements);
            }
            else if (paramStatements.length === 1) {
                //可能是 for in
                debugger;
                return this.parseForIn(paramStatements[0].children);
            }
            return null;
        };
        For.parseStep = function (statements) {
            if (statements[0].children.length === 0 ||
                statements[1].children.length === 0 ||
                statements[2].children.length === 0) {
                return null;
            }
            var variable = JS.Var.new(statements[0]);
            return {
                mode: 1 /* Step */,
                variable: variable,
                first: statements[0],
                exec: statements[1],
                step: statements[2]
            };
        };
        For.parseForIn = function (keyWords) {
            var count = 5;
            var index = 1;
            var info;
            var hasVar;
            if (keyWords[0] === 'var') {
                //var开头;
                hasVar = true;
                if (keyWords[index] !== ' ') {
                    return null;
                }
                index += 2;
                count += 2;
            }
            else {
                hasVar = false;
            }
            var varName = keyWords[index];
            if (!isString(varName) || !JS.isVarName(varName)) {
                //需求一个变量名
                return null;
            }
            index++;
            if (keyWords[index] !== ' ') {
                return null;
            }
            index++;
            var keyWord = keyWords[index];
            if (keyWord !== 'in') {
                //需求一个in
                return null;
            }
            index++;
            if (keyWords[index] !== ' ') {
                return null;
            }
            index++;
            //后面可能是一串语句
            var bindingExp = new JS.JavaScriptStatement();
            if (keyWords.length === count) {
                //这是最后一个词了，所以
                var destVarName = keyWords[index];
                if (!isString(destVarName) || !JS.isVarName(destVarName)) {
                    //需求一个变量名
                    return null;
                }
                bindingExp.push(destVarName);
            }
            else {
                //都扔进去吧
                push.apply(bindingExp.children, keyWords.slice(index));
            }
            return {
                mode: 0 /* In */,
                hasVar: hasVar,
                varName: varName,
                bindingExp: bindingExp
            };
        };
        return For;
    }(JS.JavaScriptLogic));
    For.logicName = 'for';
    JS.For = For;
    JS.registerLogic(For);
})(JS || (JS = {}));
/// <reference path='RepeatBlockOrder.ts'/>
/// <reference path='../javascript/logic/For.ts'/>
var Order;
(function (Order) {
    var For = (function (_super) {
        __extends(For, _super);
        function For(node, condition) {
            var _this = _super.call(this, node, condition, 'for') || this;
            var jsblock = JS.Parser.parseStructor(condition);
            var info = JS.For.parseConditions(jsblock);
            if (info) {
                _this.data.forMode = info.mode;
                if (info.mode === 0 /* In */) {
                    var infoForIn = info;
                    _this.data.forInInfo = {
                        var: infoForIn.hasVar ? infoForIn.varName : '',
                        object: infoForIn.bindingExp.toString(),
                        names: []
                    };
                }
                else {
                    var infoForStep = info;
                    var first = void 0;
                    if (infoForStep.variable) {
                        first = infoForStep.variable.varInfos;
                    }
                    else {
                        infoForStep.first.children.pop();
                        first = infoForStep.first.toString();
                    }
                    infoForStep.exec.children.pop();
                    _this.data.forStepInfo = {
                        first: first,
                        exec: infoForStep.exec.toString(),
                        step: infoForStep.step.toString()
                    };
                }
            }
            else {
                throw new Error("错误的for表达式！");
            }
            return _this;
        }
        For.run = function (data) {
            if (data.forMode === 0 /* In */) {
                var runData = data;
                runData.index = 0;
                runData.source = null;
                _super.run.call(this, runData, canRepeat);
            }
            else {
                var runData = data;
                runData.isFirst = true;
                _super.run.call(this, runData, canRepeat);
            }
        };
        return For;
    }(Order.RepeatBlockOrder));
    For.orderName = "for";
    For = __decorate([
        Order.register
    ], For);
    Order.For = For;
    /**
     * 返回是否可以重复
     */
    function canRepeat(data) {
        if (data.forMode === 0 /* In */) {
            return checkForIn(data);
        }
        else {
            return checkForStep(data);
        }
    }
    function checkForStep(data) {
        var forStepInfo = data.forStepInfo;
        if (data.isFirst) {
            data.isFirst = false;
            if (isString(forStepInfo.first)) {
                Order.exec(data.placeholder, forStepInfo.first);
            }
            else {
                Order.runVarInfos(DOMScope.get(data.placeholder), data.placeholder, forStepInfo.first);
            }
        }
        else {
            Order.exec(data.placeholder, forStepInfo.step);
        }
        return Order.exec(data.placeholder, forStepInfo.exec);
    }
    function initForInSourceData(data) {
        var forInInfo = data.forInInfo;
        if (!data.source) {
            data.source = Order.exec(data.placeholder, forInInfo.object);
            if (!data.source) {
                return false;
            }
            for (var i in data.source) {
                forInInfo.names.push(i);
            }
        }
        return true;
    }
    function checkForIn(data) {
        if (!initForInSourceData(data)) {
            throw new Error("计算出错！");
        }
        var forInInfo = data.forInInfo;
        if (data.index < forInInfo.names.length) {
            //预编译时运行操作
            Order.exec(data.placeholder, forInInfo.var + '=\'' + forInInfo.names[data.index] + '\';');
            data.index++;
            return true;
        }
        else {
            return false;
        }
    }
})(Order || (Order = {}));
/// <reference path='BlockOrder.ts'/>
var Order;
(function (Order) {
    var Switch = Switch_1 = (function (_super) {
        __extends(Switch, _super);
        function Switch(node, condition) {
            var _this = _super.call(this, node, condition, 'switch', Switch_1.isBlockStart) || this;
            _this.data.condition = condition;
            return _this;
        }
        Switch.isBlockStart = function (subOrder) {
            switch (subOrder) {
                case 'case':
                case 'default':
                    return true;
            }
            return false;
        };
        Switch.run = function (data) {
            var hit = -1;
            var blocks = data.blocks;
            var runData = data;
            runData.isBreak = false;
            for (var i = 1; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.order === 'default' || Order.exec(data.placeholder, data.condition) === Order.exec(data.placeholder, data.condition)) {
                    if (hit === -1) {
                        hit = i;
                    }
                    else if (hit === i - 1) {
                        hit++;
                    }
                    else {
                        break;
                    }
                    insertNodesBefore(data.placeholder, block.nodes);
                    var p = data.placeholder.parentNode;
                    Order.parseBreakOrder(runData, this.isBlockStart, block.nodes, p);
                    if (runData.isBreak) {
                        break;
                    }
                }
            }
            data.placeholder.remove();
        };
        return Switch;
    }(Order.BlockOrder));
    Switch.orderName = "switch";
    Switch.subOrder = ["case", "default"];
    Switch = Switch_1 = __decorate([
        Order.register
    ], Switch);
    Order.Switch = Switch;
    var Switch_1;
})(Order || (Order = {}));
/// <reference path='RepeatBlockOrder.ts'/>
var Order;
(function (Order) {
    var While = (function (_super) {
        __extends(While, _super);
        function While(node, condition) {
            var _this = _super.call(this, node, condition, 'while') || this;
            _this.data.condition = condition;
            return _this;
        }
        While.run = function (data) {
            _super.run.call(this, data, canRepeat);
        };
        return While;
    }(Order.RepeatBlockOrder));
    While.orderName = "while";
    While = __decorate([
        Order.register
    ], While);
    Order.While = While;
    function canRepeat(data) {
        return parseBool(Order.exec(data.placeholder, data.condition));
    }
})(Order || (Order = {}));
/// <reference path='RepeatBlockOrder.ts'/>
var Order;
(function (Order) {
    var Do = (function (_super) {
        __extends(Do, _super);
        function Do(node, condition) {
            var _this = _super.call(this, node, condition, 'do') || this;
            _this.data.isFirst = true;
            _this.data.condition = condition;
            return _this;
        }
        Do.run = function (data) {
            _super.run.call(this, data, canRepeat);
        };
        return Do;
    }(Order.RepeatBlockOrder));
    Do.orderName = "do";
    Do = __decorate([
        Order.register
    ], Do);
    Order.Do = Do;
    function canRepeat(data) {
        if (data.isFirst) {
            data.isFirst = false;
            return true;
        }
        else {
            return parseBool(Order.exec(data.placeholder, data.condition));
        }
    }
})(Order || (Order = {}));
var JS;
(function (JS) {
    var JavaScriptBlock = (function () {
        function JavaScriptBlock(begin, end) {
            this.begin = begin;
            this.end = end;
            this.children = [];
            this.isEnd = false;
        }
        JavaScriptBlock.prototype.push = function (child) {
            this.children.push(child);
            child.parent = this;
        };
        JavaScriptBlock.prototype.toString = function () {
            return this.begin + this.innerText + this.end;
        };
        Object.defineProperty(JavaScriptBlock.prototype, "innerText", {
            get: function () {
                var ret = "";
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var statement = _a[_i];
                    ret += statement;
                }
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        JavaScriptBlock.prototype.clone = function () {
            var ret = new JavaScriptBlock(this.begin, this.end);
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var statement = _a[_i];
                ret.push(statement.clone());
            }
            return ret;
        };
        return JavaScriptBlock;
    }());
    JS.JavaScriptBlock = JavaScriptBlock;
})(JS || (JS = {}));
var JS;
(function (JS) {
    var JavaScriptComment = (function () {
        function JavaScriptComment(data) {
            this.data = data;
        }
        JavaScriptComment.prototype.toString = function () {
            return this.data;
        };
        JavaScriptComment.prototype.clone = function () {
            return new JavaScriptComment(this.data);
        };
        return JavaScriptComment;
    }());
    JS.JavaScriptComment = JavaScriptComment;
})(JS || (JS = {}));
var JS;
(function (JS) {
    var JavaScriptString = (function () {
        function JavaScriptString(data) {
            this.data = data;
        }
        JavaScriptString.prototype.toString = function () {
            return this.data;
        };
        JavaScriptString.prototype.clone = function () {
            return new JavaScriptString(this.data);
        };
        return JavaScriptString;
    }());
    JS.JavaScriptString = JavaScriptString;
})(JS || (JS = {}));
/// <reference path='JavaScriptBlock.ts'/>
/// <reference path='JavaScriptComment.ts'/>
/// <reference path='JavaScriptString.ts'/>
/// <reference path='JavaScriptLogic.ts'/>
var JS;
(function (JS) {
    var JavaScriptStatement = (function () {
        function JavaScriptStatement() {
            this.children = [];
            this.isEnd = false;
        }
        JavaScriptStatement.prototype.push = function (child) {
            this.children.push(child);
            if (child instanceof JS.JavaScriptBlock) {
                child.parent = this;
            }
        };
        JavaScriptStatement.prototype.split = function (separator) {
            var ret = [];
            var s = '';
            var isAreadyPush = false;
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var item = _a[_i];
                if (isString(item) && item === separator) {
                    ret.push(s);
                    s = '';
                    isAreadyPush = true;
                }
                else {
                    s += item.toString();
                    isAreadyPush = false;
                }
            }
            if (!isAreadyPush) {
                ret.push(s);
            }
            return ret;
        };
        JavaScriptStatement.prototype.splitKeyWord = function (separator) {
            var ret = [];
            var arr = new JavaScriptStatement;
            var isAreadyPush = false;
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var item = _a[_i];
                if (isString(item) && item === separator) {
                    ret.push(arr);
                    arr.isEnd = true;
                    arr = new JavaScriptStatement;
                    isAreadyPush = true;
                }
                else {
                    arr.push(item);
                    isAreadyPush = false;
                }
            }
            if (!isAreadyPush) {
                ret.push(arr);
                arr.isEnd = true;
            }
            return ret;
        };
        JavaScriptStatement.prototype.toString = function () {
            var ret = "";
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var item = _a[_i];
                ret += item;
            }
            return ret;
        };
        JavaScriptStatement.prototype.clone = function () {
            var ret = new JavaScriptStatement();
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var keyWord = _a[_i];
                if (isString(keyWord)) {
                    ret.push(keyWord);
                }
                else {
                    ret.push(keyWord.clone());
                }
            }
            return ret;
        };
        return JavaScriptStatement;
    }());
    JS.JavaScriptStatement = JavaScriptStatement;
})(JS || (JS = {}));
/// <reference path='JavaScriptStatement.ts'/>
var JS;
(function (JS) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.getInitData = function (condition, start) {
            if (start === void 0) { start = 0; }
            var root = new JS.JavaScriptBlock('', '');
            return {
                condition: condition,
                index: start,
                action: '',
                length: condition.length,
                block: root,
                root: root,
                keyWordStart: -1,
                commentStart: -1,
                stringStart: -1,
                stringStartBy: ""
            };
        };
        Parser[''] = function (m) {
            switch (m.condition[m.index]) {
                case " ":
                    m.action = "space";
                    m.index++;
                    break;
                case "\n":
                    m.index++;
                    break;
                default:
                    m.action = "keyWord";
                    m.keyWordStart = m.index;
                    break;
            }
        };
        /**是否跟随回车换行 */
        Parser.isFollowCarriageReturnOrLineFeed = function (m) {
            var statement = last.call(m.block.children);
            if (!statement) {
                return false;
            }
            var keyWords = statement.children;
            var length = keyWords.length;
            if (length === 0) {
                return false;
            }
            var lastKeyWord = keyWords[length - 1];
            switch (lastKeyWord) {
                case '\r':
                case '\n':
                    return true;
                case ' ':
                    break;
                default:
                    return false;
            }
            if (length === 1) {
                return false;
            }
            var beforeLastKeyWord = keyWords[length - 2];
            switch (beforeLastKeyWord) {
                case '\r':
                case '\n':
                    return true;
                default:
                    return false;
            }
        };
        Parser.parseKeyWord = function (m) {
            var keyWordEnd = m.index;
            var keyWord = m.condition.substring(m.keyWordStart, keyWordEnd);
            m.keyWordStart = -1;
            if (keyWord === "") {
                return false;
            }
            if (this.isFollowCarriageReturnOrLineFeed(m)) {
                this.pushKeyWord(m, ';');
                this.getLastStatement(m).isEnd = true;
            }
            // switch(keyWord){
            //     case "break":
            //     case "for":
            //     case "var":
            //     case "case":
            //     case "catch":
            //     case "continue":
            //     case "debugger":
            //     case "default":
            //     case "delete":
            //     case "do":
            //     case "else":
            //     case "finally":
            //     case "function":
            //     case "if":
            //     case "in":
            //     case "instanceof":
            //     case "new":
            //     case "return":
            //     case "switch":
            //     case "this":
            //     case "throw":
            //     case "try":
            //     case "typeof":
            //     case "void":
            //     case "with":
            //     case "while":
            // }
            this.pushKeyWord(m, keyWord);
            return true;
        };
        Parser.pushComment = function (m, comment) {
            this.pushKeyWordOrBlock(m, comment);
        };
        Parser.pushKeyWord = function (m, keyWord) {
            this.pushKeyWordOrBlock(m, keyWord);
        };
        Parser.pushString = function (m, string) {
            this.pushKeyWordOrBlock(m, string);
        };
        Parser.pushBlock = function (m, block) {
            this.pushKeyWordOrBlock(m, block);
            m.block = block;
        };
        Parser.pushKeyWordOrBlock = function (m, keyWordOrBlockOrComment) {
            this.getLastStatement(m).push(keyWordOrBlockOrComment);
        };
        Parser.getLastStatement = function (m) {
            if (m.block.isEnd) {
                m.block = m.block.parent.parent;
            }
            var statement;
            var old = last.call(m.block.children);
            if (old) {
                statement = old;
            }
            else {
                statement = new JS.JavaScriptStatement();
                m.block.push(statement);
            }
            if (statement.isEnd) {
                statement = new JS.JavaScriptStatement();
                m.block.push(statement);
            }
            return statement;
        };
        Parser['*/<>'] = function (m, keyWord) {
            if (!this['?='](m, keyWord)) {
                this.parseKeyWord(m);
                this.pushKeyWord(m, keyWord);
                m.action = '';
                m.index++;
            }
        };
        Parser['<>'] = function (m, keyWord) {
            if (!this['<<>>'](m, keyWord) && !this['?='](m, keyWord)) {
                this.parseKeyWord(m);
                this.pushKeyWord(m, keyWord);
                m.action = '';
                m.index++;
            }
        };
        Parser['<<>>'] = function (m, keyWord) {
            if (m.condition[m.index + 1] === keyWord) {
                if (this['<<<>>>'](m, keyWord)) {
                    return true;
                }
                if (!this.parseKeyWord(m)) {
                    throw new Error("此处不该有'" + keyWord + keyWord);
                }
                this.pushKeyWord(m, keyWord + keyWord);
                m.action = '';
                m.index += 2;
            }
            return false;
        };
        Parser['<<<>>>'] = function (m, keyWord) {
            if (m.condition[m.index + 2] === keyWord) {
                if (!this.parseKeyWord(m)) {
                    throw new Error("此处不该有'" + keyWord + keyWord + keyWord);
                }
                this.pushKeyWord(m, keyWord + keyWord + keyWord);
                m.action = '';
                m.index += 3;
                return true;
            }
            return false;
        };
        Parser.comment = function (m) {
            if (m.condition[m.index] === '\n') {
                this.pushComment(m, new JS.JavaScriptComment(m.condition.substring(m.commentStart, m.index)));
            }
            m.index++;
            m.action = "";
        };
        Parser.comment2 = function (m) {
            if (m.condition[m.index] === '*' && m.condition[m.index + 1] === '/') {
                this.pushComment(m, new JS.JavaScriptComment(m.condition.substring(m.commentStart, m.index + 2)));
            }
            m.index += 2;
            m.action = "";
        };
        Parser['/'] = function (m) {
            switch (m.condition[m.index + 1]) {
                case "/":
                    //注释
                    this.parseKeyWord(m);
                    m.commentStart = m.index;
                    m.index += 2;
                    m.action = "comment";
                    break;
                case "*":
                    /*注释*/
                    this.parseKeyWord(m);
                    m.commentStart = m.index;
                    m.index += 2;
                    m.action = "comment2";
                    break;
                default:
                    this['*/<>'](m, '/');
            }
        };
        Parser['+-%'] = function (m, keyWord) {
            if (m.condition[m.index + 1] === keyWord) {
                this.parseKeyWord(m);
                this.pushKeyWord(m, keyWord + keyWord);
                m.index += 2;
                m.action = "";
            }
            else {
                if (!this['?='](m, keyWord)) {
                    this.parseKeyWord(m);
                    this.pushKeyWord(m, keyWord);
                    m.index++;
                    m.action = "";
                }
            }
        };
        Parser['?='] = function (m, keyWord) {
            if (m.condition[m.index + 1] === '=') {
                if (this['?=='](m, keyWord)) {
                    return true;
                }
                if (!this.parseKeyWord(m)) {
                    throw new Error("此处不该有'" + keyWord + "='");
                }
                this.pushKeyWord(m, keyWord + '=');
                m.action = '';
                m.index += 2;
                return true;
            }
            return false;
        };
        Parser['=>'] = function (m) {
            if (m.condition[m.index + 1] === '>') {
                this.parseKeyWord(m);
                this.pushKeyWord(m, '=>');
                m.action = '';
                m.index += 2;
                return true;
            }
            return false;
        };
        Parser['?=='] = function (m, keyWord) {
            if (m.condition[m.index + 2] === '=') {
                if (!this.parseKeyWord(m)) {
                    throw new Error("此处不该有'" + keyWord + "='");
                }
                this.pushKeyWord(m, keyWord + '==');
                m.index += 3;
                m.action = '';
                return true;
            }
            return false;
        };
        Parser[';'] = function (m) {
            this.parseKeyWord(m);
            this.pushKeyWord(m, ';');
            this.getLastStatement(m).isEnd = true;
            m.action = "";
            m.index++;
        };
        Parser['.'] = function (m) {
            if (!this.parseKeyWord(m)) {
                var statement = last.call(m.block.children);
                if (statement.children.length > 0) {
                    var lastKeyWord = last.call(statement.children);
                    if (!(lastKeyWord instanceof JS.JavaScriptBlock && lastKeyWord.begin === '(')) {
                        throw new Error("此处不该有'.'");
                    }
                }
            }
            this.pushKeyWord(m, '.');
            m.action = "";
            m.index++;
        };
        Parser['!~'] = function (m, keyWord) {
            if (this.parseKeyWord(m)) {
                //不能在keyword后面出现!
                throw new Error("此处不该有'" + keyWord + "'");
            }
            this.pushKeyWord(m, keyWord);
            m.action = "";
            m.index++;
        };
        Parser.isStatementBegin = function (m) {
            if (m.block.isEnd) {
                return true;
            }
            var statement = last.call(m.block.children);
            if (statement) {
                return statement.children.length === 0;
            }
            else {
                return true;
            }
        };
        Parser.space = function (m) {
            if (m.condition[m.index] === ' ') {
                m.index++;
                return;
            }
            //不添加为语句的开始。
            if (!this.isStatementBegin(m)) {
                this.pushKeyWord(m, ' ');
            }
            m.action = '';
        };
        Parser['({['] = function (m, keyWord, keyWordEnd) {
            //终止
            this.parseKeyWord(m);
            this.pushBlock(m, new JS.JavaScriptBlock(keyWord, keyWordEnd));
            m.index++;
            m.action = "";
        };
        Parser[')}]'] = function (m, keyWord, keyWordBegin) {
            //终止
            this.parseKeyWord(m);
            if (m.block.begin !== keyWordBegin) {
                throw new Error("缺少'" + keyWordBegin + "'");
            }
            var block = m.block;
            block.isEnd = true;
            m.block = block.parent.parent;
            m.index++;
            m.action = "";
        };
        Parser['"`\''] = function (m, keyWord) {
            m.stringStart = m.index;
            m.index++;
            m.action = 'string';
            m.stringStartBy = keyWord;
        };
        Parser.string = function (m) {
            switch (m.condition[m.index]) {
                case '\\':
                    m.index += 2;
                    return;
                case m.stringStartBy:
                    this.pushString(m, new JS.JavaScriptString(m.condition.substring(m.stringStart, m.index + 1)));
                    m.action = '';
                    m.index++;
                    return;
                default:
                    m.index++;
            }
        };
        Parser.parseEnd = function (m) {
            switch (m.action) {
                case "keyWord":
                    this.parseKeyWord(m);
                    break;
                case "space":
                    this.pushKeyWord(m, ' ');
                    break;
                case "string":
                    throw new Error("字符串没有闭合！");
            }
            if (m.block !== m.root) {
                if (!m.block.isEnd) {
                    throw new Error(m.block.begin + "没有闭合！");
                }
            }
        };
        Parser.keyWord = function (m) {
            var keyWord = m.condition[m.index];
            switch (keyWord) {
                case ".":
                case ";":
                case "/":
                    this[m.condition[m.index]](m);
                    break;
                case " ":
                    this.parseKeyWord(m);
                    m.stringStart = m.index - 1;
                    m.action = "space";
                    m.index++;
                    break;
                case "=":
                    if (!this['?='](m, '=') && !this['=>'](m)) {
                        //赋值
                        if (!this.parseKeyWord(m)) {
                            throw new Error("此处不该有'='");
                        }
                        this.pushKeyWord(m, '=');
                        m.action = "";
                        m.index++;
                    }
                    break;
                case "!":
                case "~":
                    this['!~'](m, keyWord);
                    break;
                case '"':
                case "'":
                case "`":
                    this['"`\''](m, keyWord);
                    break;
                case "}":
                    this[')}]'](m, keyWord, '{');
                    break;
                case "]":
                    this[')}]'](m, keyWord, '[');
                    break;
                case ")":
                    this[')}]'](m, keyWord, '(');
                    break;
                case "(":
                    this['({['](m, keyWord, ')');
                    break;
                case "{":
                    this['({['](m, keyWord, '}');
                    break;
                case "[":
                    this['({['](m, keyWord, ']');
                    break;
                case "+":
                case "-":
                case "%":
                    this['+-%'](m, keyWord);
                    break;
                case "*":
                    this['*/<>'](m, keyWord);
                    break;
                case "<":
                case ">":
                    this['<>'](m, keyWord);
                    break;
                case "\n":
                case "\r":
                case "\t":
                case ",":
                case ":":
                    this.parseKeyWord(m);
                    this.pushKeyWord(m, keyWord);
                    m.action = "";
                    m.index++;
                    break;
                case "&":
                case "|":
                case "?":
                    throw new Error("未实现");
                default:
                    m.index++;
            }
        };
        Parser.parseStructor = function (condition, start, checkCallback) {
            if (start === void 0) { start = 0; }
            var m = this.getInitData(condition, start);
            var length = condition.length;
            if (checkCallback) {
                while (m.index < length) {
                    if (checkCallback(m)) {
                        break;
                    }
                    this[m.action](m, condition);
                }
            }
            else {
                while (m.index < length) {
                    this[m.action](m, condition);
                }
                this.parseEnd(m);
            }
            return m.root;
        };
        Parser.parseBlock = function (condition, start) {
            var m = this.getInitData(condition, start);
            var length = condition.length;
            var block = null;
            while (m.index < length) {
                if (!block && m.block !== m.root) {
                    //记录第一个block
                    block = m.block;
                }
                if (block && block.isEnd) {
                    break;
                }
                this[m.action](m, condition);
            }
            return { length: m.index - start, block: block };
        };
        return Parser;
    }());
    JS.Parser = Parser;
})(JS || (JS = {}));
/// <reference path='../../scope/Scope.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../javascript/Parser.ts'/>
/// <reference path='../javascript/logic/Var.ts'/>
var Order;
(function (Order) {
    var Var = (function (_super) {
        __extends(Var, _super);
        function Var(node, condition) {
            var _this = _super.call(this, node, condition) || this;
            _this.initStatement();
            _this.initvarInfos();
            _this.data.placeholder = node;
            return _this;
        }
        Var.prototype.initStatement = function () {
            var data = this.data;
            this.block = this.getBlock('var ' + this.condition);
        };
        Var.prototype.getBlock = function (condition) {
            return JS.Parser.parseStructor(condition);
        };
        Var.prototype.initvarInfos = function () {
            var data = this.data;
            var block = this.block;
            if (!block) {
                return;
            }
            var statements = block.children;
            if (statements.length > 1) {
                throw new Error("不支持多句！");
            }
            var logic = JS.getLogic(statements[0], ["var"]);
            if (logic) {
                data.varInfos = logic.varInfos;
            }
        };
        Var.run = function (data) {
            runVarInfos(DOMScope.get(data.placeholder), data.placeholder, data.varInfos);
            removeNode(data.placeholder);
        };
        return Var;
    }(Order.VOrder));
    Var.orderName = "var";
    Var = __decorate([
        Order.register
    ], Var);
    Order.Var = Var;
    function tryRunVarInfos(node, varInfos) {
        for (var _i = 0, varInfos_1 = varInfos; _i < varInfos_1.length; _i++) {
            var varInfo = varInfos_1[_i];
            if (varInfo[2]) {
                Order.testSet(node, varInfo[0], varInfo[1]);
            }
            else {
                Order.testSetValue(node, varInfo[0], varInfo[1]);
            }
        }
    }
    Order.tryRunVarInfos = tryRunVarInfos;
    function runVarInfos(scope, node, varInfos) {
        for (var _i = 0, varInfos_2 = varInfos; _i < varInfos_2.length; _i++) {
            var varInfo = varInfos_2[_i];
            if (varInfo[2]) {
                scope[varInfo[0]] = Order.exec(node, varInfo[1]);
            }
            else {
                scope[varInfo[0]] = varInfo[1];
            }
        }
    }
    Order.runVarInfos = runVarInfos;
})(Order || (Order = {}));
/// <reference path='Var.ts'/>
var Order;
(function (Order) {
    var ScopeOrder = (function (_super) {
        __extends(ScopeOrder, _super);
        function ScopeOrder() {
            return _super.apply(this, arguments) || this;
        }
        ScopeOrder.prototype.initBlock = function () {
            var data = this.data;
            var conditionArr = splitByOnce(this.condition, ":");
            data.scopeName = conditionArr[0];
            if (conditionArr.length === 2) {
                this.block = this.getBlock(conditionArr[1]);
            }
        };
        ScopeOrder.run = function (data) {
            var scope = DOMScope.create(data.placeholder, data.scopeName);
            if (data.varInfos && data.varInfos.length > 0) {
                Order.runVarInfos(scope, data.placeholder, data.varInfos);
            }
            removeNode(data.placeholder);
        };
        return ScopeOrder;
    }(Order.Var));
    ScopeOrder.orderName = "scope";
    ScopeOrder = __decorate([
        Order.register
    ], ScopeOrder);
})(Order || (Order = {}));
/// <reference path='VOrder.ts'/>
var Order;
(function (Order) {
    var Equal = (function (_super) {
        __extends(Equal, _super);
        function Equal(node, condition) {
            var _this = _super.call(this, node, condition) || this;
            _this.data.condition = condition;
            return _this;
        }
        Equal.run = function (data) {
            var v = Order.exec(data.placeholder, data.condition);
            if (v instanceof VMDOM.VNode) {
                replaceNodeByNode(data.placeholder, v);
                return;
            }
            replaceNodeByNode(data.placeholder, $$$('' + v, 3 /* Text */));
        };
        return Equal;
    }(Order.VOrder));
    Equal.orderName = "=";
    Equal = __decorate([
        Order.register
    ], Equal);
    Order.Equal = Equal;
})(Order || (Order = {}));
var JS;
(function (JS) {
    var JavaScriptExpressions = (function () {
        function JavaScriptExpressions() {
            this.children = [];
        }
        JavaScriptExpressions.prototype.push = function (child) {
            this.children.push(child);
            return this;
        };
        JavaScriptExpressions.prototype.toString = function () {
            var ret = "";
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                ret += child;
            }
            return ret;
        };
        return JavaScriptExpressions;
    }());
    JS.JavaScriptExpressions = JavaScriptExpressions;
    /**获得分级代码数组
     * @param {JavaScriptBlock} block 语句块
     */
    function getExps(block) {
        var exps = new JavaScriptExpressions;
        exps.push(block.begin);
        for (var _i = 0, _a = block.children; _i < _a.length; _i++) {
            var statement = _a[_i];
            exps.push(getStatementExps(statement));
        }
        exps.push(block.end);
        return exps;
    }
    JS.getExps = getExps;
    /**获得分级代码数组
     * @param {JavaScriptStatement} statement 语句
     */
    function getStatementExps(statement) {
        var keyWords = statement.children;
        var exps = new JavaScriptExpressions;
        var exp = '';
        var isPush = false;
        for (var _i = 0, keyWords_1 = keyWords; _i < keyWords_1.length; _i++) {
            var keyWord = keyWords_1[_i];
            if (isString(keyWord)) {
                switch (JS.getKeyWordType(keyWord)) {
                    case JS.EKeyWordType.Member_Access_Operator:
                        exp += keyWord;
                        exps.push(exp);
                        exp = '';
                        isPush = true;
                        break;
                    case JS.EKeyWordType.Unary_Operator:
                    case JS.EKeyWordType.Operator:
                    case JS.EKeyWordType.UnKnown:
                        exp += keyWord;
                        isPush = false;
                        break;
                    default:
                        throw new Error('不支持该运算符：' + keyWord);
                }
            }
            else if (keyWord instanceof JS.JavaScriptBlock) {
                exps.push(getExps(keyWord));
            }
        }
        if (isPush === false && exp !== '') {
            exps.push(exp);
        }
        return exps;
    }
    JS.getStatementExps = getStatementExps;
    var EKeyWordType;
    (function (EKeyWordType) {
        EKeyWordType[EKeyWordType["UnKnown"] = 0] = "UnKnown";
        EKeyWordType[EKeyWordType["Unary_Operator"] = 1] = "Unary_Operator";
        EKeyWordType[EKeyWordType["Operator"] = 2] = "Operator";
        EKeyWordType[EKeyWordType["Assigning_Operator"] = 3] = "Assigning_Operator";
        EKeyWordType[EKeyWordType["Comparison_Operator"] = 4] = "Comparison_Operator";
        EKeyWordType[EKeyWordType["Compound_Assigning_Operator"] = 5] = "Compound_Assigning_Operator";
        EKeyWordType[EKeyWordType["Instruction_Operator"] = 6] = "Instruction_Operator";
        EKeyWordType[EKeyWordType["Ternary_Operator"] = 7] = "Ternary_Operator";
        EKeyWordType[EKeyWordType["Member_Access_Operator"] = 8] = "Member_Access_Operator";
    })(EKeyWordType = JS.EKeyWordType || (JS.EKeyWordType = {}));
    /**获取keyWord类型*/
    function getKeyWordType(keyWord) {
        switch (keyWord) {
            case '++':
            case '--':
            case '~':
            case '!':
                return EKeyWordType.Unary_Operator;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '&':
            case '|':
            case '&&':
            case '||':
            case '>>':
            case '<<':
            case ',':
                return EKeyWordType.Operator;
            case '+=':
            case '-=':
            case '*=':
            case '/=':
            case '%=':
            case '&=':
            case '|=':
                return EKeyWordType.Compound_Assigning_Operator;
            case '=':
                return EKeyWordType.Assigning_Operator;
            case '>=':
            case '>':
            case '<=':
            case '<':
            case '==':
            case '===':
            case '!=':
            case '!==':
            case 'instanceof':
            case 'in':
                return EKeyWordType.Comparison_Operator;
            case 'new':
            case 'delete':
            case 'typeof':
            case 'void':
                return EKeyWordType.Instruction_Operator;
            case '?':
            case ':':
                return EKeyWordType.Ternary_Operator;
            case '.':
                return EKeyWordType.Member_Access_Operator;
            default:
                return EKeyWordType.UnKnown;
        }
    }
    JS.getKeyWordType = getKeyWordType;
})(JS || (JS = {}));
/// <reference path='../JavaScriptLogic.ts'/>
var JS;
(function (JS) {
    var Function = (function (_super) {
        __extends(Function, _super);
        function Function(params, isLambda, content) {
            var _this = _super.call(this) || this;
            _this.params = params;
            _this.isLambda = isLambda;
            _this.content = content;
            return _this;
        }
        Function.new = function (statement) {
            JS.mergeStatementSpace(statement, true);
            var keyWords = statement.children;
            if (keyWords.length < 2) {
                return null;
            }
            var keyWord = keyWords[0];
            var params = [];
            var isLambda = false;
            var content;
            if (keyWord === 'function') {
                var index = 1;
                if (keyWords[index] === ' ') {
                    index++;
                }
                keyWord = keyWords[index];
                if (keyWord instanceof JS.JavaScriptBlock && keyWord.begin === '(') {
                    if (!this.setParams(params, keyWord)) {
                        return null;
                    }
                    index++;
                    if (keyWords[index] === ' ') {
                        index++;
                    }
                    keyWord = keyWords[index];
                    if (keyWord instanceof JS.JavaScriptBlock && keyWord.begin === '{') {
                        content = keyWord;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            else {
                var index = 1;
                if (keyWord instanceof JS.JavaScriptBlock && keyWord.begin === '(') {
                    if (keyWords[index] === ' ') {
                        index++;
                    }
                    if (keyWords[index] === '=>') {
                        //lambda
                        if (!this.setParams(params, keyWord)) {
                            return null;
                        }
                        index++;
                    }
                    else {
                        return null;
                    }
                }
                else if (isString(keyWord) && JS.isVarName(keyWord)) {
                    if (keyWords[index] === ' ') {
                        index++;
                    }
                    if (keyWords[index] === '=>') {
                        //lambda
                        params.push(keyWord);
                        index++;
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
                isLambda = true;
                if (keyWords[index] === ' ') {
                    index++;
                }
                keyWord = keyWords[index];
                if (keyWord instanceof JS.JavaScriptBlock && keyWord.begin === '{') {
                    //执行块
                    content = keyWord;
                }
                else if (keyWord === "return") {
                    return null;
                }
                else {
                    //单句
                    content = '';
                    for (var i = index; i < keyWords.length; i++) {
                        content += keyWords[i].toString();
                    }
                }
            }
            return new this(params, isLambda, content);
        };
        Function.setParams = function (params, block) {
            var statements = block.children;
            if (statements.length !== 1) {
                return false;
            }
            var statement = statements[0];
            var needVar = true;
            for (var _i = 0, _a = statement.children; _i < _a.length; _i++) {
                var keyWord = _a[_i];
                if (!isString(keyWord)) {
                    return false;
                }
                if (needVar) {
                    if (JS.isVarName(keyWord)) {
                        params.push(keyWord);
                    }
                    else {
                        return false;
                    }
                    needVar = false;
                }
                else {
                    needVar = true;
                }
            }
            return true;
        };
        // toFunction(){
        //     let params=this.params.slice();
        //     if(isString(this.content)){
        //         params.push((this.isLambda?'return ':'')+this.content);
        //     }else{
        //         params.push(this.content.toString());
        //     }
        //     return global.Function.apply(global,params);
        // }
        Function.prototype.toString = function () {
            var ret = '';
            if (this.isLambda) {
                ret += '(' + this.params.join(',') + ')=>';
                if (isString(this.content)) {
                    ret += this.content;
                }
                else {
                    ret += this.content.toString();
                }
            }
            else {
                ret += 'function(' + this.params.join(',') + ')' + this.content.toString();
            }
            return ret;
        };
        return Function;
    }(JS.JavaScriptLogic));
    Function.logicName = 'function';
    JS.Function = Function;
    JS.registerLogic(Function);
})(JS || (JS = {}));
/// <reference path='../javascript/JavaScriptExpressions.ts'/>
/// <reference path='../javascript/logic/Function.ts'/>
/// <reference path='VOrder.ts'/>
var Order;
(function (Order) {
    var BindExpressions = (function (_super) {
        __extends(BindExpressions, _super);
        function BindExpressions(node, condition) {
            var _this = _super.call(this, node, condition) || this;
            var data = _this.data;
            var block = JS.Parser.parseStructor(condition);
            //只支持一个语句
            if (block.children.length !== 1) {
                throw new Error('语句超出范围：' + condition);
            }
            //  xx1   、  xx1.xx2   或    xx1['xx2']  
            //取后面的访问
            var statement = block.children[0];
            var statements = statement.splitKeyWord(':');
            if (statements.length > 2) {
                throw new Error('语句应该是如下格式：\n(表达式):(回调函数)');
            }
            statement = statements[0];
            JS.deleteStatementSpace(statement, false); //删除空格回车换行
            if (statement.children.length === 1) {
                //如果只有一个单词，并且符合变量名规则，则确认为绑定scope变量
                var keyWord = statement.children[0];
                if (isString(keyWord) && JS.isVarName(keyWord)) {
                    data.object = ['', keyWord];
                }
            }
            else if (statement.children.length === 0) {
                throw new Error("语句应该是如下格式：\n(表达式):(回调函数)");
            }
            if (!data.object) {
                var chds = statement.children;
                var keyWord = chds.pop();
                data.object = [JS.getStatementExps(statement).toString()];
                if (keyWord instanceof JS.JavaScriptBlock) {
                    if (keyWord.begin === '[') {
                        var propertyName = JS.getExps(keyWord);
                        var chds_2 = propertyName.children;
                        chds_2.shift();
                        chds_2.pop();
                        data.object.push(propertyName.toString());
                    }
                    else {
                        throw new Error("\"" + keyWord + "\"\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u53D8\u91CF\u540D");
                    }
                }
                else if (isString(keyWord)) {
                    if (JS.isVarName(keyWord)) {
                        data.object.push(keyWord);
                        //再去掉一个.
                        keyWord = last.call(chds);
                        if (keyWord === '.') {
                            chds.pop();
                        }
                    }
                    else {
                        throw new Error("\"" + keyWord + "\"\u4E0D\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u53D8\u91CF\u540D");
                    }
                }
                else {
                    //什么鬼
                    throw new Error('无非识别的keyWord:' + keyWord);
                }
            }
            if (statements.length === 1) {
                data.function = null;
                return _this;
            }
            statement = statements[1];
            JS.mergeStatementSpace(statement, false); //删除空格回车换行
            var fn = JS.Function.new(statement);
            if (fn) {
                if (fn.params.length !== 1) {
                    throw new Error('函数参数数量不正确！');
                }
                var content = void 0;
                if (isString(fn.content)) {
                    content = fn.content;
                }
                else {
                    content = 'function(){' + fn.content.innerText + '}()';
                }
                data.function = {
                    content: content,
                    params: fn.params
                };
            }
            else {
                data.function = null;
            }
            return _this;
        }
        /** 计算*/
        BindExpressions.run = function (data) {
            var propertyName;
            var textNode = $$$('', 3 /* Text */);
            var obj;
            var objectExps = data.object[0];
            var objectName = data.object[1];
            if (objectExps !== '') {
                //对象+属性
                obj = Order.exec(data.placeholder, objectExps);
                if (!obj) {
                    throw new Error('获取对象失败：' + objectExps);
                }
                if (isString(objectName)) {
                    propertyName = objectName;
                }
                else {
                    propertyName = Order.exec(data.placeholder, objectName);
                }
            }
            else {
                //scope+属性
                obj = DOMScope.get(data.placeholder);
                propertyName = objectName;
            }
            if (data.function) {
                var fn_1 = makeExpressFunction(data.function.content, data.function.params);
                var exp = function (v) {
                    return fn_1(data.placeholder, [v]);
                };
                exp.__me__ = exp;
                Order.bindProperty(obj, propertyName, exp, '__me__');
                Order.bindElementProperty(exp, '__me__', textNode, 'data');
                textNode['data'] = exp.__me__;
            }
            else {
                Order.bindElementProperty(obj, propertyName, textNode, 'data');
                textNode['data'] = obj[propertyName];
            }
            replaceNodeByNode(data.placeholder, textNode);
        };
        return BindExpressions;
    }(Order.VOrder));
    BindExpressions.orderName = "-";
    BindExpressions = __decorate([
        Order.register
    ], BindExpressions);
    Order.BindExpressions = BindExpressions;
    function makeExpressFunction(content, params) {
        var scopeFun = Order.newScopeFunction(params);
        return function (node, args) {
            var scope = DOMScope.get(node);
            args.push(content);
            args.push(node);
            return scopeFun.apply(scope, args);
        };
    }
    Order.makeExpressFunction = makeExpressFunction;
})(Order || (Order = {}));
/// <reference path='VOrder.ts'/>
var Order;
(function (Order) {
    var Script = (function (_super) {
        __extends(Script, _super);
        function Script(node, condition) {
            var _this = _super.call(this, node, condition) || this;
            _this.init();
            return _this;
        }
        Script.prototype.init = function () {
            this.block = JS.Parser.parseStructor(this.condition);
        };
        Script.run = function (data) {
        };
        return Script;
    }(Order.VOrder));
    Script.orderName = ":";
    Script = __decorate([
        Order.register
    ], Script);
})(Order || (Order = {}));
/// <reference path='../VOrder.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.tryRun = 'tryRun';
    OrderEx.replaceToScriptNode = 'replaceToScriptNode';
    function extendsOrderGet(clazz, name, fn) {
        Object.defineProperty(clazz.prototype, name, { get: fn });
    }
    OrderEx.extendsOrderGet = extendsOrderGet;
    OrderEx.extendsOrderFunction = function (clazz, name, fn) {
        Object.defineProperty(clazz.prototype, name, { value: fn });
    };
    function canRunAtService(order) {
        try {
            if (OrderEx.tryRun in order) {
                order[OrderEx.tryRun]();
            }
            Order.resetTest();
            return true;
        }
        catch (e) {
            Order.resetTest();
            return false;
        }
    }
    OrderEx.canRunAtService = canRunAtService;
    function toScriptNode(order) {
        if (OrderEx.replaceToScriptNode in order) {
            var str = order[OrderEx.replaceToScriptNode]();
            replaceNodeByNode(order.data.placeholder, $$$(str, 103 /* Script */));
        }
    }
    OrderEx.toScriptNode = toScriptNode;
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../If.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.If, OrderEx.tryRun, function () {
        var data = this.data;
        for (var _i = 0, _a = data.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            Order.test(data.placeholder, block.condition);
        }
    });
    OrderEx.extendsOrderFunction(Order.If, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var blocks = getBlocksDataString(data);
        return "\n        Order.If.run({\n            placeholder:this,\n            blocks:[\n                " + blocks.join(",\n                ") + "]\n        });";
    });
    function getBlocksDataString(data) {
        var blocks = [];
        for (var _i = 0, _a = data.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            var nodes = [];
            for (var _b = 0, _c = block.nodes; _b < _c.length; _b++) {
                var node = _c[_b];
                nodes.push(node.toJS());
            }
            var nodesString = '';
            if (nodes.length > 0) {
                nodesString = '$$$' + nodes.join(',$$$');
            }
            blocks.push("{\n                order:'" + block.order + "',\n                condition:'" + block.condition + "',\n                nodes:[" + nodesString + "]\n            }");
        }
        return blocks;
    }
    OrderEx.getBlocksDataString = getBlocksDataString;
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../For.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.For, OrderEx.tryRun, function () {
        //只测试输入条件，不测试后期循环过程的变化
        var data = this.data;
        if (data.forMode === 0 /* In */) {
            if (data.forInInfo.var) {
                Order.testSetValue(data.placeholder, data.forInInfo.var, undefined);
            }
            Order.test(data.placeholder, data.forInInfo.object);
        }
        else {
            if (isString(data.forStepInfo.first)) {
                Order.test(data.placeholder, data.forStepInfo.first);
            }
            else {
                Order.tryRunVarInfos(data.placeholder, data.forStepInfo.first);
            }
            Order.test(data.placeholder, data.forStepInfo.step);
            Order.test(data.placeholder, data.forStepInfo.exec);
        }
    });
    OrderEx.extendsOrderFunction(Order.For, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var blocks = OrderEx.getBlocksDataString(data);
        var forStepInfo = '';
        if (data.forStepInfo) {
            forStepInfo = "{first:'" + data.forStepInfo.first + "',exec:'" + data.forStepInfo.exec + "',step:'" + data.forStepInfo.step + "'}";
        }
        else {
            forStepInfo = 'undefined';
        }
        var forInInfo = '';
        if (data.forInInfo) {
            forInInfo = "{object:'" + data.forInInfo.object + ",names:'" + data.forInInfo.names.join("','") + "',var:'" + data.forInInfo.var + "'}";
        }
        else {
            forInInfo = 'undefined';
        }
        return "\n        Order.For.run({\n            forStepInfo:" + forStepInfo + ",\n            forInInfo:" + forInInfo + ",\n            forMode:" + data.forMode + ",\n            placeholder:this,\n            blocks:[\n                " + blocks.join(",\n                ") + "]\n        });\n";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../Switch.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.Switch, OrderEx.tryRun, function () {
        var data = this.data;
        for (var _i = 0, _a = data.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            Order.test(data.placeholder, block.condition);
        }
    });
    OrderEx.extendsOrderFunction(Order.Switch, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var blocks = OrderEx.getBlocksDataString(data);
        return "\n        Order.Switch.run({\n            condition:'" + data.condition + "',\n            placeholder:this,\n            blocks:[\n                " + blocks.join(",\n                ") + "]\n        });\n";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../While.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.While, OrderEx.tryRun, function () {
        var data = this.data;
        Order.test(data.placeholder, data.condition);
    });
    OrderEx.extendsOrderFunction(Order.While, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var blocks = OrderEx.getBlocksDataString(data);
        return "\n        Order.While.run({\n            condition:'" + data.condition + "',\n            placeholder:this,\n            blocks:[\n                " + blocks.join(",\n                ") + "]\n        });\n";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../Do.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.Do, OrderEx.tryRun, function () {
        var data = this.data;
        Order.test(data.placeholder, data.condition);
    });
    OrderEx.extendsOrderFunction(Order.Do, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var blocks = OrderEx.getBlocksDataString(data);
        return "\n        Order.Do.run({\n            condition:'" + data.condition + "',\n            placeholder:this,\n            blocks:[\n                " + blocks.join(",\n                ") + "]\n        });\n";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../=.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.Equal, OrderEx.tryRun, function () {
        var data = this.data;
        Order.test(data.placeholder, data.condition);
    });
    OrderEx.extendsOrderFunction(Order.Equal, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        return "\n        Order.Equal.run({\n            condition:'" + data.condition + "',\n            placeholder:this\n        });";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../-.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.BindExpressions, OrderEx.tryRun, function () {
        throw new Error('不能预编译');
    });
    OrderEx.extendsOrderFunction(Order.BindExpressions, OrderEx.replaceToScriptNode, function () {
        var data = this.data;
        var fn;
        if (data.function) {
            var params = data.function.params.join('`,`');
            if (params.length > 0) {
                params = '`' + params + '`';
            }
            fn = "{\n                params:[" + params + "],\n                content:`" + data.function.content + "`\n            }";
        }
        else {
            fn = 'null';
        }
        return "\n        Order.BindExpressions.run({\n            object:['" + data.object[0] + "','" + data.object[1] + "'],\n            function:" + fn + ",\n            placeholder:this\n        });";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='../Var.ts'/>
var OrderEx;
(function (OrderEx) {
    OrderEx.extendsOrderFunction(Order.Var, OrderEx.tryRun, function () {
        Order.tryRunVarInfos(this.node, this.data.varInfos);
    });
    OrderEx.extendsOrderFunction(Order.Var, OrderEx.replaceToScriptNode, function () {
        //生成中间数据  的  生成代码
        var data = this.data;
        var varInfos = [];
        for (var _i = 0, _a = data.varInfos; _i < _a.length; _i++) {
            var varInfo = _a[_i];
            if (isString(varInfo[1])) {
                varInfos.push("['" + varInfo[0] + "','" + varInfo[1] + "'," + varInfo[2] + "]");
            }
            else {
                varInfos.push("['" + varInfo[0] + "'," + varInfo[1] + "," + varInfo[2] + "]");
            }
        }
        return "\n        Order.Var.run({\n            placeholder:this,\n            varInfos:[" + varInfos.join(',') + "]\n        });";
    });
})(OrderEx || (OrderEx = {}));
/// <reference path='VOrder.ts'/>
/// <reference path='If.ts'/>
/// <reference path='For.ts'/>
/// <reference path='Switch.ts'/>
/// <reference path='while.ts'/>
/// <reference path='Do.ts'/>
/// <reference path='=.ts'/>
/// <reference path='-.ts'/>
/// <reference path='Var.ts'/> 
var UIHelper;
(function (UIHelper) {
    function getScriptString(className) {
        return "namespace ComponentScript{\n    export class " + className + "{\n        constructor(part:Component." + className + "){\n            part.dom.initDOM(part.props);\n        }\n    }\n}";
    }
    UIHelper.getScriptString = getScriptString;
    function getViewString(className, propertyInfo, varInfo, domInitScript, scripts, props, defaultValuesInfo) {
        return "/// <reference path=\"../../../dest/virtual/UIHelper.0.1.d.ts\"/>\n\n//\u672C\u6A21\u5757\u7531\u5F15\u64CE\u751F\u6210\uFF0C\u8BF7\u52FF\u624B\u52A8\u4FEE\u6539\u6B64\u6587\u4EF6\n\nnamespace ComponentView{\n    export interface I" + className + "Props{\n        " + props + "\n    }\n    export class " + className + "{" + (defaultValuesInfo !== '' ? "\n        static defaultValuesInfo=[" + defaultValuesInfo + "];" : "") + "\n        " + propertyInfo + "\n        initDOM(props:I" + className + "Props){\n            " + varInfo + domInitScript + "\n        }\n    }\n" + (scripts !== '' ? "\n    //\u56E0\u4E3A\u65E0\u6CD5\u63A8\u6D4B\u8FD0\u884C\u7ED3\u679C\uFF0C\u6240\u4EE5\u751F\u6210\u4E2D\u95F4\u6570\u636E\u7B97\u6CD5\u5728\u6B64\n    " + scripts : '') + "\n}";
    }
    UIHelper.getViewString = getViewString;
    function getClassString(className) {
        return "/// <reference path=\"../../../dest/js/turtle.0.1.d.ts\"/>\n/// <reference path=\"./Script.ts\"/>\nnamespace Component{\n    export class " + className + " extends Part{\n        constructor(\n            public props:ComponentView.I" + className + "Props,\n            public outerChildNodes:INode[],\n            public outerElement:IHTMLCollection\n        ) {\n            super(template,props,html,outerChildNodes,outerElement);\n            new ComponentScript." + className + "(this);\n        }\n        dom=new ComponentView." + className + "\n    }\n}";
    }
    UIHelper.getClassString = getClassString;
})(UIHelper || (UIHelper = {}));
var RefInfo = (function () {
    function RefInfo() {
        this.data = [];
    }
    RefInfo.prototype.getRefNodeName = function (node) {
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var data = _a[_i];
            for (var _b = 0, _c = data.refs; _b < _c.length; _b++) {
                var ref = _c[_b];
                if (ref.node === node) {
                    return ref.name;
                }
            }
        }
        return null;
    };
    RefInfo.prototype.push = function (name, refNode) {
        var p = refNode.parentNode;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.refParent === p) {
                data.refs.push({ name: name, node: refNode });
                return;
            }
        }
        this.data.push({
            refParent: p,
            refs: [
                {
                    name: name,
                    node: refNode
                }
            ]
        });
    };
    RefInfo.getRefParentName = function (refs) {
        var name = '';
        for (var _i = 0, refs_1 = refs; _i < refs_1.length; _i++) {
            var ref = refs_1[_i];
            name += ref.name + '_';
        }
        return name + 'Parent';
    };
    return RefInfo;
}());
var UIHelper;
(function (UIHelper) {
    UIHelper.fs = typeof require !== "undefined" && require('fs');
    function buildProject(className, path) {
        if (!UIHelper.fs.existsSync(path)) {
            UIHelper.fs.mkdirSync(path);
        }
        var htmlPath = path + '/View.html';
        var classPath = path + '/Class.ts';
        var scriptPath = path + '/Script.ts';
        className = className[0].toUpperCase() + className.substr(1).toLowerCase();
        UIHelper.fs.writeFileSync(htmlPath, "<div>\n    <div ref=\"" + className + "\"></div>\n    </div>");
        UIHelper.fs.writeFileSync(classPath, UIHelper.getClassString(className));
        UIHelper.fs.writeFileSync(scriptPath, UIHelper.getScriptString(className));
        UIHelper.makeClass(htmlPath, className);
    }
    UIHelper.buildProject = buildProject;
})(UIHelper || (UIHelper = {}));
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
/// <reference path='../../part/PartParam.ts'/>
var UIHelper;
(function (UIHelper) {
    function getAttrAndChildsJS(name, refNode) {
        var sAttr = refNode.attributesToJS();
        if (sAttr.length !== 0) {
            sAttr = "this." + name + sAttr + ";";
        }
        var s = '';
        s = refNode.childNodesToJS(16).replace(/\.\$$/, '');
        if (s !== '') {
            s = "\n            this." + name + s + ";";
        }
        return sAttr + s;
    }
    function initOrder(chds, path) {
        treeEach(chds, "childNodes", function (node, state) {
            if (node instanceof VMDOM.VComment) {
                //解析注释里的命令
                try {
                    var order = void 0;
                    if (node instanceof VMDOM.VOrder) {
                        order = Order.parseOrder(node);
                    }
                    else {
                        order = Order.parseComment(node);
                    }
                    if (order && order.run) {
                        if (OrderEx.canRunAtService(order)) {
                            //order达成运行所需条件，运行
                            order.run();
                        }
                        else {
                            //order未达成运行所需条件，转换为VScript节点
                            OrderEx.toScriptNode(order);
                        }
                    }
                }
                catch (e) {
                    throw getMakeClassError(path, node, e.message, state);
                }
                return 4 /* c_noIn */;
            }
        });
    }
    function initRefInfo(chds, props, defaultValues, refInfo, scripts) {
        treeEach(chds, "childNodes", function (node, state) {
            if (node instanceof VMDOM.VHtmlElement) {
                var directives = node.vmData.directives;
                if (directives) {
                    for (var _i = 0, directives_2 = directives; _i < directives_2.length; _i++) {
                        var directive = directives_2[_i];
                        if (directive.defaultValue) {
                            props.push(directive.name + '?:string');
                            defaultValues.push("'" + directive.name + "'");
                        }
                        else {
                            props.push(directive.name + ':string');
                        }
                    }
                }
                //解析ref
                var v = node.getAttribute("ref");
                if (v) {
                    refInfo.push(v, node);
                    node.removeAttribute("ref");
                }
            }
            else if (node instanceof VMDOM.VScript) {
                scripts.push(node);
            }
        });
    }
    function scriptsToString(scripts) {
        var scriptFunctions = '';
        var functionHash = {};
        var index = 0;
        for (var i = scripts.length - 1; i >= 0; i--) {
            var script = scripts[i];
            var p = scripts[i].parentNode;
            var name_9 = 'order' + index;
            var hashScript = functionHash[script.toFunction()];
            if (hashScript) {
                script.propertyName = hashScript.propertyName;
            }
            else {
                functionHash[script.toFunction()] = script;
                script.propertyName = name_9;
                scriptFunctions += '\n    ' + script.toFunction();
                index++;
            }
        }
        return scriptFunctions;
    }
    function replaceToMember(refInfo, propertys, names, vars, propertyInitScript) {
        for (var _i = 0, _a = refInfo.data; _i < _a.length; _i++) {
            var info = _a[_i];
            if (info.refs.length > 1) {
                //缓存parent;
                var refParent = info.refParent;
                for (var _b = 0, _c = info.refs; _b < _c.length; _b++) {
                    var ref = _c[_b];
                    var name_10 = ref.name;
                    var refNode = ref.node;
                    var mem = $$$(name_10, 101 /* Member */);
                    replaceNodeByNode(refNode, mem);
                    names.push(name_10);
                    propertys.push(name_10 + ':' + toClassName(refNode));
                }
                var p = refParent.parentNode;
                if (!p) {
                    var refName = refInfo.getRefNodeName(refParent);
                    if (refName === null) {
                        throw new Error('未知错误！');
                    }
                }
                else {
                    var parentName = RefInfo.getRefParentName(info.refs);
                    var mem = $$$(parentName, 101 /* Member */);
                    mem.isVar = true;
                    replaceNodeByNode(refParent, mem);
                    names.push(parentName);
                    vars.push(parentName + ':' + toClassName(refParent));
                }
            }
            else {
                //只拆一次
                var refInfo_1 = info.refs[0];
                var name_11 = refInfo_1.name;
                var refNode = refInfo_1.node;
                var p = refNode.parentNode;
                p.insertBefore($$$(name_11, 101 /* Member */), refNode);
                p.removeChild(refNode);
                names.push(name_11);
                propertys.push(name_11 + ':' + toClassName(refNode));
            }
        }
        function setPropertyInitScript(name, node) {
            propertyInitScript[name] = "this." + name + "=<any>$$$" + node.toCreateJS() + ";\n            " + getAttrAndChildsJS(name, node);
        }
        //生成代码
        for (var _d = 0, _e = refInfo.data; _d < _e.length; _d++) {
            var info = _e[_d];
            if (info.refs.length > 1) {
                //缓存parent;
                var refParent = info.refParent;
                for (var _f = 0, _g = info.refs; _f < _g.length; _f++) {
                    var ref = _g[_f];
                    setPropertyInitScript(ref.name, ref.node);
                }
                var p = refParent.parentNode;
                if (p) {
                    setPropertyInitScript(RefInfo.getRefParentName(info.refs), refParent);
                }
            }
            else {
                //只拆一次
                var refInfo_2 = info.refs[0];
                setPropertyInitScript(refInfo_2.name, refInfo_2.node);
            }
        }
    }
    var nameMatch = /[\s\S]*[\/\\](.*?)[\/\\].*?$/;
    function makeClass(path, className) {
        if (!className) {
            className = path.match(nameMatch)[1];
        }
        className = className[0].toUpperCase() + className.substr(1).toLowerCase();
        var html = UIHelper.fs.readFileSync(path);
        if (!isString(html)) {
            html = html.toString();
        }
        var dom = VDOM2.parseStructor(html);
        var tops;
        var chds;
        if (isArray(dom)) {
            chds = dom;
            tops = dom;
        }
        else {
            chds = dom.childNodes;
            tops = [dom];
        }
        initOrder(chds, path);
        var refInfo = new RefInfo;
        var scripts = [];
        var paramInfos = [];
        var props = [];
        var defaultValues = [];
        initRefInfo(chds, props, defaultValues, refInfo, scripts);
        var scriptFunctions = scriptsToString(scripts);
        var propertys = [];
        var names = [];
        var vars = [];
        var propertyInitScript = {};
        //替换节点为mem
        replaceToMember(refInfo, propertys, names, vars, propertyInitScript);
        var topsJS = [];
        var topsType = [];
        for (var _i = 0, tops_1 = tops; _i < tops_1.length; _i++) {
            var top_1 = tops_1[_i];
            topsJS.push(top_1.toJSString(16));
            topsType.push(toClassName(top_1));
        }
        var domInitScript = '';
        for (var i = names.length - 1; i >= 0; i--) {
            var name_12 = names[i];
            domInitScript += '\n            ' + propertyInitScript[name_12];
        }
        if (topsJS.length > 0) {
            propertys.push('tops:[' + topsType.join('\n,') + '];');
            domInitScript += "\n            push.call(this.tops,<(VMDOM.VNode&IVNodeMethod)>\n                    " + topsJS.join(',\n                    <(VMDOM.VNode&IVNodeMethod)>') + "\n            );";
        }
        var propertyInfo = propertys.join(';\n        ');
        var varInfo = vars.join(';\n            ');
        var propsInfo = props.join('\n        ');
        var defaultValuesInfo = defaultValues.join(',');
        UIHelper.fs.writeFileSync(path.replace(/View\.html$/, 'View.ts'), UIHelper.getViewString(className, propertyInfo, varInfo, domInitScript, scriptFunctions, propsInfo, defaultValuesInfo));
        //mixin .css  to  变量
    }
    UIHelper.makeClass = makeClass;
    function getMakeClassError(path, node, message, state) {
        var stack = state.stack;
        var strStack = '    at ' + path + '\n';
        for (var i = 0; i < stack.length; i += 2) {
            var arr = stack[i];
            var index = stack[i + 1];
            var info = [];
            strStack = '    at childNodes.' + index + ':' + arr[index].nodeName + '\n' + strStack;
        }
        strStack = '    at childNodes.' + state.currentIndex + ':' + node.data + '\n' + strStack;
        return 'Error:' + message + '\n' + strStack;
    }
})(UIHelper || (UIHelper = {}));
/// <reference path='VDOM2.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='VScript.ts'/>
/// <reference path='VOrder.ts'/>
/// <reference path='../../lib/TreeEach.ts'/>
/// <reference path='../../lib/is.ts'/>
/// <reference path='./VElementHelper.ts'/>
/// <reference path='VMember.ts'/>
/// <reference path='../order/VOrder.ts'/>
/// <reference path='../order/If.ts'/>
/// <reference path='../order/For.ts'/>
/// <reference path='../order/Switch.ts'/>
/// <reference path='../order/while.ts'/>
/// <reference path='../order/Do.ts'/>
/// <reference path='../order/Scope.ts'/>
/// <reference path='../order/=.ts'/>
/// <reference path='../order/-.ts'/>
/// <reference path='../order/Script.ts'/>
/// <reference path='../order/orderEx/Index.ts'/>
/// <reference path='Template.ts'/>
/// <reference path='RefInfo.ts'/>
/// <reference path='ProjectHelper.ts'/>
/// <reference path='ClassHelper.ts'/>
typeof exports !== "undefined" && (exports.UIHelper = UIHelper);
