namespace JS{
    export class JavaScriptString{
        constructor(public data:string){}
        toString():string{
            return this.data;
        }
        clone():JavaScriptString{
            return new JavaScriptString(this.data);
        }
    }
}