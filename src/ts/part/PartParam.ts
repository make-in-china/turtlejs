
/// <reference path='../core/EventEmitter.ts'/>
/// <reference path='partcore.ts'/>
/// <reference path='../lib/debughelper.ts'/>
/// <reference path='../main/lib.ts'/>
/// <reference path='../lib/HashObject.ts'/>
/// <reference path='Template.ts'/>
/// <reference path='PartParamFilter.ts'/>
const colorRE=/^\s*((#[\dabcdefABCDEF]{3,6})|(rgba\(.*\)))\s*$/
interface ITurtle{
    parts:IKeyArrayHashObject<Part>;
    service:Service;
    T:Template;
}

class PartParam{
    constructor(public name:string,public hasDefault:boolean,public filter,public filterParam:string,public defaultValue:string,public limitValue:string){}
}

// class ExtendsPart extends PartBase{

//     constructor(template:PartTemplate,extPart:PartBase|undefined,public props:Object,html:string,outerChildNodes:INodeArray,outerElement:IHTMLCollection){
//         super(template,props,html,outerChildNodes,outerElement);
//         // this.isExtends=true;
//     }
//     to(part:PartBase){
//         /**剪切厡型链 */
//         let proto=part.$.__proto__;
//         this.$.__proto__=proto;
//         part.$.__proto__=this.$;
//         if(this.super){
//             (<ExtendsPart>this.super).to(part);
//         }
//         push.apply(part.store,this.store);
//     }
// }
