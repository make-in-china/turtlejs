let
    arrayConstructor:Array<any>                 =   <any>Array.prototype,
    objectConstructor:ObjectConstructor         =   <any>Object.prototype,
    stringConstructor:String                    =   <any>String.prototype,
    toStr                                       =	objectConstructor.toString,
    slice                                       =   arrayConstructor.slice,
    push                                        =   arrayConstructor.push,
    splice                                      =   arrayConstructor.splice,
    getPrototypeOf                              =   objectConstructor.getPrototypeOf,
    replace                                     =   stringConstructor.replace;