
class JavaScriptStatement{
    type:string
    value?:string
    parent:JavaScriptStatement|null=null
    children:JavaScriptStatement[]=[]
    isBlock:boolean=false
    constructor(type:string,value?:string){
        this.type=type
        this.value=value
    }
    push(child:JavaScriptStatement){
        this.children.push(child);
        child.parent=this;
    }
    addNext(next:JavaScriptStatement){
        if(this.parent)this.parent.push(next);
    }
    // setParentClose(){
    //     if(this.parent)this.parent.isClose=true;
    // }
}