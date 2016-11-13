
/// <reference path='VNode.ts'/>
abstract class VElement extends VNode{
    
    attributes:INamedNodeMap=new INamedNodeMap;
    style: VStyle=new VStyle(this);
    children=new VHTMLCollection();
    
    removeAttribute( name: string): void {
        this.attributes.removeNamedItem(name);
    }
    removeAttributeNode(item: Object): void {
        this.attributes.removeNamedItem(item);
    }
    hasAttribute( name: string): boolean {
        return this.attributes.indexOfName(name) !== -1;
    }
    setAttribute(this: VElement&IVNodeMethod, name: string, value: string): VElement&IVNodeMethod {
        if (name && !emptyTextNodeRE.test(name)) {
            this.attributes.setNamedItem(new IAttr(name, value));
            return <any>getBind(this, this.setAttribute);
        } else {
            return this;
        }
    }
    _(name: string, value?: string): VNode&IVNodeMethod | null {
        if (name) {
            return this.setAttribute.call(this, name, value);
        } else {
            return this.parentNode;
        }
    }
    getAttribute( name: string):string|null {
        let item = this.attributes.getNamedItem(name);
        if (item) {
            return item.value;
        } else {
            return null;
        }
    }
    set innerHTML(this: VElement&IVNodeMethod, s: string) {
        this.children.length = 0;
        this.childNodes.length = 0;
        if (this.nodeName in stringNode) {
            this.appendChild(VNodeHelp(s, 3));
        } else {
            VDOM(s, this);
        }
    }
    get innerHTML(this: VElement&IVNodeMethod):string {
        let
            cs = this.childNodes,
            data = [];
        if (cs) {
            for (let i = 0; i < cs.length; i++) {
                data.push((<VNode>cs[i]).getData());
            }
        }
        return data.join('');
    }
    removeChild(this:  VElement&IVNodeMethod, vNode: VNode&IVNodeMethod): VNode&IVNodeMethod {
        if (!vNode || this.childNodes.length === 0) {
            return vNode;
        }
        removeItem(this.childNodes, vNode);
        if(vNode instanceof VElement){
            removeItem(this.children, vNode);
        }
        vNode.parentNode = null;
        return vNode;
    }

    toHTMLString(): string[] {
        let
            ret: string[] = [],
            sAttr = '',
            arrAttr = [],
            attr = this.attributes
        for (let i = 0; i < attr.length; i++) {
            if (attr[i].value) {
                arrAttr.push(attr[i].name + '="' + attr[i].value + '"');
            } else {
                arrAttr.push(attr[i].name);
            }
        }
        if (arrAttr.length > 0) {
            sAttr = ' ' + arrAttr.join(' ');
        }
        let lowCaseName=this.nodeName.toLowerCase();
        ret.push(`<${lowCaseName}${sAttr}>`);
        if (!this.vmData.closeSelf && this.vmData.isClose) {
            ret.push(`</${lowCaseName}>`);
        }
        return ret;
    }
    onpointercancel: (this: this, ev: PointerEvent) => any;
    onpointerdown: (this: this, ev: PointerEvent) => any;
    onpointerenter: (this: this, ev: PointerEvent) => any;
    onpointerleave: (this: this, ev: PointerEvent) => any;
    onpointermove: (this: this, ev: PointerEvent) => any;
    onpointerout: (this: this, ev: PointerEvent) => any;
    onpointerover: (this: this, ev: PointerEvent) => any;
    onpointerup: (this: this, ev: PointerEvent) => any;
    onwheel: (this: this, ev: WheelEvent) => any;

}
