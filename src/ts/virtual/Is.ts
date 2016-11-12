
function isVHTMLElement(node: VNode): node is VHTMLElement {
    return node.nodeType === 1
}
function isVText(node: VNode): node is VText {
    return node.nodeType === 3
}
function isVComment(node: VNode): node is VComment {
    return node.nodeType === 8
}
function isVDocType(node: VNode): node is VDocumentType {
    return node.nodeType === 10
}