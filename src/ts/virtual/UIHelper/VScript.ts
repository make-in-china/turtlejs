/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType {
    Script = 103
}
interface IVNodeMethod {
    (data: string, nodeType: ENodeType.Script): VMDOM.VScript & IVNodeMethod;
}
namespace VMDOM {
    export class VScript extends VPlaceHolder {
        nodeName = "#script"
        toJS(): string {
            return `('',ENodeType.PlaceHolder).__(${this.propertyName})`;
        }
        propertyName: string
        toFunction(): string {
            return `function ${this.propertyName}(this:VPlaceHolder){${this.data}
    }`;
        }
    }
    bindClassToFunctionHelper[ENodeType.Script] = function (node: IVNodeMethod & VNode, nodeName: string) {
        node.__proto__ = VScript.prototype;
        VScript.call(node, nodeName);
    }
}