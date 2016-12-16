/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export interface IButtonProps{
        
    }
    export class Button{
        tops:[VMElement.VDivElement&IVNodeMethod];
        initDOM(props:IButtonProps){
            
            push.call(this.tops,<any>[
                    $$$("div")
('',ENodeType.PlaceHolder).__(order1)
('',ENodeType.PlaceHolder).__(order0)
('',ENodeType.PlaceHolder).__(order1)
('',ENodeType.PlaceHolder).__(order0)
('',ENodeType.PlaceHolder).__(order1)
('',ENodeType.PlaceHolder).__(order0)
            ]);
        }
    }

    //因为无法推测运行结果，所以生成中间数据算法在此
    
    function order0(this:VPlaceHolder){
        Order.BindExpressions.run({
            object:['','i'],
            function:null,
            placeholder:this
        });
    }
    function order1(this:VPlaceHolder){
        Order.BindExpressions.run({
            object:['((data).arr)','(i+1-1)*2/2'],
            function:{
                params:[`v`],
                content:`function(){return 'v+i='+(v+i)+';'}()`
            },
            placeholder:this
        });
    }
}