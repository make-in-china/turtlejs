
/// <reference path='../VHTMLElement.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VHTMLElement;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VHTMLElement = <any>function (this: VHTMLElement) {
        VExConstructor.apply(this);
        this.vmData.$beforeSetInDOM.on((node: any, parent, document) => {
            if (document) {
                if (this.vmData.document && this.vmData.document !== document) {
                    throw new Error('Can\'t remove html');
                }
                if (parent&&parent.nodeName === "#document") {
                    if (document.documentElement === null) {
                        document.documentElement = node;
                    } else if (document.documentElement !== node) {
                        //合并html
                        debugger;
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
    VMDOM.VHTMLElement.prototype = VEx;

}