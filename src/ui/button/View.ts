/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export interface IButtonProps{
        
    }
    export class Button{
        tops:[VMDOM.VDivElement&IVNodeMethod];
        initDOM(props:IButtonProps){
            
            push.call(this.tops,<any>[
                    $$$("div")




                    (`

    @{for var data={arr:[0]},i=0;i<3;i++,data.arr.push(i)}
        @{- 
            ((data).arr)[(i+1-1)*2/2]:v=>'v+i='+(v+i)+';'
        }
        @{- i}
    @{end}
`,ENodeType.Text).$
            ]);
        }
    }

}