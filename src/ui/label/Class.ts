/// <reference path="View.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Jan 30 2017 09:16:11 GMT+0800 (中国标准时间)

namespace Component{
    @register
    export class Label extends Part{
        constructor(
            public props:ComponentView.ILabelProps,
            public outerChildNodes?:INode[]
        ) {
            super("label",new ComponentView.Label,props,outerChildNodes);
            new ComponentScript.Label(this);
        }
    }
}