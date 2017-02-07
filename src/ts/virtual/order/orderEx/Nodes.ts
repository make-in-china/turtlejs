
/// <reference path='VOrder.ts'/>
/// <reference path='../Nodes.ts'/>
namespace OrderEx {
    extendsOrderFunction(Order.Nodes,tryRun,function(this:Order.Nodes){
        // Order.tryRunVarInfos(this.node,this.data.varInfos);
    });
    
    extendsOrderFunction(Order.Nodes,replaceToScriptNode,function(this:Order.Nodes){
        //生成中间数据  的  生成代码
        
        // let data=this.data;
        // let varInfos:string[]=[];
        // for(const varInfo of data.varInfos){
        //     if(isString(varInfo[1])){
        //         varInfos.push(`['${varInfo[0]}','${varInfo[1]}',${varInfo[2]}]`);
        //     }else{
        //         varInfos.push(`['${varInfo[0]}',${varInfo[1]},${varInfo[2]}]`);
        //     }
        // }
        return `
        Order.Nodes.run({
            placeholder:this
        });`;
    });
}
            