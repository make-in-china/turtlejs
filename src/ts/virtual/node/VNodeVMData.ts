/// <reference path="../../core/EventEmitterEx.ts"/>
namespace VMDOM{
    export class VNodeVMData{
        data:string=""
        __:Object={}
        domNode:Node|null=null
        /**是否闭合 */
        isClose:boolean=false
        /**是否自闭合 */
        /** */
        closeSelf:boolean=false
        
    }
}
