/// <reference path='../node/VPlaceHolder.ts'/>

const enum ENodeType {
    Script = 103
}
interface IVNodeMethod {
    (data: string, nodeType: ENodeType.Script): VMDOM.VScript & IVNodeMethod;
}
namespace VMDOM {
    
    @register('#script', ENodeType.Script)
    /** 预编译脚本 */
    export class VScript extends VPlaceHolder {
        nodeName = "#script"
        nodeType = ENodeType.Script
        toJS(): string {
            return `.$$__(${this.propertyName})`;
            //需要UIHelper配合
        }
        propertyName: string
        toFunction(): string {
            return `function ${this.propertyName}(this:VMDOM.VPlaceHolder){${this.data}
    }`;
        }
    }
}