/// <reference path="../../virtual/UIHelper.0.1.d.ts" />
declare namespace ComponentView {
    interface IButtonProps {
    }
    class Button {
        tops: [VMDOM.VDivElement & IVNodeMethod];
        initDOM(props: IButtonProps): void;
    }
}
declare namespace Component {
    class Button {
        props: ComponentView.IButtonProps;
        outerChildNodes: INode[];
        outerElement: IHTMLCollection;
        constructor(props: ComponentView.IButtonProps, outerChildNodes: INode[], outerElement: IHTMLCollection);
        dom: ComponentView.Button;
    }
}
declare namespace ComponentScript {
    class Button {
        constructor(part: Component.Button);
    }
}
