/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export class Button{
        panel:VMElement.VDivElement&IVNodeMethod;
        ok:VMElement.VInputElement&IVNodeMethod;
        cancel:VMElement.VInputElement&IVNodeMethod;
        tops:[VMElement.VDivElement&IVNodeMethod];
        initDOM(){
            
            this.panel=<any>$$$("div")
    ("input")._("type")._("name")._("value")
        ("input")._("type")._("name")._("value").$.$;
            this.ok=<any>$$$("input")._("type")._("name")._("value")
    ("input")._("type")._("name")._("value").$;
            this.cancel=<any>$$$("input")._("type")._("name")._("value");
            push.call(this.tops,<any>[
                    $$$("div")
.$.$$(this.panel).$
(`
    
    可完整预编译的例子
    `,ENodeType.Text).$
(`0`,ENodeType.Text).$
(`1`,ENodeType.Text).$
(`2`,ENodeType.Text).$
(`3`,ENodeType.Text).$
(`4`,ENodeType.Text).$
(`

    不可完整预编译的例子，只能生成中间数据（xx未定义）
    `,ENodeType.Text).$
('',ENodeType.PlaceHolder).__(order0)
(`


    可完整预编译的例子
    `,ENodeType.Text).$
(`case x===555`,ENodeType.Text).$
(`


    不可完整预编译的例子，只能生成中间数据（xx未定义）
    `,ENodeType.Text).$
('',ENodeType.PlaceHolder).__(order1)
            ]);
        }
    }

    //因为无法推测运行结果，所以生成中间数据算法在此
    
    function order1(this:VPlaceHolder){
        Order.Switch.run({
            condition:'true',
            placeholder:this,
            blocks:[
                {
                order:'switch',
                condition:'true',
                nodes:[]
            },
                {
                order:'case',
                condition:'xx===5',
                nodes:[$$$(`case xx===5`,ENodeType.Text).$,$$$(`break`,ENodeType.Comment).$,$$$(`2+2
    `,ENodeType.Text).$]
            },
                {
                order:'case',
                condition:'3+3',
                nodes:[$$$(`case 3+3
    `,ENodeType.Text).$,$$$(`default`,ENodeType.Comment).$,$$$(`case 4
    `,ENodeType.Text).$]
            }]
        });

    }
    function order0(this:VPlaceHolder){
        Order.For.run({
            forStepInfo:{first:'',exec:'xx<5',step:'xx++'},
            forInInfo:undefined,
            forMode:1,
            placeholder:this,
            blocks:[
                {
                order:'for',
                condition:';xx<5;xx++',
                nodes:[$$$(`= xx`,ENodeType.Comment).$]
            }]
        });

    }
}