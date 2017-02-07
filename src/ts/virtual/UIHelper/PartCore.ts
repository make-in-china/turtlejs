/// <reference path='../../part/partCore.ts'/>
function renderVMComponent(
        this:void,
        uiNode:VMDOM.VHtmlElement|null,
        // outerChildNodes: INode[], 
        // outerElement: IHTMLCollection,
        props:ComponentView.IProps|null,
        uiInfo: string | {
            sortPath: string;
            name: string;
        }
    ){
        let name:string
        let sortPath:string
        if(isString(uiInfo)){
            name=uiInfo;
            sortPath='ui';
        }else{
            name=uiInfo.name;
            sortPath=uiInfo.sortPath;
        }



        let UI= importUI(name, sortPath);

        //检验ui是否可以预渲染
        

        // if (!UI) {
        //     if(uiNode){
        //         removeNode(uiNode);
        //     }
        //     throw new Error(name + '组件不存在！');
        // }
        // let ui=new UI({},outerChildNodes,outerElement);  

        // if(props===null){
        //     props={};
        // }

        // let 
        //     ext,
        //     attrs:INamedNodeMap,
        //     len,
        //     html;
            
        
        
        // if(uiNode===null){
        //     uiNode=<IHTMLElement>$node('ui:render');//document.createElement("ui:render");
        // }else{
        //     // setQuestionAtrr(uiNode,outerChildNodes,outerElement,part?part.props:props,part);
        
        //     attrs=uiNode.attributes;
        //     len=attrs.length;
        //     for(let i=0;i<len;i++){
        //         let name=attrs[0].name;
        //         if(!props.hasOwnProperty(name)){
        //             props[name]=attrs[0].value;    
        //         }
        //         uiNode.removeAttributeNode(attrs[0]);
        //     }
        // }
        // html=this.joinDatasByProps(props);
        // if(html===undefined){
        //     return;
        // }
        
        // if(reExtends){
        //     ext=getExtends(reExtends,this.sortPath);
        // }
        // if(!ext){
        //     ext=this.extends;
        // }
        // // if(ext instanceof PartTemplate){
        // //     ext=ext.beExtends(uiNode,that,outerChildNodes,outerElement,props,part);
        // // }
        // // let newPart=new Part(this,ext,props,html,outerChildNodes,outerElement);
        // let newPart=new Part(this,props,html,outerChildNodes,outerElement);
        // if(refPartName){
        //     /**放置到全局引用 */
        //     KeyArrayHashObjectManage.push($t.parts,refPartName,newPart);
        // }
        // this.parts.push(newPart);
        
        // if(uiNode.parentNode!==null){
        //     //let p=uiNode.parentNode.__domNode__;
        //     newPart.insertBefore(uiNode);
        //     removeNode(uiNode);
        //     /*if(p){
        //         debugger;
        //         vNodesToDOM(part.store);
        //     }*/
        // }
        // return newPart;
    }