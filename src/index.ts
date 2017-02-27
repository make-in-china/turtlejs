
/// <reference path='./main/Turtle.ts'/>

// if(!$DOM){
//     $DOM=function(html){
//         var elem=document.createElement('ui:dom');elem.innerHTML=html;return elem;
//     }
//     $node=<any>function(name:string,nodeType?:number):INode|null{
//         switch(nodeType){
//             case 3:
//                 return <any>document.createTextNode(name);

//             case 8:
//                 return <any>document.createComment(name);
                
//             case 1:
//             case undefined:
//                 return <any>document.createElement(name);
                
//             case 10:
//                 return null;
                
//             default:
//                 return null;
//         }
//     };
// }

let turtle=new Turtle();

var $t=<ITurtle>turtle;
