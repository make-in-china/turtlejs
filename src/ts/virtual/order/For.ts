
/// <reference path='RepeatBlockOrder.ts'/>
/// <reference path='../javascript/logic/For.ts'/>
namespace Order {
    export class For extends RepeatBlockOrder {
        static orderName = "for"
        forMode: JS.EForMode;
        constructor(node: VComment, condition: string) {
            super(node, condition,'for');
            let jsblock=JS.Parser.parseStructor(condition);
            let info=JS.For.parseConditions(jsblock);
            if(info){
                this.forMode = info.mode;
                if(info.mode===JS.EForMode.In){
                    let infoForIn:JS.IInfoForIn=<JS.IInfoForIn>info;
                    this.forInInfo = {
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
                    this.forStepInfo = {
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
        forStepInfo: {
            first: string|[string,string|undefined,boolean][]
            exec: string
            step: string
            isFirst: boolean
        }
        private checkForStep(): boolean {
            if (this.forStepInfo.isFirst) {
                this.forStepInfo.isFirst = false;
                if(isString( this.forStepInfo.first)){
                    exec(this.placeholder, this.forStepInfo.first);
                }else{
                    runVarInfos(DOMScope.get(this.node),this.node,this.forStepInfo.first);
                }
            } else {
                exec(this.placeholder, this.forStepInfo.step);
            }
            return exec(this.placeholder, this.forStepInfo.exec);
        }

        forInInfo: {
            source: any
            var: string
            object: string
            names: string[]
            index: number
        }
        private initForInSourceData(): boolean {
            if (!this.forInInfo.source) {
                this.forInInfo.source = exec(this.placeholder, this.forInInfo.object);
                if (!this.forInInfo.source) {
                    return false;
                }
                for (let i in this.forInInfo.source) {
                    this.forInInfo.names.push(i);
                }
            }
            return true
        }
        private checkForIn(): boolean {
            if (!this.initForInSourceData()) {
                throw new Error("计算出错！");
            }
            if (this.forInInfo.index < this.forInInfo.names.length) {
                exec(this.placeholder, this.forInInfo.var + '=\'' + this.forInInfo.names[this.forInInfo.index] + '\';');
                this.forInInfo.index++;
                return true
            } else {
                return false
            }
        }
        canRepeat():boolean{
            if (this.forMode === JS.EForMode.In) {
                return this.checkForIn();
            } else {
                return this.checkForStep();
            }
        }
    }
    register(For);
}
