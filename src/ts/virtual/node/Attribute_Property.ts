
namespace VMDOM{
    function getAttr(node:VMDOM.VHtmlElement,name:string):string{
        var ret:string|null=node.getAttribute(name);
        if(ret){
            return ret;
        }else{
            return ""
        }
    }
    function setAttr(node:VMDOM.VHtmlElement,name:string,value:string){
        node.setAttribute(name,value);
    }

    let apNames:string[];

    export function mergeClass<U>(v:U):(constructor:{prototype:VMDOM.VHtmlElement&U})=>void{
        //不重复创建类装饰器，而是使用外部变量转存参数，因此不支持异步
        apNames=Object.keys(v);;
        return <any>setA_PToClassPrototype;
    }
    function setA_PToClassPrototype(constructor:typeof VMDOM.VHtmlElement){
        let prototype=constructor.prototype;
        let clazzSuperPrototype=(<typeof VMDOM.VHtmlElement><any>prototype).prototype;//这里只是让后面的比较正常,类型并不准
        for(const name of apNames){
            Object.defineProperty(prototype,name,{
                get:function(this:VMDOM.VHtmlElement):string{
                    return getAttr(this,name);
                },
                set:function(this:VMDOM.VHtmlElement,v:string){
                    setAttr(this,name,v);
                }
            })
        }
        prototype.cloneNode=function(this:VMDOM.VHtmlElement&IVNodeMethod,deep?:boolean):VMDOM.VHtmlElement&IVNodeMethod{
            let newNode=clazzSuperPrototype.cloneNode(deep);
            for(const name of apNames){
                if(this[name]!==""){
                    newNode[name]=this[name];
                }
            }
            return <VMDOM.VHtmlElement&IVNodeMethod>newNode;
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