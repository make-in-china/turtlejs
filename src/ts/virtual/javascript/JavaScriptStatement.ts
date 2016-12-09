/// <reference path='JavaScriptBlock.ts'/>
/// <reference path='JavaScriptComment.ts'/>
/// <reference path='JavaScriptString.ts'/>
/// <reference path='JavaScriptLogic.ts'/>
namespace JS{
    export class JavaScriptStatement{
        parent:JavaScriptBlock
        children:(JavaScriptBlock|string|JavaScriptComment|JavaScriptString)[]=[]
        isEnd:boolean=false
        push(child:JavaScriptBlock|string|JavaScriptComment|JavaScriptString){
            this.children.push(child);
            if(child instanceof JavaScriptBlock){
                child.parent=this;
            }
        }
        split(separator: string):string[]{
            var ret:string[]=[];
            var s:string='';
            for(const item of this.children){
                if(isString(item)&&item===separator){
                    ret.push(s);
                    s='';
                }else{
                    s+=item.toString();
                }
            }
            return ret;
        }
        toString():string{
            let ret="";
            for(const item of this.children){
                ret+=item;
            }
            return ret;
        }
    }
}