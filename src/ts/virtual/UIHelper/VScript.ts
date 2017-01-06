/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType {
    Script = 103
}
interface IVNodeMethod {
    (data: string, nodeType: ENodeType.Script): VMDOM.VScript & IVNodeMethod;
}
namespace VMDOM {
    @register('#script', ENodeType.Script)
    export class VScript extends VPlaceHolder {
        nodeName = "#script"
        nodeType = ENodeType.Script
        toJS(): string {
            return `.$$__(${this.propertyName})`;
        }
        propertyName: string
        toFunction(): string {
            return `function ${this.propertyName}(this:VMDOM.VPlaceHolder){${this.data}
    }`;
        }
    }
    // bindClassToFunction2Helper['#script'] = bindClassToFunctionHelper[ENodeType.Script] = function (node: IVNodeMethod & VNode, nodeName: string) {
    //     node.__proto__ = VScript.prototype;
    //     VScript.call(node, nodeName);
    // }
}