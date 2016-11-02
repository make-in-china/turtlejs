class Store{
    [index:string]:IElement
}
class StoreManage{
    static take(data:Store,name:string):INode|INodeArray{
        if(data.hasOwnProperty(name)){
            let ret=data[name];
            delete data[name];
            if(ret.childNodes.length>1){
                return ret.childNodes;
            }else{
                return ret.childNodes[0];
            }
        }
        return null;
    }
    static takeElem(data:Store,name:string):IHTMLElement|IHTMLCollection{
        if(data.hasOwnProperty(name)){
            let ret:IHTMLElement=data[name];
            delete data[name];
            if(ret.children.length>1){
                return ret.children;
            }else{
                return ret.children[0];
            }
        }
        return null;
    }
}