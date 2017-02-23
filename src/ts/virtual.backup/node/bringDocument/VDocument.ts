/// <reference path='../../element/bringDocument/VBodyElement.ts'/>
/// <reference path='../../element/bringDocument/VHeadElement.ts'/>
/// <reference path='../../element/bringDocument/VHTMLElement.ts'/>
/// <reference path='../VDocumentType.ts'/>
/// <reference path='../VDocument.ts'/>
namespace VMDOM{
    let VExConstructor=VMDOM.VDocument;
    let VEx=VExConstructor.prototype;
    delete VExConstructor.prototype;
    export interface VDocument{
        scripts:VMDOM.VScriptElement[]
        body:VMDOM.VBodyElement|null
        head:VMDOM.VHeadElement|null
        doctype:VMDOM.VDocumentType|null
        documentElement:VMDOM.VHTMLElement|null
        parentNode:null
        createElement:IVNodeMethod
        createText():VMDOM.VText
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
        this.doctype=null;
        this.vmData.document=this;
        this.createElement=$$$;
    }
    VMDOM.VDocument.prototype = VEx;
}