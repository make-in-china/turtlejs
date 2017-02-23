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
var LabelView = (function () {
    function LabelView() {
        this.tops = [];
    }
    LabelView.prototype.initDOM = function (props) {
        var S0 = "div";
        push.call(this.tops = [], $$$(S0)
            .$$__(order0));
    };
    return LabelView;
}());
//因为无法推测运行结果，所以生成中间数据算法在此
function order0() {
    Order.exec(this, 'nodes;');
}
/// <reference path="View.ts"/>
//本模块由引擎生成，请勿手动修改此文件
//生成时间:Mon Jan 30 2017 09:16:11 GMT+0800 (中国标准时间)
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(props, outerChildNodes) {
        var _this = _super.call(this, "label", new LabelView, props, outerChildNodes) || this;
        _this.props = props;
        _this.outerChildNodes = outerChildNodes;
        initLabel(_this);
        return _this;
    }
    return Label;
}(Component.Part));
/// <reference path="Class.ts"/>
function initLabel(part) {
    //todo:这里填写组件代码
    console.log(part);
}
