
/// <reference path='../VDocumentType.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VDocumentType;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    // export interface VDocumentType{
    //     readonly publicId:string
    //     readonly systemId:string
    // }
    VMDOM.VDocumentType = <any>function (this: VDocumentType) {
        VExConstructor.apply(this);
        this.vmData.$beforeSetInDOM.on((node: any, parent, v) => {
            let document = v;
            if (document) {
                if (this.vmData.document && this.vmData.document !== document) {
                    throw new Error('Can\'t remove DOCTYPE');
                }
                if (parent&&parent.nodeName === "#document") {

                    if (document.doctype === null) {
                        document.doctype = node;
                    } else if (document.doctype !== node) {
                        debugger;
                    }
                } else {
                    throw new Error('DOCTYPE only can put in document');
                }
            } else {
                if (this.vmData.document) {
                    throw new Error('Can\'t remove DOCTYPE');
                }
            }


        });
    }
    VMDOM.VDocumentType.prototype = VEx;

}