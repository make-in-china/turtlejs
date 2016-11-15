class VForOrderData extends VOrderData{
    check:() => {
        result: boolean;
        params: null;
    }
    onBreak(){
        this.isBreak=true;
    }
    isBreak:boolean
    endNode:INode|null=null
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}