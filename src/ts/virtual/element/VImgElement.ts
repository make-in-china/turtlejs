/// <reference path="../node/Attribute_Property.ts"/>
interface IVNodeMethod{
    (nodeName: "img", nodeType?: 1): VMElement.VImgElement&IVNodeMethod
}

namespace VMElement{
    export class  VImgElement extends VHtmlElement{
        nodeName="IMG";
        __closeSelf__=true;
        alt:string
        src:string
        srcset:string
        sizes:string
        crossOrigin:string
        useMap:string
        isMap:string
        width:string
        height:string
        name:string
        lowsrc:string
        align:string
        hspace:string
        vspace:string
        longDesc:string
        border:string
        cloneNode(deep:boolean=false):VImgElement&IVNodeMethod{
            let newNode=super.cloneNode(deep);
            for(const name of ["alt","src","srcset","sizes","crossOrigin","useMap","isMap","width","height","name","lowsrc","align","hspace","vspace","longDesc","border"]){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
                return <VImgElement&IVNodeMethod>newNode;
        }
    }
    VAP.decorate(VImgElement,["alt","src","srcset","sizes","crossOrigin","useMap","isMap","width","height","name","lowsrc","align","hspace","vspace","longDesc","border"]);
}