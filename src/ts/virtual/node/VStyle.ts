namespace VMDOM{
    let styleListRE = /\s*([\w\-]+)\s*\:\s*(.*?)\s*[;$]/g;
    export class StyleInnerData{
        data:{
            [index:string]:string
        }={}
        elem:VElement
        isLock:0|1|2=0
        styleData:string=''
    }
    export class VStyle{
        [index:number]:string
        readonly length:number
        readonly __=new StyleInnerData
        constructor(elem:VElement) {
            let attrs=elem.attributes;
            this.__.elem=elem;
            for (let i in styleNode) {
                this.__.data[i] = "";
            }
        }
        get style() {
            return this.__.styleData;
        }
        set style(s:string) {
            if (this.__.isLock === 1 || this.__.styleData === s) {
                return;
            }
            this.__.styleData = s;
            if (this.__.isLock === 2) {
                return;
            }
            this.__.isLock = 1;
            let lst;
            let lst2:any[] = [];
            while ((lst = styleListRE.exec(s)) !== null) {
                lst2.push(lst);
            }
            if (lst2.length > 0) {
                let i=0
                for (; i < lst2.length - 1; i++) {
                    this[camelize(lst2[i][1])] = lst2[i][2];
                }
                this.__.isLock = 2;
                this[camelize(lst2[i][1])] = lst2[i][2];
            }
            this.__.isLock = 0;
            //styleListRE.lastIndex=0;
        }
        alignContent:string
        alignItems:string
        alignSelf:string
        alignmentBaseline:string
        animation:string
        animationDelay:string
        animationDirection:string
        animationDuration:string
        animationFillMode:string
        animationIterationCount:string
        animationName:string
        animationPlayState:string
        animationTimingFunction:string
        backfaceVisibility:string
        background:string
        backgroundAttachment:string
        backgroundClip:string
        backgroundColor:string
        backgroundImage:string
        backgroundOrigin:string
        backgroundPosition:string
        backgroundPositionX:string
        backgroundPositionY:string
        backgroundRepeat:string
        backgroundSize:string
        baselineShift:string
        border:string
        borderBottom:string
        borderBottomColor:string
        borderBottomLeftRadius:string
        borderBottomRightRadius:string
        borderBottomStyle:string
        borderBottomWidth:string
        borderCollapse:string
        borderColor:string
        borderImage:string
        borderImageOutset:string
        borderImageRepeat:string
        borderImageSlice:string
        borderImageSource:string
        borderImageWidth:string
        borderLeft:string
        borderLeftColor:string
        borderLeftStyle:string
        borderLeftWidth:string
        borderRadius:string
        borderRight:string
        borderRightColor:string
        borderRightStyle:string
        borderRightWidth:string
        borderSpacing:string
        borderStyle:string
        borderTop:string
        borderTopColor:string
        borderTopLeftRadius:string
        borderTopRightRadius:string
        borderTopStyle:string
        borderTopWidth:string
        borderWidth:string
        bottom:string
        boxShadow:string
        boxSizing:string
        breakAfter:string
        breakBefore:string
        breakInside:string
        captionSide:string
        clear:string
        clip:string
        clipPath:string
        clipRule:string
        color:string
        colorInterpolationFilters:string
        columnCount:string
        columnFill:string
        columnGap:string
        columnRule:string
        columnRuleColor:string
        columnRuleStyle:string
        columnRuleWidth:string
        columnSpan:string
        columnWidth:string
        columns:string
        content:string
        counterIncrement:string
        counterReset:string
        cssFloat:string
        cssText:string
        cursor:string
        direction:string
        display:string
        dominantBaseline:string
        emptyCells:string
        enableBackground:string
        fill:string
        fillOpacity:string
        fillRule:string
        filter:string
        flex:string
        flexBasis:string
        flexDirection:string
        flexFlow:string
        flexGrow:string
        flexShrink:string
        flexWrap:string
        floodColor:string
        floodOpacity:string
        font:string
        fontFamily:string
        fontFeatureSettings:string
        fontSize:string
        fontSizeAdjust:string
        fontStretch:string
        fontStyle:string
        fontVariant:string
        fontWeight:string
        glyphOrientationHorizontal:string
        glyphOrientationVertical:string
        height:string
        imeMode:string
        justifyContent:string
        kerning:string
        left:string
        letterSpacing:string
        lightingColor:string
        lineHeight:string
        listStyle:string
        listStyleImage:string
        listStylePosition:string
        listStyleType:string
        margin:string
        marginBottom:string
        marginLeft:string
        marginRight:string
        marginTop:string
        marker:string
        markerEnd:string
        markerMid:string
        markerStart:string
        mask:string
        maxHeight:string
        maxWidth:string
        minHeight:string
        minWidth:string
        msContentZoomChaining:string
        msContentZoomLimit:string
        msContentZoomLimitMax:string
        msContentZoomLimitMin:string
        msContentZoomSnap:string
        msContentZoomSnapPoints:string
        msContentZoomSnapType:string
        msContentZooming:string
        msFlowFrom:string
        msFlowInto:string
        msFontFeatureSettings:string
        msGridColumn:string
        msGridColumnAlign:string
        msGridColumnSpan:string
        msGridColumns:string
        msGridRow:string
        msGridRowAlign:string
        msGridRowSpan:string
        msGridRows:string
        msHighContrastAdjust:string
        msHyphenateLimitChars:string
        msHyphenateLimitLines:string
        msHyphenateLimitZone:string
        msHyphens:string
        msImeAlign:string
        msOverflowStyle:string
        msScrollChaining:string
        msScrollLimit:string
        msScrollLimitXMax:string
        msScrollLimitXMin:string
        msScrollLimitYMax:string
        msScrollLimitYMin:string
        msScrollRails:string
        msScrollSnapPointsX:string
        msScrollSnapPointsY:string
        msScrollSnapType:string
        msScrollSnapX:string
        msScrollSnapY:string
        msScrollTranslation:string
        msTextCombineHorizontal:string
        msTextSizeAdjust:string
        msTouchAction:string
        msTouchSelect:string
        msUserSelect:string
        msWrapFlow:string
        msWrapMargin:string
        msWrapThrough:string
        opacity:string
        order:string
        orphans:string
        outline:string
        outlineColor:string
        outlineStyle:string
        outlineWidth:string
        overflow:string
        overflowX:string
        overflowY:string
        padding:string
        paddingBottom:string
        paddingLeft:string
        paddingRight:string
        paddingTop:string
        pageBreakAfter:string
        pageBreakBefore:string
        pageBreakInside:string
        parentRule:string
        perspective:string
        perspectiveOrigin:string
        pointerEvents:string
        position:string
        quotes:string
        right:string
        rubyAlign:string
        rubyOverhang:string
        rubyPosition:string
        stopColor:string
        stopOpacity:string
        stroke:string
        strokeDasharray:string
        strokeDashoffset:string
        strokeLinecap:string
        strokeLinejoin:string
        strokeMiterlimit:string
        strokeOpacity:string
        strokeWidth:string
        tableLayout:string
        textAlign:string
        textAlignLast:string
        textAnchor:string
        textDecoration:string
        textIndent:string
        textJustify:string
        textKashida:string
        textKashidaSpace:string
        textOverflow:string
        textShadow:string
        textTransform:string
        textUnderlinePosition:string
        top:string
        touchAction:string
        transform:string
        transformOrigin:string
        transformStyle:string
        transition:string
        transitionDelay:string
        transitionDuration:string
        transitionProperty:string
        transitionTimingFunction:string
        unicodeBidi:string
        verticalAlign:string
        visibility:string
        webkitAlignContent:string
        webkitAlignItems:string
        webkitAlignSelf:string
        webkitAnimation:string
        webkitAnimationDelay:string
        webkitAnimationDirection:string
        webkitAnimationDuration:string
        webkitAnimationFillMode:string
        webkitAnimationIterationCount:string
        webkitAnimationName:string
        webkitAnimationPlayState:string
        webkitAnimationTimingFunction:string
        webkitAppearance:string
        webkitBackfaceVisibility:string
        webkitBackgroundClip:string
        webkitBackgroundOrigin:string
        webkitBackgroundSize:string
        webkitBorderBottomLeftRadius:string
        webkitBorderBottomRightRadius:string
        webkitBorderImage:string
        webkitBorderRadius:string
        webkitBorderTopLeftRadius:string
        webkitBorderTopRightRadius:string
        webkitBoxAlign:string
        webkitBoxDirection:string
        webkitBoxFlex:string
        webkitBoxOrdinalGroup:string
        webkitBoxOrient:string
        webkitBoxPack:string
        webkitBoxSizing:string
        webkitColumnBreakAfter:string
        webkitColumnBreakBefore:string
        webkitColumnBreakInside:string
        webkitColumnCount:string
        webkitColumnGap:string
        webkitColumnRule:string
        webkitColumnRuleColor:string
        webkitColumnRuleStyle:string
        webkitColumnRuleWidth:string
        webkitColumnSpan:string
        webkitColumnWidth:string
        webkitColumns:string
        webkitFilter:string
        webkitFlex:string
        webkitFlexBasis:string
        webkitFlexDirection:string
        webkitFlexFlow:string
        webkitFlexGrow:string
        webkitFlexShrink:string
        webkitFlexWrap:string
        webkitJustifyContent:string
        webkitOrder:string
        webkitPerspective:string
        webkitPerspectiveOrigin:string
        webkitTapHighlightColor:string
        webkitTextFillColor:string
        webkitTextSizeAdjust:string
        webkitTransform:string
        webkitTransformOrigin:string
        webkitTransformStyle:string
        webkitTransition:string
        webkitTransitionDelay:string
        webkitTransitionDuration:string
        webkitTransitionProperty:string
        webkitTransitionTimingFunction:string
        webkitUserModify:string
        webkitUserSelect:string
        webkitWritingMode:string
        whiteSpace:string
        widows:string
        width:string
        wordBreak:string
        wordSpacing:string
        wordWrap:string
        writingMode:string
        zIndex:string
        zoom:string
    }

    function indexOfStyleName(t:VStyle, name:string) {
        for (let i = 0; i < t.length; i++) {
            if (t[i] === name) {
                return i;
            }
        }
        return -1;
    }

    
    let styleNode = {};

    function updateStyleAttribyte(this:VStyle) {
        let style = "";
        for (let i = 0; i < this.length; i++) {
            style += decamelize(this[i]) + ':' + this[this[i]] + ';';
        }
        this.__.elem.setAttribute('style', style);
    }
    for (let name of ["alignContent", "alignItems", "alignSelf", "alignmentBaseline", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "backfaceVisibility", "background", "backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPosition", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize", "baselineShift", "border", "borderBottom", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStyle", "borderBottomWidth", "borderCollapse", "borderColor", "borderImage", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRadius", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderSpacing", "borderStyle", "borderTop", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStyle", "borderTopWidth", "borderWidth", "bottom", "boxShadow", "boxSizing", "breakAfter", "breakBefore", "breakInside", "captionSide", "clear", "clip", "clipPath", "clipRule", "color", "colorInterpolationFilters", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "content", "counterIncrement", "counterReset", "cssFloat", "cssText","cursor", "direction", "display", "dominantBaseline", "emptyCells", "enableBackground", "fill", "fillOpacity", "fillRule", "filter", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "floodColor", "floodOpacity", "font", "fontFamily", "fontFeatureSettings", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontWeight", "glyphOrientationHorizontal", "glyphOrientationVertical", "height", "imeMode", "justifyContent", "kerning", "left","letterSpacing", "lightingColor", "lineHeight", "listStyle", "listStyleImage", "listStylePosition", "listStyleType", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "marker", "markerEnd", "markerMid", "markerStart", "mask", "maxHeight", "maxWidth", "minHeight", "minWidth", "msContentZoomChaining", "msContentZoomLimit", "msContentZoomLimitMax", "msContentZoomLimitMin", "msContentZoomSnap", "msContentZoomSnapPoints", "msContentZoomSnapType", "msContentZooming", "msFlowFrom", "msFlowInto", "msFontFeatureSettings", "msGridColumn", "msGridColumnAlign", "msGridColumnSpan", "msGridColumns", "msGridRow", "msGridRowAlign", "msGridRowSpan", "msGridRows", "msHighContrastAdjust", "msHyphenateLimitChars", "msHyphenateLimitLines", "msHyphenateLimitZone", "msHyphens", "msImeAlign", "msOverflowStyle", "msScrollChaining", "msScrollLimit", "msScrollLimitXMax", "msScrollLimitXMin", "msScrollLimitYMax", "msScrollLimitYMin", "msScrollRails", "msScrollSnapPointsX", "msScrollSnapPointsY", "msScrollSnapType", "msScrollSnapX", "msScrollSnapY", "msScrollTranslation", "msTextCombineHorizontal", "msTextSizeAdjust", "msTouchAction", "msTouchSelect", "msUserSelect", "msWrapFlow","msWrapMargin", "msWrapThrough","opacity", "order", "orphans", "outline", "outlineColor", "outlineStyle", "outlineWidth", "overflow", "overflowX", "overflowY", "padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "pageBreakAfter", "pageBreakBefore", "pageBreakInside", "parentRule","perspective", "perspectiveOrigin", "pointerEvents", "position", "quotes", "right", "rubyAlign", "rubyOverhang", "rubyPosition", "stopColor", "stopOpacity", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "tableLayout", "textAlign", "textAlignLast", "textAnchor", "textDecoration", "textIndent", "textJustify", "textKashida", "textKashidaSpace", "textOverflow", "textShadow", "textTransform", "textUnderlinePosition", "top", "touchAction", "transform", "transformOrigin", "transformStyle", "transition", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "unicodeBidi", "verticalAlign", "visibility", "webkitAlignContent", "webkitAlignItems", "webkitAlignSelf", "webkitAnimation", "webkitAnimationDelay", "webkitAnimationDirection", "webkitAnimationDuration", "webkitAnimationFillMode", "webkitAnimationIterationCount", "webkitAnimationName", "webkitAnimationPlayState", "webkitAnimationTimingFunction", "webkitAppearance", "webkitBackfaceVisibility", "webkitBackgroundClip", "webkitBackgroundOrigin", "webkitBackgroundSize", "webkitBorderBottomLeftRadius", "webkitBorderBottomRightRadius", "webkitBorderImage", "webkitBorderRadius", "webkitBorderTopLeftRadius", "webkitBorderTopRightRadius", "webkitBoxAlign", "webkitBoxDirection", "webkitBoxFlex", "webkitBoxOrdinalGroup", "webkitBoxOrient", "webkitBoxPack", "webkitBoxSizing", "webkitColumnBreakAfter", "webkitColumnBreakBefore", "webkitColumnBreakInside", "webkitColumnCount", "webkitColumnGap", "webkitColumnRule", "webkitColumnRuleColor", "webkitColumnRuleStyle", "webkitColumnRuleWidth", "webkitColumnSpan", "webkitColumnWidth", "webkitColumns", "webkitFilter", "webkitFlex", "webkitFlexBasis", "webkitFlexDirection", "webkitFlexFlow", "webkitFlexGrow", "webkitFlexShrink", "webkitFlexWrap", "webkitJustifyContent", "webkitOrder", "webkitPerspective", "webkitPerspectiveOrigin", "webkitTapHighlightColor", "webkitTextFillColor", "webkitTextSizeAdjust", "webkitTransform", "webkitTransformOrigin", "webkitTransformStyle", "webkitTransition", "webkitTransitionDelay", "webkitTransitionDuration", "webkitTransitionProperty", "webkitTransitionTimingFunction", "webkitUserModify", "webkitUserSelect", "webkitWritingMode", "whiteSpace", "widows", "width", "wordBreak", "wordSpacing", "wordWrap", "writingMode", "zIndex", "zoom"]) {
        Object.defineProperty(VStyle.prototype, name, {
            get: function (this:VStyle) {
                return this.__[name];
            },
            set: function (this:VStyle,s:string) {
                if (s === this.__[name]) {
                    return;
                } else if (s === "") {
                    if (this.__[name] === s) {
                        return;
                    }
                    //删除
                    this.__[name] = s;
                    let idx = indexOfStyleName(this, name);
                    //if(idx!==-1){
                    for (var i = idx; i < this.length - 1; i++) {
                        this[i] = this[i + 1];
                    }
                    delete this[i];
                    (<any>this).length--;
                    //}
                    //更新标签属性
                    updateStyleAttribyte.call(this);
                } else {
                    //验证是否有效style
                    let s2;
                    styleNode[name] = s;
                    s2 = styleNode[name];
                    styleNode[name] = "";
                    if (s !== "") {
                        this.__[name] = s;
                        let style = this.__.elem.getAttribute(this.style);
                        let idx = indexOfStyleName.call(this, name);
                        if (idx === -1) {
                            this[this.length] = name;
                            (<any>this).length++;
                        }
                        //更新标签属性
                        updateStyleAttribyte.call(this);
                    } else {
                        throw new Error(name + "不支持" + s);
                    }

                }
            }
        });
    }
}