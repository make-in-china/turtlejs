class VWhileOrderData extends VOrderData{
    isBreak:boolean=false;
    endNode:INode|null=null
    onBreak(){
        this.isBreak=true;
    }
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}