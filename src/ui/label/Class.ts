/// <reference path="View.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Jan 30 2017 09:16:11 GMT+0800 (中国标准时间)

class Label extends Component.Part{
    constructor(
        public props:ILabelProps,
        public outerChildNodes?:(VMDOM.VNode&IVNodeMethod)[]
    ) {
        super("label",new LabelView,props,outerChildNodes);
        initLabel(this);
    }
}