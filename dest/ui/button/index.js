var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
var ButtonView = (function () {
    function ButtonView() {
        this.tops = [];
    }
    ButtonView.prototype.initDOM = function (props, nodes) {
        var S0 = "div", S1 = "xx", S2 = "11", S3 = "xxx";
        push.call(this.tops = [], $$$(S0)._(S1, S2)._(S3, S2)
            .$$__(order1)
            .$$__(order0));
        function order0() {
            new (importUI('label', 'ui').part)(null, [$$$("ui:label\u7EC4\u4EF6\u52A0\u8F7D\u6210\u529F", 3 /* Text */).$]).insertBefore(this);
            this.remove();
        }
        function order1() {
            Order.exec(this, '1');
        }
    };
    return ButtonView;
}());
/// <reference path="View.ts"/>
//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Jan 30 2017 06:54:45 GMT+0800 (中国标准时间)
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props, outerChildNodes) {
        var _this = _super.call(this, "button", new ButtonView, props, outerChildNodes) || this;
        _this.props = props;
        _this.outerChildNodes = outerChildNodes;
        initButton(_this);
        return _this;
    }
    return Button;
}(Component.Part));
/// <reference path="Class.ts"/>
function initButton(part) {
    console.log(part);
}
