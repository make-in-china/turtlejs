/// <reference path="../../dest/js/turtle.0.1.d.ts" />
interface ILabelProps extends ComponentView.IProps {
}
declare class LabelView implements ComponentView.IView {
    tops: [VMDOM.VDivElement & IVNodeMethod];
    initDOM(props: ILabelProps, nodes?: (VMDOM.VNode & IVNodeMethod)[]): void;
}
declare class Label extends Component.Part {
    props: ILabelProps;
    outerChildNodes: (VMDOM.VNode & IVNodeMethod)[];
    constructor(props: ILabelProps, outerChildNodes?: (VMDOM.VNode & IVNodeMethod)[]);
}
declare function initLabel(part: Label): void;
