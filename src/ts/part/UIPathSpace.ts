class UIPathSpace{
    [index:string]:{
        path:string
        resPath:string
        part:{new (props:ComponentView.IProps|null,outerChildNodes?:INode[]): Component.Part}
    }
}