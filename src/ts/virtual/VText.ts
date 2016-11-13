
/// <reference path='VNode.ts'/>
class VText extends VNode{
    nodeName="#text"
    nodeType:VNodeType=3
    get data() {
        return this.__value__;
    }
    set data(s:string) {
        this.__value__ = s;
        if(this.__domNode__){
            this.__domNode__.data = s;
        }
    }
    get value() {
        return this.__value__;
    }
    set value(s:string) {
        this.__value__ = s;
        if(this.__domNode__){
            this.__domNode__.data = s;
        }
    }
    protected toJS():string{
        let s = this.__value__;
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
    toXMLNodeString(): string[] {
        return [this.__value__];
    }
    private __value__:string
    getData():string{
        return this.data;
    }
    __domNode__:Text;
    protected doToDOM():Text{
        let elem:Text;
        if (this.data !== "") {
            let toHelp = document.createElement('__Turtle__');//用于创建
            toHelp.innerHTML = this.data;
            elem = <Text>toHelp.removeChild(toHelp.childNodes[0]);
            //elem=document.createTextNode(this.data);不用这句的原因是为了转码
        } else {
            elem = document.createTextNode('');
        }
        return elem;
    }

    /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
    protected emulation():void{}
}