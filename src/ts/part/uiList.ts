/// <reference path="UIPathSpace.ts"/>
class UIList{
    [index:string]:UIPathSpace
    static push(
        uiList:UIList,
        sortPath:string='ui',
        path:string,
        part:{
            new (props:ComponentView.IProps|null,outerChildNodes?:INode[]): Component.Part
            name:string
        }
    ){
        let uiPathSpace:UIPathSpace;
        if(sortPath in uiList){
            uiPathSpace=uiList[sortPath];
        }else{
            uiList[sortPath]=uiPathSpace=new UIPathSpace();
        }
        let name=part.name.toLowerCase();
        uiPathSpace[name]={
            path:path,
            resPath:path+'/' + name + '.res',
            part:part
        };
    }
}