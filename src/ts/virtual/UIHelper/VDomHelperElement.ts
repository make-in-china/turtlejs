interface IVNodeMethod{
    (nodeName: "domhelper", nodeType?: ENodeType.Element): VMElement.VDomhelperElement&IVNodeMethod;
}
namespace VMElement{
    export class VDomhelperElement extends VHtmlElement{
        nodeName="DOMHELPER"
    }
}