
/// <reference path='../../part/PartParam.ts'/>
namespace UIHelper {

    
    function getAttrAndChildsJS(name: string, refNode: VMElement.VHtmlElement): string {
        let sAttr = refNode.attributesToJS();
        if (sAttr.length !== 0) {
            sAttr = `this.${name}${sAttr};`;
        }
        let s = '';
        s = refNode.childNodesToJS(16).replace(/\.\$$/, '');
        if (s !== '') {
            s = `
            this.${name}${s};`;
        }
        return sAttr + s;
    }

    function toClassName(this: void, node: VNode): string {
        if (isVComment(node)) {
            return "VComment&IVNodeMethod"
        } else if (isVText(node)) {
            return "VText&IVNodeMethod"
        } else if (isVDocType(node)) {
            return "VDocumentType&IVNodeMethod"
        } else {
            let nodeName = node.nodeName;
            nodeName = nodeName[0] + nodeName.substr(1).toLowerCase();
            return 'VMElement.V' + nodeName + 'Element&IVNodeMethod';
        }
    }

    export function makeClass(this: void, path: string, className?: string) {
        if (!className) {
            className = path.match(/[\s\S]*[\/\\](.*?)[\/\\].*?$/)[1];
        }
        className = className[0].toUpperCase() + className.substr(1).toLowerCase();
        let html = fs.readFileSync(path);
        if (!isString(html)) {
            html = html.toString();
        }
        let dom = VDOM2.parseStructor(html);
        let tops: VNode[];
        let chds: VNode[] | IArray;
        if (isArray(dom)) {
            chds = dom;
            tops = dom
        } else {
            chds = dom.childNodes;
            tops = [dom];
        }

        let refInfo = new RefInfo;
        let scripts: VScript[] = [];
        treeEach(<VNode[]>chds, "childNodes", (node, state) => {
            if (node instanceof VComment) {
                //解析注释里的命令
                try {
                    let order = Order.parseComment(node);
                    if (order && order.run) {
                        if (OrderEx.canRunAtService(order)) {
                            //order达成运行所需条件，运行
                            order.run();
                        } else {
                            //order达成运行所需未条件，转换为VScript节点
                            OrderEx.toScriptNode(order);
                        }
                    };
                } catch (e) {
                    throw getMakeClassError(path, node, (<Error>e).message, state);
                }
                return eTreeEach.c_noIn;
            }
        });

        let paramInfos:PartParam[]=[];

        treeEach(<VNode[]>chds, "childNodes", (node, state) => {


            if (node instanceof VMElement.VHtmlElement) {
                //解析ref
                let v = node.getAttribute("ref");
                if (v) {
                    refInfo.push(v, <any>node);
                    node.removeAttribute("ref");
                }
                //解析class
            } else if (node instanceof VScript) {
                scripts.push(node);
            }
        });

        let scriptFunctions: string = '';
        for (let i = scripts.length - 1; i >= 0; i--) {
            let script = scripts[i];
            let p = <VElement & IVNodeMethod>scripts[i].parentNode;
            let name = 'order' + i;
            script.propertyName = name;
            scriptFunctions += '\n    ' + script.toFunction();
        }

        let propertys: string[] = [];
        let names: string[] = [];
        let vars: string[] = [];
        let propertyInitScript: { [index: string]: string } = {};
        //替换节点为mem
        for (const info of refInfo.data) {
            if (info.refs.length > 1) {
                //缓存parent;
                let refParent = info.refParent;
                for (const ref of info.refs) {
                    let name = ref.name;
                    let refNode: VElement & IVNodeMethod = ref.node;
                    let mem = $$$(name, ENodeType.Member);
                    replaceNodeByNode(refNode, mem);
                    names.push(name);
                    propertys.push(name + ':' + toClassName(refNode));
                }
                let p = refParent.parentNode;
                if (!p) {
                    let refName = refInfo.getRefNodeName(refParent);
                    if (refName === null) {
                        throw new Error('未知错误！');
                    }
                } else {
                    let parentName = RefInfo.getRefParentName(info.refs);
                    let mem = $$$(parentName, ENodeType.Member);
                    mem.isVar = true;
                    replaceNodeByNode(refParent, mem);
                    names.push(parentName);
                    vars.push(parentName + ':' + toClassName(refParent));
                }
            } else {
                //只拆一次
                let refInfo = info.refs[0];
                let name = refInfo.name;
                let refNode: VElement & IVNodeMethod = <any>refInfo.node;
                let p = <VElement & IVNodeMethod>refNode.parentNode;
                p.insertBefore($$$(name, ENodeType.Member), refNode);
                p.removeChild(refNode);
                names.push(name);
                propertys.push(name + ':' + toClassName(refNode));
            }
        }
        function setPropertyInitScript(name:string,node:VMElement.VHtmlElement){
            propertyInitScript[name] = `this.${name}=<any>$$$${
                        node.toCreateJS()
                        };
            `+ getAttrAndChildsJS(name, node);
        }
        //生成代码
        for (const info of refInfo.data) {
            if (info.refs.length > 1) {
                //缓存parent;
                let refParent = info.refParent;
                for (const ref of info.refs) {
                    setPropertyInitScript(ref.name,ref.node);
                }
                let p = refParent.parentNode;
                if (p) {
                    setPropertyInitScript(RefInfo.getRefParentName(info.refs),refParent);
                }
            } else {
                //只拆一次
                let refInfo = info.refs[0];
                setPropertyInitScript(refInfo.name,refInfo.node);
            }
        }
        let topsJS: string[] = [];
        let topsType: string[] = [];
        for (const top of tops) {
            topsJS.push(top.toJSString(16));
            topsType.push(toClassName(top));
        }
        let domInitScript: string = '';
        for (let i = names.length - 1; i >= 0; i--) {
            let name = names[i];
            domInitScript += '\n            ' + propertyInitScript[name];
        }

        if (topsJS.length > 0) {
            propertys.push('tops:[' + topsType.join('\n,') + '];');
            domInitScript += `
            push.call(this.tops,<any>[
                    ${topsJS.join(',\n                    ')}
            ]);`;
        }
        let propertyInfo: string = propertys.join(';\n        ');
        let varInfo: string = vars.join(';\n            ');
        fs.writeFileSync(path.replace(/View\.html$/, 'View.ts'), getViewString(className, propertyInfo, varInfo, domInitScript, scriptFunctions));

        //mixin .css  to  变量
    }

    function getMakeClassError(path: string, node: IComment, message: string, state: ITreeEachState<INode>): string {
        let stack = state.stack;
        let strStack = '    at ' + path + '\n';
        for (let i = 0; i < stack.length; i += 2) {
            let arr: INode[] = <INode[]>stack[i];
            let index: number = <number>stack[i + 1];
            let info: string[] = [];
            strStack = '    at childNodes.' + index + ':' + arr[index].nodeName + '\n' + strStack;
        }
        strStack = '    at childNodes.' + state.currentIndex + ':' + node.data + '\n' + strStack;

        return 'Error:' + message + '\n' + strStack;
    }

}