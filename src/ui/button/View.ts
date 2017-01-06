/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>

//本模块由引擎生成，请勿手动修改此文件

namespace ComponentView{
    export interface IButtonProps{
        
    }
    export class Button{
        tops:[VMDOM.VDivElement&IVNodeMethod];
        initDOM(props:IButtonProps){
            
            push.call(this.tops,<(VMDOM.VNode&IVNodeMethod)>
                    $$$("div")
.$$__(order4)
.$$__(order0)
.$$__(order3)
.$$__(order2)
.$$__(order1)
.$$__(order0)
.$$__(order3)
.$$__(order2)
.$$__(order1)
.$$__(order0)
.$$__(order3)
.$$__(order2)
.$$__(order1)
.$$__(order0)
            );
        }
    }

    //因为无法推测运行结果，所以生成中间数据算法在此
    
    function order0(this:VMDOM.VPlaceHolder){Order.exec(this,'i<3');
    }
    function order1(this:VMDOM.VPlaceHolder){Order.exec(this,'i++,data.arr.push(i)');
    }
    function order2(this:VMDOM.VPlaceHolder){
        Order.BindExpressions.run({
            object:['','i'],
            function:null,
            placeholder:this
        });
    }
    function order3(this:VMDOM.VPlaceHolder){
        Order.BindExpressions.run({
            object:['((data).arr)','(i+1-1)*2/2'],
            function:{
                params:[`v`],
                content:`'v+i='+(v+i)+';' `
            },
            placeholder:this
        });
    }
    function order4(this:VMDOM.VPlaceHolder){Order.exec(this,'{arr:[0]}');
    }
}