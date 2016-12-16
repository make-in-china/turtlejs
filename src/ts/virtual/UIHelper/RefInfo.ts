
interface IRefs{
    name:string
    node:VMDOM.VHtmlElement&IVNodeMethod
}

class RefInfo{
    data:{
        refParent:VMDOM.VHtmlElement&IVNodeMethod
        refs:IRefs[]
    }[]=[]
    getRefNodeName(node:VMDOM.VHtmlElement&IVNodeMethod){
        for(const data of this.data){
            for(const ref of data.refs){
                if(ref.node===node){
                    return ref.name;
                }
            }
        }
        return null;
    }
    push(name:string,refNode:VMDOM.VHtmlElement&IVNodeMethod){
        let p:VMDOM.VHtmlElement&IVNodeMethod=<any>refNode.parentNode;
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