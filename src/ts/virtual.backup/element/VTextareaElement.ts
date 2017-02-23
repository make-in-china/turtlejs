
interface VNodeNames{
    textarea:VMDOM.VTextareaElement
}
namespace VMDOM{
    @mergeClass({autofocus:'',cols:'',dirName:'',disabled:'',maxLength:'',minLength:'',name:'',placeholder:'',readOnly:'',required:'',rows:'',wrap:'',autocapitalize:''})
    export class  VTextareaElement extends VHTMLElement{
        nodeName:"TEXTAREA"="TEXTAREA";
        autofocus:string
        cols:string
        dirName:string
        disabled:string
        maxLength:string
        minLength:string
        name:string
        placeholder:string
        readOnly:string
        required:string
        rows:string
        wrap:string
        autocapitalize:string
        defaultValue:string
        value:string
        
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{}
    }
    let getSetValueDescriptor={
        get:function(this:VTextareaElement):string{
            return this.innerText;
        },
        set:function(this:VTextareaElement,v:string){
            this.innerText=v;
        }
    }
    Object.defineProperty(VTextareaElement.prototype,'defaultValue',getSetValueDescriptor);
    Object.defineProperty(VTextareaElement.prototype,'value',getSetValueDescriptor);
    
}