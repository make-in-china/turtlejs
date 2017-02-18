/// <reference path='JavaScriptBlock.ts'/>
/// <reference path='JavaScriptComment.ts'/>
/// <reference path='JavaScriptString.ts'/>
/// <reference path='JavaScriptLogic.ts'/>
namespace JS{
    export interface IJavaScriptStatementChild {
        "JavaScriptBlock":JavaScriptBlock<keyof IBreakes>
        "string":string
        "JavaScriptComment":JavaScriptComment
        "JavaScriptString":JavaScriptString
    }
    export type TJavaScriptStatementChild=IJavaScriptStatementChild[keyof IJavaScriptStatementChild]
    export class JavaScriptStatement{
        parent:JavaScriptBlock<keyof IBreakes>
        children:TJavaScriptStatementChild[]=[]
        isEnd:boolean=false
        push(child:TJavaScriptStatementChild){
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
                    arr.isEnd=true;
                    arr=new JavaScriptStatement;
                    isAreadyPush=true;
                }else{
                    arr.push(item);
                    isAreadyPush=false;
                }
            }
            if(!isAreadyPush){
                ret.push(arr);
                arr.isEnd=true;
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
        clone():JavaScriptStatement{
            let ret:JavaScriptStatement=new JavaScriptStatement();
            for(const keyWord of this.children){
                if(isString(keyWord)){
                    ret.push(keyWord);
                }else if(keyWord instanceof JavaScriptBlock||keyWord instanceof JavaScriptString||keyWord instanceof JavaScriptComment){
                    ret.push(keyWord.clone());
                }else{
                    throw new Error('不支持克隆额外内容！');
                }
            }
            return ret;
        }
    }
}
