/// <reference path="../../js/turtle.0.1.d.ts" />
interface ILabelProps extends ComponentView.IProps {
}
declare class LabelView implements ComponentView.IView {
    tops: [VMDOM.VDivElement & IVNodeMethod];
    initDOM(props: ILabelProps): void;
}
declare function order0(this: VMDOM.VPlaceHolder): void;
declare class Label extends Component.Part {
    props: ILabelProps;
    outerChildNodes: INode[];
    constructor(props: ILabelProps, outerChildNodes?: INode[]);
}
declare function initLabel(part: Label): void;
