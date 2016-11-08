
interface Window{
    ActiveXObject?:Object
}

let isIE = !!window.ActiveXObject||"ActiveXObject" in window;
(function(){
    var insertBefore=Node.prototype.insertBefore;
    if(isIE){
        Node.prototype.insertBefore2=function(newNode,node){
            var reAppend=[];
            var n;
            
            if(isTextNode(newNode)){
                if(newNode.data===""){
                    return;
                }
            }else if(isCommentNode(newNode)){
                n=node.nextSibling;
                while(n!==null){
                    reAppend.push(this.removeChild(n));
                    n=node.nextSibling;
                }
                reAppend.unshift(this.removeChild(node));
                this.appendChild(newNode);
                for(var i=0;i<reAppend.length;i++){
                    this.appendChild(reAppend[i]);
                }
                return newNode;
            }else{
                return insertBefore.call(this,newNode,node);
            }
        }
    }else{
        Node.prototype.insertBefore2=<any>insertBefore;
    }
})();