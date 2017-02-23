
interface IRefs{
    name:string
    node:VMDOM.VHTMLElement&IVNodeMethod
}

class RefInfo{
    data:{
        refParent:VMDOM.VHTMLElement&IVNodeMethod
        refs:IRefs[]
    }[]=[]
    getRefNodeName(node:VMDOM.VHTMLElement&IVNodeMethod){
        for(const data of this.data){
            for(const ref of data.refs){
                if(ref.node===node){
                    return ref.name;
                }
            }
        }
        return null;
    }
    push(name:string,refNode:VMDOM.VHTMLElement&IVNodeMethod){
        let p:VMDOM.VHTMLElement&IVNodeMethod=<any>refNode.parentNode;
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