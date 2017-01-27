/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Fri Jan 27 2017 10:11:44 GMT+0800 (中国标准时间)

namespace ComponentView{
    export interface IButtonProps extends IProps{
        
    }
    export class Button implements IView{
        tops:[VMDOM.VDivElement&IVNodeMethod]=<any>[];
        initDOM(props:IButtonProps){
            
            push.call(this.tops,<(VMDOM.VNode&IVNodeMethod)>
                    $$$("div")
                    (`
    加载成功
`,ENodeType.Text).$
            );
        }
    }

}