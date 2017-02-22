
namespace VMDOM{
    let VExConstructor=VMDOM.VNode;
    let VEx=VExConstructor.prototype;
    delete VExConstructor.prototype;

    Object.defineProperty(VEx,'parentNode',{
        get:function(this:VNode&IVNodeMethod): (VNode&IVNodeMethod) | null{
            return this.vmData.parentNode;
        },
        set:function(this:VNode&IVNodeMethod,v:VNode&IVNodeMethod|null){
            if(this.vmData.parentNode===v){
                return;
            }
            this.vmData.parentNode=v;
            this.vmData.$setParentNode.emit(this,v);
        }
    })
    VMDOM.VNode=<any>function(this:VNode){
        VExConstructor.apply(this);

    }
    VMDOM.VNode.prototype = VEx;
}