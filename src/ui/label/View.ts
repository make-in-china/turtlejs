/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Feb 13 2017 00:31:25 GMT+0800 (中国标准时间)

interface ILabelProps extends ComponentView.IProps{
    
}
class LabelView implements ComponentView.IView{
    tops:[VMDOM.VDivElement&IVNodeMethod]=<any>[];
    initDOM(props:ILabelProps,nodes?:(VMDOM.VNode&IVNodeMethod)[]){
        let S0="div";
        
        push.call(this.tops=<any>[],<(VMDOM.VNode&IVNodeMethod)>
            $$$(S0)

        );
        
    }
}

