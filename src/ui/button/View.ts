/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Feb 13 2017 00:26:49 GMT+0800 (中国标准时间)

interface IButtonProps extends ComponentView.IProps{
    
}
class ButtonView implements ComponentView.IView{
    tops:[VMDOM.VDivElement&IVNodeMethod]=<any>[];
    initDOM(props:IButtonProps,nodes?:(VMDOM.VNode&IVNodeMethod)[]){
        let S0="div";
        
        push.call(this.tops=<any>[],<(VMDOM.VNode&IVNodeMethod)>
            $$$(S0)
.$$__(order0)
        );
        
        //因为无法推测运行结果，所以生成中间数据算法在此
        
    function order0(this:VMDOM.VPlaceHolder){
        new (importUI('label','ui').part)(null,[$$$(`加载成功`,ENodeType.Text).$]).insertBefore(this);
        this.remove();
    }
    }
}

