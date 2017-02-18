/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Sat Feb 18 2017 18:39:03 GMT+0800 (中国标准时间)

interface IButtonProps extends ComponentView.IProps {

}
class ButtonView implements ComponentView.IView {
    tops: [VMDOM.VDivElement & IVNodeMethod] = <any>[];
    initDOM(props: IButtonProps, nodes?: (VMDOM.VNode & IVNodeMethod)[]) {
        let S0 = "div", S1 = "xx", S2 = "11", S3 = "xxx";

        push.call(this.tops = <any>[], <(VMDOM.VNode & IVNodeMethod)>
            $$$(S0)._(S1, S2)._(S3, S2)
                .$$__(order1)
                .$$__(order0)
        );


        function order0(this: VMDOM.VPlaceHolder) {
            new (importUI('label', 'ui').part)(null, [$$$(`ui:label组件加载成功`, ENodeType.Text).$]).insertBefore(this);
            this.remove();
        }
        function order1(this: VMDOM.VPlaceHolder) {
            Order.exec(this, '1');
        }
    }
}

