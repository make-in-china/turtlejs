/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Sat Feb 18 2017 17:58:46 GMT+0800 (中国标准时间)

interface ILabelProps extends ComponentView.IProps{
    
}
class LabelView implements ComponentView.IView{
    tops:[VMDOM.VDivElement&IVNodeMethod]=<any>[];
    initDOM(props:ILabelProps,nodes?:(VMDOM.VNode&IVNodeMethod)[]){
        let S0="div";
        
        push.call(this.tops=<any>[],<(VMDOM.VNode&IVNodeMethod)>
            $$$(S0)
.$$__(order0)
        );
        
        //因为无法推测运行结果，所以生成中间数据算法在此
        
    function order0(this:VMDOM.VPlaceHolder){
        Order.Nodes.run({
            placeholder:this
        });
    }
    }
}

