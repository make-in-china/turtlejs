
/// <reference path='RepeatBlockOrder.ts'/>
/// <reference path='../javascript/logic/For.ts'/>
namespace Order {
    export interface IOrderDataForIn extends IOrderDataBlock{
        forInInfo: {
            var: string
            object: string
            names: string[]
        }
    }
    export interface IOrderDataForStep extends IOrderDataBlock{
        forStepInfo: {
            first: string|[string,string|undefined,boolean][]
            exec: string
            step: string
        }
    }
    export interface IOrderDataFor extends IOrderDataForIn,IOrderDataForStep{
        forMode: JS.EForMode;
    }
    
    interface IOrderDataForInRun extends IOrderDataForIn{
        index:number
        source:any
    }
    interface IOrderDataForStepRun extends IOrderDataForStep{
        isFirst:boolean
    }

    @register
    export class For extends RepeatBlockOrder {
        static orderName = "for"
        data:IOrderDataFor
        constructor(node: VMDOM.VComment, condition: string) {
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
                        names: []
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
                        step: infoForStep.step.toString()
                    }
                }
            }else{
                throw new Error("错误的for表达式！");
            }
        }
        static run(data:IOrderDataFor){
            
            if (data.forMode === JS.EForMode.In) {
                let runData:IOrderDataForInRun=<any>data;
                runData.index=0
                runData.source=null;
                super.run(runData,canRepeat);
            } else {
                let runData:IOrderDataForStepRun=<any>data;
                runData.isFirst=true
                super.run(runData,canRepeat);
            }
        }
    }



    function checkForStep(this:void,data:IOrderDataForStepRun): boolean {
        let forStepInfo=data.forStepInfo
        if (data.isFirst) {
            data.isFirst = false;
            if(isString( forStepInfo.first)){
                exec(data.placeholder, forStepInfo.first);
            }else{
                runVarInfos(DOMScope.get(data.placeholder),data.placeholder,forStepInfo.first);
            }
        } else {
            exec(data.placeholder, forStepInfo.step);
        }
        return exec(data.placeholder, forStepInfo.exec);
    }
    function initForInSourceData(this:void,data:IOrderDataForInRun): boolean {
        let forInInfo=data.forInInfo
        if (!data.source) {
            data.source = exec(data.placeholder, forInInfo.object);
            if (!data.source) {
                return false;
            }
            for (let i in data.source) {
                forInInfo.names.push(i);
            }
        }
        return true
    }
    function checkForIn(this:void,data:IOrderDataForInRun): boolean {
        if (!initForInSourceData(data)) {
            throw new Error("计算出错！");
        }
        let forInInfo=data.forInInfo
        
        if (data.index < forInInfo.names.length) {
            exec(data.placeholder, forInInfo.var + '=\'' + forInInfo.names[data.index] + '\';');
            data.index++;
            return true
        } else {
            return false
        }
    }
    function canRepeat(this:void,data:IOrderDataFor):boolean{
        if (data.forMode === JS.EForMode.In) {
            return checkForIn(<any>data);
        } else {
            return checkForStep(<any>data);
        }
    }
}
