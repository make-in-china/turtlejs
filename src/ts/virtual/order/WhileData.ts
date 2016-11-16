class VWhileOrderData extends VOrderData{
    isBreak:boolean=false
    onBreak(){
        this.isBreak=true;
    }
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}