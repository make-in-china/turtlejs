/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class Button{
        cancel:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value");
        ok:VMElement.VInputElement&IVNodeMethod=<any>VNodeHelp
("INPUT")._("type")._("name")._("value").appendChild(this.cancel).$;
        panel:VMElement.VDivElement&IVNodeMethod=<any>VNodeHelp
("DIV").appendChild(this.ok).$;
        tops:[VMElement.VDivElement&IVNodeMethod]=[<any>VNodeHelp
("DIV").appendChild(this.panel).$
    ("DIV")(`
        if 1
    `,3).$.$]
    }
}