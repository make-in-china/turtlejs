
/// <reference path="../../core/node.ts"/>
interface VNodeNames{
    "script":VMDOM.VScriptElement
}

namespace VMDOM{
    @mergeClass({src:'',type:'',charset:'',async:'',defer:'',crossOrigin:'',event:'',integrity:''})
    export class  VScriptElement extends VHtmlElement{
        nodeName:"SCRIPT"="SCRIPT";
        src:string
        type:string
        charset:string
        async:string
        defer:string
        crossOrigin:string
        event:string
        integrity:string
        constructor(){
            super();
            this.vmData.$beforeSetInDOM.on((node,parent,v)=>{
                let document=v;
                if(document){
                    //不是从dom里删除
                    if(node.vmData.document){
                        if(document!==node.vmData.document){
                            //换一个dom
                            document.scripts.push(this);
                        }else{
                            //同一个dom换位置
                            return;
                        }
                    }else{
                        //插入到新的dom里
                        document.scripts.push(this);
                        return;
                    }
                }else if(!node.vmData.document){
                    return;    
                // }else{
                    //从dom里删除
                }
                //从dom里删除
                document=node.vmData.document
                let idx=document.scripts.indexOf(this);
                document.scripts.splice(idx,1);
            });
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
            return `(${s},${ENodeType.Text}).$`;
        }
        onload: (this: HTMLElement, ev: Event) => any;
    }
    
}