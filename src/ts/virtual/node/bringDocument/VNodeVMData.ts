/// <reference path="../VNodeVMData.ts"/>

namespace VMDOM {
    let $ = new EventEmitterEx;
    let $setParentNode = $.getEventHelper<
        (node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null) => void,
        (node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null) => boolean>("setParentNode")

    let $beforeSetInDOM = $.getEventHelper<
        (node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null, v: VMDOM.VDocument | null) => void,
        (node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null, v: VMDOM.VDocument | null) => boolean>("beforeSetInDOM")
    function onSetParentNode(this: void, node: VMDOM.VNode & IVNodeMethod, parent: VMDOM.VNode & IVNodeMethod | null) {
        if (parent) {
            if (parent.vmData.document) {
                node.vmData.$beforeSetInDOM.emit(node, parent, parent.vmData.document);
            }
        } else {
            node.vmData.$beforeSetInDOM.emit(node, parent, null);
        }
    }
    function onBeforeSetInDOM(this: void, node: VMDOM.VNode, parent: VMDOM.VNode & IVNodeMethod | null, v: VMDOM.VDocument | null) {
        node.vmData.document = v;
        let chds = node.childNodes;
        for (let i = 0; i < chds.length; i++) {
            let nod = chds[i];
            node.vmData.$beforeSetInDOM.emit(nod, parent, v);
        }
    }
    let VExConstructor = VMDOM.VNodeVMData;
    let VEx = VExConstructor.prototype;
    delete VExConstructor.prototype;

    VMDOM.VNodeVMData = <any>function (this: VNodeVMData) {
        VExConstructor.apply(this);
        this.parentNode = null;
        this.document = null;
        this.$setParentNode = $setParentNode;
        this.$beforeSetInDOM = $beforeSetInDOM;
        this.$setParentNode.on(onSetParentNode);
        this.$beforeSetInDOM.on(onBeforeSetInDOM);
    }
    VMDOM.VNodeVMData.prototype = VEx;

    export interface VNodeVMData {

        parentNode: (VMDOM.VNode & IVNodeMethod) | null
        document: VMDOM.VDocument | null
        $setParentNode: typeof $setParentNode
        $beforeSetInDOM: typeof $beforeSetInDOM
        events:[string, EventListenerOrEventListenerObject | undefined, boolean][]
    }
}