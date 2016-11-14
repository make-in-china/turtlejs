/// <reference path="../../../dest/js/turtle.0.1.d.ts"/>
/// <reference path="../../../dest/virtual/UIHelper.0.1.d.ts"/>
/// <reference path="./Script.ts"/>
namespace Component{
    export class Button extends Part{
        constructor(
            template:PartTemplate,
            props:Object,
            html:string,
            public outerChildNodes:INode[],
            public outerElement:IHTMLCollection
        ) {
            super(template,props,html,outerChildNodes,outerElement);
            new ComponentScript.Button(this);
        }
        dom={
            main:VNodeHelp
("HTML")
    ("HEAD")
        ("META")._("content","text/html; charset=utf-8")._("http-equiv","Content-Type").$
        ("META")._("name","description")._("content","百度图片使用世界前沿的人工智能技术，为用户甄选海量的高清美图，用更流畅、更快捷、更精准的搜索体验，带你去发现多彩的世界。").$
        ("SCRIPT")._("async")._("src","http://img.baidu.com/hunter/alog/alog.min.js").$
        ("SCRIPT")(`
    var bdimgdata = {
        logid: '10911226214485378975',
        sid: '7edd7dc52a2b38b973d9f9c007ae14f7e18b2165',
        wh: window.screen.width + 'x' + window.screen.height,
        sampid: '35',
        protocol: window.location.protocol.replace(':', ''),
        spat: 0 + '-' + '1-bj-'
    }
`,3).$.$
        ("SCRIPT")(`!function(n){var i={},t="//imgstat.baidu.com/17.gif",a=+new Date,d=function(n){var i=[];for(var t in n)i.push(t+"="+n[t]);return i.join("&")},e=function(n){return n.etype="speed",n.page="index",n.logid=bdimgdata.logid,n.sid=bdimgdata.sid,n.wh=bdimgdata.wh,n.sampid=bdimgdata.sampid,n.app="index",n.spat=bdimgdata.spat,n.protocol=bdimgdata.protocol,n},o={},r={set:function(n,t){n&&(i[n]=t||0)},get:function(n){return i[n]||"start"===n&&a},mark:function(n,t,d){void 0===t&&(t=new Date-a),!0===d&&(t-=a),i[n]=t},loadmark:function(){value=new Date-a,r.firstScCount&&r.firstScCount<10?(r.firstScCount+=1,i.firstSc=value):r.firstScCount=1},send:function(n){if(n)for(var a in n)i[a]=n[a];e(i);var o=d(i);(new Image).src=t+"?"+o},log:function(n,i){var t=(d(i),o[n]),a=[];e(i);for(var r in t)0!==r.indexOf("_")&&(i[r]=t[r]);for(var r in i)a.push(r+"="+i[r]);(new Image).src=t._url+"?"+a.join("&")}};n.speed=r,function(){loaded=0,window.addEventListener&&window.addEventListener("beforeunload",function(){loaded||(r.mark("leave"),r.send())}),window.addEventListener&&window.addEventListener("load",function(){loaded=1})}()}(window);`,3).$.$
        ("SCRIPT")(`window.localStorage&&(window.localStorage.sid="b540e6e474cfd9bac62e7dea88d5881bcb2ef649");`,3).$.$
        ("TITLE")(`百度图片-发现多彩世界`,3).$.$
        ("SCRIPT")(`
    void function(a,b,c,d,e,f,g){if(a.alogObjectName=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=a[e].l||+new Date,"https:"===a.location.protocol){if(d="https://gss2.bdstatic.com/70cFsjip0QIZ8tyhnq"+d,!a.alogObjectConfig||!a.alogObjectConfig.sample)return}else d="http://img.baidu.com"+d;var h=!0;if(a.alogObjectConfig&&a.alogObjectConfig.sample){var i=Math.random();a.alogObjectConfig.rand=i,i>a.alogObjectConfig.sample&&(h=!1)}h&&(f=b.createElement(c),f.async=!0,f.src=d,g=b.getElementsByTagName(c)[0],g.parentNode.insertBefore(f,g))}(window,document,"script","/hunter/alog/alog.min.js","alog"),void function(){function a(){}window.PDC={mark:function(a,b){alog("speed.set",a,b||+new Date),alog.fire&&alog.fire("mark")},init:function(a){alog("speed.set","options",a)},view_start:a,tti:a,page_ready:a}}();
    void function(n){var o=!1;n.onerror=function(n,e,t,c){var i=!0;return!e&&/^script error/i.test(n)&&(o?i=!1:o=!0),i&&alog("exception.send","exception",{msg:n,js:e,ln:t,col:c}),!1},alog("exception.on","catch",function(n){alog("exception.send","exception",{msg:n.msg,js:n.path,ln:n.ln,method:n.method,flag:"catch"})})}(window);

`,3).$.$
        ("SCRIPT")(`
        var Ihttps_agent_config = {"http:\/\/nssug.baidu.com":"https:\/\/sp1.baidu.com\/8qUZeT8a2gU2pMbgoY3K\/su","http:\/\/img.baidu.com":"https:\/\/gss2.bdstatic.com\/70cFsjip0QIZ8tyhnq","http:\/\/himg.bdimg.com":"https:\/\/ss1.bdstatic.com\/7Ls0a8Sm1A5BphGlnYG","http:\/\/apps.bdimg.com":"https:\/\/ss0.bdstatic.com\/9_QWf8Sm1A5BphGlnYG","http:\/\/f3.baidu.com":"https:\/\/sp3.baidu.com\/-uV1bjeh1BF3odCf","http:\/\/bzclk.baidu.com":"https:\/\/gsp0.baidu.com\/9q9JcDHa2gU2pMbgoY3K","http:\/\/img0.imgtn.bdimg.com":"https:\/\/ss0.bdstatic.com\/70cFvHSh_Q1YnxGkpoWK1HF6hhy","http:\/\/img1.imgtn.bdimg.com":"https:\/\/ss1.bdstatic.com\/70cFvXSh_Q1YnxGkpoWK1HF6hhy","http:\/\/img2.imgtn.bdimg.com":"https:\/\/ss2.bdstatic.com\/70cFvnSh_Q1YnxGkpoWK1HF6hhy","http:\/\/img3.imgtn.bdimg.com":"https:\/\/ss3.bdstatic.com\/70cFv8Sh_Q1YnxGkpoWK1HF6hhy","http:\/\/img4.imgtn.bdimg.com":"https:\/\/ss0.bdstatic.com\/70cFuHSh_Q1YnxGkpoWK1HF6hhy","http:\/\/img5.imgtn.bdimg.com":"https:\/\/ss1.bdstatic.com\/70cFuXSh_Q1YnxGkpoWK1HF6hhy","http:\/\/bdimg.share.baidu.com":"https:\/\/gss0.baidu.com\/9rA4cT8aBw9FktbgoI7O1ygwehsv","http:\/\/dispatcher.video.qiyi.com":"https:\/\/gss0.bdstatic.com\/-LsZfDe52w9JkxG9m9iS_HFjgAkrreHg-_","http:\/\/passport.bdimg.com":"https:\/\/ss0.bdstatic.com\/5LMZfyabBhJ3otebn9fN2DJv"};
    `,3).$.$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/mod_6f6741d.js").$
        ("STYLE")._("type","text/css")._("adt","123").$
        ("SCRIPT")(`var IMG_HASDATA=!0;`,3).$.$
        ("LINK")._("rel","stylesheet")._("type","text/css")._("href","//img1.bdstatic.com/static/common/pkg/co_665e2d0.css").$
        ("LINK")._("rel","stylesheet")._("type","text/css")._("href","//img1.bdstatic.com/static/common/widget/ui/slider/slider_ecce195.css").$
        ("LINK")._("rel","stylesheet")._("type","text/css")._("href","//img0.bdstatic.com/static/common/widget/ui/userInfo/userInfo_c4c34f4.css").$
        ("LINK")._("rel","stylesheet")._("type","text/css")._("href","//img1.bdstatic.com/static/home/pkg/pi_689a2d1.css").$
        ("SCRIPT")(` alog('speed.set', 'ht', +new Date); `,3).$.$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/base/base_175b2c0.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/home/pkg/pi_d4b989d.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/pkg/cores_4cd3b56.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/historyRecord/historyRecord_075d288.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/shitu/static/animate_d5993fc.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/shitu/run_f3d6bc5.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/fmCheck/fmCheck_e6197fc.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/durationStat/durationStat_d292e9f.js").$
        ("SCRIPT")(`!
    function e(t, n, i) {
        function o(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(a, !0);
                    if (r) return r(a, !0);
                    var c = new Error("Cannot find module '" + a + "'");
                    throw c.code = "MODULE_NOT_FOUND",
                        c
                }
                var d = n[a] = {
                    exports: {}
                };
                t[a][0].call(d.exports, function (e) {
                    var n = t[a][1][e];
                    return o(n ? n : e)
                }, d, d.exports, e, t, n, i)
            }
            return n[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < i.length; a++) o(i[a]);
        return o
    }({
        1: [function (e) {
            var t = window.location.href,
                n = document.createElement("div"),
                i = document.createElement("i");
            if (i.setAttribute("id", "ADT-PlayHTML5-btn"), i.innerText = "HTML5\u89c6\u9891", i.setAttribute("style", "display:inline-block;font-size: 20px;padding:5px 10px;font-weight: 700;line-height:34px;color: #fff;text-align: center;vertical-align: baseline;border-radius:10px;background-color: #428bca;cursor: pointer;font-style: normal;"), n.setAttribute("style", "float:right;margin-top:-50px;width:300px;height:50px;padding-top:8px;"), n.appendChild(i), /v\.youku\.com\/v_show\/.*/.test(t)) document.querySelector(".s_main div.base").appendChild(n);
            else if (/www\.tudou\.com\/(albumplay|programs)\/.*/.test(t)) document.querySelector("#summary").appendChild(n);
            else if (/www\.mgtv\.com\/v\/.*/.test(t)) {
                var i = document.createElement("i"),
                    o = document.createElement("div"),
                    r = document.createElement("em");
                i.setAttribute("style", "display:inline-block;margin:auto 20px;cursor:pointer;"),
                    i.innerText = "HTML5\u89c6\u9891",
                    r.innerText = "|",
                    r.setAttribute("class", "v-panel-dividing"),
                    o.setAttribute("style", "margin-right: 10px;height: 28px;overflow: hidden;position: relative;top: -1px;float: left;"),
                    o.appendChild(r),
                    o.appendChild(i),
                    document.querySelector("div.v-panel-box").appendChild(o)
            }
            i.addEventListener("click", function () {
                function t(e, t) {
                    if (!e) return console.log("\u89e3\u6790\u5185\u5bb9\u5730\u5740\u5931\u8d25"),
                        void delete window[s];
                    console.log("\u89e3\u6790\u5185\u5bb9\u5730\u5740\u5b8c\u6210" + e.map(function (e) {
                            return '<a href="' + e[1] + '" target="_blank">' + e[0] + "</a>"
                        }).join(" "));
                    var n = o("div", {
                        appendTo: document.body,
                        style: {
                            position: "fixed",
                            background: "rgba(0,0,0,0.8)",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            zIndex: "999999"
                        }
                    });
                    o("div", {
                        appendTo: n,
                        style: {
                            width: "1120px",
                            height: "630px",
                            position: "absolute",
                            top: "40%",
                            left: "50%",
                            marginTop: "-250px",
                            marginLeft: "-560px",
                            borderRadius: "2px",
                            boxShadow: "0 0 2px #000000, 0 0 200px #000000"
                        }
                    }),
                        o("div", {
                            appendTo: n,
                            style: {
                                position: "absolute",
                                bottom: "10px",
                                left: "0",
                                right: "0",
                                height: "20px",
                                lineHeight: "20px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontFamily: "arial, sans-serif"
                            }
                        });
                    var a = o("div", {
                        appendTo: n,
                        innerHTML: '<div id="html5_Player_placeHolder"></div>',
                        style: {
                            width: "1120px",
                            height: "630px",
                            position: "absolute",
                            backgroundColor: "#000000",
                            top: "40%",
                            left: "50%",
                            marginTop: "-250px",
                            marginLeft: "-560px",
                            borderRadius: "2px",
                            overflow: "hidden"
                        }
                    });
                    o("div", {
                        appendTo: a,
                        innerHTML: "&times;",
                        style: {
                            width: "20px",
                            height: "20px",
                            lineHeight: "20px",
                            textAlign: "center",
                            position: "absolute",
                            color: "#ffffff",
                            fontSize: "20px",
                            top: "5px",
                            right: "5px",
                            textShadow: "0 0 2px #000000",
                            fontWeight: "bold",
                            fontFamily: 'Garamond, "Apple Garamond"',
                            cursor: "pointer"
                        }
                    }).onclick = function () {
                        document.body.removeChild(n),
                            l.video.src = "about:blank",
                            delete window[s]
                    };
                    var l = new r("html5_Player_placeHolder", "1120x630", e, t);
                    l.iframe.contentWindow.focus(),
                        i(),
                        l.iframe.style.display = "block",
                        window[s] = !0
                }
                var n, i = e("./flashBlocker"),
                    o = e("./createElement"),
                    r = e("./player"),
                    a = e("./purl"),
                    s = e("./h5key"),
                    l = e("./seekers");
                if (1 != window[s]) {
                    var c = a(location.href);
                    "zythum.sinaapp.com" === c.attr("host") && "/mama2/ps4/" === c.attr("directory") && c.param("url") && (c = a(c.param("url"))),
                        l.forEach(function (e) {
                            n !== !0 && !! e.match(c) == !0 && (console.log("\u5f00\u59cb\u89e3\u6790\u5185\u5bb9\u5730\u5740"), n = !0, e.getVideos(c, t))
                        }),
                    void 0 === n && console.log("\u627e\u4e0d\u5230\u89e3\u6790")
                }
            })
        },
            {
                "./createElement": 4,
                "./flashBlocker": 5,
                "./h5key": 6,
                "./player": 9,
                "./purl": 10,
                "./seekers": 15
            }],
        2: [function (e, t) {
            function n(e, t) {
                return void 0 === e ? t : e
            }
            function i(e, t) {
                return 0 === t.length ? e : e + (-1 === e.indexOf("?") ? "?" : "&") + t
            }
            function o(e) {
                var t = n(e.url, ""),
                    o = s(n(e.param, {})),
                    l = n(e.method, "GET"),
                    c = n(e.callback, a),
                    d = n(e.contentType, "json"),
                    u = n(e.context, null);
                if (e.jsonp) return r(i(t, o), c.bind(u), "string" == typeof e.jsonp ? e.jsonp : void 0);
                var h = new XMLHttpRequest;
                "get" === l.toLowerCase() && (t = i(t, o), o = ""),
                    h.open(l, t, !0),
                    h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                    h.send(o),
                    h.onreadystatechange = function () {
                        if (4 === h.readyState) {
                            if (200 === h.status) {
                                var e = h.responseText;
                                if ("json" === d.toLowerCase()) try {
                                    e = JSON.parse(e)
                                } catch (t) {
                                    e = -1
                                }
                                return c.call(u, e)
                            }
                            return c.call(u, -1)
                        }
                    }
            }
            var r = e("./jsonp"),
                a = e("./noop"),
                s = e("./queryString");
            t.exports = o
        },
            {
                "./jsonp": 7,
                "./noop": 8,
                "./queryString": 11
            }],
        3: [function (e, t) {
            t.exports = !! document.createElement("video").canPlayType("application/x-mpegURL")
        },
            {}],
        4: [function (e, t) {
            function n(e, t) {
                var n = document.createElement(e);
                if ("function" == typeof t) t.call(n);
                else for (var i in t) if (t.hasOwnProperty(i)) switch (i) {
                    case "appendTo":
                        t[i].appendChild(n);
                        break;
                    case "innerHTML":
                    case "className":
                    case "id":
                        n[i] = t[i];
                        break;
                    case "style":
                        var o = t[i];
                        for (var r in o) o.hasOwnProperty(r) && (n.style[r] = o[r]);
                        break;
                    default:
                        n.setAttribute(i, t[i] + "")
                }
                return n
            }
            t.exports = n
        },
            {}],
        5: [function (e, t) {
            var n = '<div style="text-shadow:0 0 2px #eee;letter-spacing:-1px;background:#eee;font-weight:bold;padding:0;font-family:arial,sans-serif;font-size:30px;color:#ccc;width:152px;height:52px;border:4px solid #ccc;border-radius:12px;position:absolute;top:50%;left:50%;margin:-30px 0 0 -80px;text-align:center;line-height:52px;">Flash</div>',
                i = 0,
                o = {},
                r = function () {
                    var e = this.getAttribute("data-flash-index"),
                        t = o[e];
                    t.setAttribute("data-flash-show", "isshow"),
                        this.parentNode.insertBefore(t, this),
                        this.parentNode.removeChild(this),
                        this.removeEventListener("click", r, !1)
                },
                a = function (e, t, a) {
                    var s = i++,
                        l = document.defaultView.getComputedStyle(e, null),
                        c = l.position;
                    c = "static" === c ? "relative" : c;
                    var d = l.margin,
                        u = "inline" == l.display ? "inline-block" : l.display,
                        l = ["", "width:" + t + "px", "height:" + a + "px", "position:" + c, "margin:" + d, "display:" + u, "margin:0", "padding:0", "border:0", "border-radius:1px", "cursor:pointer", "background:-webkit-linear-gradient(top, rgba(240,240,240,1)0%,rgba(220,220,220,1)100%)", ""];
                    o[s] = e;
                    var h = document.createElement("div");
                    return h.setAttribute("title", "&#x70B9;&#x6211;&#x8FD8;&#x539F;Flash"),
                        h.setAttribute("data-flash-index", "" + s),
                        e.parentNode.insertBefore(h, e),
                        e.parentNode.removeChild(e),
                        h.addEventListener("click", r, !1),
                        h.style.cssText += l.join(";"),
                        h.innerHTML = n,
                        h
                },
                s = function (e) {
                    if (e instanceof HTMLObjectElement) {
                        if ("" == e.innerHTML.trim()) return;
                        if (e.getAttribute("classid") && !/^java:/.test(e.getAttribute("classid"))) return
                    } else if (!(e instanceof HTMLEmbedElement)) return;
                    var t = e.offsetWidth,
                        n = e.offsetHeight;
                    t > 160 && n > 60 && a(e, t, n)
                };
            t.exports = function () {
                for (var e = document.getElementsByTagName("embed"), t = document.getElementsByTagName("object"), n = 0, i = t.length; i > n; n++) t[n] && s(t[n]);
                for (var n = 0, i = e.length; i > n; n++) e[n] && s(e[n])
            }
        },
            {}],
        6: [function (e, t) {
            t.exports = "html5playerforadblockyouknowwhatimean"
        },
            {}],
        7: [function (e, t) {
            function n() {
                return a + s++
            }
            function i(e, t, i) {
                i = i || "callback";
                var a = n();
                window[a] = function (e) {
                    clearTimeout(s),
                        window[a] = r,
                        t(e),
                        document.body.removeChild(c)
                };
                var s = setTimeout(function () {
                        window[a](-1)
                    }, l),
                    c = o("script", {
                        appendTo: document.body,
                        src: e + (e.indexOf("?") >= 0 ? "&" : "?") + i + "=" + a
                    })
            }
            var o = e("./createElement"),
                r = e("./noop"),
                a = "MAMA2_HTTP_JSONP_CALLBACK",
                s = 0,
                l = 1e4;
            t.exports = i
        },
            {
                "./createElement": 4,
                "./noop": 8
            }],
        8: [function (e, t) {
            t.exports = function () {}
        },
            {}],
        9: [function (e, t) {
            var n;
            !
                function i(t, n, o) {
                    function r(s, l) {
                        if (!n[s]) {
                            if (!t[s]) {
                                var c = "function" == typeof e && e;
                                if (!l && c) return c(s, !0);
                                if (a) return a(s, !0);
                                throw new Error("Cannot find module '" + s + "'")
                            }
                            var d = n[s] = {
                                exports: {}
                            };
                            t[s][0].call(d.exports, function (e) {
                                var n = t[s][1][e];
                                return r(n ? n : e)
                            }, d, d.exports, i, t, n, o)
                        }
                        return n[s].exports
                    }
                    for (var a = "function" == typeof e && e, s = 0; s < o.length; s++) r(o[s]);
                    return r
                }({
                    1: [function (e, t) {
                        function n(e) {
                            for (var t = [], n = 1; n < arguments.length; n++) {
                                var o = arguments[n],
                                    r = o.init;
                                t.push(r),
                                    delete o.init,
                                    i(e.prototype, o)
                            }
                            e.prototype.init = function () {
                                t.forEach(function (e) {
                                    e.call(this)
                                }.bind(this))
                            }
                        }
                        var i = e("./extend");
                        t.exports = n
                    },
                        {
                            "./extend": 9
                        }],
                    2: [function (e, t) {
                        var n = e("./player.css"),
                            i = e("./player.html"),
                            o = (e("./extend"), e("./createElement")),
                            r = e("./parseDOMByClassNames");
                        t.exports = {
                            init: function () {
                                var e = function () {
                                        var e = this.iframe.contentDocument.getElementsByTagName("head")[0],
                                            t = this.iframe.contentDocument.body;
                                        o("style", function () {
                                            e.appendChild(this);
                                            try {
                                                this.styleSheet.cssText = n
                                            } catch (t) {
                                                this.appendChild(document.createTextNode(n))
                                            }
                                        }),
                                            o("link", {
                                                appendTo: e,
                                                href: "http://libs.cncdn.cn/font-awesome/4.3.0/css/font-awesome.min.css",
                                                rel: "stylesheet",
                                                type: "text/css"
                                            }),
                                            t.innerHTML = i,
                                            this.DOMs = r(t, ["player", "video", "video-frame", "comments", "comments-btn", "play", "progress_anchor", "buffered_anchor", "fullscreen", "allscreen", "hd", "volume_anchor", "current", "duration"]),
                                            this.video = this.DOMs.video
                                    }.bind(this),
                                    t = document.getElementById(this.id),
                                    a = this.iframe = o("iframe", {
                                        allowTransparency: !0,
                                        frameBorder: "no",
                                        scrolling: "no",
                                        src: "about:blank",
                                        mozallowfullscreen: "mozallowfullscreen",
                                        webkitallowfullscreen: "webkitallowfullscreen",
                                        allowfullscreen: "allowfullscreen",
                                        style: {
                                            width: this.size[0] + "px",
                                            height: this.size[1] + "px",
                                            overflow: "hidden"
                                        }
                                    });
                                t && t.parentNode ? (t.parentNode.replaceChild(a, t), e()) : (document.body.appendChild(a), e(), document.body.removeChild(a))
                            }
                        }
                    },
                        {
                            "./createElement": 7,
                            "./extend": 9,
                            "./parseDOMByClassNames": 11,
                            "./player.css": 12,
                            "./player.html": 13
                        }],
                    3: [function (e, t) {
                        function n(e) {
                            e.strokeStyle = "black",
                                e.lineWidth = 3,
                                e.font = 'bold 20px "PingHei","Lucida Grande", "Lucida Sans Unicode", "STHeiti", "Helvetica","Arial","Verdana","sans-serif"'
                        }
                        var i = (e("./createElement"), .1),
                            o = 25,
                            r = 4e3,
                            a = document.createElement("canvas").getContext("2d");
                        n(a);
                        var s = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
                            function (e) {
                                setTimeout(e, 1e3 / 60)
                            };
                        t.exports = {
                            init: function () {
                                this.video.addEventListener("play", this.reStartComment.bind(this)),
                                    this.video.addEventListener("pause", this.pauseComment.bind(this)),
                                    this.lastCommnetUpdateTime = 0,
                                    this.lastCommnetIndex = 0,
                                    this.commentLoopPreQueue = [],
                                    this.commentLoopQueue = [],
                                    this.commentButtonPreQueue = [],
                                    this.commentButtonQueue = [],
                                    this.commentTopPreQueue = [],
                                    this.commentTopQueue = [],
                                    this.drawQueue = [],
                                    this.preRenders = [],
                                    this.preRenderMap = {},
                                    this.enableComment = void 0 === this.comments ? !1 : !0,
                                    this.prevDrawCanvas = document.createElement("canvas"),
                                    this.canvas = this.DOMs.comments.getContext("2d"),
                                this.comments && this.DOMs.player.classList.add("has-comments"),
                                    this.DOMs["comments-btn"].classList.add("enable"),
                                    this.DOMs.comments.display = this.enableComment ? "block" : "none";
                                var e = 0,
                                    t = function () {
                                        (e = ~e) && this.onCommentTimeUpdate(),
                                            s(t)
                                    }.bind(this);
                                t()
                            },
                            needDrawText: function (e, t, n) {
                                this.drawQueue.push([e, t, n])
                            },
                            drawText: function () {
                                var e = this.prevDrawCanvas,
                                    t = this.prevDrawCanvas.getContext("2d");
                                e.width = this.canvasWidth,
                                    e.height = this.canvasHeight,
                                    t.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                                var i = [];
                                this.preRenders.forEach(function (e, t) {
                                    e.used = !1,
                                    void 0 === e.cid && i.push(t)
                                });
                                for (var r; r = this.drawQueue.shift();)!
                                    function (e, r) {
                                        var a, s = e[0].text + e[0].color,
                                            l = r.preRenderMap[s];
                                        if (void 0 === l) {
                                            var l = i.shift();
                                            void 0 === l ? (a = document.createElement("canvas"), l = r.preRenders.push(a) - 1) : a = r.preRenders[l];
                                            var c = a.width = e[0].width,
                                                d = a.height = o + 10,
                                                u = a.getContext("2d");
                                            u.clearRect(0, 0, c, d),
                                                n(u),
                                                u.fillStyle = e[0].color,
                                                u.strokeText(e[0].text, 0, o),
                                                u.fillText(e[0].text, 0, o),
                                                a.cid = s,
                                                r.preRenderMap[s] = l
                                        } else a = r.preRenders[l];
                                        a.used = !0,
                                            t.drawImage(a, e[1], e[2])
                                    }(r, this);
                                this.preRenders.forEach(function (e) {
                                    e.used === !1 && (delete this.preRenderMap[e.cid], e.cid = void 0)
                                }.bind(this)),
                                    this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight),
                                    this.canvas.drawImage(e, 0, 0)
                            },
                            createComment: function (e, t) {
                                if (void 0 === e) return !1;
                                var n = a.measureText(e.text);
                                return {
                                    startTime: t,
                                    text: e.text,
                                    color: e.color,
                                    width: n.width + 20
                                }
                            },
                            commentTop: function (e, t, n) {
                                this.commentTopQueue.forEach(function (t, i) {
                                    void 0 != t && (n > t.startTime + r ? this.commentTopQueue[i] = void 0 : this.needDrawText(t, (e - t.width) / 2, o * i))
                                }.bind(this));
                                for (var i; i = this.commentTopPreQueue.shift();) i = this.createComment(i, n),
                                    this.commentTopQueue.forEach(function (t, n) {
                                        i && void 0 === t && (t = this.commentTopQueue[n] = i, this.needDrawText(t, (e - i.width) / 2, o * n), i = void 0)
                                    }.bind(this)),
                                i && (this.commentTopQueue.push(i), this.needDrawText(i, (e - i.width) / 2, o * this.commentTopQueue.length - 1))
                            },
                            commentBottom: function (e, t, n) {
                                t -= 10,
                                    this.commentButtonQueue.forEach(function (i, a) {
                                        void 0 != i && (n > i.startTime + r ? this.commentButtonQueue[a] = void 0 : this.needDrawText(i, (e - i.width) / 2, t - o * (a + 1)))
                                    }.bind(this));
                                for (var i; i = this.commentButtonPreQueue.shift();) i = this.createComment(i, n),
                                    this.commentButtonQueue.forEach(function (n, r) {
                                        i && void 0 === n && (n = this.commentButtonQueue[r] = i, this.needDrawText(n, (e - i.width) / 2, t - o * (r + 1)), i = void 0)
                                    }.bind(this)),
                                i && (this.commentButtonQueue.push(i), this.needDrawText(i, (e - i.width) / 2, t - o * this.commentButtonQueue.length))
                            },
                            commentLoop: function (e, t, n) {
                                for (var r = t / o | 0, a = -1; ++a < r;) {
                                    var s = this.commentLoopQueue[a];
                                    if (void 0 === s && (s = this.commentLoopQueue[a] = []), this.commentLoopPreQueue.length > 0) {
                                        var l = 0 === s.length ? void 0 : s[s.length - 1];
                                        if (void 0 === l || (n - l.startTime) * i > l.width) {
                                            var c = this.createComment(this.commentLoopPreQueue.shift(), n);
                                            c && s.push(c)
                                        }
                                    }
                                    this.commentLoopQueue[a] = s.filter(function (t) {
                                        var r = (n - t.startTime) * i;
                                        return 0 > r || r > t.width + e ? !1 : (this.needDrawText(t, e - r, o * a), !0)
                                    }.bind(this))
                                }
                                for (var d = this.commentLoopQueue.length - r; d-- > 0;) this.commentLoopQueue.pop()
                            },
                            pauseComment: function () {
                                this.pauseCommentAt = Date.now()
                            },
                            reStartComment: function () {
                                if (this.pauseCommentAt) {
                                    var e = Date.now() - this.pauseCommentAt;
                                    this.commentLoopQueue.forEach(function (t) {
                                        t.forEach(function (t) {
                                            t && (t.startTime += e)
                                        })
                                    }),
                                        this.commentButtonQueue.forEach(function (t) {
                                            t && (t.startTime += e)
                                        }),
                                        this.commentTopQueue.forEach(function (t) {
                                            t && (t.startTime += e)
                                        })
                                }
                                this.pauseCommentAt = void 0
                            },
                            drawComment: function () {
                                if (!this.pauseCommentAt) {
                                    var e = Date.now(),
                                        t = this.DOMs["video-frame"].offsetWidth,
                                        n = this.DOMs["video-frame"].offsetHeight;
                                    t != this.canvasWidth && (this.DOMs.comments.width = t, this.canvasWidth = t),
                                    n != this.canvasHeight && (this.DOMs.comments.height = n, this.canvasHeight = n);
                                    var i = this.video.offsetWidth,
                                        o = this.video.offsetHeight;
                                    this.commentLoop(i, o, e),
                                        this.commentTop(i, o, e),
                                        this.commentBottom(i, o, e),
                                        this.drawText()
                                }
                            },
                            onCommentTimeUpdate: function () {
                                if (this.enableComment !== !1) {
                                    var e = this.video.currentTime;
                                    if (Math.abs(e - this.lastCommnetUpdateTime) <= 1 && e > this.lastCommnetUpdateTime) {
                                        var t = 0;
                                        for (this.lastCommnetIndex && this.comments[this.lastCommnetIndex].time <= this.lastCommnetUpdateTime && (t = this.lastCommnetIndex); ++t < this.comments.length;) if (!(this.comments[t].time <= this.lastCommnetUpdateTime)) {
                                            if (this.comments[t].time > e) break;
                                            switch (this.comments[t].pos) {
                                                case "bottom":
                                                    this.commentButtonPreQueue.push(this.comments[t]);
                                                    break;
                                                case "top":
                                                    this.commentTopPreQueue.push(this.comments[t]);
                                                    break;
                                                default:
                                                    this.commentLoopPreQueue.push(this.comments[t])
                                            }
                                            this.lastCommnetIndex = t
                                        }
                                    }
                                    try {
                                        this.drawComment()
                                    } catch (n) {}
                                    this.lastCommnetUpdateTime = e
                                }
                            }
                        }
                    },
                        {
                            "./createElement": 7
                        }],
                    4: [function (e, t) {
                        function n(e) {
                            return Array.prototype.slice.call(e)
                        }
                        function i(e, t, n, i) {
                            function o(t) {
                                var n = (t.clientX - e.parentNode.getBoundingClientRect().left) / e.parentNode.offsetWidth;
                                return Math.min(Math.max(n, 0), 1)
                            }
                            function r(t) {
                                1 == t.which && (l = !0, e.draging = !0, a(t))
                            }
                            function a(e) {
                                if (1 == e.which && l === !0) {
                                    var t = o(e);
                                    n(t)
                                }
                            }
                            function s(t) {
                                if (1 == t.which && l === !0) {
                                    var r = o(t);
                                    n(r),
                                        i(r),
                                        l = !1,
                                        delete e.draging
                                }
                            }
                            var l = !1;
                            n = n ||
                                function () {},
                                i = i ||
                                    function () {},
                                e.parentNode.addEventListener("mousedown", r),
                                t.addEventListener("mousemove", a),
                                t.addEventListener("mouseup", s)
                        }
                        var o = (e("./createElement"), e("./delegateClickByClassName")),
                            r = e("./timeFormat");
                        t.exports = {
                            init: function () {
                                var e = this.iframe.contentDocument,
                                    t = o(e);
                                t.on("play", this.onPlayClick, this),
                                    t.on("video-frame", this.onVideoClick, this),
                                    t.on("source", this.onSourceClick, this),
                                    t.on("allscreen", this.onAllScreenClick, this),
                                    t.on("fullscreen", this.onfullScreenClick, this),
                                    t.on("normalscreen", this.onNormalScreenClick, this),
                                    t.on("comments-btn", this.oncommentsBtnClick, this),
                                    t.on("airplay", this.onAirplayBtnClick, this),
                                    e.documentElement.addEventListener("keydown", this.onKeyDown.bind(this), !1),
                                    this.DOMs.player.addEventListener("mousemove", this.onMouseActive.bind(this)),
                                    i(this.DOMs.progress_anchor, e, this.onProgressAnchorWillSet.bind(this), this.onProgressAnchorSet.bind(this)),
                                    i(this.DOMs.volume_anchor, e, this.onVolumeAnchorWillSet.bind(this))
                            },
                            onKeyDown: function (e) {
                                switch (e.preventDefault(), e.keyCode) {
                                    case 32:
                                        this.onPlayClick();
                                        break;
                                    case 39:
                                        this.video.currentTime = Math.min(this.video.duration, this.video.currentTime + 10);
                                        break;
                                    case 37:
                                        this.video.currentTime = Math.max(0, this.video.currentTime - 10);
                                        break;
                                    case 38:
                                        this.video.volume = Math.min(1, this.video.volume + .1),
                                            this.DOMs.volume_anchor.style.width = 100 * this.video.volume + "%";
                                        break;
                                    case 40:
                                        this.video.volume = Math.max(0, this.video.volume - .1),
                                            this.DOMs.volume_anchor.style.width = 100 * this.video.volume + "%";
                                        break;
                                    case 65:
                                        this.DOMs.player.classList.contains("allscreen") ? this.onNormalScreenClick() : this.onAllScreenClick();
                                        break;
                                    case 70:
                                        this.DOMs.player.classList.contains("fullscreen") || this.onfullScreenClick()
                                }
                            },
                            onVideoClick: function () {
                                void 0 == this.videoClickDblTimer ? this.videoClickDblTimer = setTimeout(function () {
                                    this.videoClickDblTimer = void 0,
                                        this.onPlayClick()
                                }.bind(this), 300) : (clearTimeout(this.videoClickDblTimer), this.videoClickDblTimer = void 0, document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? this.onNormalScreenClick() : this.onfullScreenClick())
                            },
                            onMouseActive: function () {
                                this.DOMs.player.classList.add("active"),
                                    clearTimeout(this.MouseActiveTimer),
                                    this.MouseActiveTimer = setTimeout(function () {
                                        this.DOMs.player.classList.remove("active")
                                    }.bind(this), 1e3)
                            },
                            onPlayClick: function () {
                                this.DOMs.play.classList.contains("paused") ? (this.video.play(), this.DOMs.play.classList.remove("paused")) : (this.video.pause(), this.DOMs.play.classList.add("paused"))
                            },
                            onSourceClick: function (e) {
                                e.classList.contains("curr") || (this.video.preloadStartTime = this.video.currentTime, this.video.src = this.sourceList[0 | e.getAttribute("sourceIndex")][1], n(e.parentNode.childNodes).forEach(function (t) {
                                    e === t ? t.classList.add("curr") : t.classList.remove("curr")
                                }.bind(this)))
                            },
                            onProgressAnchorWillSet: function (e) {
                                var t = this.video.duration,
                                    n = t * e;
                                this.DOMs.current.innerHTML = r(n),
                                    this.DOMs.duration.innerHTML = r(t),
                                    this.DOMs.progress_anchor.style.width = 100 * e + "%"
                            },
                            onProgressAnchorSet: function (e) {
                                this.video.currentTime = this.video.duration * e
                            },
                            onVolumeAnchorWillSet: function (e) {
                                this.video.volume = e,
                                    this.DOMs.volume_anchor.style.width = 100 * e + "%"
                            },
                            onAllScreenClick: function () {
                                var e = document.documentElement.clientWidth,
                                    t = document.documentElement.clientHeight;
                                this.iframe.style.cssText = ";position:fixed;top:0;left:0;width:" + e + "px;height:" + t + "px;z-index:999999;",
                                    this.allScreenWinResizeFunction = this.allScreenWinResizeFunction ||
                                        function () {
                                            this.iframe.style.width = document.documentElement.clientWidth + "px",
                                                this.iframe.style.height = document.documentElement.clientHeight + "px"
                                        }.bind(this),
                                    window.removeEventListener("resize", this.allScreenWinResizeFunction),
                                    window.addEventListener("resize", this.allScreenWinResizeFunction),
                                    this.DOMs.player.classList.add("allscreen")
                            },
                            onfullScreenClick: function () {
                                ["webkitRequestFullScreen", "mozRequestFullScreen", "requestFullScreen"].forEach(function (e) {
                                    this.DOMs.player[e] && this.DOMs.player[e]()
                                }.bind(this)),
                                    this.onMouseActive()
                            },
                            onNormalScreenClick: function () {
                                window.removeEventListener("resize", this.allScreenWinResizeFunction),
                                    this.iframe.style.cssText = ";width:" + this.size[0] + "px;height:" + this.size[1] + "px;",
                                    ["webkitCancelFullScreen", "mozCancelFullScreen", "cancelFullScreen"].forEach(function (e) {
                                        document[e] && document[e]()
                                    }),
                                    this.DOMs.player.classList.remove("allscreen")
                            },
                            oncommentsBtnClick: function () {
                                this.enableComment = !this.DOMs["comments-btn"].classList.contains("enable"),
                                    this.enableComment ? (setTimeout(function () {
                                        this.DOMs.comments.style.display = "block"
                                    }.bind(this), 80), this.DOMs["comments-btn"].classList.add("enable")) : (this.DOMs.comments.style.display = "none", this.DOMs["comments-btn"].classList.remove("enable"))
                            },
                            onAirplayBtnClick: function () {
                                this.video.webkitShowPlaybackTargetPicker()
                            }
                        }
                    },
                        {
                            "./createElement": 7,
                            "./delegateClickByClassName": 8,
                            "./timeFormat": 14
                        }],
                    5: [function (e, t) {
                        var n = (e("./extend"), e("./createElement"));
                        e("./parseDOMByClassNames"),
                            t.exports = {
                                init: function () {
                                    var e = 0;
                                    this.sourceList.forEach(function (t, i) {
                                        n("li", {
                                            appendTo: this.DOMs.hd,
                                            sourceIndex: i,
                                            className: "source " + (i === e ? "curr" : ""),
                                            innerHTML: t[0]
                                        })
                                    }.bind(this)),
                                        this.DOMs.video.src = this.sourceList[e][1]
                                }
                            }
                    },
                        {
                            "./createElement": 7,
                            "./extend": 9,
                            "./parseDOMByClassNames": 11
                        }],
                    6: [function (e, t) {
                        var n = e("./timeFormat");
                        t.exports = {
                            init: function () {
                                this.video.addEventListener("timeupdate", this.onVideoTimeUpdate.bind(this)),
                                    this.video.addEventListener("play", this.onVideoPlay.bind(this)),
                                    this.video.addEventListener("pause", this.onVideoTimePause.bind(this)),
                                    this.video.addEventListener("loadedmetadata", this.onVideoLoadedMetaData.bind(this)),
                                    this.video.addEventListener("webkitplaybacktargetavailabilitychanged", this.onPlaybackTargetAvailabilityChanged.bind(this)),
                                    setInterval(this.videoBuffered.bind(this), 1e3),
                                    this.DOMs.volume_anchor.style.width = 100 * this.video.volume + "%"
                            },
                            onVideoTimeUpdate: function () {
                                var e = this.video.currentTime,
                                    t = this.video.duration;
                                this.DOMs.current.innerHTML = n(e),
                                    this.DOMs.duration.innerHTML = n(t),
                                this.DOMs.progress_anchor.draging || (this.DOMs.progress_anchor.style.width = 100 * Math.min(Math.max(e / t, 0), 1) + "%")
                            },
                            videoBuffered: function () {
                                var e = this.video.buffered,
                                    t = this.video.currentTime,
                                    n = 0 == e.length ? 0 : e.end(e.length - 1);
                                this.DOMs.buffered_anchor.style.width = 100 * Math.min(Math.max(n / this.video.duration, 0), 1) + "%",
                                    0 == n || t >= n ? this.DOMs.player.classList.add("loading") : this.DOMs.player.classList.remove("loading")
                            },
                            onVideoPlay: function () {
                                this.DOMs.play.classList.remove("paused")
                            },
                            onVideoTimePause: function () {
                                this.DOMs.play.classList.add("paused")
                            },
                            onVideoLoadedMetaData: function () {
                                this.video.preloadStartTime && (this.video.currentTime = this.video.preloadStartTime, delete this.video.preloadStartTime)
                            },
                            onPlaybackTargetAvailabilityChanged: function (e) {
                                var t = "support-airplay";
                                "available" === e.availability ? this.DOMs.player.classList.add(t) : this.DOMs.player.classList.remove(t)
                            }
                        }
                    },
                        {
                            "./timeFormat": 14
                        }],
                    7: [function (e, t) {
                        function n(e, t) {
                            var n = document.createElement(e);
                            if ("function" == typeof t) t.call(n);
                            else for (var i in t) if (t.hasOwnProperty(i)) switch (i) {
                                case "appendTo":
                                    t[i].appendChild(n);
                                    break;
                                case "text":
                                    var o = document.createTextNode(t[i]);
                                    n.innerHTML = "",
                                        n.appendChild(o);
                                    break;
                                case "innerHTML":
                                case "className":
                                case "id":
                                    n[i] = t[i];
                                    break;
                                case "style":
                                    var r = t[i];
                                    for (var a in r) r.hasOwnProperty(a) && (n.style[a] = r[a]);
                                    break;
                                default:
                                    n.setAttribute(i, t[i] + "")
                            }
                            return n
                        }
                        t.exports = n
                    },
                        {}],
                    8: [function (e, t) {
                        function n(e) {
                            return Array.prototype.slice.call(e)
                        }
                        function i(e) {
                            this._eventMap = {},
                                this._rootElement = e,
                                this._isRootElementBindedClick = !1,
                                this._bindClickFunction = function (e) {
                                    !
                                        function t(e, i) {
                                            i && i.nodeName && (i.classList && n(i.classList).forEach(function (t) {
                                                e.trigger(t, i)
                                            }), t(e, i.parentNode))
                                        }(this, e.target)
                                }.bind(this)
                        }
                        var o = e("./extend");
                        o(i.prototype, {
                            on: function (e, t, n) {
                                void 0 === this._eventMap[e] && (this._eventMap[e] = []),
                                    this._eventMap[e].push([t, n]),
                                this._isRootElementBindedClick || (_isRootElementBindedClick = !0, this._rootElement.addEventListener("click", this._bindClickFunction, !1))
                            },
                            off: function (e, t) {
                                if (void 0 != this._eventMap[e]) for (var n = this._eventMap[e].length; n--;) if (this._eventMap[e][n][0] === t) {
                                    this._eventMap[e].splice(n, 1);
                                    break
                                }
                                for (var i in this._eventMap) break;
                                void 0 === i && this._isRootElementBindedClick && (_isRootElementBindedClick = !1, this._rootElement.removeEventListener("click", this._bindClickFunction, !1))
                            },
                            trigger: function (e, t) {
                                t = void 0 === t ? this._rootElement.getElementsByTagNames(e) : [t],
                                    t.forEach(function (t) {
                                        (this._eventMap[e] || []).forEach(function (e) {
                                            e[0].call(e[1], t)
                                        })
                                    }.bind(this))
                            }
                        }),
                            t.exports = function (e) {
                                return new i(e)
                            }
                    },
                        {
                            "./extend": 9
                        }],
                    9: [function (e, t) {
                        function n(e) {
                            for (var t, n = arguments.length, i = 1; n > i;) {
                                t = arguments[i++];
                                for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o])
                            }
                            return e
                        }
                        t.exports = n
                    },
                        {}],
                    10: [function (e) {
                        function t(e, t, n, i) {
                            this.id = e,
                                this.size = t.split("x"),
                                this.sourceList = n || [],
                                this.comments = i,
                                this.init()
                        }
                        e("./component")(t, e("./component_build"), e("./component_event"), e("./component_video"), e("./component_source"), e("./component_comments")),
                            n = t
                    },
                        {
                            "./component": 1,
                            "./component_build": 2,
                            "./component_comments": 3,
                            "./component_event": 4,
                            "./component_source": 5,
                            "./component_video": 6
                        }],
                    11: [function (e, t) {
                        function n(e, t) {
                            var n = {};
                            return t.forEach(function (t) {
                                n[t] = e.getElementsByClassName(t)[0]
                            }),
                                n
                        }
                        t.exports = n
                    },
                        {}],
                    12: [function (e, t) {
                        t.exports = '* { margin:0; padding:0; }body { font-family: "PingHei","Lucida Grande", "Lucida Sans Unicode", "STHeiti", "Helvetica","Arial","Verdana","sans-serif"; font-size:16px;}html, body, .player { height: 100%; }.player:-webkit-full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player:-moz-full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player:full-screen { width: 100%; cursor:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==); }.player { border-radius: 3px; overflow: hidden; position: relative; cursor: default;  -webkit-user-select: none;  -moz-user-select: none; user-select: none;}.video-frame { box-sizing: border-box; padding-bottom: 50px; height: 100%; overflow: hidden; position: relative;}.video-frame .comments{ position: absolute; top:0;left:0; width:100%; height:100%;  -webkit-transform:translateZ(0);  -moz-transform:translateZ(0); transform:translateZ(0);  pointer-events: none;}.player:-webkit-full-screen .video-frame { padding-bottom: 0px; }.player:-moz-full-screen .video-frame { padding-bottom: 0px; }.player:full-screen .video-frame{ padding-bottom: 0px; }.video { width: 100%;  height: 100%; background: #000000;}.controller {  position: absolute; bottom: 0px;  left:0; right:0;  background: #24272A;  height: 50px;}.controller .loading-icon { display: none;  position: absolute; width: 20px;  height: 20px; line-height: 20px;  text-align: center; font-size: 20px;  color: #ffffff; top: -30px; right: 10px;}.player.loading .controller .loading-icon {  display: block;}.player:-webkit-full-screen .controller { -webkit-transform:translateY(50px); -webkit-transition: -webkit-transform 0.3s ease;}.player:-moz-full-screen .controller { -moz-transform:translateY(50px);  -moz-transition: -moz-transform 0.3s ease;}.player:full-screen .controller {  transform:translateY(50px); transition: transform 0.3s ease;}.player.active:-webkit-full-screen { cursor: default;}.player.active:-moz-full-screen {  cursor: default;}.player.active:full-screen { cursor: default;}.player.active:-webkit-full-screen .controller,.player:-webkit-full-screen .controller:hover { -webkit-transform:translateY(0);  cursor: default;}.player.active:-moz-full-screen .controller,.player:-moz-full-screen .controller:hover { -moz-transform:translateY(0); cursor: default;}.player.active:full-screen .controller.player:full-screen .controller:hover {  transform:translateY(0);  cursor: default;}.player.active:-webkit-full-screen .controller .progress .progress_anchor:after,.player:-webkit-full-screen .controller:hover .progress .progress_anchor:after { height:12px;}.player.active:-moz-full-screen .controller .progress .progress_anchor:after,.player:-moz-full-screen .controller:hover .progress .progress_anchor:after { height:12px;}.player.active:full-screen .controller .progress .progress_anchor:after,.player:full-screen .controller:hover .progress .progress_anchor:after { height:12px;}.player:-webkit-full-screen .controller .progress .progress_anchor:after { height:4px;}.player:-moz-full-screen .controller .progress .progress_anchor:after { height:4px;}.player:full-screen .controller .progress .progress_anchor:after {  height:4px;}.controller .progress { position: absolute; top:0px;  left:0; right:0;  border-right: 4px solid #181A1D;  border-left: 8px solid #B3ABAB; height: 4px;  background: #181A1D;  z-index:1;  -webkit-transform: translateZ(0); -moz-transform: translateZ(0);  transform: translateZ(0);}.controller .progress:after { content:""; display: block; position: absolute; top:0px;  left:0; right:0;  bottom:-10px; height: 10px;}.controller .progress .anchor { height: 4px;  background: #B3ABAB;  position: absolute; top:0;left:0;}.controller .progress .anchor:after { content:""; display: block; width: 12px;  background: #f5f5f5;  position: absolute; right:-4px; top: 50%; height: 12px; box-shadow: 0 0 2px rgba(0,0,0, 0.4); border-radius: 12px;  -webkit-transform: translateY(-50%);  -moz-transform: translateY(-50%); transform: translateY(-50%);}.controller .progress .anchor.buffered_anchor {  position: relative; background: rgba(255,255,255,0.1);}.controller .progress .anchor.buffered_anchor:after {  box-shadow: none; height: 4px;  width: 4px; border-radius: 0; background: rgba(255,255,255,0.1);}.controller .right { height: 50px; position: absolute; top:0;  left:10px;  right:10px; pointer-events: none;}.controller .play,.controller .volume,.controller .time,.controller .hd,.controller .airplay,.controller .allscreen,.controller .normalscreen,.controller .comments-btn,.controller .fullscreen { padding-top:4px;  height: 46px; line-height: 50px;  text-align: center; color: #eeeeee; float:left; text-shadow:0 0 2px rgba(0,0,0,0.5);  pointer-events: auto;}.controller .hd,.controller .airplay,.controller .allscreen,.controller .normalscreen,.controller .comments-btn,.controller .fullscreen { float:right;}.controller .play {  width: 36px;  padding-left: 10px; cursor: pointer;}.controller .play:after {  font-family: "FontAwesome"; content: "\\f04c";}.controller .play.paused:after { content: "\\f04b";}.controller .volume {  min-width: 30px;  position: relative; overflow: hidden; -webkit-transition: min-width 0.3s ease 0.5s; -moz-transition: min-width 0.3s ease 0.5s;  transition: min-width 0.3s ease 0.5s;}.controller .volume:hover { min-width: 128px;}.controller .volume:before {  font-family: "FontAwesome"; content: "\\f028";  width: 36px;  display: block;}.controller .volume .progress { width: 70px;  top: 27px;  left: 40px;}.controller .time { font-size: 12px;  font-weight: bold;  padding-left: 10px;}.controller .time .current {  color: #EEEEEE;}.controller .fullscreen,.controller .airplay,.controller .allscreen,.controller .comments-btn,.controller .normalscreen { width: 36px;  cursor: pointer;}.controller .comments-btn {  margin-right: -15px;  display: none;}.player.has-comments .controller .comments-btn { display: block;}.controller .comments-btn:before {  font-family: "FontAwesome"; content: "\\f075";}.controller .comments-btn.enable:before {  color: #DF6558;}.controller .airplay,.controller .normalscreen {  display: none;}.player:-webkit-full-screen .controller .fullscreen,.player:-webkit-full-screen .controller .allscreen { display: none;}.player:-webkit-full-screen .controller .normalscreen,.player.allscreen .controller .normalscreen,.player.support-airplay .controller .airplay { display: block;}.player.allscreen .controller .allscreen {  display: none;}.controller .fullscreen:before { font-family: "FontAwesome"; content: "\\f0b2";}.controller .allscreen:before {  font-family: "FontAwesome"; content: "\\f065";}.controller .normalscreen:before { font-family: "FontAwesome"; content: "\\f066";}.controller .airplay { background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ibWFtYS1haXJwbGF5LWljb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjJweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjIgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwb2x5bGluZSBwb2ludHM9IjUsMTIgMSwxMiAxLDEgMjEsMSAyMSwxMiAxNywxMiIgc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7c3Ryb2tlOndoaXRlO3N0cm9rZS13aWR0aDoxIi8+PHBvbHlsaW5lIHBvaW50cz0iNCwxNiAxMSwxMCAxOCwxNiIgc3R5bGU9ImZpbGw6d2hpdGU7c3Ryb2tlOnRyYW5zcGFyZW50O3N0cm9rZS13aWR0aDowIi8+PC9zdmc+DQo=) no-repeat center 20px;  background-size: 22px auto;}.controller .hd { white-space:nowrap; overflow: hidden; margin-right: 10px; text-align: right;}.controller .hd:hover li { max-width: 300px;}.controller .hd li {  display: inline-block;  max-width: 0px; -webkit-transition: max-width 0.8s ease 0.3s; -moz-transition: max-width 0.8s ease 0.3s;  transition: max-width 0.8s ease 0.3s; overflow: hidden; font-size: 14px;  font-weight: bold;  position: relative; cursor: pointer;}.controller .hd li:before {  content: "";  display: inline-block;  width:20px;}.controller .hd li:before { content: "";  display: inline-block;  width:20px;}.controller .hd li.curr { max-width: 300px; cursor: default;  color: #EEEEEE;}.controller .hd li.curr:after { content: "";  display: block; position: absolute; width:4px;  height:4px; border-radius: 50%; background: #ffffff;  left: 12px; top: 23px;  opacity: 0; -webkit-transition: opacity 0.5s ease 0.3s; -moz-transition: opacity 0.5s ease 0.3s;  transition: opacity 0.5s ease 0.3s;}'
                    },
                        {}],
                    13: [function (e, t) {
                        t.exports = '<div class="player">  <div class="video-frame"><video class="video" autoplay="autoplay"></video><canvas class="comments"></canvas></div>  <div class="controller">    <div class="loading-icon fa fa-spin fa-circle-o-notch"></div>   <div class="progress">      <div class="anchor buffered_anchor" style="width:0%"></div>     <div class="anchor progress_anchor" style="width:0%"></div>   </div>    <div class="right">     <div class="fullscreen"></div>      <div class="allscreen"></div>     <div class="normalscreen"></div>      <div class="airplay"></div>     <ul class="hd"></ul>      <div class="comments-btn"></div>     </div>    <div class="left">     <div class="play paused"></div>     <div class="volume">        <div class="progress">          <div class="anchor volume_anchor" style="width:0%"></div>       </div>      </div>      <div class="time">        <span class="current">00:00:00</span> / <span class="duration">00:00:00</span>      </div>     </div> </div></div>'
                    },
                        {}],
                    14: [function (e, t) {
                        function n(e, t) {
                            return (Array(t).join(0) + e).slice(-t)
                        }
                        function i(e) {
                            var t, i = [];
                            return [3600, 60, 1].forEach(function (o) {
                                i.push(n(t = e / o | 0, 2)),
                                    e -= t * o
                            }),
                                i.join(":")
                        }
                        t.exports = i
                    },
                        {}]
                }, {}, [10]),
                t.exports = n
        },
            {}],
        10: [function (e, t) {
            function n(e, t) {
                for (var n = decodeURI(e), i = f[t ? "strict" : "loose"].exec(n), o = {
                    attr: {},
                    param: {},
                    seg: {}
                }, r = 14; r--;) o.attr[p[r]] = i[r] || "";
                return o.param.query = a(o.attr.query),
                    o.param.fragment = a(o.attr.fragment),
                    o.seg.path = o.attr.path.replace(/^\/+|\/+$/g, "").split("/"),
                    o.seg.fragment = o.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"),
                    o.attr.base = o.attr.host ? (o.attr.protocol ? o.attr.protocol + "://" + o.attr.host : o.attr.host) + (o.attr.port ? ":" + o.attr.port : "") : "",
                    o
            }
            function i(e, t) {
                if (0 === e[t].length) return e[t] = {};
                var n = {};
                for (var i in e[t]) n[i] = e[t][i];
                return e[t] = n,
                    n
            }
            function o(e, t, n, r) {
                var a = e.shift();
                if (a) {
                    var s = t[n] = t[n] || [];
                    "]" == a ? d(s) ? "" !== r && s.push(r) : "object" == typeof s ? s[u(s).length] = r : s = t[n] = [t[n], r] : ~a.indexOf("]") ? (a = a.substr(0, a.length - 1), !v.test(a) && d(s) && (s = i(t, n)), o(e, s, a, r)) : (!v.test(a) && d(s) && (s = i(t, n)), o(e, s, a, r))
                } else d(t[n]) ? t[n].push(r) : t[n] = "object" == typeof t[n] ? r : "undefined" == typeof t[n] ? r : [t[n], r]
            }
            function r(e, t, n) {
                if (~t.indexOf("]")) {
                    var i = t.split("[");
                    o(i, e, "base", n)
                } else {
                    if (!v.test(t) && d(e.base)) {
                        var r = {};
                        for (var a in e.base) r[a] = e.base[a];
                        e.base = r
                    }
                    "" !== t && s(e.base, t, n)
                }
                return e
            }
            function a(e) {
                return c(String(e).split(/&|;/), function (e, t) {
                    try {
                        t = decodeURIComponent(t.replace(/\+/g, " "))
                    } catch (n) {}
                    var i = t.indexOf("="),
                        o = l(t),
                        a = t.substr(0, o || i),
                        s = t.substr(o || i, t.length);
                    return s = s.substr(s.indexOf("=") + 1, s.length),
                    "" === a && (a = t, s = ""),
                        r(e, a, s)
                }, {
                    base: {}
                }).base
            }
            function s(e, t, n) {
                var i = e[t];
                "undefined" == typeof i ? e[t] = n : d(i) ? i.push(n) : e[t] = [i, n]
            }
            function l(e) {
                for (var t, n, i = e.length, o = 0; i > o; ++o) if (n = e[o], "]" == n && (t = !1), "[" == n && (t = !0), "=" == n && !t) return o
            }
            function c(e, t) {
                for (var n = 0, i = e.length >> 0, o = arguments[2]; i > n;) n in e && (o = t.call(void 0, o, e[n], n, e)),
                    ++n;
                return o
            }
            function d(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            function u(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push(n);
                return t
            }
            function h(e, t) {
                return 1 === arguments.length && e === !0 && (t = !0, e = void 0),
                    t = t || !1,
                    e = e || window.location.toString(),
                {
                    data: n(e, t),
                    attr: function (e) {
                        return e = m[e] || e,
                            "undefined" != typeof e ? this.data.attr[e] : this.data.attr
                    },
                    param: function (e) {
                        return "undefined" != typeof e ? this.data.param.query[e] : this.data.param.query
                    },
                    fparam: function (e) {
                        return "undefined" != typeof e ? this.data.param.fragment[e] : this.data.param.fragment
                    },
                    segment: function (e) {
                        return "undefined" == typeof e ? this.data.seg.path : (e = 0 > e ? this.data.seg.path.length + e : e - 1, this.data.seg.path[e])
                    },
                    fsegment: function (e) {
                        return "undefined" == typeof e ? this.data.seg.fragment : (e = 0 > e ? this.data.seg.fragment.length + e : e - 1, this.data.seg.fragment[e])
                    }
                }
            }
            var p = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
                m = {
                    anchor: "fragment"
                },
                f = {
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                },
                v = /^[0-9]+$/;
            t.exports = h
        },
            {}],
        11: [function (e, t) {
            function n(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && t.push([n, e[n]].join("="));
                return t.join("&")
            }
            t.exports = n
        },
            {}],
        12: [function (e, t, n) {
            var i = e("./canPlayM3U8"),
                o = e("./ajax");
            n.match = function (e) {
                return /www\.hunantv\.com/.test(e.attr("host"))
            },
                n.getVideos = function (e, t) {
                    if (i) {
                        var n = function (e) {
                                var t = e.split("?")[1],
                                    n = new Array;
                                n = t.split("&");
                                var i = {};
                                for (key in n) param = n[key],
                                    item = new Array,
                                    item = n[key].split("="),
                                "" != item[0] && (i[item[0]] = item[1]);
                                return i
                            },
                            r = "&fmt=6&pno=7&m3u8=1",
                            a = document.getElementsByName("FlashVars")[0].getAttribute("value"),
                            s = a.split("&file=")[1],
                            l = s.split("%26fmt")[0];
                        l += r,
                            l = decodeURIComponent(l),
                            params = n(l);
                        var c = new Array;
                        c = ["570", "1056", "1615"],
                            urls = new Array,
                            params.limitrate = c[0],
                            text = "\u6807\u6e05",
                            o({
                                url: "http://pcvcr.cdn.imgo.tv/ncrs/vod.do",
                                jsonp: !0,
                                param: params,
                                callback: function (e) {
                                    "ok" == e.status && urls.push([text, e.info]),
                                        params.limitrate = c[1],
                                        text = "\u9ad8\u6e05",
                                        o({
                                            url: "http://pcvcr.cdn.imgo.tv/ncrs/vod.do",
                                            jsonp: !0,
                                            param: params,
                                            callback: function (e) {
                                                "ok" == e.status && urls.push([text, e.info]),
                                                    params.limitrate = c[2],
                                                    text = "\u8d85\u6e05",
                                                    o({
                                                        url: "http://pcvcr.cdn.imgo.tv/ncrs/vod.do",
                                                        jsonp: !0,
                                                        param: params,
                                                        callback: function (e) {
                                                            return "ok" == e.status && urls.push([text, e.info]),
                                                                t(urls)
                                                        }
                                                    })
                                            }
                                        })
                                }
                            })
                    } else console.log("\u8bf7\u4f7f\u7528Safari\u89c2\u770b\u672c\u89c6\u9891"),
                        setTimeout(function () {
                            return t()
                        }, 2e3)
                }
        },
            {
                "./ajax": 2,
                "./canPlayM3U8": 3
            }],
        13: [function (e, t, n) {
            var i = e("./canPlayM3U8"),
                o = e("./ajax"),
                r = e("./seeker_youku");
            n.match = function (e) {
                var t = window.iid || window.pageConfig && window.pageConfig.iid || window.itemData && window.itemData.iid,
                    n = window.itemData && window.itemData.vcode;
                return /tudou\.com/.test(e.attr("host")) && (n || t)
            },
                n.getVideos = function (e, t) {
                    var n = window.itemData && window.itemData.vcode;
                    if (n) return r.parseYoukuCode(n, t);
                    var a = window.iid || window.pageConfig && window.pageConfig.iid || window.itemData && window.itemData.iid,
                        s = function (e) {
                            var t, n = [
                                ["\u539f\u753b", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=5"],
                                ["\u8d85\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=4"],
                                ["\u9ad8\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=3"],
                                ["\u6807\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=2"]
                            ];
                            window.itemData && window.itemData.segs && (n = [], t = JSON.parse(window.itemData.segs), t[5] && n.push(["\u539f\u753b", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=5"]), t[4] && n.push(["\u8d85\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=4"]), t[3] && n.push(["\u9ad8\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=3"]), t[2] && n.push(["\u6807\u6e05", "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + a + "&st=2"])),
                                console.log("\u89e3\u6790tudou\u89c6\u9891\u5730\u5740\u6210\u529f " + n.map(function (e) {
                                        return "<a href=" + e[1] + ">" + e[0] + "</a>"
                                    }).join(" ")),
                                e(n)
                        },
                        l = function (e) {
                            o({
                                url: "http://vr.tudou.com/v2proxy/v2.js",
                                param: {
                                    it: a,
                                    st: "52%2C53%2C54"
                                },
                                jsonp: "jsonp",
                                callback: function (t) {
                                    if (-1 === t || -1 == t.code) return console.log("\u89e3\u6790tudou\u89c6\u9891\u5730\u5740\u5931\u8d25");
                                    for (var n = [], i = 0, o = t.urls.length; o > i; i++) n.push([i, t.urls[i]]);
                                    return console.log("\u89e3\u6790tudou\u89c6\u9891\u5730\u5740\u6210\u529f " + n.map(function (e) {
                                            return "<a href=" + e[1] + ">" + e[0] + "</a>"
                                        }).join(" ")),
                                        e(n)
                                }
                            })
                        };
                    i ? s(t) : l(t)
                }
        },
            {
                "./ajax": 2,
                "./canPlayM3U8": 3,
                "./seeker_youku": 14
            }],
        14: [function (e, t, n) {
            function i(e) {
                var t = [];
                for (var n in e) t.push(n + "=" + e[n]);
                return t.join("&")
            }
            function o(e) {
                if (!e) return "";
                e = e.toString();
                var t, n, i, o, r, a, s, l = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
                for (a = e.length, r = 0, s = ""; a > r;) {
                    do t = l[255 & e.charCodeAt(r++)];
                    while (a > r && -1 == t);
                    if (-1 == t) break;
                    do n = l[255 & e.charCodeAt(r++)];
                    while (a > r && -1 == n);
                    if (-1 == n) break;
                    s += String.fromCharCode(t << 2 | (48 & n) >> 4);
                    do {
                        if (i = 255 & e.charCodeAt(r++), 61 == i) return s;
                        i = l[i]
                    } while (a > r && -1 == i);
                    if (-1 == i) break;
                    s += String.fromCharCode((15 & n) << 4 | (60 & i) >> 2);
                    do {
                        if (o = 255 & e.charCodeAt(r++), 61 == o) return s;
                        o = l[o]
                    } while (a > r && -1 == o);
                    if (-1 == o) break;
                    s += String.fromCharCode((3 & i) << 6 | o)
                }
                return s
            }
            function r(e) {
                if (!e) return "";
                e = e.toString();
                var t, n, i, o, r, a, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for (i = e.length, n = 0, t = ""; i > n;) {
                    if (o = 255 & e.charCodeAt(n++), n == i) {
                        t += s.charAt(o >> 2),
                            t += s.charAt((3 & o) << 4),
                            t += "==";
                        break
                    }
                    if (r = e.charCodeAt(n++), n == i) {
                        t += s.charAt(o >> 2),
                            t += s.charAt((3 & o) << 4 | (240 & r) >> 4),
                            t += s.charAt((15 & r) << 2),
                            t += "=";
                        break
                    }
                    a = e.charCodeAt(n++),
                        t += s.charAt(o >> 2),
                        t += s.charAt((3 & o) << 4 | (240 & r) >> 4),
                        t += s.charAt((15 & r) << 2 | (192 & a) >> 6),
                        t += s.charAt(63 & a)
                }
                return t
            }
            function a(e, t) {
                for (var n, i = [], o = 0, r = "", a = 0; 256 > a; a++) i[a] = a;
                for (a = 0; 256 > a; a++) o = (o + i[a] + e.charCodeAt(a % e.length)) % 256,
                    n = i[a],
                    i[a] = i[o],
                    i[o] = n;
                a = 0,
                    o = 0;
                for (var s = 0; s < t.length; s++) a = (a + 1) % 256,
                    o = (o + i[a]) % 256,
                    n = i[a],
                    i[a] = i[o],
                    i[o] = n,
                    r += String.fromCharCode(t.charCodeAt(s) ^ i[(i[a] + i[o]) % 256]);
                return r
            }
            function s(e, t) {
                for (var n = [], i = 0; i < e.length; i++) {
                    var o = 0;
                    o = e[i] >= "a" && e[i] <= "z" ? e[i].charCodeAt(0) - "a".charCodeAt(0) : e[i] - "0" + 26;
                    for (var r = 0; 36 > r; r++) if (t[r] == o) {
                        o = r;
                        break
                    }
                    n[i] = o > 25 ? o - 26 : String.fromCharCode(o + 97)
                }
                return n.join("")
            }
            function l(e, t, n) {
                var i = this;
                new Date,
                    this._sid = m.sid,
                    this._fileType = n,
                    this._videoSegsDic = {},
                    this._ip = e.security.ip;
                var o = (new c, []),
                    r = [];
                r.streams = {},
                    r.logos = {},
                    r.typeArr = {},
                    r.totalTime = {};
                for (var a = 0; a < t.length; a++) {
                    for (var s = t[a].audio_lang, l = !1, d = 0; d < o.length; d++) if (o[d] == s) {
                        l = !0;
                        break
                    }
                    l || o.push(s)
                }
                for (var a = 0; a < o.length; a++) {
                    for (var u = o[a], h = {}, p = {}, f = [], d = 0; d < t.length; d++) {
                        var v = t[d];
                        if (u == v.audio_lang) {
                            if (!i.isValidType(v.stream_type)) continue;
                            var g = i.convertType(v.stream_type),
                                y = 0;
                            "none" != v.logo && (y = 1),
                                p[g] = y;
                            var b = !1;
                            for (var w in f) g == f[w] && (b = !0);
                            b || f.push(g);
                            var x = v.segs;
                            if (null == x) continue;
                            var k = [];
                            b && (k = h[g]);
                            for (var A = 0; A < x.length; A++) {
                                var C = x[A];
                                if (null == C) break;
                                var T = {};
                                T.no = A,
                                    T.size = C.size,
                                    T.seconds = Number(C.total_milliseconds_video) / 1e3,
                                    T.milliseconds_video = Number(v.milliseconds_video) / 1e3,
                                    T.key = C.key,
                                    T.fileId = this.getFileId(v.stream_fileid, A),
                                    T.src = this.getVideoSrc(d, A, e, v.stream_type, T.fileId),
                                    T.type = g,
                                    k.push(T)
                            }
                            h[g] = k
                        }
                    }
                    var M = this.langCodeToCN(u).key;
                    r.logos[M] = p,
                        r.streams[M] = h,
                        r.typeArr[M] = f
                }
                this._videoSegsDic = r,
                    this._videoSegsDic.lang = this.langCodeToCN(o[0]).key
            }
            function c(e) {
                this._randomSeed = e,
                    this.cg_hun()
            }
            var d = e("./canPlayM3U8"),
                u = e("./ajax"),
                h = [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26],
                p = {
                    a3: "b4et",
                    a4: "boa4"
                },
                m = {
                    a1: "4",
                    a2: "1"
                };
            n.match = function (e) {
                return /v\.youku\.com/.test(e.attr("host")) && !! window.videoId
            },
                n.parseYoukuCode = function (e, t) {
                    u({
                        url: "http://play.youku.com/play/get.json?vid=" + e + "&ct=12",
                        jsonp: !0,
                        callback: function (n) {
                            -1 == n && console.log("\u89e3\u6790youku\u89c6\u9891\u5730\u5740\u5931\u8d25", 2);
                            var c = n.data,
                                u = a(s(p.a3 + "o0b" + m.a1, h).toString(), o(c.security.encrypt_string)).split("_");
                            if (m.sid = u[0], m.token = u[1], d) {
                                var f = {
                                        vid: window.videoId,
                                        type: "[[type]]",
                                        ts: parseInt((new Date).getTime() / 1e3),
                                        keyframe: 0,
                                        ep: encodeURIComponent(r(a(s(p.a4 + "poz" + m.a2, h).toString(), m.sid + "_" + e + "_" + m.token))),
                                        sid: m.sid,
                                        token: m.token,
                                        ctype: 12,
                                        ev: 1,
                                        oip: c.security.ip,
                                        client_id: "youkumobileplaypage"
                                    },
                                    v = "http://pl.youku.com/playlist/m3u8?" + i(f);
                                t([
                                    ["\u8d85\u6e05", v.replace("[[type]]", "hd2")],
                                    ["\u9ad8\u6e05", v.replace("[[type]]", "mp4")],
                                    ["\u6807\u6e05", v.replace("[[type]]", "flv")]
                                ])
                            } else {
                                var g = new l(c, c.stream, "mp4");
                                console.log(g._videoSegsDic.streams),
                                    t([
                                        ["\u6807\u6e05", g._videoSegsDic.streams.guoyu["3gphd"][0].src]
                                    ])
                            }
                        }
                    })
                },
                n.getVideos = function (e, t) {
                    n.parseYoukuCode(window.videoId, t)
                },
                c.prototype = {
                    cg_hun: function () {
                        this._cgStr = "";
                        for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", t = e.length, n = 0; t > n; n++) {
                            var i = parseInt(this.ran() * e.length);
                            this._cgStr += e.charAt(i),
                                e = e.split(e.charAt(i)).join("")
                        }
                    },
                    cg_fun: function (e) {
                        for (var t = e.split("*"), n = "", i = 0; i < t.length - 1; i++) n += this._cgStr.charAt(t[i]);
                        return n
                    },
                    ran: function () {
                        return this._randomSeed = (211 * this._randomSeed + 30031) % 65536,
                        this._randomSeed / 65536
                    }
                },
                l.prototype = {
                    getFileId: function (e, t) {
                        if (null == e || "" == e) return "";
                        var n = "",
                            i = e.slice(0, 8),
                            o = t.toString(16);
                        1 == o.length && (o = "0" + o),
                            o = o.toUpperCase();
                        var r = e.slice(10, e.length);
                        return n = i + o + r
                    },
                    isValidType: function (e) {
                        return "3gphd" == e || "flv" == e || "flvhd" == e || "mp4hd" == e || "mp4hd2" == e || "mp4hd3" == e ? !0 : !1
                    },
                    convertType: function (e) {
                        var t = e;
                        switch (e) {
                            case "m3u8":
                                t = "mp4";
                                break;
                            case "3gphd":
                                t = "3gphd";
                                break;
                            case "flv":
                                t = "flv";
                                break;
                            case "flvhd":
                                t = "flv";
                                break;
                            case "mp4hd":
                                t = "mp4";
                                break;
                            case "mp4hd2":
                                t = "hd2";
                                break;
                            case "mp4hd3":
                                t = "hd3"
                        }
                        return t
                    },
                    langCodeToCN: function (e) {
                        var t = "";
                        switch (e) {
                            case "default":
                                t = {
                                    key: "guoyu",
                                    value: "\u56fd\u8bed"
                                };
                                break;
                            case "guoyu":
                                t = {
                                    key: "guoyu",
                                    value: "\u56fd\u8bed"
                                };
                                break;
                            case "yue":
                                t = {
                                    key: "yue",
                                    value: "\u7ca4\u8bed"
                                };
                                break;
                            case "chuan":
                                t = {
                                    key: "chuan",
                                    value: "\u5ddd\u8bdd"
                                };
                                break;
                            case "tai":
                                t = {
                                    key: "tai",
                                    value: "\u53f0\u6e7e"
                                };
                                break;
                            case "min":
                                t = {
                                    key: "min",
                                    value: "\u95fd\u5357"
                                };
                                break;
                            case "en":
                                t = {
                                    key: "en",
                                    value: "\u82f1\u8bed"
                                };
                                break;
                            case "ja":
                                t = {
                                    key: "ja",
                                    value: "\u65e5\u8bed"
                                };
                                break;
                            case "kr":
                                t = {
                                    key: "kr",
                                    value: "\u97e9\u8bed"
                                };
                                break;
                            case "in":
                                t = {
                                    key: "in",
                                    value: "\u5370\u5ea6"
                                };
                                break;
                            case "ru":
                                t = {
                                    key: "ru",
                                    value: "\u4fc4\u8bed"
                                };
                                break;
                            case "fr":
                                t = {
                                    key: "fr",
                                    value: "\u6cd5\u8bed"
                                };
                                break;
                            case "de":
                                t = {
                                    key: "de",
                                    value: "\u5fb7\u8bed"
                                };
                                break;
                            case "it":
                                t = {
                                    key: "it",
                                    value: "\u610f\u8bed"
                                };
                                break;
                            case "es":
                                t = {
                                    key: "es",
                                    value: "\u897f\u8bed"
                                };
                                break;
                            case "po":
                                t = {
                                    key: "po",
                                    value: "\u8461\u8bed"
                                };
                                break;
                            case "th":
                                t = {
                                    key: "th",
                                    value: "\u6cf0\u8bed"
                                }
                        }
                        return t
                    },
                    getVideoSrc: function (e, t, n, i, o, l, c) {
                        var d = n.stream[e],
                            u = n.video.encodeid;
                        if (!u || !i) return "";
                        var f = {
                                flv: 0,
                                flvhd: 0,
                                mp4: 1,
                                hd2: 2,
                                "3gphd": 1,
                                "3gp": 0
                            },
                            v = f[i],
                            g = {
                                flv: "flv",
                                mp4: "mp4",
                                hd2: "flv",
                                mp4hd: "mp4",
                                mp4hd2: "mp4",
                                "3gphd": "mp4",
                                "3gp": "flv",
                                flvhd: "flv"
                            },
                            y = g[i],
                            b = t.toString(16);
                        1 == b.length && (b = "0" + b);
                        var w = d.segs[t].total_milliseconds_video / 1e3,
                            x = d.segs[t].key;
                        ("" == x || -1 == x) && (x = d.key2 + d.key1);
                        var k = "";
                        n.show && (k = n.show.pay ? "&ypremium=1" : "&ymovie=1");
                        var A = "/player/getFlvPath/sid/" + m.sid + "_" + b + "/st/" + y + "/fileid/" + o + "?K=" + x + "&hd=" + v + "&myp=0&ts=" + w + "&ypp=0" + k,
                            C = encodeURIComponent(r(a(s(p.a4 + "poz" + m.a2, h).toString(), m.sid + "_" + o + "_" + m.token)));
                        return A += "&ep=" + C,
                            A += "&ctype=12",
                            A += "&ev=1",
                            A += "&token=" + m.token,
                            A += "&oip=" + this._ip,
                            A += (l ? "/password/" + l : "") + (c ? c : ""),
                            A = "http://k.youku.com" + A
                    }
                }
        },
            {
                "./ajax": 2,
                "./canPlayM3U8": 3
            }],
        15: [function (e, t) {
            t.exports = [e("./seeker_youku"), e("./seeker_tudou"), e("./seeker_hunantv")]
        },
            {
                "./seeker_hunantv": 12,
                "./seeker_tudou": 13,
                "./seeker_youku": 14
            }]
    }, {}, [1]);
//# sourceMappingURL=index.js.map
`,3).$.$
        ("SCRIPT")(`if(document.URL.indexOf("v.youku.com/v_show/id_X") >= 0){
    if(document.querySelector("#movie_player>param[name='flashvars']").value.indexOf('category=98')>-1){
        console.log('youku test')
    }else{
        doAdblock();
    }
}else if(!document.URL.match(/^http:\/\/v\.baidu\.com|http:\/\/music\.baidu\.com|http:\/\/dnf\.duowan\.com|http:\/\/bbs\.duowan\.com|http:\/\/newgame\.duowan\.com|http:\/\/my\.tv\.sohu\.com/)){
    doAdblock();
}
function doAdblock(){
    (function() {
        function A() {}
        A.prototype = {
            rules: {
                /*youku_loader: {
                 find: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?[^\.]*\.swf/,
                 replace: "http://2016.adtchrome.com/loader.swf"
                 },
                 youku_player: {
                 find: /^http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player[^\.]*|\w{13})\.swf/,
                 replace: "http://2016.adtchrome.com/player.swf"
                 },*/
                'pps_pps': {
                    'find': /^http:\/\/www\.iqiyi\.com\/player\/cupid\/common\/pps_flvplay_s\.swf/,
                    'replace': 'http://swf.adtchrome.com/pps_20140420.swf'
                },
                /*'iqiyi_1': {
                 'find': /^http:\/\/www\.iqiyi\.com\/player\/cupid\/common\/.+\.swf$/,
                 'replace': 'http://swf.adtchrome.com/iqiyi_20140624.swf'
                 },
                 'iqiyi_2': {
                 'find': /^http:\/\/www\.iqiyi\.com\/common\/flashplayer\/\d+\/.+\.swf$/,
                 'replace': 'http://swf.adtchrome.com/iqiyi_20140624.swf'
                 },*/
                'ku6': {
                    'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/(v|player|loader)\.swf/,
                    'replace': 'http://swf.adtchrome.com/ku6_20140420.swf'
                },
                'ku6_topic': {
                    'find': /^http:\/\/player\.ku6\.com\/inside\/(.*)\/v\.swf/,
                    'replace': 'http://swf.adtchrome.com/ku6_20140420.swf?vid=$1'
                },
                'sohu': {
                    'find':/http:\/\/(tv\.sohu\.com\/upload\/swf\/(?!(ap|56)).*\d+|(\d+\.){3}\d+(:\d+)?\/(web|test)player)\/(Main|PlayerShell)[^\.]*\.swf/,
                    'replace': "http://adtchrome.b0.upaiyun.com/sohu_live.swf"
                },
                /*'sohu2':{
                 'find':/^http:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\/testplayer\/Main0?\.swf/,
                 'replace':'http://www.adtchrome.com/sohu/sohu_20150104.swf'
                 },
                 'sohu_share': {
                 'find': /^http:\/\/share\.vrs\.sohu\.com\/my\/v\.swf&/,
                 'replace': 'http://www.adtchrome.com/sohu/sohu_20150104.swf?'
                 },
                 'sohu_sogou' : {
                 'find': /^http:\/\/share\.vrs\.sohu\.com\/(\d+)\/v\.swf/,
                 'replace': 'http://www.adtchrome.com/sohu/sohu_20150104.swf?vid=$1'
                 },
                 'letv': {
                 'find': /^http:\/\/player\.letvcdn\.com\/.*p\/.*\/newplayer\/LetvPlayer\.swf/,
                 'replace': 'http://swf.adtchrome.com/20150110_letv.swf'
                 },
                 'letv_topic': {
                 'find': /^http:\/\/player\.hz\.letv\.com\/hzplayer\.swf\/v_list=zhuanti/,
                 'replace': 'http://swf.adtchrome.com/20150110_letv.swf'
                 },
                 'letv_duowan': {
                 'find': /^http:\/\/assets\.dwstatic\.com\/video\/vpp\.swf/,
                 'replace': 'http://yuntv.letv.com/bcloud.swf'
                 },*/
                '17173_in':{
                    'find':/http:\/\/f\.v\.17173cdn\.com\/(\d+\/)?flash\/PreloaderFile(Customer)?\.swf/,
                    'replace':"http://swf.adtchrome.com/17173_in_20150522.swf"
                },
                '17173_out':{
                    'find':/http:\/\/f\.v\.17173cdn\.com\/(\d+\/)?flash\/PreloaderFileFirstpage\.swf/,
                    'replace':"http://swf.adtchrome.com/17173_out_20150522.swf"
                },
                '17173_live':{
                    'find':/http:\/\/f\.v\.17173cdn\.com\/(\d+\/)?flash\/Player_stream(_firstpage)?\.swf/,
                    'replace':"http://swf.adtchrome.com/17173_stream_20150522.swf"
                },
                '17173_live_out':{
                    'find':/http:\/\/f\.v\.17173cdn\.com\/(\d+\/)?flash\/Player_stream_(custom)?Out\.swf/,
                    'replace':"http://swf.adtchrome.com/17173.out.Live.swf"
                }
            },
            _done: null,
            get done() {
                if(!this._done) {
                    this._done = new Array();
                }
                return this._done;
            },
            addAnimations: function() {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = 'object,embed{\
                -webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;\
                -ms-animation-duration:.001s;-ms-animation-name:playerInserted;\
                -o-animation-duration:.001s;-o-animation-name:playerInserted;\
                animation-duration:.001s;animation-name:playerInserted;}\
                @-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
                @-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
                @-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
                @keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}';
                document.getElementsByTagName('head')[0].appendChild(style);
            },
            animationsHandler: function(e) {
                if(e.animationName === 'playerInserted') {
                    this.replace(e.target);
                }
            },
            replace: function(elem) {
                if (/http:\/\/v.youku.com\/v_show\/.*/.test(window.location.href)){
                    var tag = document.getElementById("playerBox").getAttribute("player")
                    if (tag == "adt"){
                        console.log("adt adv")
                        return;
                    }
                }
                if(this.done.indexOf(elem) != -1) return;
                this.done.push(elem);
                var player = elem.data || elem.src;
                if(!player) return;
                var i, find, replace = false;
                for(i in this.rules) {
                    find = this.rules[i]['find'];
                    if(find.test(player)) {
                        replace = this.rules[i]['replace'];
                        if('function' === typeof this.rules[i]['preHandle']) {
                            this.rules[i]['preHandle'].bind(this, elem, find, replace, player)();
                        }else{
                            this.reallyReplace.bind(this, elem, find, replace)();
                        }
                        break;
                    }
                }
            },
            reallyReplace: function(elem, find, replace) {
                elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
                var b = elem.querySelector("param[name='movie']");
                this.reloadPlugin(elem);
            },
            reloadPlugin: function(elem) {
                var nextSibling = elem.nextSibling;
                var parentNode = elem.parentNode;
                parentNode.removeChild(elem);
                var newElem = elem.cloneNode(true);
                this.done.push(newElem);
                if(nextSibling) {
                    parentNode.insertBefore(newElem, nextSibling);
                } else {
                    parentNode.appendChild(newElem);
                }
            },
            init: function() {
                var desc = navigator.mimeTypes['application/x-shockwave-flash'].description.toLowerCase();
                /*if(desc.indexOf('adobe')>-1){
                 delete this.rules["iqiyi_1"];
                 delete this.rules["iqiyi_2"];
                 }*/
                if(document.URL.indexOf('tv.sohu.com')<=0){
                    delete this.rules["sohu"];
                }
                var handler = this.animationsHandler.bind(this);
                document.body.addEventListener('webkitAnimationStart', handler, false);
                document.body.addEventListener('msAnimationStart', handler, false);
                document.body.addEventListener('oAnimationStart', handler, false);
                document.body.addEventListener('animationstart', handler, false);
                this.addAnimations();
            }
        };
        new A().init();
    })();
}
// 20140730
(function cnbeta() {
    if (document.URL.indexOf('cnbeta.com') >= 0) {
        var elms = document.body.querySelectorAll("p>embed");
        Array.prototype.forEach.call(elms, function(elm) {
            elm.style.marginLeft = "0px";
        });
    }
})();
//baidu
//display: inline !important; visibility: visible !important;
//display:block !important;visibility:visible !important; display:block !important;visibility:visible !important
if(document.URL.indexOf('www.baidu.com') >= 0){
    if(document && document.getElementsByTagName && document.getElementById && document.body){
        var a = function(){
            Array.prototype.forEach.call(document.body.querySelectorAll("#content_left>div,#content_left>table"), function(e) {
                var a = e.getAttribute("style");
                if(a && /display:(table|block)\s!important/.test(a)){
                    e.parentNode.removeChild(e)
                }
            });
        };
        a();
        var MutationObserver = window.MutationObserver ||  window.WebKitMutationObserver || window.MozMutationObserver;
        var callback = function(records) {
            records.map(function(record) {
                console.log('block baidu')
                a();
            });
        };
        var mo = new MutationObserver(callback);
        mo.observe(document.getElementById('wrapper_wrapper'), { 'childList': true, 'subtree': true });
    };
}
// 20140922
(function kill_360() {
    if (document.URL.indexOf('so.com') >= 0) {
        document.getElementById("e_idea_pp").style.display = none;
    }
})();
//解决腾讯视频列表点击无效
if(document.URL.indexOf("v.qq.com") >= 0){
    if (document.getElementById("mod_videolist")){
        var listBox = document.getElementById("mod_videolist")
        var list = listBox.getElementsByClassName("list_item")
        for (i = 0;i < list.length;i++){
            list[i].addEventListener("click", function() {
                var url = this.getElementsByTagName("a")[0]
                url = url.getAttribute("href")
                var host = window.location.href
                url = host.replace(/cover\/.*/,url)
                window.location.href = url
            })
        }
    }
}
if(document.URL.indexOf("iqiyi.com") >= 0){
    !function(){var player=document.getElementById("flash");var box=document.getElementById("flashbox");if(box!==null){var tmp=box.getAttribute("data-player-flashvars");if(tmp==null||tmp==""){box.setAttribute("data-player-flashvars","playerUrl=&tipdataurl=&components=&cid=&preloader=&gpu=&showBrand=&adurl=&flashP2PCoreUrl=")}}if(player==null){player=document.getElementById("swf_flashbox")}if(player==null){return}var divs=player.parentElement;var flashVars=document.getElementsByName("flashVars")[0];if(typeof flashVars=="undefined"){return}if(flashVars.value.indexOf('ddv')>-1){return}var params=flashVars.value.split("&");var value="";for(var i=0;i<params.length;i++){if(params[i].indexOf("adurl")==0){value+="&adurl=http://2016.adtchrome.com/am.swf"}else if(params[i].indexOf("cid")==0){value+="&cid=qc_100001_100141"}else{if(value!=""){value+="&"}value+=params[i]}}if(value.indexOf("qc_100001_100141")<1){value+="&cid=qc_100001_100141"}value+="&ddv=1";flashVars.value=value;divs.removeChild(player);divs.appendChild(player)}()
}
if (document.URL.indexOf("tv.sohu.com") >= 0){
    if (document.cookie.indexOf("fee_status=true")==-1){document.cookie='fee_status=true'};
}
`,3).$.$
        ("STYLE")._("type","text/css")(`object,embed{                -webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;                -ms-animation-duration:.001s;-ms-animation-name:playerInserted;                -o-animation-duration:.001s;-o-animation-name:playerInserted;                animation-duration:.001s;animation-name:playerInserted;}                @-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                @-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                @-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}                @keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}`,3).$.$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/arch/base/base_0e90fd8.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/arch/EventDispatcher/EventDispatcher_8702fa4.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/arch/Component/Component_e134e3c.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/arch/Model/Model_2c15502.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/arch/utils/utils_7e0dae1.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/arch/View/magic/magic_df72328.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/arch/events/keymap_6136b7f.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/arch/events/hover_f79dedf.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/arch/events/events_cddfe60.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/arch/View/View_27e228b.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/arch/ViewPool/ViewPool_e856600.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/arch/debug/debug_de1a4ea.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img1.bdstatic.com/static/common/widget/ui/arch/arch_5a1da58.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/sug/Model_28f8b55.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/sug/SugList_15bc0c2.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img2.bdstatic.com/static/common/widget/ui/sug/InputWatcher_184f8ea.js").$
        ("SCRIPT")._("type","text/javascript")._("src","//img0.bdstatic.com/static/common/widget/ui/sug/sug_d4b5c62.js").$
        ("SCRIPT")._("src","http://localhost/dest/virtual/UIHelper.0.1.js?a=0.37196462758903004").$.$
    ("STYLE")._("type","text/css")._("id","258108025061").$
    ("BODY")._("class","mar95")
        ("SCRIPT")._("type","text/javascript")(`require.siteNS && require.siteNS(["home", "common"]);require.resourceMap({"res":{"common:widget/ui/base/base.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/base/base_175b2c0.js"},"common:widget/ui/arch/router.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/router_1670dcf.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/arch/app.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/app_c1dac05.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/arch/router.js"]},"common:widget/ui/base/EventDispatcher.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/base/EventDispatcher_e71d337.js","pkg":"common:p1"},"common:widget/ui/base/events.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/base/events_f8b4e1f.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/EventDispatcher.js"]},"common:widget/ui/arch/behavior/pageresizer.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/behavior/pageresizer_9f05f70.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js"]},"common:widget/ui/arch/localdb.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/localdb_1fa8a65.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/arch/collection.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/collection_8624f21.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js","common:widget/ui/arch/localdb.js"]},"common:widget/ui/arch/handlers.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/handlers_2d9d42f.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/events/events.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/events/events_87337df.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/EventDispatcher.js"]},"common:widget/ui/utils/scroller.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/utils/scroller_efc1f29.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/events/events.js"]},"common:widget/ui/utils/pageresizer.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/utils/pageresizer_9feba52.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/events/events.js"]},"common:widget/ui/utils/utils.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/utils/utils_40e1d6c.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/utils/scroller.js","common:widget/ui/utils/pageresizer.js"]},"common:widget/ui/arch/history.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/history_dbb6541.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/utils/utils.js","common:widget/ui/base/events.js"]},"common:widget/ui/arch/model.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/arch/model_32910e4.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/arch/pagemodel.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/pagemodel_8be1499.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/utils/utils.js","common:widget/ui/base/events.js","common:widget/ui/arch/model.js"]},"common:widget/ui/base/subject.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/base/subject_7c3c6c3.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/EventEmitter/EventEmitter.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/EventEmitter/EventEmitter_655344a.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/monitorRequest/monitorRequest.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/monitorRequest/monitorRequest_cabcf84.js","pkg":"common:p1"},"common:widget/ui/searchUtils/searchUtils.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/searchUtils/searchUtils_17600ce.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/slider/slider.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/slider/slider_545c0c2.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/EventEmitter/EventEmitter.js"]},"common:widget/ui/statistic/statistic.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/statistic/statistic_09d1c4a.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/monitorRequest/monitorRequest.js","common:widget/ui/base/events.js","common:widget/ui/utils/utils.js"]},"common:widget/ui/suggest/data.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/suggest/data_a0b301f.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/utils/utils.js","common:widget/ui/base/events.js"]},"common:widget/ui/suggest/inputwatcher.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/suggest/inputwatcher_2eb7c40.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js"]},"common:widget/ui/suggest/suggestionlist.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/suggest/suggestionlist_6086aef.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js"]},"common:widget/ui/suggest/suggestion.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/suggest/suggestion_40b0526.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js","common:widget/ui/suggest/data.js","common:widget/ui/suggest/inputwatcher.js","common:widget/ui/suggest/suggestionlist.js"]},"common:widget/ui/sugHistory/sugHistory.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/sugHistory/sugHistory_c9bb280.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/statistic/statistic.js"]},"common:widget/ui/SugRec/SugRec.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/SugRec/SugRec_0f4c940.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/statistic/statistic.js"]},"common:widget/ui/swf/swf.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/swf/swf_b5294d0.js","pkg":"common:p1"},"common:widget/ui/userInfo/userInfo.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/userInfo/userInfo_b61d7bf.js","pkg":"common:p1","deps":["common:widget/ui/base/base.js","common:widget/ui/searchUtils/searchUtils.js","common:widget/ui/base/events.js","common:widget/ui/utils/utils.js"]},"common:widget/ui/loginBox/loginBox.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/loginBox/loginBox_ea459f5.js"},"common:widget/ui/arch/base/base.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/base/base_0e90fd8.js","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/arch/EventDispatcher/EventDispatcher.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/arch/EventDispatcher/EventDispatcher_8702fa4.js"},"common:widget/ui/arch/Component/Component.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/Component/Component_e134e3c.js","deps":["common:widget/ui/arch/base/base.js","common:widget/ui/arch/EventDispatcher/EventDispatcher.js"]},"common:widget/ui/arch/Model/Model.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/Model/Model_2c15502.js","deps":["common:widget/ui/arch/base/base.js","common:widget/ui/arch/Component/Component.js"]},"common:widget/ui/arch/utils/utils.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/utils/utils_7e0dae1.js"},"common:widget/ui/arch/View/magic/magic.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/View/magic/magic_df72328.js"},"common:widget/ui/arch/events/keymap.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/arch/events/keymap_6136b7f.js"},"common:widget/ui/arch/events/hover.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/events/hover_f79dedf.js","deps":["common:widget/ui/arch/base/base.js"]},"common:widget/ui/arch/events/events.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/arch/events/events_cddfe60.js","deps":["common:widget/ui/arch/events/keymap.js","common:widget/ui/arch/events/hover.js"]},"common:widget/ui/arch/View/View.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/View/View_27e228b.js","deps":["common:widget/ui/arch/base/base.js","common:widget/ui/arch/Component/Component.js","common:widget/ui/arch/Model/Model.js","common:widget/ui/arch/utils/utils.js","common:widget/ui/arch/View/magic/magic.js","common:widget/ui/arch/events/events.js"]},"common:widget/ui/arch/ViewPool/ViewPool.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/arch/ViewPool/ViewPool_e856600.js","deps":["common:widget/ui/arch/base/base.js","common:widget/ui/arch/Component/Component.js"]},"common:widget/ui/arch/debug/debug.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/debug/debug_de1a4ea.js"},"common:widget/ui/arch/arch.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/arch/arch_5a1da58.js","deps":["common:widget/ui/arch/base/base.js","common:widget/ui/arch/EventDispatcher/EventDispatcher.js","common:widget/ui/arch/Component/Component.js","common:widget/ui/arch/View/View.js","common:widget/ui/arch/Model/Model.js","common:widget/ui/arch/ViewPool/ViewPool.js","common:widget/ui/arch/debug/debug.js","common:widget/ui/arch/utils/utils.js","common:widget/ui/arch/View/magic/magic.js"]},"common:widget/ui/sug/Model.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/sug/Model_28f8b55.js","deps":["common:widget/ui/arch/arch.js","common:widget/ui/utils/utils.js"]},"common:widget/ui/sug/SugList.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/sug/SugList_15bc0c2.js","deps":["common:widget/ui/arch/arch.js"]},"common:widget/ui/sug/InputWatcher.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/sug/InputWatcher_184f8ea.js","deps":["common:widget/ui/arch/arch.js"]},"common:widget/ui/sug/sug.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/sug/sug_d4b5c62.js","deps":["common:widget/ui/arch/arch.js","common:widget/ui/sug/Model.js","common:widget/ui/sug/SugList.js","common:widget/ui/sug/InputWatcher.js"]},"home:widget/ui/statistic/statistic.js":{"url":"//img2.bdstatic.com/static/home/widget/ui/statistic/statistic_96d3637.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js","common:widget/ui/monitorRequest/monitorRequest.js","common:widget/ui/base/events.js","common:widget/ui/utils/utils.js"]},"home:widget/ui/mask/mask.js":{"url":"//img1.bdstatic.com/static/home/widget/ui/mask/mask_0433125.js","pkg":"home:p0"},"home:widget/ui/festival/newyear/newyear.js":{"url":"//img0.bdstatic.com/static/home/widget/ui/festival/newyear/newyear_098bec4.js","pkg":"home:p0","deps":["home:widget/ui/mask/mask.js"]},"home:widget/ui/festival/festival.js":{"url":"//img0.bdstatic.com/static/home/widget/ui/festival/festival_bace248.js","pkg":"home:p0","deps":["home:widget/ui/festival/newyear/newyear.js"]},"home:widget/ui/imgarea/imgarea.js":{"url":"//img0.bdstatic.com/static/home/widget/ui/imgarea/imgarea_4d59ecc.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/ui/share/share.js":{"url":"//img1.bdstatic.com/static/home/widget/ui/share/share_9f5bd57.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/ui/dot/dot.js":{"url":"//img2.bdstatic.com/static/home/widget/ui/dot/dot_8d3cf57.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/ui/skin/skin.js":{"url":"//img1.bdstatic.com/static/home/widget/ui/skin/skin_2512619.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/ui/app/app.js":{"url":"//img1.bdstatic.com/static/home/widget/ui/app/app_4b60575.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js","home:widget/ui/dot/dot.js","home:widget/ui/skin/skin.js","home:widget/ui/imgarea/imgarea.js","home:widget/ui/share/share.js","home:widget/ui/statistic/statistic.js"]},"home:widget/header/header.js":{"url":"//img1.bdstatic.com/static/home/widget/header/header_98f2f16.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/searchHomeUserinfo/searchHomeUserinfo.js":{"url":"//img0.bdstatic.com/static/home/widget/searchHomeUserinfo/searchHomeUserinfo_950a4c3.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:widget/searchBoxHome/searchBoxHome.js":{"url":"//img0.bdstatic.com/static/home/widget/searchBoxHome/searchBoxHome_015cf92.js","pkg":"home:p0","deps":["common:widget/ui/base/base.js"]},"home:static/index/index.js":{"url":"//img1.bdstatic.com/static/home/index/index_7e0bee0.js","pkg":"home:p0"},"common:widget/ui/historyRecord/historyRecord.js":{"url":"//img2.bdstatic.com/static/common/widget/ui/historyRecord/historyRecord_075d288.js","deps":["common:widget/ui/base/base.js","common:widget/ui/base/events.js"]},"common:widget/shitu/static/animate.js":{"url":"//img1.bdstatic.com/static/common/widget/shitu/static/animate_d5993fc.js","deps":["common:widget/ui/base/base.js"]},"common:widget/shitu/run.js":{"url":"//img0.bdstatic.com/static/common/widget/shitu/run_f3d6bc5.js","deps":["common:widget/ui/base/base.js","common:widget/ui/utils/utils.js","common:widget/shitu/static/animate.js"]},"common:widget/ui/sourcehttps/sourcehttps.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/sourcehttps/sourcehttps_a8b93d5.js"},"common:widget/ui/fmCheck/fmCheck.js":{"url":"//img1.bdstatic.com/static/common/widget/ui/fmCheck/fmCheck_e6197fc.js","deps":["common:widget/ui/base/base.js"]},"common:widget/ui/durationStat/durationStat.js":{"url":"//img0.bdstatic.com/static/common/widget/ui/durationStat/durationStat_d292e9f.js","deps":["common:widget/ui/utils/utils.js","common:widget/ui/base/base.js"]}},"pkg":{"common:p1":{"url":"//img0.bdstatic.com/static/common/pkg/cores_4cd3b56.js"},"home:p0":{"url":"//img0.bdstatic.com/static/home/pkg/pi_d4b989d.js"}}});`,3).$.$
        ("DIV")._("class","bd_home_wrapper")
            ("DIV")._("class","wrapper_main_box")
                ("DIV")._("class","wrapper_userinfo_box")
                    ("DIV")._("id","newUserInfo")._("class","bidu_top_user_info")
                        ("A")._("id","new-userinfo-feedback")._("class","new-userinfo-feedback")._("href","javascript:void(0)")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=%E6%94%B6%E8%97%8F%E6%9C%AC%E9%A1%B5")(`收藏本页`,3).$
                            ("SPAN")._("id","collect-menu")._("class","collect-menu")
                                ("I").$(`请按 `,3).$
                                ("SPAN")(`Ctrl+D`,3).$.$(` 收藏`,3).$.$
                            ("SPAN")._("class","collect_arrow_in")._("id","collectArrowIn").$
                            ("SPAN")._("class","collect_arrow_out")._("id","collectArrowOut").$.$(`|`,3).$
                        ("A")._("data-sargs","etc=bdindex")._("class","last_left bd_home_index")._("href","http://www.baidu.com")._("data-nsclick","tn=index&amp;event_type=top.nav.click&amp;col=%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5")(`百度首页`,3).$.$(` |`,3).$
                        ("A")._("data-sargs","etc=userinfo")._("target","_blank")._("id","username_info")._("href","http://i.baidu.com/?from=image")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=undefined")
                            ("STRONG")._("style")(`鱼骨头刺客`,3).$.$.$
                        ("DIV")._("id","username_menu")._("class","username_menu")._("style","right:0px; display:none;")
                            ("A")._("data-sargs","etc=mypic")._("target","_blank")._("href","http://image.baidu.com/albumlist/2667577344 167260639")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=%E6%88%91%E7%9A%84%E5%9B%BE%E7%89%87")
                                ("SPAN")._("class","text_on_bg")(`我的图片`,3).$.$.$
                            ("A")._("data-sargs","etc=home")._("target","_blank")._("href","http://i.baidu.com/?from=image")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83")
                                ("SPAN")._("class","text_on_bg")(`个人中心`,3).$.$.$
                            ("A")._("data-sargs","etc=passport")._("target","_blank")._("href","https://passport.baidu.com/center")
                                ("SPAN")._("class","text_on_bg")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=%E5%B8%90%E5%8F%B7%E8%AE%BE%E7%BD%AE")(`帐号设置`,3).$.$.$
                            ("A")._("data-sargs","etc=logout")._("id","passLogout")._("class","user_exit")._("href","https://passport.baidu.com/?logout&amp;u=http%3A%2F%2Fimage.baidu.com%2F")
                                ("SPAN")._("class","text_on_bg")._("data-nsclick","tn=index&amp;p=1800103&amp;event_type=top.nav.click&amp;col=%E9%80%80%E5%87%BA")(`退出`,3).$.$.$
                            ("DIV")._("class","username_arrow_in").$
                            ("DIV")._("class","username_arrow_out").$.$.$.$
                ("DIV")._("class","wrapper_skin_box")._("id","wrapper_skin_box")._("style","background-color: #000;  background-image: url(http://cdn01.baidu-img.cn/timg?image_search&amp;quality=80&amp;size=b10000_10000&amp;sec=1479692044&amp;di=9cd6fa52131a79200e229bd37cef71d2&amp;imgtype=jpg&amp;src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpcindex%2FPC1110.jpg);").$
                ("DIV")._("class","wrapper_content_box")._("id","wrapper_content_box")
                    ("DIV")._("class","wrapper_head_box")._("id","wrapper_head_box")._("style","margin-top: 100px;")
                        ("DIV")._("class","mod-header")
                            ("DIV")._("class","wapper-header")
                                ("DIV")._("class","box-top clearfix")
                                    ("DIV")._("class","home_search")
                                        ("DIV")._("class","s_nav")
                                            ("A")._("href","javascript:void(0);")._("class","s_home_logo")._("hidefocus","true")._("title")
                                                ("IMG")._("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAegAAADSCAYAAACBxlNzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBQzM0RTA5NzcxMDExRTRCRTRFQTI5QkI2QTdENjMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBQzM0RTBBNzcxMDExRTRCRTRFQTI5QkI2QTdENjMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEFDMzRFMDc3NzEwMTFFNEJFNEVBMjlCQjZBN0Q2MzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEFDMzRFMDg3NzEwMTFFNEJFNEVBMjlCQjZBN0Q2MzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6wMmE1AAAwCklEQVR42u2dB3xU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").$.$.$
                                        ("DIV")._("id","search")
                                            ("FORM")._("id","homeSearchForm")._("action","/search/index")._("name","f1")._("onsubmit","return f_submit(this,true)")._("style","visibility: visible;")
                                                ("INPUT")._("type","hidden")._("name","tn")._("value","baiduimage").$
                                                ("INPUT")._("type","hidden")._("name","ipn")._("value","r").$
                                                ("INPUT")._("name","ct")._("type","hidden")._("value","201326592").$
                                                ("INPUT")._("name","cl")._("type","hidden")._("value","2").$
                                                ("INPUT")._("name","lm")._("type","hidden")._("value","-1").$
                                                ("INPUT")._("name","st")._("type","hidden")._("value","-1").$
                                                ("INPUT")._("name","fm")._("type","hidden")._("value","index").$
                                                ("INPUT")._("name","fr")._("type","hidden")._("value").$
                                                ("INPUT")._("name","hs")._("type","hidden")._("value","3").$
                                                ("INPUT")._("name","sf")._("type","hidden")._("value","1").$
                                                ("INPUT")._("name","fmq")._("type","hidden")._("value").$
                                                ("INPUT")._("name","pv")._("type","hidden")._("value").$
                                                ("INPUT")._("name","ic")._("type","hidden")._("value","0").$
                                                ("INPUT")._("name","nc")._("type","hidden")._("value","1").$
                                                ("INPUT")._("name","z")._("type","hidden")._("value").$
                                                ("INPUT")._("name","se")._("type","hidden")._("value").$
                                                ("INPUT")._("name","showtab")._("type","hidden")._("value","0").$
                                                ("INPUT")._("name","fb")._("type","hidden")._("value","0").$
                                                ("INPUT")._("name","width")._("type","hidden")._("value").$
                                                ("INPUT")._("name","height")._("type","hidden")._("value").$
                                                ("INPUT")._("name","face")._("type","hidden")._("value","0").$
                                                ("INPUT")._("name","istype")._("type","hidden")._("value","2").$
                                                ("INPUT")._("name","ie")._("type","hidden")._("value","utf-8").$
                                                ("SPAN")._("class","s_ipt_wr")
                                                    ("INPUT")._("id","kw")._("name","word")._("class","s_ipt")._("style","width:486px; line-height:18px;")._("value")._("autocomplete","off").$.$
                                                ("SPAN")._("class","s_btn_wr")
                                                    ("INPUT")._("type","submit")._("class","s_btn")._("onmousedown","this.className='s_btn s_btn_down'")._("onmouseout","this.className='s_btn'")._("onmouseover","this.className='s_btn s_btn_on'")._("value","百度一下").$.$.$
                                            ("DIV")._("id","stcontent")._("class","common-shitu")
                                                ("A")._("class","sttb")._("hidefocus","true")._("id","sttb")._("href","javascript:void(0)")._("style","visibility: visible;")
                                                    ("IMG")._("class","st_camera")._("src","//img1.bdstatic.com/static/common/widget/shitu/images/camera_b659d28.png")._("width","21")._("height","20").$
                                                    ("IMG")._("class","st_camera_on")._("src","//img2.bdstatic.com/static/common/widget/shitu/images/camera_on_5d123b7.png")._("width","21")._("height","20").$
                                                    ("DIV")._("class","st_tips")._("id","stTipsBox")._("style","display: none;")(`上传图片，搜索相关信息`,3).$.$
                                                    ("DIV")._("class","st_tips_arrow_in")._("id","stTipArrowIn")._("style","display: none;").$
                                                    ("DIV")._("class","st_tips_arrow_out")._("id","stTipArrowOut")._("style","display: none;").$.$
                                                ("A")._("class","sttb SugRecDisplay")._("title","点击查看热搜词")._("id","SugRecDisplay")
                                                    ("DIV")._("id","SugRecShow")
                                                        ("DIV")._("class","tips")(`想再次查看，请点击这里`,3).$.$
                                                        ("DIV")._("class","arrow").$.$.$
                                                ("DIV")._("id","stsug")._("class","stsug")._("style","display:none")
                                                    ("DIV")._("id","sthead")
                                                        ("SPAN")(`识图`,3).$.$
                                                        ("IMG")._("id","sthelp")._("width","13")._("height","13")._("src","//img2.bdstatic.com/static/common/widget/shitu/images/mark_b68ff2e.png").$.$
                                                    ("DIV")._("class","stf")
                                                        ("FORM")._("id","form2")._("target","_self")._("enctype","multipart/form-data")._("action","/pictureup/uploadshitu")._("method","post")._("name","form2")
                                                            ("A")._("id","uploadImg")._("href","javascript:void(0)")._("data-nsclick","p=1811102&amp;tn=index&amp;event_type=shitu.search.click&amp;pos=upload")(`本地上传`,3).$
                                                                ("INPUT")._("type","file")._("name","image")._("id","stfile")._("size","2").$.$
                                                            ("DIV")._("class","st_dragtg")._("id","dragtg")._("style","display:none;")(`提示：您也可以把图片拖到这里`,3).$.$
                                                            ("INPUT")._("id","shitu2")._("name","pos")._("value")._("type","hidden").$
                                                            ("INPUT")._("name","uptype")._("value","upload_pc")._("type","hidden").$
                                                            ("INPUT")._("name","fm")._("value","index")._("type","hidden").$.$
                                                        ("FORM")._("id","form1")._("target","_self")._("enctype","multipart/form-data")._("action","/pictureup/uploadshitu")._("method","get")._("name","form1")
                                                            ("DIV")._("id","sturl")
                                                                ("SPAN")._("class","stuwr")
                                                                    ("INPUT")._("type","text")._("id","stuurl")._("placeholder","在此处粘贴图片网址")._("value")._("autocomplete","off")._("class","stuurl")._("name","objurl").$.$
                                                                ("SPAN")._("class","stsb")
                                                                    ("INPUT")._("type","submit")._("id","sbobj")._("class","stsb2")._("onmousedown","this.className='stsb2 stsb3'")._("onmouseout","this.className='stsb2'")._("onmouseover","this.className='stsb2 stsb4'")._("value","识图一下").$.$.$
                                                            ("INPUT")._("name","filename")._("id","filename")._("value")._("type","hidden").$
                                                            ("INPUT")._("name","rt")._("value","0")._("type","hidden").$
                                                            ("INPUT")._("name","rn")._("value","10")._("type","hidden").$
                                                            ("INPUT")._("id","stftn")._("name","ftn")._("value","wantu")._("type","hidden").$
                                                            ("INPUT")._("name","ct")._("value","1")._("type","hidden").$
                                                            ("INPUT")._("name","stt")._("value","0")._("type","hidden").$
                                                            ("INPUT")._("name","tn")._("value","shituresultpc")._("type","hidden").$
                                                            ("INPUT")._("id","shitu1")._("name","uptype")._("value","paste")._("type","hidden").$
                                                            ("INPUT")._("name","fm")._("value","index")._("type","hidden").$.$.$
                                                    ("DIV")._("class","drag-text-tip")(`拖拽图片到此处试试`,3).$.$
                                                    ("DIV")._("id","stmore")._("style","display:none;")
                                                        ("DIV")._("class","stmore-header")(`百度识图`,3).$.$
                                                        ("UL")
                                                            ("LI")(`识别人物、搜索服饰、寻找高清素材、浏览相似美图，尽在百度识图!`,3).$.$.$
                                                        ("DIV")._("class","stmore_arrow_in").$
                                                        ("DIV")._("class","stmore_arrow_out").$.$
                                                    ("A")._("id","closest")._("href","javascript:void(0);")._("title","关闭").$
                                                    ("DIV")._("id","point")._("style","display:none;")
                                                        ("IMG")._("src","//img1.bdstatic.com/img/image/shitu/feimg/uploading.gif").$
                                                        ("SPAN")(`正在识别中，请稍候...`,3).$.$
                                                        ("A")._("id","cancelst")._("href","javascript:void(0);")._("title","取消").$.$
                                                    ("DIV")._("id","dragtip")._("style","display:none;")
                                                        ("SPAN")(`请拖拽图片到此处`,3).$.$
                                                        ("DIV")._("class","drag_dot_area drag_dot_left_top").$
                                                        ("DIV")._("class","drag_dot_area drag_dot_left_bottom").$
                                                        ("DIV")._("class","drag_dot_area drag_dot_right_top").$
                                                        ("DIV")._("class","drag_dot_area drag_dot_right_bottom").$
                                                        ("A")._("id","cancelst")._("href","javascript:void(0);")._("title","取消").$.$
                                                    ("DIV")._("class","left-border").$
                                                    ("DIV")._("class","right-border").$.$
                                                ("DIV")._("id","mock-stsug").$.$.$.$.$.$.$.$
                    ("DIV")._("class","wrapper_detail_box")
                        ("DIV")._("class","img_area_container_box")._("act-id")
                            ("DIV")._("class","img_area_inner")
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;fm=detail&amp;lm=-1&amp;st=-1&amp;sf=2&amp;fmq=1470223098862_R_D&amp;fm=detail&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E5%94%AF%E7%BE%8E%E6%91%84%E5%BD%B1")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E5%94%AF%E7%BE%8E%E6%91%84%E5%BD%B1&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`唯美摄影`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(32,41,50, 0) 0, rgba(32,41,50, 1) 100%); background-image: -moz-linear-gradient(rgba(32,41,50, 0) 0, rgba(32,41,50, 1) 100%); background-image: -o-linear-gradient(rgba(32,41,50, 0) 0, rgba(32,41,50, 1) 100%); background-image: -ms-linear-gradient(rgba(32,41,50, 0) 0, rgba(32,41,50, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #8fa3a7")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/weimei1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ps=1&amp;ct=201326592&amp;lm=-1&amp;cl=2&amp;nc=1&amp;ie=utf-8&amp;word=%E5%AE%A0%E7%89%A9")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E5%AE%A0%E7%89%A9&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`宠物`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(114,86,65, 0) 0, rgba(114,86,65, 1) 100%); background-image: -moz-linear-gradient(rgba(114,86,65, 0) 0, rgba(114,86,65, 1) 100%); background-image: -o-linear-gradient(rgba(114,86,65, 0) 0, rgba(114,86,65, 1) 100%); background-image: -ms-linear-gradient(rgba(114,86,65, 0) 0, rgba(114,86,65, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #b6adad")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/chongwu1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ps=1&amp;ct=201326592&amp;lm=-1&amp;cl=2&amp;nc=1&amp;ie=utf-8&amp;word=%E6%98%93%E7%83%8A%E5%8D%83%E7%8E%BA")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E6%98%93%E7%83%8A%E5%8D%83%E7%8E%BA&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`易烊千玺`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(100,100,100, 0) 0, rgba(100,100,100, 1) 100%); background-image: -moz-linear-gradient(rgba(100,100,100, 0) 0, rgba(100,100,100, 1) 100%); background-image: -o-linear-gradient(rgba(100,100,100, 0) 0, rgba(100,100,100, 1) 100%); background-image: -ms-linear-gradient(rgba(100,100,100, 0) 0, rgba(100,100,100, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #8fa3a7")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/mingxing1111.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=&amp;sf=1&amp;fmq=1462357247335_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E9%AB%98%E6%B8%85%E5%8A%A8%E6%BC%AB")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E9%AB%98%E6%B8%85%E5%8A%A8%E6%BC%AB&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`高清动漫`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(46,78,116, 0) 0, rgba(46,78,116, 1) 100%); background-image: -moz-linear-gradient(rgba(46,78,116, 0) 0, rgba(46,78,116, 1) 100%); background-image: -o-linear-gradient(rgba(46,78,116, 0) 0, rgba(46,78,116, 1) 100%); background-image: -ms-linear-gradient(rgba(46,78,116, 0) 0, rgba(46,78,116, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #8fa3a7")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/dongman1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=&amp;sf=1&amp;fmq=1461833981476_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E5%A3%81%E7%BA%B8#z=0&amp;pn=&amp;ic=0&amp;st=-1&amp;face=0&amp;s=0&amp;lm=-1")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E5%A3%81%E7%BA%B8&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`壁纸`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(38,60,118, 0) 0, rgba(38,60,118, 1) 100%); background-image: -moz-linear-gradient(rgba(38,60,118, 0) 0, rgba(38,60,118, 1) 100%); background-image: -o-linear-gradient(rgba(38,60,118, 0) 0, rgba(38,60,118, 1) 100%); background-image: -ms-linear-gradient(rgba(38,60,118, 0) 0, rgba(38,60,118, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #b6adad")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/bizhi1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=&amp;sf=1&amp;fmq=1461834053046_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;itg=0&amp;ie=utf-8&amp;word=%E5%A4%B4%E5%83%8F#z=0&amp;pn=&amp;ic=0&amp;st=-1&amp;face=0&amp;s=0&amp;lm=-1")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E5%A4%B4%E5%83%8F&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`头像`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(105,115,93, 0) 0, rgba(105,115,93, 1) 100%); background-image: -moz-linear-gradient(rgba(105,115,93, 0) 0, rgba(105,115,93, 1) 100%); background-image: -o-linear-gradient(rgba(105,115,93, 0) 0, rgba(105,115,93, 1) 100%); background-image: -ms-linear-gradient(rgba(105,115,93, 0) 0, rgba(105,115,93, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #bdaba9")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/touxiang1110.jpeg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fr=&amp;sf=1&amp;fmq=1459502303089_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E9%A3%8E%E6%99%AF")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E9%A3%8E%E6%99%AF&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`风景`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(170,132,99, 0) 0, rgba(170,132,99, 1) 100%); background-image: -moz-linear-gradient(rgba(170,132,99, 0) 0, rgba(170,132,99, 1) 100%); background-image: -o-linear-gradient(rgba(170,132,99, 0) 0, rgba(170,132,99, 1) 100%); background-image: -ms-linear-gradient(rgba(170,132,99, 0) 0, rgba(170,132,99, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #a3a6b9")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/fengjing1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fr=&amp;sf=1&amp;fmq=1459502282690_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E5%B0%8F%E6%B8%85%E6%96%B0")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E5%B0%8F%E6%B8%85%E6%96%B0&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`小清新`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(167,169,169, 0) 0, rgba(167,169,169, 1) 100%); background-image: -moz-linear-gradient(rgba(167,169,169, 0) 0, rgba(167,169,169, 1) 100%); background-image: -o-linear-gradient(rgba(167,169,169, 0) 0, rgba(167,169,169, 1) 100%); background-image: -ms-linear-gradient(rgba(167,169,169, 0) 0, rgba(167,169,169, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #af9ab2")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/xiaoqingxin1110.jpeg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=&amp;sf=1&amp;fmq=1461834534864_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E6%98%9F%E7%A9%BA")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=%E6%98%9F%E7%A9%BA&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`星空`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(34,24,27, 0) 0, rgba(34,24,27, 1) 100%); background-image: -moz-linear-gradient(rgba(34,24,27, 0) 0, rgba(34,24,27, 1) 100%); background-image: -o-linear-gradient(rgba(34,24,27, 0) 0, rgba(34,24,27, 1) 100%); background-image: -ms-linear-gradient(rgba(34,24,27, 0) 0, rgba(34,24,27, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #8fa3a7")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/xingkong1110.jpg")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$
                                ("DIV")._("class","img_single_box")
                                    ("A")._("class","img_link_layer")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=&amp;sf=1&amp;fmq=1455438329672_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=PPT%E6%A8%A1%E6%9D%BF")._("target","_blank")._("data-nsclick","event_type=column.click&amp;col=PPT%E6%A8%A1%E6%9D%BF&amp;p=1800101&amp;tn=index")
                                        ("DIV")._("class","img_instr_layer")(`PPT模板`,3).$.$
                                        ("DIV")._("class","img_mask_layer")._("style","background-image: -webkit-linear-gradient(rgba(76,50,85, 0) 0, rgba(76,50,85, 1) 100%); background-image: -moz-linear-gradient(rgba(76,50,85, 0) 0, rgba(76,50,85, 1) 100%); background-image: -o-linear-gradient(rgba(76,50,85, 0) 0, rgba(76,50,85, 1) 100%); background-image: -ms-linear-gradient(rgba(76,50,85, 0) 0, rgba(76,50,85, 1) 100%);").$
                                        ("DIV")._("class","img_cover_layer").$
                                        ("DIV")._("class","img_pic_wrap_layer")._("style","background-color: #b6adad")
                                            ("IMG")._("src","http://img6.bdstatic.com/img/image/smallpic/PPT1110.JPG")._("class","img_pic_layer horizontal")._("onload","window.speed.loadmark();").$.$.$.$.$.$
                        ("DIV")._("class","img_area_background_box").$.$
                    ("DIV")._("class","wrapper_footer_box")
                        ("DIV")._("class","mod-footer clearfix")._("id","bdPageFooterModBox")
                            ("SCRIPT")._("type","text/javascript")(`var _h_set_home_page=function(e,t){try{e.style.behavior="url(#default#homepage)",e.setHomePage(t)}catch(a){window.location.href="http://www.baidu.com/cache/sethelp/index.html"}};`,3).$.$
                            ("DIV")._("id","ft")(`©2016&nbsp;Baidu&nbsp;`,3).$
                                ("A")._("href","http://www.baidu.com/duty/")(`使用百度前必读`,3).$.$(`&nbsp;|&nbsp;`,3).$
                                ("A")._("href","http://image.baidu.com/static/html/advanced.html")(`高级搜索`,3).$.$(`&nbsp;|&nbsp;`,3).$
                                ("A")._("href","http://www.baidu.com/search/image_help.html")(`帮助`,3).$.$.$.$.$
                    ("DIV")._("class","wrapper_share_site_box")
                        ("DIV")._("class","lookme")
                            ("IMG")._("style","display:none;")._("src","##").$.$
                        ("DIV")._("class","share_kinds_site")
                            ("A")._("href","javascript:;")._("class","share_to_weibo share_to_site")._("act-type","weibo")._("data-nsclick","event_type=share.btn.click&amp;p=1800102&amp;tn=index&amp;col=weibo").$
                            ("A")._("href","javascript:;")._("class","share_to_qqzone share_to_site")._("act-type","qqzone")._("data-nsclick","event_type=share.btn.click&amp;p=1800102&amp;col=qqzone&amp;tn=index").$
                            ("A")._("href","javascript:;")._("class","share_to_renren share_to_site")._("act-type","renren")._("data-nsclick","event_type=share.btn.click&amp;p=1800102&amp;col=renren&amp;tn=index").$
                            ("A")._("href","javascript:;")._("class","share_to_douban share_to_site")._("act-type","douban")._("data-nsclick","event_type=share.btn.click&amp;p=1800102&amp;col=douban&amp;tn=index").$
                            ("SPAN")._("class","split").$.$.$
                    ("DIV")._("class","wrapper_imgfrom_box")._("id","wrapperImgFromBox")(`背景图片来源：`,3).$
                        ("A")._("data-nsclick","event_type=buttomclick&amp;url=http%3A%2F%2Fwww.quanjing.com%2F&amp;pos=backfrom&amp;p=index&amp;_dev=pc&amp;ref=index")._("href","http://www.quanjing.com/")._("target","_blank")._("class","skin_from_link")(`全景网`,3).$.$.$.$
                ("DIV")._("class","wrapper_dot_box dot_white")._("data-width","40")._("data-height","39")._("style","left: 17%; top: 22%; display: block;")
                    ("DIV")._("class","dot_left_top").$
                    ("DIV")._("class","dot_left_bottom").$
                    ("DIV")._("class","dot_right_top").$
                    ("DIV")._("class","dot_right_bottom").$
                    ("DIV")._("class","dot_center_circle").$
                    ("DIV")._("class","dot_center_info")
                        ("A")._("class","dot_info_link")._("hidefocus","true")._("href","http://image.baidu.com/search/index?ct=201326592&amp;cl=2&amp;st=-1&amp;lm=-1&amp;nc=1&amp;ie=utf-8&amp;tn=baiduimage&amp;ipn=r&amp;rps=1&amp;pv=&amp;fm=rs1&amp;word=%E6%9D%AD%E5%B7%9E%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%20%E5%A3%81%E7%BA%B8&amp;oriquery=%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%E5%A3%81%E7%BA%B8&amp;ofr=%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%E5%A3%81%E7%BA%B8")._("target","_blank")._("data-nsclick","p=1800105&amp;tn=index&amp;event_type=shitu.click")._("style","color: rgb(3, 3, 3);")(`西湖，位于浙江省杭州市西面，是中国大陆主要的观赏性淡水湖泊之一，也是现今《世界遗产名录》中少数几个和中国唯一一个湖泊类文化遗产。`,3).$.$.$.$.$.$
        ("SCRIPT")(`
    void function(e,t){for(var n=t.getElementsByTagName("img"),a=+new Date,i=[],o=function(){this.removeEventListener&&this.removeEventListener("load",o,!1),i.push({img:this,time:+new Date})},s=0;s< n.length;s++)!function(){var e=n[s];e.addEventListener?!e.complete&&e.addEventListener("load",o,!1):e.attachEvent&&e.attachEvent("onreadystatechange",function(){"complete"==e.readyState&&o.call(e,o)})}();alog("speed.set",{fsItems:i,fs:a})}(window,document);
`,3).$.$
        ("SCRIPT")(`!function(){function e(){speed.firstScCount>=10?speed.send():setTimeout(e,500)}var n="";n=1==n?"-title":3==n?"-more":"",document.addEventListener&&document.addEventListener("DOMContentLoaded",function(){var e=0,n=0,t=speed.get("start");if(window.performance&&(e=window.performance.timing.navigationStart),e&&speed.mark("net",t-e),speed.mark("preloaded",n),speed.mark("domc"),window.performance&&window.performance.timing){var d=window.performance.timing;speed.mark("dnst",d.domainLookupEnd-d.domainLookupStart),speed.mark("cot",d.connectEnd-d.connectStart),speed.mark("rpnt",d.responseStart),e&&(speed.mark("tct",d.navigationStart-e),speed.mark("nets",e)),speed.mark("connectStart",d.connectStart)}},!1),window.addEventListener&&window.addEventListener("load",function(){speed.mark("load"),e()},!1)}();`,3).$.$
        ("SCRIPT")(`
    void function(e,t){for(var n=t.getElementsByTagName("img"),a=+new Date,i=[],o=function(){this.removeEventListener&&this.removeEventListener("load",o,!1),i.push({img:this,time:+new Date})},s=0;s< n.length;s++)!function(){var e=n[s];e.addEventListener?!e.complete&&e.addEventListener("load",o,!1):e.attachEvent&&e.attachEvent("onreadystatechange",function(){"complete"==e.readyState&&o.call(e,o)})}();alog("speed.set",{fsItems:i,fs:a})}(window,document);
`,3).$.$
        ("SCRIPT")(`
    window.skinData = {"src":"http:\/\/cdn01.baidu-img.cn\/timg?image_search&quality=80&size=b10000_10000&sec=1479692044&di=9cd6fa52131a79200e229bd37cef71d2&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpcindex%2FPC1110.jpg","bgColor":"#000","from":{"url":"http:\/\/www.quanjing.com\/","title":"\u80cc\u666f\u56fe\u7247\u6765\u6e90\uff1a","name":"\u5168\u666f\u7f51"},"endtime":"2016-11-16 07:00:00","dot":{"url":"http:\/\/image.baidu.com\/search\/index?ct=201326592&cl=2&st=-1&lm=-1&nc=1&ie=utf-8&tn=baiduimage&ipn=r&rps=1&pv=&fm=rs1&word=%E6%9D%AD%E5%B7%9E%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%20%E5%A3%81%E7%BA%B8&oriquery=%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%E5%A3%81%E7%BA%B8&ofr=%E8%A5%BF%E6%B9%96%E7%BE%8E%E6%99%AF%E5%A3%81%E7%BA%B8","desc":"\u897f\u6e56\uff0c\u4f4d\u4e8e\u6d59\u6c5f\u7701\u676d\u5dde\u5e02\u897f\u9762\uff0c\u662f\u4e2d\u56fd\u5927\u9646\u4e3b\u8981\u7684\u89c2\u8d4f\u6027\u6de1\u6c34\u6e56\u6cca\u4e4b\u4e00\uff0c\u4e5f\u662f\u73b0\u4eca\u300a\u4e16\u754c\u9057\u4ea7\u540d\u5f55\u300b\u4e2d\u5c11\u6570\u51e0\u4e2a\u548c\u4e2d\u56fd\u552f\u4e00\u4e00\u4e2a\u6e56\u6cca\u7c7b\u6587\u5316\u9057\u4ea7\u3002","left":"17%","top":"22%","style":0,"fcolor":"#030303"},"share":{"title":"\u767e\u5ea6\u56fe\u7247","content":"#\u767e\u5ea6\u56fe\u7247\u9ad8\u6e05\u7f8e\u56fe# \u897f\u6e56\uff0c\u4f4d\u4e8e\u6d59\u6c5f\u7701\u676d\u5dde\u5e02\u897f\u9762\uff0c\u662f\u4e2d\u56fd\u5927\u9646\u4e3b\u8981\u7684\u89c2\u8d4f\u6027\u6de1\u6c34\u6e56\u6cca\u4e4b\u4e00\uff0c\u4e5f\u662f\u73b0\u4eca\u300a\u4e16\u754c\u9057\u4ea7\u540d\u5f55\u300b\u4e2d\u5c11\u6570\u51e0\u4e2a\u548c\u4e2d\u56fd\u552f\u4e00\u4e00\u4e2a\u6e56\u6cca\u7c7b\u6587\u5316\u9057\u4ea7\u3002\uff08\u5206\u4eab\u81ea@\u767e\u5ea6\u56fe\u7247\uff09","picSrc":"http:\/\/img6.bdstatic.com\/img\/image\/pcindex\/PC1110-2.jpg","fromUrl":"http:\/\/image.baidu.com"},"IE":false};
    window.nowServerTime="2016-11-14 09:34:04";
    var resizeTagCon = function(){
        var mainBox = doc.getElementById('#wrapper_content_box');
        var headBox = doc.getElementById('#wrapper_head_box');
        var maxHeight = 820;
        var minHeight = 655;
        var maxPathLength = 100;
        var bodyWidth;
        //设置总的宽度
        var doc = document,
            client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
        var winHeight = client.clientHeight;
        var currWinHeight = winHeight;
        // if (winHeight >= minHeight) {
        //    document.body.className ="mar95";
        //    mainBox.removeClass('wrapper_con_ret');
        // } else {
        //    document.body.className = "mar75";
        //    mainBox.addClass('wrapper_con_ret');
        // }

        // if(currWinHeight >= maxHeight){
        //    headBox.css('margin-top',100+'px');
        // }else if (currWinHeight < maxHeight && currWinHeight > minHeight) {
        //    setBoxMartop(currWinHeight,minHeight);
        // }else if (currWinHeight <= minHeight) {
        //    setBoxMar(0);
        // }
    };
    window.SAMPLEKEY = '';
    try {
        var sampleValue = {"UI_YUNYING_11":"0","UI_YUNYING_13":"1","UI_YUNYING_21":"0","UI_YUNYING_31":"2","UI_WISE_RES_SPEED":"0","UI_PC_RESULT_FCADPIC":"1","UI_PC_XIANGUI_MID_IMAGE":"0","UI_WISE_PEITU_QUERY":"1","UI_WISE_REWRITE":"0","UI_WISE_TEXT_Q":"0","UI_WISE_CHUNHUA_FLOW":"0","UI_PC_RIGHT_AD":"0","PC_WISE_ALL":"0","UI_WISE_HOMEPAGE_FEED":"1","UI_HTTPS_INDEX_PC":"3"};
        for (o in sampleValue) {
            SAMPLEKEY += o + ':';
            SAMPLEKEY += sampleValue[o] + ',';
        }
    } catch (e) {}
    window.indexHistorySugSample = null;
`,3).$.$
        ("SCRIPT")(`
    void function(a,b,c,d,e,f){function g(b){a.attachEvent?a.attachEvent("onload",b,!1):a.addEventListener&&a.addEventListener("load",b)}function h(a,c,d){d=d||15;var e=new Date;e.setTime((new Date).getTime()+1e3*d),b.cookie=a+"="+escape(c)+";path=/;expires="+e.toGMTString()}function i(a){var c=b.cookie.match(new RegExp("(^| )"+a+"=([^;]*)(;|$)"));return null!=c?unescape(c[2]):null}function j(){var a=i("PMS_JT");if(a){h("PMS_JT","",-1);try{a=a.match(/{["']s["']:(\d+),["']r["']:["']([\s\S]+)["']}/),a=a&&a[1]&&a[2]?{s:parseInt(a[1]),r:a[2]}:{}}catch(c){a={}}a.r&&b.referrer.replace(/#.*/,"")!=a.r||alog("speed.set","wt",a.s)}}if(a.alogObjectConfig){var k=a.alogObjectConfig.sample,l=a.alogObjectConfig.rand;if("https:"===a.location.protocol){if(d="https://gss2.bdstatic.com/70cFsjip0QIZ8tyhnq"+d,!k||!l)return}else d="http://img.baidu.com"+d;k&&l&&l>k||(g(function(){alog("speed.set","lt",+new Date),e=b.createElement(c),e.async=!0,e.src=d+"?v="+~(new Date/864e5),f=b.getElementsByTagName(c)[0],f.parentNode.insertBefore(e,f)}),j())}}(window,document,"script","/hunter/alog/dp.min.js");
`,3).$.$
        ("SCRIPT")._("type","text/javascript")(`!function(){!function(){require.async(["home:widget/searchHomeUserinfo/searchHomeUserinfo"],function(e){e.ini()})}();}();
!function(){require.async(["common:widget/ui/base/base","common:widget/ui/utils/utils","common:widget/ui/historyRecord/historyRecord"],function(e,t,i){window.f_submit=function(t,o){var a=t.word.value;if(e.trim(a).length>0){var n=new i({historyKey:"indexPageSugList"});n.setRecord(a),e.cookie.set("cleanHistoryStatus",0,{path:"/"})}var s=/^http[s]*\:\/\/[\s\S]*\.[jpg|gif|png|bmp|jpeg]*$/.test(a)||/img5\.imgtn\.bdimg\.com/.test(a)||/mt1\.baidu\.com\/timg/.test(a),u="http://image.baidu.com/n/pc_search?queryImageUrl="+encodeURIComponent(a)+"&fm=index&uptype=urlsearch";if(s)return e.cookie("uploadTime",(new Date).getTime(),{path:"/"}),location.href=u,!1;t.tn.value="baiduimage",t.ct.value="201326592",t.cl.value="2",t.lm.value="-1",t.pv.value="";var c="3";return"2"===c?t.action="https://"+location.host+"/search/index":!~location.protocol.indexOf("https")||"3"!==c&&"4"!==c||(t.hs.value="1"+c),o===!0&&(t.se.value="1"),!0}});}();
!function(){    window.tn = 'index';
    if (window.tn === 'index') {
        var sttb = document.getElementById('sttb');
        sttb.removeAttribute('title');
    }
    /**
     * 统计代码
    **/
    window.ss = function(){
        var URL = '//imgstat.baidu.com/9.gif?rainbow=1&';
        function request(url){
            var seed = Math.random();
            var img = window[seed] = new Image;
            img.onload = img.onerror = function(){
                window[seed] = null;
                img.onload = img.onerror = null;
                img = null;
            };
            img.src = url;
        }

        /* p = 0, 首页八张demo图片点击统计
         * p = 1, 结果页tab相关： name=stu相同tab显示；name=face 人脸搜索tab显示; type=show展现；type=click点击
         * p = pv, 结果页PV统计：data=1，有结果；data=0无结果；data=-1，down页面
         **/

        return function(arg, url, e){
            var s = URL + json2Query(arg) + '&' + Math.random();
            request(s);
            if(url){
                setTimeout(function(){
                    location.href = url;
                }, 300);
                e = e || window.event;
                if(e){
                    if(e.preventDefault){
                        e.preventDefault();
                    }else{
                        e.returnValue = false;
                    }
                }

            }
        };

    }();
    window.__originTitle = document.title;
    function json2Query(json){
        if(json == null || typeof json != 'object') return json;
        var query = [];
        for(var i in json){
            if(i != '')
                query[query.length] = i + '=' + json[i];
        }
        return query.join('&');
    }
    /**
     * flash初始化完成
     */
    function flashInitCallback(){
        setTimeout(function(){
            document.title = window.__originTitle;
        }, 1000);

        window.useFlashUp = true;
    };
    /**
     * 选择好文件通知flash上线
     */
    function notiUpload(){
        // speed
        $.cookie('uploadTime', new Date().getTime(), {path: '/'});

        var logStr = "p=index&event_type=shitu.upload.click&pos=fileupload";
        //nsclick.stat(logStr);
        if (window.tn === 'index') {
            p && p(null, 1811102, {'p':1811102,"pos":"fileupload","fm":"searchIndex",tn:"index"});
        } else if (window.tn === 'result') {
            p && p(null, 1111102, {"pos":"fileupload","fm":"searchresult"});
        } else if (window.tn === 'detail') {
            statistic && statistic.send('5.1011102',{pos:'drag',fm:'searchdetail'});
        }
        document.title = window.__originTitle;
        stInstance.showLoading();
    }
    /**
     * 整个上传是否成功
     */
    function returnState(boo,result){
        document.title = window.__originTitle;
        if(!boo){
            stInstance.hideLoading();
            alert("对不起，上传失败，请重新上传.");
            return false;
        }else if(boo){
            if (window.tn === 'index') {
                window.ss&&window.ss({type:'searchNum',p:'uploadSearch',form:'wantu',flash:'1'});
            } else if (window.tn === 'result') {
                window.ss&&window.ss({type:'searchNum',p:'uploadSearch',form:'searchresult',flash:'1'});
            } else if (window.tn === 'detail') {
                window.ss&&window.ss({type:'searchNum',p:'uploadSearch',form:'searchDetail',flash:'1'});
            }
            window.location.href=result;
        };
    }

    /*用户关闭flash文件选择框*/
    function filePickerEnd(){
        document.title = window.__originTitle;
    }
    window.returnState = returnState;
    window.flashInitCallback = flashInitCallback;
    window.notiUpload = notiUpload;
    window.filePickerEnd = filePickerEnd;
require.async(["common:widget/ui/base/base","common:widget/shitu/run"],function($, shitu){
    window.$ = $;
    $(document).ready(function() {
        var st = new shitu();
        st.init();
        window.stInstance = st;
        /*var flashCon = document.getElementById('flashcontent');
        if(((parseInt($.flash.version.string, 10) || 0) < 10) || !flashCon){
            flashCon.style.display = 'none';
        }else{
            try{
                $('#flashcontent').flash({
                    id: "STUUpload",
                    swf: "http://img.baidu.com/img/image/stu/STUpload2.swf?v=0108",
                    width: "103",
                    height: "28",
                    align: "top",
                    wmode: "transparent",
                    allowscriptaccess: "always",
                    errorMessage: "载入FLASH出错",
                    flashvars: {
                        uploadurl:"/pictureup/uploadshitu?fr=flash&fm=index&pos=upload",
                        logurl:"//imgstat.baidu.com/9.gif?rainbow=1&type=searchNum&p=uploadSearch&form=wantu&flash=1&t=",
                        compress:"1"
                    },
                    hasVersion: "10.1.0"
                });
            }catch(e){
                flashCon.style.display = 'none';
            }

        } */
    });
});
}();
!function(){require.async(["home:widget/searchBoxHome/searchBoxHome"],function(e){e.init()});}();
!function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
   require.async(['common:widget/ui/SugRec/SugRec'], function (SugRec) {
        var hotWords = [{"query":"\u6821\u957f\u89c1\u8bc1\u60c5\u4fa3\u8868\u767d","flag":"\u6821\u957f\u89c1\u8bc1\u60c5\u4fa3\u8868\u767d","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u6821\u957f\u89c1\u8bc1\u60c5\u4fa3\u8868\u767d","hot":0,"fromurl":null,"photos":[]},{"query":"\u843d\u4e95\u7537\u7ae5\u9057\u4f53\u627e\u5230","flag":"\u843d\u4e95\u7537\u7ae5\u9057\u4f53\u627e\u5230","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u843d\u4e95\u7537\u7ae5\u9057\u4f53\u627e\u5230","hot":0,"fromurl":null,"photos":[]},{"query":"\u6210\u90fd\u808c\u8089\u7237\u7237\u88f8\u7ec3","flag":"\u6210\u90fd\u808c\u8089\u7237\u7237\u88f8\u7ec3","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u6210\u90fd\u808c\u8089\u7237\u7237\u88f8\u7ec3","hot":0,"fromurl":null,"photos":[]},{"query":"\u7855\u58eb\u751f\u6551\u843d\u6c34\u5c11\u5e74","flag":"\u7855\u58eb\u751f\u6551\u843d\u6c34\u5c11\u5e74","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u7855\u58eb\u751f\u6551\u843d\u6c34\u5c11\u5e74","hot":0,"fromurl":null,"photos":[]},{"query":"\u795e\u79d8\u5546\u5b66\u9662\u6d89\u4f20\u9500","flag":"\u795e\u79d8\u5546\u5b66\u9662\u6d89\u4f20\u9500","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u795e\u79d8\u5546\u5b66\u9662\u6d89\u4f20\u9500","hot":0,"fromurl":null,"photos":[]},{"query":"\u8d27\u8f66\u4fa7\u7ffb\u871c\u6854\u906d\u54c4\u62a2","flag":"\u8d27\u8f66\u4fa7\u7ffb\u871c\u6854\u906d\u54c4\u62a2","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u8d27\u8f66\u4fa7\u7ffb\u871c\u6854\u906d\u54c4\u62a2","hot":0,"fromurl":null,"photos":[]},{"query":"\u5929\u6d25\u6e2f\u7206\u70b8\u6848\u5ba3\u5224","flag":"\u5929\u6d25\u6e2f\u7206\u70b8\u6848\u5ba3\u5224","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u5929\u6d25\u6e2f\u7206\u70b8\u6848\u5ba3\u5224","hot":0,"fromurl":null,"photos":[]},{"query":"\u4e24\u540c\u5b66\u88f9\u88ab\u53bb\u4e0a\u8bfe","flag":"\u4e24\u540c\u5b66\u88f9\u88ab\u53bb\u4e0a\u8bfe","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u4e24\u540c\u5b66\u88f9\u88ab\u53bb\u4e0a\u8bfe","hot":0,"fromurl":null,"photos":[]},{"query":"\u6d1b\u9633\u53d1\u73b0\u66f9\u9b4f\u5893\u846c","flag":"\u6d1b\u9633\u53d1\u73b0\u66f9\u9b4f\u5893\u846c","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u6d1b\u9633\u53d1\u73b0\u66f9\u9b4f\u5893\u846c","hot":0,"fromurl":null,"photos":[]},{"query":"\u5e93\u91cc13\u4e2a3\u5206\u7834\u7eaa\u5f55","flag":"\u5e93\u91cc13\u4e2a3\u5206\u7834\u7eaa\u5f55","url":"http:\/\/image.baidu.com\/search\/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=sugrec&sf=1&fmq=1452955267929_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=\u5e93\u91cc13\u4e2a3\u5206\u7834\u7eaa\u5f55","hot":0,"fromurl":null,"photos":[]}];
        var sugRec = new SugRec({width: 534, offsetL: 12, offsetT: 8, page: 1811104, query: '', samplekey: window.SAMPLEKEY});
        sugRec.init(hotWords);
    });
}();
!function(){}();
!function(){    require.async(['common:widget/ui/monitorRequest/monitorRequest'],function(monitorRequest){
	var userid = "";
	var q = "";
	var tn = "index";
	var host = "//imgstat.baidu.com/4.gif";
	var hostSweb = "//image.baidu.com/pv/pv2.gif";
    var rsw = "";
    if(location.href !== document.referrer && document.referrer != ""){
        rsw = "&rs=";
    }
    else{
        rsw = '';
    }
    var samplekey = window.samplekey || '';
    var img = window["__log__" + (new Date()).getTime()*Math.random()] = document.createElement('img');
    monitorRequest( host + "?logid=10911226214485378975&ie=utf-8&q="+ q +"&userid=" + userid + "&samplekey=" + encodeURIComponent(samplekey) + "&event_type=pv&tn=" + tn + "&tpl=index.page&fr=" + rsw);
    var imgSweb = window["__log__" + (new Date()).getTime()*Math.random()] = document.createElement('img');
    imgSweb.src = hostSweb + "?ie=utf-8&q="+ q +"&userid=" + userid + "&samplekey=" + encodeURIComponent(samplekey) + "&event_type=pv&tn=" + tn + "&tpl=&fr=" + rsw + '&' + new Date() * Math.random();
    });
}();
!function(){    require.async(["common:widget/ui/fmCheck/fmCheck"],function(fmCheck){
        fmCheck.init();
    });
}();
!function(){require.async(['common:widget/ui/base/base'], function($) {
    var userFrom = '';

    var elem = document.createElement('a');
    elem.href = document.referrer;
    var hostname = elem['hostname'];
    var urlfr = '';
    var chenjin = '';
    var urlword = '';

    if (hostname !== 'image.baidu.com') {
        if (urlfr) {
            userFrom += urlfr;
            if (chenjin === '1') {
                userFrom += 'chenjin1';
            } else if (chenjin === '0') {
                var wordList = ["%E7%BE%8E%E5%A5%B3%E5%9B%BE%E7%89%87",
                    "%E6%89%8B%E6%9C%BA%E5%A3%81%E7%BA%B8",
                    "%E6%89%8B%E6%9C%BA%E5%A3%81%E7%BA%B8%E5%9B%BE%E7%89%87",
                    "%E5%A4%B4%E5%83%8F",
                    "%E5%A4%B4%E5%83%8F%E5%9B%BE%E7%89%87"];
                if (wordList.indexOf(urlword) >= 0) {
                    userFrom += 'chenjin0';
                }
            }
        } else {
            userFrom = hostname;
        }
    } else {
        userFrom = $.cookie('userFrom') || '';
    }

    if (userFrom.length > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (10 * 60 * 1000));
        $.cookie('userFrom', userFrom, {path: '/', expires: date, domain: '.baidu.com'});
    } else {
        $.cookie('userFrom', null, {path: '/', domain: '.baidu.com'});
    }
});
}();
!function(){            require.async(["common:widget/ui/durationStat/durationStat"],function(durationStat){
            durationStat.heartStart({
                pageId: 1 - 0,
                sid: '1fa908511ed9248929e8ca4a7537cbdcb69e27bc',
                cs: '',
                word: ''
            });
        });
    }();`,3).$.$
        ("DIV")._("id","SugRecommend")._("style","display: none;")
            ("DIV")._("id","SugRecBox")
                ("A")._("class","sugTitle")._("id","hotwordlistinA").$
                ("DIV")._("id","SugContent")
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E6%A0%A1%E9%95%BF%E8%A7%81%E8%AF%81%E6%83%85%E4%BE%A3%E8%A1%A8%E7%99%BD&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no hot")(`1`,3).$.$
                        ("SPAN")._("class","sugs")(`校长见证情侣表白`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E8%90%BD%E4%BA%95%E7%94%B7%E7%AB%A5%E9%81%97%E4%BD%93%E6%89%BE%E5%88%B0&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no hot")(`2`,3).$.$
                        ("SPAN")._("class","sugs")(`落井男童遗体找到`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E6%88%90%E9%83%BD%E8%82%8C%E8%82%89%E7%88%B7%E7%88%B7%E8%A3%B8%E7%BB%83&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no hot")(`3`,3).$.$
                        ("SPAN")._("class","sugs")(`成都肌肉爷爷裸练`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E7%A1%95%E5%A3%AB%E7%94%9F%E6%95%91%E8%90%BD%E6%B0%B4%E5%B0%91%E5%B9%B4&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`4`,3).$.$
                        ("SPAN")._("class","sugs")(`硕士生救落水少年`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E7%A5%9E%E7%A7%98%E5%95%86%E5%AD%A6%E9%99%A2%E6%B6%89%E4%BC%A0%E9%94%80&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`5`,3).$.$
                        ("SPAN")._("class","sugs")(`神秘商学院涉传销`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E8%B4%A7%E8%BD%A6%E4%BE%A7%E7%BF%BB%E8%9C%9C%E6%A1%94%E9%81%AD%E5%93%84%E6%8A%A2&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`6`,3).$.$
                        ("SPAN")._("class","sugs")(`货车侧翻蜜桔遭哄抢`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E5%A4%A9%E6%B4%A5%E6%B8%AF%E7%88%86%E7%82%B8%E6%A1%88%E5%AE%A3%E5%88%A4&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`7`,3).$.$
                        ("SPAN")._("class","sugs")(`天津港爆炸案宣判`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E4%B8%A4%E5%90%8C%E5%AD%A6%E8%A3%B9%E8%A2%AB%E5%8E%BB%E4%B8%8A%E8%AF%BE&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`8`,3).$.$
                        ("SPAN")._("class","sugs")(`两同学裹被去上课`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E6%B4%9B%E9%98%B3%E5%8F%91%E7%8E%B0%E6%9B%B9%E9%AD%8F%E5%A2%93%E8%91%AC&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`9`,3).$.$
                        ("SPAN")._("class","sugs")(`洛阳发现曹魏墓葬`,3).$.$.$
                    ("A")._("class","sugline")._("data-name","sug")._("target","_blank")._("href","http://image.baidu.com/search/index?tn=baiduimage&amp;ipn=r&amp;ct=201326592&amp;cl=2&amp;lm=-1&amp;st=-1&amp;fm=result&amp;fr=sugrec&amp;sf=1&amp;fmq=1452955267929_R&amp;pv=&amp;ic=0&amp;nc=1&amp;z=&amp;se=1&amp;showtab=0&amp;fb=0&amp;width=&amp;height=&amp;face=0&amp;istype=2&amp;ie=utf-8&amp;word=%E5%BA%93%E9%87%8C13%E4%B8%AA3%E5%88%86%E7%A0%B4%E7%BA%AA%E5%BD%95&amp;fr=sugrec&amp;pos=history")
                        ("SPAN")._("class","no ")(`10`,3).$.$
                        ("SPAN")._("class","sugs")(`库里13个3分破纪录`,3).$.$.$.$
                ("A")._("id","SugRecClose").$.$.$
        ("DIV")._("class","sug-wrapper sug_home_wrapper")._("id","sugWrapper")._("style","display: none; top: 303px; left: 124.5px;")
            ("UL").$.$.$
        }
    }
}

