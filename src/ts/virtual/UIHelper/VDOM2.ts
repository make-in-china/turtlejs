
/// <reference path='VDOM.ts'/>
interface IDirective{

}
interface vmData{
    directive:IDirective
}
abstract class VDOM2 extends VDOM {
    /**检查参数引入格式 */
    // static getDirective(html: string, m: IMember):string|null {
    //     switch (html[m.index]) {
    //         case '{':
    //             //可能是指令
    //             this.directive(html,m);
    //             break;
    //         case '<':
    //             if (html[m.index + 1] === '%') {
    //                 debugger;
    //                 m.index += 2;
    //                 return true;
    //             }
    //             break;
    //         case '%':
    //             if (html[m.index + 1] === '>') {
    //                 debugger;
    //                 m.index += 2;
    //                 return true;
    //             }
    //             break;
    //     }
    //     return null;
    // }
    private static getDirectiveByAttributeName(html: string, m: IMember):string|null{
        //${}  ：式子
        //{} :  变量
        //这里输入算式
        switch (html[m.index]) {
            case '{':

        }
        return null;
    }
    static attributes(html: string, m: IMember) {
        let directive=this.getDirectiveByAttributeName(html,m);
        if(directive===null){
            super.attributes(html, m);
            return;
        }

    }
    static stringNode(html: string, m: IMember) {
        if (!this.checkTemplate(html, m)) {
            super.stringNode(html, m);
        }
    }
    static attrValue(html: string, m: IMember) {
        if (!this.checkTemplate(html, m)) {
            super.attrValue(html, m);
        }
    }
}
