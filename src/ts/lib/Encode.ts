
let encodeHTML = (function () {
    let
        re = /&lt;|&gt;/g,
        fn = function (s:string) {
            switch (s) {
                case "&lt;":
                    return '<';
                case "&gt;":
                    return '>';
            }
            return s;
        }
    return function (value:string) {
        return value.replace(re, fn);
    }
} ());

let decodeHTML = (function () {
    let
        re = /<|>/g,
        fn = function (s:string) {
            switch (s) {
                case "<":
                    return '&lt;';
                case ">":
                    return '&gt;';
            }
            return s;
        }
    return function (value:string) {
        return value.replace(re, fn);
    }
} ());