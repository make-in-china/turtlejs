class VOrderData{
    endNode:INode|null=null
    parseBlockResult:ITreeEachReturn
    constructor(
        public name:string,
        public node:IComment,
        public condition:string,
        public run:()=>void
    ){}
}