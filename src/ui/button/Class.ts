/// <reference path="View.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Jan 30 2017 06:54:45 GMT+0800 (中国标准时间)

class Button extends Component.Part{
    constructor(
        public props:IButtonProps,
        public outerChildNodes?:(VMDOM.VNode&IVNodeMethod)[]
    ) {
        super("button",new ButtonView,props,outerChildNodes);
        initButton(this);
    }
}

