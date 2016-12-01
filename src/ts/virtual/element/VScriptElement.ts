/// <reference path="../node/Attribute_Property.ts"/>
/// <reference path="../../core/node.ts"/>
interface IVNodeMethod{
    (nodeName: "script", nodeType?: 1): VMElement.VScriptElement&IVNodeMethod
}

namespace VMElement{
    export class  VScriptElement extends VHtmlElement{
        nodeName="SCRIPT";
        src:string
        type:string
        charset:string
        async:string
        defer:string
        crossOrigin:string
        event:string
        integrity:string
        cloneNode(deep:boolean=false):VScriptElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["src","type","charset","async","defer","crossOrigin","event","integrity"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VScriptElement&IVNodeMethod>newNode;
        }
        toJS(space:number=0):string{
            let sSpace=(new Array(space+1)).join(" ");
            let sFn='\n'+sSpace+`("${this.nodeName}")`;
            let sAttr="";
            let sInner="";
            let attrs = this.attributes;
            if (attrs.length > 0) {
                sAttr = '';
                for (let i = 0; i < attrs.length; i++) {
                    sAttr += '._("' + attrs[i].name;
                    if (attrs[i].value) {
                        sAttr += '","' + attrs[i].value + '")';
                    } else {
                        sAttr += '")';
                    }
                }
            }
            if(this.vmData.closeSelf){
                sInner='.$';
            }else{
                sInner+=this.toScriptText();
                if(this.parentNode){
                    sInner+='.$';
                }
            }
            return sFn+sAttr+sInner;
        }
        private toScriptText():string{
            let s ='()=>{'+ nodesToString(<any>this.childNodes) +'}';
            return `(${s},3).$`;
        }
    }
    VAP.decorate(VScriptElement,["src","type","charset","async","defer","crossOrigin","event","integrity"]);
}