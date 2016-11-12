
/// <reference path='VNode.ts'/>
/// <reference path='../lib/Encode.ts'/>
abstract class VHTMLElement extends VElement{
    version:string
    cloneNode(this:VHTMLElement&IVNodeMethod): VHTMLElement&IVNodeMethod {
        return <VHTMLElement&IVNodeMethod>VDOM(this.getData());
    }
    getData():string{
        return this.outerHTML;
    }
    // innerText: string
    get innerText(this:VHTMLElement&IVNodeMethod):string {
        let s = "";
        let chdns = this.childNodes;
        for (let i = 0; i < chdns.length; i++) {
            let cd:VNode=<VNode>chdns[i];
            if(cd instanceof VHTMLElement){
                s += encodeHTML(cd.innerText);
            }else{
                s +=cd.getData();
            }
        }
        return s;
    }
    set innerText(this:VHTMLElement&IVNodeMethod, s: string) {
        let chds= this.children;
        for (let i=chds.length-1;i>=0;i--) {
            delete chds[i];
        }
        let chdns = this.childNodes;
        for (let i=chdns.length-1;i>=0;i--) {
            delete chdns[i];
        }
        this.appendChild(VNodeHelp(decodeHTML(s), 3));
    }
    __domNode__:HTMLElement;
    protected doBaseToDOM():HTMLElement{
        let elem= document.createElement(this.nodeName);
        let attrs = this.attributes;
        for (let j = 0; j < attrs.length; j++) {
            (<any>elem).setAttribute(attrs[j].name, attrs[j].value);
        }
        let arr = this.__events__;
        for (let j in arr) {
            let e = arr[j];
            elem.addEventListener(e[0], e[1], e[2]);
        }
        let obj = this.__;
        if (obj) {
            for (let j in obj) {
                elem[j] = obj[j];
            }
        }
        return elem;
    }
    protected doToDOM(): Node {
        let elem=this.doBaseToDOM();
        let chds = this.childNodes;
        for (let j = 0; j < chds.length; j++) {
            (<VNode>chds[j]).toDOM();
        }
        return elem;
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{
        
        this.createBridgeFunction("setAttribute");
        this.createBridgeFunction("hasAttribute");
        this.createBridgeFunction("removeAttribute");
        this.createBridgeFunction("removeAttributeNode");
        this.createBridgeFunction("toString");
        this.createBridgeFunction("addEventListener");
        this.createBridgeFunction("removeEventListener");
        
        this.createHomologyFunction("insertBefore");
        this.createHomologyFunction("insertBefore2");
        this.createHomologyFunction("appendChild");
        this.createHomologyFunction("removeChild");

        this.setBridgeGet("style");
        this.setBridgeGet("classList");
        this.setBridgeGet("attributes");

        this.setBridgeGet("offsetTop");
        this.setBridgeGet("offsetLeft");
        this.setBridgeGet("offsetWidth");
        this.setBridgeGet("offsetHeight");
    }
    outerHTML:string
    outerText
}