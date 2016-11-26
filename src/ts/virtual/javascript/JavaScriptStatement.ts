/// <reference path='JavaScriptBlock.ts'/>
/// <reference path='JavaScriptComment.ts'/>
/// <reference path='JavaScriptString.ts'/>
class JavaScriptStatement{
    parent:JavaScriptBlock
    children:(JavaScriptBlock|string|JavaScriptComment|JavaScriptString)[]=[]
    isEnd:boolean=false
    constructor(){}
    push(child:JavaScriptBlock|string|JavaScriptComment|JavaScriptString){
        this.children.push(child);
        if(child instanceof JavaScriptBlock){
            child.parent=this;
        }
    }
    // parentPush(next:JavaScriptStatement){
    //     if(this.parent)this.parent.push(next);
    // }

    toString():string{
        let ret="";
        for(const item of this.children){
            ret+=item;
        }
        return ret;
    }
    // setParentClose(){
    //     if(this.parent)this.parent.isClose=true;
    // }
}