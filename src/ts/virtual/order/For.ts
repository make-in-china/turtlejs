
/// <reference path='RepeatBlockOrder.ts'/>
/// <reference path='../javascript/logic/For.ts'/>
namespace Order {
    interface IOrderDataFor extends IOrderDataBlock{
        forMode: JS.EForMode;
        
        forStepInfo: {
            first: string|[string,string|undefined,boolean][]
            exec: string
            step: string
            isFirst: boolean
        }
        
        forInInfo: {
            source: any
            var: string
            object: string
            names: string[]
            index: number
        }
    }

    @register
    export class For extends RepeatBlockOrder {
        static orderName = "for"
        data:IOrderDataFor
        constructor(node: VComment, condition: string) {
            super(node, condition,'for');
            let jsblock=JS.Parser.parseStructor(condition);
            let info=JS.For.parseConditions(jsblock);
            if(info){
                this.data.forMode = info.mode;
                if(info.mode===JS.EForMode.In){
                    let infoForIn:JS.IInfoForIn=<JS.IInfoForIn>info;
                    this.data.forInInfo = {
                        var: infoForIn.hasVar?infoForIn.varName:'',
                        object:infoForIn.bindingExp.toString(),
                        names: [],
                        source: null,
                        index: 0
                    }
                }else{
                    let infoForStep:JS.IInfoForStep=<JS.IInfoForStep>info;
                    let first:string|[string,string|undefined,boolean][];
                    if(infoForStep.variable){
                        first=infoForStep.variable.varInfos
                    }else{
                        infoForStep.first.children.pop();
                        first=infoForStep.first.toString();
                    }
                    infoForStep.exec.children.pop();
                    this.data.forStepInfo = {
                        first: first,
                        exec: infoForStep.exec.toString(),
                        step: infoForStep.step.toString(),
                        isFirst: true
                    }
                }
            }else{
                throw new Error("错误的for表达式！");
            }
        }
        static run(data:IOrderDataBlock){
            super.run(data,canRepeat);
        }
    }
    function checkForStep(this:void,data:IOrderDataFor): boolean {
        let forStepInfo=data.forStepInfo
        if (forStepInfo.isFirst) {
            forStepInfo.isFirst = false;
            if(isString( forStepInfo.first)){
                exec(data.placeholder, forStepInfo.first);
            }else{
                runVarInfos(DOMScope.get(data.node),data.node,forStepInfo.first);
            }
        } else {
            exec(data.placeholder, forStepInfo.step);
        }
        return exec(data.placeholder, forStepInfo.exec);
    }
    function initForInSourceData(this:void,data:IOrderDataFor): boolean {
        let forInInfo=data.forInInfo
        if (!forInInfo.source) {
            forInInfo.source = exec(data.placeholder, forInInfo.object);
            if (!forInInfo.source) {
                return false;
            }
            for (let i in forInInfo.source) {
                forInInfo.names.push(i);
            }
        }
        return true
    }
    function checkForIn(this:void,data:IOrderDataFor): boolean {
        if (!initForInSourceData(data)) {
            throw new Error("计算出错！");
        }
        let forInInfo=data.forInInfo
        
        if (forInInfo.index < forInInfo.names.length) {
            exec(data.placeholder, forInInfo.var + '=\'' + forInInfo.names[forInInfo.index] + '\';');
            forInInfo.index++;
            return true
        } else {
            return false
        }
    }
    function canRepeat(this:void,data:IOrderDataFor):boolean{
        if (data.forMode === JS.EForMode.In) {
            return checkForIn(data);
        } else {
            return checkForStep(data);
        }
    }
}
