/// <reference path='../VElement.ts'/>
namespace VMDOM{
    let VExConstructor=VMDOM.VElement;
    let VEx=VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VElement=<any>function(this:VElement){
        VExConstructor.apply(this);
        this.vmData.events=[];
    }
    VMDOM.VElement.prototype = VEx;
}