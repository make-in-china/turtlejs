/// <reference path="../VNodeVMData.ts"/>

namespace VMDOM {
    function onSetParentNode(this: void, node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null) {
        if (parent) {
            if (parent.vmData.document) {
                setInDOM(node, parent, parent.vmData.document);
            }
        } else {
            setInDOM(node, parent, null);
        }
    }
    function setInDOM(this: void, node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null, v: VMDOM.VDocument | null) {
        node.vmData.$beforeSetInDOM.emit(node, parent, v);
        node.vmData.document = v;
        node.vmData.$setInDOM.emit(node, parent, v);
        let chds = node.childNodes;
        for (let i = 0; i < chds.length; i++) {
            let nod = chds[i];
            setInDOM(nod, node, v);
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
        this.$setInDOM = this.$.getEventHelper<any,any>("setInDOM")
        this.$setParentNode.on(onSetParentNode);
    }
    VMDOM.VNodeVMData.prototype = VEx;

    export interface VNodeVMData {
        parentNode: (VMDOM.VNode & IVNodeMethod) | null
        document: VMDOM.VDocument | null
        events:[string, EventListenerOrEventListenerObject | undefined, boolean][]
        $:EventEmitterEx
        $setParentNode:EventHelper<(node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod) => void, (node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod) => boolean>
        $beforeSetInDOM: EventHelper<(node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => void, (node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => boolean>
        $setInDOM: EventHelper<(node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => void, (node: VNode & IVNodeMethod, parent: VNode & IVNodeMethod, v: VDocument) => boolean>
    }
}