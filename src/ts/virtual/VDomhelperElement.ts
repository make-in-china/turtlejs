interface IVNodeMethod{
    (nodeName: "domhelper", nodeType?: 1): VMElement.VDomhelperElement&IVNodeMethod;
}
namespace VMElement{
    export class VDomhelperElement extends VHtmlElement{
        nodeName="DOMHELPER"
    }
}