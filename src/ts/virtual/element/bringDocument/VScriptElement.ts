
/// <reference path='../VScriptElement.ts'/>
namespace VMDOM {
    let VExConstructor = VMDOM.VScriptElement;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;
    VMDOM.VScriptElement = <any>function (this: VScriptElement) {
        VExConstructor.apply(this);
        this.vmData.$beforeSetInDOM.on((node, parent, v) => {
            let document = v;
            if (document) {
                //不是从dom里删除
                if (node.vmData.document) {
                    if (document !== node.vmData.document) {
                        //换一个dom
                        document.scripts.push(this);
                    } else {
                        //同一个dom换位置
                        return;
                    }
                } else {
                    //插入到新的dom里
                    document.scripts.push(this);
                    return;
                }
            } else if (!node.vmData.document) {
                return;
                // }else{
                //从dom里删除
            }
            //从dom里删除
            document = node.vmData.document
            let idx = document.scripts.indexOf(this);
            document.scripts.splice(idx, 1);
        });
    }
    VMDOM.VScriptElement.prototype = VEx;

}