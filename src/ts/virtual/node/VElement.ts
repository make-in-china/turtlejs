
/// <reference path='VNode.ts'/>
interface VElementVMData extends VNodeVMData{
    events:[string, EventListenerOrEventListenerObject | undefined, boolean][]
}

namespace VMDOM{
    export abstract class VElement extends VNode{
        vmData:VElementVMData
        attributes:VNamedNodeMap=new VNamedNodeMap;
        style: VStyle=new VStyle(this);
        children=new VHTMLCollection();
        constructor(){
            super();
            this.vmData.events=[];
        }
        removeAttribute( name: string): void {
            this.attributes.removeNamedItem(name);
        }
        removeAttributeNode(item: Object): void {
            this.attributes.removeNamedItem(item);
        }
        hasAttribute( name: string): boolean {
            return this.attributes.indexOfName(name) !== -1;
        }
        setAttribute(name: string, value: string): VElement&IVNodeMethod {
            if (name && !emptyTextNodeRE.test(name)) {
                this.attributes.setNamedItem(new IAttr(name, value));
                return <any>getBind(this, this.setAttribute);
            } else {
                return <any>this;
            }
        }
        /**添加attribute */
        _(this:VElement&IVNodeMethod,name:string,value?:string): VElement&IVNodeMethod{
            this.setAttribute(name, value?value:"");
            return this;
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
                this.appendChild($$$(s, 3));
            } else {
                VDOM.parseStructor(s, this);
            }
        }
        get innerHTML(this: VElement&IVNodeMethod):string {
            let cs = this.childNodes;
            if (cs.length>0) {
                let data:string[] = [];
                for (let i = 0; i < cs.length; i++) {
                    push.apply(data,(<VNode>cs[i]).toHTMLString());
                }
                return data.join('');
            }
            return "";
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
                arrAttr:string[] = [],
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
            let cs = this.childNodes;
            if (cs.length>0) {
                let data:string[] = [];
                for (let i = 0; i < cs.length; i++) {
                    push.apply(ret,(<VNode>cs[i]).toHTMLString());
                }
            }
            if (!this.vmData.closeSelf && (this.vmData.isClose||!this.parentNode)) {
                ret.push(`</${lowCaseName}>`);
            }
            return ret;
        }
        onariarequest: (this: IElement, ev: Event) => any;
        oncommand: (this: IElement, ev: Event) => any;
        ongotpointercapture: (this: IElement, ev: PointerEvent) => any;
        onlostpointercapture: (this: IElement, ev: PointerEvent) => any;
        onmsgesturechange: (this: IElement, ev: MSGestureEvent) => any;
        onmsgesturedoubletap: (this: IElement, ev: MSGestureEvent) => any;
        onmsgestureend: (this: IElement, ev: MSGestureEvent) => any;
        onmsgesturehold: (this: IElement, ev: MSGestureEvent) => any;
        onmsgesturestart: (this: IElement, ev: MSGestureEvent) => any;
        onmsgesturetap: (this: IElement, ev: MSGestureEvent) => any;
        onmsgotpointercapture: (this: IElement, ev: MSPointerEvent) => any;
        onmsinertiastart: (this: IElement, ev: MSGestureEvent) => any;
        onmslostpointercapture: (this: IElement, ev: MSPointerEvent) => any;
        onmspointercancel: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerdown: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerenter: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerleave: (this: IElement, ev: MSPointerEvent) => any;
        onmspointermove: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerout: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerover: (this: IElement, ev: MSPointerEvent) => any;
        onmspointerup: (this: IElement, ev: MSPointerEvent) => any;
        ontouchcancel: (ev: TouchEvent) => any;
        ontouchend: (ev: TouchEvent) => any;
        ontouchmove: (ev: TouchEvent) => any;
        ontouchstart: (ev: TouchEvent) => any;
        onwebkitfullscreenchange: (this: IElement, ev: Event) => any;
        onwebkitfullscreenerror: (this: IElement, ev: Event) => any;
    }
}