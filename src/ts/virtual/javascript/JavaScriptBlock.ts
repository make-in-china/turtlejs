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
            let ret="";
            for(const statement of this.children){
                ret+=statement;
            }
            return this.begin+ret+this.end;
        }
    }
}