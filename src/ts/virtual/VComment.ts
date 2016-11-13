
/// <reference path='VNode.ts'/>
class VComment extends VNode{
    nodeName="#Comment"
    nodeType:VNodeType=8
    data=""
    __dbplus__:boolean=false;
    getData():string{
        return this.data;
    }
    protected toJS():string{
        let s = this.data;
        s = s.replace(/[\'\"\r\n]/g, function (s: string) {
            switch (s) {
                case '\'':
                case '\"':
                    return '\\' + s;
                case '\r':
                    return '\\r';
                case '\n':
                    return '\\n';
            }
            return "";
        });
        return `("${s}",3)`;
    }
    toHTMLString(): string[] {
        let
            ret: string[] = [];
        if (this.__dbplus__) {
            ret.push('<!--' + this.data + '-->');
        } else {
            ret.push('<!' + this.data + '>');
        }
        return ret;
    }
    protected doToDOM():Comment{
        let elem = document.createComment(this.data);
        return elem;
    }
    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{

    }
}