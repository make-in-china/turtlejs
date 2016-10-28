/// <reference path="../../../dest/js/turtle.d.ts"/>
class Button extends Part{
	constructor(
        template:PartTemplate,
        extPart:PartBase,
        public props:Object,
        html:string,
        outerChildNodes:INodeArray,
        outerElement:IHTMLCollection
    ) {
        super(template,extPart,props,html,outerChildNodes,outerElement);
        var node;
        if(outerElement.length!==0){
            node=outerElement[0];
            if(node.nodeName==="SCRIPT"){
                var script=node.innerHTML;
                if(script.length>0){
                    var fn;
                    var keyVar=getAttr(node,'var','');
                    fn=Function('event'+(keyVar?',':'')+keyVar,'try{'+script+'}catch(e){console.log(e);debugger;}');
                    var args=[];
                    if(keyVar.length>0){
                        var keyVarArray=keyVar.split(',');
                        for(var i=0;i<keyVarArray.length;i++){
                            var ui=$t.refNode[keyVarArray[i]];
                            if(ui){
                                args.push(ui[ui.length-1]);
                            }else{
                                args.push(null);
                            }
                            
                        }
                    }
                    this.children[0].addEventListener('click',function(e){
                        var _args=Array.prototype.slice.call(args);
                        _args.unshift(e);
                        fn.apply(this,_args);
                    },false);
                }
            }
        }
	}
    
}
