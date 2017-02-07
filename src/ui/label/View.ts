/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件
//生成时间:Sun Feb 05 2017 22:16:29 GMT+0800 (中国标准时间)

namespace ComponentView{
    export interface ILabelProps extends IProps{
        
    }
    export class Label implements IView{
        tops:[VMDOM.VDivElement&IVNodeMethod]=<any>[];
        initDOM(props:ILabelProps){
            
            push.call(this.tops=<any>[],<(VMDOM.VNode&IVNodeMethod)>
                    $$$("div")

                    (`@@while();
    @@end;

    @@do();
    @@end();

    @@for( ; ; );
    @@end;

    @@if();
    @@elseif();
    @@else();
    @@end;

    @@switch();
    @@case();
    @@case();
    @@case();
    @@default;
    @@end;

    @@break;
    @@{}`,ENodeType.Comment).$
            );
        }
    }

}