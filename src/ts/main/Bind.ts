
/// <reference path="../scope/execute.ts"/>
/// <reference path="../scope/DOMScope.ts"/>
/// <reference path="../lib/lib.ts"/>
/// <reference path="../lib/TypeHelper.ts"/>
/// <reference path="../core/Node.ts"/>
/// <reference path="../part/PartCore.ts"/>


function _getBindObject(scope:Scope, arrNames: Array<string>) {
    let i:number, obj:Scope, length:number = arrNames.length;
    let temp:Scope|null=scope;
    while (temp) {
        obj = temp;
        for (i = 0; i < length; i++) {
            if (obj.hasOwnProperty(arrNames[i])) {
                if (i < length - 1) {
                    obj = obj[arrNames[i]];
                    continue;
                } else {
                    return obj;
                }
            }
        }
        temp = temp.__parent__;
    }

    obj = window[arrNames[0]];
    if (obj) {
        for (i = 1; i < length; i++) {
            if (obj.hasOwnProperty(arrNames[i])) {
                if (i < length - 1) {
                    obj = obj[arrNames[i]];
                    continue;
                } else {
                    return obj;
                }
            }
        }
    }
    return null;
}
function removeBind(obj:Object, name:string, targetName:string): boolean {
    if (!obj.__bind__) {
        return false;
    }
    let bindInfoHash = obj.__bind__;
    for (let i=0;i<bindInfoHash.length;i++) {
        if (bindInfoHash[i].name === name && bindInfoHash[i].targetName === targetName) {
            if (bindInfoHash.length == 1) {
                bindInfoHash.length = 0;
                delete obj.__bind__;
            } else {
                bindInfoHash.splice(i, 1);
            }
            return true;
        }
    }
    return false
}




/*绑定属性与描述*/
function bindNodeProperty(node: INode, proName: string, condition: string) {
    let
        cdtn = splitByOnce(condition, "|"),
        name,
        scope:Scope,
        obj,
        obj2 = node,
        bindVar = cdtn[0],
        arrBindVar: Array<string>,
        exp: IExp,
        name2 = camelCase(proName);
    if (name2.indexOf(".") != -1) {
        let nameArr = name2.split(".");
        for (let i = 0; i < nameArr.length - 1; i++) {
            obj2 = obj2[nameArr[i]];
            if (!obj2) return;
        }
        name2 = nameArr[nameArr.length - 1];
    }
    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    } else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = DOMScope.get(node);
    obj = _getBindObject(scope, arrBindVar);
    if (obj === null) {
        throw new Error('不能获取绑定属性:' + cdtn[0]);
    }
    if (cdtn.length == 2) {
        exp = <any>function (v:string) {
            obj2[name2] = _execExpressionsByScope(cdtn[1], v, node);
        }
        exp.__me__ = exp;
        bindProperty(obj, name, exp, '__me__');
    } else {
        bindElementProperty(obj, name, obj2, name2);
        obj2[name2] = obj[name];
    }
}
/*
    * 绑定标签属性
    */
function bindElementPropertyByName(node: IHTMLElement, elementValueName: string, condition: string) {
    let
        cdtn = splitByOnce(condition, "|"),
        name = cdtn[0],
        arrName: Array<string>,
        scope,
        exp: IExp,
        obj;
    if (!name) return;
    scope = DOMScope.get(node);
    if (name.indexOf(".") != -1) {
        arrName = name.split(".");
        obj = _getBindObject(<Scope>scope, arrName);
        name = arrName[arrName.length - 1];
    } else {
        obj = _getBindObject(<Scope>scope, [name]);
    }
    if (obj === null) {
        throw new Error('不能获取绑定属性:' + cdtn[0]);
    }

    if (cdtn.length == 2) {
        exp = <any>function (v:string) {
            _execExpressionsByScope(cdtn[1], v, node);
        }
        exp.__me__ = exp;
        bindProperty(obj, name, exp, "__me__");
    } else {
        if (!node.__bind__) {
            node[elementValueName] = obj[name];
        }
        bindProperty(obj, name, node, elementValueName);
    }
}
function bindPropertyByOrder(node:INode, condition:string) {
    let cdtn = splitByOnce(condition, '|');
    if (cdtn.length < 2) return;
    let
        name,
        scope,
        obj,
        bindVar = cdtn[0],
        arrBindVar: Array<string>,
        name2,
        scope2,
        obj2,
        bindVar2 = cdtn[1],
        arrBindVar2: Array<string>;

    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    } else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = DOMScope.get(node);
    obj = _getBindObject(<Scope>scope, arrBindVar);

    if (bindVar2.indexOf(".") != -1) {
        arrBindVar2 = bindVar2.split(".");
    } else {
        arrBindVar2 = [bindVar2];
    }
    name2 = bindVar2[bindVar2.length - 1];
    scope2 = DOMScope.get(node);
    obj2 = _getBindObject(<Scope>scope2, arrBindVar2);

    bindProperty(obj, name, obj2, name2);
    obj2[name2] = obj[name];
}
function bindExpressionsByOrder(node:INode, condition:string) {
    let cdtn = splitByOnce(condition, '|');
    if (cdtn.length < 2)
        cdtn.push('v');
    let
        name,
        scope:Scope,
        obj,
        bindVar = cdtn[0],
        arrBindVar: Array<string>,
        exp: IExp,
        textNode: IText = $node(' ', 3);

    if (bindVar.indexOf(".") != -1) {
        arrBindVar = bindVar.split(".");
    } else {
        arrBindVar = [bindVar];
    }
    name = bindVar[bindVar.length - 1];
    scope = DOMScope.get(node);
    obj = _getBindObject(scope, arrBindVar);
    if (obj === null) {
        throw new Error('不能获取绑定属性:' + cdtn[0]);
    }
    exp = <any>function (v:string) {
        // try {
        return _execExpressionsByScope.call(scope, cdtn[1], v, node);
        // } catch (e) { _catch(e) }
    }
    exp.__me__ = exp;
    bindProperty(obj, name, exp, '__me__');
    replaceNodeByNode(node, textNode);
    bindElementProperty(exp, '__me__', textNode, 'data');
    textNode['data'] = <any>exp.__me__;
}