/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
//本模块由引擎生成，请勿手动修改此文件
var ComponentView;
(function (ComponentView) {
    var Button = (function () {
        function Button() {
        }
        Button.prototype.initDOM = function (props) {
            push.call(this.tops, $$$("div")
                .$$__(order4)
                .$$__(order0)
                .$$__(order3)
                .$$__(order2)
                .$$__(order1)
                .$$__(order0)
                .$$__(order3)
                .$$__(order2)
                .$$__(order1)
                .$$__(order0)
                .$$__(order3)
                .$$__(order2)
                .$$__(order1)
                .$$__(order0));
        };
        return Button;
    }());
    ComponentView.Button = Button;
    //因为无法推测运行结果，所以生成中间数据算法在此
    function order0() {
        Order.exec(this, 'i<3');
    }
    function order1() {
        Order.exec(this, 'i++,data.arr.push(i)');
    }
    function order2() {
        Order.BindExpressions.run({
            object: ['', 'i'],
            function: null,
            placeholder: this
        });
    }
    function order3() {
        Order.BindExpressions.run({
            object: ['((data).arr)', '(i+1-1)*2/2'],
            function: {
                params: ["v"],
                content: "'v+i='+(v+i)+';' "
            },
            placeholder: this
        });
    }
    function order4() {
        exec(this, '{arr:[0]}');
    }
})(ComponentView || (ComponentView = {}));
/// <reference path="./View.ts"/>
var Component;
(function (Component) {
    var Button = (function () {
        function Button(props, outerChildNodes, outerElement) {
            this.props = props;
            this.outerChildNodes = outerChildNodes;
            this.outerElement = outerElement;
            this.dom = new ComponentView.Button;
            // super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
        return Button;
    }());
    Component.Button = Button;
})(Component || (Component = {}));
/// <reference path="Class.ts"/>
var ComponentScript;
(function (ComponentScript) {
    var Button = (function () {
        function Button(part) {
            part.dom.initDOM(part.props);
        }
        return Button;
    }());
    ComponentScript.Button = Button;
})(ComponentScript || (ComponentScript = {}));
