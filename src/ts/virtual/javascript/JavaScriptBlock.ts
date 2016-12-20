namespace JS{
    export class JavaScriptBlock{
        parent:JavaScriptStatement
        children:JavaScriptStatement[]=[]
        isEnd:boolean=false
        constructor(public begin:string,public end:string){}
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
        clone():JavaScriptBlock{
            let ret:JavaScriptBlock=new JavaScriptBlock(this.begin,this.end);
            for(const statement of this.children){
                ret.push(statement.clone());
            }
            return ret;
        }
    }
}