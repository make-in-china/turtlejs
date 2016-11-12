
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>

class VNodeList{
    length: number;
    item(index: number): VNode&IVNodeMethod|undefined{
        return this[index];
    }
    [index: number]: VNode&IVNodeMethod|undefined;
}