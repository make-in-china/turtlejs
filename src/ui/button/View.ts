/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class Button{
        cancel:VMElement.VInputElement&IVNodeMethod;
        ok:VMElement.VInputElement&IVNodeMethod;
        panel:VMElement.VDivElement&IVNodeMethod;
        tops:[VMElement.VDivElement&IVNodeMethod];
        initDOM(){
            push.call(this.tops,<any>[
                    $$$("div")
.$.appendChild(this.panel).$
(function(this:VScript){
    Order.For.run({
        condition:';xx<5;xx++',
        forStepInfo:{"first":"","exec":"xx<5","step":"xx++","isFirst":true},
        forInInfo:undefined,
        forMode:1,
        isBlockStart:Order.RepeatBlockOrder.isBlockStart,
        placeholder:this,
        isBreak:false,
        blocks:[
            {
    order:'for',
    condition:';xx<5;xx++',
    nodes:[$$$(`= xx`,8).$]
}]
    });},22).$
(function(this:VScript){Order.Switch.run({
                isBlockStart:Order.If.isBlockStart,
                placeholder:this,
                isBreak:false,
                blocks:[{
    order:'switch',
    condition:'true',
    nodes:[]
},{
    order:'case',
    condition:'xx===5',
    nodes:[$$$(`
        1+1
        `,3).$,$$$(`break`,8).$,$$$(`
        2+2
    `,3).$]
},{
    order:'case',
    condition:'3+3',
    nodes:[$$$(`
        3+3
    `,3).$,$$$(`default `,8).$,$$$(`
        4
    `,3).$]
}]
            });},22).$
            ]);
            this.cancel=<any>$$$("input")._("type")._("name")._("value");
            this.ok=<any>$$$("input")._("type")._("name")._("value")
.$.appendChild(this.cancel).$;
            this.panel=<any>$$$("div")
.$.appendChild(this.ok).$;
        }
    }
}