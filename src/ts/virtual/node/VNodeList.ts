
/// <reference path='.d.ts'/>
/// <reference path='VNode.ts'/>

class VNodeList{
    length: number=0;
    item(index: number): VNode&IVNodeMethod|undefined{
        return this[index];
    }
    [index: number]: VNode&IVNodeMethod|undefined;
    static clear(vNodeList:VNodeList){
        for(var i=0;i<vNodeList.length;i++){
            (<VNode>vNodeList[i]).parentNode=null;
            delete vNodeList[i];
        }
        vNodeList.length=0;
    }
}