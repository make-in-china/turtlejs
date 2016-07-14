
type Fun=(...arg)=>void
let $t,
    $rootScope,
    $client,
    $DOM,
    $node,
    $VDOM,
    $VNode,
    VTemplate;
    
interface INode{
    nodeName?:string;
    innerText?:string;
    childNodes?:Array<INode>;
    parentNode?:INode;
}
interface IElement extends INode{
    
    hasAttribute?(attrName:string):boolean;
    getAttribute?(attrName:string):string;
    removeAttribute?(attrName:string):INode;
    innerHTML?:string;
    children?:Array<INode>;
    attributes?;
    style?;
    className?:string;
}
interface IVText extends INode{
    
}
interface IComment extends INode{
    
}
interface ITextAreaElement extends IElement{
    defaultValue?:string;
}

interface Object {
    __proto__?:Object
}
