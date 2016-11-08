
/// <reference path='../ts/index.ts'/>
class Test extends EventEmitterEx{
    $click=this.getEventHelper<
        (p1,p2,p3,p4,p5:string)=>void,
        (p1,p2,p3,p4,p5:string)=>boolean>("click");
    
    
    constructor(){
        super();




        this.$click.on((p1,p2,p3,p4,p5)=>{

        })


        this.$click.emit(1,2,3,4,5);




        this.on("click",function(p1,p2,p3,p4,p5:string){

        })


        this.emit("click",)
        
    }

}