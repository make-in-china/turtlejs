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
('',ENodeType.PlaceHolder).__(order0)
            ]);
        }
    }

    //因为无法推测运行结果，所以生成中间数据算法在此
    
    function order0(this:VPlaceHolder){
        Order.For.run({
            forStepInfo:{first:'data,{arr:[0]},true,i,0,false',exec:'i<3',step:'i++,data.arr.push(i)'},
            forInInfo:undefined,
            forMode:1,
            placeholder:this,
            blocks:[
                {
                order:'for',
                condition:'var data={arr:[0]},i=0;i<3;i++,data.arr.push(i)',
                nodes:[$$$(`- ((data).arr)[(i+1-1)*2/2]`,ENodeType.Comment).$]
            }]
        });

    }
}