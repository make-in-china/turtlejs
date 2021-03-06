
/// <reference path='TemplateConfig.ts'/>
/// <reference path='../view/order/VOrder.ts'/>
/// <reference path='../core/XHR.ts'/>
/// <reference path='../view/Include.ts'/>
/// <reference path='../virtual/src/lib/TreeEach.ts'/>
/// <reference path='Part.ts'/>
/// <reference path='Store.ts'/>
/// <reference path='../main/Config.ts'/>
/// <reference path="UIList.ts"/>
/// <reference path="../main/LoadJS.ts"/>

interface ITurtle{
    // parts:IKeyArrayHashObject<Component.Part>;
    // service:Service;
    T:UIList
    xhr: XHR;
    refs: IKeyArrayHashObject<IHTMLElement>;
    replaceClassStore:IHTMLElement[];
    defineClassNames:string[];
}

declare var $t:ITurtle;
let
    // $DOM,
    // $node: I$Node,
    operatorRE = /\!=|==|=|<|>|\|/;
// interface I$Node {
//     (name:'__break__', nodeType?:number):IHTMLBreakElement
//     (name: string, nodeType?: ENodeType.Element): INode
//     (name: string, nodeType?: 3): IText
//     (name: string, nodeType?: 8): IComment
//     (name: string, nodeType?: number): INode | null
// }
function replaceCls(){
    // let arr=$t.replaceClassStore;
    // for(let i=0;i<arr.length;i++){
    //     let cls=arr[i].getAttribute('cls');
    //     arr[i].removeAttribute('cls');
    //     if($t.defineClassNames[cls]){
    //         arr[i].className+=' '+$t.defineClassNames[cls].join(" ");
    //     }
    // }
    // arr.length=0;
}
function getScopeBy(scope, node: INode) {
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

function setNodeProperty(node, proName, condition) {
    let v = Order.exec(node, condition)//debugger , null, outerChildNodes, outerElement, props, part);
    let name = camelCase(proName.substr(0, proName.length - 1));

    if (name.indexOf(".") != -1) {
        let obj2 = node;
        let nameArr = name.split(".");
        for (let i = 0; i < nameArr.length - 1; i++) {
            obj2 = obj2[nameArr[i]];
            if (!obj2) return;
        }
        name = nameArr[nameArr.length - 1];
        obj2[name] = v;
    } else {
        node.setAttribute(name, v);
    }
}

function getTemplate(node: IElement): string {
    let nodeName = node.nodeName;
    if (templateConfig.hasOwnProperty(nodeName)) {
        if (templateConfig[nodeName].hasOwnProperty('getData')) {
            return (<{getData(node:INode):string}>templateConfig[nodeName]).getData(node);
        } else {
            return node.innerHTML;
        }
    }
    return "";
}
// function defineServiceByNode(node: IHTMLElement) {
//     let name: string = node.getAttribute('service');
//     if (name) {
//         let partType: string = node.getAttribute('ui');
//         if (partType) {
//             if ($t.T.hasOwnProperty(partType)) {
//                 /*把服务定义到组件*/
//                 $t.T[partType].service.define(name, getTemplate(node));
//             } else {
//                 throw new Error('不能定义service：' + name + '到' + partType + '上');
//             }
//         } else {
//             if (!$t.service.hasOwnProperty(name)) {
//                 $t.service.define(name, getTemplate(node));
//             } else {
//                 throw new Error('不能重复定义service：' + name);
//             }
//         }
//     }
//     removeNode(node);
// }
// function getExtendsByNode(node: IHTMLElement, sortPath: string) {
//     let ext = getAttr(node, 'extends', null);
//     if (isString(ext)) {
//         return getExtends(ext, sortPath);
//     }
// }
// function defineUIByNode(node: IHTMLElement) {
//     let name = getAttr(node, 'ui');
//     let ext = getExtendsByNode(node, 'ui');
//     if (name) {
//         $t.T.define(name, '', '', getTemplate(node), ext);
//     }
//     removeNode(node);
// }
function defineClasses(node: IHTMLElement) {
    let v = getAttr(node, 'class');
    if (v) {
        $t.defineClassNames.push(v, trimLine(getTemplate(node)));
    }
    removeNode(node);
}
// function parseDefine(node: IHTMLElement) {
//     switch (true) {
//         case node.hasAttribute('service'):
//             defineServiceByNode(node);
//             break;
//         // case node.hasAttribute('ui'):
//         //     defineUIByNode(node);
//         //     break;
//         case node.hasAttribute('class'):
//             defineClasses(node);
//             break;
//     }
// }
// function isDefine(node: IHTMLElement): boolean {
//     switch (true) {
//         case node.hasAttribute('service'):
//         case node.hasAttribute('ui'):
//         case node.hasAttribute('class'):
//             return true;
//     }
//     return false;
// }
function isTemplate(node: IElement): node is IElement {
    let nodeName = node.nodeName;
    if (templateConfig.hasOwnProperty(nodeName)) {
        if (templateConfig[nodeName].hasOwnProperty('type')) {
            return getAttr(node, 'type') === 'xmp';
        } else {
            return true;
        }
    }
    return false;
}
function findTemplates(nodes: IArray<IHTMLElement>):  IArray<IElement> {
    let temps:IElement[] = [];
    treeEach(nodes, 'children', function (node) {
        if (isTemplate(node)) {
            temps.push(node);
        }
    });
    return temps;
}
// function parseUITemplate(uiName: string, uiSortPath: string, uiPath: string, sHTML: string) {
//     let
//         vDOM = VDOM2.parseStructor(sHTML),
//         i = 0,
//         node,
//         s,
//         name,
//         nodeName;
//     let cs:VNode[];
//     if(isArray(vDOM)){
//         cs=vDOM;
//     }else{
//         cs=[vDOM];
//     }
//     for (; i < cs.length; i++) {
//         node = cs[i];
//         if (!isTemplate(node)) {
//             alert('最上层必须是ui/service模板标签');
//             return;
//         }
//         if (node.hasAttribute('service')) {
//             defineServiceByNode(node);
//             i--;
//         } else {
//             nodeName = node.getAttribute('ui');
//             if (!nodeName) nodeName = uiName;
//             if (!$t.T.hasOwnProperty(nodeName)) {
//                 s = getTemplate(node);
//                 $t.T.define(nodeName, uiSortPath, uiPath, s);//, getExtendsByNode(node, uiSortPath)
//             } else {
//                 alert('不能重复定义ui：' + nodeName);
//             }
//         }
//     }
// }

/**
 * 加载UI
 */
function importUI(uiName: string, uiSortPath: string): {
    path: string;
    resPath: string;
    part: new (props: ComponentView.IProps | null, outerChildNodes?: INode[] | undefined) => Component.Part;
}{
    if (!$t.T.hasOwnProperty(uiName)) {
        let uiPath = baseUIPath.paths[uiSortPath];
        let path=uiPath + '/' + (uiName + '/index.js').toLowerCase();
        //加载js
        UIList.push($t.T,uiSortPath,'',$t.loadJS(path,uiName[0].toUpperCase()+uiName.substr(1)));
    }
    return $t.T[uiSortPath][uiName];
}

// function getExtends(extName, sortPath) {
//     let ext;
//     if (extName.indexOf(':') !== -1) {
//         extName = extName.split(':');
//         sortPath = extName[0] ? extName[0] : sortPath;
//         extName = extName[1];
//     }
//     if (!isObject(importUI(extName, sortPath))) {
//         throw new Error('找不到可继承的模板：' + extName);
//     }
//     ext = $t.T[extName];
//     return ext;
// }


/**从DOM树获取父组件
 * @param {}
 */
function getParentPart(node:VMDOM.VNode):Component.Part|null{
    while(1){
        if(node.previousSibling!==null){
            node=node.previousSibling;
        }else if(node.parentNode!==null){
            node=node.parentNode;
        }else{
            return null;
        }
        if(isCommentNode(node)&&node.vmData.part){
            if(node.vmData.sign===0){
                node=node.vmData.part.refs.begin;
            }else{
                return node.vmData.part;
            }
        }
    }
    return null;
}
function parseAsync(node: IHTMLElement, outerChildNodes, outerElement, props, part) {
    let delay = parseInt(Order.exec(node, <string>node.getAttribute('async')));//, null, outerChildNodes, outerElement, props, part));
    node.removeAttribute('async');
    let mark = $$$('async', ENodeType.Comment);
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
function parseLazy(node: IHTMLElement, outerChildNodes, outerElement, props, part) {
    node.removeAttribute('lazy');
    initHTML(node.childNodes, outerChildNodes, outerElement, props, part);
}
function getUIInfo(node: IHTMLElement) {
    let nodeName = node.nodeName;
    if (nodeName === 'SCRIPT' && getAttr(node, 'type') === 'ui') {
        let name=node.getAttribute('name');
        if(name){
            return name.toLowerCase();
        }else{
            return '';
        }
    } else if (nodeName.indexOf(':')) {
        let c = nodeName.split(':');
        let sortPath = c[0].toLowerCase();
        if (baseUIPath.hasSortPath(sortPath)) {
            return { sortPath: sortPath, name: c[1].toLowerCase() };
        }
    }
}


function parseGet(node: IHTMLElement, outerChildNodes, outerElement, props, part) {
    removeNode(node);
    let name = getAttr(node, 'name');
    if (name) {
        initHTML(node.childNodes, outerChildNodes, outerElement, props, part);
        $t.store[name] = node;
        return eTreeEach.c_noIn;
    }
    let toRef = getAttr(node, 'to-p-ref');
    if (toRef && part) {
        toRef = '$' + toRef;
        if (part[toRef]) {
            appendNodes(node.childNodes, part[toRef]);
            initHTML(part[toRef].childNodes, outerChildNodes, outerElement, props, part);
            node.innerHTML = '';
        }
    }
}

// function isHTMLElement(p: IHTMLElement | IHTMLCollection): p is IHTMLElement {
//     return typeof p === "IHTMLElement";
// }
// function parseSet(node: IHTMLElement, outerChildNodes: INode[], outerElement: IElement[], props, part) {

//     let link = takeAttr(node, 'link', "");
//     if (link) {
//         /*设置关联子对象*/
//         let chds = StoreManage.takeElem($t.store, link);

//         if (chds) {
//             if (isHTMLElement(chds)) {
//                 node.appendChild(chds);
//             } else {
//                 let n=node.children[0];
//                 if(n)appendNodes(<IHTMLCollection>chds, n);
//             }

//             takeOutChildNodes(node);
//         } else {
//             removeNode(node);
//         }
//     } else {
//         let ns: IHTMLElement[] | IHTMLCollection;
//         /*设置属性*/
//         if (node.children.length > 0) {
//             /*设置子对象*/
//             ns = node.children;
//         } else if (node.parentNode) {
//             /*设置父对象*/
//             ns = [<IHTMLElement>node.parentNode];
//         } else {
//             return;
//         }
//         let isAppend = !node.hasAttribute('append');
//         node.removeAttribute('append');
//         let attr = node.attributes;
//         for (let j = 0; j < ns.length; j++) {
//             let nd=<IHTMLElement>ns[j];
//             if (isAppend) {
//                 for (let i = 0; i < attr.length; i++) {
//                     nd.setAttribute(attr[i].name, attr[i].value);
//                 }
//             } else {
//                 for (let i = 0; i < attr.length; i++) {
//                     let value = attr[i].value;
//                     let value2: string;
//                     switch (attr[i].name) {
//                         case 'class':
//                             value2 = nd.getAttribute(attr[i].name);
//                             if (value2) {
//                                 value += (/ $/.test(value) ? '' : ' ') + value2;
//                             }
//                             break;
//                         case 'style':
//                             value2 = nd.getAttribute(attr[i].name);
//                             if (value2) {
//                                 value += (/; *$/.test(value) ? '' : ';') + value2;
//                             }

//                             break;
//                     }
//                     nd.setAttribute(attr[i].name, value);
//                 }
//             }
//         }
//         takeOutChildNodes(node);
//     }
//     return eTreeEach.c_noIn;
// }

let exec = eval;
// function execOnScript(node: IHTMLElement) {
//     var p = node.parentNode;
//     if (p) {
//         var script = node.innerHTML;
//         if (script.length > 0) {
//             /*设置父对象事件*/
//             var events = exec('({' + script + '})');
//             for (var i in events) {
//                 if (isFunction(events[i])) {
//                     p.addEventListener(i, events[i]);
//                 }
//             }
//         }
//     }
// }
function execScript(node: IHTMLElement, outerChildNodes?, outerElement?, props?, part?) {
    var script = node.innerHTML;
    if (script.length > 0) {
        var fn;
        var keyVar = String(getAttr(node, 'var', ''));
        var arrKeyVar: string[];
        fn = Function('outer,outerElement,props,part' + (keyVar ? ',' : '') + keyVar, script);

        var args = [outerChildNodes, outerElement, props, part];
        if (keyVar.length > 0) {
            arrKeyVar = keyVar.split(',');
            for (var i = 0; i < arrKeyVar.length; i++) {
                var ui = $t.refs[arrKeyVar[i]];
                if (ui) {
                    args.push(ui[ui.length - 1]);
                } else {
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
// function execTurtleScript(node: IHTMLElement, outerChildNodes, outerElement, props, part) {
//     var type = getAttr(node, 'type', null);
//     if (type == 'on') {
//         execOnScript(node)
//     } else {
//         execScript(node, outerChildNodes, outerElement, props, part);
//     }
// }
interface INode {
    type?: string
}
// function parseScript(node: IHTMLElement, outerChildNodes, outerElement, props, part) {
//     if (node.type === "" || node.type === "on" || node.type === "text/javascript") {
//         let src = getAttr(node, 'src', '');
//         if (src) {
//             includeJSFiles(src);
//         } else {
//             execTurtleScript(node, outerChildNodes, outerElement, props, part);
//         }
//         removeNode(node);
//     }
// }
function execNodeQuestion(node: IHTMLElement) {
    let v = takeAttr(node, ':', "");
    if (v && v.length > 0) {
        Order.exec(node, v);//, null, outerChildNodes, outerElement, props, part);
    }
}
// class ElementParser {
//     GET = parseGet
//     // SET = parseSet
//     // __BREAK__ = parseBreakOrder
//     SCRIPT = parseScript
// }
// function render(
//     this:void,
//     uiNode:IHTMLElement|null,
//     outerChildNodes: INode[], 
//     outerElement: IHTMLCollection,
//     props:Object|null,
//     uiInfo: string | {
//         sortPath: string;
//         name: string;
//     }
// ){
//     // let name:string
//     // let sortPath:string
//     // if(isString(uiInfo)){
//     //     name=uiInfo;
//     //     sortPath='ui';
//     // }else{
//     //     name=uiInfo.name;
//     //     sortPath=uiInfo.sortPath;
//     // }
//     // let UI= importUI(name, sortPath);

//     // if (!UI) {
//     //     if(uiNode){
//     //         removeNode(uiNode);
//     //     }
//     //     throw new Error(name + '组件不存在！');
//     // }
//     // let ui=new UI({},outerChildNodes,outerElement);  

//     // if(props===null){
//     //     props={};
//     // }

//     // let 
//     //     ext,
//     //     attrs:INamedNodeMap,
//     //     len,
//     //     html;
        
    
    
//     // if(uiNode===null){
//     //     uiNode=<IHTMLElement>$node('ui:render');//document.createElement("ui:render");
//     // }else{
//     //     // setQuestionAtrr(uiNode,outerChildNodes,outerElement,part?part.props:props,part);
    
//     //     attrs=uiNode.attributes;
//     //     len=attrs.length;
//     //     for(let i=0;i<len;i++){
//     //         let name=attrs[0].name;
//     //         if(!props.hasOwnProperty(name)){
//     //             props[name]=attrs[0].value;    
//     //         }
//     //         uiNode.removeAttributeNode(attrs[0]);
//     //     }
//     // }
//     // html=this.joinDatasByProps(props);
//     // if(html===undefined){
//     //     return;
//     // }
    
//     // if(reExtends){
//     //     ext=getExtends(reExtends,this.sortPath);
//     // }
//     // if(!ext){
//     //     ext=this.extends;
//     // }
//     // // if(ext instanceof PartTemplate){
//     // //     ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
//     // // }
//     // // let newPart=new Part(this,ext,props,html,outerChildNodes,outerElement);
//     // let newPart=new Part(this,props,html,outerChildNodes,outerElement);
//     // if(refPartName){
//     //     /**放置到全局引用 */
//     //     KeyArrayHashObjectManage.push($t.parts,refPartName,newPart);
//     // }
//     // this.parts.push(newPart);
    
//     // if(uiNode.parentNode!==null){
//     //     //let p=uiNode.parentNode.__domNode__;
//     //     newPart.insertBefore(uiNode);
//     //     removeNode(uiNode);
//     //     /*if(p){
//     //         debugger;
//     //         vNodesToDOM(part.store);
//     //     }*/
//     // }
//     // return newPart;
// }
// let elementParser = new ElementParser;
// let attributeParser = new AttributeParser;
function initHTML(arr: INode[]|INodeList, outerChildNodes?, outerElement?, props?, part?) {
    treeEach(arr, 'childNodes', function (node: IHTMLElement) {
        if (node instanceof VMDOM.VComment&&node.vmData.sign===undefined) {
            let order = Order.parseComment(node);
            if (order && order.run) {
                order.run();
            };
            return eTreeEach.c_noIn;
        }
        if (node.nodeType !== 1) {
            return;
        }
        if (node.hasAttribute('async')) {
            parseAsync(node, outerChildNodes, outerElement, props, part);
            return eTreeEach.c_repeat;
        }
        if (node.hasAttribute('lazy')) {
            parseLazy(node, outerChildNodes, outerElement, props, part);
            return eTreeEach.c_noIn | eTreeEach.c_repeat;
        }
        let uiInfo = getUIInfo(node);
        if (uiInfo) {
            // render(node,outerChildNodes,outerElement,null,uiInfo);
            
            // partName = takeAttr(node, 'p-name');


            // reExtends = takeAttr(node, 're-extends');

            // outerChildNodes = slice.call(node.childNodes);
            // outerElement = slice.call(node.children);
            // let chds = node.childNodes;
            // for (let i = chds.length; i > 0; i--) {
            //     node.removeChild(<INode>chds[0]);
            // }
            
            // cpn = ui.render(node, node.parentNode, outerChildNodes, outerElement, null, part, partName, reExtends);
            // if (cpn) {
            //     step.next = cpn.elementLength;
            // }
            return eTreeEach.c_noIn | eTreeEach.c_noRepeat;
        }
        /*if(isTemplate(node)){
            parseTemp(node);
            return;
        }*/
        // if (elementParser.hasOwnProperty(node.nodeName)) {
        //     /* let ret=*/return elementParser[node.nodeName](node, outerChildNodes, outerElement, props, part);
        //     /* if(ret){
        //         return ret;
        //         };*/
        // }
        // let attrs = slice.call(node.attributes);
        // for (let i = 0; i < attrs.length; i++) {
        //     if (attributeParser.hasOwnProperty(attrs[i].name)) {
        //         attributeParser[attrs[i].name](node, outerChildNodes, outerElement, props, part);
        //     }
        // }
    });
}
function getParts(childNodes: IArray<INode>): Component.Part[] {
    let child: Component.Part[] = [];
    let cpn:Component.Part|undefined;
    treeEach(childNodes, "childNodes", function (node) {
        if(isCommentNode(node)&&node.vmData&&node.vmData.part){
            let part=node.vmData.part;
            if (cpn) {
                if ( part === cpn && node.vmData.sign === 0) {
                    child.push(part);
                    cpn = undefined;
                }
            } else {
                cpn = part;
            }
            return;
        }
        if (cpn) {
            return eTreeEach.c_noIn;
        }
    });
    return child;
}
// function getService(serviceName: string) {
//     if (!$t.service.hasOwnProperty(serviceName)) {
//         $t.xhr.get($t.config.baseServicePath + '/' + (serviceName + '.js').toLowerCase(), false, function (text) {
//             $t.service.define(serviceName, text);
//         });
//     }
//     return $t.service[serviceName];
// }
