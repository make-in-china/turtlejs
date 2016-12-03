
/// <reference path='VPlaceHolder.ts'/>
interface IVNodeMethod{
    (data: string, nodeType: ENodeType.Script): VScript&IVNodeMethod;
}
class VScript extends VPlaceHolder{
    nodeName="#script"
    toJS():string{
        return `(function(this:VScript){${this.data}},${ENodeType.Script}).$`;
    }
}