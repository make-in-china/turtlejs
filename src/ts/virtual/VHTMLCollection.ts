HTMLCollection
/// <reference path='.d.ts'/>
class VHTMLCollection {
    /**
      * Sets or retrieves the number of objects in a collection.
      */
    length: number;
    /**
      * Retrieves an object from various collections.
      */
    item(index:number): VElement&IVNodeMethod|null{
        let ret=this[index];
        if(ret){
            return ret;
        }else{
            return null;
        }
    }
    /**
      * Retrieves a select object or an object from an options collection.
      */
    namedItem(name: string): VElement&IVNodeMethod|null{
        for(let i=0;i<this.length;i++){
            let element:VElement&IVNodeMethod=<VElement&IVNodeMethod>this[i];
            if(element.getAttribute("name")===name){
                return element;
            }
        }
        return null;
    }
    [index: number]: VElement&IVNodeMethod|undefined;
}