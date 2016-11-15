class VIfOrderData extends VOrderData{
    hit:INode|null=null
    hasElse:boolean=false
    endHit:INode|null=null
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}