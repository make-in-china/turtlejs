
/// <reference path='../VHeadElement.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VHeadElement;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VHeadElement = <any>function (this: VHeadElement) {
        VExConstructor.apply(this);
        this.vmData.$setParentNode.on((node: any, parent) => {
            if (parent && parent.nodeName === "HTML") {

            } else {
                throw new Error('Head only can put in HTML');
            }
        });
        this.vmData.$beforeSetInDOM.on((node: any, parent, v) => {
            debugger;
            let document = v;
            if (document) {
                if (this.vmData.document && this.vmData.document !== document) {
                    throw new Error('Can\'t remove head');
                }
                if (parent.nodeName === "HTML") {
                    if (document.head === null) {
                        document.head = node;
                    } else if (document.head !== node) {
                        //合并head
                        debugger;
                    }
                }
            } else {
                if (this.vmData.document) {
                    throw new Error('Can\'t remove head');
                }
            }
        });
    }
    VMDOM.VHeadElement.prototype = VEx;

}