
var newFun=function(){
    
    class Fun{
        a=()=>{
            console.log("a")
        }
        b=()=>{
        console.log("b")
        }
    }
    interface IFun{
        ():void
    }
    var fn:IFun=function(){
        console.log(1)
    }
    var ret:IFun&Fun=<any>fn;
    ret['__proto__']=Fun;
    return ret;
}
var fn=newFun();
fn.a();
fn.b();