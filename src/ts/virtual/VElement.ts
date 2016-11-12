
/// <reference path='VNode.ts'/>
class VElement extends VNode{
    children=new VHTMLCollection();
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
}
