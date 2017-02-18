
namespace ComponentView{
    export interface IProps{}
    export interface IView{
        tops?:(VMDOM.VNode&IVNodeMethod)[]
        initDOM(props:IProps,propsNodes?: (VMDOM.VNode&IVNodeMethod)[]):void;
    }
}