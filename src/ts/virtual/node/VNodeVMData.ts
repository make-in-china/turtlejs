/// <reference path="../../core/EventEmitterEx.ts"/>

class VNodeVMData{
    data:string=""
    __:Object={}
    domNode:Node|null=null
    /**是否闭合 */
    isClose:boolean=false
    /**是否自闭合 */
    /** */
    closeSelf:boolean=false
    $=new EventEmitterEx
    parentNode:(VMDOM.VNode&IVNodeMethod)|null=null
    document:VMDOM.VDocument|null
    $setParentNode=this.$.getEventHelper<
                    (node:VMDOM.VNode&IVNodeMethod,parent:VMDOM.VNode&IVNodeMethod|null)=>void,
                    (node:VMDOM.VNode&IVNodeMethod,parent:VMDOM.VNode&IVNodeMethod|null)=>boolean>("setParentNode")
    $beforeSetInDOM=this.$.getEventHelper<
                    (node:VMDOM.VNode&IVNodeMethod,parent:VMDOM.VNode&IVNodeMethod|null,v:VMDOM.VDocument|null)=>void,
                    (node:VMDOM.VNode&IVNodeMethod,parent:VMDOM.VNode&IVNodeMethod|null,v:VMDOM.VDocument|null)=>boolean>("setInDOM")
    onSetParentNode(this:void,node:VMDOM.VNode&IVNodeMethod,parent:VMDOM.VNode&IVNodeMethod|null){
        if(parent){
            if(parent.vmData.document){
                node.vmData.$beforeSetInDOM.emit(node,parent,parent.vmData.document);
            }
        }else{
            node.vmData.$beforeSetInDOM.emit(node,parent,null);
        }
    }
    setInDOM(this:void,node:VMDOM.VNode,parent:VMDOM.VNode&IVNodeMethod|null,v:VMDOM.VDocument|null){
        node.vmData.document=v;
        let chds=node.childNodes;
        for(let i=0;i<chds.length;i++){
            let nod=chds[i];
            node.vmData.$beforeSetInDOM.emit(nod,parent,v);
            // this.setInDOM(nod,parent,v);
        }
    }
    constructor(){
        this.$setParentNode.on(this.onSetParentNode);
        this.$beforeSetInDOM.on(this.setInDOM);
    }
}