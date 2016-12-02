
namespace VMElement{
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

    let apNames:string[];

    export function mergeClass<U>(v:U):(constructor:{prototype:VMElement.VHtmlElement&U})=>void{
        //不重复创建类装饰器，而是使用外部变量转存参数，因此不支持异步
        apNames=Object.keys(v);;
        return <any>setA_PToClassPrototype;
    }
    function setA_PToClassPrototype(constructor:typeof VMElement.VHtmlElement){
        let prototype=constructor.prototype;
        let clazzSuperPrototype=VMElement.VHtmlElement.prototype;
        for(const name of apNames){
            Object.defineProperty(prototype,name,{
                get:function(this:VMElement.VHtmlElement):string{
                    return getAttr(this,name);
                },
                set:function(this:VMElement.VHtmlElement,v:string){
                    setAttr(this,name,v);
                }
            })
        }
        prototype.cloneNode=function(this:VMElement.VHtmlElement&IVNodeMethod,deep?:boolean):VMElement.VHtmlElement&IVNodeMethod{
            let newNode=clazzSuperPrototype.cloneNode(deep);
            for(const name of apNames){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
            return <VMElement.VHtmlElement&IVNodeMethod>newNode;
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