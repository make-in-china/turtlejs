function __merge(source,merge):any{
    return function(){
        var ret=source.apply(this.arguments);
        Object.keys(merge.call(ret)).forEach((key,v) => {
            source[key] = v;
        });
    };
}
export function CPN<T,U>(fn:(...arg)=>T,intface:U, merge:(this:T & U)=>U):new (...arg)=> T & U {
    return __merge(fn,merge);
}
export function CP1<T,U,P1>(fn:(p1:P1)=>T,intface:U, merge:(this:T & U)=>U):new (p1:P1)=> T & U {
    return __merge(fn,merge);
}
export function CP2<T,U,P1,P2,P3,P4>(fn:(p1:P1,p2:P2)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2)=> T & U {
    return __merge(fn,merge);
}
export function CP3<T,U,P1,P2,P3>(fn:(p1:P1,p2:P2,p3:P3)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3)=> T & U {
    return __merge(fn,merge);
}
export function CP4<T,U,P1,P2,P3,P4>(fn:(p1:P1,p2:P2,p3:P3,p4:P4)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3,p4:P4)=> T & U {
    return __merge(fn,merge);
}
export function CP5<T,U,P1,P2,P3,P4,P5>(fn:(p1:P1,p2:P2,p3:P3,p4:P4,p5:P5)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3,p4:P4,p5:P5)=> T & U {
    return __merge(fn,merge);
}
export function CP6<T,U,P1,P2,P3,P4,P5,P6>(fn:(p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6)=> T & U {
    return __merge(fn,merge);
}
export function CP7<T,U,P1,P2,P3,P4,P5,P6,P7>(fn:(p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6,p7:P7)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6,p7:P7)=> T & U {
    return __merge(fn,merge);
}
export function CP8<T,U,P1,P2,P3,P4,P5,P6,P7,P8>(fn:(p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6,p7:P7,p8:P8)=>T, intface:U, merge:(this:T & U)=>U):new (p1:P1,p2:P2,p3:P3,p4:P4,p5:P5,p6:P6,p7:P7,p8:P8)=> T & U {
    return __merge(fn,merge);
}