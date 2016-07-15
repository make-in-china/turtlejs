/// <reference path='turtle.ts'/>
/// <reference path='plugin/index.ts'/>

if(!$DOM){
    $DOM=function(html){
        var elem=document.createElement('ui:dom');elem.innerHTML=html;return elem;
    }
    $node=function(name:string,nodeType?:number):INode{
        switch(nodeType){
            case 3:
                return document.createTextNode(name);

            case 8:
                return document.createComment(name);
                
            case 1:
            case undefined:
                return document.createElement(name);
                
            case 10:
                return null;
                
            default:
                return null;
        }
    };
}


let turtle=$t=new Turtle();