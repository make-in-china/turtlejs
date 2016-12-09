
/// <reference path='BaseVNode.ts'/>
/// <reference path='VDomhelperElement.ts'/>
interface IMember {
    index: number
    node: VNode & IVNodeMethod
    action: string
    length: number
    textNodeStart: number
    htmlNodeStart: number
    htmlNodeNameStart: number
    attrStart: number
    attrNameEnd: number
    equlIndex: number
    stringStart: number
    stringStartChar: string
    betweenSpaceStart: number
    stringNodeStart: number
    stringNodeRegExp: RegExp | null
    stringNodeKeyLength: number
    commentStart: number
}
interface IVDOMBuilder {
    (html: string, vNode?: undefined): VNode & IVNodeMethod | (VNode & IVNodeMethod)[]
    (html: string, vNode: VNode & IVNodeMethod): VNode & IVNodeMethod
}

abstract class VDOM {
    protected static htmlwordRE = /[a-zA-Z\/\!]/
    protected static ''(html: string, m: IMember) {
        let nodeName = m.node.nodeName;
        if (m.node.vmData.closeSelf) {
            m.node = <any>m.node.parentNode;
            m.action = 'textNode';
            m.textNodeStart = m.index;
        } else if (stringNode.hasOwnProperty(nodeName)) {
            m.action = 'stringNode';
            m.stringNodeRegExp = stringNode[nodeName];
            m.stringNodeKeyLength = nodeName.length + 2;
            m.stringNodeStart = m.index;
            return;
        } else {
            m.action = 'textNode';
            m.textNodeStart = m.index;
        }
    }
    protected static textNode(html: string, m: IMember) {
        let data;
        switch (html[m.index]) {
            case '<':
                if (m.index < m.length + 1 && this.htmlwordRE.test(html[m.index + 1])) {

                    if (m.textNodeStart !== m.index) {
                        data = html.substring(m.textNodeStart, m.index);
                        if (!emptyTextNodeRE.test(data)) {
                            m.node(data, 3);
                        }
                        m.textNodeStart = 0;
                    }
                    m.htmlNodeStart = m.index;
                    m.index++;
                    m.action = 'htmlNode';
                } else {
                    m.index++;
                }
                break;
            default:
                m.index++;
        }
    }
    protected static createHTMLNode(html: string, m: IMember) {
        m.htmlNodeStart = 0;
        if (m.htmlNodeNameStart > 0) {
            //无属性标签
            let nodeName = html.substring(m.htmlNodeNameStart, m.index);
            m.node = m.node(nodeName);
            m.htmlNodeNameStart = 0;
            m.index++;
        }
        m.action = '';

    }
    protected static setHTMLNodeClose(html: string, m: IMember) {
        let n: (VNode & IVNodeMethod) | null = m.node;
        let name = trim(html.substring(m.htmlNodeNameStart, m.index)).toUpperCase();
        while (n) {
            if (n.nodeName === name) {
                n.vmData.isClose = true;
                m.node = <any>n.parentNode;
                m.action = '';
                m.htmlNodeNameStart = 0;
                return;
            }
            n = n.parentNode;
        }
        throw new Error("Tag is not closed!");
        //console.log('Tag is not closed!', name,m.htmlNodeNameStart,html.substring(m.htmlNodeNameStart-20, m.index+20));

        //m.node(name, 8);
    }
    protected static setAttrStart(m) {
        m.action = 'attributes';
        m.attrStart = 0;
        m.attrNameEnd = 0;
        m.equlIndex = 0;
        m.stringStart = 0;
        m.stringStartChar = '';
    }
    protected static htmlNode(html: string, m: IMember) {
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
                } else if (m.length >= m.index + 1) {
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
    }
    protected static endXmlNode(html: string, m: IMember) {
        switch (html[m.index]) {
            case '>':
                this.setHTMLNodeClose(html, m);
                m.index++;
                break;
            default:
                m.index++;
        }
    }
    protected static comment(html: string, m: IMember) {
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
                    } else {
                        m.commentStart = m.index;
                        m.action = 'comment2';
                        m.index++;
                    }
                } else {
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
    }
    protected static comment2(html: string, m: IMember) {
        if (html[m.index] === '>') {
            let vNode = m.node(html.substring(m.commentStart, m.index), 8);
            vNode.vmData.doubleMinus = false;
            m.commentStart = 0;
            m.action = '';
        }
        m.index++;
    }
    protected static comment3(html: string, m: IMember) {
        if (html[m.index] === '-') {
            if (m.length >= m.index + 3) {
                if (html.substr(m.index + 1, 2) === '->') {
                    let vNode = m.node(html.substring(m.commentStart, m.index), 8);
                    vNode.vmData.doubleMinus = true;
                    m.commentStart = 0;
                    m.action = '';
                    m.index += 3;
                    return;
                }
            }
        }
        m.index++;
    }
    protected static attributes(html: string, m: IMember) {
        switch (html[m.index]) {
            case '/':
                if (m.length >= m.index + 2) {
                    if (html.substr(m.index + 1, 1) === '>') {
                        if (m.attrStart !== m.attrNameEnd) {
                            if (m.attrNameEnd === 0) {
                                m.attrNameEnd = m.index;
                            }
                            (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                        }
                        m.action = '';
                        m.index += 2;
                        break;
                    }
                }
                m.attrStart = m.attrNameEnd = 0;
                m.action = '';
                m.index++;
                break;
            case '>':
                if (m.attrStart !== m.attrNameEnd) {
                    if (m.attrNameEnd === 0) {
                        m.attrNameEnd = m.index;
                    }
                    (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                }
                m.attrStart = m.attrNameEnd = 0;
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
                } else if (m.equlIndex > 0) {
                    (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                    this.setAttrStart(m);
                } else if (m.attrNameEnd !== 0) {
                    (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                    this.setAttrStart(m);
                    m.attrStart = m.index;
                }
                m.index++;
        }
    }
    protected static attrValue(html: string, m: IMember) {
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
                (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                m.action = '';
                m.index++;
                break;
            case "/":
                if (m.length >= m.index + 2) {
                    if (html.substring(m.index + 1, 1) === '>') {
                        (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd));
                        m.action = '';
                        m.index += 2;
                        return;
                    }
                }
                m.index++
                break;
            default:
                m.action = 'atvbetweenSpace';
                m.betweenSpaceStart = m.index;
                m.index++;
        }
    }
    protected static atvbetweenSpace(html: string, m: IMember) {
        switch (html[m.index]) {
            case ' ':
                (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                this.setAttrStart(m);
                m.index++;
                break;
            case '>':
                (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                this.setAttrStart(m);
                break;
            case "/":
                if (m.length >= m.index + 2) {
                    (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.betweenSpaceStart, m.index));
                    if (html.substring(m.index + 1, 1) === '>') {
                        this.setAttrStart(m);
                        m.index++;
                        return;
                    }
                }
                m.index++
            default:
                m.index++;
        }
    }
    protected static atvstring(html: string, m: IMember) {
        switch (html[m.index]) {
            case '\\':
                m.index += 2;
                break;
            case m.stringStartChar:
                (<VElement & IVNodeMethod>m.node)._(html.substring(m.attrStart, m.attrNameEnd), html.substring(m.stringStart, m.index));
                this.setAttrStart(m);
                m.index++;
                break;
            default:
                m.index++;
        }
    }
    protected static stringNode(html: string, m: IMember) {
        if (html[m.index] === '<') {
            if (m.length >= m.index + m.stringNodeKeyLength + 1) {
                if (m.stringNodeRegExp && m.stringNodeRegExp.test(html.substr(m.index + 1, m.stringNodeKeyLength))) {
                    let s = html.substring(m.stringNodeStart, m.index);
                    if (!emptyTextNodeRE.test(s)) {
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
    }
    protected static stringNode2(html: string, m: IMember) {
        if (html[m.index] === '>') {
            m.action = '';
        }
        m.index++;
    }
    protected static checkEnd(html: string, m: IMember) {
        if (m.action === 'textNode') {
            if (m.textNodeStart !== m.index) {
                let data = html.substring(m.textNodeStart, m.index);
                if (!emptyTextNodeRE.test(data)) {
                    m.node(data, 3);
                }
                m.textNodeStart = 0;
            }
        } else if (m.action !== "") {
            console.log(m.action)
            debugger;
        }
    }
    protected static getInitData(vNode: VNode & IVNodeMethod | undefined, length: number): IMember {
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
    }
    static readonly parseStructor:IVDOMBuilder=function(html: string, vNode?: VNode & IVNodeMethod) {
        let m = this.getInitData(vNode, html.length);
        let parent = m.node;
        while (m.index < html.length) {
            this[m.action](html, m);
        }
        this.checkEnd(html, m);
        if (vNode) {
            return vNode;
        } else {
            let ret;
            if (parent.childNodes.length === 1) {
                ret = parent.childNodes[0];
                VNodeList.clear(parent.childNodes);
                return ret;
            } else {
                ret = slice.call(parent.childNodes);
                VNodeList.clear(parent.childNodes);
                return ret;
            }
        }
    };
}
let $$$: IVNodeMethod = VNodeHelp;
