var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNodeJS;
if (typeof exports !== 'undefined') {
    isNodeJS = true;
}
else {
    isNodeJS = false;
}
if (!isNodeJS) {
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('remove')) {
                return;
            }
            Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    this.parentNode.removeChild(this);
                }
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
}
var turtleNS;
(function (turtleNS) {
    var arrayPrototype = Array.prototype, hasOwnProperty = Object.prototype.hasOwnProperty, slice = arrayPrototype.slice, push = arrayPrototype.push, getPrototypeOf = Object.getPrototypeOf, parseForOrderRE = /[a-zA-Z\d] in .*/, parseForOrderRE2 = /^.*;.*;.*$/, addStyleRE = /;\s*$/, addClassNameRE = /\s+$/, readyRE = /complete|loaded|interactive/, memberRE = /{([\-a-zA-Z\d\.\%\u4e00-\u9fa5]+)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\4)(\!)?((['"]?)-?[\-a-zA-Z\d\.\%\u4e00-\u9fa5]*?\7)}(\.(([a-zA-Z][a-zA-Z\d]+)(\([a-zA-Z\d\-\.\,\;\%\u4e00-\u9fa5]*\))?))?/g, orderCaseRE = /^\s?(else if|else|case break|case|default|end)(\s|$)/g, operatorRE = /\!=|==|=|<|<=|>=|>|\|/, camelCaseRE = /-(\w)/g, persentRE = /^\s*([\d.]+)%\s*$/, classSplitRE = /\s+/g, camelizeRE = /-+(.)?/g, deCamelizeRE = /[A-Z]/g, withthis = 'with(this){return eval($$turtle$$)};', _execValueByScope = Function('$$turtle$$,v,node,outer,outerElement,props,part', withthis), _execByScope = Function('$$turtle$$,node,outer,outerElement,props,part', withthis), _execExpressionsByScope = Function('$$turtle$$,$$v$$,$$node$$', 'with(this){var v=$$v$$;var node=$$node$$;return eval($$turtle$$)};'), exec = eval;
    var isIE;
    if (isNodeJS) {
        isIE = false;
    }
    else {
        isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    }
    var ReadyObject = (function () {
        function ReadyObject() {
            this._isReady = false;
            this.readyFunctions = [];
        }
        Object.defineProperty(ReadyObject.prototype, "isReady", {
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
        ReadyObject.prototype.on = function (fn) {
            if (!$t.isFunction(fn))
                return;
            if (this._isReady) {
                fn();
            }
            else {
                this.readyFunctions.push(fn);
            }
        };
        return ReadyObject;
    }());
    turtleNS.ReadyObject = ReadyObject;
    var Team = (function () {
        function Team(group, check, missingCheck) {
            this.groups = [group];
            this.checkEvents = [check];
            this.missingCheckEvents = [missingCheck];
        }
        Team.prototype.getCall = function () {
            var that = this;
            return function () {
                var e = that.checkEvents;
                var index = $t.getNodeIndex(this);
                for (var i_1 = 0; i_1 < e.length; i_1++) {
                    var teamGroup = that.groups[i_1];
                    var t = teamGroup[index];
                    if (t) {
                        e[i_1].call(t);
                    }
                    else {
                        that.missingCheckEvents[i_1]();
                    }
                }
            };
        };
        return Team;
    }());
    turtleNS.Team = Team;
    var UITeam = (function () {
        function UITeam() {
            this.map = {};
        }
        UITeam.prototype.push = function (name, group, check, missingCheck) {
            var team;
            if (!this.hasOwnProperty(name)) {
                team = new Team(group, check, missingCheck);
                this.map[name] = team;
            }
            else {
                team = this.map[name];
                team.checkEvents.push(check);
                team.missingCheckEvents.push(missingCheck);
                team.groups.push(group);
            }
            return team.getCall();
        };
        return UITeam;
    }());
    turtleNS.UITeam = UITeam;
    function last() {
        return this[this.length - 1];
    }
    var ArrayObject = (function () {
        function ArrayObject() {
        }
        return ArrayObject;
    }());
    turtleNS.ArrayObject = ArrayObject;
    var EOrder;
    (function (EOrder) {
        EOrder[EOrder["Scope"] = 'scope'] = "Scope";
        EOrder[EOrder["Var"] = 'var'] = "Var";
        EOrder[EOrder["Bind"] = 'bind'] = "Bind";
        EOrder[EOrder["Dashes"] = '-'] = "Dashes";
        EOrder[EOrder["Bang"] = '!'] = "Bang";
        EOrder[EOrder["Equals"] = '='] = "Equals";
        EOrder[EOrder["Content"] = 'content'] = "Content";
        EOrder[EOrder["Elements"] = 'elements'] = "Elements";
        EOrder[EOrder["While"] = 'while'] = "While";
        EOrder[EOrder["If"] = 'if'] = "If";
        EOrder[EOrder["Break"] = 'break'] = "Break";
        EOrder[EOrder["For"] = 'for'] = "For";
        EOrder[EOrder["Switch"] = 'switch'] = "Switch";
        EOrder[EOrder["Async"] = 'async'] = "Async";
    })(EOrder = turtleNS.EOrder || (turtleNS.EOrder = {}));
    var EOrderCase;
    (function (EOrderCase) {
        EOrderCase[EOrderCase["Else"] = 'else'] = "Else";
        EOrderCase[EOrderCase["Else_If"] = 'else if'] = "Else_If";
        EOrderCase[EOrderCase["Case"] = 'case'] = "Case";
        EOrderCase[EOrderCase["Case_Break"] = 'case break'] = "Case_Break";
        EOrderCase[EOrderCase["Default"] = 'default'] = "Default";
        EOrderCase[EOrderCase["End"] = 'end'] = "End";
    })(EOrderCase = turtleNS.EOrderCase || (turtleNS.EOrderCase = {}));
    ArrayObject.prototype = {
        clear: function () {
            var l = this.length;
            for (var i_2 = 0; i_2 < l; i_2++) {
                this.pop();
            }
        },
        concat: arrayPrototype.concat,
        every: arrayPrototype.every,
        filter: arrayPrototype.filter,
        forEach: arrayPrototype.forEach,
        indexOf: arrayPrototype.indexOf,
        join: arrayPrototype.join,
        lastIndexOf: arrayPrototype.lastIndexOf,
        map: arrayPrototype.map,
        pop: arrayPrototype.pop,
        push: arrayPrototype.push,
        reduce: arrayPrototype.reduce,
        reduceRight: arrayPrototype.reduceRight,
        reverse: arrayPrototype.reverse,
        shift: arrayPrototype.shift,
        slice: arrayPrototype.slice,
        some: arrayPrototype.some,
        sort: arrayPrototype.sort,
        splice: arrayPrototype.splice,
        toLocaleString: arrayPrototype.toLocaleString,
        toString: arrayPrototype.toString,
        unshift: arrayPrototype.unshift
    };
    var BaseUIPath = (function (_super) {
        __extends(BaseUIPath, _super);
        function BaseUIPath() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._paths = {};
            _this.jsUIPath = [];
            return _this;
        }
        BaseUIPath.prototype.push = function (v) {
            if (isString(v)) {
                this.parseUIPath(v);
            }
            else if (isArray(v)) {
                this._paths = {};
                for (var i_3 = 0; i_3 < v.length; i_3++) {
                    if (isString(v[i_3])) {
                        this.parseUIPath(v[i_3]);
                    }
                }
            }
            return -1;
        };
        BaseUIPath.prototype.parseUIPath = function (s) {
            try {
                var o = exec('(' + s + ')');
                if (isObject(o) && o.hasOwnProperty('name') && o.hasOwnProperty('path')) {
                    this._paths[o.name] = o;
                    this.push(o);
                }
            }
            catch (e) {
                $t.catch(e);
            }
        };
        BaseUIPath.prototype.getPathBySortPath = function (sortPath) {
            return this._paths[sortPath].path;
        };
        BaseUIPath.prototype.hasSortPath = function (sortPath) {
            return this._paths.hasOwnProperty(sortPath);
        };
        BaseUIPath.prototype.getSortPathByPath = function (path) {
            for (var key in this._paths) {
                if (this._paths[key].path === path) {
                    return key;
                }
            }
            return;
        };
        BaseUIPath.prototype.hasPath = function (path) {
            return this.getSortPathByPath(path) !== undefined;
        };
        BaseUIPath.prototype.toString = function () {
            var arr = [];
            for (var i_4 in this._paths) {
                arr.push("{name:'" + this._paths[i_4].name + "',path:'" + this._paths[i_4].path + "'}");
            }
            return arr.join(';');
        };
        return BaseUIPath;
    }(ArrayObject));
    turtleNS.BaseUIPath = BaseUIPath;
    var baseUIPath = new BaseUIPath;
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
                else if (state == 1) {
                    break;
                }
                obj2 = arr[i];
                if (obj2 && obj2 != obj && !(8 & state)) {
                    state = state | 2;
                }
                if (obj2 && obj2[property] && obj2[property].length > 0 && !(state & 4) && property) {
                    stack.push(arr);
                    stack.push(i + (state & 2 ? 0 : step.next));
                    i = 0;
                    arr = obj2[property];
                }
                else {
                    i += (state & 2 ? 0 : step.next);
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
    turtleNS.treeEach = treeEach;
    var EventEmitter = (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.emit = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (type === 'error') {
                if (!this.events || !this.events.error ||
                    (isArray(this.events.error) && !this.events.error.length)) {
                    if (arguments[1] instanceof Error) {
                        throw arguments[1];
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
                for (var i_5 = 0, l = listeners.length; i_5 < l; i_5++) {
                    listeners[i_5].apply(this, args);
                }
                return true;
            }
            else {
                handler.apply(this, args);
                return true;
            }
        };
        ;
        EventEmitter.prototype.addListener = function (type, listener) {
            if ('function' !== typeof listener) {
                throw new Error('addListener only takes instances of Function');
            }
            if (!this.events)
                this.events = {};
            this.emit('newListener', type, listener);
            var handler = this.events[type];
            if (!handler) {
                this.events[type] = listener;
            }
            else if (isArray(handler)) {
                handler.push(listener);
            }
            else {
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
            if (!this.events || !this.events[type])
                return this;
            var list = this.events[type];
            if (isArray(list)) {
                var i_6 = list.indexOf(listener);
                if (i_6 < 0)
                    return this;
                list.splice(i_6, 1);
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
    turtleNS.EventEmitter = EventEmitter;
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    var ElementParser = (function () {
        function ElementParser() {
        }
        ElementParser.TryParse = function (parser, elem, outerChildNodes, outerElement, props, pPart) {
            var nodeName = elem.nodeName;
            if (nodeName in this.map) {
                return parser[this.map[nodeName]](elem, outerChildNodes, outerElement, props, pPart);
            }
            else {
                return null;
            }
        };
        ElementParser.createSingleton = function (turtle) {
            this.turtle = turtle;
            var elementParser = new ElementParser();
            var map = this.map = {};
            for (var name_1 in elementParser) {
                map[name_1.toUpperCase()] = name_1;
            }
            return elementParser;
        };
        ElementParser.prototype.Script = function (node, outerChildNodes, outerElement, props, pPart) {
            if (node.type == "" || node.type == "on" || node.type == "text/javascript") {
                var src = getAttr(node, 'src', '');
                if (src) {
                    ElementParser.turtle.includeJSFiles(src);
                }
                else {
                    if (true) {
                        console.log('执行组件脚本！');
                    }
                    ElementParser.turtle.execTurtleScript(node, outerChildNodes, outerElement, props, pPart);
                }
                removeNode(node);
            }
        };
        ElementParser.prototype.Break = function (node, outerChildNodes, outerElement, props, pPart) {
            ElementParser.turtle.initHTML(node.childNodes, outerChildNodes, outerElement, props, pPart);
            takeOutChildNodes(node);
        };
        ElementParser.prototype.Get = function (node, outerChildNodes, outerElement, props, pPart) {
            removeNode(node);
            var name = getAttr(node, 'name');
            if (name) {
                ElementParser.turtle.initHTML(node.childNodes, outerChildNodes, outerElement, props, pPart);
                $t.store[name] = node;
                return 4;
            }
            var toRef = getAttr(node, 'to-p-ref');
            if (toRef && pPart) {
                toRef = '$' + toRef;
                var elm = pPart[toRef];
                if (elm) {
                    appendNodes(node.childNodes, elm);
                    ElementParser.turtle.initHTML(elm.childNodes, outerChildNodes, outerElement, props, pPart);
                    node.innerHTML = '';
                }
            }
        };
        ElementParser.prototype.Replace = function (node) {
            if (node.hasAttribute('link')) {
                var linkName_1 = takeAttr(node, 'link');
                var on_1 = takeAttr(node, 'on');
                if (on_1) {
                    var replace_1 = function (child) {
                        child.addEventListener(on_1, function () {
                            replaceElementByLink(linkName_1, child);
                        });
                    };
                    var childNodes = node.childNodes;
                    var len = childNodes.length;
                    for (var i = 0; i < len; i++) {
                        var child = childNodes[i];
                        if (child instanceof HTMLElement) {
                            replace_1(child);
                        }
                    }
                    takeOutChildNodes(node);
                }
                else {
                    replaceElementByLink(linkName_1, node);
                }
            }
            else {
            }
            return 4;
        };
        ElementParser.prototype.Set = function (node) {
            if (node.hasAttribute('link')) {
                var link = takeAttr(node, 'link');
                if ($t.store.hasOwnProperty(link) && node.children.length == 1) {
                    appendNodes($t.store[link].childNodes, node.children[0]);
                    takeOutChildNodes(node);
                }
                else {
                    removeNode(node);
                }
            }
            else {
                var ns = void 0;
                if (node.children.length > 0) {
                    ns = node.children;
                }
                else if (node.parentNode) {
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
                        for (var i_7 = 0; i_7 < attr.length; i_7++) {
                            ns[j].setAttribute(attr[i_7].name, attr[i_7].value);
                        }
                    }
                    else {
                        for (var i_8 = 0; i_8 < attr.length; i_8++) {
                            var value = attr[i_8].value;
                            var value2 = void 0;
                            switch (attr[i_8].name) {
                                case 'class':
                                    value2 = ns[j].getAttribute(attr[i_8].name);
                                    if (value2) {
                                        value += (/ $/.test(value) ? '' : ' ') + value2;
                                    }
                                    break;
                                case 'style':
                                    value2 = ns[j].getAttribute(attr[i_8].name);
                                    if (value2) {
                                        value += (/; *$/.test(value) ? '' : ';') + value2;
                                    }
                                    break;
                            }
                            ns[j].setAttribute(attr[i_8].name, value);
                        }
                    }
                }
                takeOutChildNodes(node);
            }
            return 4;
        };
        return ElementParser;
    }());
    turtleNS.ElementParser = ElementParser;
    var AttributeParserBeforeUIParser = (function () {
        function AttributeParserBeforeUIParser(turtle) {
            this.turtle = turtle;
        }
        AttributeParserBeforeUIParser.prototype.Lazy = function (node, outerChildNodes, outerElement, props, pPart) {
            node.removeAttribute('lazy');
            this.turtle.initHTML(node.childNodes, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParserBeforeUIParser.prototype.Async = function (node, outerChildNodes, outerElement, props, pPart) {
            var _this = this;
            if (true) {
                console.log('异步插入节点！');
            }
            var delay = parseInt(execByScope(node, node.getAttribute('async'), null, outerChildNodes, outerElement, props, pPart));
            node.removeAttribute('async');
            var mark = this.turtle.$$$('async', 8);
            replaceNodeByNode(node, mark);
            if (delay === NaN) {
                delay = 0;
            }
            setTimeout(function () {
                replaceNodeByNode(mark, node);
                mark = null;
                _this.turtle.initHTML([node], outerChildNodes, outerElement, props, pPart);
                _this.turtle.replaceCls();
            }, delay);
        };
        AttributeParserBeforeUIParser.prototype.AsyncRemove = function (node, outerChildNodes, outerElement, props, pPart) {
            var delay = parseInt(execByScope(node, node.getAttribute('async-remove'), null, outerChildNodes, outerElement, props, pPart));
            node.removeAttribute('async-remove');
            if (delay === NaN) {
                delay = 0;
            }
            this.turtle.initHTML([node], outerChildNodes, outerElement, props, pPart);
            setTimeout(function () {
                removeNode(node);
            }, delay);
        };
        return AttributeParserBeforeUIParser;
    }());
    turtleNS.AttributeParserBeforeUIParser = AttributeParserBeforeUIParser;
    var AttributeParser = (function () {
        function AttributeParser() {
        }
        AttributeParser.TryParse = function (parser, attrName, elem, outerChildNodes, outerElement, props, pPart) {
            if (attrName in parser) {
                parser[attrName](elem, outerChildNodes, outerElement, props, pPart);
            }
        };
        AttributeParser.createSingleton = function (turtle) {
            this.turtle = turtle;
            var elementParser = new AttributeParser();
            return elementParser;
        };
        AttributeParser.prototype.ref = function (node) {
            var refName = node.getAttribute('ref');
            node.removeAttribute('ref');
            KeyArrayObject.push(AttributeParser.turtle.refs, refName.split(','), node);
        };
        AttributeParser.prototype[":"] = function (node, outerChildNodes, outerElement, props, pPart) {
            execNodeQuestion(node, outerChildNodes, outerElement, props, pPart);
            AttributeParser.turtle.setQuestionAtrr(node, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype['p-ref'] = function (node, outerChildNodes, outerElement, props, pPart) {
            pref(node, pPart, takeAttr(node, 'p-ref'));
        };
        AttributeParser.prototype.bind = function (node) {
            AttributeParser.turtle.bindNodeByCondition(node, takeAttr(node, 'bind'));
        };
        AttributeParser.prototype.remove = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindRemove(node, takeAttr(node, 'remove'), outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype['async-remove'] = function (node, outerChildNodes, outerElement, props, pPart) {
        };
        AttributeParser.prototype.add = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindAdd(node, takeAttr(node, 'add'), outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype.show = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindShowHide(node, takeAttr(node, 'show'), true, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype.hide = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindShowHide(node, takeAttr(node, 'hide'), false, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["class.show"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindClassShowHide(node, takeAttr(node, 'class.show'), true, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["class.hide"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindClassShowHide(node, takeAttr(node, 'class.hide'), false, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["class.toggle"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindClassToggle(node, takeAttr(node, 'class.toggle'), outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["style.show"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindStyleShowHide(node, takeAttr(node, 'style.show'), true, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["style.hide"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindStyleShowHide(node, takeAttr(node, 'style.hide'), false, outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype["style.toggle"] = function (node, outerChildNodes, outerElement, props, pPart) {
            AttributeParser.turtle.bindStyleToggle(node, takeAttr(node, 'style.toggle'), outerChildNodes, outerElement, props, pPart);
        };
        AttributeParser.prototype.cls = function (node) {
            AttributeParser.turtle.clsNode.push(node);
        };
        AttributeParser.prototype['p-main'] = function (node, outerChildNodes, outerElement, props, pPart) {
            if (pPart && !pPart.partMain) {
                pPart.partMain = node;
            }
        };
        return AttributeParser;
    }());
    turtleNS.AttributeParser = AttributeParser;
    var TurtleFunction = (function () {
        function TurtleFunction() {
            this.slice = slice;
            this.DropRect = DropRect;
        }
        TurtleFunction.prototype.setNodeProperty = function (node, proName, condition, outerChildNodes, outerElement, props, pPart) {
            var v = execByScope(node, condition, null, outerChildNodes, outerElement, props, pPart);
            var name = camelCase(proName.substr(0, proName.length - 1));
            if (name.indexOf(".") != -1) {
                var obj2 = node;
                var nameArr = name.split(".");
                for (var i_9 = 0; i_9 < nameArr.length - 1; i_9++) {
                    obj2 = obj2[nameArr[i_9]];
                    if (!obj2)
                        return;
                }
                name = nameArr[nameArr.length - 1];
                obj2[name] = v;
            }
            else {
                node.setAttribute(name, v);
            }
        };
        TurtleFunction.prototype.setQuestionAtrr = function (node, outerChildNodes, outerElement, props, pPart) {
            var attrs = slice.call(node.attributes);
            for (var i_10 = 0; i_10 < attrs.length; i_10++) {
                var name_2 = attrs[i_10].name;
                if (name_2.length > 1) {
                    if (name_2[name_2.length - 1] === ':') {
                        this.setNodeProperty(node, name_2, takeAttr(node, name_2), outerChildNodes, outerElement, props, pPart);
                    }
                    else if (name_2[0] === ':') {
                        this.bindNodeProperty(node, name_2.substring(1, name_2.length), takeAttr(node, name_2));
                    }
                }
            }
        };
        TurtleFunction.prototype.bindPropertyByOrder = function (node, condition) {
            var cdtn = splitByOnce(condition, '|');
            if (cdtn[1] === "") {
                return;
            }
            var bindlet = cdtn[0];
            var bindletArr;
            var bindlet2 = cdtn[1];
            var bindlet2Arr;
            if (bindlet.indexOf(".") != -1) {
                bindletArr = bindlet.split(".");
            }
            else {
                bindletArr = [bindlet];
            }
            var name = bindletArr[bindletArr.length - 1];
            var scope = $t.uiScope.get(node);
            var obj = this.getBindObject(scope, bindletArr);
            if (obj === null) {
                throwError("无法从scope中读取：" + bindletArr.join("."));
                return;
            }
            if (bindlet2.indexOf(".") != -1) {
                bindlet2Arr = bindlet2.split(".");
            }
            else {
                bindlet2Arr = [bindlet2];
            }
            var name2 = bindlet2Arr[bindlet2Arr.length - 1];
            var scope2 = $t.uiScope.get(node);
            var obj2 = this.getBindObject(scope2, bindlet2Arr);
            if (obj2 === null) {
                throwError("无法从scope中读取：" + bindlet2Arr.join("."));
                return;
            }
            this.bindProperty(obj, name, obj2, name2);
            obj2[name2] = obj[name];
        };
        TurtleFunction.prototype.getBindInfo = function (obj, name, targetName) {
            if (!obj.__bind__)
                return;
            var bindInfoHash = obj.__bind__;
            for (var i_11 in bindInfoHash) {
                if (bindInfoHash[i_11].name === name && bindInfoHash[i_11].targetName === targetName) {
                    return bindInfoHash[i_11];
                }
            }
        };
        TurtleFunction.prototype.getBindObject = function (scope, name) {
            'use strict';
            var i, obj, length = name.length;
            ;
            while (scope) {
                obj = scope;
                for (i = 0; i < length; i++) {
                    if (obj.hasOwnProperty(name[i])) {
                        if (i < length - 1) {
                            obj = obj[name[i]];
                            continue;
                        }
                        else {
                            return obj;
                        }
                    }
                }
                scope = scope.__parent__;
            }
            obj = window[name[0]];
            if (obj) {
                for (i = 1; i < length; i++) {
                    if (obj.hasOwnProperty(name[i])) {
                        if (i < length - 1) {
                            obj = obj[name[i]];
                            continue;
                        }
                        else {
                            return obj;
                        }
                    }
                }
            }
            return null;
        };
        TurtleFunction.prototype.bindNodeFunction = function (node, bindlet, fn) {
            var bindletArr;
            if (bindlet.indexOf(".") != -1) {
                bindletArr = bindlet.split(".");
            }
            else {
                bindletArr = [bindlet];
            }
            var name = bindletArr[bindletArr.length - 1];
            var scope = $t.uiScope.get(node);
            var obj = this.getBindObject(scope, bindletArr);
            if (obj === null) {
                throwError("无法从scope中读取" + bindletArr.join("."));
                return;
            }
            fn.__me__ = fn;
            this.bindProperty(obj, name, fn, "__me__");
            return { object: obj, name: name, targetObject: fn, targetName: "__me__" };
        };
        TurtleFunction.prototype.bindExpressionsByOrder = function (node, condition) {
            var cdtn = splitByOnce(condition, '|');
            if (cdtn[1] === "") {
                cdtn[1] = "v";
            }
            var bindlet = cdtn[0];
            var textNode = $t.$$$(' ', 3);
            var bindletArr;
            if (bindlet.indexOf(".") != -1) {
                bindletArr = bindlet.split(".");
            }
            else {
                bindletArr = [bindlet];
            }
            var name = bindletArr[bindletArr.length - 1];
            var scope = $t.uiScope.get(node);
            var obj = this.getBindObject(scope, bindletArr);
            if (obj === null) {
                throwError('不能获取绑定属性:' + cdtn[0]);
                return;
            }
            var exp = function (v) {
                try {
                    var ret = _execExpressionsByScope.call(scope, cdtn[1], v, node);
                    if (isFunction(ret)) {
                        return ret(scope, v);
                    }
                    else {
                        return ret;
                    }
                }
                catch (e) {
                    $t.catch(e);
                }
            };
            exp.__me__ = exp;
            $t.bindProperty(obj, name, exp, '__me__');
            replaceNodeByNode(node, textNode);
            $t.bindElementProperty(exp, '__me__', textNode, 'data');
            textNode['data'] = exp.__me__;
        };
        TurtleFunction.prototype.bindProperty = function (obj, name, obj2, name2, type) {
            if (type === void 0) { type = 1; }
            var bindInfo1 = this.getBindInfo(obj, name, name2);
            var bindInfo2 = this.getBindInfo(obj2, name2, name);
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
                onPropertyChange(obj, name, e);
                e.isBinding = true;
                obj[name] = obj2[name2];
                e.isBinding = false;
            }
            else {
                var e = bindPropertyByName(obj, name, obj2, name2);
                onPropertyChange(obj, name, e);
                if (type != 2) {
                    onPropertyChange(obj2, name2, e);
                    e.isBinding = true;
                    obj2[name2] = obj[name];
                    e.isBinding = false;
                }
            }
        };
        TurtleFunction.prototype.onViewOnce = function (elem, elemScroll, fn) {
            ViewWatch.get(elemScroll).on(elem, fn);
        };
        TurtleFunction.prototype.addStyles = function (elem, styleRoots) {
            var style = elem.style;
            for (var _i = 0, styleRoots_1 = styleRoots; _i < styleRoots_1.length; _i++) {
                var styleRoot = styleRoots_1[_i];
                if (styleRoot.name !== "length" && styleRoot.name !== "parentRule") {
                    style[styleRoot.name] = styleRoot.value;
                }
            }
        };
        TurtleFunction.prototype.removeStyles = function (elem, styleRoots) {
            var style = elem.style;
            for (var _i = 0, styleRoots_2 = styleRoots; _i < styleRoots_2.length; _i++) {
                var styleRoot = styleRoots_2[_i];
                if (styleRoot.name !== "length" && styleRoot.name !== "parentRule") {
                    style[styleRoot.name] = "";
                }
            }
        };
        TurtleFunction.prototype.bindStyleToggle = function (elem, expressionEx, outer, outerElement, props, pPart) {
            var _this = this;
            var operator = expressionEx.match(operatorRE)[0];
            if (operator !== "|") {
                throwError("need operator '|'");
                return;
            }
            var expression = splitByCount(expressionEx, operator, 2);
            if (expression.length < 3) {
                throwError("expression.length<3");
                return;
            }
            var styles1 = expression.shift().split(";");
            var styleRoots1 = [];
            for (var _i = 0, styles1_1 = styles1; _i < styles1_1.length; _i++) {
                var style = styles1_1[_i];
                style = trim(style);
                var styleExpression = splitByOnce(style, ":");
                if (styleExpression[1] === "") {
                    throwError("styleExpression.length<2");
                    return;
                }
                var name_3 = camelCase(styleExpression.pop());
                styleRoots1.push({
                    name: name_3,
                    value: styleExpression.shift()
                });
            }
            var styles2 = expression.shift().split(";");
            var styleRoots2 = [];
            for (var _a = 0, styles2_1 = styles2; _a < styles2_1.length; _a++) {
                var style = styles2_1[_a];
                style = trim(style);
                var styleExpression = splitByOnce(style, ":");
                if (styleExpression[1] === "") {
                    throwError("styleExpression.length<2");
                    return;
                }
                var name_4 = camelize(styleExpression.shift());
                styleRoots2.push({
                    name: name_4,
                    value: styleExpression.shift()
                });
            }
            this.bindEval(elem, expression.join(operator), outer, outerElement, props, pPart, function (v) {
                if (v) {
                    _this.addStyles(elem, styleRoots1);
                    _this.removeStyles(elem, styleRoots2);
                }
                else {
                    _this.addStyles(elem, styleRoots2);
                    _this.removeStyles(elem, styleRoots1);
                }
            });
        };
        TurtleFunction.prototype.bindStyleShowHide = function (elem, expressionEx, isBindShow, outer, outerElement, props, pPart) {
            var _this = this;
            var operator = expressionEx.match(operatorRE)[0];
            if (operator !== "|") {
                throwError("need operator '|'");
                return;
            }
            var expression = splitByOnce(expressionEx, operator);
            if (expression[1] === "") {
                throwError("expression.length<2");
                return;
            }
            var styles = expression.shift().split(";");
            var styleRoots = [];
            for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
                var style = styles_1[_i];
                style = trim(style);
                var styleExpression = splitByOnce(style, ":");
                if (styleExpression[1] === "") {
                    throwError("styleExpression.length<2");
                    return;
                }
                var name_5 = camelize(styleExpression.shift());
                styleRoots.push({
                    name: name_5,
                    value: styleExpression.shift()
                });
            }
            this.bindEval(elem, expression.join(operator), outer, outerElement, props, pPart, function (v) {
                if (v) {
                    if (isBindShow) {
                        _this.addStyles(elem, styleRoots);
                    }
                    else {
                        _this.removeStyles(elem, styleRoots);
                    }
                }
                else {
                    if (!isBindShow) {
                        _this.addStyles(elem, styleRoots);
                    }
                    else {
                        _this.removeStyles(elem, styleRoots);
                    }
                }
            });
        };
        TurtleFunction.prototype.bindClassToggle = function (node, expressionEx, outer, outerElement, props, pPart) {
            var _this = this;
            var operator = expressionEx.match(operatorRE)[0];
            if (operator !== "|") {
                throwError("need operator '|'");
                return;
            }
            var expression = splitByCount(expressionEx, operator, 2);
            if (expression.length < 3) {
                throwError("expression.length<3");
                return;
            }
            var classes1 = expression.shift().split(/ +/);
            var classes2 = expression.shift().split(/ +/);
            this.bindEval(node, expression.join(operator), outer, outerElement, props, pPart, function (v) {
                if (v) {
                    _this.addClasses(node, classes1);
                    _this.removeClasses(node, classes2);
                }
                else {
                    _this.addClasses(node, classes2);
                    _this.removeClasses(node, classes1);
                }
            });
        };
        TurtleFunction.prototype.bindClassShowHide = function (node, expressionEx, isBindShow, outer, outerElement, props, pPart) {
            var _this = this;
            var operator = expressionEx.match(operatorRE)[0];
            if (operator !== "|") {
                throwError("need operator '|'");
                return;
            }
            var expression = splitByOnce(expressionEx, operator);
            if (expression[1] === "") {
                throwError("expression.length<2");
                return;
            }
            var classes = expression.shift().split(/ +/);
            this.bindEval(node, expression.join(operator), outer, outerElement, props, pPart, function (v) {
                if (v) {
                    if (isBindShow) {
                        _this.addClasses(node, classes);
                    }
                    else {
                        _this.removeClasses(node, classes);
                    }
                }
                else {
                    if (!isBindShow) {
                        _this.addClasses(node, classes);
                    }
                    else {
                        _this.removeClasses(node, classes);
                    }
                }
            });
        };
        TurtleFunction.prototype.bindShowHide = function (node, s, isBindShow, outer, outerElement, props, pPart) {
            var _this = this;
            this.bindEval(node, s, outer, outerElement, props, pPart, function (v) {
                if (v) {
                    if (isBindShow) {
                        _this.removeClass(node, 'uhide');
                    }
                    else {
                        _this.addClass(node, 'uhide');
                    }
                }
                else {
                    if (isBindShow) {
                        _this.addClass(node, 'uhide');
                    }
                    else {
                        _this.removeClass(node, 'uhide');
                    }
                }
            });
        };
        TurtleFunction.prototype.merge = function (elem, elemEx) {
            for (var e in elemEx) {
                if (!elem.hasOwnProperty(e)) {
                    elem[e] = elemEx[e];
                }
            }
            return elem;
        };
        TurtleFunction.prototype.$$$ = function (name, nodeType) {
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
        TurtleFunction.prototype.getDPI = function () {
            if (_DPI) {
                return _DPI;
            }
            var x, y;
            if (screen.deviceXDPI != undefined) {
                x = screen.deviceXDPI;
                y = screen.deviceYDPI;
            }
            else {
                var tmpNode = this.$$$("div");
                tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
                document.body.appendChild(tmpNode);
                x = parseInt(tmpNode.offsetWidth.toString());
                y = parseInt(tmpNode.offsetHeight.toString());
                tmpNode.parentNode.removeChild(tmpNode);
            }
            _DPI = (x > y ? y : x) / 96;
            return _DPI;
        };
        TurtleFunction.prototype.$$ = function (id) {
            return document.getElementById(id);
        };
        TurtleFunction.prototype.getOnTry = function (fn) {
            var _args = slice.call(arguments, 1);
            return function () {
                var args = slice.call(_args);
                for (var i_12 = 0; i_12 < arguments.length; i_12++) {
                    args.push(arguments[i_12]);
                }
                try {
                    return fn.apply(this, args);
                }
                catch (e) {
                    $t.catch(e);
                }
            };
        };
        TurtleFunction.prototype.hasCustomToString = function (obj) {
            return isFunction(obj.toString) && obj.toString !== toString;
        };
        TurtleFunction.prototype.each = function (elements, callback) {
            if (isArrayLike(elements)) {
                for (var i_13 = 0; i_13 < elements.length; i_13++)
                    if (callback.call(elements[i_13], i_13, elements[i_13]) === false)
                        return elements;
            }
            else {
                for (var key in elements)
                    if (callback.call(elements[key], key, elements[key]) === false)
                        return elements;
            }
            return elements;
        };
        TurtleFunction.prototype.map = function (elements, callback) {
            if (isArrayLike(elements)) {
                var values = [];
                for (var i_14 = 0; i_14 < elements.length; i_14++) {
                    var value = callback(elements[i_14], i_14);
                    if (value != null) {
                        values.push(value);
                    }
                }
                return this.flatten(values);
            }
            else {
                var values = [];
                for (var key in elements) {
                    var value = callback(elements[key], key);
                    if (value != null) {
                        values.push(value);
                    }
                }
                return this.flatten(values);
            }
        };
        TurtleFunction.prototype.hasAttrOnce = function (node, attr) {
            if (node.hasAttribute(attr)) {
                node.removeAttribute(attr);
                return true;
            }
            return false;
        };
        TurtleFunction.prototype.getClosure = function (fn) {
            var _args = arguments;
            return function () {
                var args = toArray(_args);
                for (var i_15 = 0; i_15 < arguments.length; i_15++) {
                    args.push(arguments[i_15]);
                }
                return fn.apply(this, args);
            };
        };
        TurtleFunction.prototype.getStep = function (fn, count) {
            if (!isNumber(count)) {
                return fn;
            }
            var step = count;
            var _fn = function () {
                if (step === count) {
                    step = 1;
                    fn.apply(this, arguments);
                }
                else {
                    step++;
                }
            };
            return _fn;
        };
        TurtleFunction.prototype.extend = function (elem, elemEx) {
            for (var e in elemEx) {
                elem[e] = elemEx[e];
            }
            return elem;
        };
        TurtleFunction.prototype.addStyle = function (elem, style) {
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
        };
        TurtleFunction.prototype.addClassName = function (elem, className) {
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
        };
        TurtleFunction.prototype.addClass = function (elem) {
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            this.addClasses(elem, arg);
        };
        TurtleFunction.prototype.addClasses = function (elem, clses) {
            var lst;
            if (!elem)
                return;
            lst = elem.classList;
            for (var i_16 = 0; i_16 < clses.length; i_16++) {
                if (!lst.contains(clses[i_16]))
                    lst.add(clses[i_16]);
            }
        };
        TurtleFunction.prototype.removeClass = function (elem, cls) {
            var lst;
            if (!elem) {
                return;
            }
            lst = elem.classList;
            if (lst.contains(cls)) {
                lst.remove(cls);
            }
        };
        TurtleFunction.prototype.removeClasses = function (elem, clses) {
            var lst;
            if (!elem) {
                return;
            }
            lst = elem.classList;
            for (var i_17 = 0; i_17 < clses.length; i_17++) {
                if (lst.contains(clses[i_17]))
                    lst.remove(clses[i_17]);
            }
        };
        TurtleFunction.prototype.replaceClass = function (sel, a, b) {
            if (sel && a && b)
                sel.className = sel.className.replace(a, b);
        };
        TurtleFunction.prototype.toggleClass = function (sel, a, fnAddA, fnRemoveA) {
            if (sel && a)
                if (sel.className.indexOf(a) >= 0) {
                    sel.className = sel.className.replace(a, "");
                    if (fnRemoveA) {
                        fnRemoveA();
                    }
                }
                else {
                    sel.className += " " + a;
                    if (fnAddA) {
                        fnAddA();
                    }
                }
        };
        TurtleFunction.prototype.is = function (data, fn) {
            return fn();
        };
        TurtleFunction.prototype.isRegExp = function (a) {
            return "[object RegExp]" === _toString.call(a);
        };
        TurtleFunction.prototype.isDate = function (a) {
            return "[object Date]" === _toString.call(a);
        };
        TurtleFunction.prototype.isNumber = function (a) {
            return "[object Number]" === _toString.call(a);
        };
        TurtleFunction.prototype.isString = function (a) {
            return "[object String]" === _toString.call(a);
        };
        TurtleFunction.prototype.isFunction = function (a) {
            return "[object Function]" === _toString.call(a);
        };
        TurtleFunction.prototype.isObject = function (a) {
            var type = typeof a;
            return type === 'function' || type === 'object' && !!a;
        };
        TurtleFunction.prototype.isFinite = function (obj) {
            return isFinite(obj) && !isNaN(parseFloat(obj));
        };
        TurtleFunction.prototype.isUndefined = function (a) {
            return a === void 0;
        };
        TurtleFunction.prototype.isArray = function (a) {
            return "[object Array]" === _toString.call(a);
        };
        TurtleFunction.prototype.isRepeat = function (arr) {
            var hash = {};
            for (var i_18 in arr) {
                if (arr[i_18] in hash)
                    return true;
                hash[arr[i_18]] = undefined;
            }
            return false;
        };
        TurtleFunction.prototype.isArrayLike = function (obj) {
            if (obj == null || isWindow(obj))
                return false;
            if (isArray(obj) || isString(obj))
                return true;
            var length = "length" in Object(obj) && obj.length;
            return isNumber(length) &&
                (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item == 'function');
        };
        TurtleFunction.prototype.isPersent = function (s) {
            return persentRE.test(s);
        };
        TurtleFunction.prototype.persentToFloat = function (s) {
            var v = persentRE.exec(s);
            if (v) {
                return parseFloat(v[1]) / 100;
            }
            return NaN;
        };
        TurtleFunction.prototype.toArray = function (obj) {
            return slice.call(obj);
        };
        TurtleFunction.prototype.moveArray = function (s, d) {
            for (var i_19 = 0; i_19 < s.length; i_19++) {
                d.push(s[i_19]);
            }
        };
        TurtleFunction.prototype.getRect = function (e) {
            var rect = { left: 0, top: 0, right: 0, bottom: 0 };
            var b = document.body;
            var p = e;
            while (p && p != b) {
                rect.left += p.offsetLeft;
                rect.top += p.offsetTop;
                p = p.offsetParent;
            }
            rect.right = rect.left + e.offsetWidth;
            rect.bottom = rect.top + e.offsetHeight;
            return rect;
        };
        TurtleFunction.prototype.getOffsetPos = function (elem1, elem2) {
            var pos = { x: 0, y: 0 };
            while (elem1 && elem1 != elem2) {
                pos.x += elem1.offsetLeft;
                pos.y += elem1.offsetTop;
                elem1 = elem1.offsetParent;
            }
            return pos;
        };
        TurtleFunction.prototype.idle = function (cb) {
            var timeid = 0;
            return function (delay) {
                if (timeid > 0) {
                    clearTimeout(timeid);
                }
                if (!delay)
                    delay = 0;
                timeid = setTimeout(function () {
                    timeid = 0;
                    biz.trycall(cb);
                }, delay);
            };
        };
        TurtleFunction.prototype.elementDOMdistance = function (borderElem, elem1, elem2) {
            var i = 0;
            var j = 0;
            while (1) {
                if (elem1 === borderElem)
                    break;
                i++;
                elem1 = elem1.parentElement;
            }
            while (1) {
                if (elem2 === borderElem)
                    break;
                j++;
                elem2 = elem2.parentElement;
            }
            return j - i;
        };
        TurtleFunction.prototype.elementInElement = function (elem1, elem2, borderElem) {
            if (!borderElem)
                borderElem = document.body;
            while (1) {
                if (elem1 === borderElem)
                    break;
                if (elem1 === elem2)
                    return true;
                elem1 = elem1.parentElement;
            }
            return false;
        };
        TurtleFunction.prototype.getDebounce = function (fn) {
            if (!isFunction(fn)) {
                return Empty;
            }
            var timeid = 0;
            return function (delay) {
                var _this = this;
                if (timeid > 0) {
                    return;
                }
                if (!delay) {
                    delay = 0;
                }
                var arg = slice.call(arguments, 1);
                timeid = setTimeout(function () {
                    timeid = 0;
                    fn.apply(_this, arg);
                }, delay);
            };
        };
        TurtleFunction.prototype.getReTimeout = function (fn) {
            var timeid = 0;
            return function (delay) {
                var _this = this;
                if (delay === void 0) { delay = 0; }
                if (timeid > 0) {
                    clearTimeout(timeid);
                }
                if (!delay) {
                    delay = 0;
                }
                var arg = slice.call(arguments, 1);
                timeid = setTimeout(function () {
                    timeid = 0;
                    fn.apply(_this, arg);
                }, delay);
            };
        };
        TurtleFunction.prototype.getAttr = function (node, attrName, defaultValue) {
            if (!node.hasAttribute(attrName)) {
                return defaultValue;
            }
            else {
                return node.getAttribute(attrName);
            }
        };
        TurtleFunction.prototype.extendConst = function (elem, elemEx) {
            for (var e in elemEx) {
                Object.defineProperty(elem, e, {
                    value: elemEx[e],
                    writable: false,
                    enumerable: true,
                    configurable: false
                });
            }
            return elem;
        };
        TurtleFunction.prototype.lockObject = function (obj) {
            var descriptor = {
                writable: false,
                enumerable: true,
                configurable: false
            };
            _resetDescriptor(obj, descriptor);
        };
        TurtleFunction.prototype.lockObject2 = function (obj) {
            var descriptor = {
                writable: true,
                enumerable: false,
                configurable: false
            };
            _resetDescriptor(obj, descriptor);
        };
        TurtleFunction.prototype.getBind = function (obj, fn) {
            return function () {
                return fn.apply(obj, arguments);
            };
        };
        TurtleFunction.prototype.compact = function (array) {
            return array.filter(function (item) { return item !== undefined && item !== null; });
        };
        TurtleFunction.prototype.flatten = function (array) {
            return array.length > 0 ? [].concat.apply([], array) : array;
        };
        TurtleFunction.prototype.camelize = function (str) {
            return str.replace(camelizeRE, function (match, chr) { return chr ? chr.toUpperCase() : ''; });
        };
        TurtleFunction.prototype.decamelize = function (str) {
            return str.replace(deCamelizeRE, function (match) {
                return '-' + match.toLowerCase();
            });
        };
        TurtleFunction.prototype.takeOutChildNodes = function (node) {
            var parent = node.parentNode;
            if (parent == null)
                return 0;
            var c = node.childNodes;
            var i = 0;
            for (var j = c.length - 1; j > -1; j--) {
                parent.insertBefore2(node.removeChild(c[0]), node);
            }
            parent.removeChild(node);
            return i;
        };
        TurtleFunction.prototype.takeChildNodes = function (node) {
            var c = node.childNodes;
            var length = c.length;
            var ret = [];
            for (var i_20 = length; i_20 > 0; i_20--) {
                ret.push(node.removeChild(c[0]));
            }
            return ret;
        };
        TurtleFunction.prototype.trim = function (s) {
            return s.replace(/^\s*|\s*$/g, "");
        };
        TurtleFunction.prototype.HTMLTrim = function (s) {
            return s.replace(/^[\s\r\n]*|[\s\r\n]*$/g, "");
        };
        TurtleFunction.prototype.trimLine = function (s) {
            return s.replace(/^\s*/g, "").replace(/\s*$/g, "").replace(/\s*[\r\n]\s*/g, "");
        };
        TurtleFunction.prototype.forEach = function (obj, iterator, context, eachValue) {
            if (eachValue === void 0) { eachValue = true; }
            var key, length;
            if (obj) {
                if (isFunction(obj)) {
                    for (key in obj) {
                        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                            iterator.call(context, eachValue ? obj[key] : null, key, obj);
                        }
                    }
                }
                else if (isArray(obj) || isArrayLike(obj)) {
                    var isPrimitive = typeof obj !== 'object';
                    for (key = 0,
                        length = obj.length; key < length; key++) {
                        if (isPrimitive || key in obj) {
                            iterator.call(context, eachValue ? obj[key] : null, key, obj);
                        }
                    }
                }
                else if (obj.forEach && obj.forEach !== forEach) {
                    obj.forEach(iterator, context, obj);
                }
                else if (isBlankObject(obj)) {
                    for (key in obj) {
                        iterator.call(context, eachValue ? obj[key] : null, key, obj);
                    }
                }
                else if (typeof obj.hasOwnProperty === 'function') {
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            iterator.call(context, eachValue ? obj[key] : null, key, obj);
                        }
                    }
                }
                else {
                    for (key in obj) {
                        if (hasOwnProperty.call(obj, key)) {
                            iterator.call(context, eachValue ? obj[key] : null, key, obj);
                        }
                    }
                }
            }
            return obj;
        };
        TurtleFunction.prototype.forEachSorted = function (obj, iterator, context) {
            var keys = Object.keys(obj).sort();
            for (var i_21 = 0; i_21 < keys.length; i_21++) {
                iterator.call(context, obj[keys[i_21]], keys[i_21]);
            }
            return keys;
        };
        TurtleFunction.prototype.scriptToJSON = function (script) {
            return JSON.parse(script.replace(/([a-zA-Z\d]+?)(?=:)/g, function (s) { return '"' + s.substring(0, s.length) + '"'; }));
        };
        TurtleFunction.prototype.replaceNodeByNodes = function (node, nodes) {
            insertNodesBefore(node, nodes);
            removeNode(node);
        };
        TurtleFunction.prototype.replaceNodeByNode = function (node, node2) {
            var parent = node.parentNode;
            if (parent == null) {
                return;
            }
            insertNode(node, node2);
            parent.removeChild(node);
        };
        TurtleFunction.prototype.replaceNodeByString = function (node, s) {
            var parent = node.parentNode;
            if (parent == null)
                return;
            node.insertAdjacentText('beforeBegin', s);
            parent.removeChild(node);
        };
        TurtleFunction.prototype.insertNodesBefore = function (node, nodes) {
            var parent = node.parentNode;
            if (parent == null) {
                return;
            }
            for (var i_22 = 0; i_22 < nodes.length; i_22++) {
                parent.insertBefore2(nodes[i_22], node);
            }
        };
        TurtleFunction.prototype.insertNodeBefore = function (node, node2) {
            var parent = node.parentNode;
            if (parent == null)
                return;
            parent.insertBefore2(node2, node);
        };
        TurtleFunction.prototype.appendNodes = function (nodes, parent) {
            var c = slice.call(nodes);
            for (var i_23 = 0; i_23 < c.length; i_23++) {
                parent.appendChild(c[i_23]);
            }
        };
        TurtleFunction.prototype.parseBool = function (v) {
            if (typeof v == 'string') {
                v = v.replace(/[\s]/g, '').toLowerCase();
                if (v && (v == 'false' || v == '0' || v == 'null' || v == 'undefined'))
                    v = false;
                else if (v)
                    v = true;
            }
            return !!v;
        };
        TurtleFunction.prototype.getUUID = function (len) {
            len = len || 6;
            len = parseInt(len.toString(), 10);
            len = isNaN(len) ? 6 : len;
            var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
            var seedLen = seed.length - 1;
            var uuid = '';
            while (len--) {
                uuid += seed[Math.round(Math.random() * seedLen)];
            }
            return uuid;
        };
        TurtleFunction.prototype.handleWebkitRrror = function (e) {
            var info = e.stack;
            var stacks = info.split('\n');
            stacks.shift();
            for (var i_24 = 0; i_24 < stacks.length; i_24++) {
                var t = stacks[i_24].split(':');
                if (t.length > 1) {
                    var c = t[t.length - 1].replace(')', '');
                    var l = t[t.length - 2];
                    t = t[t.length - 3].split('/');
                    t[t.length - 1] = t[t.length - 1].replace('html', 'h').replace('js', 's');
                    stacks[i_24] = "at " + t[t.length - 1] + ":" + l + ":" + c;
                }
                else {
                    stacks[i_24] = t[0].replace(/(^\s*)|(\s*$)/g, '');
                }
            }
            return stacks.join("\r\n");
        };
        TurtleFunction.prototype.getNodeIndex = function (node) {
            var n = node;
            var index = 0;
            n = node.previousElementSibling;
            while (n != null) {
                n = n.previousElementSibling;
                index++;
            }
            return index;
        };
        TurtleFunction.prototype.getNodeIndex2 = function (node) {
            var n = node;
            var index = 0;
            n = node.previousSibling;
            while (n != null) {
                n = n.previousSibling;
                index++;
            }
            return index;
        };
        TurtleFunction.prototype.getNameByURL = function (url) {
            var ret = url.match(/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/);
            if (ret) {
                return ret[0].replace(/\.[a-zA-Z\d]+$/, '');
            }
            else {
                return '';
            }
        };
        TurtleFunction.prototype.getFileNameByURL = function (url) {
            var ret = url.match(/[a-zA-Z\d\._]+\.[a-zA-Z\d]+$/);
            if (ret) {
                return ret[0];
            }
            else {
                return '';
            }
        };
        TurtleFunction.prototype.getNameByLocation = function () {
            return this.getFileNameByURL(location.href);
        };
        TurtleFunction.prototype.execTurtleScript = function (node, outerChildNodes, outerElement, props, pPart) {
            var type = getAttr(node, 'type', null);
            if (type == 'on') {
                execOnScript(node);
            }
            else {
                this.execScriptNode(node, outerChildNodes, outerElement, props, pPart);
            }
        };
        TurtleFunction.prototype.execScriptNode = function (node, outerChildNodes, outerElement, props, pPart) {
            var script = node.innerHTML;
            if (script.length > 0) {
                var keylet = String(getAttr(node, 'var', ''));
                this.execScriptString(script, keylet, node.parentNode, outerChildNodes, outerElement, props, pPart);
            }
        };
        TurtleFunction.prototype.execScriptString = function (script, keylet, that, outerChildNodes, outerElement, props, pPart) {
            if (script.length > 0) {
                var fn = void 0;
                fn = Function('$t,outer,outerElement,props,part' + (keylet ? ',' : '') + keylet, script);
                var args = [this, outerChildNodes, outerElement, props, pPart];
                if (keylet.length > 0) {
                    var keyletArr = keylet.split(',');
                    for (var i_25 = 0; i_25 < keyletArr.length; i_25++) {
                        var ui = $t.refs[keyletArr[i_25]];
                        if (ui) {
                            args.push(ui[ui.length - 1]);
                        }
                        else {
                            args.push(null);
                        }
                    }
                }
                try {
                    fn.apply(that, args);
                }
                catch (e) {
                    this.catch(e);
                }
                fn = null;
            }
        };
        TurtleFunction.prototype.nodesToString = function (nodes) {
            var s = '';
            for (var i_26 = 0; i_26 < nodes.length; i_26++) {
                var node = nodes[i_26];
                if (node instanceof Comment) {
                    s += '<!--' + node.data + '-->';
                }
                else if (node instanceof Text) {
                    try {
                        s += node.data;
                    }
                    catch (e) { }
                }
                else if (node instanceof HTMLElement) {
                    s += node.outerHTML;
                }
            }
            return s;
        };
        TurtleFunction.prototype.removeNode = function (node) {
            var p = node.parentNode;
            if (p) {
                return p.removeChild(node);
            }
            else {
                return null;
            }
        };
        TurtleFunction.prototype.objectChange = function (obj, fnOnSet) {
            for (var i_27 in obj) {
                onPropertyChange(obj, i_27, fnOnSet);
            }
        };
        TurtleFunction.prototype.objectPropertyChange = function (obj, name, fnOnSet) {
            if (obj.hasOwnProperty(name)) {
                onPropertyChange(obj, name, fnOnSet);
            }
        };
        TurtleFunction.prototype.bindNodeByCondition = function (node, condition) {
            var cdtn = splitByOnce(condition, "|");
            var name = cdtn[0];
            if (!name) {
                return;
            }
            var scope = $t.uiScope.get(node);
            var obj;
            if (name.indexOf(".") != -1) {
                var nameArr = name.split(".");
                obj = this.getBindObject(scope, nameArr);
                name = nameArr[nameArr.length - 1];
            }
            else {
                obj = this.getBindObject(scope, [name]);
            }
            if (obj === null) {
                throwError('不能获取绑定属性:' + cdtn[0]);
                return;
            }
            if (cdtn[1] !== "") {
                var exp = function (v) {
                    _execExpressionsByScope.call(scope, cdtn[1], v, node);
                };
                exp.__me__ = exp;
                this.bindProperty(obj, name, exp, "__me__");
            }
            else {
                this.bindNode(node, obj, name);
            }
        };
        TurtleFunction.prototype.bindNode = function (node, obj, name) {
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
            this.bindElementProperty(obj, name, node, elementValueName);
            if (eventName) {
                node.addEventListener(eventName, function () {
                    obj[name] = node[elementValueName];
                });
            }
        };
        TurtleFunction.prototype.bindEval = function (node, expression, outer, outerElement, props, pPart, fn) {
            var expressionMatch = expression.match(operatorRE);
            if (!expressionMatch) {
                throwError("不合法的语句：" + expression);
                return;
            }
            var operator = expressionMatch[0];
            var bindlet = splitByOnce(expression, operator);
            var sfn;
            if (bindlet[1] === "") {
                throwError("bindlet.length<2");
                return;
            }
            switch (operator) {
                case "|":
                    sfn = bindlet[1];
                    break;
                case "=":
                    operator = "==";
                default:
                    sfn = 'v' + operator + bindlet[1];
                    break;
            }
            return this.bindNodeFunction(node, bindlet[0], function (v) {
                fn.call(this, execValueByScope(node, sfn, v, this, outer, outerElement, props, pPart));
            });
        };
        TurtleFunction.prototype.bindRemove = function (node, s, outer, outerElement, props, pPart) {
            var bindInfo = this.bindEval(node, s, outer, outerElement, props, pPart, function (v) {
                if (!v)
                    return;
                removeBind(this, bindInfo.targetName, bindInfo.name);
                removeNode(node);
            });
        };
        TurtleFunction.prototype.bindAdd = function (node, s, outer, outerElement, props, pPart) {
            var placeholder = $t.$$$('', 8);
            replaceNodeByNode(node, placeholder);
            var bindInfo = this.bindEval(node, s, outer, outerElement, props, pPart, function (v) {
                if (!v)
                    return;
                removeBind(this, bindInfo.targetName, bindInfo.name);
                replaceNodeByNode(placeholder, node);
            });
        };
        TurtleFunction.prototype.bindElementProperty = function (obj, name, obj2, name2) {
            this.bindProperty(obj, name, obj2, name2, 2);
        };
        TurtleFunction.prototype.getUIInfoByString = function (name) {
            if (name.indexOf(':') !== -1) {
                var c = name.split(':');
                var sortPath = c[0];
                if (baseUIPath.hasSortPath(sortPath)) {
                    return { sortPath: sortPath, name: c[1].toLowerCase() };
                }
            }
            return null;
        };
        TurtleFunction.prototype.getUIInfo = function (node) {
            var nodeName = node.nodeName;
            if (nodeName === 'SCRIPT') {
                var name_6 = node.getAttribute('ui');
                if (name_6) {
                    return this.getUIInfoByString(name_6.toLowerCase());
                }
            }
            return this.getUIInfoByString(nodeName.toLowerCase());
        };
        TurtleFunction.prototype.repeatCall = function (delay, repeat, fn) {
            var i = 0;
            var id = setInterval(function () {
                i++;
                if (repeat != -1 && i >= repeat) {
                    clearInterval(id);
                }
                fn();
            }, delay);
        };
        TurtleFunction.prototype.removeItem = function (arr, obj) {
            var index = arr.indexOf(obj);
            if (index != -1) {
                arr.splice(index, 1);
            }
        };
        TurtleFunction.prototype.onPropertyChange = function (obj, name, fnOnSet) {
            var desc = Object.getOwnPropertyDescriptor(obj, name);
            if (!desc)
                return;
            if (desc.configurable === false) {
                throwError('绑定失败：原属性' + name + '替换失败');
                return;
            }
            if (desc.writable === false) {
                throwError('绑定失败：原属性' + name + '不可写');
                return;
            }
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
        };
        TurtleFunction.prototype.bindNodeProperty = function (node, proName, condition) {
            var cdtn = splitByOnce(condition, "|");
            var obj2 = node;
            var bindlet = cdtn[0];
            var name2 = camelCase(proName);
            if (name2.indexOf(".") != -1) {
                var name2Arr = name2.split(".");
                for (var i_28 = 0; i_28 < name2.length - 1; i_28++) {
                    obj2 = obj2[name2Arr[i_28]];
                    if (!obj2)
                        return;
                }
                name2 = name2Arr[name2Arr.length - 1];
            }
            var bindletArr;
            if (bindlet.indexOf(".") != -1) {
                bindletArr = bindlet.split(".");
            }
            else {
                bindletArr = [bindlet];
            }
            var scope = $t.uiScope.get(node);
            var obj = this.getBindObject(scope, bindletArr);
            if (obj === null) {
                throwError('不能获取绑定属性:' + cdtn[0]);
                return;
            }
            var name = bindletArr[bindletArr.length - 1];
            if (cdtn[1] !== "") {
                var exp = function (v) {
                    obj2[name2] = _execExpressionsByScope.call(scope, cdtn[1], v, node);
                };
                exp.__me__ = exp;
                this.bindProperty(obj, name, exp, '__me__');
            }
            else {
                this.bindElementProperty(obj, name, obj2, name2);
                obj2[name2] = obj[name];
            }
        };
        TurtleFunction.prototype.bindFunction = function (obj, bindlet, fn) {
            var lets = bindlet.split('.');
            var propertyName;
            if (lets.length > 0) {
                propertyName = lets.pop();
                obj = getObjectValue(obj, lets);
            }
            else {
                propertyName = bindlet;
            }
            fn.__me__ = fn;
            this.bindProperty(obj, propertyName, fn, "__me__");
        };
        TurtleFunction.prototype.includeJSFiles = function (files, fn) {
            _includeTask = new IncludeTask(this.$$$, _includeTask, files, fn);
            this.includeJSFile(_includeTask);
        };
        TurtleFunction.prototype.includeJSFile = function (task) {
            var _this = this;
            if (task.files.length > 0) {
                var url = task.files.shift();
                var scriptNode = IncludeTask.jsScript[url];
                scriptNode.src = url;
                task.count++;
                scriptNode.onload = function () {
                    task.count--;
                    _this.includeJSFile(task);
                };
                document.head.appendChild(scriptNode);
            }
            else if (task.count == 0) {
                task.onallload();
            }
        };
        TurtleFunction.prototype.bindElementPropertyByName = function (node, elementValueName, condition) {
            var cdtn = splitByOnce(condition, "|");
            var name = cdtn[0];
            if (!name)
                return;
            var scope = $t.uiScope.get(node);
            var obj;
            if (name.indexOf(".") != -1) {
                var nameArr = name.split(".");
                obj = this.getBindObject(scope, nameArr);
                name = nameArr[nameArr.length - 1];
            }
            else {
                obj = this.getBindObject(scope, [name]);
            }
            if (obj === null) {
                throwError('不能获取绑定属性:' + cdtn[0]);
                return;
            }
            if (cdtn[1] !== "") {
                var exp = function (v) {
                    _execExpressionsByScope.call(scope, cdtn[1], v, node);
                };
                exp.__me__ = exp;
                this.bindProperty(obj, name, exp, "__me__");
            }
            else {
                if (!node.__bind__) {
                    node[elementValueName] = obj[name];
                }
                this.bindProperty(obj, name, node, elementValueName);
            }
        };
        TurtleFunction.prototype.camelCase = function (s) {
            return s.replace(camelCaseRE, function (s, s1) {
                return s1.toUpperCase();
            });
        };
        TurtleFunction.prototype.execByScope = function (node, s, scope, outer, outerElement, props, pPart) {
            return _execByScope.call(getScopeBy(scope, node), s, node, outer, outerElement, props, pPart);
        };
        TurtleFunction.prototype.execTemplateScript = function (s, node, outerChildNodes, outerElement, props, pPart) {
            s = s.replace(/{%.+?%}/g, function (s) {
                return execByScope(node, s.substring(2, s.length - 2), null, outerChildNodes, outerElement, props, pPart);
            });
            return s;
        };
        TurtleFunction.prototype.toPercent = function (s) {
            return (Math.round(s * 10000) / 100).toFixed(0) + '%';
        };
        TurtleFunction.prototype.getStateFunction = function (fn) {
            var _fn = function () {
                if (_fn.enable) {
                    return fn.apply(this, arguments);
                }
            };
            _fn.enable = true;
            return _fn;
        };
        TurtleFunction.prototype.removeBlockBetween = function (node1, node2) {
            var p1 = node1.parentNode;
            var l1 = getNodeIndex2(node1) + 1;
            var l2 = getNodeIndex2(node2);
            for (var i_29 = l1; i_29 < l2; i_29++) {
                p1.removeChild(p1.childNodes[l1]);
            }
        };
        TurtleFunction.prototype.takeBlockBetween = function (node1, node2) {
            var p1 = node1.parentNode;
            var ns1 = p1.childNodes;
            var l1 = getNodeIndex2(node1) + 1;
            var l2 = getNodeIndex2(node2);
            var ns = [];
            for (var i_30 = l1; i_30 < l2; i_30++) {
                ns.push(p1.removeChild(ns1[l1]));
            }
            return ns;
        };
        TurtleFunction.prototype.getElementsBetween = function (node1, node2) {
            var nodes = [];
            var l1 = getNodeIndex2(node1);
            var l2 = getNodeIndex2(node2);
            var p1 = node1.parentNode;
            for (var i_31 = l1 + 1; i_31 < l2; i_31++) {
                nodes.push(p1.childNodes[i_31]);
            }
            return nodes;
        };
        TurtleFunction.prototype.cloneBetween = function (node1, node2) {
            var nodes = [];
            var l1 = getNodeIndex2(node1);
            var l2 = getNodeIndex2(node2);
            var p1 = node1.parentNode;
            for (var i_32 = l1 + 1; i_32 < l2; i_32++) {
                nodes.push(deepClone(p1.childNodes[i_32]));
            }
            return nodes;
        };
        TurtleFunction.prototype.dropMove = function (elemTarget, elemMove, arrow, noOut, fn) {
            var delayFn = this.getDebounce(fn);
            elemTarget.addEventListener("mousedown", md);
            elemTarget.addEventListener("touchstart", td);
            var body = document.body;
            body.addEventListener("mouseup", mu);
            body.addEventListener("touchend", tu);
            body.addEventListener("touchcancel", tu);
            var start, startLeft, startTop;
            function md(e) {
                e.stopPropagation();
                startLeft = elemMove.offsetLeft;
                startTop = elemMove.offsetTop;
                start = e;
                document.body.addEventListener("mousemove", mm);
            }
            function td(e) {
                e.stopPropagation();
                startLeft = elemMove.offsetLeft;
                startTop = elemMove.offsetTop;
                start = e.changedTouches[0];
                document.body.addEventListener("touchmove", tm);
            }
            function mmove(e) {
                switch (arrow) {
                    case 1:
                        setLeft(startLeft + e.x - start.x);
                        break;
                    case 2:
                        setTop(startTop + e.y - start.y);
                        break;
                    case 3:
                        setLeft(startLeft + e.clientX - start.x);
                        setTop(startTop + e.clientX - start.x);
                        break;
                    case 4:
                        setLeft(startLeft + e.clientY - start.y);
                        setTop(startTop + e.clientY - start.y);
                        break;
                    default:
                        setLeft(startLeft + e.x - start.x);
                        setTop(startTop + e.y - start.y);
                }
                delayFn(30);
            }
            function mm(e) {
                if (start) {
                    mmove(e);
                }
            }
            function setLeft(v) {
                if (noOut) {
                    if (v < 0) {
                        v = 0;
                    }
                    else if (v + elemMove.offsetWidth > elemMove.parentNode.offsetWidth) {
                        v = elemMove.offsetParent.offsetWidth - elemMove.offsetWidth;
                    }
                }
                elemMove.style.left = v + 'px';
            }
            function setTop(v) {
                if (noOut) {
                    if (v < 0) {
                        v = 0;
                    }
                    else if (v + elemMove.offsetHeight > elemMove.parentNode.scrollHeight) {
                        v = elemMove.offsetParent.offsetHeight - elemMove.offsetHeight;
                    }
                }
                elemMove.style.top = v + 'px';
            }
            function tmove(e) {
                switch (arrow) {
                    case 1:
                        setLeft(startLeft + e.changedTouches[0].clientX - start.changedTouches[0].clientX);
                        break;
                    case 2:
                        setTop(startTop + e.changedTouches[0].clientY - start.changedTouches[0].clientY);
                        break;
                    case 3:
                        setLeft(startLeft + e.changedTouches[0].clientX - start.changedTouches[0].clientX);
                        setTop(startTop + e.changedTouches[0].clientX - start.changedTouches[0].clientX);
                        break;
                    case 4:
                        setLeft(startLeft + e.changedTouches[0].clientX - start.changedTouches[0].clientY);
                        setTop(startTop + e.changedTouches[0].clientY - start.changedTouches[0].clientY);
                        break;
                    default:
                        setLeft(startLeft + e.changedTouches[0].clientX - start.changedTouches[0].clientX);
                        setTop(startTop + e.changedTouches[0].clientY - start.changedTouches[0].clientY);
                }
                delayFn(30);
            }
            function tm(e) {
                if (start) {
                    tmove(e);
                }
            }
            function mu(e) {
                if (start) {
                    mmove(e);
                    start = null;
                    document.body.removeEventListener("mousemove", mm);
                }
            }
            function tu(e) {
                if (start) {
                    tmove(e);
                    start = null;
                    document.body.removeEventListener("touchmove", tm);
                }
            }
        };
        return TurtleFunction;
    }());
    turtleNS.TurtleFunction = TurtleFunction;
    var DropRect = (function () {
        function DropRect(elem, fnbegin, fn, fnend) {
            var _this = this;
            this.elem = elem;
            this.fnbegin = fnbegin;
            this.fn = fn;
            this.fnend = fnend;
            this.md = function (e) {
                _this.start = e;
                _this.setOffset();
                document.body.addEventListener("mousemove", _this.mm);
                _this.fnbegin(_this.offsetLeft, _this.offsetTop);
            };
            this.mm = function (e) {
                if (_this.start) {
                    _this.fn(_this.getRectByPoint(_this.start.x, _this.start.y, e.clientX, e.clientY));
                }
            };
            this.td = function (e) {
                _this.start = e.changedTouches[0];
                _this.setOffset();
                _this.fnbegin(_this.offsetLeft, _this.offsetTop);
                document.body.addEventListener("touchmove", _this.tm);
            };
            this.tm = function (e) {
                if (_this.start) {
                    _this.fn(_this.getRectByPoint(_this.start.changedTouches[0].clientX, _this.start.changedTouches[0].clientY, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
                }
            };
            this.mu = function (e) {
                if (_this.start) {
                    _this.fnend(_this.getRectByPoint(_this.start.x, _this.start.y, e.clientX, e.clientY));
                    _this.start = null;
                    document.body.removeEventListener("mousemove", _this.mm);
                }
            };
            this.tu = function (e) {
                if (_this.start) {
                    _this.fnend(_this.getRectByPoint(_this.start.changedTouches[0].clientX, _this.start.changedTouches[0].clientY, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
                    _this.start = null;
                    document.body.removeEventListener("touchmove", _this.tm);
                }
            };
        }
        DropRect.prototype.on = function () {
            this.elem.addEventListener("mousedown", this.md);
            this.elem.addEventListener("touchstart", this.td);
            var body = document.body;
            body.addEventListener("mouseup", this.mu);
            body.addEventListener("touchend", this.tu);
            body.addEventListener("touchcancel", this.tu);
        };
        DropRect.prototype.off = function () {
            this.elem.removeEventListener("mousedown", this.md);
            this.elem.removeEventListener("touchstart", this.td);
            var body = document.body;
            body.removeEventListener("mouseup", this.mu);
            body.removeEventListener("touchend", this.tu);
            body.removeEventListener("touchcancel", this.tu);
        };
        DropRect.prototype.setOffset = function () {
            var node = this.elem;
            var t = 0, l = 0;
            var topE = document.documentElement;
            while (node && node !== topE) {
                t += node.offsetTop;
                l += node.offsetLeft;
                node = node.offsetParent;
            }
            this.offsetLeft = l;
            this.offsetTop = t;
        };
        DropRect.prototype.getRectByPoint = function (x1, y1, x2, y2) {
            var rect = {};
            if (x1 > x2) {
                rect.left = x2;
                rect.width = x1 - x2;
            }
            else {
                rect.left = x1;
                rect.width = x2 - x1;
            }
            if (y1 > y2) {
                rect.top = y2;
                rect.height = y1 - y2;
            }
            else {
                rect.top = y1;
                rect.height = y2 - y1;
            }
            rect.screenLeft = rect.left;
            rect.screenTop = rect.top;
            rect.left -= this.offsetLeft;
            rect.top -= this.offsetTop;
            return rect;
        };
        return DropRect;
    }());
    turtleNS.DropRect = DropRect;
    var ClassList = (function () {
        function ClassList(elem) {
            this.elem = elem;
        }
        ClassList.prototype.add = function (value) {
            var classes = this.elem.className.split(classSplitRE);
            var index = classes.indexOf(value);
            if (!~index) {
                classes.push(value);
                this.elem.className = classes.join(' ');
            }
        };
        ClassList.prototype.remove = function (value) {
            var classes = this.elem.className.split(classSplitRE);
            var index = classes.indexOf(value);
            if (~index) {
                classes.splice(index, 1);
                this.elem.className = classes.join(' ');
            }
        };
        ClassList.prototype.toggle = function (value) {
            var classes = this.elem.className.split(classSplitRE);
            var index = classes.indexOf(value);
            if (~index) {
                classes.splice(index, 1);
            }
            else {
                classes.push(value);
            }
            this.elem.className = classes.join(' ');
        };
        ClassList.prototype.contains = function (value) {
            return !!~this.elem.className.split(classSplitRE).indexOf(value);
        };
        ClassList.prototype.item = function (i) {
            return this.elem.className.split(classSplitRE)[i] || null;
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
    if (!isNodeJS) {
        if (!("classList" in document.documentElement)) {
            defineClassList(HTMLElement.prototype);
        }
        var insertBefore_1 = Node.prototype.insertBefore;
        if (isIE) {
            Node.prototype.insertBefore2 = function (newNode, node) {
                var reAppend = [];
                var n;
                if (newNode instanceof Text) {
                    if (newNode.data === "") {
                        return;
                    }
                }
                if (newNode instanceof Comment) {
                    n = node.nextSibling;
                    while (n !== null) {
                        reAppend.push(this.removeChild(n));
                        n = node.nextSibling;
                    }
                    reAppend.unshift(this.removeChild(node));
                    this.appendChild(newNode);
                    for (var i_33 = 0; i_33 < reAppend.length; i_33++) {
                        this.appendChild(reAppend[i_33]);
                    }
                }
                else {
                    insertBefore_1.call(this, newNode, node);
                }
            };
        }
        else {
            Node.prototype.insertBefore2 = insertBefore_1;
        }
    }
    turtleNS.requireHash = {};
    var RequireFile = (function () {
        function RequireFile(file, localGlobal) {
            this.file = file;
            this.localGlobal = localGlobal;
            this.init();
        }
        RequireFile.prototype.injectInvoke = function (letiable) {
            return this.innerInjectInvoke.call(this.localGlobal, letiable);
        };
        RequireFile.prototype.init = function () {
            this.innerInjectInvoke = Function("with(this){" + this.file + ";\n    return function(s){\n        if(s){\n            return eval('('+s+')');\n        }\n    };\n}").call(this.localGlobal);
        };
        return RequireFile;
    }());
    turtleNS.RequireFile = RequireFile;
    function loadJS(path, letiable, localGlobal) {
        if (isArray(path)) {
            var key = path.join(",");
            if (turtleNS.requireHash.hasOwnProperty(key)) {
                return turtleNS.requireHash[key].injectInvoke(letiable);
            }
            else {
                var codes_1 = "";
                for (var i_34 = 0; i_34 < path.length; i_34++) {
                    $t.xhr.get(path[i_34], false, function (s) {
                        codes_1 += "\r\n" + s;
                    });
                }
                var requireFile = turtleNS.requireHash[key] = new RequireFile(codes_1, localGlobal);
                return requireFile.injectInvoke(letiable);
                ;
            }
        }
        else {
            if (turtleNS.requireHash.hasOwnProperty(path)) {
                return turtleNS.requireHash[path].injectInvoke(letiable);
            }
            else {
                var something_1;
                $t.xhr.get(path, false, function (s) {
                    var requireFile = turtleNS.requireHash[path] = new RequireFile(s, localGlobal);
                    something_1 = requireFile.injectInvoke(letiable);
                });
                return something_1;
            }
        }
    }
    turtleNS.loadJS = loadJS;
    function runJS(path, letiable) {
        if (isArray(path)) {
            var key = path.join(",");
            if (turtleNS.requireHash.hasOwnProperty(key)) {
                var requireFile = turtleNS.requireHash[key];
                requireFile.init();
                return requireFile.injectInvoke(letiable);
            }
            else {
                var codes_2 = "";
                for (var i_35 = 0; i_35 < path.length; i_35++) {
                    $t.xhr.get(path[i_35], false, function (s) {
                        codes_2 += "\r\n" + s;
                    });
                }
                var requireFile = turtleNS.requireHash[key] = new RequireFile(codes_2);
                return requireFile.injectInvoke(letiable);
                ;
            }
        }
        else {
            if (turtleNS.requireHash.hasOwnProperty(path)) {
                var requireFile = turtleNS.requireHash[path];
                requireFile.init();
                return requireFile.injectInvoke(letiable);
            }
            else {
                var something_2;
                $t.xhr.get(path, false, function (s) {
                    var requireFile = turtleNS.requireHash[path] = new RequireFile(s);
                    something_2 = requireFile.injectInvoke(letiable);
                });
                return something_2;
            }
        }
    }
    turtleNS.runJS = runJS;
    function runJSNoCache(path, letiable) {
        if (isArray(path)) {
            var codes_3 = "";
            for (var i_36 = 0; i_36 < path.length; i_36++) {
                $t.xhr.get(path[i_36], false, function (s) {
                    codes_3 += "\r\n" + s;
                });
            }
            var requireFile = new RequireFile(codes_3);
            return requireFile.injectInvoke(letiable);
        }
        else {
            var something_3;
            $t.xhr.get(path, false, function (s) {
                var requireFile = turtleNS.requireHash[path] = new RequireFile(s);
                something_3 = requireFile.injectInvoke(letiable);
            });
            return something_3;
        }
    }
    turtleNS.runJSNoCache = runJSNoCache;
    function isBlankObject(value) {
        return value !== null && typeof value === 'object' && !getPrototypeOf(value);
    }
    var locStorage = (function () {
        if (isNodeJS) {
            return undefined;
        }
        else {
            var storage_1 = window.localStorage;
            var i_37 = 0, len_1 = 0;
            function setValue(key, val) {
                try {
                    if (storage_1) {
                        if (!isString(val)) {
                            val = JSON.stringify(val);
                        }
                        storage_1.setItem(key, val);
                    }
                    else {
                    }
                }
                catch (e) {
                    $t.catch(e);
                }
            }
            function setValues(key) {
                if (isPlainObject(key)) {
                    for (var k in key) {
                        if (key.hasOwnPropery(k)) {
                            setValue(k, key[k]);
                        }
                    }
                }
                else if (isArray(key)) {
                    for (i_37 = 0, len_1 = key.length; i_37 < len_1; i_37++) {
                        if (key[i_37]) {
                            setValue.apply(this, key[i_37]);
                        }
                    }
                }
                else {
                    setValue.apply(this, arguments);
                }
            }
            function popValue(key) {
                if (!key) {
                    return;
                }
                try {
                    if (storage_1) {
                        var v = storage_1.getItem(key);
                        storage_1.removeItem(key);
                        return v;
                    }
                }
                catch (e) {
                    $t.catch(e);
                }
            }
            function getValue(key) {
                if (!key) {
                    return;
                }
                try {
                    if (storage_1) {
                        return storage_1.getItem(key);
                    }
                }
                catch (e) {
                    $t.catch(e);
                }
            }
            function getKeys() {
                var res = [];
                var key = '';
                for (var i_38 = 0, len_2 = storage_1.length; i_38 < len_2; i_38++) {
                    key = storage_1.key(i_38);
                    if (key) {
                        res.push(key);
                    }
                }
                return res;
            }
            function clear(key) {
                try {
                    if (key && isString(key)) {
                        storage_1.removeItem(key);
                    }
                    else {
                        storage_1.clear();
                    }
                }
                catch (e) {
                    $t.catch(e);
                }
            }
            function leaveSpace() {
                var space = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(storage_1))).length;
                return space;
            }
            function val(key, value) {
                if (arguments.length === 1) {
                    return getValue(key);
                }
                setValue(key, value);
            }
            function contains(key) {
                return storage_1.hasOwnProperty(key);
            }
            return {
                getVal: getValue,
                setVal: setValues,
                leaveSpace: leaveSpace,
                remove: clear,
                keys: getKeys,
                val: val,
                contains: contains,
                popVal: popValue
            };
        }
    }());
    function Empty() { }
    var _DPI;
    var _a = TurtleFunction.prototype, getStep = _a.getStep, extend = _a.extend, isNumber = _a.isNumber, isString = _a.isString, isFunction = _a.isFunction, isObject = _a.isObject, isFinite = _a.isFinite, isArrayLike = _a.isArrayLike, toArray = _a.toArray, trim = _a.trim, trimLine = _a.trimLine, getAttr = _a.getAttr, takeOutChildNodes = _a.takeOutChildNodes, takeChildNodes = _a.takeChildNodes, cloneBetween = _a.cloneBetween, takeBlockBetween = _a.takeBlockBetween, removeBlockBetween = _a.removeBlockBetween, execTemplateScript = _a.execTemplateScript, execByScope = _a.execByScope, camelCase = _a.camelCase, onPropertyChange = _a.onPropertyChange, removeItem = _a.removeItem, removeNode = _a.removeNode, nodesToString = _a.nodesToString, getNodeIndex = _a.getNodeIndex, getNodeIndex2 = _a.getNodeIndex2, getUUID = _a.getUUID, appendNodes = _a.appendNodes, insertNodesBefore = _a.insertNodesBefore, replaceNodeByNode = _a.replaceNodeByNode, replaceNodeByNodes = _a.replaceNodeByNodes, forEach = _a.forEach;
    TurtleFunction.prototype.ReadyObject = ReadyObject;
    var dateFormat = TurtleFunction.prototype.dateFormat = (function () {
        return function (format, d) {
            'use strict';
            var o = {
                "M+": d.getMonth() + 1,
                "d+": d.getDate(),
                "h+": d.getHours(),
                "m+": d.getMinutes(),
                "s+": d.getSeconds(),
                "q+": Math.floor((d.getMonth() + 3) / 3),
                "S": d.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    var s = RegExp.$1.length == 1 ? o[k].toString() : ("00" + o[k]).substr(("" + o[k]).length);
                    format = format.replace(RegExp.$1, s);
                }
            }
            return format;
        };
    })();
    var log = TurtleFunction.prototype.log = Function('console.log.apply(console,arguments)');
    var bp = TurtleFunction.prototype.bp = Function('debugger');
    var ViewWatchCallBackGroup = (function () {
        function ViewWatchCallBackGroup(viewWatch, target, fn) {
            this.viewWatch = viewWatch;
            this.target = target;
            this.fn = [];
            this.fn.push(fn);
        }
        return ViewWatchCallBackGroup;
    }());
    turtleNS.ViewWatchCallBackGroup = ViewWatchCallBackGroup;
    var ViewWatch = (function () {
        function ViewWatch(elemScroll) {
            this.elemScroll = elemScroll;
            this.onceItems = [];
        }
        ViewWatch.prototype.on = function (elem, fn) {
            var idx = ViewWatch.indexOfTarget(this.onceItems, elem);
            if (idx !== -1) {
                fn();
                return;
            }
            var items = ViewWatch.viewWatchs;
            idx = ViewWatch.indexOfTarget(items, elem);
            var item;
            if (idx !== -1) {
                item = items[idx];
                item.fn.push(fn);
            }
            else {
                item = new ViewWatchCallBackGroup(this, elem, fn);
                items.push(item);
            }
            if (item.fn.length === 1) {
                if (items.length === 1) {
                    var scroll_1 = ViewWatch.getScroll(this);
                    addEventListener('scroll', scroll_1);
                    scroll_1();
                }
            }
        };
        ViewWatch.getScroll = function (watch) {
            var scroll = function () {
                var t = watch.elemScroll.scrollTop;
                var b = t + watch.elemScroll.clientHeight;
                var l = watch.elemScroll.scrollLeft;
                var r = l + watch.elemScroll.clientWidth;
                var items = ViewWatch.viewWatchs;
                for (var i_39 = 0; i_39 < items.length; i_39++) {
                    var elem = items[i_39].target;
                    var t2 = 0, l2 = 0;
                    while (elem !== watch.elemScroll && elem !== null) {
                        t2 += elem.offsetTop;
                        l2 += elem.offsetLeft;
                        elem = elem.offsetParent;
                    }
                    if (l2 >= l && l2 < r && t2 >= t && t2 <= b) {
                        var fns = items[i_39].fn;
                        var len = fns.length;
                        for (var j = 0; j < len; j++) {
                            fns.pop()();
                        }
                        items.splice(i_39, 1);
                        i_39--;
                    }
                }
                if (items.length === 0) {
                    removeEventListener('scroll', scroll);
                }
            };
            return scroll;
        };
        ViewWatch.get = function (elemScroll) {
            var idx = ViewWatch.indexOfTarget(ViewWatch.viewWatchs, elemScroll);
            if (idx === -1) {
                return new ViewWatch(elemScroll);
            }
            else {
                return ViewWatch.viewWatchs[idx].viewWatch;
            }
        };
        ViewWatch.indexOfTarget = function (watches, o) {
            for (var i_40 = 0; i_40 < watches.length; i_40++) {
                if (watches[i_40].target === o) {
                    return i_40;
                }
            }
            return -1;
        };
        return ViewWatch;
    }());
    ViewWatch.viewWatchs = [];
    turtleNS.ViewWatch = ViewWatch;
    TurtleFunction.prototype.dasherize = (function () {
        function _rpl(s, s1, s2) {
            return s1.toLowerCase() + '-' + s2.toLowerCase();
        }
        return function (str) { return str.replace(/::/g, '/').replace(/([a-z\d])([A-Z])/g, _rpl).replace(/([A-Z]+)([A-Z][a-z])/g, _rpl); };
    }());
    TurtleFunction.prototype.encodeHTML = (function () {
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
    TurtleFunction.prototype.decodeHTML = (function () {
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
    var isArray = Array.isArray || TurtleFunction.prototype.isArray;
    function getKeyArray(obj) {
        var arr = [];
        forEach(obj, function (v, key) {
            arr.push(key);
        }, this, false);
        return arr;
    }
    function _resetDescriptor(obj, descriptor) {
        var desc;
        for (var e in obj) {
            desc = Object.getOwnPropertyDescriptor(obj, e);
            if (!desc)
                return;
            if (desc.configurable === false) {
                throwError('重置' + name + '失败：configurable==false');
                return;
            }
            if (desc.writable === false) {
                throwError('重置' + name + '失败：writable==false');
                return;
            }
            if (desc.hasOwnProperty("value")) {
                descriptor.value = desc.value;
            }
            else {
                if (desc.hasOwnProperty("get")) {
                    descriptor.get = desc.get;
                }
                if (desc.hasOwnProperty("set")) {
                    descriptor.set = desc.set;
                }
            }
            Object.defineProperty(obj, e, descriptor);
        }
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
        for (var i_41 in bindInfoHash) {
            if (bindInfoHash[i_41].name === name && bindInfoHash[i_41].targetName === targetName) {
                if (bindInfoHash.length == 1) {
                    bindInfoHash.length = 0;
                    delete obj.__bind__;
                }
                else {
                    bindInfoHash.splice(i_41, 1);
                }
                return true;
            }
        }
        return false;
    }
    function bindPropertyByName(obj, name, obj2, name2) {
        var t = function (name) {
            if (!t.isBinding) {
                t.isBinding = true;
                for (var i_42 = 0; i_42 < t.list.length; i_42++) {
                    var obj_1 = t.list[i_42];
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
    var _toString = {}.toString;
    function isWindow(obj) { return obj != null && obj == obj.window; }
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    function insertNode(node, childNode) {
        var parent = node.parentNode;
        if (parent == null)
            return 0;
        parent.insertBefore2(childNode, node);
        return 0;
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
    var _includeTask = null;
    function setIncludeTaskDone(task, fn) {
        _includeTask = task.parent;
        if (_includeTask)
            _includeTask.child = null;
        task.child = null;
        if (isFunction(fn))
            fn();
    }
    var IncludeTask = (function () {
        function IncludeTask(creater, parentTask, files, fn) {
            var _this = this;
            this.files = [];
            this.child = null;
            this.count = 0;
            this.parent = parentTask;
            if (this.parent) {
                this.parent.child = this;
            }
            this.isallload = false;
            this.onallload = function () {
                _this.isallload = true;
                if (_this.child == null) {
                    setIncludeTaskDone(_this, fn);
                }
                else if (_this.child.isallload) {
                    setIncludeTaskDone(_this, fn);
                }
                if (_this.parent != null) {
                    _this.parent.onchildallload();
                }
            };
            this.onchildallload = function () {
                if (this.isallload) {
                    setIncludeTaskDone(this, fn);
                }
            };
            if (isArray(files)) {
                for (var i_43 in files) {
                    var url = files[i_43];
                    if (isString(url) && !(url in IncludeTask.jsScript)) {
                        this.files.push(url);
                        IncludeTask.jsScript[url] = creater("script");
                    }
                }
            }
            else if (files) {
                var url = files;
                if (isString(url) && !(url in IncludeTask.jsScript)) {
                    this.files.push(url);
                    IncludeTask.jsScript[url] = creater("script");
                }
            }
        }
        return IncludeTask;
    }());
    IncludeTask.jsScript = newHashObject('JSHash');
    turtleNS.IncludeTask = IncludeTask;
    function newObject(type, prototype) {
        var s = 'var ' + type + '=function(){};';
        if (isObject(prototype)) {
            s += type + '.prototype=proto;';
        }
        s += 'return new ' + type + '();';
        return Function('proto', s)(prototype);
    }
    function newHashObject(type) {
        return newObject(type, newHashObject.prototype);
    }
    newHashObject.prototype = {
        clean: function () {
            for (var i_44 in this) {
                delete this[i_44];
            }
        }
    };
    var onlink = '\\"onlink';
    var UILink = (function () {
        function UILink() {
            this.uiLinks = {};
        }
        UILink.pushToLinks = function (uuid, v, uiLinks) {
            var arr;
            if (!uiLinks.hasOwnProperty(uuid)) {
                arr = [];
                uiLinks[uuid] = arr;
            }
            else {
                arr = uiLinks[uuid];
            }
            arr.push(v);
        };
        ;
        UILink.prototype.on = function (o) {
            var uuid;
            if (isString(o))
                uuid = o;
            else if (o.uiLinkUUID)
                uuid = o.uiLinkUUID;
            else
                return;
            var uiLinks = this.uiLinks[uuid];
            var arg = slice.call(arguments, 1);
            for (var i_45 = 0; i_45 < uiLinks.length; i_45++) {
                uiLinks[i_45].apply(this, arg);
            }
        };
        UILink.prototype.create = function (node, fn) {
            node[onlink] = fn;
        };
        UILink.prototype.appendByTree = function (nod) {
            var uuid = '\\"' + getUUID(8);
            var uiLinks = this.uiLinks;
            treeEach(nod.childNodes, 'childNodes', function (node) {
                if (node.nodeType == 8 && isFunction(node[onlink])) {
                    UILink.pushToLinks(uuid, node[onlink], uiLinks);
                    if (!nod.uiLinkUUID)
                        nod.uiLinkUUID = uuid;
                }
            });
        };
        UILink.prototype.appendByName = function (name, fn) {
            var uuid = '\\"' + name;
            UILink.pushToLinks(uuid, fn, this.uiLinks);
            return uuid;
        };
        return UILink;
    }());
    turtleNS.UILink = UILink;
    var Store = (function () {
        function Store() {
        }
        Store.take = function (store, name) {
            if (store.hasOwnProperty(name)) {
                var ret = store[name];
                delete store[name];
                if (ret.childNodes.length > 1) {
                    return ret.childNodes;
                }
                else {
                    return ret.childNodes[0];
                }
            }
        };
        Store.takeElem = function (store, name) {
            if (store.hasOwnProperty(name)) {
                var ret = store[name];
                delete store[name];
                if (ret.children.length > 1) {
                    return ret.children;
                }
                else {
                    return ret.children[0];
                }
            }
        };
        return Store;
    }());
    turtleNS.Store = Store;
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
                    else if (xhr.status === 404) {
                        throwError("404:" + url);
                        return;
                    }
                }
            };
            type == 'POST' && xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (fnerror) {
                xhr.onerror = fnerror;
            }
            else {
                delete xhr.onerror;
            }
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
    turtleNS.XHR = XHR;
    var Resource = (function () {
        function Resource() {
            this.__defineCallbacks__ = [];
        }
        Resource.prototype.emitOnDefine = function (name, tp) {
            var cbs = this.__defineCallbacks__;
            for (var i_46 = 0; i_46 < cbs.length; i_46++) {
                if (cbs[i_46].name === name || cbs[i_46].name === "*") {
                    cbs[i_46].fn(tp);
                }
            }
        };
        return Resource;
    }());
    turtleNS.Resource = Resource;
    var UI = (function (_super) {
        __extends(UI, _super);
        function UI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.list = {};
            return _this;
        }
        UI.prototype.onDefine = function (name, fn) {
            if (!isFunction(fn)) {
                return;
            }
            if (!isString(name)) {
                return;
            }
            if (name.length === 0) {
                return;
            }
            this.__defineCallbacks__.push({ name: name, fn: fn });
            if (this.list.hasOwnProperty(name)) {
                fn(this.list[name]);
            }
        };
        UI.prototype.toString = function () {
            var list = [];
            for (var i_47 in this.list) {
                list.push(i_47);
            }
            return list.join('\r\n');
        };
        UI.prototype.define = function (name, sortPath, path, s, ext) {
            this.list[name] = new UITemplate(name, sortPath, path, s, ext);
            this.emitOnDefine(name, this.list[name]);
            return this.list[name];
        };
        return UI;
    }(Resource));
    turtleNS.UI = UI;
    var Service = (function (_super) {
        __extends(Service, _super);
        function Service(fns) {
            var _this = _super.call(this) || this;
            if (isObject(fns)) {
                for (var i_48 in fns) {
                    _this[i_48] = fns[i_48];
                    _this.emitOnDefine(i_48, _this[i_48]);
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
                this.catch(e, name, s);
            }
            this.emitOnDefine(name, this[name]);
        };
        Service.prototype.toDefineString = function () {
            var s = 'new $t.Service(';
            var fns = [];
            for (var i_49 in this) {
                switch (i_49) {
                    case '__defineCallbacks__':
                        continue;
                }
                if (this.hasOwnProperty(i_49)) {
                    fns.push('"' + i_49 + '":' + this[i_49].toString());
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
    }(Resource));
    turtleNS.Service = Service;
    function execOnScript(node) {
        var p = node.parentNode;
        if (p) {
            var script = node.innerHTML;
            if (script.length > 0) {
                var events = exec('({' + script + '})');
                for (var i_50 in events) {
                    if (isFunction(events[i_50])) {
                        p.addEventListener(i_50, events[i_50]);
                    }
                }
            }
        }
    }
    function getScopeBy(scope, node) {
        if (!scope)
            return $t.uiScope.get(node);
        else
            return scope;
    }
    function execScope(s, node, outerChildNodes, outerElement, props, pPart) {
        execByScope(node, '$t.extend(this,{' + s + '});', null, outerChildNodes, outerElement, props, pPart);
    }
    function splitByCount(s, split, count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            var index = s.indexOf(split);
            if (index != -1) {
                arr.push(s.substring(0, index));
                s = s.substring(index + split.length, s.length);
            }
            else {
                arr.push(s);
                s = "";
            }
        }
        arr.push(s);
        return arr;
    }
    function splitByOnce(s, split) {
        return splitByCount(s, split, 1);
    }
    function throwError(err) {
        try {
            throw new Error('turtle:\n' + err);
        }
        catch (e) {
            $t.catch(e);
        }
    }
    turtleNS.throwError = throwError;
    var getCommentText;
    if (!isNodeJS && Comment.prototype.hasOwnProperty("text")) {
        getCommentText = function (node) {
            var s = node.text;
            if (/^<!--([\s\S]*?)-->$/.test(s)) {
                return s.substring(4, s.length - 3);
            }
            else if (/^<!([\s\S]*?)>$/.test(s)) {
                return s.substring(2, s.length - 1);
            }
            return node.text.replace(/^!-?|-?&/, '');
        };
    }
    else {
        getCommentText = function (node) {
            return node.data;
        };
    }
    var orderRE = /^\s?(if|while|for|switch|async|break|-|scope|content|elements|bind|!|var|=)(\s|$)/g;
    var exclamationMarkRE = /\!$/;
    function getCondition(s) {
        if (exclamationMarkRE.test(s)) {
            return s.substring(0, s.length - 1);
        }
        return s;
    }
    function getCommentStringInfo(s) {
        var matchArray = s.match(orderRE);
        if (matchArray) {
            var order = matchArray[0];
            var trimOrder = trim(order);
            if (trimOrder in EOrder) {
                var condition = getCondition(s.substring(order.length, s.length));
                return {
                    order: trimOrder,
                    condition: condition
                };
            }
        }
        else {
            var matchArray_1 = s.match(orderCaseRE);
            if (matchArray_1) {
                var orderCase = matchArray_1[0];
                var trimOrderCase = trim(orderCase);
                if (trimOrderCase in EOrderCase) {
                    var condition = getCondition(s.substring(orderCase.length, s.length));
                    return {
                        orderCase: trimOrderCase,
                        condition: condition
                    };
                }
            }
        }
    }
    var orderStack = [];
    function isComment(node) {
        return node.nodeType === 8;
    }
    function deepClone(node) {
        var n = node.cloneNode();
        var ns = node.childNodes;
        for (var i_51 = 0; i_51 < ns.length; i_51++) {
            n.appendChild(deepClone(ns[i_51]));
        }
        return n;
    }
    function pref(node, pPart, refName) {
        if (pPart && refName) {
            var refNameArr = refName.split(',');
            for (var i_52 = 0; i_52 < refNameArr.length; i_52++) {
                pPart['$' + refNameArr[i_52]] = node;
            }
        }
    }
    function replaceElementByLink(linkName, node) {
        if ($t.store.hasOwnProperty(linkName)) {
            var nodes = slice.call($t.store[linkName].childNodes);
            replaceNodeByNodes(node, nodes);
        }
        else {
            removeNode(node);
        }
    }
    function getObjectValue(obj, lets) {
        for (var i_53 in lets) {
            if (lets[i_53] in obj) {
                obj = obj[lets[i_53]];
            }
            else {
                return null;
            }
        }
        return obj;
    }
    function execValueByScope(node, s, v, scope, outer, outerElement, props, pPart) {
        return _execValueByScope.call(getScopeBy(scope, node), s, v, node, outer, outerElement, props, pPart);
    }
    function execNodeQuestion(node, outerChildNodes, outerElement, props, pPart) {
        var v = takeAttr(node, ':');
        if (v.length > 0) {
            execByScope(node, v, null, outerChildNodes, outerElement, props, pPart);
        }
    }
    var UIParam = (function () {
        function UIParam(name, hasDefault, filter, filterParam, defaultValue, limitValue) {
            this.name = name;
            this.hasDefault = hasDefault;
            this.filter = filter;
            this.filterParam = filterParam;
            this.defaultValue = defaultValue;
            this.limitValue = limitValue;
        }
        return UIParam;
    }());
    turtleNS.UIParam = UIParam;
    var UITemplate = (function () {
        function UITemplate(name, sortPath, path, d, ext) {
            var _this = this;
            this.name = name;
            this.sortPath = sortPath;
            this.path = path;
            this.parts = [];
            this.partName = name.replace(/[\.]/g, "_");
            this.parts.last = last;
            if (isObject(d)) {
                if (!isArray(d.params)) {
                    this.params = [];
                }
                else {
                    this.params = d.params;
                }
                if (!isArray(d.datas)) {
                    this.datas = [];
                }
                else {
                    this.datas = d.datas;
                }
                if (isObject(d.extends)) {
                    this.extends = d.extends;
                }
                this.isJSDefine = true;
                if (isObject(d.service)) {
                    if (!(d.service instanceof Service)) {
                        this.service = new Service(d.service);
                    }
                    else {
                        this.service = d.service;
                    }
                }
                else {
                    this.service = new Service();
                }
            }
            else {
                this.params = [];
                this.datas = [];
                this.isJSDefine = false;
                this.service = new Service();
                if (ext) {
                    this.extends = ext;
                }
                var start_1 = 0;
                var idx_1 = 0;
                d.replace(memberRE, function (s0, name, s1, dft, s2, s3, limit, s4, s5, s6, filter, filterParam, index, sSource) {
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
                    _this.params.push(new UIParam(name, hasDefault, filter, filterParam, dft, limit));
                    _this.datas.push(sSource.substring(start_1, index));
                    start_1 = index + s0.length;
                    return '';
                });
                this.datas.push(d.substring(start_1, d.length));
            }
        }
        UITemplate.prototype.renderIn = function (elem, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            var uiNode;
            if (!isArray(outerChildNodes)) {
                outerChildNodes = [];
            }
            if (!isArray(outerElement)) {
                outerElement = [];
            }
            uiNode = $t.$$$('ui:render');
            if (elem) {
                elem.appendChild(uiNode);
            }
            return this.render(uiNode, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
        };
        UITemplate.prototype.renderBefore = function (elem, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            var uiNode;
            if (!isArray(outerChildNodes)) {
                outerChildNodes = [];
            }
            if (!isArray(outerElement)) {
                outerElement = [];
            }
            uiNode = $t.$$$('ui:render');
            if (elem && elem.parentNode) {
                elem.parentNode.insertBefore2(uiNode, elem);
            }
            return this.render(uiNode, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
        };
        UITemplate.prototype.render = function (uiNode, that, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            var ext, attrs, len, html;
            if (!isObject(props)) {
                props = {};
            }
            if (!uiNode) {
                uiNode = $t.$$$('ui:render');
            }
            else {
                $t.setQuestionAtrr(uiNode, outerChildNodes, outerElement, pPart ? pPart.props : props, pPart);
                attrs = uiNode.attributes;
                len = attrs.length;
                for (var i_54 = 0; i_54 < len; i_54++) {
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
                ext = $t.getExtends(reExtends, this.sortPath);
            }
            if (!ext) {
                ext = this.extends;
            }
            if (ext instanceof UITemplate) {
                ext = ext.beExtends(uiNode, that, outerChildNodes, outerElement, props, pPart);
            }
            var part = new Part(this, ext, execTemplateScript(html, that, outerChildNodes, outerElement, props, pPart), outerChildNodes, outerElement, props, partName);
            this.parts.push(part);
            if (uiNode.parentNode !== null) {
                part.insertBefore(uiNode);
                removeNode(uiNode);
            }
            return part;
        };
        UITemplate.prototype.joinDatasByProps = function (props) {
            var err = [];
            var d = slice.call(this.datas);
            for (var i_55 = 0; i_55 < d.length - 1; i_55 += 2) {
                var v = void 0;
                var p = this.params[i_55 / 2];
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
                var filter = p.filter;
                if (filter && filter in paramFilter) {
                    v = paramFilter[filter](v, p.filterParam);
                }
                d.splice(i_55 + 1, 0, v);
            }
            if (err.length > 0) {
                if ($t.config.debugMode == 2) {
                    alert(err.join('\r\n'));
                }
                log(err.join('\r\n'));
                bp();
                return;
            }
            return d.join('');
        };
        UITemplate.prototype.beExtends = function (uiNode, that, outerChildNodes, outerElement, props, pPart) {
            var ext = undefined;
            if (this.extends instanceof UITemplate) {
                ext = this.extends.beExtends(uiNode, that, outerChildNodes, outerElement, props, pPart);
            }
            var html = this.joinDatasByProps(props);
            return new ExtendsPart(this, uiNode, ext, execTemplateScript(html, that, outerChildNodes, outerElement, props, pPart), outerChildNodes, outerElement, props);
        };
        UITemplate.prototype.toDefineString = function () {
            var s = '$t.ui.define("' + this.name + '","' + this.sortPath + '","' + this.path + '",{datas:';
            s += JSON.stringify(this.datas).replace(/<\/script>/g, '</scr"+"ipt>');
            s += ',params:[';
            var params = [];
            var ps = this.params;
            for (var i_56 = 0; i_56 < ps.length; i_56++) {
                var dft = JSON.stringify(ps[i_56].defaultValue);
                var limitValue = JSON.stringify(ps[i_56].limitValue);
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
                params.push('new $t.UIParam("' + ps[i_56].name + '",' + ps[i_56].hasDefault + ',"' + ps[i_56].filter + '","' + ps[i_56].filterParam + '"' + dft + limitValue + ')');
            }
            s += params.join(',');
            s += '],service:' + this.service.toDefineString();
            if (this.extends) {
                s += "" + (",extends:$t.importUIHTML('" + this.extends.name + "','" + this.extends.sortPath + "')");
            }
            s += "});";
            return s;
        };
        UITemplate.prototype.parseParamsHelp = function (p) {
            var params = this.params;
            for (var i_57 = 0; i_57 < params.length; i_57++) {
                if (p.hasOwnProperty(params[i_57].name)) {
                    p[params[i_57].name] |= !params[i_57].hasDefault;
                }
                else {
                    p[params[i_57].name] = !params[i_57].hasDefault;
                }
            }
            if (this.extends) {
                this.extends.parseParamsHelp(p);
            }
        };
        UITemplate.prototype.getParamsHelp = function () {
            var p = {};
            this.parseParamsHelp(p);
            var arr = [];
            for (var i_58 in p) {
                arr.push({ name: i_58, necessary: p[i_58] });
            }
            return arr;
        };
        return UITemplate;
    }());
    turtleNS.UITemplate = UITemplate;
    var BasePart = (function () {
        function BasePart() {
            this.hideElements = [];
            this.isHide = false;
        }
        BasePart.prototype.toString = function () {
            return this.template.partName + ":" + JSON.stringify(this.props);
        };
        BasePart.prototype.runScript = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                var script = runJS(this.template.path + '/' + this.template.name + '.script.js', 'def');
                var run = script.run;
                if (run) {
                    return run.apply(this, args);
                }
            }
            catch (error) {
                throwError(error);
            }
        };
        BasePart.prototype.treeDiagram = function (tabSpace) {
            if (tabSpace === void 0) { tabSpace = 0; }
            var s = "\r\n" + new Array(tabSpace + 1).join(" ") + this.toString();
            var child = this.child;
            for (var i_59 = 0; i_59 < child.length; i_59++) {
                s += child[i_59].treeDiagram(tabSpace + 8);
            }
            return s;
        };
        Object.defineProperty(BasePart.prototype, "elementLength", {
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
        Object.defineProperty(BasePart.prototype, "elements", {
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
                            node = node.nextSibling;
                        }
                        return elements;
                    }
                    catch (e) {
                        $t.catch(e);
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
        Object.defineProperty(BasePart.prototype, "child", {
            get: function () {
                return getParts(this.elements);
            },
            enumerable: true,
            configurable: true
        });
        BasePart.prototype.getParentPart = function (node) {
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
        Object.defineProperty(BasePart.prototype, "parent", {
            get: function () {
                return this.getParentPart(this.begin);
            },
            enumerable: true,
            configurable: true
        });
        BasePart.prototype.getRect = function () {
            if (this.isInsert) {
                var rects = [];
                var rt = void 0;
                var cs = this.elements;
                var elem = void 0;
                var dom = document.documentElement;
                for (var i_60 = 0; i_60 < cs.length; i_60++) {
                    elem = cs[i_60].valueOf();
                    if (elem.nodeType === 1) {
                        var l = 0, t = 0;
                        var elem2 = elem;
                        while (elem2 && elem2 !== dom) {
                            t += elem2.offsetTop;
                            l += elem2.offsetLeft;
                            elem2 = elem2.offsetParent;
                        }
                        rects.push([l, t, elem.offsetWidth, elem.offsetHeight]);
                    }
                }
                var rect = { left: 0x7fffffff, top: 0x7fffffff, width: 0, height: 0, right: 0, bottom: 0 };
                for (var i_61 = 0; i_61 < rects.length; i_61++) {
                    rt = rects[i_61];
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
        BasePart.prototype.emitResize = function () {
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
                for (var i_62 = 0; i_62 < cs.length; i_62++) {
                    cs[i_62].emitResize();
                }
            }
            catch (e) {
                $t.catch(e);
            }
        };
        BasePart.prototype.onSetSize = function (rect) {
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
        BasePart.prototype.setSize = function (rect) {
            if (this.onSetSize) {
                return this.onSetSize(rect);
            }
            if (this.super) {
                this.super.setSize(rect);
            }
        };
        Object.defineProperty(BasePart.prototype, "innerHTML", {
            get: function () {
                return nodesToString(this.elements);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePart.prototype, "elemParent", {
            get: function () {
                return this.begin.parentNode;
            },
            enumerable: true,
            configurable: true
        });
        BasePart.prototype.insertTo = function (elem) {
            if (this.isInsert) {
                var elems = this.elements;
                elems.unshift(this.begin);
                elems.push(this.end);
                var scopeNodes = this.scopeNodes;
                for (var i_63 = 0; i_63 < scopeNodes.length; i_63++) {
                    $t.uiScope.cut(scopeNodes[i_63].scope);
                }
                appendNodes(elems, elem);
                for (var i_64 = 0; i_64 < scopeNodes.length; i_64++) {
                    $t.uiScope.link(scopeNodes[i_64].scope, elem);
                }
                if (isFunction(this.onInsert)) {
                    this.onInsert(elem);
                }
            }
            else {
                appendNodes(this.store, elem);
                var scopeNodes = this.scopeNodes;
                for (var i_65 = 0; i_65 < scopeNodes.length; i_65++) {
                    $t.uiScope.link(scopeNodes[i_65].scope, elem);
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
        BasePart.prototype.insertBefore = function (elem) {
            if (this.isInsert) {
                var elems = this.elements;
                elems.unshift(this.begin);
                elems.push(this.end);
                var scopeNodes = this.scopeNodes;
                for (var i_66 = 0; i_66 < scopeNodes.length; i_66++) {
                    $t.uiScope.cut(scopeNodes[i_66].scope);
                }
                insertNodesBefore(elem, elems);
                for (var i_67 = 0; i_67 < scopeNodes.length; i_67++) {
                    $t.uiScope.link(scopeNodes[i_67].scope, elem);
                }
                if (isFunction(this.onInsert)) {
                    this.onInsert(elem);
                }
            }
            else {
                insertNodesBefore(elem, this.store);
                var scopeNodes = this.scopeNodes;
                for (var i_68 = 0; i_68 < scopeNodes.length; i_68++) {
                    $t.uiScope.link(scopeNodes[i_68].scope, elem);
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
        BasePart.prototype.getSuper = function (name) {
            if (this.super) {
                if (this.super.template.name === name) {
                    return this.super;
                }
                else {
                    return this.super.getSuper(name);
                }
            }
            return null;
        };
        BasePart.prototype.emitInit = function (finalPart) {
            if (this.super) {
                this.super.emitInit(finalPart);
            }
            if (this.hasOwnProperty('onInit') && isFunction(this.onInit)) {
                this.onInit(finalPart);
            }
        };
        BasePart.prototype.hide = function () {
            if (this.isInsert && !this.isHide) {
                this.isHide = true;
                var elems = this.elements;
                this._cutAndRemove(elems);
                this.hideElements = elems;
            }
        };
        BasePart.prototype.show = function () {
            if (this.isInsert && this.isHide) {
                this.isHide = false;
                var elems = this.hideElements;
                this.hideElements = null;
                insertNodesBefore(this.end, elems);
                for (var i_69 = 0; i_69 < this.scopeNodes.length; i_69++) {
                    $t.uiScope.link(this.scopeNodes[i_69].scope, this.end);
                }
            }
        };
        BasePart.prototype._cutAndRemove = function (elems) {
            var scopeNodes = this.scopeNodes;
            for (var i_70 = 0; i_70 < scopeNodes.length; i_70++) {
                $t.uiScope.cut(scopeNodes[i_70].scope);
            }
            var p = this.begin.parentNode;
            if (p !== null) {
                for (var i_71 = 0; i_71 < elems.length; i_71++) {
                    p.removeChild(elems[i_71]);
                }
            }
        };
        BasePart.prototype.remove = function () {
            if (this.isInsert) {
                var elems = void 0;
                if (this.isHide) {
                    this.isHide = false;
                    elems = this.hideElements;
                    this.hideElements = null;
                    elems.unshift(this.begin);
                    elems.push(this.end);
                    this._cutAndRemove([this.begin, this.end]);
                }
                else {
                    elems = this.elements;
                    elems.unshift(this.begin);
                    elems.push(this.end);
                    this._cutAndRemove(elems);
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
        BasePart.prototype.destoryChildren = function () {
            var childrends = this.child;
            for (var _i = 0, childrends_1 = childrends; _i < childrends_1.length; _i++) {
                var child = childrends_1[_i];
                child.destory();
            }
        };
        BasePart.prototype.reinit = function () {
            this.destoryChildren();
            this.clear();
            if (!isFunction(this.init)) {
                this.remove();
                return;
            }
            var holdspace = document.createComment('reInit');
            $t.insertNodeBefore(this.begin, holdspace);
            this.remove();
            this.init();
            this.store.push(this.end);
            this.insertBefore(holdspace);
            holdspace.remove();
        };
        BasePart.prototype.destory = function () {
            this.destoryChildren();
            this.clear();
            this.remove();
            var parts = $t.ui.list[this.template.name].parts;
            var idx = parts.indexOf(this);
            parts.splice(idx, 1);
        };
        BasePart.prototype.clearPart = function () {
            var childrends = this.child;
            for (var _i = 0, childrends_2 = childrends; _i < childrends_2.length; _i++) {
                var child = childrends_2[_i];
                child.clearPart();
            }
            if (this.isInsert) {
                var elems = this.elements;
                var scopeNodes = this.scopeNodes;
                for (var i_72 = 0; i_72 < scopeNodes.length; i_72++) {
                    $t.uiScope.cut(scopeNodes[i_72].scope);
                }
                var p = this.begin.parentNode;
                if (p !== null) {
                    for (var i_73 = 0; i_73 < elems.length; i_73++) {
                        p.removeChild(elems[i_73]);
                    }
                }
                if (isFunction(this.onclear)) {
                    this.onclear();
                }
                this.store = [];
            }
            else {
                this.store = [this.begin, this.end];
            }
        };
        BasePart.prototype.clear = function () {
            this.clearPart();
        };
        Object.defineProperty(BasePart.prototype, "scopeNodes", {
            get: function () {
                var scopeNodes = [];
                treeEach(this.elements, "children", function (node) {
                    if (node.hasOwnProperty("scope")) {
                        scopeNodes.push(node);
                        return 4;
                    }
                });
                return scopeNodes;
            },
            enumerable: true,
            configurable: true
        });
        return BasePart;
    }());
    turtleNS.BasePart = BasePart;
    var ExtendsPart = (function () {
        function ExtendsPart(template, node, extPart, s, outerChildNodes, outerElement, props) {
            if (extPart) {
                this.__proto__ = extPart;
            }
            else {
                this.__proto__ = ExtendsPartPrototype;
            }
            var t = this;
            var dom = $t.$DOM(s);
            t.template = template;
            t.super = extPart;
            t.isExtend = true;
            t._extPart = extPart;
            var nodes = dom.childNodes;
            t.$ = new Service(template.service);
            $t.initHTML(nodes, outerChildNodes, outerElement, props, t);
            t.store = [];
            for (var i_74 = nodes.length; i_74 > 0; i_74--) {
                t.store.push(dom.removeChild(nodes[0]));
            }
            return t;
        }
        ExtendsPart.prototype.to = function (part) {
            var proto = part.$.__proto__;
            this.$.__proto__ = proto;
            part.$.__proto__ = this.$;
            if (this._extPart) {
                this._extPart.to(part);
            }
            push.apply(part.store, this.store);
        };
        return ExtendsPart;
    }());
    turtleNS.ExtendsPart = ExtendsPart;
    function extendCoverGetSet(elem, elemEx) {
        var that = {};
        for (var e1 in elem) {
            Object.defineProperty(that, e1, Object.getOwnPropertyDescriptor(elem, e1));
        }
        for (var e2 in elemEx) {
            Object.defineProperty(that, e2, Object.getOwnPropertyDescriptor(elemEx, e2));
        }
        return that;
    }
    var ExtendsPartPrototype = extendCoverGetSet(BasePart.prototype, ExtendsPart.prototype);
    var Part = (function () {
        function Part(template, extPart, s, outerChildNodes, outerElement, props, partName) {
            if (extPart) {
                this.__proto__ = extPart;
            }
            else {
                this.__proto__ = BasePart.prototype;
            }
            var t = this;
            if (partName) {
                KeyArrayObject.push($t.parts, partName, t);
            }
            var name = template.name;
            var dom = $t.$DOM(s);
            var begin = t.begin = $t.$$$(name, 8);
            var end = t.end = $t.$$$('/' + name, 8);
            end.part = begin.part = t;
            begin.sign = 1;
            end.sign = 0;
            t.props = props;
            t.template = template;
            t.super = extPart;
            t.isExtend = false;
            var sp = t;
            while (sp.super) {
                sp = sp.super;
            }
            t.basePart = sp ? sp : t;
            t.basePart.isInsert = false;
            t.$ = new Service(template.service);
            t.store = [];
            var nodes = dom.childNodes;
            $t.initHTML(nodes, outerChildNodes, outerElement, props, t);
            if (extPart) {
                extPart.to(t);
            }
            t.store.push.apply(t.store, nodes);
            for (var i_75 = nodes.length; i_75 > 0; i_75--) {
                dom.removeChild(nodes[0]);
            }
            t.store.unshift(begin);
            t.store.push(end);
            t.emitInit(t);
            return t;
        }
        return Part;
    }());
    turtleNS.Part = Part;
    var emitResize = function () {
        var parts = RootParts();
        for (var i_76 = 0; i_76 < parts.length; i_76++) {
            parts[i_76].emitResize();
        }
    };
    var onResize = function (fn) {
        $t.bindFunction($client, 'onResize', getStep(function (v) {
            fn(v);
        }, 2));
    };
    function RootParts() {
        var t = getParts(document.body.childNodes);
        Object.defineProperty(t, "treeDiagram", {
            get: function () {
                var tabSpace = 0;
                var s = "";
                for (var i_77 = 0; i_77 < t.length; i_77++) {
                    s += t[i_77].treeDiagram(tabSpace + 2);
                }
                return s;
            }
        });
        return t;
    }
    function getParts(childNodes) {
        var child = [];
        var cpn = null;
        treeEach(childNodes, "childNodes", function (node) {
            if (node.nodeType === 8 && node.part) {
                if (cpn !== null) {
                    if (node.part === cpn && node.sign === 0) {
                        child.push(node.part);
                        cpn = null;
                    }
                }
                else {
                    cpn = node.part;
                }
                return;
            }
            if (cpn !== null) {
                return 4;
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
    function parseUI(node, uiInfo, step, part) {
        var ui = $t.importUIHTML(uiInfo.name, uiInfo.sortPath);
        if (!ui) {
            removeNode(node);
            throwError(uiInfo.name + '组件不存在！');
            return;
        }
        var partName = takeAttr(node, 'p-name');
        var reExtends = takeAttr(node, 're-extends');
        var outerChildNodes = slice.call(node.childNodes);
        var outerElement = slice.call(node.children);
        for (var i_78 = node.childNodes.length; i_78 > 0; i_78--) {
            node.removeChild(node.childNodes[0]);
        }
        var cpn = ui.render(node, node.parentNode, outerChildNodes, outerElement, undefined, part, partName, reExtends);
        if (cpn) {
            step.next = cpn.elementLength;
        }
    }
    var ParamFilter = (function () {
        function ParamFilter() {
        }
        ParamFilter.prototype.bool = function (v) {
            return $t.parseBool(v);
        };
        ParamFilter.prototype.intmin = function (v, p) {
            v = parseInt(v);
            p = parseInt(p);
            if (v < p || isNaN(v)) {
                v = p;
            }
            return v;
        };
        ParamFilter.prototype.string = function (v) {
            return '"' + v + '"';
        };
        ParamFilter.prototype.floatmin = function (v, p) {
            v = parseFloat(v);
            p = parseFloat(p);
            if (v < p || isNaN(v)) {
                v = p;
            }
            return v;
        };
        ParamFilter.prototype.int = function (v) {
            return parseInt(v);
        };
        ParamFilter.prototype.float = function (v) {
            return parseFloat(v);
        };
        ParamFilter.prototype.pxtoem = function (v, p) {
            p = parseFloat(p);
            if (isNaN(p)) {
                p = 0;
            }
            return (parseFloat(v) / 16 + p) + 'em';
        };
        ParamFilter.prototype.color = function (v) {
            if (/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/.test(v)) {
                return v;
            }
            else {
                return 'transparent';
            }
        };
        ParamFilter.prototype.date = function (v, p) {
            var d = new Date(v);
            if (d.toDateString() === 'Invalid Date') {
                d = new Date();
            }
            return dateFormat(p, d);
        };
        ParamFilter.prototype.only = function (v, p) {
            if (p.indexOf(';') === -1) {
                return v;
            }
            var arr = p.split(';');
            var datas = arr[0].split(',');
            var filter;
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
        ParamFilter.prototype.udftotrue = function (v) {
            return v === undefined ? true : v;
        };
        ParamFilter.prototype.anytotrue = function (v) {
            return v !== undefined ? true : v;
        };
        ParamFilter.prototype.udftofalse = function (v) {
            return v === undefined ? false : v;
        };
        ParamFilter.prototype.anytofalse = function (v) {
            return v !== undefined ? false : v;
        };
        ParamFilter.prototype.udftonull = function (v) {
            return v === undefined ? null : v;
        };
        ParamFilter.prototype.anytonull = function (v) {
            return v !== undefined ? null : v;
        };
        ParamFilter.prototype.udftoemptystr = function (v) {
            return v === undefined ? "" : v;
        };
        ParamFilter.prototype.anytoemptystr = function (v) {
            return v !== undefined ? "" : v;
        };
        return ParamFilter;
    }());
    turtleNS.ParamFilter = ParamFilter;
    var paramFilter = new ParamFilter;
    var Templates = (function () {
        function Templates() {
            this.XMP = {};
            this.TEMPLATE = {};
            this.TITLE = { getData: function (node) { return node.innerText; } };
            this.STYLE = { xmp: undefined };
            this.SCRIPT = { xmp: undefined };
            this.TEXTAREA = { xmp: undefined, getData: function (node) { return node.defaultValue; } };
        }
        Templates.prototype.toString = function () {
            var s = [];
            var desc;
            for (var i_79 in this) {
                if (!this.hasOwnProperty(i_79)) {
                    continue;
                }
                desc = '<' + i_79.toLowerCase();
                if (this[i_79].hasOwnProperty("xmp")) {
                    desc += ' xmp';
                }
                desc += '>';
                s.push(desc);
            }
            return s.join("\n");
        };
        Templates.getItems = function (t) {
            var items = [];
            for (var i_80 in t) {
                if (!t.hasOwnProperty(i_80)) {
                    continue;
                }
                var item = { name: i_80.toLowerCase() };
                items.push(extend(item, t[i_80]));
            }
            return items;
        };
        Templates.findByString = function (t, str) {
            if (str.length === 0) {
                return;
            }
            var ts = Templates.getItems(t);
            var regExes = [];
            for (var i_81 = 0; i_81 < ts.length; i_81++) {
                var s = '(<' + ts[i_81].name;
                if (ts[i_81].hasOwnProperty('xmp')) {
                    s += '[\\s\\S]*? +xmp';
                }
                s += '([\\s\\S]*?)>([\\s\\S]*?)<\\/' + ts[i_81].name + '>';
                s += ')';
                regExes.push(s);
            }
            var re = exec('(/' + regExes.join("|") + '/g)');
            return str.match(re);
        };
        return Templates;
    }());
    turtleNS.Templates = Templates;
    var templates = new Templates;
    var Scope = (function () {
        function Scope(node, __parent__, __name__) {
            this.__parent__ = __parent__;
            this.__name__ = __name__;
            this.__children__ = [];
            this.__commentNode__ = node;
            this.__actionNode__ = node.parentNode;
            this.__proto__ = __parent__;
            node.parentNode.scope = this;
            __parent__.__children__.push(this);
            if (__name__) {
                __parent__[__name__] = this;
            }
        }
        return Scope;
    }());
    turtleNS.Scope = Scope;
    var Client = (function () {
        function Client() {
            var data = {};
            var isListen = false;
            var events = [];
            var t = this;
            function emit() {
                'use strict';
                for (var i_82 = 0; i_82 < events.length; i_82++) {
                    events[i_82]();
                }
            }
            function setSizeProperty(name, fn) {
                'use strict';
                data[name] = undefined;
                t[name] = function (v) {
                    'use strict';
                    if (data[name] === undefined && t.__bind__) {
                        if (isListen === false) {
                            isListen = true;
                            addEventListener('resize', emit);
                        }
                        var getV = function () {
                            t[name] = fn();
                        };
                        data[name] = fn();
                        events.push(getV);
                    }
                    if (v) {
                        data[name] = v;
                    }
                    return data[name];
                };
            }
            setSizeProperty('onResize', function () {
                'use strict';
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                };
            });
            setSizeProperty('width', function () {
                'use strict';
                return document.documentElement.clientWidth;
            });
            setSizeProperty('height', function () {
                'use strict';
                return document.documentElement.clientHeight;
            });
            setSizeProperty('left', function () {
                'use strict';
                return document.documentElement.clientLeft;
            });
            setSizeProperty('top', function () {
                'use strict';
                return document.documentElement.clientTop;
            });
            setSizeProperty('right', function () {
                'use strict';
                return document.documentElement.clientLeft + document.documentElement.clientWidth;
            });
            setSizeProperty('bottom', function () {
                'use strict';
                return document.documentElement.clientTop + document.documentElement.clientHeight;
            });
        }
        return Client;
    }());
    turtleNS.Client = Client;
    var RootScope = (function () {
        function RootScope() {
            this.__children__ = [];
            if (isNodeJS) {
                this.__actionNode__ = { scope: this };
            }
            else {
                document.scope = this;
                this.__actionNode__ = document.documentElement;
            }
        }
        return RootScope;
    }());
    turtleNS.RootScope = RootScope;
    var UIScope = (function () {
        function UIScope() {
            this.stack = [$rootScope];
        }
        UIScope.prototype.create = function (node, name) {
            var scope = this.get(node);
            if (node.parentNode !== scope.__actionNode__) {
                scope = new Scope(node, scope, name);
                this.stack.push(scope);
            }
            else {
                throwError('当前层不允许重复定义scope:' + name);
                return;
            }
            return scope;
        };
        UIScope.prototype.get = function (node) {
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
        UIScope.prototype.cut = function (scope) {
            var p = scope.__parent__;
            scope.__parent__ = null;
            removeItem(p.__children__, scope);
            delete p[scope.name];
        };
        UIScope.prototype.link = function (scope, node) {
            var p = $t.uiScope.get(node);
            if (!p) {
                return;
            }
            scope.__parent__ = p;
            p.__children__.push(scope);
            if (scope.__name__) {
                p[scope.__name__] = scope;
            }
        };
        return UIScope;
    }());
    turtleNS.UIScope = UIScope;
    var NullValueHash = (function () {
        function NullValueHash(s) {
            var arr = s.split(',');
            for (var i_83 in arr) {
                this[arr[i_83]] = null;
            }
        }
        return NullValueHash;
    }());
    turtleNS.NullValueHash = NullValueHash;
    var KeyArrayObject = (function () {
        function KeyArrayObject() {
        }
        KeyArrayObject.push = function (that, key, node) {
            if (isArray(key)) {
                for (var i_84 = 0; i_84 < key.length; i_84++) {
                    if (!that.hasOwnProperty(key[i_84])) {
                        var lst = that[key[i_84]] = [];
                        lst.last = last;
                    }
                    that[key[i_84]].push(node);
                }
            }
            else {
                if (!that.hasOwnProperty(key)) {
                    var lst = that[key] = [];
                    lst.last = last;
                }
                that[key].push(node);
            }
        };
        KeyArrayObject.clear = function (that) {
            forEach(that, function (data, key, obj) {
                delete obj[key];
            }, that, false);
        };
        KeyArrayObject.getKeyArray = function (that) {
            return getKeyArray(that);
        };
        KeyArrayObject.pop = function (that, key) {
            var keyObject = that[key];
            if (keyObject) {
                return keyObject.pop();
            }
        };
        return KeyArrayObject;
    }());
    turtleNS.KeyArrayObject = KeyArrayObject;
    var Config = (function () {
        function Config() {
            this.baseUIPath = baseUIPath;
            this.baseServicePath = 'service';
            this.debugMode = 2;
        }
        return Config;
    }());
    turtleNS.Config = Config;
    var Turtle = (function (_super) {
        __extends(Turtle, _super);
        function Turtle() {
            var _this = _super.call(this) || this;
            _this.KeyArrayObject = KeyArrayObject;
            _this.Store = Store;
            _this.NullValueHash = NullValueHash;
            _this.fn = TurtleFunction.prototype;
            _this.exec = eval;
            _this.elementParser = ElementParser.createSingleton(_this);
            _this.attributeParserBefore = new AttributeParserBeforeUIParser(_this);
            _this.attributeParser = AttributeParser.createSingleton(_this);
            _this.config = new Config();
            _this.event = { onerror: function (e) { log(e); bp(); alert(e); } };
            _this.ui = new UI();
            _this.styleClasses = new KeyArrayObject();
            _this.refs = new KeyArrayObject();
            _this.parts = new KeyArrayObject();
            _this.clsNode = [];
            _this.store = new Store();
            _this.service = new Service();
            _this.uiTeam = new UITeam();
            _this.uiLink = new UILink();
            _this.uiScope = new UIScope();
            _this.xhr = new XHR();
            _this.readyByRenderDocument = new ReadyObject();
            _this.turtleScriptElement = null;
            _this.Service = Service;
            _this.UIParam = UIParam;
            _this.EventEmitter = EventEmitter;
            _this.require = loadJS;
            _this.runJS = runJS;
            _this.runJSNoCache = runJSNoCache;
            _this.isIE = isIE;
            _this.templates = templates;
            _this.url = "";
            _this.paramFilter = paramFilter;
            _this.locStorage = locStorage;
            _this.throwError = throwError;
            _this.onResize = onResize;
            _this.emitResize = emitResize;
            _this.Templates = Templates;
            if (isNodeJS) {
                global.$t = _this;
            }
            var scriptNode = null;
            var scripts = document.scripts;
            var load = null;
            var script = "";
            var baseuipath = null;
            var jsUIPath = null;
            if (scripts.length > 0) {
                scriptNode = _this.turtleScriptElement = document.scripts[document.scripts.length - 1];
                load = getAttr(scriptNode, 'load', null);
                script = scriptNode.innerHTML;
                baseuipath = getAttr(scriptNode, 'baseuipath', null);
                jsUIPath = getAttr(scriptNode, 'jsuipath', null);
            }
            if (baseuipath) {
                baseUIPath.push(baseuipath.split(";"));
            }
            else {
                baseUIPath.push('{path:"ui",name:"ui"}');
            }
            if (jsUIPath) {
                var jsUIPaths = jsUIPath.split(',');
                if (jsUIPaths.length > 0) {
                    push.apply(baseUIPath.jsUIPath, jsUIPaths);
                }
            }
            var resume = function () {
                _this.renderDocument();
                _this.readyByRenderDocument.isReady = true;
                emitResize();
            };
            if (load) {
                var loads_1 = load.split(",");
                var i_85 = 0;
                var fnLoad_1 = function () {
                    i_85++;
                    if (i_85 < loads_1.length) {
                        _this.includeJSFiles(loads_1[i_85], fnLoad_1);
                    }
                    else {
                        _this.ready(resume);
                    }
                };
                _this.includeJSFiles(loads_1[0], fnLoad_1);
            }
            else {
                _this.ready(resume);
            }
            if (script.length > 0) {
                _this.execScriptString(script, '', null);
            }
            return _this;
        }
        Turtle.prototype.defineUIByNode = function (node) {
            var name = getAttr(node, 'ui');
            var ext = this.getExtendsByNode(node, 'ui');
            if (name) {
                this.ui.define(name, '', '', this.getTemplate(node), ext);
            }
            removeNode(node);
        };
        Turtle.prototype.getExtendsByNode = function (node, sortPath) {
            var ext = getAttr(node, 'extends', null);
            if (isString(ext)) {
                return this.getExtends(ext, sortPath);
            }
        };
        Turtle.prototype.parseComment = function (node, outerChildNodes, outerElement, props, pPart) {
            var info = getCommentStringInfo(getCommentText(node));
            if (!info)
                return;
            if (!info.order) {
                alert("语法错误：不恰当的" + info.orderCase);
                return;
            }
            this.parseCommentOrder(info, node, outerChildNodes, outerElement, props, pPart);
            if (node.order) {
                if (node.order.endNode) {
                    node.order.run();
                }
            }
        };
        Turtle.prototype.parseAsyncOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            var that = this;
            return this.addOrderToNode(node, info, outerChildNodes, outerElement, props, pPart, function () {
                return {
                    run: function () {
                        var ns = takeBlockBetween(this.node, this.endNode);
                        var delay = parseInt(this.condition);
                        if (delay === NaN) {
                            delay = 0;
                        }
                        removeNode(this.endNode);
                        var mark = $t.$$$('async', 8);
                        replaceNodeByNode(this.node, mark);
                        this.endNode = null;
                        this.node = null;
                        setTimeout(function () {
                            var elem = $t.$$$('div');
                            replaceNodeByNode(mark, elem);
                            mark = null;
                            appendNodes(ns, elem);
                            var chds = elem.childNodes;
                            that.initHTML(chds, outerChildNodes, outerElement, props, pPart);
                            takeOutChildNodes(elem);
                            elem = null;
                            $t.replaceCls();
                        }, delay);
                    }
                };
            });
        };
        Turtle.prototype.parseSwitchOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            return this.addOrderToNode(node, info, outerChildNodes, outerElement, props, pPart, function () {
                return {
                    value: execByScope(node, info.condition, null, outerChildNodes, outerElement, props, pPart),
                    hit: null,
                    needBreak: false,
                    endHit: null,
                    hasDefault: false,
                    run: function () {
                        var order = this;
                        var scope = $t.uiScope.get(node);
                        treeEach(node.parentNode.childNodes, 'childNodes', function (node, step) {
                            if (node.nodeType != 8)
                                return;
                            var info = getCommentStringInfo(getCommentText(node));
                            if (!info)
                                return;
                            if (node.order) {
                                step.next = getNodeIndex2(node.order.endNode) - getNodeIndex2(node);
                                return;
                            }
                            switch (info.orderCase) {
                                case EOrderCase.Case:
                                case EOrderCase.Case_Break:
                                    if (order.hasDefault) {
                                        return new Error('语法错误：default后不应出现case/case break');
                                    }
                                    else if (!order.hit) {
                                        var isPass = order.value == execByScope(node, info.condition, scope, outerChildNodes, outerElement, props, pPart);
                                        if (isPass) {
                                            order.hit = node;
                                            node.order = info.orderCase;
                                        }
                                    }
                                    else if (!order.endHit) {
                                        order.endHit = node;
                                    }
                                    break;
                                case EOrderCase.Default:
                                    if (order.hasDefault) {
                                        return new Error('语法错误：多余的default');
                                    }
                                    else {
                                        order.hasDefault = true;
                                        if (!order.hit) {
                                            order.hit = node;
                                            node.order = info.orderCase;
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
                            removeBlockBetween(this.node, node);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                        else {
                            if (!this.endHit) {
                                this.endHit = this.endNode;
                            }
                            removeBlockBetween(this.node, this.hit);
                            var ns = takeBlockBetween(this.hit, this.endHit);
                            insertNodesBefore(this.node, ns);
                            removeNode(this.hit);
                            if (this.hit.order === 'case break' || this.endHit === this.endNode) {
                                removeBlockBetween(this.node, this.endNode);
                                p.removeChild(this.node);
                                p.removeChild(this.endNode);
                            }
                        }
                        delete this.node.order;
                    }
                };
            });
        };
        Turtle.prototype.parseBreakOrder = function (node) {
            var _node = node.previousSibling;
            if (!_node) {
                _node = node.parentNode;
            }
            removeNode(node);
            var p = _node.parentNode;
            while (_node.nodeName != '__BREAK__') {
                var cs = p.childNodes;
                var length_1 = cs.length;
                var index = getNodeIndex2(_node) + 1;
                for (var i_86 = index; i_86 < length_1; i_86++) {
                    p.removeChild(cs[index]);
                }
                _node = p;
                p = p.parentNode;
            }
            _node.source.onBreak();
        };
        Turtle.prototype.parseCommentOrderBlock = function (node, outerChildNodes, outerElement, props, pPart) {
            var i = getNodeIndex2(node);
            var isError = false;
            var error = function (msg) {
                isError = true;
                alert(msg);
                return 4;
            };
            var that = this;
            return treeEach((node.parentNode).childNodes, 'childNodes', function (node, step) {
                if (!isComment(node)) {
                    return;
                }
                var info = getCommentStringInfo(getCommentText(node));
                if (!info)
                    return;
                if (info.order) {
                    var ret = that.parseCommentOrderNoScript(info, node, outerChildNodes, outerElement, props, pPart);
                    if (ret) {
                        step.next = ret.index - getNodeIndex2(node) + 1;
                    }
                    return 8 + 4;
                }
                if (info.orderCase == EOrderCase.End) {
                    if (orderStack.length > 0) {
                        orderStack.pop().endNode = node;
                        return 1;
                    }
                    else {
                        return error('语法错误：多余的end');
                    }
                }
                return 4;
            }, i + 1);
        };
        Turtle.prototype.parseIfOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            var that = this;
            return this.addOrderToNode(node, info, outerChildNodes, outerElement, props, pPart, function () {
                var scope = $t.uiScope.get(node);
                return {
                    endHit: null,
                    hit: null,
                    hasElse: false,
                    run: function () {
                        var order = this;
                        order.hit = that.parseBool(execByScope(node, this.condition, scope, outerChildNodes, outerElement, props, pPart)) ? this.node : null;
                        treeEach(node.parentNode.childNodes, 'childNodes', function (node, step) {
                            if (node.nodeType != 8)
                                return;
                            var info = getCommentStringInfo(getCommentText(node));
                            if (!info)
                                return;
                            if (node.order) {
                                step.next = getNodeIndex2(node.order.endNode) - getNodeIndex2(node);
                                return;
                            }
                            switch (info.orderCase) {
                                case EOrderCase.Else:
                                case EOrderCase.Else_If:
                                    if (!order.hasElse) {
                                        if (info.orderCase == EOrderCase.Else) {
                                            order.hasElse = true;
                                        }
                                        if (!order.endHit) {
                                            if (order.hit) {
                                                order.endHit = node;
                                            }
                                            else {
                                                if (info.orderCase == EOrderCase.Else || that.parseBool(execByScope(node, order.condition, scope, outerChildNodes, outerElement, props, pPart))) {
                                                    order.hit = node;
                                                }
                                                else {
                                                    removeNode(node);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        return new Error('语法错误：else或else if不能出现在else后');
                                    }
                                    break;
                            }
                        }, getNodeIndex2(node) + 1);
                        var p = this.node.parentNode;
                        if (!this.hit) {
                            removeBlockBetween(this.node, this.endNode);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                        else {
                            if (!this.endHit) {
                                this.endHit = this.endNode;
                            }
                            var ns = takeBlockBetween(this.hit, this.endHit);
                            insertNodesBefore(this.node, ns);
                            removeBlockBetween(this.node, this.endNode);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                    }
                };
            });
        };
        Turtle.prototype.addOrderToNode = function (node, info, outerChildNodes, outerElement, props, pPart, fnGetOrder) {
            var order;
            if (!node.order) {
                order = fnGetOrder();
                node.order = order;
                order.name = info.order;
                order.node = node;
                order.endNode = null;
                order.condition = info.condition;
                orderStack.push(order);
                order.parseCommentOrderBlockReturnValue = this.parseCommentOrderBlock(node, outerChildNodes, outerElement, props, pPart);
            }
            else {
                order = node.order;
            }
            return order.parseCommentOrderBlockReturnValue;
        };
        Turtle.prototype.parseWhileOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            var that = this;
            return this.addOrderToNode(node, info, outerChildNodes, outerElement, props, pPart, function () {
                return {
                    run: function () {
                        var p = this.node.parentNode;
                        if (this.isBreak || !that.parseBool(execByScope(this.node, this.condition, null, outerChildNodes, outerElement, props, pPart))) {
                            removeBlockBetween(this.node, this.endNode);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                        else {
                            var nodes = cloneBetween(this.node, this.endNode);
                            p.insertBefore2(that.createBreakElement(nodes, this), this.node);
                        }
                    },
                    onBreak: function () {
                        this.isBreak = true;
                    },
                    isBreak: false
                };
            });
        };
        Turtle.prototype.parseForOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            var that = this;
            return this.addOrderToNode(node, info, outerChildNodes, outerElement, props, pPart, function () {
                var check;
                if (parseForOrderRE.test(info.condition)) {
                    check = (function () {
                        var s = info.condition.split(' in '), index = 0, names = [], source;
                        return function () {
                            if (!source) {
                                source = execByScope(node, s[1], null, outerChildNodes, outerElement, props, pPart);
                                if (!source) {
                                    return { result: false, params: null };
                                }
                                for (var i_87 in source) {
                                    names.push(i_87);
                                }
                                if (names.length == 0) {
                                    return { result: false, params: null };
                                }
                            }
                            if (index < names.length) {
                                execByScope(node, s[0] + '=\'' + names[index] + '\';', null, outerChildNodes, outerElement, props, pPart);
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
                                execByScope(node, s[0], null, outerChildNodes, outerElement, props, pPart);
                            }
                            else {
                                execByScope(node, s[2], null, outerChildNodes, outerElement, props, pPart);
                            }
                            return { result: execByScope(node, s[1], null, outerChildNodes, outerElement, props, pPart), params: null };
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
                            removeBlockBetween(this.node, this.endNode);
                            p.removeChild(this.node);
                            p.removeChild(this.endNode);
                        }
                        else {
                            var nodes = cloneBetween(this.node, this.endNode);
                            p.insertBefore2(that.createBreakElement(nodes, this), this.node);
                        }
                    },
                    onBreak: function () {
                        this.isBreak = true;
                    },
                    isBreak: false
                };
            });
        };
        Turtle.prototype.createBreakElement = function (nodes, order) {
            var breakElement = $t.$$$('__break__');
            for (var i_88 = 0; i_88 < nodes.length; i_88++) {
                breakElement.appendChild(nodes[i_88]);
            }
            breakElement.source = order;
            return breakElement;
        };
        Turtle.prototype.parseCommentOrderNoScript = function (info, node, outerChildNodes, outerElement, props, pPart) {
            switch (info.order) {
                case EOrder.While:
                    return this.parseWhileOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.If:
                    return this.parseIfOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.For:
                    return this.parseForOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.Switch:
                    return this.parseSwitchOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.Async:
                    return this.parseAsyncOrder(info, node, outerChildNodes, outerElement, props, pPart);
            }
        };
        Turtle.prototype.parseScopeOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            var condition = splitByOnce(info.condition, "|");
            if (condition[1] !== "") {
                $t.uiScope.create(node, condition[0]);
                execScope(condition[1], node, outerChildNodes, outerElement, props, pPart);
            }
            else {
                $t.uiScope.create(node, condition[0]);
            }
            removeNode(node);
        };
        Turtle.prototype.parseCommentOrder = function (info, node, outerChildNodes, outerElement, props, pPart) {
            switch (info.order) {
                case EOrder.Scope:
                    this.parseScopeOrder(info, node, outerChildNodes, outerElement, props, pPart);
                    break;
                case EOrder.Var:
                    execScope(info.condition, node, outerChildNodes, outerElement, props, pPart);
                    removeNode(node);
                    break;
                case EOrder.Bind:
                    this.bindPropertyByOrder(node, info.condition);
                    break;
                case EOrder.Dashes:
                    this.bindExpressionsByOrder(node, info.condition);
                    break;
                case EOrder.Bang:
                    execByScope(node, info.condition, null, outerChildNodes, outerElement, props, pPart);
                    removeNode(node);
                    break;
                case EOrder.Equals:
                    var v = execByScope(node, info.condition, null, outerChildNodes, outerElement, props, pPart);
                    if (isObject(v) && v.nodeType) {
                        replaceNodeByNode(node, v);
                    }
                    else {
                        replaceNodeByNode(node, $t.$$$(v, 3));
                    }
                    break;
                case EOrder.Content:
                    outerChildNodes && replaceNodeByNodes(node, outerChildNodes);
                    break;
                case EOrder.Elements:
                    outerElement && replaceNodeByNodes(node, outerElement);
                    break;
                case EOrder.While:
                    return this.parseWhileOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.If:
                    return this.parseIfOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.Break:
                    return this.parseBreakOrder(node);
                case EOrder.For:
                    return this.parseForOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.Switch:
                    return this.parseSwitchOrder(info, node, outerChildNodes, outerElement, props, pPart);
                case EOrder.Async:
                    return this.parseAsyncOrder(info, node, outerChildNodes, outerElement, props, pPart);
            }
        };
        Turtle.prototype.initHTML = function (c, outerChildNodes, outerElement, props, pPart) {
            var _this = this;
            treeEach(c, 'childNodes', function (node, step) {
                if (node.nodeType === 8) {
                    try {
                        _this.parseComment(node, outerChildNodes, outerElement, props, pPart);
                    }
                    catch (e) {
                        $t.catch(e);
                    }
                    return 4;
                }
                if (node.nodeType !== 1) {
                    return;
                }
                var element = node;
                if (element.hasAttribute('async')) {
                    _this.attributeParserBefore.Async(element, outerChildNodes, outerElement, props, pPart);
                    return 2;
                }
                if (element.hasAttribute('lazy')) {
                    _this.attributeParserBefore.Lazy(element, outerChildNodes, outerElement, props, pPart);
                    return 4 | 2;
                }
                var uiInfo = _this.getUIInfo(element);
                if (uiInfo && !isString(uiInfo)) {
                    parseUI(element, uiInfo, step, pPart);
                    return 4 | 8;
                }
                var ret = ElementParser.TryParse(_this.elementParser, element, outerChildNodes, outerElement, props, pPart);
                if (ret) {
                    return ret;
                }
                var attrs = slice.call(element.attributes);
                for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                    var attr = attrs_1[_i];
                    AttributeParser.TryParse(_this.attributeParser, attr.name, element, outerChildNodes, outerElement, props, pPart);
                }
            });
        };
        Turtle.prototype.getLastOrder = function (name) {
            var arr = orderStack;
            if (arr.length == 0)
                return null;
            var order = arr[arr.length - 1];
            if (order.name == name) {
                return order;
            }
            else {
                return null;
            }
        };
        Turtle.prototype.parseTemp = function (node) {
            var ret = this.parseXMP(node);
            replaceNodeByNodes(node, ret);
        };
        Turtle.prototype.parseXMP2 = function (node) {
            var ret = this.parseXMP(node);
            if (isArray(ret))
                replaceNodeByNodes(node, ret);
            else
                removeNode(node);
        };
        Turtle.prototype.isTemplate = function (node) {
            var nodeName = node.nodeName;
            if (templates.hasOwnProperty(nodeName)) {
                if (templates[nodeName].hasOwnProperty('type')) {
                    return getAttr(node, 'type') === 'xmp';
                }
                else {
                    return true;
                }
            }
            return false;
        };
        Turtle.prototype.getUI = function (uiName, uiSortPath, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            return this.render(false, uiName, uiSortPath, null, outerChildNodes, outerElement, props, pPart, partName, reExtends);
        };
        Turtle.prototype.renderIn = function (uiName, uiSortPath, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            return this.render(false, uiName, uiSortPath, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
        };
        Turtle.prototype.render = function (renderBefore, uiName, uiSortPath, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            var ui = this.importUIHTML(uiName, uiSortPath);
            if (!ui) {
                console.log(uiName + '组件不存在！');
                return;
            }
            try {
                if (renderBefore) {
                    return ui.renderBefore(elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
                }
                else {
                    return ui.renderIn(elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
                }
            }
            catch (e) {
                this.catch(e);
            }
        };
        Turtle.prototype.renderBefore = function (uiName, uiSortPath, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends) {
            return this.render(true, uiName, uiSortPath, elem, outerChildNodes, outerElement, props, pPart, partName, reExtends);
        };
        Turtle.prototype.parseHTML = function (sHTML) {
            var vDOM = this.$DOM(sHTML);
            this.initHTML(vDOM.childNodes);
            return takeChildNodes(vDOM);
        };
        Turtle.prototype.getExtends = function (extName, sortPath) {
            var ext;
            if (extName.indexOf(':') !== -1) {
                var extNameArr = extName.split(':');
                sortPath = extNameArr[0] ? extNameArr[0] : sortPath;
                extName = extNameArr[1];
            }
            if (!isObject(this.importUIHTML(extName, sortPath))) {
                throwError('找不到可继承的模板：' + extName);
                return;
            }
            ext = this.ui.list[extName];
            return ext;
        };
        Turtle.prototype.$DOM = function (html) {
            var elem = this.$$$('ui:dom');
            elem.innerHTML = html;
            return elem;
        };
        Turtle.prototype.parseXMP = function (node) {
            if (this.isDefine(node)) {
                this.parseDefine(node);
            }
            else {
                return this.parseHTML(this.getTemplate(node));
            }
        };
        Turtle.prototype.findTemplates = function (nodes) {
            var _this = this;
            var temps = [];
            treeEach(nodes, 'children', function (node) {
                if (_this.isTemplate(node))
                    temps.push(node);
            });
            return temps;
        };
        Turtle.prototype.importUIHTML = function (uiName, uiSortPath) {
            var _this = this;
            if (!this.ui.list.hasOwnProperty(uiName)) {
                var uiPath_1 = baseUIPath.getPathBySortPath(uiSortPath);
                if (baseUIPath.jsUIPath.indexOf(uiPath_1) !== -1) {
                    this.doImportUIJS(uiName, uiPath_1);
                }
                else {
                    this.xhr.get(uiPath_1 + '/' + (uiName + '.html').toLowerCase(), false, function (text) {
                        _this.parseUITemplate(uiName, uiSortPath, uiPath_1, text);
                    });
                }
            }
            return this.ui.list[uiName];
        };
        Turtle.prototype.getNodesLength = function (node) {
            var nod = node;
            if (nod.parentNode) {
                return nod.parentNode.children.length;
            }
            var index = getNodeIndex(nod) - 1;
            nod = nod.nextElementSibling;
            while (nod != null) {
                nod = nod.nextElementSibling;
                index++;
            }
            return index;
        };
        Turtle.prototype.getNodesLength2 = function (node) {
            var nod = node;
            if (nod.parentNode) {
                return nod.parentNode.childNodes.length;
            }
            var index = getNodeIndex2(nod) - 1;
            nod = nod.nextSibling;
            while (nod != null) {
                nod = nod.nextSibling;
                index++;
            }
            return index;
        };
        Turtle.prototype.isDefine = function (node) {
            switch (true) {
                case node.hasAttribute('service'):
                case node.hasAttribute('ui'):
                case node.hasAttribute('class'):
                    return true;
            }
            return false;
        };
        Turtle.prototype.parseDefine = function (node) {
            switch (true) {
                case node.hasAttribute('service'):
                    this.defineServiceByNode(node);
                    break;
                case node.hasAttribute('ui'):
                    this.defineUIByNode(node);
                    break;
                case node.hasAttribute('class'):
                    this.defineClasses(node);
                    break;
            }
        };
        Turtle.prototype.defineClasses = function (node) {
            KeyArrayObject.push(this.styleClasses, getAttr(node, 'class'), trimLine(this.getTemplate(node)));
            removeNode(node);
        };
        Turtle.prototype.parseUITemplate = function (uiName, uiSortPath, uiPath, sHTML) {
            var vDOM = this.$DOM(sHTML);
            var cs = vDOM.children;
            for (var i_89 = 0; i_89 < cs.length; i_89++) {
                var node = cs[i_89];
                if (!this.isTemplate(node)) {
                    alert('最上层必须是ui/service模板标签');
                    return;
                }
                if (node.hasAttribute('service')) {
                    this.defineServiceByNode(node);
                    i_89--;
                }
                else {
                    var nodeName = node.getAttribute('ui');
                    if (!nodeName)
                        nodeName = uiName;
                    if (!this.ui.list.hasOwnProperty(nodeName)) {
                        var s = this.getTemplate(node);
                        this.ui.define(nodeName, uiSortPath, uiPath, s, this.getExtendsByNode(node, uiSortPath));
                    }
                    else {
                        alert('不能重复定义ui：' + nodeName);
                    }
                }
            }
        };
        Turtle.prototype.getTemplate = function (node) {
            var nodeName = node.nodeName;
            if (templates.hasOwnProperty(nodeName)) {
                if (templates[nodeName].hasOwnProperty('getData')) {
                    return templates[nodeName].getData(node);
                }
                else {
                    return node.innerHTML;
                }
            }
            return '';
        };
        Turtle.prototype.renderTemplate = function (tp) {
            var sHTML = this.getTemplate(tp);
            var vDOM = this.$DOM(sHTML);
            this.initHTML(vDOM.childNodes);
            if (isFunction(vDOM)) {
                var p = tp.parentNode;
                replaceNodeByNodes(tp, takeChildNodes(vDOM));
                vDOM.__domNode__ = p;
                return;
            }
            replaceNodeByNodes(tp, takeChildNodes(vDOM));
        };
        Turtle.prototype.replaceCls = function () {
            var arr = this.clsNode;
            for (var i_90 = 0; i_90 < arr.length; i_90++) {
                var cls = arr[i_90].getAttribute('cls');
                arr[i_90].removeAttribute('cls');
                if (this.styleClasses[cls]) {
                    arr[i_90].className += ' ' + this.styleClasses[cls].join(" ");
                }
            }
            arr.length = 0;
        };
        Turtle.prototype.defineServiceByNode = function (node) {
            var name = node.getAttribute('service');
            if (name) {
                var nodeName = node.getAttribute('ui');
                if (nodeName) {
                    if (this.ui.list.hasOwnProperty(nodeName)) {
                        this.ui.list[nodeName].service.define(name, this.getTemplate(node));
                    }
                    else {
                        throwError('不能定义service：' + name + '到' + nodeName + '上');
                        return;
                    }
                }
                else {
                    if (!this.service.hasOwnProperty(name)) {
                        this.service.define(name, this.getTemplate(node));
                    }
                    else {
                        throwError('不能重复定义service：' + name);
                        return;
                    }
                }
            }
            removeNode(node);
        };
        Turtle.prototype.ready = function (fn) {
            var _this = this;
            if (isNodeJS) {
            }
            else if (this.readyByRenderDocument.isReady || (readyRE.test(document.readyState) && document.body !== null)) {
                fn();
            }
            else {
                var onLoaded_1 = function () {
                    if (document.body !== null) {
                        removeEventListener('DOMContentLoaded', onLoaded_1);
                        clearInterval(tid_1);
                        fn();
                    }
                };
                var tid_1 = setInterval(function () {
                    if (_this.readyByRenderDocument.isReady || (readyRE.test(document.readyState) && document.body !== null)) {
                        clearInterval(tid_1);
                        removeEventListener('DOMContentLoaded', onLoaded_1);
                        fn();
                    }
                }, 10);
                addEventListener('DOMContentLoaded', onLoaded_1, false);
            }
            return this;
        };
        Turtle.prototype.renderDocument = function () {
            if (!document.body) {
                return;
            }
            var renderDocument = Turtle.prototype.renderDocument;
            renderDocument.beginTime = new Date();
            var xmps = this.findTemplates(document.body.children);
            var templateXMP = [];
            for (var i_91 = 0; i_91 < xmps.length; i_91++) {
                if (this.isDefine(xmps[i_91])) {
                    this.parseDefine(xmps[i_91]);
                }
                else {
                    templateXMP.push(xmps[i_91]);
                }
            }
            for (var i_92 = 0; i_92 < templateXMP.length; i_92++) {
                this.renderTemplate(templateXMP[i_92]);
            }
            this.replaceCls();
            renderDocument.endTime = new Date();
        };
        Turtle.prototype.catch = function (e, onerror) {
            if (isFunction(onerror)) {
                onerror(e);
            }
            else {
                if (isFunction(this.event.onerror)) {
                    this.event.onerror(e);
                }
            }
        };
        Object.defineProperty(Turtle.prototype, "rootParts", {
            get: function () {
                return RootParts();
            },
            enumerable: true,
            configurable: true
        });
        Turtle.prototype.doImportUIJS = function (uiName, uiPath) {
            var _this = this;
            this.xhr.get(uiPath + '/' + (uiName + '.js').toLowerCase(), false, function (text) {
                Function('$t', text)(_this);
            });
        };
        Turtle.prototype.importUIJS = function (uiName, uiSortPath) {
            if (!this.ui.list.hasOwnProperty(uiName)) {
                var uiPath = baseUIPath.getPathBySortPath(uiSortPath);
                this.doImportUIJS(uiName, uiPath);
            }
            return this.ui.list[uiName];
        };
        return Turtle;
    }(TurtleFunction));
    turtleNS.Turtle = Turtle;
})(turtleNS || (turtleNS = {}));
var $rootScope = new turtleNS.RootScope();
var $_ = $rootScope;
var $client = new turtleNS.Client();
var $$ = turtleNS.Turtle.prototype.$$;
var turtle;
var $t;
if (isNodeJS) {
    exports.Turtle = turtleNS.Turtle;
}
else {
    $t = turtle = new turtleNS.Turtle();
}
