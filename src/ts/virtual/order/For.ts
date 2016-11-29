
/// <reference path='RepeatBlockOrder.ts'/>
/// <reference path='../javascript/logic/For.ts'/>
namespace Order {
    export class For extends RepeatBlockOrder {
        static orderName = "for"
        private forMode: JS.EForMode;
        constructor(node: VComment, condition: string) {
            super(node, condition,'for');
            let jsblock=JS.Parser.parseStructor(condition);
            let info=JS.For.parseConditions(jsblock);
            if(info){
                this.forMode = info.mode;
                if(info.mode===JS.EForMode.In){
                    let infoForIn:JS.IInfoForIn=<JS.IInfoForIn>info;
                    this.forIn = {
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
                    this.forStep = {
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
        tryRun(){
            if (this.forMode === JS.EForMode.In) {
                this.canPrebuildForIn();
            } else {
                this.canPrebuildForStep();
            }
        }
        private forStep: {
            first: string|[string,string|undefined,boolean][]
            exec: string
            step: string
            isFirst: boolean
        }

        private canPrebuildForStep() {
            if(isString( this.forStep.first)){
                test(this.placeholder, this.forStep.first);
            }else{
                tryRunVarInfos(this.placeholder,this.forStep.first);
            }
            test(this.placeholder, this.forStep.step);
            test(this.placeholder, this.forStep.exec);
        }
        private checkForStep(): boolean {
            if (this.forStep.isFirst) {
                this.forStep.isFirst = false;
                if(isString( this.forStep.first)){
                    exec(this.placeholder, this.forStep.first);
                }else{
                    runVarInfos(DOMScope.get(this.node),this.node,this.forStep.first);
                }
            } else {
                exec(this.placeholder, this.forStep.step);
            }
            return exec(this.placeholder, this.forStep.exec);
        }

        private forIn: {
            source: any
            var: string
            object: string
            names: string[]
            index: number
        }
        private canPrebuildForIn() {
            test(this.placeholder, this.forIn.object)
        }
        private initForInSourceData(): boolean {
            if (!this.forIn.source) {
                this.forIn.source = exec(this.placeholder, this.forIn.object);
                if (!this.forIn.source) {
                    return false;
                }
                for (let i in this.forIn.source) {
                    this.forIn.names.push(i);
                }
            }
            return true
        }
        private checkForIn(): boolean {
            if (!this.initForInSourceData()) {
                throw new Error("计算出错！");
            }
            if (this.forIn.index < this.forIn.names.length) {
                exec(this.placeholder, this.forIn.var + '=\'' + this.forIn.names[this.forIn.index] + '\';');
                this.forIn.index++;
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
