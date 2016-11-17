
/// <reference path='VOrder.ts'/>
namespace Order {
    let parseForOrderRE = /[a-zA-Z\d] in .*/,
        parseForOrderRE2 = /^.*;.*;.*$/;
    const enum eForMode {
        forIn = 0,
        forSplit = 1
    }
    export class For extends VOrder {
        static name = "for"
        static isLogic = true
        onBreak() {
            this.isBreak = true;
        }
        isBreak: boolean
        get canRunInService(): boolean {
            if (this.forMode === eForMode.forIn) {
                return this.canPrebuildForIn();
            } else {
                return this.canPrebuildForSplit();
            }
        }
        private forMode: eForMode;
        constructor(node: VComment, condition: string) {
            super(node, condition);

            if (parseForOrderRE.test(condition)/**for in */) {
                this.forMode = eForMode.forIn;
                let s = condition.split(' in ');
                this.forIn = {
                    var: s[0],
                    object: s[1],
                    names: [],
                    source: null,
                    index: 0
                }
            } else if (parseForOrderRE2.test(condition)/**for i;i;i++ */) {
                this.forMode = eForMode.forSplit;

                let s = condition.split(';');
                if (s.length !== 2) {
                    throw new Error("错误的for表达式！");
                }
                this.forSplit = {
                    pre: s[0],
                    exec: s[1],
                    step: s[2],
                    isFirst: true
                }
            } else {
                throw new Error("错误的for表达式！");
            }
        }

        private forSplit: {
            pre: string
            exec: string
            step: string
            isFirst: boolean
        }

        private canPrebuildForSplit(): boolean {
            try {
                exec(this.node, this.forSplit.pre);
                exec(this.node, this.forSplit.step);
                exec(this.node, this.forSplit.exec);
            } catch (error) {
                return false;
            }
            return true;
        }
        private checkForSplit(): boolean {
            if (this.forSplit.isFirst) {
                this.forSplit.isFirst = false;
                exec(this.node, this.forSplit.pre);
            } else {
                exec(this.node, this.forSplit.step);
            }
            return exec(this.node, this.forSplit.exec);
        }

        private forIn: {
            source: any
            var: string
            object: string
            names: string[]
            index: number
        }
        private canPrebuildForIn(): boolean {
            try {
                exec(this.node, this.forIn.object)
            } catch (error) {
                return false;
            }
            return true;
        }
        private initForInSourceData(): boolean {
            if (!this.forIn.source) {
                this.forIn.source = exec(this.node, this.forIn.object);
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
                exec(this.node, this.forIn.var + '=\'' + this.forIn.names[this.forIn.index] + '\';');
                this.forIn.index++;
                return true
            } else {
                return false
            }
        }
        run() {
            let p = <INode>this.node.parentNode;
            let ret: boolean
            if (this.forMode === eForMode.forIn) {
                ret = this.checkForIn();
            } else {
                ret = this.checkForSplit();
            }
            if (this.isBreak || !ret) {
                //全部删除
                removeBlockBetween(this.node, <INode>this.endNode);
                p.removeChild(this.node);
                p.removeChild(<INode>this.endNode);
            } else {

                let nodes = cloneBetween(this.node, <INode>this.endNode);
                //放到前面再来
                p.insertBefore2(createBreakElement(nodes, this), this.node);
            }
        }
    }
    register(For);
}
