interface VNodeNames{
    a:VMDOM.VAElement
}

namespace VMDOM{
    @mergeClass({target:'',download:'',ping:'',rel:'',hreflang:'',type:'',coords:'',charset:'',name:'',rev:'',shape:'',href:''})
    export class VAElement extends VHTMLElement{
        nodeName:"A"="A"
        target:string
        download:string
        ping:string
        rel:string
        hreflang:string
        type:string
        coords:string
        charset:string
        name:string
        rev:string
        shape:string
        href:string
    }
}
