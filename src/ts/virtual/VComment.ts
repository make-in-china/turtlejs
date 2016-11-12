
/// <reference path='VNode.ts'/>
class VComment extends VNode{
    data=""
    __dbplus__:boolean=false;
    getData():string{
        return this.data;
    }
    toXMLNodeString(this: VComment): string[] {
        let
            ret: string[] = [],
            sAttr = '',
            arrAttr = [],
            attr = this.attributes,
            me = this;
        if (attr) {
            for (let i = 0; i < attr.length; i++) {
                if (attr[i].value) {
                    arrAttr.push(attr[i].name + '="' + attr[i].value + '"');
                } else {
                    arrAttr.push(attr[i].name);
                }
            }
            if (arrAttr.length > 0) {
                sAttr = ' ' + arrAttr.join(' ');
            }
        }
        if (me.__dbplus__) {
            ret.push('<!--' + me.data + '-->');
        } else {
            ret.push('<!' + me.data + '>');
        }
        return ret;
    }
}