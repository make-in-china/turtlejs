
interface VNodeNames{
    domhelper:VMDOM.VDomhelperElement;
}

const enum ENodeType{
    DOMHELPER=104
}
namespace VMDOM{
    @register('#domhelper', ENodeType.DOMHELPER)
    export class VDomhelperElement extends VHtmlElement{
        nodeName="DOMHELPER"
    }
}