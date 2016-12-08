
namespace ComponentView{
    export interface IView{
        tops:(VNode&IVNodeMethod)[]
        initDom():void;
    }
}