
interface Window{
    ActiveXObject?:Object
}

let isIE = !!window.ActiveXObject||"ActiveXObject" in window;
(function(){
    var insertBefore=Node.prototype.insertBefore;
    if(isIE){
        (<any>Node.prototype).insertBefore2=function(newNode,node){
            var reAppend=[];
            var n;
            switch(newNode.nodeType){
                case 3:
                    if(newNode.data===""){
                        return;
                    }
                case 8:
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
                    break;
                default:
                    insertBefore.call(this,newNode,node);
            }
        }
    }else{
        (<any>Node.prototype).insertBefore2=insertBefore;
    }
})();