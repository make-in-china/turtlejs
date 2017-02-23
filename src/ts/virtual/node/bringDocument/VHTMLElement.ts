/// <reference path='../VHTMLElement.ts'/>
namespace VMDOM{
    let VExConstructor=VMDOM.VHTMLElement;
    let VEx=VExConstructor.prototype;
    let doBaseToDOM=Object.getOwnPropertyDescriptor(VEx,'doBaseToDOM').value;
    Object.defineProperty(VEx,'doBaseToDOM',{
        value:function(this:VHTMLElement){
            let elem:HTMLElement=doBaseToDOM.call();
            let arr = this.vmData.events;
            for (let j in arr) {
                let e = arr[j];
                elem.addEventListener(e[0], <any>e[1], e[2]);
            }
            return elem;
        }
    })
}