/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
namespace ComponentView{
    export class Button{
        cancel:VMElement.VInputElement&IVNodeMethod;
        ok:VMElement.VInputElement&IVNodeMethod;
        panel:VMElement.VDivElement&IVNodeMethod;
        tops:[VMElement.VDivElement&IVNodeMethod];
        initDOM(){
            push.call(this.tops,
                [
                    <any>$$$
("div").appendChild(this.panel).$(`1`,3).$(`2`,3).$(`3`,3).$(`4`,3).$(`
        1+1
        `,3).$
                ]
            );
            this.cancel=<any>$$$
("input")._("type")._("name")._("value");
            this.ok=<any>$$$
("input")._("type")._("name")._("value").appendChild(this.cancel).$;
            this.panel=<any>$$$
("div").appendChild(this.ok).$;
        }
    }
}