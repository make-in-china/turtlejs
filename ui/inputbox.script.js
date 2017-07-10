var def;
(function (def) {
    var closeinput;
    var cancelInput;
    var tID;
    var body = document.body;
    var elemText = $t.refs.Text.pop();
    var input = $t.refs.input.pop();
    var buttonPanel = elemText.children[1];
    var elemOK = $t.refs.elemOK.pop();
    var InputBox = (function () {
        function InputBox() {
        }
        InputBox.prototype._openInput = function (cbok, cbcancel, e) {
            cancelInput = function () {
                if ($t.isFunction(cbcancel))
                    cbcancel();
                closeInputPanel();
            };
            input.onkeypress = function (e) {
                if (e.which == 13) {
                    closeinput();
                }
            };
            body.appendChild(elemText);
            input.selectionState = {
                start: 0,
                end: 0
            };
            if (!isIPhone) {
                elemText.style.display = "none";
                setTimeout(function () {
                    elemText.style.display = "";
                    tID = setInterval(function () {
                        input.focus();
                    }, 500);
                    input.focus();
                }, 500);
            }
            else {
                input.focus();
            }
            e.preventDefault();
            e.stopPropagation();
            return true;
        };
        InputBox.prototype.openInput = function (source, cbok, cbcancel, e) {
            input.value = source.value;
            input.type = source.type;
            closeinput = function (e) {
                source.value = input.value;
                if ($t.isFunction(cbok)) {
                    cbok();
                }
                closeInputPanel();
            };
            this._openInput(cbok, cbcancel, e);
        };
        InputBox.prototype.openInput2 = function (value, type, cbok, cbcancel, e) {
            input.type = type;
            input.value = value;
            closeinput = function (v) {
                if ($t.isFunction(cbok)) {
                    cbok(input);
                }
                closeInputPanel(v);
            };
            this._openInput(cbok, cbcancel, e);
        };
        InputBox.prototype.setInputPlaceHolder = function (elem, type, placeholder) {
            var _value = '';
            Object.defineProperty(elem, "value", {
                get: function () {
                    return _value;
                },
                set: function (v) {
                    _value = v;
                    setInnerHTML(elem, type, placeholder, _value);
                }
            });
            setInnerHTML(elem, type, placeholder, _value);
        };
        InputBox.prototype.setInput = function (elemEvent, elem, type, placeholder, virtualKeyboard, text, next) {
            var _this = this;
            this.next = next;
            if (next == "") {
                elemOK.innerHTML = '&#xf00c;';
                $t.addClass(elemOK, "fa");
            }
            this.source = elem;
            this.text = text;
            this.textBox = elemEvent;
            elem.box = this;
            if (elemEvent) {
                elemEvent.onkeydown = function (e) {
                    return false;
                };
                if (!isIPhone) {
                    elemEvent.onfocus = function (e) {
                        _this.openInput2(elem.value, type, function (elemInput) {
                            elem.value = elemInput.value;
                        }, null, e);
                    };
                }
                else {
                    elemEvent.parentNode.onclick = function (e) {
                        _this.openInput2(elem.value, type, function (elemInput) {
                            elem.value = elemInput.value;
                        }, null, e);
                    };
                    elemEvent.style.display = "none";
                }
            }
            this.setInputPlaceHolder(elem, type, placeholder);
        };
        return InputBox;
    }());
    var t = elemText.box = window.inputbox = new InputBox;
    $t.removeNode(elemText);
    function pressKey(input, key) {
        var start = input.selectionState.start;
        var end = input.selectionState.end;
        if (start > end) {
            start = start ^ end;
            end = start ^ end;
            start = start ^ end;
        }
        debugger;
        input.value = input.value.substring(0, start) + key + input.value.substring(end, input.value.length);
        input.focus();
    }
    function deleteData(input) {
        var start = input.selectionState.start;
        var end = input.selectionState.end;
        if (start > end) {
            start = start ^ end;
            end = start ^ end;
            start = start ^ end;
        }
        else if (start == end) {
            start = end - 1;
        }
        input.value = input.value.substring(0, start) + input.value.substring(end, input.value.length);
        input.focus();
    }
    var copyData;
    var pasteData;
    if (!isIPhone) {
        copyData = function (input) {
            var start = input.selectionState.start;
            var end = input.selectionState.end;
            if (start > end) {
                start = start ^ end;
                end = start ^ end;
                start = start ^ end;
            }
            uexClipboard.copy(input.value.substring(start, end));
        };
        pasteData = function (input) {
            uexClipboard.cbGetContent = function (opCode, dataType, data) {
                pressKey(input, data);
                uexClipboard.cbGetContent = null;
            };
            uexClipboard.getContent();
        };
    }
    function onOK(input) {
        var nextText = document.getElementById(t.next);
        if (nextText && nextText.box) {
            closeinput(1);
            if (!isIPhone) {
                nextText.box.textBox.focus();
            }
            else {
                nextText.box.textBox.parentNode.onclick();
            }
            return;
        }
        closeinput();
    }
    function press(e) {
        var elem = e.target;
        if (elem.hasAttribute("data-key")) {
            var key = elem.getAttribute("data-key");
            switch (key) {
                case "selectAll":
                    input.select();
                    input.focus();
                    break;
                case "cancel":
                    cancelInput();
                    break;
                case "OK":
                    onOK(input);
                    break;
                case "copy":
                    copyData(input);
                    break;
                case "paste":
                    pasteData(input);
                    break;
                case "delete":
                    deleteData(input);
                    break;
                default:
                    if (/^([a-z0-9]| )$/.test(key)) {
                        pressKey(input, key);
                    }
                    else {
                        input.focus();
                    }
            }
        }
        e.stopPropagation();
        e.preventDefault();
    }
    var closeInputPanel = function (v) {
        if (body.contains(elemText)) {
            $t.removeClasses(buttonPanel, ["fast", "flipInX"]);
            $t.addClasses(buttonPanel, ["duration2", "flipOutX"]);
            if (!isIPhone) {
                clearInterval(tID);
            }
            if (v) {
                body.removeChild(elemText);
                $t.removeClasses(buttonPanel, ["duration2", "flipOutX"]);
                $t.addClasses(buttonPanel, ["fast", "flipInX"]);
            }
            else {
                setTimeout(function () {
                    body.removeChild(elemText);
                    $t.removeClasses(buttonPanel, ["duration2", "flipOutX"]);
                    $t.addClasses(buttonPanel, ["fast", "flipInX"]);
                }, 200);
            }
        }
    };
    elemText.onclick = press;
    input.onblur = function () {
        var type = input.type;
        input.type = "text";
        input.selectionState.start = input.selectionStart;
        input.selectionState.end = input.selectionEnd;
        input.type = type;
    };
    function setInnerHTML(elem, type, placeholder, value) {
        if (value.length > 0) {
            if (type === "password") {
                elem.innerHTML = (new Array(value.length + 1)).join('●');
            }
            else {
                elem.innerHTML = value;
            }
            $t.replaceClass(elem, "fgray10", "fcoffee3");
        }
        else {
            elem.innerHTML = placeholder;
            $t.replaceClass(elem, "fcoffee3", "fgray10");
        }
    }
    function run(elemInputTop) {
        if (isIPhone) {
            elemInputTop.style.marginTop = "1.5em";
        }
        ;
    }
    def.run = run;
})(def || (def = {}));
