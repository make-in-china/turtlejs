
interface IRefs{
    name:string
    node:VMElement.VHtmlElement&IVNodeMethod
}

class RefInfo{
    data:{
        refParent:VMElement.VHtmlElement&IVNodeMethod
        refs:IRefs[]
    }[]=[]
    getRefNodeName(node:VMElement.VHtmlElement&IVNodeMethod){
        for(const data of this.data){
            for(const ref of data.refs){
                if(ref.node===node){
                    return ref.name;
                }
            }
        }
        return null;
    }
    push(name:string,refNode:VMElement.VHtmlElement&IVNodeMethod){
        let p:VMElement.VHtmlElement&IVNodeMethod=<any>refNode.parentNode;
        for(const data of this.data){
            if(data.refParent===p){
                data.refs.push({name:name,node:refNode});
                return;
            }
        }
        this.data.push({
            refParent:p,
            refs:[
                {
                    name:name,
                    node:refNode
                }
            ]
        });

    }
    static getRefParentName(refs:IRefs[]){
        let name:string='';
        for(const ref of refs){
            name+=ref.name+'_';
        }
        return name+'Parent';
    }
}