
/// <reference path='VNode.ts'/>
interface VElementVMData extends VNodeVMData{
    events:[string, EventListenerOrEventListenerObject | undefined, boolean][]
}
abstract class VElement extends VNode{
    vmData:VElementVMData
    attributes:INamedNodeMap=new INamedNodeMap;
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
    _(this:VElement&IVNodeMethod,name: string, value?: string): VElement&IVNodeMethod{
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
        if (!this.vmData.closeSelf && (this.vmData.isClose||!this.parentNode)) {
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

    onariarequest: (this: this, ev: AriaRequestEvent) => any;
    oncommand: (this: this, ev: CommandEvent) => any;
    ongotpointercapture: (this: this, ev: PointerEvent) => any;
    onlostpointercapture: (this: this, ev: PointerEvent) => any;
    onmsgesturechange: (this: this, ev: MSGestureEvent) => any;
    onmsgesturedoubletap: (this: this, ev: MSGestureEvent) => any;
    onmsgestureend: (this: this, ev: MSGestureEvent) => any;
    onmsgesturehold: (this: this, ev: MSGestureEvent) => any;
    onmsgesturestart: (this: this, ev: MSGestureEvent) => any;
    onmsgesturetap: (this: this, ev: MSGestureEvent) => any;
    onmsgotpointercapture: (this: this, ev: MSPointerEvent) => any;
    onmsinertiastart: (this: this, ev: MSGestureEvent) => any;
    onmslostpointercapture: (this: this, ev: MSPointerEvent) => any;
    onmspointercancel: (this: this, ev: MSPointerEvent) => any;
    onmspointerdown: (this: this, ev: MSPointerEvent) => any;
    onmspointerenter: (this: this, ev: MSPointerEvent) => any;
    onmspointerleave: (this: this, ev: MSPointerEvent) => any;
    onmspointermove: (this: this, ev: MSPointerEvent) => any;
    onmspointerout: (this: this, ev: MSPointerEvent) => any;
    onmspointerover: (this: this, ev: MSPointerEvent) => any;
    onmspointerup: (this: this, ev: MSPointerEvent) => any;
    ontouchcancel: (ev: TouchEvent) => any;
    ontouchend: (ev: TouchEvent) => any;
    ontouchmove: (ev: TouchEvent) => any;
    ontouchstart: (ev: TouchEvent) => any;
    onwebkitfullscreenchange: (this: this, ev: Event) => any;
    onwebkitfullscreenerror: (this: this, ev: Event) => any;
}
