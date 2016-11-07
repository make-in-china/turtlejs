
/// <reference path="EventsHelper.ts"/>
interface IPartRefs {
    [index: string]: IHTMLElement | undefined
    resize?: IHTMLElement
    main?: IHTMLElement
}

interface IPartEventsManage{
    getEventHelper(type:"init"):EventsHelper<((part:PartBase)=>void),()=>boolean>;
    getEventHelper(type:"setsize"):EventsHelper<((part:PartBase,rect:ClientRect)=>void),(part:PartBase,rect:ClientRect)=>boolean>;
}
class PartBase extends EventEmitter {

    /** 
     * 组件名
    */
    partName: string;
    /**
     * 是否已插入DOM
     */
    isInDOM: boolean;
    /**
     * 组件的方法属性
     */
    $: Service;
    /**
     * DOM节点存储数组
     */
    private nodeStore: INode[] = [];
    /**
     * 节点命名空间
     */
    refs: IPartRefs = {}

    /**
     * 实时子Part数组
     */
    get child(): PartBase[] { return getParts(this.elements); }
    /**
     * 实时子节点
     */
    get elements(): INode[] { return [] }
    // super:PartBase|null=null;
    // partMain:IHTMLElement;
    // isExtends:boolean;

    /**
     * 缓存事件管理器
     */
    private eventHelpers:{[index:string]:EventsHelper<ICallBack,Function>}={}
    /**
     * 生成或获取一个事件管理器
     */
    getEventHelper(type:string):any{
        var eventHelper=this.eventHelpers[type];
        if(!eventHelper){
        }else{
            eventHelper=this.eventHelpers[type]=new EventsHelper(this,type);
        }
        return eventHelper;
    }
    /**
     * setsize事件管理器
     */
    $setSize=(<IPartEventsManage>this).getEventHelper("setsize")

    /**
     * 初始化对象
     */
    constructor(public template: PartTemplate, public props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection) {
    // constructor(public template: PartTemplate, extPart: PartBase | undefined, public props: Object, html: string, outerChildNodes: INodeArray, outerElement: IHTMLCollection) {
        super();
        this.$ = new Service(template.service);
        this.partName = template.partName;
        // if(extPart){
        //     /**继承 */
        //     this.__proto__=extPart;   
        // }
        // if(!isUndefined(extPart)){
        //     this.super=extPart;
        // }
        let dom = $DOM(html);
        let nodes = dom.childNodes;

        initHTML(nodes, outerChildNodes, outerElement, props, this);
        for (let i = nodes.length; i > 0; i--) {
            this.nodeStore.push(dom.removeChild(nodes[0]));
        }
    }
    /**
     * 设置组件宽高
     */
    setSize(rect: ClientRect) {
        
        if (this.refs.resize) {
            let style = this.refs.resize.style;
            style.left = rect.left + 'px';
            style.top = rect.top + 'px';
            style.width = rect.width + 'px';
            style.height = rect.height + 'px';
            style.boxSizing = 'border-box';
            // this.emitResize();
            this.$setSize.emit(this, rect);
        }
        // if(this.onSetSize){
        //     return this.onSetSize(rect);
        // }
        // if(this.super){
        //     this.super.setSize(rect);
        // }
    }
    // emitResize(){
    //     try{
    //         if(!this.isInDOM){
    //             return;
    //         }
    //         if(this.onresize){
    //             if(this.onresize()){
    //                 return;
    //             }   
    //         }
    //         let cs=this.child;
    //         for(let i=0;i<cs.length;i++){
    //             cs[i].emitResize();
    //         }
    //     }catch(e){
    //         _catch(e);
    //     }
    // }
    // getSuper(name:string){
    //     if(this.super){
    //         if(this.super.template.name===name){
    //             return this.super;    
    //         }else{
    //             return this.super.getSuper(name);
    //         }
    //     }
    // }
    // emitInit(finalPart){
    //     if(this.super){
    //         this.super.emitInit(finalPart);
    //     }
    //     if(isFunction(this.oninit)){
    //         this.oninit(finalPart);
    //     }
    // }
}
