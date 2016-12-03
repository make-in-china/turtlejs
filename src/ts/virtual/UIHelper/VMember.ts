
/// <reference path='VPlaceHolder.ts'/>
interface IVNodeMethod{
    (nodeName: string, nodeType: ENodeType.Member): VMember&IVNodeMethod;
}
class VMember extends VPlaceHolder{
    nodeName="#member"
    toJS():string{
        return `.$.appendChild(this.${this.data}).$`;
    }
}