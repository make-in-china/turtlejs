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
            let ret:string[]=[];
            let s:string='';
            let isAreadyPush:boolean=false;
            for(const item of this.children){
                if(isString(item)&&item===separator){
                    ret.push(s);
                    s='';
                    isAreadyPush=true;
                }else{
                    s+=item.toString();
                    isAreadyPush=false;
                }
            }
            if(!isAreadyPush){
                ret.push(s);
            }
            return ret;
        }
        splitKeyWord(separator: string){
            let ret:JavaScriptStatement[]=[];
            let arr:JavaScriptStatement=new JavaScriptStatement;
            let isAreadyPush:boolean=false;
            for(const item of this.children){
                if(isString(item)&&item===separator){
                    ret.push(arr);
                    arr=new JavaScriptStatement;
                    isAreadyPush=true;
                }else{
                    arr.push(item);
                    isAreadyPush=false;
                }
            }
            if(!isAreadyPush){
                ret.push(arr);
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