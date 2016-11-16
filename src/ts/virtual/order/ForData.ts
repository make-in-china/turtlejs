class VForOrderData extends VOrderData{
    check:() => {
        result: boolean;
        params: null;
    }
    onBreak(){
        this.isBreak=true;
    }
    isBreak:boolean
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}