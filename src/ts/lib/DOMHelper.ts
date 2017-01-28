interface Node {
    appendChild(newChild:INode):INode;
    
}
(function(){
    let appendChild=Node.prototype.appendChild;
    Node.prototype.appendChild=<any>function(newChild:INode):INode{
        return appendChild.call(this,newChild.toDOM());
    }
}());