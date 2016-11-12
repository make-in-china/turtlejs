
class VAP{
    static getAttr(node:VHTMLElement,name:string):string{
        var ret:string|null=node.getAttribute(name);
        if(ret){
            return ret;
        }else{
            return ""
        }
    }
    static setAttr(node:VHTMLElement,name:string,value:string){
        debugger;
    }
    static decorate<T extends VHTMLElement>(vclass:T,names:string[]){
        var prototype:Object=(<any>vclass).prototype;
        for(const name of names){
            Object.defineProperty(prototype,name,{
                get:function(this:T):string{
                    return VAP.getAttr(this,name);
                },
                set:function(this:T,v:string){
                    VAP.setAttr(this,name,v);
                }
            })
        }
    }
}
// function setGetSetPropertyWithAttribute(o, attributes, name) {
//         let hideValueName = '__' + name + '__';
//         Object.defineProperty(attributes, hideValueName, {
//             value: "",
//             writable: true,
//             enumerable: false,
//             configurable: false
//         }
//         )
//         Object.defineProperty(o, name, {
//             get: function () {
//                 return attributes[hideValueName];
//             },
//             set: function (s) {
//                 this.setAttribute(name, s);
//             }
//         });
//     }
// function setProto(t) {
//     let proto = htmlNodeInfo[t.nodeName];
//     if (isArray(proto)) {
//         // (htmlNodeInfo[t.nodeName] = t.__proto__ = newObject(t.nodeName[0] + t.nodeName.substring(1))).__proto__ = prototype;
//         (htmlNodeInfo[t.nodeName] = t.__proto__ = {}).__proto__ = prototype;
//         for (let i in proto) {
//             setGetSetPropertyWithAttribute(t.__proto__, t.attributes, proto[i]);
//         }
//     } else {
//         t.__proto__ = htmlNodeInfo[t.nodeName];
//     }
// }