
/// <reference path='.d.ts'/>
class VHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(nameOrIndex?: string|number, optionalIndex?: number): VElement&IVNodeMethod|null{
        if(!nameOrIndex){
            return null;
        }
        var ret=this[nameOrIndex];
        if(ret){
            return ret;
        }
        if(optionalIndex){
            ret=this[optionalIndex];
        }
        if(ret){
            return ret;
        }
        return null;
    }
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): VElement&IVNodeMethod{
        return this[name];
    }
    [index: number]: VElement&IVNodeMethod|undefined;
}