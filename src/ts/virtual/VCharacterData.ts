
/// <reference path='VNode.ts'/>
abstract class VCharacterData extends VNode{
    abstract data:string
    getData():string{
        return this.data;
    }
    get length():number{
        return this.data.length;
    }
    appendData(arg: string): void{
        this.data+=arg
    }
    deleteData(offset: number, count: number): void{
        this.data=this.data.substring(0,offset)+this.data.substr(offset);
    }
    insertData(offset: number, arg: string): void{
        this.data=this.data.substring(0,offset)+arg+this.data.substr(offset);
    }
    replaceData(offset: number, count: number, arg: string): void{
        this.data=this.data.substring(0,offset)+arg+this.data.substr(offset+count);
    }
    substringData(offset: number, count: number): string{
        return this.data.substr(offset,count);
    }
    // addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void{

    // }
}