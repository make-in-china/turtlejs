
/// <reference path='../VHeadElement.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VHeadElement;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VHeadElement = <any>function (this: VHeadElement) {
        VExConstructor.apply(this);
        this.vmData.$beforeSetInDOM.on((node: any, parent, document) => {
            if (document) {
                if (this.vmData.document && this.vmData.document !== document) {
                    throw new Error('Can\'t remove head');
                }
                if (parent&&parent.nodeName === "HTML") {
                    if (document.head === null) {
                        document.head = node;
                    } else if (document.head !== node) {
                        //合并head
                        debugger;
                    }
                } else {
                    throw new Error('Head only can put in HTML');
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