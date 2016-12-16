interface IVNodeMethod{
    (nodeName: "domhelper", nodeType?: ENodeType.Element): VMDOM.VDomhelperElement&IVNodeMethod;
}
namespace VMDOM{
    export class VDomhelperElement extends VHtmlElement{
        nodeName="DOMHELPER"
    }
}