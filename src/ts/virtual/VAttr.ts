class VAttr{
    readonly name: string;
    // readonly ownerElement: Element;
    // readonly prefix: string | null;
    // readonly specified: boolean;
    value: string;
    constructor(name:string,value:string){
        this.name=name;
        this.value=value;
    }
}