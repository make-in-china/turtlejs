
interface VNodeNames{
    "head":VMDOM.VHeadElement
}
namespace VMDOM{
    @mergeClass({title:'', lang:'', accessKey:'', webkitdropzone:'', id:''})
    export class  VHeadElement extends VHtmlElement{
        nodeName:"HEAD"="HEAD";
        title:string
        lang:string
        accessKey:string
        webkitdropzone:string
        id:string
        constructor(){
            super();
            this.vmData.$setParentNode.on((node:any,parent)=>{
                if(parent&&parent.nodeName==="HTML"){
                    
                }else{
                    throw new Error('Head only can put in HTML');
                }
            });
            this.vmData.$beforeSetInDOM.on((node:any,parent,v)=>{
                debugger;
                let document=v;
                if(document){
                    if(this.vmData.document&&this.vmData.document!==document){
                        throw new Error('Can\'t remove head');
                    }
                    if(parent.nodeName==="HTML"){
                        if(document.head===null){
                            document.head=node;
                        }else if(document.head!==node){
                            //合并head
                            debugger;
                        }
                    }
                }else{
                    if(this.vmData.document){
                        throw new Error('Can\'t remove head');
                    }
                }
            });
        }
    }
    
}