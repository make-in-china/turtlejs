/// <reference path="../../dest/js/turtle.0.1.d.ts" />
interface IButtonProps extends ComponentView.IProps {
}
declare class ButtonView implements ComponentView.IView {
    tops: [VMDOM.VDivElement & IVNodeMethod];
    initDOM(props: IButtonProps, nodes?: (VMDOM.VNode & IVNodeMethod)[]): void;
}
declare class Button extends Component.Part {
    props: IButtonProps;
    outerChildNodes: (VMDOM.VNode & IVNodeMethod)[];
    constructor(props: IButtonProps, outerChildNodes?: (VMDOM.VNode & IVNodeMethod)[]);
}
declare function initButton(part: Button): void;
