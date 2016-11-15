/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class Button{
        cancel=VNodeHelp
("INPUT")._("ref","cancel")._("type")._("name")._("value").$;
        ok=VNodeHelp
("INPUT")._("ref","ok")._("type")._("name")._("value").$;
        panel=VNodeHelp
("DIV")._("ref","panel").appendChild(this.ok).$.appendChild(this.cancel).$;
        tops=[VNodeHelp
("DIV").appendChild(this.panel).$]
    }
}