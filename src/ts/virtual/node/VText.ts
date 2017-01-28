
/// <reference path='VCharacterData.ts'/>
interface IVNodeMethod{
    (nodeName: any, nodeType: ENodeType.Text): VMDOM.VText&IVNodeMethod;
}

function isVText(node: VMDOM.VNode): node is VMDOM.VText {
    return node.nodeType === ENodeType.Text
}

namespace VMDOM{
    export let getFunctionBlock=(function(){
        let re=/(^.*?(function.*?\(.*?\).*?\{)|(\(.*?\)\=>\{))([\s\S\w\W]*)\}$/;
        return function getFunctionBlock(fn:Function):string{
            var ret=fn.toString();
            var match:RegExpMatchArray|null=ret.match(re);
            if(match){
                return match[4];
            }
            return "";
        }
    }());
    @register('#text',ENodeType.Text)
    export class VText extends VCharacterData{
        nodeName="#text"
        nodeType:ENodeType.Text=ENodeType.Text
        private __value__=""
        constructor(data:any){
            super();
            if(isString(data)){
                this.__value__=data;
            }else if(isFunction(data)){
                this.__value__=getFunctionBlock(data);
            }else{
                this.__value__=data.toString();
            }
        }
        cloneNode(deep:boolean):VText&IVNodeMethod{
            return $$$(this.__value__,ENodeType.Text);
        }
        
        // wholeText: string;
        // replaceWholeText(content: string): Text;
        // splitText(offset: number): Text;
        get data() {
            return this.__value__;
        }
        set data(s:string) {
            this.__value__ = s;
            if(this.vmData.domNode){
                (<Text>this.vmData.domNode).data = s;
            }
        }
        get value() {
            return this.__value__;
        }
        set value(s:string) {
            this.data=s
        }
        
        toCreateJS(space:number=0):string{
            return (new Array(space+1)).join(" ")+'(`'+ this.__value__+'`,ENodeType.Text)';
        }
        toJS(space:number=0):string{
            return this.toCreateJS(space)+'.$';
        }
        toHTMLString(): string[] {
            return [this.__value__];
        }
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
            this.vmData.domNode = elem;
            return elem;
        }
        /**转换为真实dom节点后对虚拟dom的操作转接到真实dom */
        protected emulation():void{}
    }
}