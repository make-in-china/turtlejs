class VSwitchOrderData extends VOrderData{
    value:any
    hit:INode|null=null
    hitBy:string
    needBreak:boolean=false
    endHit:INode|null=null
    hasDefault:boolean=false
    constructor(name:string,node:IComment,condition:string,run:()=>void){
        super(name,node,condition,run);
    }
}