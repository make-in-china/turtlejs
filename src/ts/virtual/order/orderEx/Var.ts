
/// <reference path='VOrder.ts'/>
/// <reference path='../Var.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Var,tryRun,function(this:Order.Var){
        Order.tryRunVarInfos(this.node,this.data.varInfos);
    });
    
    extendsOrderFunction(Order.Var,replaceToScriptNode,function(this:Order.Var){
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
        return `Order.Var.run({
                placeholder:this,
                varInfos:[${varInfos.join(',')}]
            });`;
    });
}
            