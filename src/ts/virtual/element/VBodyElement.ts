
interface VNodeNames{
    "body":VMDOM.VBodyElement
}
namespace VMDOM{
    @mergeClass({text:'',link:'',vLink:'',aLink:'',bgColor:'',background:''})
    export class  VBodyElement extends VHtmlElement{
        nodeName:"BODY"="BODY";
        text:string
        link:string
        vLink:string
        aLink:string
        bgColor:string
        background:string
        
        constructor(){
            super();
            this.vmData.$setParentNode.on((node:any,parent)=>{
                if(parent&&parent.nodeName==="HTML"){
                }else{
                    throw new Error('Body only can put in HTML');
                }
            });
            this.vmData.$beforeSetInDOM.on((node:any,parent,v)=>{
                let document=v;
                if(document){
                    if(this.vmData.document&&this.vmData.document!==document){
                        throw new Error('Can\'t remove body');
                    }
                    if(parent.nodeName==="HTML"){
                        
                        if(document.body===null){
                            document.body=node;
                        }else if(document.body!==node){
                            //合并body
                            debugger;
                        }
                    }
                }else{
                    if(this.vmData.document){
                        throw new Error('Can\'t remove body');
                    }
                }
                
                
            });
        }
    }
    
}