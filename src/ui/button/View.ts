/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class Button{
        cancel3:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value")(`
        1234567890
    `,3).$;
        ok3:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value").appendChild(this.cancel3).$;
        panel3:VMElement.VDivElement&IVNodeMethod=<any>VNodeHelp
("DIV").appendChild(this.ok3).$;
        cancel2:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value")(`
        1234567890
    `,3).$;
        ok2:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value").appendChild(this.cancel2).$;
        panel2:VMElement.VDivElement&IVNodeMethod=<any>VNodeHelp
("DIV").appendChild(this.ok2).$;
        cancel1:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value")(`
        1234567890
    `,3).$;
        ok1:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value").appendChild(this.cancel1).$;
        panel1:VMElement.VDivElement&IVNodeMethod=<any>VNodeHelp
("DIV").appendChild(this.ok1).$;
        tops:[VMElement.VDivElement&IVNodeMethod
,VComment&IVNodeMethod
,VMElement.VDivElement&IVNodeMethod
,VComment&IVNodeMethod
,VMElement.VDivElement&IVNodeMethod]=[<any>VNodeHelp
("DIV").appendChild(this.panel1).$,<any>VNodeHelp(``,8).$,<any>VNodeHelp
("DIV").appendChild(this.panel2).$,<any>VNodeHelp(``,8).$,<any>VNodeHelp
("DIV").appendChild(this.panel3).$]
    }
}