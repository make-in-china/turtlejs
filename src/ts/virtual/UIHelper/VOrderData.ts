/// <reference path='../javascript/JavaScriptBlock.ts'/>


namespace VMDOM{
    export class VOrderData{
        name:string
        condition:JS.JavaScriptBlock|null|undefined
        constructor(name:string,condition:JS.JavaScriptBlock|null|undefined){
            this.name=name
            this.condition=condition;
        }
        clone():VOrderData{
            if(this.condition){
                return new VOrderData(this.name,this.condition.clone());
            }else{
                return new VOrderData(this.name,null);
            }
        }
    }
}
