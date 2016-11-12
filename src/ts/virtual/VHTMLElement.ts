
/// <reference path='VNode.ts'/>
/// <reference path='../lib/Encode.ts'/>
class VHTMLElement extends VElement{
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
    outerHTML:string
    outerText
}