
/// <reference path='../VHtmlElement.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VHtmlElement;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VHtmlElement = <any>function (this: VHtmlElement) {
        VExConstructor.apply(this);
        document.documentElement = null;
        this.vmData.$beforeSetInDOM.on((node: any, parent, document) => {
            if (document) {
                if (this.vmData.document && this.vmData.document !== document) {
                    throw new Error('Can\'t remove html');
                }
                if (parent&&parent.nodeName === "#document") {
                    if (document.documentElement === null) {
                        document.documentElement = node;
                    } else if (document.documentElement !== node) {
                        throw new Error('Can\'t change HTML');
                    // } else{
                    }
                } else {
                    throw new Error('HTML only can put in document');
                }
            } else {
                if (this.vmData.document) {
                    throw new Error('Can\'t remove html');
                }
            }
        });
    }
    VMDOM.VHtmlElement.prototype = VEx;

}
