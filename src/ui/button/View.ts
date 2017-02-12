/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
//本模块由引擎生成，请勿手动修改此文件
//生成时间:Sun Feb 12 2017 16:49:47 GMT+0800 (中国标准时间)

interface IButtonProps extends ComponentView.IProps{
    
}
class ButtonView implements ComponentView.IView{
    tops:[VMDOM.VDivElement&IVNodeMethod
,VMDOM.VDivElement&IVNodeMethod
,VMDOM.VDivElement&IVNodeMethod]=<any>[];
    initDOM(props:IButtonProps){
        let S0="div";
    
        push.call(this.tops=<any>[],
                $$$(S0)
.$$__(order0),
                $$$(S0)
.$$__(order0),
                $$$(S0)
.$$__(order0)
        );
    }
}

//因为无法推测运行结果，所以生成中间数据算法在此

function order0(this:VMDOM.VPlaceHolder){
    importUI('label','ui');
    let view=new Component['ui:label'](null);
    view.insertBefore(this);
    this.remove();
}