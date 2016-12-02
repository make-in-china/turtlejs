
/// <reference path='VOrder.ts'/>
/// <reference path='../Var.ts'/>
namespace Order {
    extendsOrderFunction(Var,EXFunction.tryRun,function(this:Var){
        tryRunVarInfos(this.node,this.data.varInfos);
    });
    
    extendsOrderFunction(Var,EXFunction.toJS,function(this:Var){
        //生成中间数据  的  生成代码
        
        let data=this.data;
        let varInfos:string[]=[];
        for(const varInfo of data.varInfos){
            if(isString(varInfo[1])){
                varInfos.push(`['${varInfo[0]}','${varInfo[1]}',${varInfo[2]}]`);
            }else{
                varInfos.push(`['${varInfo[0]}',${varInfo[1]},${varInfo[2]}]`);
            }
        }
        return `(function(this:VScript){
            Order.Var.run({
                condition:'${data.condition}',
                placeholder:this,
                varInfos:[${varInfos.join(',')}]
            });
        },ENodeType.Script).run()`;
    });
}
            