
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>

class VNodeList{
    length: number;
    item(index: number): VNode|undefined{
        return this[index];
    }
    [index: number]: VNode|undefined;
}