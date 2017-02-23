/// <reference path='../javascript/JavaScriptBlock.ts'/>


namespace VMDOM{

    export class VOrderData{
        constructor(
            public name:string,
            public setup:Order.IOrderSetup|null|undefined
        ){}
        clone():VOrderData{
            if(this.setup){
                let params,data
                if(this.setup.params){
                    params=this.setup.params.clone();
                }
                if(this.setup.data){
                    data=this.setup.data.clone();
                }
                return new VOrderData(this.name,{
                    params:params,
                    data:data
                });
            }else{
                return new VOrderData(this.name,null);
            }
        }
    }
}
