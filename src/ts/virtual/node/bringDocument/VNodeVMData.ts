/// <reference path="../VNodeVMData.ts"/>

namespace VMDOM {
    function onSetParentNode(this: void, node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null) {
        if (parent) {
            if (parent.vmData.document) {
                node.vmData.$beforeSetInDOM.emit(node, parent, parent.vmData.document);
            }
        } else {
            node.vmData.$beforeSetInDOM.emit(node, parent, null);
        }
    }
    function onBeforeSetInDOM(this: void, node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null, v: VMDOM.VDocument | null) {
        node.vmData.document = v;
        let chds = node.childNodes;
        for (let i = 0; i < chds.length; i++) {
            let nod = chds[i];
            nod.vmData.$beforeSetInDOM.emit(nod, node, v);
        }
    }
    let VExConstructor = VMDOM.VNodeVMData;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;

    //new constructor
    VMDOM.VNodeVMData = <any>function (this: VNodeVMData) {
        VExConstructor.apply(this);
        this.parentNode = null;
        this.document = null;
        this.$ = new EventEmitterEx;
        this.$setParentNode = this.$.getEventHelper<any,any>("setParentNode")
        this.$beforeSetInDOM = this.$.getEventHelper<any,any>("beforeSetInDOM")
        this.$setParentNode.on(onSetParentNode);
        this.$beforeSetInDOM.on(onBeforeSetInDOM);
    }
    VMDOM.VNodeVMData.prototype = VEx;

    export interface VNodeVMData {
        parentNode: (VMDOM.VNode & IVNodeMethod) | null
        document: VMDOM.VDocument | null
        events:[string, EventListenerOrEventListenerObject | undefined, boolean][]
        $:EventEmitterEx
        $setParentNode:EventHelper<(node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod) => void, (node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod) => boolean>
        $beforeSetInDOM: EventHelper<(node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => void, (node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => boolean>
    }
}