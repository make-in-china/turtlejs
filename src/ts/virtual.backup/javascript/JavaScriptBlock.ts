
/// <reference path='../javascript/JavaScriptStatement.ts'/>
namespace JS{
    export interface IBreakes{
        '(':')'
        '{':'}'
        '[':']'
        '':''
    }
    export class JavaScriptBlock<T extends keyof IBreakes>{
        parent:JavaScriptStatement
        children:JavaScriptStatement[]=[]
        isEnd:boolean=false
        constructor(public begin:T,public end:IBreakes[T]){}
        push(child:JavaScriptStatement){
            this.children.push(child);
            child.parent=this;
        }
        toString():string{
            return this.begin+this.innerText+this.end;
        }
        get innerText():string{
            let ret="";
            for(const statement of this.children){
                ret+=statement;
            }
            return ret;
        }
        clone():JavaScriptBlock<T>{
            let ret:JavaScriptBlock<T>=new JavaScriptBlock(this.begin,this.end);
            for(const statement of this.children){
                ret.push(statement.clone());
            }
            return ret;
        }
    }
}