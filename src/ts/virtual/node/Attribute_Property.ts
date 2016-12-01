
namespace VAP{
    function getAttr(node:VMElement.VHtmlElement,name:string):string{
        var ret:string|null=node.getAttribute(name);
        if(ret){
            return ret;
        }else{
            return ""
        }
    }
    function setAttr(node:VMElement.VHtmlElement,name:string,value:string){
        node.setAttribute(name,value);
    }
    export function decorate(vclass:typeof VMElement.VHtmlElement,names:string[]){
        var prototype:any=(<any>vclass).prototype;
        for(const name of names){
            Object.defineProperty(prototype,name,{
                get:function(this:VMElement.VHtmlElement):string{
                    return getAttr(this,name);
                },
                set:function(this:VMElement.VHtmlElement,v:string){
                    setAttr(this,name,v);
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