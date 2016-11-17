
let styleListRE = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g;
class VStyle {
    constructor(elem:VElement) {
        let attrs=elem.attributes;
        var
            style = "",
            isLock = 0,
            __ = {},
            t = this;
        for (var i in styleNode) {
            __[i] = "";
        }
        Object.defineProperty(this, '__', {
            value: __,
            writable: false,
            enumerable: false,
            configurable: false
        }
        );
        Object.defineProperty(this, 'length', {
            value: 0,
            writable: true,
            enumerable: false,
            configurable: false
        }
        );
        Object.defineProperty(this, '__elem__', {
            value: elem,
            writable: false,
            enumerable: false,
            configurable: false
        }
        );
        Object.defineProperty(attrs, "__style__", {
            get: function () {
                return style;
            },
            set: function (s) {
                if (isLock === 1 || style === s) {
                    return;
                }
                style = s;
                if (isLock === 2) {
                    return;
                }
                isLock = 1;
                var lst;
                var lst2 = [];
                while ((lst = styleListRE.exec(s)) !== null) {
                    lst2.push(lst);
                }
                if (lst2.length > 0) {
                    for (var i = 0; i < lst2.length - 1; i++) {
                        t[camelize(lst2[i][1])] = lst2[i][2];
                    }
                    isLock = 2;
                    t[camelize(lst2[i][1])] = lst2[i][2];
                }
                isLock = 0;
                //styleListRE.lastIndex=0;
            }
        }
        );
    }
}

function indexOfStyleName(t, name:string) {
    for (let i = 0; i < t.length; i++) {
        if (t[i] === name) {
            return i;
        }
    }
    return -1;
}

function updateStyleAttribyte(t) {
    let style = "";
    for (let i = 0; i < t.length; i++) {
        style += decamelize(t[i]) + ':' + t[t[i]] + ';';
    }
    t.__elem__.setAttribute('style', style);
}
function setVStyleGetSet(name:string) {
    Object.defineProperty(VStyleprototype, name, {
        get: function () {
            return this.__[name];
        },
        set: function (s) {
            if (s === this.__[name]) {
                return;
            } else if (s === "") {
                if (this.__[name] === s) {
                    return;
                }
                //删除
                this.__[name] = s;
                var idx = indexOfStyleName(this, name);
                //if(idx!==-1){
                for (var i = idx; i < this.length - 1; i++) {
                    this[i] = this[i + 1];
                }
                delete this[i];
                this.length--;
                //}
                //更新标签属性
                updateStyleAttribyte(this);
            } else {
                //验证是否有效style
                var s2;
                styleNode[name] = s;
                s2 = styleNode[name];
                styleNode[name] = "";
                if (s !== "") {
                    this.__[name] = s;
                    var style = this.__elem__.getAttribute(style);
                    var idx = indexOfStyleName(this, name);
                    if (idx === -1) {
                        this[this.length] = name;
                        this.length++;
                    }
                    //更新标签属性
                    updateStyleAttribyte(this);
                } else {
                    throw new Error(name + "不支持" + s);
                }

            }
        }
    });
}

var VStyleprototype ={};
var styleNode = {};
for (var i in ["alignContent","alignItems","alignSelf","alignmentBaseline","animation","animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction","backfaceVisibility","background","backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPosition","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize","baselineShift","border","borderBottom","borderBottomColor","borderBottomLeftRadius","borderBottomRightRadius","borderBottomStyle","borderBottomWidth","borderCollapse","borderColor","borderImage","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeft","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRadius","borderRight","borderRightColor","borderRightStyle","borderRightWidth","borderSpacing","borderStyle","borderTop","borderTopColor","borderTopLeftRadius","borderTopRightRadius","borderTopStyle","borderTopWidth","borderWidth","bottom","boxShadow","boxSizing","breakAfter","breakBefore","breakInside","captionSide","clear","clip","clipPath","clipRule","color","colorInterpolationFilters","columnCount: any;columnFill","columnGap: any;columnRule","columnRuleColor: any;columnRuleStyle","columnRuleWidth: any;columnSpan","columnWidth: any;columns","content","counterIncrement","counterReset","cssFloat","cssText: string;cursor","direction","display","dominantBaseline","emptyCells","enableBackground","fill","fillOpacity","fillRule","filter","flex","flexBasis","flexDirection","flexFlow","flexGrow","flexShrink","flexWrap","floodColor","floodOpacity","font","fontFamily","fontFeatureSettings","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","glyphOrientationHorizontal","glyphOrientationVertical","height","imeMode","justifyContent","kerning","left","length: number;letterSpacing","lightingColor","lineHeight","listStyle","listStyleImage","listStylePosition","listStyleType","margin","marginBottom","marginLeft","marginRight","marginTop","marker","markerEnd","markerMid","markerStart","mask","maxHeight","maxWidth","minHeight","minWidth","msContentZoomChaining","msContentZoomLimit","msContentZoomLimitMax: any;msContentZoomLimitMin: any;msContentZoomSnap","msContentZoomSnapPoints","msContentZoomSnapType","msContentZooming","msFlowFrom","msFlowInto","msFontFeatureSettings","msGridColumn: any;msGridColumnAlign","msGridColumnSpan: any;msGridColumns","msGridRow: any;msGridRowAlign","msGridRowSpan: any;msGridRows","msHighContrastAdjust","msHyphenateLimitChars","msHyphenateLimitLines: any;msHyphenateLimitZone: any;msHyphens","msImeAlign","msOverflowStyle","msScrollChaining","msScrollLimit","msScrollLimitXMax: any;msScrollLimitXMin: any;msScrollLimitYMax: any;msScrollLimitYMin: any;msScrollRails","msScrollSnapPointsX","msScrollSnapPointsY","msScrollSnapType","msScrollSnapX","msScrollSnapY","msScrollTranslation","msTextCombineHorizontal","msTextSizeAdjust: any;msTouchAction","msTouchSelect","msUserSelect","msWrapFlow: string;msWrapMargin: any;msWrapThrough: string;opacity","order","orphans","outline","outlineColor","outlineStyle","outlineWidth","overflow","overflowX","overflowY","padding","paddingBottom","paddingLeft","paddingRight","paddingTop","pageBreakAfter","pageBreakBefore","pageBreakInside","parentRule: CSSRule;perspective","perspectiveOrigin","pointerEvents","position","quotes","right","rubyAlign","rubyOverhang","rubyPosition","stopColor","stopOpacity","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","tableLayout","textAlign","textAlignLast","textAnchor","textDecoration","textIndent","textJustify","textKashida","textKashidaSpace","textOverflow","textShadow","textTransform","textUnderlinePosition","top","touchAction","transform","transformOrigin","transformStyle","transition","transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction","unicodeBidi","verticalAlign","visibility","webkitAlignContent","webkitAlignItems","webkitAlignSelf","webkitAnimation","webkitAnimationDelay","webkitAnimationDirection","webkitAnimationDuration","webkitAnimationFillMode","webkitAnimationIterationCount","webkitAnimationName","webkitAnimationPlayState","webkitAnimationTimingFunction","webkitAppearance","webkitBackfaceVisibility","webkitBackgroundClip","webkitBackgroundOrigin","webkitBackgroundSize","webkitBorderBottomLeftRadius","webkitBorderBottomRightRadius","webkitBorderImage","webkitBorderRadius","webkitBorderTopLeftRadius","webkitBorderTopRightRadius","webkitBoxAlign","webkitBoxDirection","webkitBoxFlex","webkitBoxOrdinalGroup","webkitBoxOrient","webkitBoxPack","webkitBoxSizing","webkitColumnBreakAfter","webkitColumnBreakBefore","webkitColumnBreakInside","webkitColumnCount: any;webkitColumnGap: any;webkitColumnRule","webkitColumnRuleColor: any;webkitColumnRuleStyle","webkitColumnRuleWidth: any;webkitColumnSpan","webkitColumnWidth: any;webkitColumns","webkitFilter","webkitFlex","webkitFlexBasis","webkitFlexDirection","webkitFlexFlow","webkitFlexGrow","webkitFlexShrink","webkitFlexWrap","webkitJustifyContent","webkitOrder","webkitPerspective","webkitPerspectiveOrigin","webkitTapHighlightColor","webkitTextFillColor","webkitTextSizeAdjust: any;webkitTransform","webkitTransformOrigin","webkitTransformStyle","webkitTransition","webkitTransitionDelay","webkitTransitionDuration","webkitTransitionProperty","webkitTransitionTimingFunction","webkitUserModify","webkitUserSelect","webkitWritingMode","whiteSpace","widows","width","wordBreak","wordSpacing","wordWrap","writingMode","zIndex","zoom"]) {
    setVStyleGetSet(i);
}