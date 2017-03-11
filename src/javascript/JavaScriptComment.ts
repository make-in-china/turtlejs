namespace JS{
    export class JavaScriptComment{
        constructor(public data:string){}
        toString():string{
            return this.data;
        }
        clone():JavaScriptComment{
            return new JavaScriptComment(this.data);
        }
    }
}