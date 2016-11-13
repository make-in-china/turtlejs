
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>

class VNodeList{
    length: number;
    item(index: number): VNode&IVNodeMethod|undefined{
        return this[index];
    }
    [index: number]: VNode&IVNodeMethod|undefined;
    static clear(vNodeList:VNodeList){
        for(var i=0;i<vNodeList.length;i++){
            delete vNodeList[i];
        }
        vNodeList.length=0;
    }
}