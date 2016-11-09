
    function isVText(node: IVNode): node is IVText {
        return node.nodeType === 3
    }
    function isVElement(node: IVNode): node is IVElement {
        return node.nodeType === 1
    }
    function isVComment(node: IVNode): node is IVComment {
        return node.nodeType === 8
    }
    function isVDocType(node: IVNode): node is IVDocType {
        return node.nodeType === 10
    }