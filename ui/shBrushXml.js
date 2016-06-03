/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
    // CommonJS
    typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

    function Brush()
    {
        function process(match, regexInfo)
        {
            var constructor = SyntaxHighlighter.Match,
                code = match[0],
                tag = new XRegExp('(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)', 'xg').exec(code),
                result = []
                ;
        
            if (match.attributes != null) 
            {
                var attributes,
                    regex = new XRegExp('\\s(?<name>[\\w:\\-\\.]+)' +
                                        '(?<eq> \\s*?=\\s*)?' +
                                        '(?<quot>["\'])?'+
                                        '(?<value>.*?)?'+
                                        '(?<quot2>\\3)?(?:\\s|&gt;|>|\\\\)',
                                        'xg');
                    
                while ((attributes = regex.exec(code)) != null) 
                {
                    result.push(new constructor(attributes.name, match.index + attributes.index+1, 'color1'));
                    if(attributes.eq&&attributes.value){
                        result.push(new constructor(attributes.eq, match.index + attributes.index + attributes[0].indexOf(attributes.eq), 'keyword'));
                        
                        if(attributes.quot&&attributes.quot2){
                            var idx=attributes[0].indexOf(attributes.quot);
                            result.push(new constructor(attributes.quot, match.index + attributes.index + idx, 'quot'));
                            result.push(new constructor(attributes.quot2, match.index + attributes.index + idx+1+attributes.value.length, 'quot'));
                        }
                        if(attributes.name==='style'){
                            var styleregex=new XRegExp('(?<name>[\\w:\\-\\.]+)\\s*?:\\s*' +
                                        '(?<value> .*?)\\s*'+
                                        '(?<semicolon> (;|$))',
                                        'xg');
                            var styvalregex=new XRegExp('(?<value> .*?)'+
                                        '(?<unit>(em|ex|ch|rem|vw|vh|vmax|vmin|cm|mm|q|in|pt|pc|px))',
                                        'xg');
                            var attrstyle;
                            while ((attrstyle = styleregex.exec(attributes.value)) != null)
                            {
                                var idx=match.index+attributes.index+attributes[0].indexOf(attributes.value);
                                result.push(new constructor(attrstyle.name, idx, 'string'));
                                if(attrstyle.value){
                                    var attr=styvalregex.exec(attrstyle.value);
                                    result.push(new constructor(attrstyle.semicolon,  idx+attrstyle[0].indexOf(attrstyle.semicolon), 'keyword'));
                                    idx=idx+attrstyle[0].indexOf(attrstyle.value);
                                    if(attr&&attr.unit){
                                        result.push(new constructor(attr.value,  idx, 'styleunit'));
                                        result.push(new constructor(attr.unit,  idx+attr.value.length, 'string'));
                                    }else{
                                        result.push(new constructor(attrstyle.value, idx, 'stylevalue'));    
                                    }
                                    
                                }    
                            }
                            
                        }else{
                            result.push(new constructor(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), 'string2'));    
                        }
                        
                    }
                    
                }
            }
            if (tag != null){
                if(tag.name==="title"){
                    result.push(
                        new constructor((new Array(match[0].length+1)).join(" "), match.index, 'comments')
                    );
                }else{
                    result.push(new constructor(match.left, match.index + match[0].indexOf(match.left), 'keyword'));
                    result.push(new constructor(match.right, match.index + match[0].indexOf(match.right), 'keyword'));
                    if(match.leftslash){
                        result.push(new constructor(match.leftslash, match.index + match[0].indexOf(match.leftslash), 'keyword2'));    
                    }
                    result.push(new constructor(tag.name, match.index + tag[0].indexOf(tag.name), 'keyword2'));
                }
            }
                

            return result;
        }
        var commentRE=new XRegExp('(&lt;|<)!(--)?( *?)([\\s\\S]*?)( *?)\\2(&gt;|>)','gm');
        var orderRE=new XRegExp('^( *?)(if|while|for|switch|break|async|\-|scope|content|bind|\!|var|\=|else if|else|case break|case|default|end)( *?)([\\s\\S]*)','gm');
        var noOrderRE=new XRegExp('(&lt;|<)!(--)?([\\s\\S]*?)\\2(&gt;|>)','gm');

        var constructor = SyntaxHighlighter.Match;
        function comment(match){
            var commentMatch=commentRE.exec(match[0]);
            commentRE.lastIndex=0;
            var orderMatch=orderRE.exec(commentMatch[4]);
            
            if(orderMatch){
                orderRE.lastIndex=0;
                commentMatch.index=match.index;
                return order(commentMatch,orderMatch);
            }
            var result = []
                ;
            result.push(
                new constructor(match[0], match.index , 'comments')
            );
            return result;
        } 
        function order(commentMatch,orderMatch)
        {
            var condition = orderMatch[4],
                order = orderMatch[2],
                result = [],
                beginIndex=commentMatch[1].length+1,
                orderLine=commentMatch[0].substring(beginIndex,commentMatch[0].length)
                ;
            result.push(
                new constructor(order, commentMatch.index +beginIndex+ orderLine.indexOf(order), 'color4')
            );
            if(condition){
                if(order==="scope"||order==="-"){
                    condition=splitByOnce(condition,"|")[1];
                }
                var c=[],r;
                for(var i=0;i<jsRegexList.length;i++){
                    r=y(condition,jsRegexList[i]);
                    if(r.length){
                        c=c.concat(r);    
                    }
                }
                var idx=commentMatch.index+beginIndex + orderLine.indexOf(condition);
                for(var i=0;i<c.length;i++){
                    c[i].index+=idx;
                }
                result=result.concat(c); 
            }
            

            return result;
        }
        function splitByOnce(s,split){
            var 
                index=s.indexOf(split),
                arr=[];
            if(index!=-1){
                arr.push(s.substring(0,index));
                arr.push(s.substring(index+split.length,s.length));
            }else{
                arr.push(s);
            }
            return arr;
        }
        function c(k) {
            return k[0]
        }
        function y(a, b) {
            for (var d = null, h = [], g = b.func ? b.func : c; (d = b.regex.exec(a)) != null; ) {
                var i = g(d, b);
                if (typeof i == "string")
                    i = [new SyntaxHighlighter.Match(i, d.index, b.css)];
                h = h.concat(i)
            }
            return h
        }
        var keywords =  'break case catch continue ' +
                        'default delete do else false  ' +
                        'for function if in instanceof ' +
                        'new null return super switch ' +
                        'this throw true try typeof ' +
                        'var while with debugger console'
                        ;

        var r = SyntaxHighlighter.regexLib;
        var jsRegexList = [
            { regex: r.multiLineDoubleQuotedString,                             css: 'string' },            // double quoted strings
            { regex: r.multiLineSingleQuotedString,                             css: 'string' },            // single quoted strings
            { regex: r.singleLineCComments,                                     css: 'comments' },          // one line comments
            { regex: r.multiLineCComments,                                      css: 'comments' },          // multiline comments
            { regex: /\s*#.*/gm,                                                css: 'preprocessor' },      // preprocessor tags like #region and #endregion
            { regex: new RegExp(this.getKeywords(keywords), 'gm'),              css: 'string' },            // keywords
            { regex: /\={1,3}|\{|\}|\(|\)|\[|\]|\.|\||\:|\?|&gt;|&lt;|;|,|\+|\-|\/|\*/g,          css: 'keyword2' }           // keywords
            ];
    
        
        
        this.regexList = [
            { regex: noOrderRE,                                                                             func: comment },    // <! ... turtle order>
            { regex: new XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),           css: 'color2' },    // <![ ... [ ... ]]>
            { regex: new XRegExp('(?<left>&lt;|<)(?<leftslash>\\/)?(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(?<right>&gt;|>)', 'sg'), func: process }
        ];
        var getCodeLinesHtml=this.getCodeLinesHtml;
        var getLineNumbersHtml;
        this.getCodeLinesHtml=function(a,b){
            if(/^(&nbsp;)* *\n/.test(a)){
                a=a.replace(/^(&nbsp;)* *\n/,'');
                b.pop();
            }
            if(/\n(&nbsp;)* *$/.test(a)){
                a=a.replace(/\n(&nbsp;)* *$/,'');
                b.pop();
            }
            getLineNumbersHtml=this.getLineNumbersHtml;
            this.getLineNumbersHtml=function(){
                this.getLineNumbersHtml=getLineNumbersHtml;
                return getLineNumbersHtml.call(this,a);
            }
            return getCodeLinesHtml.call(this,a,b);
        }
    };

    Brush.prototype = new SyntaxHighlighter.Highlighter();
    Brush.aliases   = ['xml', 'xhtml', 'xslt', 'html'];

    SyntaxHighlighter.brushes.Xml = Brush;

    // CommonJS
    typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();