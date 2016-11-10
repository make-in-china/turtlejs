
interface Window {
    ActiveXObject?: Object
}
interface Node {
    insertBefore2<T extends INode|Node>(newNode: T, node?: T): T;
}
let isIE:boolean
try{
    isIE = !!(typeof window !=="undefined"&&window.ActiveXObject || "ActiveXObject" in window);
}catch(e){
    isIE=false;
}
(function () {
    let insertBefore = Node.prototype.insertBefore;
    if (isIE) {
        Node.prototype.insertBefore2 = function(this:INode,newNode: INode, refChild?: INode): INode {
            let reAppend:INode[] = [];
            let n:INode|null;
            if (isTextNode(newNode)) {
                if (newNode.data === "") {
                    return <any>newNode;
                }
            } else if (isCommentNode(newNode)) {
                let node:INode|undefined=refChild?refChild:this.childNodes[0];
                if(!node){
                    return newNode;
                }
                n = node.nextSibling;
                while (n !== null) {
                    reAppend.push(this.removeChild(n));
                    n = node.nextSibling;
                }
                reAppend.unshift(this.removeChild(node));
                this.appendChild(newNode);
                for (let i = 0; i < reAppend.length; i++) {
                    this.appendChild(reAppend[i]);
                }
                return newNode;
            } else {
                let node:INode|undefined=refChild?refChild:this.childNodes[0];
                if(!node){
                    return newNode;
                }
                return insertBefore.call(this, newNode, node);
            }
            return newNode;
        }
    } else {
        Node.prototype.insertBefore2 = <any>insertBefore;
    }
})();
