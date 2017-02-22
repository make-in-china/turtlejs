/// <reference path='../VDocument.ts'/>
namespace VMDOM{
    let VExConstructor=VMDOM.VDocument;
    let VEx=VExConstructor.prototype;
    delete VExConstructor.prototype;
    export interface VDocument{
        scripts:VMDOM.VScriptElement[]
        body:VMDOM.VBodyElement|null
        head:VMDOM.VHeadElement|null
        parentNode:null
    }
    Object.defineProperty(VEx,'parentNode',{
        get:function(){
            return null;
        }
    })
    VMDOM.VDocument=<any>function(this:VDocument){
        VExConstructor.apply(this);
        this.scripts=[];
        this.body=null;
        this.head=null;
        this.vmData.document=this;
    }
    VMDOM.VDocument.prototype = VEx;
    
}