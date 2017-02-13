
/// <reference path='VNode.ts'/>
/// <reference path='VElement.ts'/>
/// <reference path='../../lib/Encode.ts'/>
/// <reference path='../../core/Node.ts'/>
/// <reference path='Lib.ts'/>
interface VNodeNames{
    'html': VMDOM.VHtmlElement
}
interface IVNodeMethod{
    (nodeName: string, nodeType?: ENodeType.Element): VMDOM.VHtmlElement&IVNodeMethod;
}
function isVHTMLElement(node: VMDOM.VNode): node is VMDOM.VHtmlElement {
    return node.nodeType === ENodeType.Element
}
namespace VMDOM{
    @mergeClass({title:'',lang:'',accessKey:'',webkitdropzone:'',id:''})
    export class VHtmlElement extends VElement{
        nodeType:ENodeType.Element=ENodeType.Element;
        nodeName="HTML"
        // version:string
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        cloneNode(deep:boolean=false): VHtmlElement&IVNodeMethod {
            let newNode=$$$('html');
            
            // newNode.version=this.version;
            for(const name of ["title", "lang", "accessKey", "webkitdropzone", "id"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
            let attributes=this.attributes;
            for(let i=0;i<attributes.length;i++){
                newNode.setAttribute( attributes[i].name, attributes[i].value);
            }
            if(deep){
                let childNodes=this.childNodes;
                for(let i=0;i<childNodes.length;i++){
                    newNode.appendChild((<VNode>childNodes[i]).cloneNode(deep));
                }
            }
            return newNode;
        }
        getData():string{
            return this.outerHTML;
        }
        get innerText(this:VHtmlElement&IVNodeMethod):string {
            let s = "";
            let chdns = this.childNodes;
            for (let i = 0; i < chdns.length; i++) {
                let cd:VNode=<VNode>chdns[i];
                if(cd instanceof VHtmlElement){
                    s += encodeHTML(cd.innerText);
                }else{
                    s +=cd.getData();
                }
            }
            return s;
        }
        set innerText(this:VHtmlElement&IVNodeMethod, s: string) {
            let chds= this.children;
            for (let i=chds.length-1;i>=0;i--) {
                delete chds[i];
            }
            let chdns = this.childNodes;
            for (let i=chdns.length-1;i>=0;i--) {
                delete chdns[i];
            }
            this.appendChild($$$(decodeHTML(s), 3));
        }
        insertBefore(newNode:  VNode&IVNodeMethod, refChild:  VNode&IVNodeMethod):  VNode&IVNodeMethod {
            //添加到childNodes里
            let chds = this.childNodes;
            let idx:number = indexOf.call(chds,refChild);
            if (idx === -1) {
                return newNode;
            }
            let p2 = newNode.parentNode;
            if (p2) {
                p2.removeChild(newNode);
            }
            splice.call(chds,idx, 0, newNode);

            newNode.parentNode = <any>this;

            //添加到children里
            if (idx >= chds.length) {
                push.call(chds,newNode);
            } else {
                let chds = this.children;
                // for (let i = idx; i < chds.length; i++) {
                    // if ((<VElem<IVNodeMethod>>chds[i]).nodeType === 1) {
                        splice.call(<VNode[]><any>chds,idx, 0,newNode);
                        return newNode;
                    // }
                // }
                // push.call(chds,newNode);
            }
            return newNode;
        }
        protected doAppendChild(vNode: VNode&IVNodeMethod):VNode & IVNodeMethod {

            Array.prototype.push.call(this.childNodes,vNode);
            let p = vNode.parentNode;
            if (p) {
                p.removeChild(vNode);
            }
            vNode.parentNode = <any>this;
            if (isVHTMLElement(vNode)) {
                push.call(this.children,vNode);
            }
            return vNode;
        }
        protected doBaseToDOM():HTMLElement{
            let elem= document.createElement(this.nodeName);
            let attrs = this.attributes;
            for (let j = 0; j < attrs.length; j++) {
                (<any>elem).setAttribute(attrs[j].name, attrs[j].value);
            }
            let arr = this.vmData.events;
            for (let j in arr) {
                let e = arr[j];
                elem.addEventListener(e[0], <any>e[1], e[2]);
            }
            let obj = this.vmData.__;
            if (obj) {
                for (let j in obj) {
                    elem[j] = obj[j];
                }
            }
            
            this.vmData.domNode = elem;
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
        toCreateJS(space:number=0):string{
            return (new Array(space+1)).join(" ")+`("${this.nodeName.toLowerCase()}")`;
        }
        childNodesToJS(space:number=0):string{
            let sInner="";
            if(this.vmData.closeSelf){
                sInner='.$';
            }else{
                //遍历子节点
                let chds = this.childNodes;
                if (chds.length > 0) {
                    for (let i = 0; i < chds.length; i++) {
                        sInner +='\n'+(<VNode>chds[i]).toJS(space+4);
                    }
                }
                if(this.parentNode){
                    sInner+='.$';
                } 
            }
            return sInner;
        }
        attributesToJS():string{
            
            let sAttr:string= '';
            let attrs=this.attributes;
            if (attrs.length > 0) {
                for (let i = 0; i < attrs.length; i++) {
                    sAttr += '._("' + attrs[i].name;
                    if (attrs[i].value) {
                        sAttr += '","' + attrs[i].value + '")';
                    } else {
                        sAttr += '")';
                    }
                }
            }
            return sAttr;
        }
        toJS(space:number=0):string{
            return this.toCreateJS(space)+this.attributesToJS()+this.childNodesToJS(space);
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
            
            debugger;




            this.setBridgeGet("style");
            this.setBridgeGet("classList");
            this.setBridgeGet("attributes");

            this.setBridgeGet("offsetTop");
            this.setBridgeGet("offsetLeft");
            this.setBridgeGet("offsetWidth");
            this.setBridgeGet("offsetHeight");

            this.setBridgeGetSet("onwebkitfullscreenerror");
            this.setBridgeGetSet("onwebkitfullscreenchange");
            this.setBridgeGetSet("ontouchstart");
            this.setBridgeGetSet("ontouchmove");
            this.setBridgeGetSet("ontouchend");
            this.setBridgeGetSet("ontouchcancel");
            this.setBridgeGetSet("onmspointerup");
            this.setBridgeGetSet("onmspointerover");
            this.setBridgeGetSet("onmspointerout");
            this.setBridgeGetSet("onmspointermove");
            this.setBridgeGetSet("onmspointerleave");
            this.setBridgeGetSet("onmspointerenter");
            this.setBridgeGetSet("onmspointerdown");
            this.setBridgeGetSet("onmspointercancel");
            this.setBridgeGetSet("onmslostpointercapture");
            this.setBridgeGetSet("onmsinertiastart");
            this.setBridgeGetSet("onmsgotpointercapture");
            this.setBridgeGetSet("onmsgesturetap");
            this.setBridgeGetSet("onmsgesturestart");
            this.setBridgeGetSet("onmsgesturehold");
            this.setBridgeGetSet("onmsgestureend");
            this.setBridgeGetSet("onmsgesturedoubletap");
            this.setBridgeGetSet("onmsgesturechange");
            this.setBridgeGetSet("onlostpointercapture");
            this.setBridgeGetSet("ongotpointercapture");
            this.setBridgeGetSet("oncommand");
            this.setBridgeGetSet("onariarequest");
            this.setBridgeGetSet("onwheel");
            this.setBridgeGetSet("onpointerup");
            this.setBridgeGetSet("onpointerover");
            this.setBridgeGetSet("onpointerout");
            this.setBridgeGetSet("onpointermove");
            this.setBridgeGetSet("onpointerleave");
            this.setBridgeGetSet("onpointerenter");
            this.setBridgeGetSet("onpointerdown");
            this.setBridgeGetSet("onpointercancel");
        
            
        }
        get outerHTML() {
            let
                xmlNode = this.toHTMLString(),
                chds = this.childNodes,
                data = [xmlNode[0]];

            for (let i = 0; i < chds.length; i++) {
                let chn:VNode=<VNode>chds[i];
                if(isVHTMLElement(chn)){
                    data.push(chn.outerHTML);
                }else{
                    data.push(chn.toHTMLString().join(''));
                }
            }
            if (xmlNode.length === 2) {
                data.push(xmlNode[1]);
            }
            return data.join('');
        }
        set outerHTML(this:VHtmlElement&IVNodeMethod,v:string){
            let p=this.parentNode;
            if(!p){
                throw new Error("This element has no parent node.");
            }
            let vNodes=VDOM.parseStructor(v);
            if(!isArray(vNodes)){
                p.insertBefore(<VNode & IVNodeMethod>vNodes,this);
            }else{
                insertNodesBefore(this,<(VNode & IVNodeMethod)[]>vNodes);
            }
            p.removeChild(this);
        }
        get outerText():string{
            return this.innerText;
        }
        set outerText(this:VHtmlElement&IVNodeMethod,v:string){
            let p=this.parentNode;
            if(!p){
                throw new Error("This element has no parent node.");
            }
            let vText=$$$(v,ENodeType.Text);
            p.insertBefore(vText,this);
            p.removeChild(this);
        }
    }
}