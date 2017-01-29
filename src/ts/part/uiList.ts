class UIPathSpace{
    constructor(
        public path:string){
    }
    list:{
        resPath:string
        name:string,
        part:typeof Component.Part
    }[]
}
class UIList{
    [index:string]:UIPathSpace
    static push(
        uiList:UIList,
        sortPath:string='ui',
        path:string,
        part:{
            new (...arg:any[]): Component.Part
            name:string
        }
    ){
        let uiPathSpace:UIPathSpace;
        if(sortPath in uiList){
            uiPathSpace=uiList[sortPath];
        }else{
            uiList[sortPath]=uiPathSpace=new UIPathSpace(path);
        }
        let name=part.name.toLowerCase();
        uiPathSpace.list.push({
            resPath:path+'/' + name + '.res',
            name:name,
            part:part
        });
    }
}