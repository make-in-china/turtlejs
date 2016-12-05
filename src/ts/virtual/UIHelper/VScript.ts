/// <reference path='../node/VPlaceHolder.ts'/>
interface IVNodeMethod{
    (data: string, nodeType: ENodeType.Script): VScript&IVNodeMethod;
}
class VScript extends VPlaceHolder{
    nodeName="#script"
    toJS():string{
        return `('',ENodeType.PlaceHolder).__(${this.propertyName})`;
    }
    propertyName:string
    toFunction():string{
        return `function ${this.propertyName}(this:VPlaceHolder){${this.data}
    }`;
    }
}