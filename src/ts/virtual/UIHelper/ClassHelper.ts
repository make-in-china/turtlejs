
/// <reference path='../../part/PartParam.ts'/>
namespace UIHelper {

    
    function getAttrAndChildsJS(name: string, refNode: VMDOM.VHtmlElement): string {
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
        let tops: VMDOM.VNode[];
        let chds: VMDOM.VNode[] | IArray;
        if (isArray(dom)) {
            chds = dom;
            tops = dom
        } else {
            chds = dom.childNodes;
            tops = [dom];
        }

        let refInfo = new RefInfo;
        let scripts: VMDOM.VScript[] = [];
        treeEach(<VMDOM.VNode[]>chds, "childNodes", (node, state) => {
            if (node instanceof VMDOM.VComment) {
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
                    }
                } catch (e) {
                    throw getMakeClassError(path, node, (<Error>e).message, state);
                }
                return eTreeEach.c_noIn;
            }else if(node instanceof VMDOM.VOrder){
                
                try {
                    let order=Order.parseOrder(node);
                } catch (e) {
                    throw getMakeClassError(path, node, (<Error>e).message, state);
                }
            }
        });

        let paramInfos:PartParam[]=[];
        let props:string[]=[];
        let defaultValues:string[]=[];
        treeEach(<VMDOM.VNode[]>chds, "childNodes", (node, state) => {

            if (node instanceof VMDOM.VHtmlElement) {
                let directives=node.vmData.directives;
                if(directives){
                    for(const directive of directives){
                        if(directive.defaultValue){
                            props.push(directive.name+'?:string');
                            defaultValues.push(`'${directive.name}'`);
                        }else{
                            props.push(directive.name+':string');
                        }
                    }
                }
                //解析ref
                let v = node.getAttribute("ref");
                if (v) {
                    refInfo.push(v, <any>node);
                    node.removeAttribute("ref");
                }
                //解析class
            } else if (node instanceof VMDOM.VScript) {
                scripts.push(node);
            }
        });
        let functionHash:{[index:string]:VMDOM.VScript}={}
        let scriptFunctions: string = '';
        let index=0;
        for (let i = scripts.length - 1; i >= 0; i--) {
            let script = scripts[i];
            let p = <VMDOM.VElement & IVNodeMethod>scripts[i].parentNode;
            let name = 'order' + index;
            let hashScript=functionHash[script.toFunction()];
            if(hashScript){
                script.propertyName=hashScript.propertyName;
                // scriptFunctions += '\n    let ' + name+'='+hashScript.propertyName;
            }else{
                functionHash[script.toFunction()]=script;
                script.propertyName = name;
                scriptFunctions += '\n    ' + script.toFunction();
                index++;
            }
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
                    let refNode: VMDOM.VElement & IVNodeMethod = ref.node;
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
                let refNode: VMDOM.VElement & IVNodeMethod = <any>refInfo.node;
                let p = <VMDOM.VElement & IVNodeMethod>refNode.parentNode;
                p.insertBefore($$$(name, ENodeType.Member), refNode);
                p.removeChild(refNode);
                names.push(name);
                propertys.push(name + ':' + toClassName(refNode));
            }
        }
        function setPropertyInitScript(name:string,node:VMDOM.VHtmlElement){
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
        let propsInfo:string=props.join('\n        ');
        let defaultValuesInfo:string=defaultValues.join(',');
        fs.writeFileSync(path.replace(/View\.html$/, 'View.ts'), getViewString(className, propertyInfo, varInfo, domInitScript, scriptFunctions,propsInfo,defaultValuesInfo));

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