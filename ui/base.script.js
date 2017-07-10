var def;
(function (def) {
    function run(style, className, deleteClassName, ref, click, id, show, hide, boxClass) {
        this.onInit = function (finalPart) {
            var partMain = finalPart.partMain;
            if (partMain) {
                if (style) {
                    $t.addStyle(partMain, style);
                }
                if (className) {
                    $t.addClassName(partMain, className);
                }
                if (deleteClassName) {
                    $t.removeClasses(partMain, deleteClassName.split(/\s+/));
                }
                if (ref) {
                    $t.KeyArrayObject.push($t.refs, ref, partMain);
                }
                if (click) {
                    partMain.setAttribute('onclick', click);
                }
                if (show) {
                    $t.bindShowHide(partMain, show, true);
                }
                if (hide) {
                    $t.bindShowHide(partMain, show, false);
                }
                if (id) {
                    partMain.id = id;
                }
            }
            if (boxClass) {
                var elements = finalPart.elements;
                var boxClasses = boxClass.split(/\s+/);
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var node = elements_1[_i];
                    if (node.nodeType === 1) {
                        $t.addClasses(node, boxClasses);
                    }
                }
            }
        };
    }
    def.run = run;
})(def || (def = {}));
