/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export interface IButtonProps{
        date?:string
        bool?:string
    }
    export class Button{
        static defaultValuesInfo=['date','bool'];
        panel:VMElement.VDivElement&IVNodeMethod;
        tops:[VMElement.VDivElement&IVNodeMethod];
        initDOM(props:IButtonProps){
            
            this.panel=<any>$$$("div");
            this.panel.___(function(this:VMElement.VDivElement&IVNodeMethod){
                let $date:any=props.date;
                if($date===undefined){
                    $date='2016年12月12日11小时01分20秒';
                }
                $date=PartParamFilter.date($date,'yyyy年MM月dd日hh小时mm分ss秒');
                this._('date',$date.toString());
                let $bool:any=props.bool;
                if($bool===undefined){
                    $bool='false';
                }
                $bool=PartParamFilter.bool($bool);
                this._('bool',$bool.toString());
            });
            push.call(this.tops,<any>[
                    $$$("div")
                    .$$$(this.panel)
            ]);
        }
    }

}